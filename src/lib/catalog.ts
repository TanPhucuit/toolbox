import type { Category, Service, SiteSettings, Tool } from "@/types/database.types";

export type Competitor = {
  name: string;
  price: string;
  note: string;
  sourceUrl: string;
};

export type CatalogTool = Tool & {
  categories: Pick<Category, "name" | "slug">;
  guideSteps: string[];
  competitors: Competitor[];
  gallery: { id: string; url: string; thumbnail_url: string | null; alt_text: string; media_type: "image" }[];
  availabilityNote?: string;
};

export type CatalogService = Service & {
  gallery: { id: string; url: string; alt_text: string }[];
};

const now = "2026-07-24T00:00:00.000Z";

export const defaultSettings: SiteSettings = {
  id: 1,
  brand_name: "tool box giá rẻ",
  logo_url: null,
  favicon_url: null,
  support_phone: "0583790873",
  support_email: null,
  zalo_url: "https://zalo.me/0583790873",
  facebook_url: null,
  youtube_url: null,
  address: null,
  copyright_text: "Tool gọn, giá rõ ràng và hỗ trợ bằng tiếng Việt.",
  default_seo_title: "tool box giá rẻ - Phần mềm bản quyền vĩnh viễn",
  default_seo_description: "Công cụ làm tài liệu, PDF, giọng nói, học tiếng Anh và dựng video với chi phí một lần.",
  updated_at: now
};

export const catalogCategories: Category[] = [
  category("Tài liệu & PDF", "tai-lieu-pdf", "Xử lý Word, PDF và chuyển đổi tài liệu ngay trên máy.", "FileText", 10),
  category("Âm thanh & video", "am-thanh-video", "Tạo giọng đọc và dựng video cho người làm nội dung.", "Clapperboard", 20),
  category("Học tập", "hoc-tap", "Công cụ học từ vựng và luyện nghe chủ động.", "GraduationCap", 30),
  category("Dữ liệu", "du-lieu", "Công cụ đưa dữ liệu từ hình ảnh vào bảng tính.", "Table2", 40)
];

