create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  icon_name text,
  accent_color text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  short_description text not null,
  description_markdown text,
  price_type text not null check (price_type in ('fixed','contact','free')),
  price_vnd bigint,
  old_price_vnd bigint,
  price_label text,
  version text,
  license_text text,
  compatibility text[] not null default array['Windows 10','Windows 11'],
  file_size text,
  language_support text[],
  badge text,
  icon_url text,
  cover_image_url text,
  tutorial_video_url text,
  demo_url text,
  primary_cta_label text,
  primary_cta_type text not null default 'contact' check (primary_cta_type in ('contact','external','detail')),
  primary_cta_url text,
  features jsonb not null default '[]'::jsonb,
  system_requirements jsonb not null default '[]'::jsonb,
  changelog jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tool_media (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid not null references public.tools(id) on delete cascade,
  media_type text not null check (media_type in ('image','video')),
  url text not null,
  thumbnail_url text,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  short_description text not null,
  description_markdown text,
  icon_name text,
  cover_image_url text,
  price_label text not null default 'Liên hệ báo giá',
  features jsonb not null default '[]'::jsonb,
  process_steps jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  primary_cta_label text not null default 'Yêu cầu tư vấn',
  seo_title text,
  seo_description text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type text not null check (inquiry_type in ('general','tool','service','quote')),
  tool_id uuid references public.tools(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  company text,
  preferred_contact text,
  message text not null,
  status text not null default 'new' check (status in ('new','reviewing','contacted','completed','spam')),
  admin_notes text,
  source_page text,
  ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiry_rate_limits (
  ip_hash text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 1
);

create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  brand_name text not null default 'ToolBox Việt',
  logo_url text,
  favicon_url text,
  support_phone text,
  support_email text,
  zalo_url text,
  facebook_url text,
  youtube_url text,
  address text,
  copyright_text text,
  default_seo_title text,
  default_seo_description text,
  updated_at timestamptz not null default now()
);

create table if not exists public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  section_key text not null,
  title text,
  content jsonb not null default '{}'::jsonb,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_key, section_key)
);

create table if not exists public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users(id),
  action text not null check (action in ('create','update','delete','publish','unpublish','inquiry_status_change')),
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_admin_users_updated_at before update on public.admin_users for each row execute function public.set_updated_at();
create trigger set_categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
create trigger set_tools_updated_at before update on public.tools for each row execute function public.set_updated_at();
create trigger set_services_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger set_inquiries_updated_at before update on public.inquiries for each row execute function public.set_updated_at();
create trigger set_content_blocks_updated_at before update on public.content_blocks for each row execute function public.set_updated_at();
create trigger set_site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users au
    where au.user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create index if not exists categories_slug_idx on public.categories(slug);
create index if not exists categories_published_idx on public.categories(is_published);
create index if not exists categories_sort_idx on public.categories(sort_order);
create index if not exists tools_slug_idx on public.tools(slug);
create index if not exists tools_published_idx on public.tools(is_published);
create index if not exists tools_sort_idx on public.tools(sort_order);
create index if not exists tools_category_idx on public.tools(category_id);
create index if not exists tools_search_idx on public.tools using gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(short_description,'')));
create index if not exists services_slug_idx on public.services(slug);
create index if not exists services_published_idx on public.services(is_published);
create index if not exists services_sort_idx on public.services(sort_order);
create index if not exists inquiries_status_idx on public.inquiries(status);
create index if not exists inquiries_created_at_idx on public.inquiries(created_at desc);
create index if not exists content_blocks_page_idx on public.content_blocks(page_key, section_key);
create index if not exists tool_media_tool_idx on public.tool_media(tool_id, sort_order);

alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.tools enable row level security;
alter table public.tool_media enable row level security;
alter table public.services enable row level security;
alter table public.inquiries enable row level security;
alter table public.inquiry_rate_limits enable row level security;
alter table public.site_settings enable row level security;
alter table public.content_blocks enable row level security;
alter table public.admin_activity_logs enable row level security;

create policy "public read published categories" on public.categories for select using (is_published = true);
create policy "admin manage categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published tools" on public.tools for select using (is_published = true);
create policy "admin manage tools" on public.tools for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published tool media" on public.tool_media for select using (
  exists (select 1 from public.tools t where t.id = tool_id and t.is_published = true)
);
create policy "admin manage tool media" on public.tool_media for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published services" on public.services for select using (is_published = true);
create policy "admin manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());

create policy "admin read update inquiries" on public.inquiries for select using (public.is_admin());
create policy "admin update inquiries" on public.inquiries for update using (public.is_admin()) with check (public.is_admin());
create policy "admin delete inquiries" on public.inquiries for delete using (public.is_admin());

create policy "public read site settings" on public.site_settings for select using (id = 1);
create policy "admin manage site settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "public read published content" on public.content_blocks for select using (is_published = true);
create policy "admin manage content" on public.content_blocks for all using (public.is_admin()) with check (public.is_admin());

create policy "admin read admin users" on public.admin_users for select using (public.is_admin());
create policy "admin read activity logs" on public.admin_activity_logs for select using (public.is_admin());
create policy "admin insert activity logs" on public.admin_activity_logs for insert with check (public.is_admin());

insert into public.site_settings (id, brand_name, support_phone, support_email, copyright_text, default_seo_title, default_seo_description)
values (1, 'ToolBox Việt', '0900 000 000', 'hello@toolboxviet.vn', '© 2026 ToolBox Việt. Tất cả quyền được bảo lưu.', 'ToolBox Việt - Công cụ Windows và phần mềm tùy chỉnh', 'Cửa hàng tool Windows, phần mềm EXE và dịch vụ phát triển phần mềm tùy chỉnh cho doanh nghiệp Việt Nam.')
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-assets',
  'site-assets',
  true,
  5242880,
  array['image/png','image/jpeg','image/webp']
)
on conflict (id) do nothing;

create policy "public read site assets" on storage.objects for select using (bucket_id = 'site-assets');
create policy "admin upload site assets" on storage.objects for insert with check (bucket_id = 'site-assets' and public.is_admin());
create policy "admin update site assets" on storage.objects for update using (bucket_id = 'site-assets' and public.is_admin()) with check (bucket_id = 'site-assets' and public.is_admin());
create policy "admin delete site assets" on storage.objects for delete using (bucket_id = 'site-assets' and public.is_admin());
