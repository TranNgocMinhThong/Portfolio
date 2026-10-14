/* Portfolio app — Swiss editorial + nostalgic indigo */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- DATA ---------- */
const PROFILE = {
  name: "Trần Ngọc Minh Thông",
  nameInitial: "T",
  role: "Flutter Mobile & Full-stack Developer",
  roleEn: "Flutter Mobile & Full-stack Developer",
  location: "275 Quang Trung, Gò Vấp, HCM",
  locationShort: "Hồ Chí Minh, Việt Nam",
  email: "tranthng207@icloud.com",
  phone: "0394 097 349",
  github: "https://github.com/TranNgocMinhThong",
  linkedin: "https://www.linkedin.com/in/thong-tran-572488319/",
  bio_vi: "Tôi là Flutter Mobile Developer với nền tảng full-stack 4+ năm (Laravel, Vue, React, Node). Từ đầu 2026 tại Nasys, tôi xây POS/ERP cho ngành F&B trên Flutter — ứng dụng ~777K dòng Dart, Clean Architecture, hệ in ESC/POS và tích hợp phần cứng tự viết — đồng thời own luôn Laravel backend 19 domain phục vụ nó. Làm việc hằng ngày với AI agent (Claude Code, Cursor) theo quy trình: AI draft, tôi thiết kế và review.",
  bio_en: "Flutter mobile developer with a 4+ year full-stack background (Laravel, Vue, React, Node). Since early 2026 at Nasys I've been building an F&B POS/ERP in Flutter — a ~777K-line Dart app on Clean Architecture with a hand-rolled ESC/POS printing stack and hardware integrations — while also owning the 19-domain Laravel backend behind it. I work daily with AI agents (Claude Code, Cursor): AI drafts, I design and review.",
  years: "4+",
  shipped: "6",
  companies: "4"
};

