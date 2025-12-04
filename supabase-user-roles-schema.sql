create table public.user_roles (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  email text not null,
  level text not null default 'member'::text,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  specific_role text null,
  first_name text null,
  last_name text null,
  phone_number text null,
  constraint user_roles_pkey primary key (id),
  constraint user_roles_email_key unique (email),
  constraint user_roles_user_id_key unique (user_id),
  constraint user_roles_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint user_roles_level_check check (
    (
      level = any (
        array['member'::text, 'leader'::text, 'director'::text]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_user_roles_user_id on public.user_roles using btree (user_id) TABLESPACE pg_default;

create index IF not exists idx_user_roles_email on public.user_roles using btree (email) TABLESPACE pg_default;

create trigger update_user_roles_updated_at BEFORE
update on user_roles for EACH row
execute FUNCTION update_user_role_timestamp ();