export const catalogTools: CatalogTool[] = [
  tool({
    id: "11111111-1111-4111-8111-111111111111",
    category: catalogCategories[0],
    name: "AutoCreate Table of Content",
    slug: "autocreate-table-of-content",
    short: "Tự nhận diện cấu trúc Chương/Phần, tạo mục lục Word có số trang và đồng bộ định dạng luận văn.",
    price: 100_000,
    cover: "/products/covers/auto-toc.svg",
    badge: "100K / vĩnh viễn",
    description:
      "Một nút cho phần việc thường ngốn cả buổi: nhận diện tiêu đề theo cấu trúc đánh số, gắn Heading, tạo mục lục thật của Word và chuẩn hóa trình bày. Tool chạy trên Windows; Microsoft Word cần được cài để tạo và cập nhật mục lục.",
    features: [
      "Nhận diện Chương/Phần, mục 1.1 và tiểu mục 1.1.1 trở xuống",
      "Tạo mục lục Word thật: có số trang, liên kết và cập nhật được",
      "Đánh số trang, đặt khổ A4, lề, font, giãn dòng và khoảng cách đoạn",
      "Chuẩn hóa bảng biểu và cho phép lưu bộ thông số riêng"
    ],
    requirements: ["Windows 10/11", "Microsoft Word", "File đầu vào .docx có hệ thống đánh số rõ ràng"],
    guide: ["Chọn file Word cần xử lý.", "Kiểm tra bộ quy tắc Heading và định dạng.", "Bấm xử lý, mở file kết quả và cập nhật mục lục trong Word."],
    gallery: [
      { id: "toc-app", url: "/products/auto-toc/app-dashboard.png", thumbnail_url: null, alt_text: "Giao diện thật của AutoCreate Table of Content", media_type: "image" },
      { id: "toc-result", url: "/products/auto-toc/toc-result.png", thumbnail_url: null, alt_text: "Mục lục Word có số trang do tool tạo", media_type: "image" },
      { id: "toc-cover", url: "/products/covers/auto-toc.svg", thumbnail_url: null, alt_text: "Tổng quan quy trình tạo mục lục", media_type: "image" }
    ],
    competitors: [
      {
        name: "Microsoft 365 Personal",
        price: "US$99,99/năm",
        note: "Có Word và mục lục, nhưng người dùng vẫn phải gắn Heading và căn định dạng.",
        sourceUrl: "https://www.microsoft.com/en-us/microsoft-365/buy/compare-all-microsoft-365-products"
      },
      {
        name: "Google Docs",
        price: "Miễn phí cá nhân",
        note: "Có outline/mục lục cơ bản; workflow chuẩn hóa luận văn vẫn làm thủ công.",
        sourceUrl: "https://www.google.com/docs/about/"
      }
    ],
    faq: [
      ["Tool có tự hiểu mọi kiểu tiêu đề không?", "Không. Bản hiện tại tối ưu cho cấu trúc Chương/Phần và hệ đánh số 1.1, 1.1.1."],
      ["Có xử lý hàng loạt nhiều file không?", "Bản hiện tại xử lý từng file .docx để người dùng kiểm tra kết quả an toàn."]
    ]
  }),
  tool({
    id: "22222222-2222-4222-8222-222222222222",
    category: catalogCategories[1],
    name: "Clone Voice Local",
    slug: "clone-voice-local",
    short: "Tách nhạc nền, chọn đoạn giọng sạch và tạo giọng đọc tiếng Việt ngay trên máy có GPU NVIDIA.",
    price: 500_000,
    cover: "/products/covers/clone-voice.svg",
    badge: "500K / vĩnh viễn",
    description:
      "Workflow clone giọng dành cho người làm nội dung không muốn tính tiền theo từng lượt tạo. Sau lần tải model đầu tiên, phần xử lý chính chạy local. Chỉ dùng giọng của chính bạn hoặc giọng đã được chủ sở hữu cho phép.",
    features: [
      "Nhận audio phổ biến và tách nhạc nền bằng RoFormer",
      "VAD tự chọn khoảng 5 giây giọng sạch để tạo mẫu",
      "Lưu và gọi lại giọng đã tạo bằng OpenVoice",
      "10 giọng Việt, 10 giọng Anh có sẵn và xuất file WAV"
    ],
    requirements: ["Windows 64-bit", "GPU NVIDIA tương thích CUDA", "Internet ở lần cài/tải model đầu tiên"],
    guide: ["Nạp file giọng đã được phép sử dụng.", "Tách nền và nghe lại đoạn mẫu được chọn.", "Nhập nội dung, chọn giọng rồi xuất WAV."],
    gallery: [
      { id: "voice-cover", url: "/products/covers/clone-voice.svg", thumbnail_url: null, alt_text: "Quy trình clone giọng chạy local", media_type: "image" },
      { id: "voice-reference", url: "/products/clone-voice/reference-spectrum.png", thumbnail_url: null, alt_text: "Phổ âm thanh mẫu tham chiếu thực tế", media_type: "image" },
      { id: "voice-vocals", url: "/products/clone-voice/isolated-vocals-spectrum.png", thumbnail_url: null, alt_text: "Phổ giọng sau khi tách nền", media_type: "image" }
    ],
    competitors: [
      {
        name: "ElevenLabs Creator",
        price: "US$22/tháng",
        note: "Dịch vụ cloud có Professional Voice Cloning và tính phí theo gói/credit.",
        sourceUrl: "https://elevenlabs.io/pricing"
      },
      {
        name: "Murf Creator",
        price: "Thuê bao tháng/năm",
        note: "Nền tảng cloud; gói Creator giới hạn thời lượng tạo giọng theo kỳ.",
        sourceUrl: "https://murf.ai/pricing"
      }
    ],
    faq: [
      ["Có chạy hoàn toàn không cần mạng không?", "Sau khi runtime và model đã tải đủ, workflow chính chạy local; lần cài đầu cần internet."],
      ["Có clone giọng tiếng Anh không?", "Bản hiện tại clone giọng tiếng Việt; tiếng Anh dùng bộ giọng preset."]
    ]
  }),
  tool({
    id: "33333333-3333-4333-8333-333333333333",
    category: catalogCategories[0],
    name: "PDF Edit",
    slug: "pdf-edit",
    short: "Tách, ghép, sắp xếp PDF; xuất JPG/PPTX và chèn ghi chú chữ mà không cần tải tài liệu lên web.",
    price: 200_000,
    cover: "/products/covers/pdf-edit.svg",
    badge: "200K / vĩnh viễn",
    description:
      "Bộ thao tác PDF thường dùng cho văn phòng: làm ngay trên Windows, lưu ra file mới và chủ động dữ liệu. Lưu ý: chức năng chèn chữ là annotation, không thay thế trực tiếp nội dung chữ gốc trong PDF.",
    features: [
      "Tách đều hoặc tách theo khoảng trang tùy chọn",
      "Ghép nhiều PDF, đổi thứ tự trước khi xuất",
      "Xuất PDF sang JPG từ 72–300 DPI",
      "Xuất PDF sang PPTX dạng ảnh và chèn ghi chú chữ"
    ],
    requirements: ["Windows 10/11 64-bit", "Không cần upload tài liệu lên dịch vụ web"],
    guide: ["Chọn tác vụ tách, ghép, xuất ảnh/PPTX hoặc thêm chữ.", "Nạp file và đặt thứ tự/phạm vi trang.", "Xem lại thiết lập rồi dùng Save As để giữ file gốc."],
    gallery: [
      { id: "pdf-edit-app", url: "/products/pdf-edit/app-dashboard.png", thumbnail_url: null, alt_text: "Giao diện thật của PDF Edit trên Windows", media_type: "image" },
      { id: "pdf-edit-cover", url: "/products/covers/pdf-edit.svg", thumbnail_url: null, alt_text: "Các tác vụ PDF chính", media_type: "image" }
    ],
    competitors: [
      {
        name: "Adobe Acrobat Pro",
        price: "US$19,99/tháng",
        note: "Bộ PDF đầy đủ hơn, bán theo gói thuê bao hằng năm trả theo tháng.",
        sourceUrl: "https://www.adobe.com/vn_vi/acrobat/pricing/compare-versions.html"
      },
      {
        name: "iLovePDF Premium",
        price: "US$5/tháng, trả US$60/năm",
        note: "Nhiều công cụ web/desktop, bản miễn phí có giới hạn lượt xử lý.",
        sourceUrl: "https://www.ilovepdf.com/pricing"
      }
    ],
    faq: [
      ["Có sửa trực tiếp chữ cũ trong PDF không?", "Không. Bản này thêm lớp ghi chú chữ, không chỉnh nội dung text gốc."],
      ["PDF sang PowerPoint có chỉnh từng chữ được không?", "Không. Mỗi trang PDF được đưa vào slide dưới dạng ảnh để giữ bố cục."]
    ]
  }),
  tool({
    id: "44444444-4444-4444-8444-444444444444",
    category: catalogCategories[0],
    name: "Convert PDF ↔ Word",
    slug: "convert-pdf-word",
    short: "Chuyển hàng loạt PDF ↔ DOCX, ưu tiên văn bản chỉnh sửa được và có chế độ giữ nguyên bố cục bằng ảnh.",
    price: 100_000,
    cover: "/products/covers/pdf-word.svg",
    badge: "100K / vĩnh viễn",
    description:
      "Dành cho người cần chuyển nhiều tài liệu mà không muốn tải từng file lên web. Tool thử chuyển sang Word có thể chỉnh sửa; khi tài liệu quá phức tạp có thể chuyển sang chế độ ảnh để giữ bố cục. OCR Việt/Anh cần cài Tesseract.",
    features: [
      "Chuyển hàng loạt PDF sang DOCX và DOCX sang PDF",
      "Chế độ editable và chế độ ảnh để ưu tiên giữ bố cục",
      "Tự kiểm tra kết quả và dùng phương án dự phòng khi cần",
      "OCR Việt/Anh, xuất phụ lục và TXT khi có Tesseract"
    ],
    requirements: ["Windows 10/11", "Word hoặc LibreOffice cho chiều DOCX → PDF", "Tesseract nếu cần OCR"],
    guide: ["Chọn chiều chuyển đổi và nhiều file đầu vào.", "Chọn ưu tiên chỉnh sửa hoặc ưu tiên giữ bố cục.", "Chạy batch và kiểm tra file DOCX/PDF cùng báo cáo đầu ra."],
    gallery: [
      { id: "convert-app", url: "/products/convert-pdf-word/app-dashboard.png", thumbnail_url: null, alt_text: "Giao diện thật của công cụ chuyển PDF và Word", media_type: "image" },
      { id: "convert-source", url: "/products/convert-pdf-word/source-pdf.png", thumbnail_url: null, alt_text: "Trang PDF gốc dùng để kiểm thử", media_type: "image" },
      { id: "convert-result", url: "/products/convert-pdf-word/converted-result.png", thumbnail_url: null, alt_text: "Trang tài liệu sau khi chuyển đổi kiểm thử", media_type: "image" }
    ],
    competitors: [
      {
        name: "Adobe Acrobat Standard",
        price: "US$14,99/tháng",
        note: "Có chỉnh sửa và chuyển đổi PDF, dùng theo thuê bao hằng năm.",
        sourceUrl: "https://www.adobe.com/vn_vi/acrobat/pricing/compare-versions.html"
      },
      {
        name: "iLovePDF Premium",
        price: "US$5/tháng, trả US$60/năm",
        note: "Hỗ trợ PDF sang Office và batch, xử lý qua hệ sinh thái web/desktop.",
        sourceUrl: "https://www.ilovepdf.com/pricing"
      }
    ],
    faq: [
      ["Có đảm bảo Word giống PDF 100% không?", "Không công cụ nào đảm bảo cho mọi PDF. Chế độ ảnh giữ bố cục tốt hơn nhưng chữ không chỉnh sửa trực tiếp."],
      ["OCR có sẵn ngay không?", "Cần cài Tesseract và gói ngôn ngữ Việt/Anh nếu muốn dùng OCR."]
    ]
  }),
  tool({
    id: "55555555-5555-4555-8555-555555555555",
    category: catalogCategories[2],
    name: "Local App English",
    slug: "local-app-english",
    short: "Flashcard, Learn, Write, Spell, Test, Match và luyện nghe YouTube trong một app học từ vựng riêng.",
    price: 300_000,
    cover: "/products/local-english/sets-desktop.png",
    badge: "300K / vĩnh viễn",
    description:
      "Một góc học tiếng Anh không bị quảng cáo kéo đi chỗ khác. Tạo bộ từ, import CSV, luyện theo nhiều chế độ, theo dõi tiến độ và ôn lại theo lịch 1–3–7 ngày. Dữ liệu lưu trên trình duyệt; có thể đồng bộ Google Sheet nếu cấu hình.",
    features: [
      "Flashcard, Learn, Write, Spell, Test và game Match",
      "Listening Dictation từ YouTube: chia đoạn, nghe–chép, chấm mềm và dịch",
      "Import CSV, phát âm bằng Web Speech và theo dõi tiến độ",
      "Lịch ôn 1–3–7 ngày, tự đánh dấu từ khó sau hai lần sai",
      "Giao diện mobile rút gọn để thêm từ, học Flashcard và Learn"
    ],
    requirements: ["Trình duyệt hiện đại", "Internet cho YouTube, dịch và đồng bộ Google Sheet", "Desktop có đầy đủ chế độ hơn mobile"],
    guide: ["Tạo bộ từ mới hoặc import CSV.", "Chọn Study rồi bắt đầu bằng Flashcard/Learn.", "Dùng Write, Spell, Test, Match để đổi cách nhớ.", "Mở Listening Test, dán video YouTube và luyện chép từng đoạn.", "Xem Progress để ôn lại từ đến hạn."],
    competitors: [
      {
        name: "Quizlet Plus Unlimited",
        price: "US$44,99/năm",
        note: "Có Learn, Test và bộ flashcard lớn; gói premium tự gia hạn.",
        sourceUrl: "https://quizlet.com/upgrade"
      },
      {
        name: "AnkiMobile",
        price: "US$24,99 mua một lần trên iOS",
        note: "Flashcard lặp lại ngắt quãng mạnh; bản desktop Anki miễn phí.",
        sourceUrl: "https://apps.apple.com/us/app/ankimobile-flashcards/id373493387"
      }
    ],
    gallery: [
      { id: "local-desktop", url: "/products/local-english/sets-desktop.png", thumbnail_url: null, alt_text: "Danh sách bộ từ Local English trên desktop", media_type: "image" },
      { id: "local-mobile", url: "/products/local-english/sets-mobile.png", thumbnail_url: null, alt_text: "Thêm từ nhanh trên Local English mobile", media_type: "image" },
      { id: "local-dashboard", url: "/products/local-english/dashboard.png", thumbnail_url: null, alt_text: "Bảng điều khiển học tập Local English", media_type: "image" },
      { id: "local-flashcards", url: "/products/local-english/flashcards.png", thumbnail_url: null, alt_text: "Chế độ Flashcard", media_type: "image" },
      { id: "local-match", url: "/products/local-english/match-game.png", thumbnail_url: null, alt_text: "Trò chơi ghép thẻ Match", media_type: "image" },
      { id: "local-progress", url: "/products/local-english/progress.png", thumbnail_url: null, alt_text: "Theo dõi tiến độ và lịch ôn", media_type: "image" }
    ],
    demoUrl: "https://flash-card-orpin-omega.vercel.app/sets",
    faq: [
      ["Có dùng được trên điện thoại không?", "Có. Mobile hỗ trợ thêm từ, Flashcard và Learn; các chế độ chuyên sâu đầy đủ hơn trên desktop."],
      ["App có hoàn toàn offline không?", "Không. Dữ liệu bộ từ lưu local, nhưng YouTube, dịch và Google Sheet cần internet."]
    ]
  }),
  tool({
    id: "66666666-6666-4666-8666-666666666666",
    category: catalogCategories[1],
    name: "Clypra Video Editor",
    slug: "clypra-video-editor",
    short: "Timeline nhiều lớp, cắt ghép, text, phụ đề, quay màn hình và xuất video đến 4K trên desktop.",
    priceType: "contact",
    priceLabel: "Liên hệ gói cài đặt & hỗ trợ",
    cover: "/products/covers/video-editor.svg",
    badge: "Mã nguồn mở",
    description:
      "Clypra là phần mềm mã nguồn mở MIT. Chúng tôi không bán lại phần mềm miễn phí; gói thương mại chỉ tính cho công cài đặt, đóng gói Windows, cấu hình và hỗ trợ theo nhu cầu.",
    features: [
      "Timeline nhiều track cho video, audio và hình ảnh",
      "Split, trim, ripple, transform, tốc độ, âm lượng và fade",
      "Text animation, phụ đề SRT/VTT, tách audio và freeze frame",
      "Quay màn hình, webcam, microphone; autosave và crash recovery",
      "Xuất H.264, H.265, ProRes với độ phân giải đến 4K"
    ],
    requirements: ["Windows desktop", "Cấu hình phụ thuộc độ phân giải và codec dự án"],
    guide: ["Tạo dự án và import video/audio/ảnh.", "Kéo media xuống timeline, cắt và sắp xếp.", "Thêm text, phụ đề hoặc thu màn hình.", "Chọn codec, độ phân giải rồi export."],
    gallery: [
      { id: "clypra-home", url: "/products/clypra/home-screen.png", thumbnail_url: null, alt_text: "Màn hình tạo dự án mới của Clypra", media_type: "image" },
      { id: "clypra-editor", url: "/products/clypra/editor-overview.png", thumbnail_url: null, alt_text: "Tổng quan trình dựng video Clypra", media_type: "image" },
      { id: "clypra-cover", url: "/products/covers/video-editor.svg", thumbnail_url: null, alt_text: "Các chức năng dựng video chính", media_type: "image" }
    ],
    competitors: [
      {
        name: "Adobe Premiere",
        price: "US$22,99/tháng",
        note: "Bộ dựng chuyên nghiệp theo thuê bao hằng năm trả theo tháng.",
        sourceUrl: "https://www.adobe.com/products/premiere/plans.html"
      },
      {
        name: "Wondershare Filmora",
        price: "Từ US$49,99/năm",
        note: "Trình dựng phổ thông có gói năm và bản quyền theo phiên bản.",
        sourceUrl: "https://filmora.wondershare.com/shop/buy/buy-video-editor.html"
      }
    ],
    faq: [
      ["Vì sao không có giá mua phần mềm?", "Clypra dùng giấy phép MIT và có thể tải miễn phí. Phí chỉ áp dụng cho đóng gói, cài đặt, cấu hình hoặc tùy biến."],
      ["Có phù hợp dựng phim chuyên nghiệp không?", "Có nhiều tính năng timeline quan trọng, nhưng nên thử với codec và workflow thực tế trước khi thay Premiere/DaVinci."]
    ]
  }),
  tool({
    id: "77777777-7777-4777-8777-777777777777",
    category: catalogCategories[3],
    name: "Mapping Image to Excel",
    slug: "mapping-image-to-excel",
    short: "Dự án đang được kiểm tra lại chức năng, file mẫu và mức giá trước khi mở bán.",
    priceType: "contact",
    priceLabel: "Chưa mở bán",
    cover: "/products/covers/image-excel.svg",
    badge: "Đang hoàn thiện",
    description:
      "Thư mục dự án hiện chưa có mã nguồn, tài liệu hoặc bản chạy để xác minh. Sản phẩm được niêm yết ở trạng thái sắp ra mắt; chúng tôi không công bố tính năng và không nhận thanh toán khi chưa kiểm thử.",
    features: ["Đang xác minh phạm vi đọc ảnh", "Đang xác minh cấu trúc dữ liệu Excel đầu ra", "Sẽ cập nhật demo và giá sau khi kiểm thử"],
    requirements: ["Chưa công bố"],
    guide: ["Gửi file ảnh và mẫu Excel mong muốn.", "Chúng tôi xác nhận khả năng xử lý trước khi báo giá.", "Chỉ mở bán sau khi có demo kiểm thử."],
    competitors: [
      {
        name: "ABBYY FineReader PDF",
        price: "Tham khảo theo gói của nhà cung cấp",
        note: "Tên tham chiếu thị trường về OCR; chưa dùng để khẳng định tính năng của dự án.",
        sourceUrl: "https://pdf.abbyy.com/pricing/"
      },
      {
        name: "Microsoft Excel / Microsoft 365",
        price: "Microsoft 365 Personal US$99,99/năm",
        note: "Tên tham chiếu cho đầu ra bảng tính; dự án chưa được xác minh.",
        sourceUrl: "https://www.microsoft.com/en-us/microsoft-365/buy/compare-all-microsoft-365-products"
      }
    ],
    availabilityNote: "Chưa mở bán vì chưa đủ mã nguồn và tài liệu để kiểm thử.",
    faq: [["Khi nào có thể mua?", "Sau khi có bản chạy, dữ liệu mẫu, kết quả kiểm thử và mức giá được chủ sản phẩm xác nhận."]]
  })
];

