-- Run this in your Supabase project: SQL Editor -> New query -> paste -> Run.
-- It creates the content store and the contact-message inbox, with row-level security.

-- 1) Site content (a single JSON row the admin edits)
create table if not exists public.content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.content enable row level security;

-- Anyone can read site content (the public portfolio needs it)...
drop policy if exists "content_public_read" on public.content;
create policy "content_public_read" on public.content
  for select using (true);

-- ...but only a logged-in admin can change it.
drop policy if exists "content_admin_write" on public.content;
create policy "content_admin_write" on public.content
  for all to authenticated using (true) with check (true);

-- 2) Contact messages (the dashboard inbox)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Visitors (anon) can submit a message...
drop policy if exists "messages_public_insert" on public.contact_messages;
create policy "messages_public_insert" on public.contact_messages
  for insert to anon, authenticated with check (true);

-- ...but only the admin can read, update (mark read), or delete them.
drop policy if exists "messages_admin_read" on public.contact_messages;
create policy "messages_admin_read" on public.contact_messages
  for select to authenticated using (true);

drop policy if exists "messages_admin_update" on public.contact_messages;
create policy "messages_admin_update" on public.contact_messages
  for update to authenticated using (true) with check (true);

drop policy if exists "messages_admin_delete" on public.contact_messages;
create policy "messages_admin_delete" on public.contact_messages
  for delete to authenticated using (true);

-- 3) Create your admin user:
--    Supabase dashboard -> Authentication -> Users -> "Add user"
--    (set email + password; that's what you'll log in with at /#/admin)