const PROJECTS = [
{
  id: "orderpos",
  n: "01",
  title: "Order POS",
  subtitle: "Ứng dụng POS/ERP cho nhà hàng — Flutter, đa nền tảng",
  subtitleEn: "Restaurant POS/ERP client — Flutter, multi-platform",
  year: "2026",
  role: "Flutter Mobile Lead — Clean Architecture, ESC/POS printing stack, hardware integration",
  stack: ["Flutter", "Dart", "Riverpod", "Retrofit", "ESC/POS", "Socket.IO"],
  cover: null,
  accent: "#0f766e",
  tagline: "POS đa chi nhánh, đa tenant: gọi món, thanh toán, in bếp, kho, HRM và thuế — 24 module trên Clean Architecture.",
  detail: {
    problem_vi: "Một POS nhà hàng thực chiến phải chạy trên đủ loại thiết bị (tablet quầy, máy Sunmi/iMin cầm tay, web), nói chuyện được với máy in nhiệt qua LAN/Bluetooth/USB, cân điện tử, máy chấm công vân tay và thiết bị QR payment — trong khi codebase cũ là monolith 99K dòng không tách lớp, mỗi thao tác trong giỏ hàng lại rebuild cả màn hình 100+ món.",
    problem_en: "A real-world restaurant POS has to run on everything — counter tablets, handheld Sunmi/iMin units, web — and talk to thermal printers over LAN/Bluetooth/USB, digital scales, fingerprint clocks and serial QR-payment boxes. Meanwhile the legacy codebase was a 99K-line monolith with no layering, where every cart tap rebuilt a screen of 100+ menu items.",
    solution_vi: "Xây lại toàn bộ trên Clean Architecture + feature-first: 24 feature module và 15 shared module, mỗi module tách data/domain/presentation, DI và state hoàn toàn bằng Riverpod code-gen — 440 usecase, 246 entity, 611 API endpoint. Luật kiến trúc được codify thành tài liệu 1.236 dòng để enforce cho cả team. Hệ thống in ấn tự viết: 5 driver phần cứng, 11 ESC/POS builder, rasterize tiếng Việt có dấu cho máy in nhiệt, và print queue FIFO theo từng máy in (song song giữa các máy, chống deadlock khi một job lỗi). Responsive giải bằng Proportional Canvas Scaling — dựng cây widget ở canvas chuẩn rồi scale đồng tỉ lệ, giữ nguyên bố cục POS trên mọi kích thước. Performance: cô lập CartState và menu grid bằng ChangeNotifier/ValueNotifier + RepaintBoundary, cắt rebuild toàn trang khi thao tác giỏ hàng.",
    solution_en: "Rebuilt on Clean Architecture + feature-first: 24 feature modules and 15 shared modules, each split into data/domain/presentation, with DI and state entirely on code-generated Riverpod — 440 use cases, 246 entities, 611 API endpoints. The architecture rules are codified in a 1,236-line internal standard so the whole team (and AI agents) enforce them. The printing stack is hand-rolled: 5 hardware drivers, 11 ESC/POS builders, a Vietnamese-diacritics rasterizer for thermal heads, and a per-printer FIFO print queue that runs printers in parallel without one failed job deadlocking the rest. Responsiveness is solved by Proportional Canvas Scaling — build the widget tree at a reference canvas, then scale uniformly, so the POS layout never reflows. Performance: CartState and the menu grid are isolated behind ChangeNotifier/ValueNotifier plus RepaintBoundary, so cart edits no longer rebuild the page.",
    impact: [
    ["777K", "dòng Dart / lines"],
    ["24 + 15", "feature & shared modules"],
    ["5", "driver máy in / printer drivers"],
    ["325", "test files"],
    ["5", "ngôn ngữ / locales"]],

    ai_vi: "Tài liệu chuẩn kiến trúc 1.236 dòng được viết để vừa là tài liệu cho team, vừa là context cho agent (CLAUDE.md / .cursorrules): quy ước đặt tên, layer nào được import layer nào, mẫu UseCase/Repository/Provider. Nhờ đó Claude Code scaffold được bộ khung data/domain/presentation cho từng feature đúng chuẩn, tôi chỉ tập trung vào business logic, UI và review diff. Phần in ấn và phần cứng (ESC/POS, rasterize tiếng Việt, driver Sunmi/iMin) tôi tự viết và test trên thiết bị thật — AI chỉ dùng để tra cứu spec và sinh test case biên.",
    ai_en: "The 1,236-line architecture standard was written to serve two readers: the team, and the AI agent (CLAUDE.md / .cursorrules) — naming conventions, allowed layer imports, canonical UseCase/Repository/Provider templates. With that context Claude Code scaffolds the data/domain/presentation skeleton of each feature correctly, so my time goes into business logic, UI and reviewing diffs. The printing and hardware layer (ESC/POS, Vietnamese rasterizer, Sunmi/iMin drivers) is hand-written and tested on real devices — AI was used there only to look up specs and draft edge-case tests.",
    decisions: [
    ["Scale đồng tỉ lệ thay vì responsive reflow", "Uniform canvas scaling instead of responsive reflow", "POS cần bố cục cố định để thu ngân thao tác theo trí nhớ cơ. Dựng ở canvas chuẩn rồi scale giữ nguyên vị trí mọi nút trên tablet, Sunmi và web.", "A POS needs a fixed layout so cashiers work from muscle memory. Building at a reference canvas and scaling uniformly keeps every button in the same place on tablets, Sunmi units and web."],
    ["Print queue FIFO theo từng máy in", "Per-printer FIFO print queue", "Một máy in bếp kẹt giấy không được chặn máy in hoá đơn. Mỗi máy có queue riêng chạy song song, job lỗi được retry/bỏ mà không deadlock các máy khác.", "A jammed kitchen printer must never block the receipt printer. Each printer gets its own queue running in parallel; a failed job retries or drops without deadlocking the rest."],
    ["Cô lập CartState khỏi cây widget", "Isolate CartState from the widget tree", "Mỗi lần thêm món từng rebuild cả màn hình 100+ item. Tách CartState sang ChangeNotifier/ValueNotifier + RepaintBoundary nên chỉ phần giỏ hàng vẽ lại.", "Every add-to-cart used to rebuild a screen of 100+ items. Moving CartState behind ChangeNotifier/ValueNotifier + RepaintBoundary means only the cart repaints."]],

    shots: []
  }
},
{
  id: "ordertable",
  n: "02",
  title: "OrderTable",
  subtitle: "Backend POS/ERP multi-tenant — Laravel modular monolith",
  subtitleEn: "Multi-tenant POS/ERP backend — Laravel modular monolith",
  year: "2026",
  role: "Full-stack — DDD domain design, strangler migration, API v2, concurrency",
  stack: ["Laravel", "PHP", "MySQL", "Socket.IO", "FCM", "PHPUnit"],
  cover: null,
  accent: "#0e7490",
  tagline: "19 domain, 698 usecase, 5 API surface dùng chung một business logic. Database-per-tenant, RBAC 608 quyền.",
  detail: {
    problem_vi: "Hệ cũ là God Controller điển hình — riêng CartController đã 7.388 dòng với 53 public method, và còn tồn tại hai bản song song; `SysParameter::all()` bị copy-paste ở 22 controller. Mỗi vai trò (admin, thu ngân, phục vụ, bếp) lại có một bản controller riêng làm cùng một việc, nên mọi thay đổi nghiệp vụ phải sửa ở nhiều nơi. Song song đó là một app HRM/ERP hoàn toàn tách biệt cần sáp nhập vào.",
    problem_en: "The legacy system was a textbook God Controller — CartController alone ran 7,388 lines across 53 public methods, and two parallel copies of it existed; `SysParameter::all()` was copy-pasted across 22 controllers. Each role (admin, cashier, waiter, kitchen) had its own controller doing the same job, so any business change had to be made in several places. On top of that, a fully separate HRM/ERP app needed to be merged in.",
    solution_vi: "Tái cấu trúc thành Pragmatic Modular Monolith theo hướng DDD: 19 domain (Catalog, Order, Payment, Inventory, Finance, Printing, Attendance…), mỗi domain tự chứa Controller/Request/DTO/UseCase/Model/Resource/Policy/Event và route riêng. 698 UseCase theo chuẩn một class một hành động. Nguyên tắc one-Action-N-surfaces: cùng một business logic phục vụ 5 surface (admin/cashier/staff/kitchen/core), surface chỉ khác prefix, middleware và policy. API v2 xây song song theo strangler pattern với ràng buộc tuyệt đối không sửa code, route hay schema cũ — phủ kín 17/17 domain, ~716 route. Cross-domain chỉ được đọc, ghi phải qua Action của domain sở hữu hoặc qua event dispatch sau commit. Money-flow và tồn kho được bảo vệ bằng single write-point Action, claim mutex chống double-apply, lockForUpdate và Cache::lock trên row quỹ. Multi-tenant bằng database-per-company, swap connection runtime. Sáp nhập trọn app HRM qua 9 đợt port, 72+ endpoint, và hợp nhất 3 bản worktable() bị fork — trong đó phát hiện 2 bản tính sai ca qua đêm.",
    solution_en: "Restructured into a pragmatic, DDD-leaning modular monolith: 19 domains (Catalog, Order, Payment, Inventory, Finance, Printing, Attendance…), each self-contained with its own controllers, requests, DTOs, use cases, models, resources, policies, events and routes. 698 use cases, one class per action. The one-Action-N-surfaces rule means a single piece of business logic serves all 5 surfaces (admin/cashier/staff/kitchen/core), which differ only in prefix, middleware and policy. API v2 was built alongside the legacy system as a strangler, under a hard no-change constraint on old code, routes and schema — now covering 17/17 domains and ~716 routes. Cross-domain access is read-only; writes go through the owning domain's Action or an after-commit event. Money flow and stock are guarded by single-write-point Actions, claim mutexes against double-apply, `lockForUpdate` and a `Cache::lock` on the cash-fund row. Multi-tenancy is database-per-company with a runtime connection swap. The separate HRM app was merged in over 9 porting waves and 72+ endpoints, including consolidating three forked `worktable()` implementations — two of which computed overnight shifts incorrectly.",
    impact: [
    ["19", "domain modules"],
    ["698", "use cases"],
    ["5", "API surfaces"],
    ["608", "permission keys"],
    ["935", "tests"]],

    ai_vi: "Migration theo từng đợt (strangler): tôi viết spec cho từng domain — danh sách Action, DTO, policy, ràng buộc không sửa code cũ — rồi để Claude Code port controller cũ sang UseCase + Resource + test theo mẫu đã duyệt, mỗi đợt một pull request để review. AI cũng dùng để audit codebase cũ: quét ra `SysParameter::all()` copy-paste ở 22 controller và 3 bản `worktable()` bị fork, nhưng việc phát hiện 2 bản tính sai ca qua đêm và quyết định hợp nhất là của tôi. Test suite tăng từ 251 lên 935 nhờ AI sinh test draft từ spec, tôi kiểm tra lại từng assertion. Luồng tiền và tồn kho (lock, mutex) được viết và review tay 100%.",
    ai_en: "The migration ran in strangler waves: for each domain I wrote the spec — Actions, DTOs, policies, the hard no-change rule on legacy code — then had Claude Code port the old controllers into UseCases + Resources + tests against an approved template, one pull request per wave for review. AI also helped audit the legacy codebase, surfacing `SysParameter::all()` copy-pasted across 22 controllers and three forked `worktable()` implementations — but spotting that two of them computed overnight shifts wrong, and deciding how to merge them, was my call. The test suite grew from 251 to 935 with AI drafting tests from the spec and me verifying every assertion. Money-flow and stock code (locks, mutexes) was written and reviewed by hand, 100%.",
    decisions: [
    ["One Action, N surfaces", "One Action, N surfaces", "Thay vì 5 controller cho 5 vai trò, một UseCase phục vụ admin/thu ngân/phục vụ/bếp/core; surface chỉ khác prefix, middleware và policy. Sửa nghiệp vụ một chỗ.", "Instead of five controllers for five roles, one UseCase serves admin/cashier/staff/kitchen/core; surfaces differ only in prefix, middleware and policy. Business changes happen once."],
    ["Strangler với ràng buộc không sửa code cũ", "Strangler under a hard no-change rule", "Hệ cũ đang chạy production cho nhiều tenant. API v2 xây song song, không đụng route/schema cũ, client chuyển dần từng domain — có thể rollback bất kỳ lúc nào.", "The legacy system was live for many tenants. API v2 was built alongside it, never touching old routes or schema, so clients migrated domain by domain and could roll back at any time."],
    ["Single write-point cho tiền và tồn kho", "Single write-point for money and stock", "Mọi thay đổi quỹ/kho đi qua đúng một Action, bảo vệ bằng claim mutex, lockForUpdate và Cache::lock — chống double-apply khi nhiều thu ngân thao tác cùng lúc.", "Every cash-fund or stock mutation goes through exactly one Action, guarded by a claim mutex, lockForUpdate and Cache::lock — no double-apply when several cashiers act at once."]],

    shots: []
  }
},
{
  id: "safa",
  n: "03",
  title: "SAFA Booking",
  subtitle: "Nền tảng đặt lịch nghệ sĩ biểu diễn",
  subtitleEn: "Performer booking marketplace & admin portal",
  year: "2024",
  role: "Full-stack — Flutter performer app, Laravel API, admin dashboard",
  stack: ["Flutter", "Laravel", "Vue.js", "MySQL", "Stripe", "Firebase"],
  cover: null,
  accent: "#0369a1",
  tagline: "Kết nối nghệ sĩ và khách hàng. Booking, payment, quản lý sự kiện end-to-end.",
  detail: {
    problem_vi: "Ngành biểu diễn live thiếu một nền tảng booking chuyên nghiệp — khách hàng phải tìm nghệ sĩ qua mạng xã hội, không có thanh toán bảo đảm, không có lịch trình rõ ràng.",
    problem_en: "Live-music gigs lacked a professional booking layer — clients chased performers through DMs, with no escrow, no calendar source of truth.",
    solution_vi: "Một ecosystem 3-bên: User App (khách đặt lịch), Performer App (nghệ sĩ nhận show), Admin Dashboard (quản trị, doanh thu, dispute). Stripe escrow, real-time chat, lịch xung đột tự động.",
    solution_en: "A three-sided ecosystem: User app for booking, Performer app for gigs, Admin dashboard for operations. Stripe escrow, real-time chat, automatic conflict-detection on calendars.",
    impact: [
    ["3", "ứng dụng / apps"],
    ["Stripe", "escrow payment"],
    ["Realtime", "chat & calendar"],
    ["Flutter", "performer app"]],

    ai_vi: "Dự án đầu tiên tôi dùng Copilot trong editor cho boilerplate Laravel (migration, resource, validation) và màn hình Flutter lặp lại. Logic xung đột lịch và escrow viết tay.",
    ai_en: "First project where I used Copilot in-editor for Laravel boilerplate (migrations, resources, validation) and repetitive Flutter screens. Calendar-conflict and escrow logic were written by hand.",
    decisions: [
    ["Escrow thay vì thanh toán trực tiếp", "Escrow instead of direct payment", "Khách trả qua Stripe, tiền giữ lại đến khi show diễn ra — giải quyết nỗi lo bị bùng của cả hai bên.", "Clients pay via Stripe and funds are held until the gig happens — removing the no-show risk for both sides."],
    ["Lịch là nguồn sự thật duy nhất", "Calendar as single source of truth", "Mọi booking phải qua kiểm tra xung đột server-side trước khi xác nhận, không để nghệ sĩ nhận hai show cùng giờ.", "Every booking passes a server-side conflict check before confirmation, so a performer can never be double-booked."]],

    shots: [
    { src: "assets/safa-welcome-1.png", label: "Onboarding — Make it happen", tall: true },
    { src: "assets/safa-welcome-2.png", label: "Onboarding — Feel ya music", tall: true },
    { src: "assets/safa-welcome-3.png", label: "Onboarding — Find ya artist", tall: true },
    { src: "assets/safa-home.png", label: "Home — discover & search", tall: true },
    { src: "assets/safa-create-event.png", label: "Create event flow", tall: true },
    { src: "assets/safa-dashboard.png", label: "Admin dashboard — analytics, bookings, reviews", tall: false }]

  }
},
{
  id: "meinpoint",
  n: "04",
  title: "MeinPointOf.Sale",
  subtitle: "Hệ thống eCommerce & admin custom cho ngành in ấn POS",
  subtitleEn: "Custom eCommerce + admin platform for print & POS displays",
  year: "2025",
  role: "Full-stack — Laravel backend, business logic, admin panel, payment integration",
  stack: ["Laravel", "Vue.js", "MySQL", "Stripe", "PayPal", "Sofort"],
  cover: null,
  accent: "#4f46e5",
  tagline: "Online store cho sản phẩm in ấn tuỳ biến, admin panel mạnh, tích hợp đa cổng thanh toán.",
  detail: {
    problem_vi: "Ngành in ấn & POS display có quy trình đặt hàng phức tạp: mỗi sản phẩm có kích thước, vật liệu, in ấn, gia công riêng — dẫn đến hàng nghìn biến thể giá. Hệ thống cũ không quản lý nổi sản phẩm, đơn hàng, file in, refund, tracking và báo cáo trên một nền tảng.",
    problem_en: "Print & POS-display orders are inherently complex — every product has its own dimensions, material, print spec and finishing, producing thousands of price variants. The legacy stack couldn't unify products, orders, print files, refunds, tracking and reporting in one place.",
    solution_vi: "Một nền tảng Laravel đầy đủ với admin panel custom: quản lý sản phẩm, đơn hàng, khách hàng, nội dung, SEO, báo cáo và automation. Frontend có configurator theo kích thước, vật liệu, số lượng — preview 3D real-time. Tích hợp Stripe, PayPal, Sofort cho thanh toán; xử lý file in, hoá đơn, refund và tracking end-to-end.",
    solution_en: "A full Laravel platform with a custom admin: products, orders, customers, content, SEO, reporting and automation all unified. The storefront ships a dimension/material/quantity configurator with a real-time 3D preview. Stripe, PayPal and Sofort plug in for payment; print files, invoices, refunds and tracking are handled end-to-end.",
    impact: [
    ["10k+", "biến thể giá / price variants"],
    ["3", "cổng thanh toán / gateways"],
    ["1", "admin panel duy nhất"]],

    ai_vi: "Cursor dùng để sinh CRUD admin và form validation theo mẫu; công thức giá theo kích thước/vật liệu và luồng thanh toán 3 cổng được viết và test tay.",
    ai_en: "Cursor generated the admin CRUD and form validation from a template; the dimension/material pricing engine and the three-gateway payment flow were written and tested by hand.",
    decisions: [
    ["Tính giá theo rule thay vì lưu biến thể", "Rule-based pricing instead of stored variants", "10k+ tổ hợp không thể nhập tay. Giá tính từ bảng rule (kích thước × vật liệu × số lượng), cache theo tổ hợp.", "10k+ combinations can't be keyed in. Price is computed from a rule table (size × material × quantity) and cached per combination."],
    ["Cổng thanh toán sau một interface", "Gateways behind one interface", "Stripe, PayPal, Sofort cùng implement một PaymentGateway contract — thêm cổng mới không chạm vào checkout.", "Stripe, PayPal and Sofort implement one PaymentGateway contract — adding a gateway never touches checkout."]],

    shots: [
    { src: "assets/mpos-home.png", label: "Homepage — danh mục POS & Verpackung", tall: false },
    { src: "assets/mpos-configurator.png", label: "Configurator — kích thước, vật liệu, 3D preview", tall: false },
    { src: "assets/mpos-logo.png", label: "Brand logo — meinpointof.sale", tall: false }]

  }
},
{
  id: "unobiz",
  n: "05",
  title: "Unobiz Business Portal",
  subtitle: "Hệ thống quản trị đa module cho nhà phân phối B2B",
  subtitleEn: "Multi-module distributor management portal (B2B)",
  year: "2025",
  role: "Frontend lead — RBAC, Sales Order flow, i18n, real-time socket, Redux Toolkit",
  stack: ["React", "TypeScript", "Redux Toolkit", "redux-persist", "i18next", "Socket.IO", "Tailwind"],
  cover: null,
  accent: "#15803d",
  tagline: "Một portal gói trọn Product, RFQ, Inventory, Sale Orders, Employees, Customers, Receivable, Payment & Onboarding — phân quyền theo vai trò, đa ngôn ngữ, real-time.",
  detail: {
    problem_vi: "Nhà phân phối B2B vận hành trên nhiều phần mềm rời rạc: quản lý sản phẩm một nơi, đơn hàng một nơi, công nợ và nhân sự lại ở chỗ khác. Mỗi vai trò (sales, kho, kế toán, admin) cần quyền truy cập rất khác nhau, dễ rò rỉ thao tác. Quy trình tạo đơn dài, dữ liệu sản phẩm hàng nghìn dòng phải nhập tay, và thông báo trạng thái đơn luôn trễ.",
    problem_en: "B2B distributors run on a patchwork of disconnected tools — products here, orders there, AR and HR somewhere else. Each role (sales, warehouse, accounting, admin) needs a very different permission surface, which is hard to enforce cleanly. Order creation is multi-step, product catalogs run to thousands of rows that have to be keyed in manually, and order-status updates always arrive late.",
    solution_vi: "Một portal React + TypeScript hợp nhất 10 module: Product Management, RFQ, Inventory, Sale Orders, Employee Management, Customers, Settings, Receivable, Payment và Onboarding. Phân quyền RBAC tách logic khỏi UI qua hook usePermission, mỗi module/action có thể bật-tắt theo role. Luồng Sale Order đầy đủ — chọn khách, cart, giữ đơn, xoá item, nhiều trạng thái. Nhập sản phẩm hàng loạt qua Excel với template, validate, và file lỗi để đối soát. Onboarding có progress + điểm theo bước. Hạ tầng: Redux Toolkit + redux-persist giữ session, axios interceptor gắn auth/language/version và xử lý timeout, socket cập nhật đơn real-time, i18next EN/VI.",
    solution_en: "A unified React + TypeScript portal covering 10 modules — Product Management, RFQ, Inventory, Sale Orders, Employee Management, Customers, Settings, Receivable, Payment and Onboarding. RBAC is decoupled from the UI via a usePermission hook so every module/action toggles per role. The Sale Order flow is end-to-end — pick customer, cart, hold, remove items, multi-state. Bulk product import runs through Excel with template, validation and an error file for reconciliation. Onboarding ships a stepped progress + score system. Infra-wise: Redux Toolkit + redux-persist keep auth state, an axios interceptor attaches auth/language/version and handles session timeout, sockets push live order updates, and i18next powers EN/VI.",
    impact: [
    ["10", "modules trong 1 portal"],
    ["RBAC", "phân quyền theo module/action"],
    ["EN / VI", "i18n đầy đủ"],
    ["real-time", "order status qua socket"]],

    ai_vi: "Cursor + Copilot sinh type TypeScript từ API contract, Redux slice và bộ key i18n EN/VI cho 10 module. Hook usePermission, luồng Sale Order và import Excel do tôi thiết kế.",
    ai_en: "Cursor + Copilot generated TypeScript types from the API contract, Redux slices and the EN/VI i18n key sets across 10 modules. The usePermission hook, Sale Order flow and Excel import were my design.",
    decisions: [
    ["RBAC tách khỏi UI", "RBAC decoupled from the UI", "Một hook usePermission(module, action) thay vì if/else rải khắp component — thêm vai trò mới không cần sửa màn hình.", "One usePermission(module, action) hook instead of if/else scattered through components — new roles need no screen changes."],
    ["Import Excel kèm file lỗi", "Excel import with an error file", "Hàng nghìn dòng sản phẩm: validate từng dòng, trả về file chỉ chứa dòng lỗi và lý do để kế toán sửa rồi nộp lại.", "Thousands of product rows: validate each one and hand back a file with only the failing rows and reasons, so accounting fixes and resubmits."]],

    shots: [
    { src: "assets/unobiz-signin.png", label: "Sign In — branded portal entry", tall: false },
    { src: "assets/unobiz-sidebar.png", label: "Sidebar nav + RBAC — module bị disable khi không có quyền", tall: false }]

  }
},
{
  id: "storypop",
  n: "06",
  title: "Storypop",
  subtitle: "Shopify Video Commerce App — end-to-end SaaS",
  subtitleEn: "End-to-end Shopify video-commerce platform",
  year: "2025",
  role: "Full-stack — Reel library, widget builder, embed SDK, analytics, billing, realtime pipeline",
  stack: ["React", "Node.js", "Shopify API", "Stripe", "Socket.IO", "i18next", "OAuth"],
  cover: null,
  accent: "#be185d",
  tagline: "Reels/video-commerce cho Shopify merchants — import từ TikTok/Instagram, widget builder, embed SDK, analytics funnel, subscription billing và realtime pipeline.",
  detail: {
    problem_vi: "Shopify merchants muốn dùng video ngắn (reels) để bán hàng nhưng phải xé lẻ qua nhiều công cụ: kéo video từ TikTok/Instagram, upload thủ công, dựng playlist, embed lên storefront, đo conversion, rồi quản lý gói subscription. Không có một SaaS nào gói trọn từ ingest đến revenue.",
    problem_en: "Shopify merchants want to sell with short-form video (reels), but the workflow is splintered across tools — pulling clips from TikTok/Instagram, manual uploads, building playlists, embedding into the storefront, measuring conversion, then managing subscription billing. No single SaaS covers ingest → revenue.",
    solution_vi: "Một SaaS app end-to-end cho Shopify: (1) Reel Library đa nguồn — import TikTok/Instagram, upload thủ công, retry, xử lý video variants. (2) Widget Builder cho 4 loại widget (Playlist, Stories, Pops, Add-to-cart) với embed code generator + token để nhúng cross-site. (3) Customize Design preview desktop/mobile, style theo từng widget. (4) Analytics Dashboard — impressions, add-to-carts, orders, donations, funnel, filter theo date/device. (5) Product Management import/export. (6) Pricing & Subscription — Stripe webhook xử lý gói + coupon. (7) Auth đầy đủ — login, register, Google OAuth, OTP, reset password. (8) Realtime upload/processing pipeline qua socket. (9) i18n EN/DE/FR/JA + backend locale.",
    solution_en: "An end-to-end Shopify SaaS: (1) Multi-source Reel Library — TikTok/Instagram imports, manual upload, retry, variant handling. (2) Widget Builder covering Playlist, Stories, Pops and Add-to-cart with an embed-code generator + external token so widgets work cross-site. (3) Customize Design with desktop/mobile preview and per-widget styling. (4) Analytics Dashboard — impressions, add-to-carts, orders, donations, funnel conversion, filterable by date/device. (5) Product Management with import/export. (6) Pricing & Subscription with Stripe webhooks for plans + coupons. (7) Full auth — login, register, Google OAuth, OTP, password reset. (8) Realtime upload/processing pipeline via sockets. (9) i18n across EN/DE/FR/JA with backend locale.",
    impact: [
    ["4", "widget types"],
    ["4", "ngôn ngữ / locales"],
    ["TikTok + IG", "video import"],
    ["Stripe", "subscription billing"]],

    ai_vi: "Cursor dùng để dựng nhanh UI dashboard, bộ i18n 4 ngôn ngữ và tài liệu embed SDK. Pipeline xử lý video, token cross-site và Stripe webhook viết tay vì liên quan bảo mật và tiền.",
    ai_en: "Cursor sped up the dashboard UI, the 4-locale i18n set and the embed SDK docs. The video pipeline, cross-site token and Stripe webhooks were hand-written since they touch security and money.",
    decisions: [
    ["Embed SDK qua token thay vì iframe", "Token-based embed SDK instead of iframe", "Widget phải chạy trên storefront của merchant với style riêng; SDK + token public cho phép nhúng cross-site mà vẫn giới hạn domain.", "Widgets run on the merchant's storefront with its own styling; an SDK + public token allows cross-site embedding while still restricting by domain."],
    ["Xử lý video bất đồng bộ qua socket", "Async video processing over sockets", "Import từ TikTok/Instagram có thể mất phút; đẩy vào queue và báo tiến độ real-time thay vì chặn request.", "TikTok/Instagram imports can take minutes; they go into a queue with real-time progress instead of blocking the request."]],

    shots: [
    { src: "assets/storypop-home.png", label: "Home — analytics overview, funnel chart, donation history", tall: false },
    { src: "assets/storypop-videos.png", label: "Videos Library — TikTok/Instagram/Manual sources, retry upload", tall: false },
    { src: "assets/storypop-widgets.png", label: "Widget Builder — Playlist, Stories, Video Pops, Add-to-cart", tall: false },
    { src: "assets/storypop-design.png", label: "Customize Design — per-widget styling với desktop/mobile preview", tall: false },
    { src: "assets/storypop-product.png", label: "Product Management — import/export, filter, pagination", tall: false },
    { src: "assets/storypop-settings.png", label: "Settings — translations, billing, developer tools", tall: false }]

  }
}];


