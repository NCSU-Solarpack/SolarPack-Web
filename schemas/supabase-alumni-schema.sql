-- Table: public.alumni
create table public.alumni (
  id bigserial not null,
  semester text not null,
  leadership jsonb null default '[]'::jsonb,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  "order" integer null default 0,
  constraint alumni_pkey primary key (id)
) TABLESPACE pg_default;