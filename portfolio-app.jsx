/* Portfolio app — Swiss editorial + nostalgic indigo */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- DATA ---------- */
const PROFILE = {
  name: "Trần Ngọc Minh Thông",
  nameInitial: "T",
  role: "Full-stack Web Developer",
  roleEn: "Building product end-to-end",
  location: "275 Quang Trung, Gò Vấp, HCM",
  locationShort: "Hồ Chí Minh, Việt Nam",
  email: "tranthng207@icloud.com",
  phone: "0394 097 349",
  github: "https://github.com/TranNgocMinhThong",
  linkedin: "https://www.linkedin.com/in/thong-tran-572488319/",
  bio_vi: "Tôi là Full-stack Developer với hơn 4 năm kinh nghiệm web (Laravel, Vue, React, Node). 6 tháng gần đây tôi chuyển sang mảng mobile tại Nasys và đang xây hệ POS/ERP cho ngành F&B — Flutter app ~777K dòng cùng Laravel modular monolith 19 domain, own cả hai đầu.",
  bio_en: "Full-stack developer with 4+ years on the web (Laravel, Vue, React, Node). Over the last 6 months I moved into mobile at Nasys, building an F&B POS/ERP end-to-end — a ~777K-line Flutter client alongside a 19-domain Laravel modular monolith.",
  years: "4+",
  shipped: "15+"
};

