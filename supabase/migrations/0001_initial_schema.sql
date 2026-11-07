create extension if not exists pgcrypto;

create or replace function public.set_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end; $$;

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 username text unique, display_name text, avatar_url text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 constraint username_format check (username is null or username ~ '^[a-zA-Z0-9_]{3,30}$')
);
create table public.projects (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
 title text not null, description text not null default '',
 visibility text not null default 'private' check (visibility in ('private','unlisted','public')),
 status text not null default 'active' check (status in ('active','archived')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 constraint project_title_length check (char_length(title) between 1 and 120)
);
create table public.episodes (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
 owner_id uuid not null references auth.users(id) on delete cascade, episode_number integer not null check (episode_number > 0),
 title text not null, synopsis text not null default '',
 target_duration_seconds integer not null default 600 check (target_duration_seconds between 30 and 7200),
 language text not null default 'te', status text not null default 'draft' check (status in ('draft','planning','production','completed')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 constraint episode_number_unique unique (project_id, episode_number)
);
create table public.characters (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade,
 owner_id uuid not null references auth.users(id) on delete cascade, name text not null,
 age integer check (age is null or age between 0 and 5000), description text not null default '',
 appearance jsonb not null default '{}'::jsonb, visual_style text not null default 'anime',
 identity_version integer not null default 1 check (identity_version > 0), is_locked boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.character_references (
 id uuid primary key default gen_random_uuid(), character_id uuid not null references public.characters(id) on delete cascade,
 owner_id uuid not null references auth.users(id) on delete cascade, storage_path text not null unique,
 reference_type text not null default 'identity' check (reference_type in ('identity','front','side','back','expression','outfit','pose')),
 is_approved boolean not null default false, version integer not null default 1 check (version > 0), created_at timestamptz not null default now()
);

create index projects_owner_created_idx on public.projects(owner_id, created_at desc);
create index episodes_project_idx on public.episodes(project_id, episode_number);
create index characters_project_idx on public.characters(project_id);
create index character_references_character_idx on public.character_references(character_id);

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger episodes_updated_at before update on public.episodes for each row execute function public.set_updated_at();
create trigger characters_updated_at before update on public.characters for each row execute function public.set_updated_at();

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$ begin insert into public.profiles(id, display_name) values(new.id, coalesce(new.raw_user_meta_data ->> 'display_name','')); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.episodes enable row level security;
alter table public.characters enable row level security;
alter table public.character_references enable row level security;

create policy profiles_select_own on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy profiles_update_own on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy projects_owner_select on public.projects for select to authenticated using (owner_id = (select auth.uid()));
create policy projects_owner_insert on public.projects for insert to authenticated with check (owner_id = (select auth.uid()));
create policy projects_owner_update on public.projects for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy projects_owner_delete on public.projects for delete to authenticated using (owner_id = (select auth.uid()));

create policy episodes_owner_select on public.episodes for select to authenticated using (owner_id = (select auth.uid()));
create policy episodes_owner_insert on public.episodes for insert to authenticated with check (owner_id = (select auth.uid()) and exists (select 1 from public.projects p where p.id = project_id and p.owner_id = (select auth.uid())));
create policy episodes_owner_update on public.episodes for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()) and exists (select 1 from public.projects p where p.id = project_id and p.owner_id = (select auth.uid())));
create policy episodes_owner_delete on public.episodes for delete to authenticated using (owner_id = (select auth.uid()));

create policy characters_owner_all on public.characters for all to authenticated using (owner_id = (select auth.uid()) and exists (select 1 from public.projects p where p.id = project_id and p.owner_id = (select auth.uid()))) with check (owner_id = (select auth.uid()) and exists (select 1 from public.projects p where p.id = project_id and p.owner_id = (select auth.uid())));
create policy character_references_owner_all on public.character_references for all to authenticated using (owner_id = (select auth.uid()) and exists (select 1 from public.characters c where c.id = character_id and c.owner_id = (select auth.uid()))) with check (owner_id = (select auth.uid()) and exists (select 1 from public.characters c where c.id = character_id and c.owner_id = (select auth.uid())));

-- Public registration is separate from public project publication. Until the curated publication flow is implemented, all creator records remain private.
-- Create Storage bucket studio-assets as PRIVATE. Add storage.objects policies before enabling reference uploads.
