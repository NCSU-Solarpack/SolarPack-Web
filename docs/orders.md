# Orders & Procurement

The purchasing pipeline: a member requests a part, directors approve it, someone buys it, a
receipt gets attached, and it's marked delivered. The whole history is exportable as a ZIP of
PDFs for the team's accounting.

- UI: [src/components/admin/OrderManager.jsx](../src/components/admin/OrderManager.jsx) (3691 lines — the largest file in the repo)
- Data layer: [src/utils/supabase.js](../src/utils/supabase.js) lines 1395–1766
- Table: `orders`, ~70 columns — [supabase-orders-schema.sql](../schemas/supabase-orders-schema.sql)
- Storage: `order-receipts` bucket

---

## The workflow

```
                       member/leader submits an order
                                    │
                     status = pending_technical_approval
                                    │
                   ┌────────────────▼────────────────┐
                   │   TECHNICAL DIRECTOR REVIEW     │
                   │  approve/deny + set sponsorship │
                   └────────────────┬────────────────┘
                          │                    │
                       denied                approved
                          │                    │
                    status=denied      what happened with sponsorship?
                                               │
                        ┌──────────────────────┴──────────────────────┐
                        │                                             │
              sponsorship = successful               failed / not_applicable / in_progress
              (donated — nothing to buy)                    (we have to buy it)
                        │                                             │
                 status = approved                    status = pending_project_approval
             purchase approval auto-marked                            │
                                              ┌───────────────────────▼──────────────────┐
                                              │   PROJECT DIRECTOR PURCHASE APPROVAL     │
                                              │        (is there budget for this?)       │
                                              └───────────────────────┬──────────────────┘
                                                          │                     │
                                                       denied                approved
                                                          │                     │
                                                   status=denied         status = approved
                                                                                │
                                                    someone buys it — "Mark Purchased"
                                                    (PO number, actual cost, receipt PDF,
                                                     expected delivery, tracking)
                                                                                │
                                                                       status = shipped
                                                                                │
                                                              it arrives — "Confirm Delivery"
                                                                                │
                                                                      status = delivered
```

**Two approval stages, not one.** The technical director asks *"do we need this part?"*; the
project director asks *"can we afford it?"*. Both are recorded separately in the `approvalWorkflow`
object (`technicalDirectorApproval` and `projectDirectorPurchaseApproval`), each with its own
status, approver, date, comments and denial reason.

**The sponsorship shortcut** is the non-obvious bit. The technical director sets the sponsorship
outcome *as part of* their approval. If a sponsor donated the part, there's nothing to purchase, so
the second approval is skipped — the order jumps straight to `approved` and
`projectDirectorPurchaseApproval` is auto-stamped with *"Material obtained through sponsorship - no
purchase needed"*. If sponsorship failed or never applied, the order routes to
`pending_project_approval`.