const EXPERIENCE = [
{
  years: "02/2026 — Present",
  role_vi: "Flutter Mobile & Full-stack Developer", role_en: "Flutter Mobile & Full-stack Developer",
  company: "Nasys",
  note_vi: "Xây hệ POS/ERP ngành F&B: Flutter client ~777K dòng (Clean Architecture, Riverpod, ESC/POS, phần cứng) và Laravel modular monolith 19 domain. Học Flutter từ đầu, ship production trong 6 tháng. Quy trình AI-assisted với Claude Code: chuẩn kiến trúc làm context cho agent, AI scaffold, tôi review.",
  note_en: "Building an F&B POS/ERP: a ~777K-line Flutter client (Clean Architecture, Riverpod, ESC/POS, hardware) and a 19-domain Laravel modular monolith. Picked up Flutter from scratch and shipped to production within 6 months. AI-assisted workflow with Claude Code: the architecture standard doubles as agent context, AI scaffolds, I review."
},
{
  years: "01/2025 — 01/2026",
  role_vi: "Full-stack Web Developer", role_en: "Full-stack Web Developer",
  company: "Appif AI (Contract)",
  note_vi: "Ship Storypop, Unobiz Portal và MeinPointOf — React, Vue, Laravel, Node.js, WebGL. Dùng Cursor/Copilot cho boilerplate, type và i18n.",
  note_en: "Shipped Storypop, Unobiz Portal and MeinPointOf — React, Vue, Laravel, Node.js, WebGL. Cursor/Copilot for boilerplate, types and i18n."
},
{
  years: "04/2023 — 02/2025",
  role_vi: "Full-stack Web Developer", role_en: "Full-stack Web Developer",
  company: "Eye Design Sydney",
  note_vi: "WordPress, Shopify, landing page, CRM ngành làm đẹp, Booking WebApp. Quản trị host/domain, thiết kế responsive.",
  note_en: "WordPress, Shopify, landing pages, beauty-industry CRM, Booking WebApp. Host/domain admin, responsive design."
},
{
  years: "09/2022 — 03/2023",
  role_vi: "Web Developer", role_en: "Web Developer",
  company: "Công ty TNHH TM DV Công Nghệ Trí Lực",
  note_vi: "Quản trị database, thiết kế website, logic ad-serving, landing page.",
  note_en: "Database administration, website design, ad-serving platform logic, landing page projects."
},
{
  years: "2018 — 2022",
  role_vi: "Cử nhân Hệ thống Thông tin", role_en: "B.S. Information Systems",
  company: "Đại học Công nghiệp TP.HCM",
  note_vi: "Tốt nghiệp ngành Hệ thống Thông tin.",
  note_en: "Graduated in Information Systems."
}];


