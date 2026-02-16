-- FIX: RLS Infinite Recursion on Profiles Table

-- 1. Create a helper function to get the current user's family_id
-- We use SECURITY DEFINER to bypass RLS within this function, preventing the loop
create or replace function get_my_family_id()
returns uuid as $$
  select family_id from public.profiles where id = auth.uid();
$$ language sql security definer stable;

-- 2. Drop the problematic recursive policy
drop policy if exists "Users can view family members" on public.profiles;

-- 3. Re-create the policy using the safe function
create policy "Users can view family members"
on public.profiles for select
using (
  -- Allow users to see themselves OR members of their family
  id = auth.uid() 
  or 
  family_id = get_my_family_id()
);

-- 4. Optimizing other policies (Optional but recommended to prevent future recursion issues)

-- Missions
drop policy if exists "Missions viewable by family" on public.missions;
create policy "Missions viewable by family"
on public.missions for select
using (
  family_id = get_my_family_id()
);

drop policy if exists "Admins can manage missions" on public.missions;
create policy "Admins can manage missions"
on public.missions for all
using (
  family_id = get_my_family_id()
  and exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN') -- This lookup is usually safe if specific by ID
);
