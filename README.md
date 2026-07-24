# tool box giá rẻ

Website giới thiệu các tool thực tế trong workspace và dịch vụ làm website, tool nhập liệu kế toán, tự động hóa dữ liệu, phần mềm theo yêu cầu. Public website không có giỏ hàng/checkout; khách liên hệ qua Zalo `0583790873` (`toolboxgr`) hoặc form. Admin truy cập qua `/admin`.

## Tech stack

- Next.js App Router, React, TypeScript strict mode
- Tailwind CSS, Lucide React
- Supabase PostgreSQL, Auth, Storage, RLS
- `@supabase/supabase-js`, `@supabase/ssr`
- Zod, React Hook Form
- Vitest, ESLint, Prettier

Nguồn thiết kế Stitch nằm trong `stitch_toolbox_vi_t_marketplace/` gồm HTML, PNG screenshot và `DESIGN.md`. Public UI giữ token chính: Inter, nền `#f9f9ff`, primary `#0058be`, card trắng bo 16px, shadow nhẹ, grid responsive 1/2/3 cột.

## Cài đặt local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Điền `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
INQUIRY_RATE_LIMIT_SALT=
```

`SUPABASE_SECRET_KEY` là service role key, chỉ dùng server-side. Không đưa key này vào biến `NEXT_PUBLIC_*`, Client Component, log hoặc Git.

## Supabase setup

1. Tạo Supabase project mới.
2. Chạy migration trong `supabase/migrations/`.
3. Chạy seed `supabase/seed.sql`.
4. Trong Supabase Auth Dashboard, tạo user email/password thủ công.
5. Copy UUID của Auth user.
6. Thêm user vào bảng admin:

```sql
insert into public.admin_users (
  user_id,
  email,
  display_name
)
values (
  '<AUTH_USER_UUID>',
  '<ADMIN_EMAIL>',
  'Administrator'
);
```

Khuyến nghị tắt public sign-up trong Supabase Auth vì ứng dụng MVP không hỗ trợ đăng ký người dùng.

## Storage

Migration tạo bucket public `site-assets` với giới hạn 5MB, MIME type PNG/JPEG/WebP. Public chỉ đọc asset; admin có quyền upload/update/delete qua Storage RLS. Không dùng bucket này để phát hành file EXE trả phí.

## Admin

- Truy cập `/admin`.
- Nếu chưa đăng nhập: hiển thị form login admin.
- Nếu đăng nhập nhưng không có dòng trong `admin_users`: từ chối và sign out.
- Các route `/admin/tools`, `/admin/services`, `/admin/categories`, `/admin/content`, `/admin/inquiries`, `/admin/settings` được protected layout gọi `requireAdminPage()`.

## Chức năng chính

- Public: danh mục 7 dự án, giá/giới hạn/đối thủ, hướng dẫn, ảnh thật Local English, landing `/giai-phap`, danh sách dịch vụ, liên hệ, chính sách và form tư vấn.
- Catalog công khai nằm tại `src/lib/catalog.ts` để production không hiển thị mock khi Supabase chưa áp migration.
- Migration `202607240001_replace_mock_catalog.sql` xóa catalog mẫu cũ và đồng bộ sản phẩm, dịch vụ, thương hiệu cùng Zalo vào CMS.
- Admin: CRUD tools, services, categories, content blocks, settings; xem/cập nhật inquiries; upload ảnh site-assets.
- Inquiry route: Zod validation server-side, honeypot, minimum completion time, max body size, hash IP bằng `INQUIRY_RATE_LIMIT_SALT`, rate limit 5 yêu cầu/15 phút.
- SEO: dynamic metadata, robots, sitemap không gồm admin/draft/unpublished.

## Quality commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

E2E với login admin thật cần Supabase project đã cấu hình, Auth user admin và env đầy đủ. Chưa giả lập credential trong repo để tránh hard-code secret.

## Vercel readiness

Không deploy bằng Vercel CLI. Khi bạn kết nối GitHub repo với Vercel, nhập các env:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `INQUIRY_RATE_LIMIT_SALT`

Trong Supabase Auth URL configuration, thêm production domain Vercel của bạn vào Site URL/Redirect URLs nếu dùng session callback hoặc auth flow tương lai.

## Rollback migration

Migrations hiện là schema khởi tạo cho project mới. Nếu cần rollback ở môi trường dev mới, tạo lại Supabase project hoặc drop các bảng public tương ứng sau khi backup dữ liệu. Không chạy drop trên production khi chưa backup.

## Ngoài phạm vi MVP

Không có đăng ký khách hàng, đăng nhập khách hàng, tài khoản khách hàng, giỏ hàng, checkout, thanh toán online, giao license tự động, download EXE sau thanh toán, affiliate, review public, chat realtime hoặc blog CMS đầy đủ.
