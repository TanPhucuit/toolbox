insert into public.categories (name, slug, description, icon_name, accent_color, sort_order, is_published) values
('Hình ảnh', 'hinh-anh', 'Công cụ xử lý ảnh hàng loạt cho shop online, content sản phẩm và website.', 'Images', '#0058be', 10, true),
('PDF & tài liệu', 'pdf-tai-lieu', 'Xử lý PDF offline cho văn phòng, kế toán, scan và tài liệu nội bộ.', 'FileText', '#ba1a1a', 20, true),
('Excel & dữ liệu', 'excel-du-lieu', 'Làm sạch, chuẩn hóa và gộp dữ liệu Excel/CSV tiếng Việt.', 'Table2', '#10b981', 30, true),
('Video & phụ đề', 'video-phu-de', 'Công cụ xử lý phụ đề SRT/VTT cho video, khóa học và YouTube.', 'Video', '#924700', 40, true),
('Công cụ hệ thống', 'cong-cu-he-thong', 'Tiện ích quản lý file, thư mục và workflow Windows.', 'Settings', '#545f73', 50, true),
('Dịch vụ tùy chỉnh', 'dich-vu-tuy-chinh', 'Phát triển phần mềm EXE, web app và workflow tự động hóa theo yêu cầu.', 'Briefcase', '#b75b00', 60, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  icon_name = excluded.icon_name,
  accent_color = excluded.accent_color,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published;

insert into public.site_settings (
  id,
  brand_name,
  support_phone,
  support_email,
  copyright_text,
  default_seo_title,
  default_seo_description
) values (
  1,
  'ToolBox Việt',
  '0900 000 000',
  'hello@toolboxviet.vn',
  '© 2026 ToolBox Việt. Tất cả quyền được bảo lưu.',
  'ToolBox Việt - Bộ công cụ Windows xử lý file hàng loạt',
  'ToolBox Việt cung cấp tool Windows xử lý ảnh, PDF, CSV, Excel, file và phụ đề cho shop online, văn phòng, kế toán và content team.'
)
on conflict (id) do update set
  brand_name = excluded.brand_name,
  support_phone = excluded.support_phone,
  support_email = excluded.support_email,
  copyright_text = excluded.copyright_text,
  default_seo_title = excluded.default_seo_title,
  default_seo_description = excluded.default_seo_description;

with category_map as (
  select slug, id from public.categories
)
insert into public.tools (
  category_id,
  name,
  slug,
  short_description,
  description_markdown,
  price_type,
  price_vnd,
  price_label,
  version,
  license_text,
  compatibility,
  file_size,
  language_support,
  badge,
  primary_cta_label,
  primary_cta_type,
  features,
  system_requirements,
  changelog,
  faq,
  seo_title,
  seo_description,
  is_featured,
  is_published,
  sort_order,
  published_at
)
values
((select id from category_map where slug='hinh-anh'), 'Batch Image Studio', 'batch-image-studio', 'Resize, chuyển định dạng và thêm watermark ảnh hàng loạt cho Shopee, Lazada, TikTok Shop và website.', 'Batch Image Studio chạy trên Windows, cho phép chọn nhiều ảnh hoặc cả folder, hỗ trợ JPG/JPEG/PNG/WebP, resize theo preset Shopee 1024x1024, Lazada 1000x1000 hoặc Website WebP max 1600. Tool không ghi đè file gốc và xuất manifest.json, run_log.csv để đối chiếu.', 'contact', null, 'Nhận bản dùng thử qua Zalo', '1.0.0', 'Tư vấn theo số máy', array['Windows 10','Windows 11'], '84 MB', array['Tiếng Việt'], 'Cho shop online', 'Gửi yêu cầu tư vấn', 'contact', '[{"text":"Chọn nhiều file ảnh hoặc cả folder"},{"text":"Resize theo preset Shopee/Lazada hoặc kích thước tùy chỉnh"},{"text":"Chuyển JPG, JPEG, PNG, WebP sang định dạng mong muốn"},{"text":"Thêm watermark text theo 9 vị trí"},{"text":"Không ghi đè file gốc, có manifest.json và run_log.csv"}]'::jsonb, '[{"text":"Windows 10/11 64-bit"},{"text":"RAM khuyến nghị 4GB trở lên"},{"text":"Dung lượng trống tối thiểu 300MB"}]'::jsonb, '[{"text":"1.0.0: Bản SEO seed cho workflow resize ảnh hàng loạt"}]'::jsonb, '[{"question":"Tool có chạy offline không?","answer":"Các thao tác xử lý ảnh chạy trên máy Windows, không cần upload ảnh lên website."},{"question":"Có ghi đè file ảnh gốc không?","answer":"Không. Tool xuất file mới và giữ file gốc."}]'::jsonb, 'Batch Image Studio - Resize ảnh hàng loạt Shopee/Lazada', 'Resize ảnh hàng loạt, chuyển WebP, thêm watermark và xuất log xử lý cho shop online Việt Nam.', true, true, 10, now()),
((select id from category_map where slug='pdf-tai-lieu'), 'PDF Workflow Pro', 'pdf-workflow-pro', 'Ghép, tách, xoay, khóa, mở khóa và trích xuất text/table PDF offline trên Windows.', 'PDF Workflow Pro dành cho văn phòng, kế toán, admin và dịch vụ scan cần xử lý PDF nội bộ. Tool merge nhiều PDF, split theo page range, rotate 90/180/270 độ, encrypt/decrypt bằng password đúng, extract text ra .txt và table cơ bản ra .csv mà không sửa file gốc.', 'contact', null, 'Tư vấn theo nhu cầu', '1.0.0', 'Theo gói triển khai', array['Windows 10','Windows 11'], '120 MB', array['Tiếng Việt'], 'Offline', 'Gửi yêu cầu tư vấn', 'contact', '[{"text":"Merge nhiều PDF thành một file"},{"text":"Split PDF theo khoảng trang"},{"text":"Rotate PDF 90/180/270 độ"},{"text":"Encrypt/decrypt PDF bằng password"},{"text":"Extract text .txt và table cơ bản .csv"}]'::jsonb, '[{"text":"Windows 10/11 64-bit"},{"text":"RAM khuyến nghị 4GB trở lên"}]'::jsonb, '[{"text":"1.0.0: Bản SEO seed cho workflow PDF offline"}]'::jsonb, '[{"question":"Có cần upload PDF lên web không?","answer":"Không. Tool xử lý PDF trên Windows."},{"question":"Có sửa file PDF gốc không?","answer":"Không. Tool xuất file mới theo tác vụ."}]'::jsonb, 'PDF Workflow Pro - Ghép tách PDF offline', 'Ghép PDF offline, tách PDF theo trang, khóa PDF và extract text/table trên Windows.', true, true, 20, now()),
((select id from category_map where slug='excel-du-lieu'), 'CSV Cleaner', 'csv-cleaner', 'Làm sạch CSV/TSV có dấu tiếng Việt: detect encoding, delimiter, xóa dòng rỗng, duplicate và xuất error_report.csv.', 'CSV Cleaner hỗ trợ người làm data, kế toán, vận hành, admin và seller xuất dữ liệu sàn TMĐT. Tool detect encoding, detect delimiter, trim khoảng trắng, normalize Unicode NFC, xóa dòng rỗng, xóa duplicate, chuẩn hóa tên cột, ghi cleaned CSV và error_report.csv cho dòng lỗi hoặc lệch số cột.', 'contact', null, 'Nhận bản dùng thử qua Zalo', '1.0.0', 'Tư vấn theo số máy', array['Windows 10','Windows 11'], '45 MB', array['Tiếng Việt'], 'CSV tiếng Việt', 'Gửi yêu cầu tư vấn', 'contact', '[{"text":"Detect encoding và delimiter CSV/TSV"},{"text":"Hỗ trợ dấu tiếng Việt và Unicode NFC"},{"text":"Trim khoảng trắng, xóa dòng rỗng, xóa duplicate"},{"text":"Chuẩn hóa tên cột"},{"text":"Xuất cleaned CSV và error_report.csv"}]'::jsonb, '[{"text":"Windows 10/11 64-bit"},{"text":"RAM khuyến nghị 8GB cho file lớn"}]'::jsonb, '[{"text":"1.0.0: Bản SEO seed cho workflow làm sạch CSV"}]'::jsonb, '[{"question":"Có xử lý CSV lỗi tiếng Việt không?","answer":"Có. Tool detect encoding và normalize Unicode NFC."},{"question":"Dòng lỗi được ghi ở đâu?","answer":"Dòng lỗi hoặc lệch số cột được ghi vào error_report.csv."}]'::jsonb, 'CSV Cleaner - Làm sạch file CSV tiếng Việt', 'Làm sạch CSV/TSV, xóa duplicate, normalize header, detect encoding và xuất error_report.csv.', true, true, 30, now()),
((select id from category_map where slug='video-phu-de'), 'Subtitle Studio', 'subtitle-studio', 'Chỉnh sửa phụ đề SRT/VTT: shift milliseconds, convert định dạng, validate lỗi và xuất warning CSV.', 'Subtitle Studio dành cho editor video, YouTuber, người làm khóa học và phụ đề. Tool load SRT/VTT, shift toàn bộ subtitle theo milliseconds, convert SRT sang VTT hoặc VTT sang SRT, validate dòng quá dài, subtitle overlap, timestamp âm, end time nhỏ hơn start time và export warning list ra CSV.', 'contact', null, 'Nhận bản dùng thử qua Zalo', '1.0.0', 'Tư vấn theo số máy', array['Windows 10','Windows 11'], '66 MB', array['Tiếng Việt'], null, 'Gửi yêu cầu tư vấn', 'contact', '[{"text":"Load SRT/VTT"},{"text":"Shift toàn bộ subtitle theo milliseconds"},{"text":"Convert SRT sang VTT hoặc VTT sang SRT"},{"text":"Validate overlap, timestamp âm, end time sai và dòng quá dài"},{"text":"Export warning list ra CSV"}]'::jsonb, '[{"text":"Windows 10/11 64-bit"}]'::jsonb, '[{"text":"1.0.0: Bản SEO seed cho workflow phụ đề"}]'::jsonb, '[{"question":"Có sửa phụ đề bị lệch thời gian không?","answer":"Có. Bạn nhập số milliseconds cần shift cho toàn bộ file."},{"question":"Có chuyển SRT sang VTT không?","answer":"Có, tool hỗ trợ cả hai chiều SRT/VTT."}]'::jsonb, 'Subtitle Studio - Chỉnh sửa phụ đề SRT/VTT', 'Shift thời gian phụ đề, chuyển SRT/VTT, validate lỗi overlap và xuất warning CSV.', false, true, 40, now()),
((select id from category_map where slug='excel-du-lieu'), 'Excel Data Merger', 'excel-data-merger', 'Gộp nhiều file Excel/CSV thành merged.xlsx, normalize header tiếng Việt và ghi errors.xlsx cho file lỗi.', 'Excel Data Merger gom dữ liệu từ .xlsx, .xlsm và .csv mà không cần cài Microsoft Excel. Tool đọc first sheet, sheet cụ thể hoặc toàn bộ sheet, normalize header tiếng Việt, auto map Mã đơn thành ma_don, Số tiền thành so_tien, gộp dữ liệu hợp lệ vào merged.xlsx và ghi file thiếu cột hoặc file hỏng vào errors.xlsx.', 'contact', null, 'Tư vấn theo nhu cầu', '1.0.0', 'Tư vấn theo số máy', array['Windows 10','Windows 11'], '52 MB', array['Tiếng Việt'], 'Excel/CSV', 'Gửi yêu cầu tư vấn', 'contact', '[{"text":"Input .xlsx, .xlsm, .csv"},{"text":"Không cần cài Microsoft Excel"},{"text":"Đọc first sheet, sheet cụ thể hoặc toàn bộ sheet"},{"text":"Normalize header tiếng Việt và auto map header"},{"text":"Xuất merged.xlsx và errors.xlsx"},{"text":"Tùy chọn thêm source_file, source_sheet"}]'::jsonb, '[{"text":"Windows 10/11 64-bit"},{"text":"RAM khuyến nghị 8GB cho nhiều file lớn"}]'::jsonb, '[{"text":"1.0.0: Bản SEO seed cho workflow gộp Excel/CSV"}]'::jsonb, '[{"question":"Có gộp Excel mà không cài Microsoft Excel không?","answer":"Có. Tool dùng engine đọc file tích hợp."},{"question":"File lỗi xử lý thế nào?","answer":"File thiếu cột hoặc hỏng được ghi vào errors.xlsx."}]'::jsonb, 'Excel Data Merger - Gộp nhiều file Excel/CSV', 'Gộp nhiều file Excel/CSV, normalize header tiếng Việt, xuất merged.xlsx và errors.xlsx.', true, true, 50, now()),
((select id from category_map where slug='cong-cu-he-thong'), 'File Renamer Pro', 'file-renamer-pro', 'Đổi tên file hàng loạt an toàn bằng preview/dry-run, regex, numbering, collision check và undo batch.', 'File Renamer Pro giúp admin, photographer, content team và văn phòng đổi tên nhiều file an toàn. Tool chọn folder, chạy recursive nếu cần, lọc theo extension/text/regex, rule replace text, regex replace, prefix, suffix, numbering, change case, token {date_modified}, preview/dry-run trước khi rename thật, chặn collision, chặn ký tự Windows không hợp lệ, xử lý case-only rename và undo batch gần nhất bằng manifest.', 'contact', null, 'Nhận bản dùng thử qua Zalo', '1.0.0', 'Tư vấn theo số máy', array['Windows 10','Windows 11'], '30 MB', array['Tiếng Việt'], 'Có undo', 'Gửi yêu cầu tư vấn', 'contact', '[{"text":"Chọn folder và chạy recursive nếu cần"},{"text":"Filter theo extension, text hoặc regex"},{"text":"Rule replace, regex replace, prefix, suffix, numbering, change case"},{"text":"Preview/dry-run trước khi rename thật"},{"text":"Chặn collision, ký tự Windows không hợp lệ và hỗ trợ undo batch"}]'::jsonb, '[{"text":"Windows 10/11 64-bit"}]'::jsonb, '[{"text":"1.0.0: Bản SEO seed cho workflow đổi tên file"}]'::jsonb, '[{"question":"Có preview trước khi đổi tên thật không?","answer":"Có. Tool có dry-run để kiểm tra tên mới trước."},{"question":"Có undo nếu đổi nhầm không?","answer":"Có thể undo batch gần nhất bằng manifest nếu file chưa bị thay đổi ngoài tool."}]'::jsonb, 'File Renamer Pro - Đổi tên file hàng loạt an toàn', 'Đổi tên file hàng loạt bằng regex, prefix, suffix, numbering, dry-run, collision check và undo.', true, true, 60, now())
on conflict (slug) do update set
  category_id = excluded.category_id,
  name = excluded.name,
  short_description = excluded.short_description,
  description_markdown = excluded.description_markdown,
  price_type = excluded.price_type,
  price_vnd = excluded.price_vnd,
  price_label = excluded.price_label,
  version = excluded.version,
  license_text = excluded.license_text,
  compatibility = excluded.compatibility,
  file_size = excluded.file_size,
  language_support = excluded.language_support,
  badge = excluded.badge,
  primary_cta_label = excluded.primary_cta_label,
  primary_cta_type = excluded.primary_cta_type,
  features = excluded.features,
  system_requirements = excluded.system_requirements,
  changelog = excluded.changelog,
  faq = excluded.faq,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order,
  published_at = excluded.published_at;

insert into public.services (title, slug, short_description, description_markdown, icon_name, price_label, features, process_steps, faq, primary_cta_label, seo_title, seo_description, is_featured, is_published, sort_order)
values
('Phát triển phần mềm Windows theo yêu cầu', 'phat-trien-phan-mem-windows', 'Thiết kế tool EXE chạy trên Windows cho workflow xử lý file, dữ liệu và vận hành nội bộ.', 'Dịch vụ phù hợp khi doanh nghiệp cần phần mềm riêng thay vì dùng tool có sẵn: phân tích quy trình, thiết kế giao diện, phát triển, test với dữ liệu thật và bàn giao hướng dẫn sử dụng.', 'MonitorCog', 'Liên hệ báo giá', '[{"text":"Làm tool EXE theo nghiệp vụ thật"},{"text":"Ưu tiên dữ liệu nội bộ và workflow Windows"},{"text":"Có hướng dẫn bàn giao và hỗ trợ sau triển khai"}]'::jsonb, '[{"text":"Khảo sát nhu cầu và file mẫu"},{"text":"Chốt phạm vi MVP"},{"text":"Phát triển và test với dữ liệu thật"},{"text":"Bàn giao, hướng dẫn và hỗ trợ"}]'::jsonb, '[{"question":"Có nhận làm tool theo file mẫu không?","answer":"Có. ToolBox Việt có thể phân tích file mẫu và đề xuất phạm vi MVP phù hợp."}]'::jsonb, 'Gửi yêu cầu tư vấn', 'Phát triển phần mềm Windows theo yêu cầu - ToolBox Việt', 'Nhận phát triển tool EXE Windows xử lý file, dữ liệu và workflow nội bộ theo yêu cầu.', true, true, 10),
('Tự động hóa xử lý dữ liệu Excel/CSV/PDF', 'tu-dong-hoa-xu-ly-du-lieu', 'Tư vấn và xây dựng workflow tự động hóa dữ liệu cho kế toán, vận hành và seller.', 'Dịch vụ dành cho đội có nhiều file Excel, CSV, PDF hoặc dữ liệu xuất từ sàn TMĐT cần chuẩn hóa, đối soát và xuất báo cáo định kỳ.', 'DatabaseZap', 'Liên hệ báo giá', '[{"text":"Chuẩn hóa dữ liệu tiếng Việt"},{"text":"Gộp file và xuất báo cáo"},{"text":"Ghi log/error report để đối soát"}]'::jsonb, '[{"text":"Nhận file mẫu"},{"text":"Thiết kế quy tắc xử lý"},{"text":"Chạy thử và chỉnh rule"},{"text":"Bàn giao workflow"}]'::jsonb, '[]'::jsonb, 'Gửi yêu cầu tư vấn', 'Tự động hóa xử lý dữ liệu Excel/CSV/PDF - ToolBox Việt', 'Tư vấn tự động hóa dữ liệu Excel, CSV, PDF cho kế toán, vận hành và seller Việt Nam.', true, true, 20)
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  description_markdown = excluded.description_markdown,
  icon_name = excluded.icon_name,
  price_label = excluded.price_label,
  features = excluded.features,
  process_steps = excluded.process_steps,
  faq = excluded.faq,
  primary_cta_label = excluded.primary_cta_label,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  sort_order = excluded.sort_order;

insert into public.content_blocks (page_key, section_key, title, content, sort_order, is_published)
values
('home', 'hero', 'ToolBox Việt - công cụ Windows xử lý file hàng loạt', '{"description":"Bộ công cụ Windows cho shop online, văn phòng, kế toán và content team. Chạy trên máy bạn, không cần upload dữ liệu nhạy cảm.","badges":["Chạy trên Windows","Xử lý hàng loạt","Hỗ trợ tiếng Việt","Tư vấn qua Zalo/form"]}'::jsonb, 10, true),
('home', 'trust', 'Vì sao chọn ToolBox Việt', '{"items":["Chạy local/offline cho workflow dữ liệu nhạy cảm","Bám nhu cầu người Việt: Shopee, Lazada, CSV/Excel tiếng Việt","Có log, report, manifest hoặc dry-run ở các tool phù hợp","Không tạo checkout hoặc tài khoản khách hàng ngoài phạm vi MVP"]}'::jsonb, 20, true),
('services', 'hero', 'Dịch vụ phần mềm tùy chỉnh', '{"description":"Thiết kế tool Windows, workflow xử lý file và tự động hóa dữ liệu theo nhu cầu thật của doanh nghiệp.","badges":["Theo yêu cầu","Test với dữ liệu thật","Bàn giao rõ ràng"]}'::jsonb, 10, true),
('contact', 'copy', 'Liên hệ tư vấn', '{"description":"Để lại nhu cầu xử lý file, dữ liệu hoặc phần mềm tùy chỉnh. ToolBox Việt sẽ phản hồi với hướng triển khai phù hợp."}'::jsonb, 10, true),
('footer', 'links', 'Footer', '{"columns":[{"title":"Liên kết","links":["Cửa hàng","Dịch vụ","Chính sách bảo mật","Điều khoản sử dụng"]}]}'::jsonb, 10, true),
('privacy', 'main', 'Chính sách bảo mật', '{"body":"ToolBox Việt chỉ thu thập thông tin cần thiết để tư vấn, báo giá và hỗ trợ khách hàng. Chúng tôi không bán dữ liệu cá nhân cho bên thứ ba."}'::jsonb, 10, true),
('terms', 'main', 'Điều khoản sử dụng', '{"body":"Khi sử dụng website, bạn đồng ý cung cấp thông tin chính xác khi gửi yêu cầu tư vấn và tuân thủ điều khoản sử dụng phần mềm được bàn giao."}'::jsonb, 10, true)
on conflict (page_key, section_key) do update set
  title = excluded.title,
  content = excluded.content,
  sort_order = excluded.sort_order,
  is_published = excluded.is_published;
