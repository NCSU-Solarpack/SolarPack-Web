-- Orders table schema for SolarPack team order management system
-- This table tracks material orders from submission through delivery

CREATE TABLE public.orders (
  id bigserial NOT NULL,
  submission_timestamp timestamp with time zone NULL DEFAULT now(),
  subteam text NULL,
  submitter_name text NULL,
  submitter_email text NULL,
  created_by text NULL,
  material_name text NOT NULL,
  specifications text NULL,
  material_link text NULL,
  supplier text NULL,
  supplier_contact text NULL,
  unit_price numeric(10, 2) NULL,
  quantity integer NULL DEFAULT 1,
  subtotal numeric(10, 2) NULL,
  shipping_cost numeric(10, 2) NULL DEFAULT 0,
  taxes numeric(10, 2) NULL DEFAULT 0,
  fees numeric(10, 2) NULL DEFAULT 0,
  total_cost numeric(10, 2) NULL,
  purpose text NULL,
  priority text NULL DEFAULT 'medium'::text,
  urgency text NULL DEFAULT 'flexible'::text,
  needed_by_date timestamp with time zone NULL,
  tech_approval_status text NULL DEFAULT 'pending'::text,
  tech_approved_by text NULL,
  tech_approval_date timestamp with time zone NULL,
  tech_comments text NULL,
  tech_denial_reason text NULL,
  project_approval_status text NULL DEFAULT 'pending'::text,
  project_approved_by text NULL,
  project_approval_date timestamp with time zone NULL,
  project_comments text NULL,
  project_denial_reason text NULL,
  can_be_sponsored boolean NULL DEFAULT false,
  sponsor_contact_name text NULL,
  sponsor_contact_email text NULL,
  sponsor_company text NULL,
  sponsorship_requested boolean NULL DEFAULT false,
  sponsorship_request_date timestamp with time zone NULL,
  sponsorship_successful boolean NULL DEFAULT false,
  sponsorship_response text NULL,
  sponsorship_response_date timestamp with time zone NULL,
  sponsorship_search_status text NULL DEFAULT 'not_started'::text,
  purchased boolean NULL DEFAULT false,
  purchase_date timestamp with time zone NULL,
  purchase_order_number text NULL,
  actual_cost numeric(10, 2) NULL,
  purchased_by text NULL,
  expected_arrival_date timestamp with time zone NULL,
  actual_arrival_date timestamp with time zone NULL,
  delivered_to_subteam boolean NULL DEFAULT false,
  delivery_confirmed_by text NULL,
  delivery_notes text NULL,
  tracking_number text NULL,
  receipt_uploaded boolean NULL DEFAULT false,
  receipt_file_name text NULL,
  receipt_upload_date timestamp with time zone NULL,
  receipt_uploaded_by text NULL,
  additional_documents jsonb NULL DEFAULT '[]'::jsonb,
  returned boolean NULL DEFAULT false,
  return_date timestamp with time zone NULL,
  return_reason text NULL,
  return_authorized_by text NULL,
  refund_amount numeric(10, 2) NULL,
  refund_processed boolean NULL DEFAULT false,
  status text NULL DEFAULT 'pending_technical_approval'::text,
  last_updated timestamp with time zone NULL DEFAULT now(),
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Add indexes for commonly queried fields
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_subteam ON public.orders(subteam);
CREATE INDEX idx_orders_submitter_email ON public.orders(submitter_email);
CREATE INDEX idx_orders_created_at ON public.orders(created_at);
CREATE INDEX idx_orders_tech_approval_status ON public.orders(tech_approval_status);
CREATE INDEX idx_orders_project_approval_status ON public.orders(project_approval_status);

-- Add check constraints for enum-like fields
ALTER TABLE public.orders 
  ADD CONSTRAINT check_priority 
  CHECK (priority IN ('low', 'medium', 'high', 'critical'));

ALTER TABLE public.orders 
  ADD CONSTRAINT check_urgency 
  CHECK (urgency IN ('flexible', 'moderate', 'urgent', 'critical'));

ALTER TABLE public.orders 
  ADD CONSTRAINT check_tech_approval_status 
  CHECK (tech_approval_status IN ('pending', 'approved', 'denied', 'on_hold'));

ALTER TABLE public.orders 
  ADD CONSTRAINT check_project_approval_status 
  CHECK (project_approval_status IN ('pending', 'approved', 'denied', 'on_hold'));

ALTER TABLE public.orders 
  ADD CONSTRAINT check_sponsorship_search_status 
  CHECK (sponsorship_search_status IN ('not_started', 'in_progress', 'successful', 'failed', 'not_applicable'));

ALTER TABLE public.orders 
  ADD CONSTRAINT check_status 
  CHECK (status IN (
    'pending_technical_approval',
    'pending_project_approval', 
    'approved',
    'denied',
    'purchased',
    'shipped',
    'delivered',
    'completed',
    'cancelled',
    'returned'
  ));

-- Add trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON public.orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies if needed
-- ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Example policy for authenticated users
-- CREATE POLICY "Users can view orders" ON public.orders
--   FOR SELECT USING (auth.role() = 'authenticated');

-- Example policy for order creators
-- CREATE POLICY "Users can insert their own orders" ON public.orders
--   FOR INSERT WITH CHECK (auth.email() = submitter_email);

-- Grant permissions
GRANT ALL ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
GRANT USAGE ON SEQUENCE public.orders_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE public.orders_id_seq TO service_role;