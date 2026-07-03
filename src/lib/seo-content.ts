export type FaqItem = {
  question: string;
  answer: string;
};

export type SeoLink = {
  title: string;
  href: string;
};

export type SeoLandingPage = {
  slug: string;
  toolName: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  h1: string;
  subheadline: string;
  badges: string[];
  painPoints: string[];
  featureMappings: string[];
  steps: string[];
  useCases: string[];
  trustItems: string[];
  faqs: FaqItem[];
  relatedGuides: string[];
  relatedTools: SeoLink[];
};

export type GuidePage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  problem: string;
  quickAnswer: string;
  steps: string[];
  landingSlug: string;
  relatedToolSlugs: string[];
  faqs: FaqItem[];
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "resize-anh-hang-loat-shopee-lazada",
    toolName: "Batch Image Studio",
    title: "Resize ảnh hàng loạt Shopee/Lazada - ToolBox Việt",
    description:
      "Resize nhiều ảnh JPG, PNG, WebP theo chuẩn Shopee 1024x1024, Lazada 1000x1000, thêm watermark và không ghi đè file gốc. Tool Windows dùng thử.",
    primaryKeyword: "resize ảnh hàng loạt",
    secondaryKeywords: [
      "resize ảnh Shopee",
      "resize ảnh Lazada",
      "chỉnh kích thước ảnh hàng loạt",
      "thêm watermark ảnh hàng loạt",
      "chuyển ảnh sang WebP hàng loạt"
    ],
    h1: "Resize ảnh hàng loạt cho Shopee, Lazada và website",
    subheadline:
      "Batch Image Studio giúp shop online chọn nhiều ảnh hoặc cả folder, resize theo preset sàn, chuyển WebP và thêm watermark mà không ghi đè file gốc.",
    badges: ["Windows", "Xử lý hàng loạt", "Không upload file", "Hỗ trợ JPG/PNG/WebP"],
    painPoints: [
      "Ảnh sản phẩm tải từ nhiều nguồn nên mỗi tấm một kích thước.",
      "Cần chuẩn Shopee 1024x1024 hoặc Lazada 1000x1000 nhưng làm thủ công quá lâu.",
      "Muốn thêm watermark cho cả folder ảnh mà không mở từng file.",
      "Website cần ảnh WebP nhẹ hơn nhưng vẫn phải giữ file gốc."
    ],
    featureMappings: [
      "Có 500 ảnh sản phẩm sai kích thước -> chọn cả folder và resize theo preset Shopee/Lazada.",
      "Cần ảnh nhẹ cho website -> xuất WebP max 1600px và giữ lại ảnh gốc.",
      "Muốn đóng dấu thương hiệu -> thêm watermark text và chọn vị trí theo 9 điểm.",
      "Cần kiểm tra ca xử lý -> đọc manifest.json và run_log.csv sau khi chạy."
    ],
    steps: [
      "Mở Batch Image Studio trên Windows.",
      "Chọn nhiều file ảnh hoặc chọn cả folder sản phẩm.",
      "Chọn preset Shopee 1024x1024, Lazada 1000x1000 hoặc nhập kích thước riêng.",
      "Chọn định dạng xuất JPG, PNG, WebP hoặc giữ định dạng gốc.",
      "Bật watermark text nếu cần và chọn vị trí hiển thị.",
      "Xem lại thư mục đầu ra rồi chạy xử lý hàng loạt.",
      "Kiểm tra ảnh đã xuất, manifest.json và run_log.csv."
    ],
    useCases: [
      "Seller chuẩn bị bộ ảnh sản phẩm trước khi đăng Shopee hoặc Lazada.",
      "Content team chuyển ảnh bài viết sang WebP để website tải nhanh hơn.",
      "Chủ shop thêm watermark thương hiệu lên ảnh lấy từ buổi chụp sản phẩm.",
      "Agency xử lý nhiều folder ảnh cho nhiều khách hàng trong cùng một ngày."
    ],
    trustItems: [
      "Chạy local trên Windows, không cần upload ảnh sản phẩm lên web lạ.",
      "Không ghi đè file gốc khi xuất ảnh đã xử lý.",
      "Có manifest.json và run_log.csv để đối chiếu phiên chạy.",
      "Preset bám workflow seller Việt Nam: Shopee, Lazada, website WebP."
    ],
    faqs: [
      {
        question: "Tool resize ảnh hàng loạt này có chạy offline không?",
        answer: "Các thao tác xử lý ảnh chạy trên máy Windows của bạn, không cần upload ảnh lên website."
      },
      {
        question: "Có resize ảnh Shopee 1024x1024 được không?",
        answer: "Có. Batch Image Studio có preset Shopee 1024x1024 và Lazada 1000x1000."
      },
      {
        question: "Tool có ghi đè file ảnh gốc không?",
        answer: "Không. Tool xuất file đã xử lý ra thư mục đầu ra và giữ file gốc."
      },
      {
        question: "Có chuyển ảnh sang WebP hàng loạt được không?",
        answer: "Có thể chuyển JPG, JPEG, PNG sang WebP hoặc giữ định dạng gốc tùy nhu cầu."
      },
      {
        question: "Tôi nhận bản dùng thử bằng cách nào?",
        answer: "Bạn gửi yêu cầu tư vấn hoặc nhắn Zalo để nhận link dùng thử nếu bản public đã sẵn sàng."
      }
    ],
    relatedGuides: [
      "cach-resize-anh-hang-loat-cho-shopee",
      "cach-them-watermark-anh-hang-loat",
      "cach-chuyen-anh-sang-webp-hang-loat"
    ],
    relatedTools: [{ title: "File Renamer Pro", href: "/doi-ten-file-hang-loat" }]
  },
  {
    slug: "doi-ten-file-hang-loat",
    toolName: "File Renamer Pro",
    title: "Đổi tên file hàng loạt an toàn - ToolBox Việt",
    description:
      "Đổi tên nhiều file bằng prefix, suffix, numbering, regex, change case. Có preview/dry-run, chặn trùng tên và hỗ trợ undo batch.",
    primaryKeyword: "đổi tên file hàng loạt",
    secondaryKeywords: [
      "phần mềm đổi tên file hàng loạt",
      "rename file hàng loạt",
      "đổi tên ảnh hàng loạt",
      "đánh số file hàng loạt",
      "đổi tên file bằng regex"
    ],
    h1: "Đổi tên file hàng loạt an toàn trên Windows",
    subheadline:
      "File Renamer Pro cho phép preview trước khi đổi tên thật, lọc theo extension hoặc regex, đánh số file và undo batch gần nhất bằng manifest.",
    badges: ["Windows", "Dry-run trước khi đổi", "Chặn trùng tên", "Có undo"],
    painPoints: [
      "Folder ảnh hoặc chứng từ có tên lộn xộn, khó tìm lại.",
      "Đổi tên thủ công vài trăm file rất dễ nhầm số thứ tự.",
      "Regex mạnh nhưng nếu chạy sai có thể làm hỏng cả thư viện file.",
      "Windows không cho một số ký tự trong tên file nên batch rename dễ lỗi giữa chừng."
    ],
    featureMappings: [
      "Cần thêm mã sản phẩm vào đầu tên file -> dùng rule prefix cho toàn bộ folder.",
      "Cần đánh số ảnh theo thứ tự -> dùng numbering và xem preview trước khi chạy.",
      "Tên file có pattern phức tạp -> dùng regex replace kèm dry-run.",
      "Lỡ đổi nhầm batch gần nhất -> dùng manifest để undo."
    ],
    steps: [
      "Chọn folder chứa file cần đổi tên.",
      "Bật recursive nếu muốn xử lý cả thư mục con.",
      "Lọc file theo extension, text trong tên hoặc regex.",
      "Thêm rule replace, prefix, suffix, numbering, change case hoặc token ngày sửa.",
      "Xem preview để phát hiện trùng tên và ký tự Windows không hợp lệ.",
      "Chạy rename thật khi danh sách đã đúng.",
      "Giữ manifest để có thể undo batch gần nhất."
    ],
    useCases: [
      "Đổi tên ảnh sản phẩm trước khi upload lên sàn.",
      "Chuẩn hóa tên hóa đơn, chứng từ, hợp đồng trong văn phòng.",
      "Photographer đánh số bộ ảnh bàn giao cho khách.",
      "Admin dọn folder tải về có tên file không theo quy tắc."
    ],
    trustItems: [
      "Có preview/dry-run trước khi đổi tên thật.",
      "Chặn collision để tránh ghi đè hoặc mất file.",
      "Chặn ký tự không hợp lệ của Windows.",
      "Có undo batch gần nhất bằng manifest."
    ],
    faqs: [
      {
        question: "Đổi tên file hàng loạt có bị trùng tên không?",
        answer: "Tool kiểm tra collision trong preview và chặn các case có nguy cơ trùng tên."
      },
      {
        question: "Có đổi tên file bằng regex được không?",
        answer: "Có. Bạn có thể dùng regex replace và xem kết quả dry-run trước."
      },
      {
        question: "Tool có đổi tên ảnh hàng loạt được không?",
        answer: "Có. Bạn có thể lọc JPG, PNG, WebP hoặc các extension ảnh khác."
      },
      {
        question: "Nếu đổi nhầm thì có quay lại được không?",
        answer: "Batch gần nhất có thể undo bằng manifest nếu file chưa bị di chuyển hoặc sửa ngoài tool."
      },
      {
        question: "License dùng như thế nào?",
        answer: "ToolBox Việt tư vấn theo số máy hoặc nhu cầu triển khai thực tế, không tự động giao license trên website."
      }
    ],
    relatedGuides: [
      "cach-doi-ten-file-hang-loat-khong-bi-trung",
      "cach-danh-so-file-hang-loat"
    ],
    relatedTools: [{ title: "Batch Image Studio", href: "/resize-anh-hang-loat-shopee-lazada" }]
  },
  {
    slug: "gop-nhieu-file-excel",
    toolName: "Excel Data Merger",
    title: "Gộp nhiều file Excel/CSV thành một file - ToolBox Việt",
    description:
      "Gộp dữ liệu từ nhiều file .xlsx, .xlsm, .csv, đọc nhiều sheet, normalize header tiếng Việt, xuất merged.xlsx và file errors.xlsx.",
    primaryKeyword: "gộp nhiều file Excel",
    secondaryKeywords: [
      "gộp Excel thành một file",
      "merge nhiều file Excel",
      "gộp nhiều file CSV",
      "gộp Excel CSV",
      "gộp dữ liệu nhiều sheet"
    ],
    h1: "Gộp nhiều file Excel/CSV thành một file tổng",
    subheadline:
      "Excel Data Merger gom dữ liệu từ .xlsx, .xlsm và .csv, đọc sheet theo lựa chọn, normalize header tiếng Việt và ghi file lỗi riêng để bạn kiểm soát dữ liệu.",
    badges: ["Windows", "Không cần Microsoft Excel", "Hỗ trợ CSV", "Header tiếng Việt"],
    painPoints: [
      "Mỗi chi nhánh gửi một file Excel, cuối tháng phải copy paste lại.",
      "Header tiếng Việt lúc có dấu, lúc viết tắt, làm công thức tổng bị sai.",
      "Một số file thiếu cột hoặc bị hỏng khiến quá trình gộp dừng giữa chừng.",
      "Cần biết dòng nào đến từ file và sheet nào để đối soát."
    ],
    featureMappings: [
      "Có nhiều workbook báo cáo -> chọn folder và gộp vào merged.xlsx.",
      "Header không thống nhất -> normalize Mã đơn thành ma_don, Số tiền thành so_tien.",
      "File thiếu cột bắt buộc -> ghi riêng vào errors.xlsx thay vì làm hỏng file tổng.",
      "Cần truy nguồn dữ liệu -> bật source_file và source_sheet."
    ],
    steps: [
      "Chọn folder chứa file .xlsx, .xlsm hoặc .csv.",
      "Chọn đọc first sheet, sheet cụ thể hoặc toàn bộ sheet.",
      "Khai báo cột bắt buộc nếu cần kiểm soát dữ liệu.",
      "Bật normalize header tiếng Việt và auto map header.",
      "Chọn có thêm source_file, source_sheet hay không.",
      "Chạy gộp dữ liệu và mở merged.xlsx.",
      "Kiểm tra errors.xlsx để xử lý file thiếu cột hoặc file hỏng."
    ],
    useCases: [
      "Gộp báo cáo bán hàng từ nhiều chi nhánh.",
      "Gộp đơn hàng xuất từ nhiều nguồn CSV và Excel.",
      "Tổng hợp dữ liệu kế toán từ các file cùng mẫu.",
      "Chuẩn bị file tổng trước khi import vào hệ thống nội bộ."
    ],
    trustItems: [
      "Chạy trên Windows và không cần cài Microsoft Excel.",
      "Không upload file báo cáo lên website.",
      "File lỗi được tách riêng trong errors.xlsx để không mất dấu vết.",
      "Có tùy chọn thêm source_file, source_sheet cho đối soát."
    ],
    faqs: [
      {
        question: "Có gộp nhiều file Excel mà không cài Microsoft Excel được không?",
        answer: "Có. Excel Data Merger đọc file bằng engine tích hợp, không phụ thuộc ứng dụng Microsoft Excel."
      },
      {
        question: "Có gộp CSV chung với Excel được không?",
        answer: "Có thể gộp .xlsx, .xlsm và .csv trong cùng workflow nếu cấu trúc dữ liệu phù hợp."
      },
      {
        question: "Header tiếng Việt có dấu có bị lỗi không?",
        answer: "Tool normalize header tiếng Việt và map các tên quen thuộc như Mã đơn, Số tiền."
      },
      {
        question: "File thiếu cột bắt buộc xử lý thế nào?",
        answer: "File thiếu cột hoặc file hỏng được ghi vào errors.xlsx để bạn kiểm tra riêng."
      },
      {
        question: "Có đọc nhiều sheet trong một file không?",
        answer: "Có. Bạn có thể chọn first sheet, sheet cụ thể hoặc toàn bộ sheet."
      }
    ],
    relatedGuides: [
      "cach-gop-nhieu-file-excel-thanh-mot-file",
      "cach-gop-nhieu-file-csv"
    ],
    relatedTools: [
      { title: "CSV Cleaner", href: "/lam-sach-file-csv" },
      { title: "PDF Workflow Pro", href: "/ghep-tach-pdf-offline" }
    ]
  },
  {
    slug: "lam-sach-file-csv",
    toolName: "CSV Cleaner",
    title: "Làm sạch file CSV tiếng Việt - ToolBox Việt",
    description:
      "Làm sạch CSV/TSV: detect encoding, detect delimiter, hỗ trợ dấu tiếng Việt, xóa dòng rỗng, duplicate, chuẩn hóa header và xuất error_report.csv.",
    primaryKeyword: "làm sạch file CSV",
    secondaryKeywords: [
      "CSV lỗi tiếng Việt",
      "chuẩn hóa file CSV",
      "xóa duplicate CSV",
      "normalize header CSV",
      "detect encoding CSV"
    ],
    h1: "Làm sạch file CSV/TSV có dấu tiếng Việt",
    subheadline:
      "CSV Cleaner detect encoding và delimiter, normalize Unicode NFC, xóa dòng rỗng, xóa duplicate, chuẩn hóa tên cột và ghi error_report.csv cho dòng lệch số cột.",
    badges: ["Windows", "CSV/TSV", "Tiếng Việt NFC", "Có error report"],
    painPoints: [
      "CSV xuất từ sàn TMĐT bị lỗi dấu tiếng Việt hoặc sai delimiter.",
      "File có dòng trống, khoảng trắng thừa và duplicate làm báo cáo sai.",
      "Tên cột không thống nhất nên import vào hệ thống bị lỗi.",
      "Một số dòng lệch số cột nhưng khó tìm bằng mắt thường."
    ],
    featureMappings: [
      "Không biết file dùng encoding gì -> tool detect encoding trước khi đọc.",
      "CSV lúc dùng dấu phẩy, lúc dùng tab -> detect delimiter CSV/TSV.",
      "Dữ liệu có dấu tiếng Việt lộn xộn -> normalize Unicode NFC.",
      "Dòng lỗi lệch cột -> ghi error_report.csv để sửa thủ công."
    ],
    steps: [
      "Chọn file CSV hoặc TSV cần làm sạch.",
      "Để tool detect encoding và delimiter.",
      "Bật trim khoảng trắng và normalize Unicode NFC.",
      "Chọn xóa dòng rỗng và xóa duplicate nếu cần.",
      "Chuẩn hóa tên cột theo quy tắc dễ import.",
      "Xuất cleaned CSV.",
      "Mở error_report.csv để kiểm tra dòng lỗi hoặc lệch số cột."
    ],
    useCases: [
      "Làm sạch đơn hàng xuất từ Shopee, Lazada hoặc TikTok Shop.",
      "Chuẩn bị CSV trước khi import vào phần mềm kế toán.",
      "Dọn dữ liệu khách hàng bị trùng dòng.",
      "Chuẩn hóa file vận hành trước khi gửi cho team phân tích."
    ],
    trustItems: [
      "Chạy local trên Windows, phù hợp dữ liệu nội bộ.",
      "Ghi file cleaned CSV riêng, không sửa file gốc.",
      "Có error_report.csv cho dòng lỗi.",
      "Có xử lý Unicode NFC để giảm lỗi dấu tiếng Việt."
    ],
    faqs: [
      {
        question: "CSV Cleaner có sửa lỗi tiếng Việt được không?",
        answer: "Tool hỗ trợ detect encoding và normalize Unicode NFC để giảm lỗi dấu trong CSV tiếng Việt."
      },
      {
        question: "Có xóa duplicate CSV được không?",
        answer: "Có. Bạn có thể bật xóa duplicate trước khi xuất cleaned CSV."
      },
      {
        question: "Tool có làm hỏng file gốc không?",
        answer: "Không. Tool ghi file cleaned CSV mới và report lỗi riêng."
      },
      {
        question: "Có dùng được với TSV không?",
        answer: "Có. Tool detect delimiter nên có thể xử lý CSV và TSV."
      },
      {
        question: "Dòng lệch số cột được báo thế nào?",
        answer: "Các dòng lỗi hoặc lệch số cột được ghi vào error_report.csv."
      }
    ],
    relatedGuides: [
      "cach-lam-sach-file-csv-loi-tieng-viet",
      "cach-xoa-duplicate-trong-csv",
      "cach-gop-nhieu-file-csv"
    ],
    relatedTools: [{ title: "Excel Data Merger", href: "/gop-nhieu-file-excel" }]
  },
  {
    slug: "ghep-tach-pdf-offline",
    toolName: "PDF Workflow Pro",
    title: "Ghép, tách và xử lý PDF offline - ToolBox Việt",
    description:
      "Merge, split, rotate, encrypt, decrypt PDF, extract text và table ra CSV. Xử lý trên Windows, không cần upload file PDF lên web.",
    primaryKeyword: "ghép PDF offline",
    secondaryKeywords: [
      "tách PDF offline",
      "gộp file PDF",
      "split PDF theo trang",
      "khóa PDF bằng mật khẩu",
      "extract text PDF",
      "extract table PDF"
    ],
    h1: "Ghép, tách và xử lý PDF offline trên Windows",
    subheadline:
      "PDF Workflow Pro xử lý PDF nội bộ: merge nhiều PDF, split theo page range, rotate, đặt mật khẩu, giải mã khi có password đúng và trích text/table ra file.",
    badges: ["Windows", "Offline", "Không upload PDF", "Không sửa file gốc"],
    painPoints: [
      "PDF hợp đồng, sao kê hoặc hồ sơ có dữ liệu nhạy cảm, không muốn upload lên web.",
      "Cần ghép nhiều file scan thành một bộ hồ sơ hoàn chỉnh.",
      "Muốn tách vài trang từ PDF dài mà không sửa file gốc.",
      "Cần extract text hoặc bảng cơ bản để nhập lại vào Excel."
    ],
    featureMappings: [
      "Có nhiều PDF cần gom -> dùng merge để tạo một file mới.",
      "Chỉ cần trang 5-12 -> split PDF theo page range.",
      "File scan bị xoay ngang -> rotate 90/180/270 độ.",
      "Cần bảo vệ tài liệu -> encrypt bằng password hoặc decrypt khi có password đúng."
    ],
    steps: [
      "Mở PDF Workflow Pro trên Windows.",
      "Chọn tác vụ merge, split, rotate, encrypt, decrypt hoặc extract.",
      "Thêm một hoặc nhiều file PDF cần xử lý.",
      "Nhập page range, góc xoay hoặc password nếu tác vụ yêu cầu.",
      "Chọn thư mục xuất file mới.",
      "Chạy xử lý và kiểm tra file đầu ra.",
      "Với extract table, mở CSV để kiểm tra bảng cơ bản đã trích."
    ],
    useCases: [
      "Văn phòng ghép nhiều bản scan thành một hồ sơ gửi đối tác.",
      "Kế toán tách trang sao kê theo khoảng thời gian.",
      "Dịch vụ in ấn xoay và sắp xếp lại file scan.",
      "Admin extract text/table từ PDF nội bộ để nhập liệu."
    ],
    trustItems: [
      "Xử lý trên máy Windows, không upload PDF nhạy cảm.",
      "Không sửa file PDF gốc.",
      "Hỗ trợ khóa và mở khóa PDF khi có password đúng.",
      "Có xuất text .txt và table cơ bản .csv cho workflow văn phòng."
    ],
    faqs: [
      {
        question: "Ghép PDF offline có cần Internet không?",
        answer: "Không. Tác vụ chính chạy trên máy Windows và không yêu cầu upload file."
      },
      {
        question: "Có tách PDF theo khoảng trang được không?",
        answer: "Có. Bạn nhập page range cần tách và tool xuất file mới."
      },
      {
        question: "Tool có sửa file PDF gốc không?",
        answer: "Không. PDF Workflow Pro tạo file đầu ra mới."
      },
      {
        question: "Có khóa PDF bằng mật khẩu được không?",
        answer: "Có. Tool hỗ trợ encrypt PDF và decrypt khi bạn có password đúng."
      },
      {
        question: "Extract table PDF có thay thế OCR chuyên sâu không?",
        answer: "Không. Tính năng này phù hợp bảng cơ bản; tài liệu scan phức tạp có thể cần xử lý tùy chỉnh."
      }
    ],
    relatedGuides: [
      "cach-ghep-nhieu-file-pdf-offline",
      "cach-tach-pdf-theo-khoang-trang"
    ],
    relatedTools: [{ title: "Excel Data Merger", href: "/gop-nhieu-file-excel" }]
  },
  {
    slug: "chinh-sua-phu-de-srt-vtt",
    toolName: "Subtitle Studio",
    title: "Chỉnh sửa phụ đề SRT/VTT - ToolBox Việt",
    description:
      "Shift thời gian phụ đề theo milliseconds, chuyển SRT sang VTT hoặc VTT sang SRT, validate lỗi overlap, timestamp âm và xuất warning CSV.",
    primaryKeyword: "chỉnh sửa phụ đề SRT",
    secondaryKeywords: [
      "sửa phụ đề bị lệch thời gian",
      "chuyển SRT sang VTT",
      "chuyển VTT sang SRT",
      "validate subtitle",
      "shift subtitle"
    ],
    h1: "Chỉnh sửa phụ đề SRT/VTT bị lệch thời gian",
    subheadline:
      "Subtitle Studio load SRT/VTT, shift toàn bộ subtitle theo milliseconds, chuyển định dạng và validate lỗi overlap, timestamp âm, dòng quá dài trước khi xuất.",
    badges: ["Windows", "SRT/VTT", "Shift milliseconds", "Xuất warning CSV"],
    painPoints: [
      "Phụ đề bị lệch vài giây sau khi cắt video.",
      "Nền tảng yêu cầu VTT nhưng file đang là SRT.",
      "Subtitle bị overlap hoặc end time nhỏ hơn start time làm video player lỗi.",
      "Dòng phụ đề quá dài khiến người xem khó đọc."
    ],
    featureMappings: [
      "Phụ đề lệch đều toàn video -> shift toàn bộ theo milliseconds.",
      "Cần đổi định dạng -> convert SRT sang VTT hoặc VTT sang SRT.",
      "Muốn kiểm tra lỗi trước khi đăng -> validate overlap, timestamp âm và dòng quá dài.",
      "Cần gửi lỗi cho editor -> export warning list ra CSV."
    ],
    steps: [
      "Mở Subtitle Studio và load file SRT hoặc VTT.",
      "Xem nhanh danh sách subtitle và mốc thời gian.",
      "Nhập số milliseconds cần shift, âm hoặc dương tùy hướng lệch.",
      "Chạy validate để tìm overlap, timestamp âm, end time sai và dòng quá dài.",
      "Sửa file gốc trong công cụ hoặc quay lại phần mềm dựng nếu cần.",
      "Chọn xuất SRT hoặc VTT.",
      "Xuất warning CSV nếu cần gửi cho người kiểm tra."
    ],
    useCases: [
      "YouTuber sửa phụ đề bị lệch sau khi re-cut video.",
      "Đội khóa học chuyển SRT sang VTT để đưa lên LMS.",
      "Editor kiểm tra lỗi phụ đề trước khi bàn giao.",
      "Người làm phụ đề rà danh sách cảnh báo bằng CSV."
    ],
    trustItems: [
      "Xử lý file subtitle trên Windows.",
      "Không cần upload phụ đề hoặc nội dung khóa học lên công cụ online.",
      "Có validate lỗi thực tế: overlap, timestamp âm, end time nhỏ hơn start time.",
      "Có warning CSV để kiểm soát trước khi xuất bản."
    ],
    faqs: [
      {
        question: "Có sửa phụ đề SRT bị lệch thời gian được không?",
        answer: "Có. Bạn nhập số milliseconds cần shift để dời toàn bộ subtitle."
      },
      {
        question: "Có chuyển SRT sang VTT không?",
        answer: "Có. Subtitle Studio hỗ trợ chuyển SRT sang VTT và VTT sang SRT."
      },
      {
        question: "Tool có kiểm tra lỗi overlap không?",
        answer: "Có. Validate sẽ báo subtitle overlap, timestamp âm, end time sai và dòng quá dài."
      },
      {
        question: "Có xuất danh sách lỗi ra CSV được không?",
        answer: "Có. Warning list có thể xuất ra CSV để kiểm tra hoặc gửi cho editor."
      },
      {
        question: "Subtitle Studio có phải phần mềm dựng video không?",
        answer: "Không. Tool tập trung xử lý file phụ đề SRT/VTT, không thay thế timeline dựng video."
      }
    ],
    relatedGuides: ["cach-sua-phu-de-srt-bi-lech-thoi-gian"],
    relatedTools: [{ title: "Dịch vụ phần mềm tùy chỉnh", href: "/dich-vu/phat-trien-phan-mem-windows" }]
  }
];