const SKILLS = {
  Mobile: ["Flutter", "Dart", "Riverpod (code-gen)", "Clean Architecture", "Retrofit / Dio", "AutoRoute", "ESC/POS printing", "Hardware: BLE / USB / serial", "Socket.IO / FCM", "flutter_test"],
  "AI-assisted engineering": ["Claude Code", "Cursor / Copilot", "Agent context docs (CLAUDE.md / .cursorrules)", "Spec-driven prompting", "AI code review", "AI test generation"],
  Backend: ["PHP", "Laravel", "Node.js", "REST API", "MySQL", "DDD / Modular monolith", "Multi-tenant", "PHPUnit"],
  Frontend: ["React.js", "Vue.js", "TypeScript", "Redux Toolkit", "Tailwind", "WebGL / Three.js"],
  "Realtime & Integrations": ["Socket.IO", "Firebase / FCM", "Stripe / VNPay / VietQR", "Webhooks", "i18n", "Shopify / WordPress"],
  "Tools & Ops": ["Git", "CI (GitHub Actions)", "Host / Domain", "Database admin", "Figma"],
  Soft: ["Design Thinking", "Problem-solving", "Fast learner", "Communication"]
};

const AI_WORKFLOW = {
  tools: [
  { name: "Claude Code", use_vi: "Agent CLI cho refactor lớn, migration theo đợt, sinh test và tài liệu", use_en: "Agentic CLI for large refactors, wave migrations, tests and docs" },
  { name: "Cursor / Copilot", use_vi: "Autocomplete và chat trong editor cho boilerplate, type, i18n", use_en: "In-editor autocomplete and chat for boilerplate, types, i18n" },
  { name: "Claude", use_vi: "Tra cứu spec (ESC/POS, Stripe, Shopify), rubber-duck khi debug", use_en: "Spec lookup (ESC/POS, Stripe, Shopify), rubber-duck debugging" }],

  principles: [
  {
    title_vi: "Context trước, prompt sau",
    title_en: "Context first, prompt second",
    body_vi: "Luật kiến trúc được viết thành tài liệu (1.236 dòng ở Order POS) và dùng làm CLAUDE.md / .cursorrules. Agent đọc cùng một chuẩn với team, nên code sinh ra đúng layer, đúng tên, đúng mẫu.",
    body_en: "Architecture rules live in a written standard (1,236 lines for Order POS) that doubles as CLAUDE.md / .cursorrules. The agent reads the same standard as the team, so generated code lands in the right layer with the right names and patterns."
  },
  {
    title_vi: "Spec → scaffold → review",
    title_en: "Spec → scaffold → review",
    body_vi: "Tôi viết spec cho từng feature/domain (Action, DTO, policy, ràng buộc). Agent scaffold data/domain/presentation hoặc port controller cũ theo mẫu. Mỗi đợt là một pull request, tôi đọc từng diff trước khi merge.",
    body_en: "I write the spec per feature/domain (Actions, DTOs, policies, constraints). The agent scaffolds data/domain/presentation or ports legacy controllers against a template. Each wave is a pull request and I read every diff before merging."
  },
  {
    title_vi: "AI audit, người quyết định",
    title_en: "AI audits, humans decide",
    body_vi: "Dùng agent quét codebase cũ để tìm trùng lặp và fork — SysParameter::all() ở 22 controller, 3 bản worktable(). Phát hiện 2 bản tính sai ca qua đêm và chọn cách hợp nhất là việc của tôi.",
    body_en: "Agents sweep the legacy codebase for duplication and forks — SysParameter::all() in 22 controllers, three worktable() copies. Spotting that two of them computed overnight shifts wrong, and choosing how to merge, was mine."
  },
  {
    title_vi: "Test draft bằng AI, assertion bằng tay",
    title_en: "AI drafts tests, I own the assertions",
    body_vi: "OrderTable đi từ 251 lên 935 test: AI sinh test từ spec, tôi kiểm từng assertion và thêm case biên cho tiền, kho, ca làm việc.",
    body_en: "OrderTable went from 251 to 935 tests: AI drafts from the spec, I verify every assertion and add edge cases for money, stock and shifts."
  },
  {
    title_vi: "Vùng không uỷ quyền cho AI",
    title_en: "Zones AI doesn't own",
    body_vi: "Luồng tiền, tồn kho, lock/mutex, driver máy in và phần cứng: viết tay, test trên thiết bị thật, review tay 100%. AI chỉ tra spec và sinh test biên.",
    body_en: "Money flow, stock, locks/mutexes, printer drivers and hardware: hand-written, tested on real devices, 100% human-reviewed. AI only looks up specs and drafts edge-case tests."
  }]
};