All of this is implemented in `updateOrderStatus()`
([OrderManager.jsx:758](../src/components/admin/OrderManager.jsx#L758)), a single function that
branches on `statusUpdate.type`: `technical_director_approval`, `purchase_approval`,
`sponsorship_status`, `purchase`, `delivery`, `sponsorship_response`.

### Statuses

| Status | Label in the UI | Colour |
|---|---|---|
| `pending_technical_approval` | Pending Tech Director Approval | amber |
| `pending_project_approval` | Pending Purchase Approval | amber |
| `approved` | Approved | green |
| `shipped` | In Transit | blue |
| `delivered` | Delivered | dark green |
| `denied` | Denied | red |

The `orders.status` CHECK constraint also permits `purchased`, `completed`, `cancelled` and
`returned`, which the UI never sets. And these **legacy** values still appear in old rows:

| Legacy | Migrated to |
|---|---|
| `pending_approval` | `pending_technical_approval` |
| `approved_for_purchase` | `approved` |
| `pending_purchase_approval` | `pending_project_approval` |
| `awaiting_sponsorship` | `pending_project_approval` |
| `in_transit` | `shipped` |

`migrateOrderStructure()` rewrites these **in memory on every load** — it does not write back to
the database. So old rows keep their legacy status in Postgres forever while displaying correctly
in the app. If you query `orders` directly, filter for both spellings. A one-time `UPDATE` to
normalise them would let you delete a good chunk of that function.

### Sponsorship search statuses

`not_started` · `in_progress` · `successful` · `failed` · `not_applicable`
(CHECK-constrained on `sponsorship_search_status`).

Only `successful` skips purchase approval. `in_progress` routes to `pending_project_approval` with
the note *"Awaiting sponsorship search completion"* — the order parks there until the outcome is
known.

---

## Using it

### Submitting an order

Requires `submit_orders` — **leader or director**. Members can view but not submit. (To let
members submit, add `submit_orders` to the member array in
[auth.js](../src/utils/auth.js#L15) *and* tighten the `orders` RLS policy so they can only insert
rows for themselves.)

Orders tab → **Submit Order**. Your name, email and subteam prefill from your profile (once per
form open, so it won't clobber your edits). Five sections:

| Section | Fields |
|---|---|
| Submission | subteam, submitter name, submitter email |
| Material | material name **(required)**, specifications, link, supplier, supplier contact |
| Cost | unit price, quantity, shipping, total |
| Project | purpose, urgency (`flexible`/`moderate`/`urgent`/`critical`), needed-by date |
| Sponsorship | can this be sponsored? + sponsor contact name / email / company |

**Fill in the material link and specifications properly.** Whoever purchases this in three weeks
has only these fields to go on, and a vague request bounces back to you.

Flag it as sponsorable if there's any chance a company would donate it — the business subteam
works that list, and a successful sponsorship skips an approval stage.

### Approving (directors)

Requires `approve_orders` — **director only**.

Open the order → **Approve / Deny**. The modal takes:
- approve or deny,
- the **sponsorship outcome** (this is where the routing decision gets made),
- comments, and a denial reason if denying.

Set the sponsorship status honestly — marking something `successful` when it wasn't skips the
budget check entirely.

### Recording a purchase

On an `approved` order → **Mark Purchased**:

| Field | Notes |
|---|---|
| PO number | The **ⓘ PO info** toggle explains where to find it |
| Actual cost | Defaults to the estimated total; correct it to what was really paid |
| Receipt PDF | Drag-and-drop. **PDF only** — enforced in `uploadOrderReceipt()` |
| Expected delivery date | Feeds the delivery view |
| Tracking number | Optional |

Status → `shipped`.

#### Multi-product purchases (purchase groups)

One Amazon order often covers several requests, and you only get one receipt. Toggle
**multi-product purchase** and select the other orders on the same invoice.

- All selected orders share a `purchase_group_id` (`PG-<timestamp>`).
- The first order is the `purchase_group_primary`.
- The single receipt PDF is stored **once**, named after the primary order's id, and referenced by
  every order in the group via `purchase_group_receipt_file`.
- Each order can still get its own delivery date, since a split shipment is normal.

Handled by `uploadPurchaseGroupReceipt()`
([supabase.js:458](../src/utils/supabase.js#L458)).

### Confirming delivery

On a `shipped` order → **Confirm Delivery**. Records who confirmed, the arrival timestamp, notes
and tracking. Status → `delivered`.

**Actually do this step.** It's how the team knows a part is in the shop rather than still in
transit, and it's what the "current semester" spend reports key off.

### Editing after submission

Requires `edit_orders` — **director only**. Open an order → **Edit Details**. Corrects typos and
costs without walking the workflow backwards.

---

## Filtering and export

### Filters

| Filter | Options |
|---|---|
| Status | all, or any single status |
| Subteam | derived from the distinct `subteam` values present in the data |
| Timeline | **current semester** (default), previous semester, or rolling past year |

Semester boundaries, from `getSemesterDateRange()`:

- **Fall** = August 1 → December 31
- **Spring** = January 1 → May 31

June and July fall in neither range. An order submitted then won't appear under any semester
filter — use the "Year" (rolling 12-month) option to find it.

### Downloading records

**Download** opens a modal: pick a date range, then either

- **Complete packages** — for each order, a generated PDF of the order details *plus* its receipt
  PDF, or
- **Receipts only** — just the receipt PDFs.

Everything is zipped client-side with `jszip` and saved with `file-saver`, named
`solarpack-orders-<complete-packages|receipts-only>-<range>.zip`.

Order-detail PDFs are generated in the browser by `generateOrderDetailsPDF()` using `jsPDF`
(plus `html2canvas` for rendered sections). Purchase groups are handled specially so a shared
receipt appears once with the group rather than duplicated per order.

> **Order PDFs and receipts stay separate files inside the ZIP.** `mergeOrderWithReceipt()` is a
> stub — it returns both blobs rather than combining them, with a comment saying real merging
> needs a library like `pdf-lib`. If accounting wants one file per order, that's the change: add
> `pdf-lib` and merge in that function.

Large ranges are slow: every receipt is downloaded from storage and every PDF rendered in your
browser. Expect tens of seconds for a full semester, and don't close the tab.

---

## Data shape

The database is one wide flat table; the UI works with a nested object. `transformOrderFromDB()`
and `transformOrderToDB()` ([supabase.js:1561](../src/utils/supabase.js#L1561) and
[:1664](../src/utils/supabase.js#L1664)) convert between them.

```js
{
  id, submissionTimestamp, status, lastUpdated,
  submissionDetails: { subteam, submitterName, submitterEmail },
  materialDetails:   { materialName, specifications, materialLink, supplier, supplierContact },
  costBreakdown:     { unitPrice, quantity, subtotal, shippingCost, taxes, fees, totalCost },
  projectDetails:    { purpose, priority, urgency, neededByDate },
  approvalWorkflow: {
    technicalDirectorApproval:        { status, approvedBy, approvalDate, comments, denialReason },
    projectDirectorPurchaseApproval:  { status, approvedBy, approvalDate, comments, denialReason }
  },
  sponsorshipInfo: { canBeSponsored, sponsorContactName, sponsorContactEmail, sponsorCompany,
                     sponsorshipRequested, sponsorshipSuccessful, sponsorshipSearchStatus,
                     sponsorshipResponse, ... },
  purchaseStatus:  { purchased, purchaseDate, purchaseOrderNumber, actualCost, purchasedBy,
                     purchaseGroupId, purchaseGroupPrimary, purchaseGroupReceiptFile },
  deliveryInfo:    { expectedArrivalDate, actualArrivalDate, deliveredToSubteam,
                     deliveryConfirmedBy, deliveryNotes, trackingNumber },
  documentation:   { receiptInvoice: { uploaded, fileName, uploadDate, uploadedBy },
                     additionalDocuments: [] },
  returnInfo:      { returned, returnDate, returnReason, returnAuthorizedBy,
                     refundAmount, refundProcessed }
}
```

### ⚠️ Adding a field means editing four places

1. `alter table orders add column ...` in Supabase (and update
   [supabase-orders-schema.sql](../schemas/supabase-orders-schema.sql) to match).
2. `transformOrderFromDB()` — map the column into the nested object.
3. `transformOrderToDB()` — map it back out.
4. The form and detail JSX in `OrderManager.jsx`.

Miss #2 and the field always reads `undefined`. Miss #3 and it silently never saves — no error,
the write just omits the column. This is the most common bug in this file.

The return/refund fields exist in the schema and the transforms but have **no UI**. Returns are
currently handled by editing the row in Supabase directly.

---

## Receipts and storage

- Bucket: `order-receipts`. Files are named `<orderId>.pdf` (`upsert: true`, so re-uploading
  replaces).
- Only `application/pdf` is accepted — `uploadOrderReceipt()` rejects anything else.
- `getFileNameFromStorageUrl()` extracts the object name from a stored public URL;
  `downloadFileFromStorage()` pulls the blob for exports.

> **The bucket is public.** Because filenames are just order IDs, receipt URLs are trivially
> enumerable, and receipts contain purchase amounts and sometimes PO/card details. To fix: set the
> bucket private in Supabase → Storage → Settings, then replace `getPublicUrl` with
> `createSignedUrl` on the receipt paths in `supabase.js`. Tracked in
> [Security & Handover](security-and-handover.md).

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| **Submit Order** button missing | You're a `member`; `submit_orders` is leader+ | Ask a leader to submit, or change the permission map |
| **Approve** button missing | `approve_orders` is director-only | Ask a director |
| Receipt upload rejected | Not a PDF | Convert it; the check is deliberate |
| Order vanished from the list | Timeline filter defaults to *current semester*, and June/July fall outside every semester range | Switch the filter to "Year" |
| Status text looks wrong/old | Legacy status in the DB, remapped only in memory | Cosmetic. A one-time normalising `UPDATE` fixes it permanently |
| Edited a field, it didn't save | Missing from `transformOrderToDB` | See "Adding a field" above |
| ZIP download hangs | Downloading every receipt + rendering every PDF in-browser | Narrow the date range; keep the tab focused |
| Order stuck in Pending Purchase Approval | Sponsorship marked `in_progress` and never resolved | Set the sponsorship status to `failed`/`not_applicable`, then approve |
| Two orders show the same receipt | They're in the same purchase group | Working as intended |

---

## Related docs

- [Admin Dashboard](admin-dashboard.md) — shared manager behaviour
- [Database Reference](database-reference.md#orders) — every column
- [Authentication](authentication.md) — who can do what
- [Supabase Setup](supabase.md) — buckets and RLS