export const guidePages: GuidePage[] = [
  makeGuide("cach-resize-anh-hang-loat-cho-shopee", "Cách resize ảnh hàng loạt cho Shopee", "Resize ảnh sản phẩm theo chuẩn Shopee 1024x1024 mà không chỉnh từng file.", "Ảnh sản phẩm từ điện thoại, designer hoặc nhà cung cấp thường không cùng kích thước nên upload lên sàn bị crop xấu.", "Chọn folder ảnh, dùng preset Shopee 1024x1024, xuất ra thư mục mới và kiểm tra log sau khi chạy.", "resize-anh-hang-loat-shopee-lazada", ["doi-ten-file-hang-loat"]),
  makeGuide("cach-them-watermark-anh-hang-loat", "Cách thêm watermark ảnh hàng loạt", "Thêm watermark text cho nhiều ảnh sản phẩm và chọn vị trí theo 9 điểm.", "Thêm watermark từng ảnh bằng phần mềm thiết kế mất thời gian và dễ lệch vị trí.", "Dùng Batch Image Studio, nhập watermark text, chọn vị trí và chạy cho cả folder.", "resize-anh-hang-loat-shopee-lazada", ["doi-ten-file-hang-loat"]),
  makeGuide("cach-chuyen-anh-sang-webp-hang-loat", "Cách chuyển ảnh sang WebP hàng loạt", "Chuyển nhiều ảnh JPG/PNG sang WebP để dùng cho website.", "Website có nhiều ảnh JPG/PNG dung lượng lớn sẽ tải chậm, nhất là trên mobile.", "Chọn folder ảnh, đặt định dạng WebP, dùng preset Website WebP max 1600 và xuất file mới.", "resize-anh-hang-loat-shopee-lazada", ["doi-ten-file-hang-loat"]),
  makeGuide("cach-doi-ten-file-hang-loat-khong-bi-trung", "Cách đổi tên file hàng loạt không bị trùng", "Dùng preview và collision check trước khi rename thật.", "Đổi tên nhiều file cùng lúc dễ tạo tên trùng, đặc biệt khi thêm prefix/suffix hoặc đánh số lại.", "Lọc đúng file, tạo rule rename, xem preview lỗi trùng tên rồi mới chạy batch thật.", "doi-ten-file-hang-loat", ["resize-anh-hang-loat-shopee-lazada"]),
  makeGuide("cach-danh-so-file-hang-loat", "Cách đánh số file hàng loạt trên Windows", "Đánh số ảnh, chứng từ hoặc tài liệu theo thứ tự dễ kiểm soát.", "Tên file tải về từ nhiều nguồn thường không theo thứ tự nên khó bàn giao hoặc tìm kiếm.", "Dùng rule numbering, chọn số bắt đầu và độ dài số, preview trước khi đổi tên.", "doi-ten-file-hang-loat", ["resize-anh-hang-loat-shopee-lazada"]),
  makeGuide("cach-gop-nhieu-file-excel-thanh-mot-file", "Cách gộp nhiều file Excel thành một file", "Gộp báo cáo nhiều chi nhánh vào merged.xlsx và ghi file lỗi riêng.", "Copy paste từng workbook làm mất thời gian và dễ bỏ sót file thiếu cột.", "Chọn folder Excel, normalize header tiếng Việt, bật source_file/source_sheet và xuất merged.xlsx.", "gop-nhieu-file-excel", ["lam-sach-file-csv"]),
  makeGuide("cach-gop-nhieu-file-csv", "Cách gộp nhiều file CSV", "Gộp CSV từ nhiều nguồn sau khi kiểm tra delimiter và header.", "CSV xuất từ các sàn hoặc hệ thống khác nhau thường lệch delimiter, header và encoding.", "Làm sạch CSV trước nếu cần, sau đó dùng Excel Data Merger để gom về một file tổng.", "gop-nhieu-file-excel", ["lam-sach-file-csv"]),
  makeGuide("cach-lam-sach-file-csv-loi-tieng-viet", "Cách làm sạch file CSV lỗi tiếng Việt", "Detect encoding, normalize Unicode NFC và xuất cleaned CSV.", "CSV lỗi dấu tiếng Việt khiến tên khách hàng, địa chỉ hoặc sản phẩm bị sai khi import.", "Để CSV Cleaner detect encoding, bật normalize Unicode NFC và kiểm tra error_report.csv.", "lam-sach-file-csv", ["gop-nhieu-file-excel"]),
  makeGuide("cach-xoa-duplicate-trong-csv", "Cách xóa duplicate trong CSV", "Xóa dòng trùng trong CSV/TSV trước khi báo cáo hoặc import.", "Dữ liệu trùng làm sai số đơn, sai danh sách khách hàng và tăng lỗi khi import.", "Mở CSV Cleaner, bật xóa duplicate, trim khoảng trắng và xuất cleaned CSV.", "lam-sach-file-csv", ["gop-nhieu-file-excel"]),
  makeGuide("cach-ghep-nhieu-file-pdf-offline", "Cách ghép nhiều file PDF offline", "Ghép PDF nhạy cảm trên Windows mà không upload lên website.", "Hồ sơ scan thường nằm rải rác nhiều PDF, nhưng upload tài liệu nhạy cảm lên tool online không phù hợp.", "Chọn chế độ merge, thêm file theo thứ tự, xuất PDF mới và giữ nguyên file gốc.", "ghep-tach-pdf-offline", ["gop-nhieu-file-excel"]),
  makeGuide("cach-tach-pdf-theo-khoang-trang", "Cách tách PDF theo khoảng trang", "Split PDF theo page range để lấy đúng phần cần gửi.", "PDF dài có thể chứa nhiều phần nội bộ, không phải trang nào cũng nên gửi cho người nhận.", "Chọn split, nhập khoảng trang, xuất file mới và kiểm tra lại trước khi gửi.", "ghep-tach-pdf-offline", ["gop-nhieu-file-excel"]),
  makeGuide("cach-sua-phu-de-srt-bi-lech-thoi-gian", "Cách sửa phụ đề SRT bị lệch thời gian", "Shift toàn bộ subtitle theo milliseconds và validate lỗi trước khi xuất.", "Sau khi cắt video, phụ đề SRT thường bị lệch đều vài giây so với âm thanh.", "Load SRT, nhập số milliseconds cần shift, validate overlap/timestamp và xuất lại SRT hoặc VTT.", "chinh-sua-phu-de-srt-vtt", ["dich-vu/phat-trien-phan-mem-windows"])
];

