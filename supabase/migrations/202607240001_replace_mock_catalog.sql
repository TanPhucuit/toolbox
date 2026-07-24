begin;

delete from public.tools;
delete from public.services;
delete from public.categories;

insert into public.categories (id, name, slug, description, icon_name, accent_color, sort_order, is_published) values
('00000000-0000-4000-8000-000000000010', 'Tài liệu & PDF', 'tai-lieu-pdf', 'Xử lý Word, PDF và chuyển đổi tài liệu ngay trên máy.', 'FileText', '#0058be', 10, true),
('00000000-0000-4000-8000-000000000020', 'Âm thanh & video', 'am-thanh-video', 'Tạo giọng đọc và dựng video cho người làm nội dung.', 'Clapperboard', '#3928dc', 20, true),
('00000000-0000-4000-8000-000000000030', 'Học tập', 'hoc-tap', 'Công cụ học từ vựng và luyện nghe chủ động.', 'GraduationCap', '#7c3aed', 30, true),
('00000000-0000-4000-8000-000000000040', 'Dữ liệu', 'du-lieu', 'Công cụ đưa dữ liệu từ hình ảnh vào bảng tính.', 'Table2', '#107c41', 40, true);

insert into public.tools (
  id, category_id, name, slug, short_description, description_markdown, price_type, price_vnd,
  price_label, version, license_text, compatibility, language_support, badge, cover_image_url,
  demo_url, primary_cta_label, primary_cta_type, primary_cta_url, features, system_requirements,
  changelog, faq, seo_title, seo_description, is_featured, is_published, sort_order, published_at
) values
(
  '11111111-1111-4111-8111-111111111111', '00000000-0000-4000-8000-000000000010',
  'AutoCreate Table of Content', 'autocreate-table-of-content',
  'Tự nhận diện cấu trúc Chương/Phần, tạo mục lục Word có số trang và đồng bộ định dạng luận văn.',
  'Nhận diện tiêu đề theo cấu trúc đánh số, gắn Heading, tạo mục lục thật của Word và chuẩn hóa trình bày.',
  'fixed', 100000, null, '1.0', 'Bản quyền vĩnh viễn', array['Windows 10','Windows 11'], array['Tiếng Việt'],
  '100K / vĩnh viễn', '/products/covers/auto-toc.svg', null, 'Liên hệ qua Zalo / form', 'contact', null,
  '[{"text":"Nhận diện Chương/Phần, mục 1.1 và tiểu mục 1.1.1"},{"text":"Tạo mục lục Word thật có số trang và liên kết"},{"text":"Chuẩn hóa A4, font, lề, giãn dòng, số trang và bảng"}]'::jsonb,
  '[{"text":"Windows 10/11"},{"text":"Microsoft Word"},{"text":"File .docx có hệ thống đánh số rõ ràng"}]'::jsonb, '[]'::jsonb,
  '[{"question":"Có tự hiểu mọi kiểu tiêu đề không?","answer":"Không. Bản hiện tại tối ưu cho Chương/Phần và hệ đánh số 1.1, 1.1.1."}]'::jsonb,
  'AutoCreate Table of Content - tool box giá rẻ', 'Tạo mục lục và chuẩn hóa định dạng Word giá 100K vĩnh viễn.', true, true, 10, now()
),
(
  '22222222-2222-4222-8222-222222222222', '00000000-0000-4000-8000-000000000020',
  'Clone Voice Local', 'clone-voice-local',
  'Tách nhạc nền, chọn đoạn giọng sạch và tạo giọng đọc tiếng Việt ngay trên máy có GPU NVIDIA.',
  'Workflow clone giọng dành cho người làm nội dung, xử lý local sau lần tải model đầu tiên. Chỉ dùng giọng đã được cho phép.',
  'fixed', 500000, null, '1.0', 'Bản quyền vĩnh viễn', array['Windows 10','Windows 11'], array['Tiếng Việt'],
  '500K / vĩnh viễn', '/products/covers/clone-voice.svg', null, 'Liên hệ qua Zalo / form', 'contact', null,
  '[{"text":"Tách nhạc nền bằng RoFormer"},{"text":"VAD chọn đoạn giọng sạch"},{"text":"Lưu giọng OpenVoice để dùng lại"},{"text":"10 giọng Việt, 10 giọng Anh và xuất WAV"}]'::jsonb,
  '[{"text":"Windows 64-bit"},{"text":"GPU NVIDIA tương thích CUDA"},{"text":"Internet ở lần tải model đầu"}]'::jsonb, '[]'::jsonb,
  '[{"question":"Có chạy hoàn toàn không cần mạng không?","answer":"Sau khi tải đủ runtime/model, workflow chính chạy local."}]'::jsonb,
  'Clone Voice Local - tool box giá rẻ', 'Clone giọng Việt local trên Windows GPU NVIDIA giá 500K vĩnh viễn.', true, true, 20, now()
),
(
  '33333333-3333-4333-8333-333333333333', '00000000-0000-4000-8000-000000000010',
  'PDF Edit', 'pdf-edit',
  'Tách, ghép, sắp xếp PDF; xuất JPG/PPTX và chèn ghi chú chữ mà không cần tải tài liệu lên web.',
  'Bộ thao tác PDF thường dùng cho văn phòng, chạy local và lưu ra file mới. Chức năng chèn chữ là annotation.',
  'fixed', 200000, null, '1.0', 'Bản quyền vĩnh viễn', array['Windows 10','Windows 11'], array['Tiếng Việt'],
  '200K / vĩnh viễn', '/products/covers/pdf-edit.svg', null, 'Liên hệ qua Zalo / form', 'contact', null,
  '[{"text":"Tách đều hoặc theo khoảng trang"},{"text":"Ghép và đổi thứ tự PDF"},{"text":"PDF sang JPG 72–300 DPI"},{"text":"PDF sang PPTX dạng ảnh và chèn ghi chú"}]'::jsonb,
  '[{"text":"Windows 10/11 64-bit"}]'::jsonb, '[]'::jsonb,
  '[{"question":"Có sửa trực tiếp chữ cũ không?","answer":"Không. Tool thêm lớp ghi chú chữ."}]'::jsonb,
  'PDF Edit - tool box giá rẻ', 'Tách ghép PDF, xuất JPG/PPTX và thêm ghi chú giá 200K vĩnh viễn.', true, true, 30, now()
),
(
  '44444444-4444-4444-8444-444444444444', '00000000-0000-4000-8000-000000000010',
  'Convert PDF ↔ Word', 'convert-pdf-word',
  'Chuyển hàng loạt PDF ↔ DOCX, ưu tiên văn bản chỉnh sửa được và có chế độ giữ nguyên bố cục bằng ảnh.',
  'Chuyển nhiều tài liệu, có chế độ editable, chế độ ảnh giữ bố cục và OCR Việt/Anh khi cài Tesseract.',
  'fixed', 100000, null, '1.0', 'Bản quyền vĩnh viễn', array['Windows 10','Windows 11'], array['Tiếng Việt','English'],
  '100K / vĩnh viễn', '/products/covers/pdf-word.svg', null, 'Liên hệ qua Zalo / form', 'contact', null,
  '[{"text":"Batch PDF sang DOCX và DOCX sang PDF"},{"text":"Chế độ editable hoặc giữ bố cục bằng ảnh"},{"text":"OCR Việt/Anh khi có Tesseract"}]'::jsonb,
  '[{"text":"Windows 10/11"},{"text":"Word hoặc LibreOffice cho DOCX sang PDF"},{"text":"Tesseract nếu cần OCR"}]'::jsonb, '[]'::jsonb,
  '[{"question":"Có giống PDF 100% không?","answer":"Không. Chế độ ảnh giữ bố cục tốt hơn nhưng chữ không chỉnh sửa trực tiếp."}]'::jsonb,
  'Convert PDF Word - tool box giá rẻ', 'Chuyển PDF Word hàng loạt giá 100K vĩnh viễn.', true, true, 40, now()
),
(
  '55555555-5555-4555-8555-555555555555', '00000000-0000-4000-8000-000000000030',
  'Local App English', 'local-app-english',
  'Flashcard, Learn, Write, Spell, Test, Match và luyện nghe YouTube trong một app học từ vựng riêng.',
  'Tạo bộ từ, import CSV, luyện nhiều chế độ, theo dõi tiến độ và ôn theo lịch 1–3–7 ngày.',
  'fixed', 300000, null, '1.0', 'Bản quyền vĩnh viễn', array['Trình duyệt desktop','Mobile rút gọn'], array['Tiếng Việt','English'],
  '300K / vĩnh viễn', '/products/local-english/sets-desktop.png', 'https://flash-card-orpin-omega.vercel.app/sets',
  'Dùng thử & liên hệ mua', 'external', 'https://flash-card-orpin-omega.vercel.app/sets',
  '[{"text":"Flashcard, Learn, Write, Spell, Test, Match"},{"text":"Listening Dictation từ YouTube"},{"text":"Import CSV và theo dõi tiến độ"},{"text":"Ôn 1–3–7 ngày, tự gom từ khó"}]'::jsonb,
  '[{"text":"Trình duyệt hiện đại"},{"text":"Internet cho YouTube, dịch và Google Sheet"}]'::jsonb, '[]'::jsonb,
  '[{"question":"Có dùng trên điện thoại không?","answer":"Có. Mobile hỗ trợ thêm từ, Flashcard và Learn; desktop đầy đủ hơn."}]'::jsonb,
  'Local App English - tool box giá rẻ', 'App flashcard và luyện nghe YouTube giá 300K vĩnh viễn.', true, true, 50, now()
),
(
  '66666666-6666-4666-8666-666666666666', '00000000-0000-4000-8000-000000000020',
  'Clypra Video Editor', 'clypra-video-editor',
  'Timeline nhiều lớp, cắt ghép, text, phụ đề, quay màn hình và xuất video đến 4K trên desktop.',
  'Clypra là phần mềm mã nguồn mở MIT. Chỉ tính phí cho cài đặt, đóng gói, cấu hình và hỗ trợ.',
  'contact', null, 'Liên hệ gói cài đặt & hỗ trợ', '1.0', null, array['Windows'], array['Tiếng Việt'],
  'Mã nguồn mở', '/products/covers/video-editor.svg', null, 'Liên hệ gói hỗ trợ', 'contact', null,
  '[{"text":"Timeline nhiều track"},{"text":"Split, trim, ripple, transform và fade"},{"text":"SRT/VTT, quay màn hình, autosave"},{"text":"Xuất H.264, H.265, ProRes đến 4K"}]'::jsonb,
  '[{"text":"Windows desktop"},{"text":"Cấu hình phụ thuộc codec và độ phân giải"}]'::jsonb, '[]'::jsonb,
  '[{"question":"Vì sao không có giá mua?","answer":"Clypra dùng giấy phép MIT; phí chỉ dành cho dịch vụ cài đặt/tùy biến."}]'::jsonb,
  'Clypra Video Editor - tool box giá rẻ', 'Clypra mã nguồn mở, nhận cài đặt và tùy biến theo nhu cầu.', false, true, 60, now()
),
(
  '77777777-7777-4777-8777-777777777777', '00000000-0000-4000-8000-000000000040',
  'Mapping Image to Excel', 'mapping-image-to-excel',
  'Dự án đang được kiểm tra lại chức năng, file mẫu và mức giá trước khi mở bán.',
  'Chưa có đủ mã nguồn, tài liệu hoặc bản chạy để xác minh. Không nhận thanh toán khi chưa kiểm thử.',
  'contact', null, 'Chưa mở bán', '0.0', null, array['Chưa công bố'], array['Tiếng Việt'],
  'Đang hoàn thiện', '/products/covers/image-excel.svg', null, 'Gửi mẫu để đánh giá', 'contact', null,
  '[{"text":"Đang xác minh phạm vi đọc ảnh"},{"text":"Đang xác minh cấu trúc Excel đầu ra"},{"text":"Sẽ cập nhật demo và giá sau kiểm thử"}]'::jsonb,
  '[{"text":"Chưa công bố"}]'::jsonb, '[]'::jsonb,
  '[{"question":"Khi nào có thể mua?","answer":"Sau khi có bản chạy, dữ liệu mẫu và kết quả kiểm thử."}]'::jsonb,
  'Mapping Image to Excel - đang hoàn thiện', 'Dự án đang kiểm thử, chưa mở bán.', false, true, 70, now()
);