export const catalogServices: CatalogService[] = [
  service("Thiết kế website bán hàng & giới thiệu dịch vụ", "lam-website", "Làm website responsive, nội dung rõ, có form nhận khách và bàn giao để bạn tự quản lý.", "/services/website-design.png", 10, ["Landing page hoặc website nhiều trang", "Tối ưu mobile/desktop và tốc độ", "Kết nối form, tên miền và nền tảng triển khai"]),
  service("Tool nhập liệu hàng loạt cho kế toán", "tool-nhap-lieu-ke-toan", "Tự động đọc, chuẩn hóa và nhập dữ liệu từ Excel, PDF hoặc biểu mẫu theo quy trình kế toán thực tế.", "/services/accounting-automation.png", 20, ["Nhận file mẫu và quy tắc đối soát", "Xử lý theo batch, có log lỗi", "Ưu tiên dữ liệu local và khả năng kiểm tra lại"]),
  service("Custom tool theo nhu cầu", "custom-tool-theo-nhu-cau", "Làm phần mềm Windows hoặc web app cho công việc lặp lại mà tool có sẵn chưa giải quyết đúng.", "/services/custom-tool.png", 30, ["Khảo sát workflow thật", "Chốt MVP và tiêu chí nghiệm thu", "Test với dữ liệu mẫu, bàn giao hướng dẫn"]),
  service("Tự động hóa báo cáo & xử lý dữ liệu", "tu-dong-hoa-bao-cao", "Gộp file, làm sạch dữ liệu, đối soát và xuất báo cáo định kỳ cho vận hành, bán hàng hoặc kế toán.", "/services/report-automation.png", 40, ["Excel, CSV, PDF và dữ liệu xuất hệ thống", "Quy tắc xử lý có thể kiểm tra", "Xuất báo cáo cùng log ngoại lệ"])
];