const PROJECTS = [
{
  id: "orderpos",
  n: "01",
  title: "Order POS",
  subtitle: "Ứng dụng POS/ERP cho nhà hàng — Flutter, đa nền tảng",
  subtitleEn: "Restaurant POS/ERP client — Flutter, multi-platform",
  year: "2026",
  role: "Full-stack & Mobile — Clean Architecture, hệ thống in ESC/POS, tích hợp phần cứng",
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

    shots: []
  }
},
{
  id: "ordertable",
  n: "02",
  title: "OrderTable v2",
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
  role: "Full-stack — Architecture, API, Mobile UI",
  stack: ["Laravel", "Vue.js", "Flutter", "MySQL", "Stripe", "Firebase"],
  cover: null,
  accent: "#0369a1",
  tagline: "Kết nối nghệ sĩ và khách hàng. Booking, payment, quản lý sự kiện end-to-end.",
  detail: {
    problem_vi: "Ngành biểu diễn live thiếu một nền tảng booking chuyên nghiệp — khách hàng phải tìm nghệ sĩ qua mạng xã hội, không có thanh toán bảo đảm, không có lịch trình rõ ràng.",
    problem_en: "Live-music gigs lacked a professional booking layer — clients chased performers through DMs, with no escrow, no calendar source of truth.",
    solution_vi: "Một ecosystem 3-bên: User App (khách đặt lịch), Performer App (nghệ sĩ nhận show), Admin Dashboard (quản trị, doanh thu, dispute). Stripe escrow, real-time chat, lịch xung đột tự động.",
    solution_en: "A three-sided ecosystem: User app for booking, Performer app for gigs, Admin dashboard for operations. Stripe escrow, real-time chat, automatic conflict-detection on calendars.",
    impact: [
    ["1.8k+", "requests/tháng"],
    ["44%", "booking conversion"],
    ["4.7★", "rating trung bình"]],

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
  role_vi: "Full-stack & Mobile Developer", role_en: "Full-stack & Mobile Developer",
  company: "Nasys",
  note_vi: "Xây hệ POS/ERP cho ngành F&B: Flutter client (Clean Architecture, Riverpod, ESC/POS) và Laravel modular monolith 19 domain. Chuyển sang Flutter từ đầu và ship production trong 6 tháng.",
  note_en: "Building an F&B POS/ERP: a Flutter client (Clean Architecture, Riverpod, ESC/POS) and a 19-domain Laravel modular monolith. Picked up Flutter from scratch and shipped to production within 6 months."
},
{
  years: "01/2025 — 01/2026",
  role_vi: "Full-stack Web Developer", role_en: "Full-stack Web Developer",
  company: "Appif AI (Contract)",
  note_vi: "Ship Storypop, Unobiz Portal và MeinPointOf — React, Vue, Laravel, Node.js, WebGL.",
  note_en: "Shipped Storypop, Unobiz Portal and MeinPointOf — React, Vue, Laravel, Node.js, WebGL."
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
  Backend: ["PHP", "Laravel", "Node.js", "REST API", "MySQL", "DDD / Modular monolith", "Multi-tenant"],
  Mobile: ["Flutter", "Dart", "Riverpod", "Clean Architecture", "Retrofit / Dio", "ESC/POS printing"],
  Frontend: ["Vue.js", "React.js", "TypeScript", "HTML / CSS", "WebGL", "Responsive"],
  "Realtime & Integrations": ["Socket.IO", "Firebase / FCM", "Stripe / VNPay", "Webhooks", "i18n"],
  CMS: ["WordPress", "Shopify", "Landing pages"],
  "Tools & Ops": ["Git", "SVN", "PHPUnit", "Host / Domain", "Database admin"],
  Soft: ["Design Thinking", "Problem-solving", "Fast learner", "Communication"]
};

const WRITING = [
{ date: "Mar 2025", title: "Xây 3D product viewer với Three.js + Vue.js", titleEn: "Building a 3D product viewer with Three.js and Vue", read: "9 min" },
{ date: "Jan 2025", title: "React component có thể nhúng — đóng gói thư viện đúng cách", titleEn: "Embeddable React components — packaging a library right", read: "7 min" },
{ date: "Nov 2024", title: "Booking WebApp với Laravel: xung đột lịch và escrow payment", titleEn: "Booking webapps in Laravel: conflict-detection and escrow", read: "8 min" }];


const TESTIMONIALS = [
{
  vi: "Thông nắm cả product lẫn kỹ thuật, đẩy được những quyết định khó. Chúng tôi launch sớm hơn kế hoạch.",
  en: "Thong owns both product and engineering decisions, including the hard ones. We launched ahead of schedule.",
  author: "Linh T.", role: "Founder, SAFA Music"
},
{
  vi: "Code sạch, responsive tốt, ship đúng deadline. Hiếm.",
  en: "Clean code, responsive, ships on time. A rare combo.",
  author: "Marcus K.", role: "Lead, Eye Design Sydney"
}];


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
  ["work", "Work"], ["about", "About"], ["experience", "Experience"], ["skills", "Stack"], ["writing", "Writing"], ["contact", "Contact"]] :
  [
  ["work", "Dự án"], ["about", "Giới thiệu"], ["experience", "Kinh nghiệm"], ["skills", "Kỹ năng"], ["writing", "Bài viết"], ["contact", "Liên hệ"]];

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
        <>Full-stack developer<br />shipping <em>POS/ERP</em>, booking<br />& <em>eCommerce</em> products.</> :

        <>Lập trình viên <em>full-stack</em><br />xây hệ <em>POS/ERP</em>, booking<br />& sản phẩm <em>eCommerce</em>.</>
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
        <div className="stat"><div className="stat-n">{PROFILE.shipped}</div><div className="stat-l">{t(lang, "sản phẩm đã ship", "shipped products")}</div></div>
        <div className="stat"><div className="stat-n">3</div><div className="stat-l">{t(lang, "công ty đã làm việc", "companies / clients")}</div></div>
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
      <SectionHead n="02" title={t(lang, "Dự án tiêu biểu", "Selected work")} subtitle={t(lang, "Sáu dự án, bốn năm", "Six projects, four years")} filed={t(lang, "POS/ERP, Booking, eCommerce, SaaS", "POS/ERP, Booking, eCommerce, SaaS")} />
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
  "Database first. Schema is destiny.",
  "A good abstraction is one you don't need to write.",
  "Test what would keep you up at night if it broke.",
  "Ship early. Measure. Fix. Repeat."] :
  [
  "Database first. Schema quyết định mọi thứ.",
  "Một abstraction tốt là abstraction bạn không cần viết.",
  "Test cái mà nếu sai sẽ làm bạn mất ngủ.",
  "Ship sớm. Đo. Sửa. Lặp lại."];

  return (
    <section id="about" className="section">
      <SectionHead n="03" title={t(lang, "Giới thiệu", "About")} subtitle={t(lang, "Vài dòng về tôi và cách tôi làm việc.", "A short note about who I am, and how I work.")} filed={t(lang, "Tiểu sử", "Biography")} />
      <div className="about-grid">
        <div className="about-portrait">
          <PortraitPlaceholder />
          <div className="mono xs muted center">[ portrait — drop a photo here ]</div>
        </div>
        <div className="about-body">
          {lang === "en" ?
          <>
              <p className="drop">
                <span className="dropcap">I</span>'m Thong — a Saigon-based full-stack developer. I graduated in Information Systems from Industrial University of Ho Chi Minh City (2022) and have since worked across an agency, a design studio, a contract stint at Appif AI, and now Nasys — mostly in the <em>Laravel + Vue + React + Node</em> stack, and for the past six months in <em>Flutter</em> as well.
              </p>
              <p>
                I believe in <em>clean architecture</em>, in code you can still read six months later. Measure before you optimise. A good product is a <em>shipped</em> product, not a perfect one in your head.
              </p>
            </> :

          <>
              <p className="drop">
                <span className="dropcap">T</span>ôi là Trần Ngọc Minh Thông, full-stack developer tại Hồ Chí Minh. Tốt nghiệp ngành Hệ thống Thông tin (Đại học Công nghiệp TP.HCM, 2022), tôi đã làm qua agency, design studio, contract cho Appif AI và hiện đang ở Nasys — chủ yếu trong stack <em>Laravel + Vue + React + Node</em>, và 6 tháng gần đây thêm cả <em>Flutter</em>.
              </p>
              <p>
                Tôi tin vào <em>clean architecture</em>, vào việc viết code để 6 tháng sau mình còn đọc được. Tôi tin vào việc đo lường trước khi tối ưu, và tin rằng một sản phẩm tốt là sản phẩm <em>được ship</em>, không phải sản phẩm hoàn hảo trong đầu.
              </p>
            </>
          }
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

function Writing() {
  const lang = useLang();
  return (
    <section id="writing" className="section">
      <SectionHead n="06" title={t(lang, "Bài viết", "Writing")} subtitle={t(lang, "Ghi chép từ thực chiến.", "Notes from the trenches.")} filed={t(lang, "Nhật ký", "Journal")} />
      <ul className="writing-list">
        {WRITING.map((w, i) =>
        <li key={i} className="w-row">
            <span className="mono xs w-date">{w.date}</span>
            <div className="w-titles">
              <span className="w-title">{lang === "en" ? w.titleEn : w.title}</span>
            </div>
            <span className="mono xs muted w-read">{w.read} {t(lang, "đọc", "read")} →</span>
          </li>
        )}
      </ul>
    </section>);

}

function Testimonials() {
  const lang = useLang();
  return (
    <section id="testimonials" className="section section-tight">
      <SectionHead n="07" title={t(lang, "Lời nhận xét", "Words")} subtitle={t(lang, "Từ những người tôi đã làm việc cùng.", "From people I've shipped with.")} filed={t(lang, "Lời chứng", "Testimonials")} />
      <div className="quote-grid">
        {TESTIMONIALS.map((q, i) =>
        <figure key={i} className="quote">
            <blockquote>"{lang === "en" ? q.en : q.vi}"</blockquote>
            <figcaption className="mono xs"><strong>{q.author}</strong> — {q.role}</figcaption>
          </figure>
        )}
      </div>
    </section>);

}

function Contact() {
  const lang = useLang();
  return (
    <section id="contact" className="section section-contact">
      <SectionHead n="08" title={t(lang, "Liên hệ", "Get in touch")} subtitle={t(lang, "Đang mở cho hợp đồng & vị trí senior.", "Open for contract & senior roles.")} filed={t(lang, "Liên hệ", "Contact")} />
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
          <a href="uploads/TranNgocMinhThongCVFullStack.pdf" download className="contact-link">{t(lang, "Tải CV", "Download CV")}<span>↓</span></a>
        </div>
      </div>
      <footer className="footer mono xs">
        <div>© 2026 {PROFILE.name}. {t(lang, "Thiết kế & xây tại", "Designed & built in")} {PROFILE.locationShort}.</div>
        <div>{t(lang, "Cập nhật —", "Last updated —")} September 2026 · Set in Geist & JetBrains Mono</div>
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
  const active = useScrollSpy(["top", "work", "about", "experience", "skills", "writing", "contact"]);

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
          <Writing />
          <Testimonials />
          <Contact />
        </main>
        {open && <CaseModal project={open} onClose={() => setOpen(null)} />}
      </div>
    </LangCtx.Provider>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);