insert into public.services (id, title, slug, short_description, description_markdown, icon_name, price_label, features, process_steps, faq, primary_cta_label, seo_title, seo_description, is_featured, is_published, sort_order) values
('99999999-9999-4999-8999-000000000010', 'Thiết kế website bán hàng & giới thiệu dịch vụ', 'lam-website', 'Làm website responsive, nội dung rõ, có form nhận khách và bàn giao để bạn tự quản lý.', 'Thiết kế theo thông điệp và luồng mua thực tế.', 'Globe2', 'Liên hệ báo giá', '[{"text":"Landing page hoặc website nhiều trang"},{"text":"Tối ưu mobile/desktop và tốc độ"},{"text":"Kết nối form, tên miền và triển khai"}]'::jsonb, '[{"text":"Gửi nhu cầu"},{"text":"Chốt phạm vi"},{"text":"Thiết kế, test và bàn giao"}]'::jsonb, '[]'::jsonb, 'Trao đổi nhu cầu', 'Làm website - tool box giá rẻ', 'Dịch vụ thiết kế website responsive.', true, true, 10),
('99999999-9999-4999-8999-000000000020', 'Tool nhập liệu hàng loạt cho kế toán', 'tool-nhap-lieu-ke-toan', 'Tự động đọc, chuẩn hóa và nhập dữ liệu từ Excel, PDF hoặc biểu mẫu theo quy trình kế toán thực tế.', 'Làm theo file mẫu và quy tắc đối soát.', 'Table2', 'Liên hệ báo giá', '[{"text":"Nhận file mẫu và quy tắc đối soát"},{"text":"Xử lý batch, có log lỗi"},{"text":"Ưu tiên dữ liệu local"}]'::jsonb, '[{"text":"Gửi file mẫu"},{"text":"Chốt quy tắc"},{"text":"Test và bàn giao"}]'::jsonb, '[]'::jsonb, 'Trao đổi nhu cầu', 'Tool nhập liệu kế toán', 'Custom tool nhập liệu hàng loạt.', true, true, 20),
('99999999-9999-4999-8999-000000000030', 'Custom tool theo nhu cầu', 'custom-tool-theo-nhu-cau', 'Làm phần mềm Windows hoặc web app cho công việc lặp lại mà tool có sẵn chưa giải quyết đúng.', 'Bám đúng workflow và tiêu chí nghiệm thu.', 'Wrench', 'Liên hệ báo giá', '[{"text":"Khảo sát workflow thật"},{"text":"Chốt MVP"},{"text":"Test với dữ liệu mẫu"}]'::jsonb, '[{"text":"Gửi workflow"},{"text":"Chốt MVP"},{"text":"Test và bàn giao"}]'::jsonb, '[]'::jsonb, 'Trao đổi nhu cầu', 'Custom tool theo nhu cầu', 'Làm phần mềm theo quy trình thực tế.', true, true, 30),
('99999999-9999-4999-8999-000000000040', 'Tự động hóa báo cáo & xử lý dữ liệu', 'tu-dong-hoa-bao-cao', 'Gộp file, làm sạch dữ liệu, đối soát và xuất báo cáo định kỳ.', 'Dành cho vận hành, bán hàng và kế toán.', 'DatabaseZap', 'Liên hệ báo giá', '[{"text":"Excel, CSV, PDF"},{"text":"Quy tắc có thể kiểm tra"},{"text":"Báo cáo cùng log ngoại lệ"}]'::jsonb, '[{"text":"Nhận dữ liệu mẫu"},{"text":"Chốt quy tắc"},{"text":"Test và bàn giao"}]'::jsonb, '[]'::jsonb, 'Trao đổi nhu cầu', 'Tự động hóa báo cáo', 'Tự động hóa Excel, CSV và PDF.', false, true, 40);