/* ---------- HELPERS ---------- */
const cls = (...xs) => xs.filter(Boolean).join(" ");
const LangCtx = React.createContext("vi");
const useLang = () => React.useContext(LangCtx);
const t = (lang, vi, en) => lang === "en" ? en : vi;

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join(",")]);
  return active;
}

function smooth(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ---------- COMPONENTS ---------- */
function Nav({ dark, setDark, active, lang, setLang }) {
  const items = lang === "en" ? [
  ["work", "Work"], ["about", "About"], ["experience", "Experience"], ["skills", "Stack"], ["ai", "AI workflow"], ["contact", "Contact"]] :
  [
  ["work", "Dự án"], ["about", "Giới thiệu"], ["experience", "Kinh nghiệm"], ["skills", "Kỹ năng"], ["ai", "AI workflow"], ["contact", "Liên hệ"]];

  return (
    <nav className="nav">
      <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <span className="logo-mark">T</span>
        <span className="logo-text">{PROFILE.name}<em>— portfolio, 2026</em></span>
      </button>
      <div className="nav-items">
        {items.map(([id, label]) =>
        <button key={id} onClick={() => smooth(id)} className={cls("nav-link", active === id && "is-active")}>
            <span className="nav-dot" />{label}
          </button>
        )}
      </div>
      <div className="nav-tools">
        <button className="lang-toggle" onClick={() => setLang(lang === "vi" ? "en" : "vi")} aria-label="Toggle language">
          <span className={cls("lt-opt", lang === "vi" && "is-active")}>VI</span>
          <span className="lt-sep">/</span>
          <span className={cls("lt-opt", lang === "en" && "is-active")}>EN</span>
        </button>
        <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
          <span className="theme-icon">{dark ? "☼" : "☾"}</span>
          <span className="theme-label">{dark ? "Light" : "Dark"}</span>
        </button>
      </div>
    </nav>);

}

function Hero() {
  const lang = useLang();
  return (
    <header id="top" className="hero">
      <div className="hero-meta">
        <span className="mono small">Index № 01 — {t(lang, "Xin chào", "Hello")}</span>
        <span className="mono small">{PROFILE.location}</span>
      </div>
      <h1 className="display">
        {lang === "en" ?
        <><em>Flutter</em> mobile developer<br />building <em>POS/ERP</em> for F&B —<br />and the backend behind it.</> :

        <>Lập trình viên mobile <em>Flutter</em><br />xây hệ <em>POS/ERP</em> ngành F&B —<br />và cả backend phía sau.</>
        }
      </h1>
      <p className="hero-sub">
        {t(lang, PROFILE.bio_vi, PROFILE.bio_en)}
      </p>
      <div className="hero-cta">
        <button onClick={() => smooth("work")} className="btn btn-primary">{t(lang, "Xem dự án", "View work")} →</button>
        <button onClick={() => smooth("contact")} className="btn btn-ghost">{t(lang, "Liên hệ", "Get in touch")}</button>
      </div>
      <div className="hero-stats">
        <div className="stat"><div className="stat-n">{PROFILE.years}</div><div className="stat-l">{t(lang, "năm kinh nghiệm", "years building")}</div></div>
        <div className="stat"><div className="stat-n">{PROFILE.shipped}</div><div className="stat-l">{t(lang, "sản phẩm production", "production products")}</div></div>
        <div className="stat"><div className="stat-n">{PROFILE.companies}</div><div className="stat-l">{t(lang, "công ty đã làm việc", "companies / clients")}</div></div>
      </div>
    </header>);

}

function SectionHead({ n, title, subtitle, filed }) {
  const lang = useLang();
  return (
    <div className="section-head">
      <div className="section-n mono small">№ {n}</div>
      <h2 className="section-title">{title}</h2>
      {subtitle && <div className="section-sub"><em>{subtitle}</em></div>}
      {filed && <div className="mono xs filed">{t(lang, "Lưu tại", "Filed under")} — {filed}</div>}
    </div>);

}

function ProjectCard({ p, onOpen }) {
  const lang = useLang();
  return (
    <article className="proj-card" onClick={() => onOpen(p)}>
      <div className="proj-cover" style={{ background: p.cover ? `var(--surface)` : `linear-gradient(135deg, ${p.accent}10, ${p.accent}25), var(--surface)` }}>
        {p.cover ?
        <img src={p.cover} alt={p.title} style={{ width: "600px" }} /> :

        <PlaceholderCover accent={p.accent} title={p.title} />
        }
        <div className="proj-hover">
          <span className="mono small">→ {t(lang, "Xem case study", "Open case study")}</span>
        </div>
      </div>
      <div className="proj-meta">
        <div className="proj-row">
          <span className="mono xs">{p.n} · {p.year}</span>
          <span className="mono xs">{p.stack.slice(0, 3).join(" / ")}</span>
        </div>
        <h3 className="proj-title">{p.title}</h3>
        <div className="proj-sub">
          <span>{lang === "en" ? p.subtitleEn : p.subtitle}</span>
        </div>
      </div>
    </article>);

}

function PlaceholderCover({ accent, title }) {
  // Subtly-striped placeholder w/ monospace explainer.
  // Pattern ids must be valid CSS selectors — slugify, or url(#…) silently fails.
  const pid = `s-${title.replace(/[^a-zA-Z0-9]+/g, "-")}`;
  const stripes =
  <svg width="100%" height="100%" viewBox="0 0 400 280" preserveAspectRatio="none">
      <defs>
        <pattern id={pid} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="14" stroke={accent} strokeOpacity="0.10" strokeWidth="6" />
        </pattern>
      </defs>
      <rect width="400" height="280" fill={`url(#${pid})`} />
    </svg>;

  return (
    <div className="ph-cover">
      {stripes}
      <div className="ph-label mono xs">[ product shot ]</div>
      <div className="ph-title" style={{ color: accent }}>{title}</div>
    </div>);

}

function Work({ onOpen }) {
  const lang = useLang();
  return (
    <section id="work" className="section">
      <SectionHead n="02" title={t(lang, "Dự án tiêu biểu", "Selected work")} subtitle={t(lang, "Sáu dự án, bốn năm — mobile trước, web sau.", "Six projects, four years — mobile first, web behind it.")} filed={t(lang, "Flutter POS/ERP, Booking, eCommerce, SaaS", "Flutter POS/ERP, Booking, eCommerce, SaaS")} />
      <div className="proj-grid">
        {PROJECTS.map((p) => <ProjectCard key={p.id} p={p} onOpen={onOpen} />)}
      </div>
      <div className="footnote mono xs">
        † {t(lang, "Bấm vào card để xem case study đầy đủ.", "Click any card to read the full case study.")}
      </div>
    </section>);

}

function About() {
  const lang = useLang();
  const principles = lang === "en" ? [
  "Read the legacy code and measure before touching anything — the 7,388-line controller tells you where the pain is.",
  "Write the rules down. A standard the team and the AI agent both read beats a review comment nobody remembers.",
  "Migrate in waves you can roll back. Strangler over rewrite, one domain per pull request.",
  "Let AI scaffold, never let it decide. I own the spec, the diff review and anything touching money or hardware.",
  "Test what would keep you up at night: cash flow, stock, overnight shifts, a printer that jams mid-ticket."] :
  [
  "Đọc code cũ và đo trước khi đụng vào — controller 7.388 dòng tự nói ra chỗ nào đang đau.",
  "Viết luật ra giấy. Một chuẩn mà cả team lẫn AI agent cùng đọc tốt hơn một comment review chẳng ai nhớ.",
  "Migrate theo đợt có thể rollback. Strangler thay vì viết lại, mỗi domain một pull request.",
  "Để AI scaffold, không để AI quyết định. Tôi own spec, review diff và mọi thứ chạm vào tiền hay phần cứng.",
  "Test cái mà nếu sai sẽ mất ngủ: luồng tiền, tồn kho, ca qua đêm, máy in kẹt giữa phiếu."];

  return (
    <section id="about" className="section">
      <SectionHead n="03" title={t(lang, "Giới thiệu", "About")} subtitle={t(lang, "Vài dòng về tôi và cách tôi giải quyết vấn đề.", "A short note about who I am, and how I solve problems.")} filed={t(lang, "Tiểu sử", "Biography")} />
      <div className="about-grid">
        <div className="about-portrait">
          <PortraitPlaceholder />
          <div className="mono xs muted center">[ portrait — drop a photo here ]</div>
        </div>
        <div className="about-body">
          {lang === "en" ?
          <>
              <p className="drop">
                <span className="dropcap">I</span>'m Thong — a Saigon-based <em>Flutter</em> mobile developer with a full-stack past. I graduated in Information Systems from Industrial University of Ho Chi Minh City (2022), spent four years shipping web products in <em>Laravel + Vue + React + Node</em> across an agency, a design studio and a contract at Appif AI, and since early 2026 have been at Nasys building an F&B POS/ERP in Flutter — plus the Laravel backend it talks to.
              </p>
              <p>
                I believe in <em>clean architecture</em>, in code you can still read six months later, and in using AI agents the way you'd use a strong junior: give them the standard, give them the spec, read every line they hand back. A good product is a <em>shipped</em> product, not a perfect one in your head.
              </p>
            </> :

          <>
              <p className="drop">
                <span className="dropcap">T</span>ôi là Trần Ngọc Minh Thông, lập trình viên mobile <em>Flutter</em> với nền tảng full-stack, sống tại Hồ Chí Minh. Tốt nghiệp ngành Hệ thống Thông tin (Đại học Công nghiệp TP.HCM, 2022), tôi có bốn năm ship sản phẩm web trong stack <em>Laravel + Vue + React + Node</em> qua agency, design studio và contract cho Appif AI; từ đầu 2026 tôi ở Nasys xây POS/ERP ngành F&B bằng Flutter — kiêm luôn Laravel backend phía sau.
              </p>
              <p>
                Tôi tin vào <em>clean architecture</em>, vào việc viết code để 6 tháng sau mình còn đọc được, và vào cách dùng AI agent như một junior giỏi: đưa chuẩn, đưa spec, rồi đọc từng dòng nó trả về. Một sản phẩm tốt là sản phẩm <em>được ship</em>, không phải sản phẩm hoàn hảo trong đầu.
              </p>
            </>
          }
          <div className="mono xs muted about-list-head">{t(lang, "Cách tôi giải quyết vấn đề", "How I solve problems")}</div>
          <ul className="about-list">
            {principles.map((p, i) =>
            <li key={i}><span className="mono xs">{String(i + 1).padStart(3, "0")} —</span> {p}</li>
            )}
          </ul>
        </div>
      </div>
    </section>);

}

function PortraitPlaceholder() {
  return (
  <img src="assets/me.jpeg" alt="Portrait" style={{ height: "490.422px" }} />);
}

function Experience() {
  const lang = useLang();
  return (
    <section id="experience" className="section">
      <SectionHead n="04" title={t(lang, "Kinh nghiệm", "Experience")} subtitle={t(lang, "Nơi tôi đã dành thời gian.", "Where I've spent my hours.")} filed={t(lang, "Hồ sơ", "Curriculum vitae")} />
      <ol className="timeline">
        {EXPERIENCE.map((e, i) =>
        <li key={i} className="t-row">
            <div className="t-year mono small">{e.years}</div>
            <div className="t-body">
              <div className="t-role">{lang === "en" ? e.role_en : e.role_vi}<span className="muted"> — {e.company}</span></div>
              <div className="t-note muted"><em>{lang === "en" ? e.note_en : e.note_vi}</em></div>
            </div>
          </li>
        )}
      </ol>
    </section>);

}

function Skills() {
  const lang = useLang();
  return (
    <section id="skills" className="section">
      <SectionHead n="05" title={t(lang, "Công nghệ", "Stack")} subtitle={t(lang, "Những công cụ tôi dùng hằng ngày.", "Tools I reach for first.")} filed={t(lang, "Dùng hằng ngày", "Daily drivers")} />
      <div className="skill-grid">
        {Object.entries(SKILLS).map(([cat, items]) =>
        <div key={cat} className="skill-col">
            <div className="mono xs muted">{cat}</div>
            <ul className="skill-list">
              {items.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        )}
      </div>
    </section>);

}

function AIEngineering() {
  const lang = useLang();
  return (
    <section id="ai" className="section">
      <SectionHead n="06" title={t(lang, "AI-assisted engineering", "AI-assisted engineering")} subtitle={t(lang, "AI draft, tôi thiết kế và review.", "AI drafts. I design and review.")} filed={t(lang, "Quy trình làm việc", "Workflow")} />
      <div className="ai-grid">
        <div className="ai-card">
          <div className="mono xs muted">{t(lang, "Công cụ hằng ngày", "Daily tools")}</div>
          <ul className="ai-tool-list">
            {AI_WORKFLOW.tools.map((tool) =>
            <li key={tool.name}>
                <strong>{tool.name}</strong>
                <span className="muted">{lang === "en" ? tool.use_en : tool.use_vi}</span>
              </li>
            )}
          </ul>
          <p className="ai-note muted">
            {t(lang,
            "Mọi diff do AI sinh ra đều qua tay tôi trước khi merge. Tôi coi agent là một junior giỏi: cần chuẩn, cần spec, và cần người đọc lại.",
            "Every AI-generated diff goes through me before merge. I treat the agent as a strong junior: it needs a standard, a spec, and someone who reads its work.")}
          </p>
        </div>
        <ol className="ai-principles">
          {AI_WORKFLOW.principles.map((p, i) =>
          <li key={i}>
              <div className="mono xs muted">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="ai-p-title">{lang === "en" ? p.title_en : p.title_vi}</div>
                <p className="ai-p-body">{lang === "en" ? p.body_en : p.body_vi}</p>
              </div>
            </li>
          )}
        </ol>
      </div>
    </section>);

}

function Contact() {
  const lang = useLang();
  return (
    <section id="contact" className="section section-contact">
      <SectionHead n="07" title={t(lang, "Liên hệ", "Get in touch")} subtitle={t(lang, "Đang mở cho vị trí Flutter / Mobile và Full-stack.", "Open for Flutter / mobile and full-stack roles.")} filed={t(lang, "Liên hệ", "Contact")} />
      <div className="contact-grid">
        <div className="contact-main">
          <h3 className="display sm">
            {t(lang, "Có một ý tưởng?", "Got an idea?")}<br /><em>{t(lang, "Cùng xây nhé.", "Let's build it.")}</em>
          </h3>
          <a href={`mailto:${PROFILE.email}`} className="email-big">{PROFILE.email}</a>
          <div className="contact-phone mono small">{PROFILE.phone} · {PROFILE.location}</div>
        </div>
          <div className="contact-links">
          <div className="mono xs muted">{t(lang, "Tìm tôi ở", "Find me on")}</div>
          <a href={PROFILE.github} className="contact-link">GitHub<span>→</span></a>
          <a href={PROFILE.linkedin} className="contact-link">LinkedIn<span>→</span></a>
          <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="contact-link">{PROFILE.phone}<span>↳</span></a>
          <a href="cv.html" className="contact-link">{t(lang, "Xem CV online", "View CV online")}<span>→</span></a>
          <a href="assets/TranNgocMinhThong-CV-EN.pdf" download className="contact-link">{t(lang, "Tải CV (EN)", "Download CV (EN)")}<span>↓</span></a>
          <a href="assets/TranNgocMinhThong-CV-VI.pdf" download className="contact-link">{t(lang, "Tải CV (VI)", "Download CV (VI)")}<span>↓</span></a>
        </div>
      </div>
      <footer className="footer mono xs">
        <div>© 2026 {PROFILE.name}. {t(lang, "Thiết kế & xây tại", "Designed & built in")} {PROFILE.locationShort}.</div>
        <div>{t(lang, "Cập nhật —", "Last updated —")} October 2026 · Set in Geist & JetBrains Mono</div>
      </footer>
    </section>);

}

/* ---------- CASE STUDY MODAL ---------- */
function CaseModal({ project, onClose }) {
  const lang = useLang();
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;
  const d = project.detail;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-inner">
          <div className="case-head">
            <div className="mono small muted">Case study № {project.n} — {project.year}</div>
            <h2 className="display sm">{project.title}</h2>
            <div className="case-sub">
              <span>{lang === "en" ? project.subtitleEn : project.subtitle}</span>
            </div>
            <div className="case-meta">
              <div><span className="mono xs muted">{t(lang, "Vai trò", "Role")}</span><div>{project.role}</div></div>
              <div><span className="mono xs muted">{t(lang, "Năm", "Year")}</span><div>{project.year}</div></div>
              <div><span className="mono xs muted">Stack</span><div>{project.stack.join(" · ")}</div></div>
            </div>
          </div>

          {d ?
          <>
              <div className="case-block">
                <div className="case-block-l mono small">{t(lang, "Vấn đề", "Problem")}</div>
                <div className="case-block-r">
                  <p>{lang === "en" ? d.problem_en : d.problem_vi}</p>
                </div>
              </div>

              <div className="case-block">
                <div className="case-block-l mono small">{t(lang, "Giải pháp", "Solution")}</div>
                <div className="case-block-r">
                  <p>{lang === "en" ? d.solution_en : d.solution_vi}</p>
                </div>
              </div>

              {d.decisions && d.decisions.length > 0 &&
            <div className="case-block">
                <div className="case-block-l mono small">{t(lang, "Quyết định kỹ thuật", "Key decisions")}</div>
                <div className="case-block-r">
                  <ol className="decisions">
                    {d.decisions.map(([tv, te, wv, we], i) =>
                  <li key={i}>
                        <div className="decision-title">{lang === "en" ? te : tv}</div>
                        <p className="muted">{lang === "en" ? we : wv}</p>
                      </li>
                  )}
                  </ol>
                </div>
              </div>
            }

              {d.ai_vi &&
            <div className="case-block">
                <div className="case-block-l mono small">{t(lang, "AI trong dự án", "How AI was used")}</div>
                <div className="case-block-r">
                  <p>{lang === "en" ? d.ai_en : d.ai_vi}</p>
                </div>
              </div>
            }

              {d.impact &&
            <div className="case-impact">
                  {d.impact.map(([n, l], i) =>
              <div key={i} className="impact"><div className="impact-n">{n}</div><div className="impact-l mono xs">{l}</div></div>
              )}
                </div>
            }

              {d.shots && d.shots.length > 0 &&
            <div className="case-block">
                <div className="case-block-l mono small">{t(lang, "Màn hình chọn lọc", "Selected screens")}</div>
                <div className="case-shots">
                  {d.shots.map((s, i) =>
                <figure key={i} className={cls("shot", s.tall ? "shot-tall" : "shot-wide")}>
                      <img src={s.src} alt={s.label} style={{ height: "490.422px" }} />
                      <figcaption className="mono xs muted">{`${String(i + 1).padStart(2, "0")} — ${s.label}`}</figcaption>
                    </figure>
                )}
                </div>
              </div>
            }
            </> :

          <div className="case-block">
              <div className="case-block-l mono small">{t(lang, "Giới thiệu", "About")}</div>
              <div className="case-block-r">
                <p>{project.tagline}</p>
                <p className="muted"><em>{t(lang, "Case study chi tiết có sẵn khi yêu cầu — liên hệ qua mục Contact.", "Detailed case study available on request — get in touch via the contact section.")}</em></p>
              </div>
            </div>
          }

          <div className="case-foot mono xs muted">
            {t(lang, "← / → điều hướng · Esc để đóng", "← / → arrow keys to navigate · Esc to close")}
          </div>
        </div>
      </div>
    </div>);

}

/* ---------- ROOT ---------- */
function App() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(null);
  const active = useScrollSpy(["top", "work", "about", "experience", "skills", "ai", "contact"]);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  useEffect(() => {
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  return (
    <LangCtx.Provider value={lang}>
      <div className="app">
        <Nav dark={dark} setDark={setDark} active={active} lang={lang} setLang={setLang} />
        <main>
          <Hero />
          <Work onOpen={setOpen} />
          <About />
          <Experience />
          <Skills />
          <AIEngineering />
          <Contact />
        </main>
        {open && <CaseModal project={open} onClose={() => setOpen(null)} />}
      </div>
    </LangCtx.Provider>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);