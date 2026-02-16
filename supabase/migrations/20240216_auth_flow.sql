-- Migration: Update handle_new_user for Parent/Child Flow
-- Logic: 
-- 1. If 'invite_code' is present in metadata -> Join existing family as PLAYER
-- 2. If 'role' is 'ADMIN' (Parent) -> Create NEW family, set user as ADMIN

create or replace function public.handle_new_user()
returns trigger as $$
declare
  v_family_id uuid;
  v_role text;
  v_invite_code text;
  v_full_name text;
begin
  -- Extract metadata
  v_full_name := new.raw_user_meta_data->>'full_name';
  v_invite_code := new.raw_user_meta_data->>'invite_code';
  v_role := coalesce(new.raw_user_meta_data->>'role', 'PLAYER'); -- Default to PLAYER if missing

  -- Logic for PLAYER joining with code
  if v_invite_code is not null and length(v_invite_code) > 0 then
    -- Find family by invite code
    select id into v_family_id from public.families where invite_code = v_invite_code;
    
    if v_family_id is null then
      raise exception 'Invalid invite code';
    end if;
    
    v_role := 'PLAYER'; -- Force role to PLAYER if joining
  
  -- Logic for PARENT creating new family
  elsif v_role = 'ADMIN' then
    -- Create new family
    insert into public.families (name, invite_code)
    values (
      coalesce(v_full_name, 'Family') || '''s Family', 
      substr(md5(random()::text), 0, 8) -- Generate discrete invite code
    )
    returning id into v_family_id;
    
  else
    -- Fallback: If no code and not claiming Admin, what to do?
    -- For now, maybe create a solo family or error?
    -- Let's auto-create a family to be safe, acting as Admin
    v_role := 'ADMIN';
    insert into public.families (name, invite_code)
    values (
      coalesce(v_full_name, 'Family') || '''s Family', 
      substr(md5(random()::text), 0, 8)
    )
    returning id into v_family_id;
  end if;

  -- Insert Profile
  insert into public.profiles (id, family_id, role, username, avatar_url)
  values (
    new.id, 
    v_family_id, 
    v_role, 
    v_full_name, 
    new.raw_user_meta_data->>'avatar_url'
  );

  return new;
end;
$$ language plpgsql security definer;