update public.site_settings set
  brand_name = 'tool box giá rẻ',
  support_phone = '0583790873',
  zalo_url = 'https://zalo.me/0583790873',
  copyright_text = 'Tool gọn, giá rõ ràng và hỗ trợ bằng tiếng Việt.',
  default_seo_title = 'tool box giá rẻ - Phần mềm bản quyền vĩnh viễn',
  default_seo_description = 'Công cụ làm tài liệu, PDF, giọng nói, học tiếng Anh và dựng video với chi phí một lần.'
where id = 1;

delete from public.content_blocks where page_key in ('home', 'services', 'contact') and section_key in ('hero', 'trust', 'copy');
insert into public.content_blocks (page_key, section_key, title, content, sort_order, is_published) values
('home', 'hero', 'Tool đúng việc, giá không làm bạn phải cân nhắc cả tuần.', '{"description":"Từ Word, PDF, clone giọng đến flashcard: xem rõ tính năng, giới hạn và giá trước khi mua.","badges":["Giá niêm yết rõ","Nêu đúng giới hạn","Hỗ trợ tiếng Việt","Có demo khi sẵn sàng"]}'::jsonb, 10, true),
('services', 'hero', 'Dịch vụ phần mềm bám đúng công việc thật', '{"description":"Làm website, tool nhập liệu kế toán, tự động hóa báo cáo và custom tool theo file mẫu.","badges":["Bắt đầu từ workflow thật","Chốt phạm vi rõ","Test trước khi bàn giao"]}'::jsonb, 10, true),
('contact', 'copy', 'Nói cho chúng tôi việc đang làm tay', '{"description":"Gửi file mẫu hoặc quay nhanh màn hình quy trình hiện tại. Chúng tôi sẽ nói rõ có đáng làm tool hay không."}'::jsonb, 10, true);

commit;
