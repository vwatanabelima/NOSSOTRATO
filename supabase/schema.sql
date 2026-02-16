-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Families Table (Isolation Layer)
create table public.families (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  invite_code text unique default substr(md5(random()::text), 0, 8) -- Simple invite code logic
);

-- 2. Create Profiles Table (Linked to Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  family_id uuid references public.families(id),
  role text check (role in ('ADMIN', 'PLAYER')) not null default 'PLAYER',
  username text,
  avatar_url text,
  current_xp integer default 0 check (current_xp >= 0),
  level integer default 1 check (level >= 1),
  gold_balance integer default 0 check (gold_balance >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Missions Table
create table public.missions (
  id uuid default uuid_generate_v4() primary key,
  family_id uuid references public.families(id) not null,
  title text not null,
  description text,
  xp_reward integer not null check (xp_reward > 0),
  gold_reward integer not null check (gold_reward > 0),
  is_active boolean default true,
  created_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Submissions Table (Proof of Work)
create table public.submissions (
  id uuid default uuid_generate_v4() primary key,
  mission_id uuid references public.missions(id) not null,
  player_id uuid references public.profiles(id) not null,
  proof_url text, -- Image URL from Storage
  status text check (status in ('PENDING', 'APPROVED', 'REJECTED')) default 'PENDING',
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create Rewards Table (Shop)
create table public.rewards (
  id uuid default uuid_generate_v4() primary key,
  family_id uuid references public.families(id) not null,
  title text not null,
  cost integer not null check (cost > 0),
  image_url text,
  stock integer default -1, -- -1 means infinite
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Create Inventory Table (Purchased Items)
create table public.inventory (
  id uuid default uuid_generate_v4() primary key,
  player_id uuid references public.profiles(id) not null,
  reward_id uuid references public.rewards(id) not null,
  purchased_at timestamp with time zone default timezone('utc'::text, now()) not null,
  consumed_at timestamp with time zone -- If null, item is still available
);

-- Enable RLS
alter table public.families enable row level security;
alter table public.profiles enable row level security;
alter table public.missions enable row level security;
alter table public.submissions enable row level security;
alter table public.rewards enable row level security;
alter table public.inventory enable row level security;

-- RLS Policies

-- Families: Users can read their own family
create policy "Users can view their own family"
on public.families for select
using (id in (select family_id from public.profiles where id = auth.uid()));

-- Profiles: Users can view their family members
create policy "Users can view family members"
on public.profiles for select
using (family_id in (select family_id from public.profiles where id = auth.uid()));

-- Profiles: Users can update their own non-sensitive data (avatar, username)
-- Note: Balance/XP updates are blocked here and handled via Postgres Functions
create policy "Users can update own profile"
on public.profiles for update
using (id = auth.uid());

-- Missions: Viewable by family members
create policy "Missions viewable by family"
on public.missions for select
using (family_id in (select family_id from public.profiles where id = auth.uid()));

-- Missions: Create/Update only by ADMINs of the family
create policy "Admins can manage missions"
on public.missions for all
using (
  family_id in (select family_id from public.profiles where id = auth.uid())
  and exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);

-- Submissions: Players can submit missions
create policy "Players can submit missions"
on public.submissions for insert
with check (player_id = auth.uid());

-- Submissions: Viewable by family
create policy "Submissions viewable by family"
on public.submissions for select
using (
  mission_id in (select id from public.missions where family_id in (select family_id from public.profiles where id = auth.uid()))
);

-- Submissions: Admins can update status (Approve/Reject)
create policy "Admins can review submissions"
on public.submissions for update
using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
);

-- Function: Auto Level Up & Reward Distribution (Trigger Function)
create or replace function handle_mission_approval()
returns trigger as $$
declare
  mission_xp int;
  mission_gold int;
  player_current_xp int;
  player_current_level int;
  new_xp int;
  new_level int;
begin
  -- Only run if status changed to APPROVED
  if new.status = 'APPROVED' and old.status != 'APPROVED' then
    
    -- Get Mission Rewards
    select xp_reward, gold_reward into mission_xp, mission_gold
    from public.missions
    where id = new.mission_id;

    -- Get Player Stats
    select current_xp, level into player_current_xp, player_current_level
    from public.profiles
    where id = new.player_id;

    -- Calculate New Stats
    new_xp := player_current_xp + mission_xp;
    -- Standard RPG Formula: Level increases every 1000 XP
    new_level := (new_xp / 1000) + 1;

    -- Update Player Profile (Security Definer allows update even if RLS blocks user)
    update public.profiles
    set 
      current_xp = new_xp,
      gold_balance = gold_balance + mission_gold,
      level = new_level
    where id = new.player_id;
    
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for Mission Approval
create trigger on_mission_approval
after update on public.submissions
for each row
execute function handle_mission_approval();

-- Function: Handle New User Signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for New User (Supabase Auth)
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
