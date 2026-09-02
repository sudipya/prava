create table if not exists wallets (
  id bigserial primary key,
  user_id uuid not null,
  currency char(3) not null,
  balance numeric(24,8) not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, currency)
);

create table if not exists payment_requests (
  id uuid primary key default gen_random_uuid(),
  sender_user_id uuid not null,
  recipient_uid text,
  recipient_phone text,
  currency char(3) not null,
  amount numeric(24,8) not null check (amount > 0),
  status text not null default 'pending' check (status in ('pending','paid','cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists payment_requests_sender_idx on payment_requests(sender_user_id, created_at desc);
