update public.site_settings
set
  brand_name = 'toolbox giá rẻ',
  copyright_text = '© 2026 toolbox giá rẻ. Tất cả quyền được bảo lưu.',
  default_seo_title = 'toolbox giá rẻ - Tool Windows xử lý file hàng loạt',
  default_seo_description = 'toolbox giá rẻ cung cấp tool Windows xử lý ảnh, PDF, CSV, Excel, file và phụ đề cho shop online, văn phòng, kế toán và content team.',
  updated_at = now()
where id = 1;

insert into public.content_blocks (page_key, section_key, title, content, sort_order, is_published)
values
(
  'landing',
  'hero',
  'toolbox giá rẻ cho xử lý file, dữ liệu và công việc lặp lại trên Windows',
  '{"description":"Bộ công cụ dành cho shop online, văn phòng, kế toán và content team: xử lý ảnh, PDF, CSV, Excel, phụ đề và đổi tên file hàng loạt.","badges":["Tool Windows giá hợp lý","Xử lý file hàng loạt","Có dịch vụ làm tool riêng"]}'::jsonb,
  10,
  true
)
on conflict (page_key, section_key) do update set
  title = excluded.title,
  content = excluded.content,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published,
  updated_at = now();
