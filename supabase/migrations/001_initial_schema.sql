-- Plans
create table plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_sar numeric(10,2) not null,
  monthly_limit integer not null,
  image_access text not null check (image_access in ('men', 'women', 'both')),
  is_active boolean not null default true
);

-- Profiles (extends Supabase Auth)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

-- API Keys
create table api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  key_hash text not null unique,
  key_prefix text not null,
  plan_id uuid not null references plans(id),
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended')),
  monthly_limit integer not null,
  calls_this_month integer not null default 0,
  calls_reset_at timestamptz not null default date_trunc('month', now()) + interval '1 month',
  created_at timestamptz not null default now(),
  expires_at timestamptz
);

-- Payments
create table payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  plan_id uuid not null references plans(id),
  amount_sar numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  streampay_transaction_id text not null,
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

-- Images catalog
create table images (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  gender text not null check (gender in ('men', 'women')),
  muscle_group text not null,
  cdn_url text not null,
  is_active boolean not null default true,
  sort_order integer not null default 0
);

-- Row Level Security
alter table profiles enable row level security;
alter table api_keys enable row level security;
alter table payments enable row level security;
alter table images enable row level security;
alter table plans enable row level security;

-- RLS Policies
create policy "Users can read own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Users can read own api_keys" on api_keys for select using (auth.uid() = user_id);

create policy "Users can read own payments" on payments for select using (auth.uid() = user_id);
create policy "Users can insert own payments" on payments for insert with check (auth.uid() = user_id);

create policy "Active images are public" on images for select using (is_active = true);
create policy "Active plans are public" on plans for select using (is_active = true);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