export function findTool(slug: string) {
  return catalogTools.find((item) => item.slug === slug);
}

export function findService(slug: string) {
  return catalogServices.find((item) => item.slug === slug);
}

function category(name: string, slug: string, description: string, icon: string, sort: number): Category {
  return { id: `00000000-0000-4000-8000-${String(sort).padStart(12, "0")}`, name, slug, description, icon_name: icon, accent_color: "#0058be", sort_order: sort, is_published: true, created_at: now, updated_at: now };
}

function tool(input: {
  id: string; category: Category; name: string; slug: string; short: string; cover: string; badge: string; description: string;
  features: string[]; requirements: string[]; guide: string[]; competitors: Competitor[]; faq: [string, string][];
  price?: number; priceType?: Tool["price_type"]; priceLabel?: string; gallery?: CatalogTool["gallery"]; demoUrl?: string; availabilityNote?: string;
}): CatalogTool {
  return {
    id: input.id, category_id: input.category.id, name: input.name, slug: input.slug, short_description: input.short,
    description_markdown: input.description, price_type: input.priceType ?? "fixed", price_vnd: input.price ?? null,
    old_price_vnd: null, price_label: input.priceLabel ?? null, version: "1.0", license_text: input.price ? "Bản quyền vĩnh viễn" : null,
    compatibility: ["Windows 10", "Windows 11"], file_size: null, language_support: ["Tiếng Việt"], badge: input.badge,
    icon_url: null, cover_image_url: input.cover, tutorial_video_url: null, demo_url: input.demoUrl ?? null,
    primary_cta_label: input.demoUrl ? "Dùng thử & liên hệ mua" : "Liên hệ qua Zalo / form", primary_cta_type: input.demoUrl ? "external" : "contact",
    primary_cta_url: input.demoUrl ?? null, features: input.features.map((text) => ({ text })),
    system_requirements: input.requirements.map((text) => ({ text })), changelog: [],
    faq: input.faq.map(([question, answer]) => ({ question, answer })),
    seo_title: `${input.name} - tool box giá rẻ`, seo_description: input.short, is_featured: Boolean(input.price),
    is_published: true, sort_order: 0, published_at: now, created_at: now, updated_at: now,
    categories: { name: input.category.name, slug: input.category.slug }, guideSteps: input.guide, competitors: input.competitors,
    gallery: input.gallery ?? [{ id: `${input.slug}-cover`, url: input.cover, thumbnail_url: null, alt_text: `Giao diện giới thiệu ${input.name}`, media_type: "image" }],
    availabilityNote: input.availabilityNote
  };
}

