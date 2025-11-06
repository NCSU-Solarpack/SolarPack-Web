-- Migration to add missing sponsorship_search_status column
-- Run this in your Supabase SQL editor

-- Add the missing column
ALTER TABLE public.orders 
  ADD COLUMN sponsorship_search_status text DEFAULT 'not_started';

-- Add constraint to ensure valid values
ALTER TABLE public.orders 
  ADD CONSTRAINT check_sponsorship_search_status 
  CHECK (sponsorship_search_status IN ('not_started', 'in_progress', 'successful', 'failed', 'not_applicable'));

-- Update existing records to have appropriate values based on existing sponsorship fields
UPDATE public.orders 
SET sponsorship_search_status = CASE 
  WHEN sponsorship_successful = true THEN 'successful'
  WHEN sponsorship_requested = true AND sponsorship_successful = false AND sponsorship_response IS NOT NULL THEN 'failed'
  WHEN sponsorship_requested = true AND sponsorship_response IS NULL THEN 'in_progress'
  WHEN can_be_sponsored = false THEN 'not_applicable'
  ELSE 'not_started'
END;