function makeGuide(
  slug: string,
  title: string,
  description: string,
  problem: string,
  quickAnswer: string,
  landingSlug: string,
  relatedToolSlugs: string[]
): GuidePage {
  return {
    slug,
    title: `${title} - ToolBox Việt`,
    description,
    h1: title,
    problem,
    quickAnswer,
    landingSlug,
    relatedToolSlugs,
    steps: [
      "Xác định folder hoặc file cần xử lý và sao lưu nếu dữ liệu quan trọng.",
      "Mở đúng tool Windows của ToolBox Việt theo nhu cầu.",
      "Chọn file, folder hoặc sheet cần xử lý.",
      "Bật các tùy chọn an toàn như preview, report lỗi hoặc xuất file mới nếu có.",
      "Chạy thử với một nhóm nhỏ để kiểm tra kết quả.",
      "Chạy toàn bộ batch và kiểm tra file đầu ra.",
      "Lưu log, manifest hoặc error report để đối soát về sau."
    ],
    faqs: [
      {
        question: "Có cần upload dữ liệu lên website không?",
        answer: "Không. Các tool được định vị cho workflow chạy trên Windows, phù hợp file nội bộ."
      },
      {
        question: "Nếu chưa có link tải public thì nhận dùng thử thế nào?",
        answer: "Bạn gửi yêu cầu tư vấn hoặc nhắn Zalo để ToolBox Việt phản hồi cách nhận bản dùng thử phù hợp."
      }
    ]
  };
}

export function getLandingBySlug(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}

export function getGuideBySlug(slug: string) {
  return guidePages.find((page) => page.slug === slug);
}

export function landingHref(slug: string) {
  return `/${slug}`;
}

export function guideHref(slug: string) {
  return `/huong-dan/${slug}`;
}