function service(title: string, slug: string, short: string, cover: string, sort: number, features: string[]): CatalogService {
  return {
    id: `99999999-9999-4999-8999-${String(sort).padStart(12, "0")}`, title, slug, short_description: short,
    description_markdown: short, icon_name: null, cover_image_url: cover, price_label: "Liên hệ báo giá",
    features: features.map((text) => ({ text })), process_steps: ["Gửi nhu cầu và file mẫu", "Chốt phạm vi, thời gian và chi phí", "Làm bản thử, kiểm tra và bàn giao"].map((text) => ({ text })),
    faq: [{ question: "Có báo giá ngay được không?", answer: "Cần xem workflow và dữ liệu mẫu để tránh báo thiếu phạm vi." }],
    primary_cta_label: "Trao đổi nhu cầu", seo_title: `${title} - tool box giá rẻ`, seo_description: short,
    is_featured: sort <= 30, is_published: true, sort_order: sort, created_at: now, updated_at: now,
    gallery: [
      { id: `${slug}-main`, url: cover, alt_text: `Minh họa quy trình ${title}` },
      { id: `${slug}-related`, url: sort === 10 ? "/services/custom-tool.png" : sort === 20 ? "/services/report-automation.png" : sort === 30 ? "/services/website-design.png" : "/services/accounting-automation.png", alt_text: `Minh họa đầu ra và cách triển khai ${title}` }
    ]
  };
}
