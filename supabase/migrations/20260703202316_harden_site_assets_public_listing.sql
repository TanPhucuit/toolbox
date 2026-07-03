drop policy if exists "public read site assets" on storage.objects;

revoke execute on function public.is_admin() from anon;
revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
