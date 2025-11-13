create table public.sponsors (
  id bigserial not null,
  tier text not null,
  name text not null,
  logo text null,
  website text null,
  "order" integer null default 0,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint sponsors_pkey primary key (id)
) TABLESPACE pg_default;