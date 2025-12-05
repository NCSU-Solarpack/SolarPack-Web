create table public.orders (
  id bigserial not null,
  submission_timestamp timestamp with time zone null default now(),
  subteam text null,
  submitter_name text null,
  submitter_email text null,
  created_by text null,
  material_name text not null,
  specifications text null,
  material_link text null,
  supplier text null,
  supplier_contact text null,
  unit_price numeric(10, 2) null,
  quantity integer null default 1,
  subtotal numeric(10, 2) null,
  shipping_cost numeric(10, 2) null default 0,
  taxes numeric(10, 2) null default 0,
  fees numeric(10, 2) null default 0,
  total_cost numeric(10, 2) null,
  purpose text null,
  priority text null default 'medium'::text,
  urgency text null default 'flexible'::text,
  needed_by_date timestamp with time zone null,
  tech_approval_status text null default 'pending'::text,
  tech_approved_by text null,
  tech_approval_date timestamp with time zone null,
  tech_comments text null,
  tech_denial_reason text null,
  project_approval_status text null default 'pending'::text,
  project_approved_by text null,
  project_approval_date timestamp with time zone null,
  project_comments text null,
  project_denial_reason text null,
  can_be_sponsored boolean null default false,
  sponsor_contact_name text null,
  sponsor_contact_email text null,
  sponsor_company text null,
  sponsorship_requested boolean null default false,
  sponsorship_request_date timestamp with time zone null,
  sponsorship_successful boolean null default false,
  sponsorship_response text null,
  sponsorship_response_date timestamp with time zone null,
  sponsorship_search_status text null default 'not_started'::text,
  purchased boolean null default false,
  purchase_date timestamp with time zone null,
  purchase_order_number text null,
  actual_cost numeric(10, 2) null,
  purchased_by text null,
  expected_arrival_date timestamp with time zone null,
  actual_arrival_date timestamp with time zone null,
  delivered_to_subteam boolean null default false,
  delivery_confirmed_by text null,
  delivery_notes text null,
  tracking_number text null,
  receipt_uploaded boolean null default false,
  receipt_file_name text null,
  receipt_upload_date timestamp with time zone null,
  receipt_uploaded_by text null,
  additional_documents jsonb null default '[]'::jsonb,
  returned boolean null default false,
  return_date timestamp with time zone null,
  return_reason text null,
  return_authorized_by text null,
  refund_amount numeric(10, 2) null,
  refund_processed boolean null default false,
  status text null default 'pending_technical_approval'::text,
  last_updated timestamp with time zone null default now(),
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  purchase_group_id text null,
  purchase_group_primary boolean null default false,
  purchase_group_receipt_file text null,
  constraint orders_pkey primary key (id),
  constraint check_project_approval_status check (
    (
      project_approval_status = any (
        array[
          'pending'::text,
          'approved'::text,
          'denied'::text,
          'on_hold'::text
        ]
      )
    )
  ),
  constraint check_sponsorship_search_status check (
    (
      sponsorship_search_status = any (
        array[
          'not_started'::text,
          'in_progress'::text,
          'successful'::text,
          'failed'::text,
          'not_applicable'::text
        ]
      )
    )
  ),
  constraint check_priority check (
    (
      priority = any (
        array[
          'low'::text,
          'medium'::text,
          'high'::text,
          'critical'::text
        ]
      )
    )
  ),
  constraint check_tech_approval_status check (
    (
      tech_approval_status = any (
        array[
          'pending'::text,
          'approved'::text,
          'denied'::text,
          'on_hold'::text
        ]
      )
    )
  ),
  constraint check_urgency check (
    (
      urgency = any (
        array[
          'flexible'::text,
          'moderate'::text,
          'urgent'::text,
          'critical'::text
        ]
      )
    )
  ),
  constraint check_status check (
    (
      status = any (
        array[
          'pending_technical_approval'::text,
          'pending_project_approval'::text,
          'approved'::text,
          'denied'::text,
          'purchased'::text,
          'shipped'::text,
          'delivered'::text,
          'completed'::text,
          'cancelled'::text,
          'returned'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_orders_purchase_group_id on public.orders using btree (purchase_group_id) TABLESPACE pg_default;

create index IF not exists idx_orders_status on public.orders using btree (status) TABLESPACE pg_default;

create index IF not exists idx_orders_subteam on public.orders using btree (subteam) TABLESPACE pg_default;

create index IF not exists idx_orders_submitter_email on public.orders using btree (submitter_email) TABLESPACE pg_default;

create index IF not exists idx_orders_created_at on public.orders using btree (created_at) TABLESPACE pg_default;

create index IF not exists idx_orders_tech_approval_status on public.orders using btree (tech_approval_status) TABLESPACE pg_default;

create index IF not exists idx_orders_project_approval_status on public.orders using btree (project_approval_status) TABLESPACE pg_default;

create trigger update_orders_updated_at BEFORE
update on orders for EACH row
execute FUNCTION update_updated_at_column ();