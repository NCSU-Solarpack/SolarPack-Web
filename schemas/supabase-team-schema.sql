create table public.team_members (
  id bigserial not null,
  name text not null,
  role text not null,
  image text null,
  bio text null,
  email text null,
  linkedin text null,
  "order" integer null default 0,
  user_id uuid null references user_roles(user_id) on delete set null,  -- Link to user account
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint team_members_pkey primary key (id)
) TABLESPACE pg_default;