-- Role guard for user_roles.
--
-- RLS lets every user update (and insert) their own user_roles row so they can
-- edit their profile. Without this trigger that also let anyone set their own
-- level to 'director' and approval_status to 'approved', skipping the approval
-- gate. This trigger keeps the role columns director-only.
--
-- Requests with no auth.uid() (SQL editor, service_role, the on_auth_user_created
-- signup trigger) are trusted and pass through untouched.

create or replace function public.guard_user_role_privileges()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return new;
  end if;

  if tg_op = 'INSERT' then
    if not public.is_approved_director() then
      new.level := 'member';
      new.approval_status := 'pending';
      new.approved_by := null;
      new.approved_at := null;
    end if;
    return new;
  end if;

  if (new.level, new.approval_status, new.approved_by, new.approved_at, new.user_id)
       is distinct from
     (old.level, old.approval_status, old.approved_by, old.approved_at, old.user_id)
     and not public.is_approved_director() then
    raise exception 'Only approved directors can change roles or approvals'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

drop trigger if exists guard_user_role_privileges on public.user_roles;
create trigger guard_user_role_privileges
  before insert or update on public.user_roles
  for each row execute function public.guard_user_role_privileges();

-- Pin search_path on the timestamp trigger (it is SECURITY DEFINER).
alter function public.update_user_role_timestamp() set search_path = public;
