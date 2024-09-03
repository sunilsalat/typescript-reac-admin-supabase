create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
  declare
    claims jsonb;
    user_role text; 
  begin
    -- Fetch the user role in the profile table
    select role into user_role from public.profile where user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    event := jsonb_set(event, '{claims}', claims);

    return event;
  end;
$$;

grant usage on schema public to supabase_auth_admin;

grant execute
  on function public.custom_access_token_hook
  to supabase_auth_admin;

revoke execute
  on function public.custom_access_token_hook
  from authenticated, anon, public;

grant all
  on table public.profile
to supabase_auth_admin;

revoke all
  on table public.profile
  from  anon, public;

create policy "Allow auth admin to read profiles" ON public.profile
as permissive for select
to supabase_auth_admin
using (true);


-- function to check rbac
CREATE OR REPLACE FUNCTION public.authorize(
  requested_permission TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  bind_permissions INT;
  user_role public.app_role;
BEGIN
  SELECT (auth.jwt() ->> 'user_role')::public.app_role INTO user_role;

  -- Check if the requested_permission exists 
  SELECT COUNT(*)
  INTO bind_permissions
  FROM public.access_policies
  WHERE access_policies.policy_name = requested_permission
    AND access_policies.role_name = user_role;

  -- If permissions is NULL raise an error
  IF bind_permissions IS NULL THEN  
    RAISE EXCEPTION 'Requested permission does not exist';
  END IF;

  RETURN bind_permissions > 0;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = '';


