// One entry per project. The home page and the /work/<slug> case-study pages
// are built from this list.
//
// Sources: the shared "Software Portfolio: Ujjal Kumar Das & Barun Kr Paul"
// document (Nov 2026), the project repositories and earlier build sessions.
// Only features recorded as built are listed. Client staff names and any
// personal data are left out on purpose.

export type Group = 'Live platforms' | 'Education & administration' | 'Business software' | 'Apps & teaching';
export const groups: Group[] = ['Live platforms', 'Education & administration', 'Business software', 'Apps & teaching'];

export type CoverKind =
  | 'pulse' | 'phone' | 'dashboard' | 'papers' | 'hotel' | 'transfer'
  | 'exam' | 'tour' | 'leave' | 'pos' | 'mono';

export interface Project {
  slug: string;
  title: string;
  /** Who it was built for, shown in the project index. */
  client: string;
  group: Group;
  category: string;
  /** Leave empty to hide the year chip. */
  year: string;
  status: string;
  /** Shown in the illustrated "Selected work" grid (otherwise only in the index). */
  featured?: boolean;
  flagship?: boolean;
  /** The notes do not list the modules yet: the page shows a "walkthrough" panel. */
  pending?: boolean;
  summary: string;
  problem?: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  cover: CoverKind;
  accent: [string, string];
  /** Who built it. Defaults to both. TODO (Ujjal & Barun): confirm each. */
  credit?: string;
  motto?: string;
}

const BOTH = 'Ujjal Kumar Das & Barun Kr Paul';
export const creditOf = (p: Project) => p.credit ?? BOTH;

export const projects: Project[] = [
  // ───────────────────────── Featured ─────────────────────────
  {
    slug: 'gymlive-2026',
    title: 'Gymlive 2026',
    client: 'WB State Council for School Games and Sports',
    group: 'Live platforms',
    category: 'Live sports scoring & results',
    year: '2026',
    status: 'Live',
    featured: true,
    flagship: true,
    summary:
      'The competition management and live results platform for the 70th West Bengal State School Games in Gymnastics 2026: officials score at the venue, the giant screen updates in seconds, and parents follow results on their phones.',
    problem:
      'A state championship across four gymnastics disciplines and three age groups, boys and girls, scored by panels of judges. Paper score sheets meant slow results and transcription errors, and thousands of parents and coaches wanted results the moment a routine ended.',
    highlights: [
      'Athlete registration by state and district, with the age group set automatically from the date of birth',
      'Scoring engine for Men’s and Women’s Artistic, Rhythmic and Acrobatic gymnastics, with each operator seeing only their own event',
      'Giant venue display that splits into two or four panels, with up to 8 live hall cameras and the athlete and last score on the video',
      'Chief Judge approvals: only approved scores go public, with a full audit trail and score history',
      'Public results page with no sign-in, plus printable score sheets in the National School Games (SGFI) format',
      'Ranking rules built in: at most two medal places per district, the single-vault rule, rank-wise or alphabetical lists',
      'Three-step sign-in for officials (password, competition passphrase, 6-digit authenticator code) and encrypted data',
    ],
    metrics: [
      { value: '4', label: 'Disciplines' },
      { value: '19', label: 'Apparatus & group events' },
      { value: '2,000', label: 'Viewers at once, by design' },
      { value: '4,000', label: 'Records supported' },
    ],
    stack: ['JavaScript', 'Firebase Realtime Database', 'Firebase Auth', 'Firebase Hosting', 'Web Crypto (AES-GCM)', 'YouTube Live'],
    links: [{ label: 'See the live results', href: 'https://gymlive2026.web.app' }],
    cover: 'pulse',
    accent: ['#FB7185', '#FBBF24'],
  },
  {
    slug: 'ipo-one',
    title: 'IPO One',
    client: 'Retail IPO investors',
    group: 'Apps & teaching',
    category: 'Android app',
    year: '2026',
    status: 'Public releases',
    featured: true,
    summary:
      'A privacy-first Android app for tracking IPOs and applying across a whole family’s demat accounts, with live GMP, subscription data and allotment checks in one place.',
    problem:
      'Families who apply for IPOs juggle several PANs, demat accounts, broker apps and registrar websites. Tracking dates, bids and allotments by hand is slow and easy to get wrong.',
    highlights: [
      'Six-stage IPO lifecycle (upcoming, open, closed, allotted, listed, cancelled) on one grouped dashboard',
      'Live grey-market premium, issue size and category-wise subscription for QIB, NII and retail',
      'Allotment checks across 9 registrars, with automatic retries and an honest “could not verify”',
      'Family Apply: step through every member’s bid, each with their own encrypted broker session',
      'IPO calendar, today’s events and reminders for opens, closes, listings and allotments',
      'Automated, signed APK build attached to every GitHub release',
    ],
    metrics: [
      { value: '9', label: 'Registrars integrated' },
      { value: '6', label: 'Lifecycle stages' },
      { value: 'AES-256', label: 'On-device encryption' },
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room', 'Firebase', 'WorkManager', 'GitHub Actions'],
    links: [
      { label: 'Download APK', href: 'https://github.com/barunkrpaul/IPO-One-V2/releases/latest' },
      { label: 'Source on GitHub', href: 'https://github.com/barunkrpaul/IPO-One-V2' },
    ],
    cover: 'phone',
    accent: ['#2DD4BF', '#38BDF8'],
  },
  {
    slug: 'avk',
    title: 'AVK Platform',
    client: 'Adivasi Vidyacharcha Kendra (NGO)',
    group: 'Education & administration',
    category: 'NGO platform',
    year: '2025–26',
    status: 'In production',
    featured: true,
    summary:
      'A mobile-first education management and remote-monitoring platform for Adivasi Vidyacharcha Kendra, an NGO running 15 learning centres for tribal children in Jungle Mahal, West Bengal.',
    problem:
      'Village teachers work in remote hamlets with weak networks. NGO leaders needed proof that classes happened, reliable attendance, fair exam marking and reports, without asking teachers to fight with complicated software.',
    highlights: [
      'Daily class monitoring with start and end photos as evidence of every session',
      'Fast, touch-friendly attendance with absence reasons and automatic percentages',
      'Multi-page answer-sheet scanning, teacher marking and independent moderation',
      'Report cards and academic analytics for leadership and trustees',
      'Surprise-inspection logs for field supervisors',
      'Works offline: drafts are saved on the phone and sync when the network returns',
    ],
    metrics: [
      { value: '15', label: 'Learning centres' },
      { value: '3', label: 'Districts' },
      { value: '4', label: 'User roles' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Recharts', 'PWA'],
    links: [],
    cover: 'dashboard',
    accent: ['#34D399', '#FBBF24'],
    motto: 'নিজেরাই শিখি নিজেরাই শেখাই · We learn and help our children learn',
  },
  {
    slug: 'question-paper-portal',
    title: 'Question Paper Portal',
    client: 'Students of any college or university',
    group: 'Live platforms',
    category: 'Web platform',
    year: '2026',
    status: 'Live',
    featured: true,
    summary:
      'An open archive of previous-year university question papers, contributed by students and reviewed by admins before they go public.',
    problem:
      'Old question papers are scattered across WhatsApp groups and photocopy shops. Students needed one trusted place to find them, and a fair way to add more.',
    highlights: [
      'Browse by semester and subject, with old CBCS and new NEP paper codes mapped to one course',
      'Google sign-in, or email and password; downloads need a signed-in account',
      'Anyone signed in can upload a paper; an admin approves it before it is published',
      'Bulk importer that loads whole folders of PDFs in one go',
      'Row-level security in the database, a tested Content Security Policy and accessible dialogs',
    ],
    metrics: [
      { value: '119', label: 'Computer Science papers' },
      { value: '15', label: 'Universities' },
      { value: '26', label: 'Subjects' },
    ],
    stack: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Vercel'],
    // TODO: add the live link back once the papers are restored on the new database.
    links: [],
    cover: 'papers',
    accent: ['#A78BFA', '#F472B6'],
  },
  {
    slug: 'hsms-hardware',
    title: 'HSMS',
    client: 'A paint and plumbing hardware store',
    group: 'Business software',
    category: 'Stock & point of sale',
    year: '2026',
    status: 'Live',
    featured: true,
    summary:
      'A stock and point-of-sale system for a busy hardware store: the store room and the counter share one live stock, from any device, including an iPad.',
    problem:
      'Stock was kept in registers, so the counter never knew what the store room held. Prices differed by item and section, and bills were written by hand.',
    highlights: [
      'Purchases add stock and sales deduct it, with price details for every item',
      'Separate purchase and billing sections for Painting, Plumbing and Other',
      'Several users on one shared data set: store-room entries and counter sales update for everyone',
      'Works on an iPad at the counter',
      'Sign-in with one-time codes from an authenticator app',
      'User manuals in Bengali and in English',
    ],
    metrics: [
      { value: '3', label: 'Sales sections' },
      { value: '2', label: 'Manual languages' },
    ],
    stack: ['HTML & JavaScript', 'Cloudflare Workers', 'Google Apps Script'],
    links: [],
    cover: 'pos',
    accent: ['#F59E0B', '#38BDF8'],
  },
  {
    slug: 'mutual-transfer-portal',
    title: 'Mutual Transfer Portal',
    client: 'West Bengal college teachers',
    group: 'Education & administration',
    category: 'Web portal',
    year: '2026',
    status: 'Delivered',
    featured: true,
    summary:
      'A common portal where college teachers under the West Bengal College Service Commission register for mutual transfer and find matching partners.',
    problem:
      'Teachers looking for a mutual transfer searched for partners through scattered messages and lists. Finding someone in the same subject who wanted to move the other way was largely luck.',
    highlights: [
      'Registration with subject, category, present college and preferred colleges or areas',
      'District-driven dropdown covering every college, with type-ahead multi-select of preferred colleges',
      'Subject-wise directory of transfer requests',
      'Subject-wise PDF download of the directory',
    ],
    metrics: [{ value: '~730', label: 'Teachers in the launch group' }],
    stack: ['Google Apps Script', 'Google Sheets', 'Firebase'],
    links: [],
    cover: 'transfer',
    accent: ['#38BDF8', '#818CF8'],
  },
  {
    slug: 'davana-hotel-pms',
    title: 'D’Avana Hotel PMS',
    client: 'D’Avana Bliss Retreat Homestay, Ranchi',
    group: 'Business software',
    category: 'Hospitality',
    year: '2026',
    status: 'In development',
    featured: true,
    summary:
      'A property management system for D’Avana Bliss Retreat Homestay in Ranchi, replacing manual registers and handwritten bills.',
    problem:
      'Guests, rooms and bills were tracked in paper registers. Bills for rooms, food and other services were written by hand at checkout.',
    highlights: [
      'Phase 1 delivered: a digital guest register that replaces the paper one',
      'Billing for rooms, food and other services in one bill',
      'In development: online booking by guests, with room prices set by the manager',
      'In development: dashboard, reports, multiple users and roles',
      'In development: UPI advance payments with manual verification',
    ],
    metrics: [],
    stack: ['HTML & JavaScript', 'Firebase Auth', 'Firestore', 'Firebase Hosting'],
    links: [],
    cover: 'hotel',
    accent: ['#E0B872', '#F472B6'],
  },
  {
    slug: 'leave-management',
    title: 'Leave Management System',
    client: 'Srikrishna College staff and Principal',
    group: 'Education & administration',
    category: 'College administration',
    year: '2026',
    status: 'Delivered',
    featured: true,
    summary:
      'An online leave system for college staff: fill a paper-style form on your phone, and the signed PDF goes to the Principal on WhatsApp or email.',
    problem:
      'Leave ran on printed forms, signatures and trips to the office. Staff needed a faster way to apply that still produced the familiar signed form.',
    highlights: [
      'Web portal and installable app (PWA) on iPhone, iPad and Android',
      'CL, ML, EL, DL, CCL and Station Leave',
      'Paper-style A4 leave form with signature upload, pick-your-name auto-fill and suggested reasons',
      'PDF generated in the browser and shared with the Principal by WhatsApp or email',
      'Companion covering-letter generator',
    ],
    metrics: [
      { value: '108', label: 'Staff in the master list' },
      { value: '17', label: 'Departments' },
      { value: '6', label: 'Leave types' },
    ],
    stack: ['HTML & JavaScript', 'Firebase', 'html2pdf.js', 'PWA'],
    links: [],
    cover: 'leave',
    accent: ['#C9A85C', '#60A5FA'],
  },
  {
    slug: 'exam-duty-register',
    title: 'Examination Duty Register',
    client: 'Srikrishna College faculty',
    group: 'Education & administration',
    category: 'College administration',
    year: '2026',
    status: 'Delivered',
    featured: true,
    summary:
      'Works out every faculty member’s university examination invigilation hours straight from the accounts section’s remuneration workbook.',
    problem:
      'Teachers need their invigilation hours for self-appraisal, but the only record was the accounts section’s remuneration spreadsheet, and adding it up by hand took hours.',
    highlights: [
      'Reads the examination remuneration workbook directly',
      'Totals completed duty hours by faculty, by semester and by academic year',
      'Per-faculty report ready for self-appraisal',
    ],
    metrics: [],
    stack: ['HTML & JavaScript', 'Excel import'],
    links: [],
    cover: 'exam',
    accent: ['#FB923C', '#FBBF24'],
  },
  {
    slug: 'packmate',
    title: 'PackMate',
    client: 'A college department’s educational tour',
    group: 'Live platforms',
    category: 'Tour companion app',
    year: '2026',
    status: 'Live',
    featured: true,
    summary:
      'A mobile-first companion app for a college department’s educational tour to Sikkim: tickets, packing, itinerary, announcements, expenses and a shared photo gallery, all in one place.',
    problem:
      'Twenty-two travellers, three destinations and a mountain of tickets, berths, checklists and receipts. Everything lived in group chats, and personal details like phone numbers and PNRs were far too easy to see.',
    highlights: [
      'Access-code sign-in checked on the server: each traveller sees only their own ticket and berth',
      'Faculty tools: traveller roster, priority announcements with an urgent banner, and an expense tracker with CSV export',
      'Shared photo gallery on Google Drive with drag-and-drop uploads and likes',
      'Packing checklist of 34 items in 6 categories that syncs across a student’s devices',
      'Day-by-day itinerary with a downloadable PDF, a route map and a live countdown',
      'Works offline in the hills: emergency contacts and key details stay available without a signal',
    ],
    metrics: [
      { value: '22', label: 'Travellers' },
      { value: '3', label: 'Destinations' },
      { value: '44', label: 'Automated tests' },
    ],
    stack: ['HTML & JavaScript', 'Tailwind CSS', 'Leaflet', 'Google Apps Script', 'Google Sheets & Drive', 'PWA'],
    links: [{ label: 'Open the app', href: 'https://barunkrpaul.github.io/sikkim-tour/' }],
    cover: 'tour',
    accent: ['#5EEAD4', '#A3E635'],
  },

  // ───────────────────────── Education & administration ─────────────────────────
  {
    slug: 'skc-college-suite',
    title: 'SKC College Suite v2.0',
    client: 'Srikrishna College administration',
    group: 'Education & administration',
    category: 'Offline admin suite',
    year: '2026',
    status: 'Delivered',
    summary: 'A unified offline administrative suite for the college office and departments: eight modules in a single file that needs no installation.',
    highlights: [
      'Student Records, Exam Duty Management, NAAC Departmental Data Portal and Form 16 Distribution',
      'CAS API Dashboard, Marks and Exam Workflow, Question Bank and Paper Generator, and QR Attendance',
      'Live statistics dashboard',
      'Whole-suite backup and restore, PIN lock and a command palette',
      'Earlier standalone tools: offline face-recognition attendance and a government-scheme verification form',
    ],
    metrics: [
      { value: '8', label: 'Modules' },
      { value: '16,930', label: 'Student records' },
    ],
    stack: ['HTML & JavaScript', 'IndexedDB', 'localStorage'],
    links: [],
    cover: 'mono',
    accent: ['#60A5FA', '#A78BFA'],
    credit: 'Ujjal Kumar Das',
  },
  {
    slug: 'cas-navigator',
    title: 'CAS Navigator',
    client: 'College teachers and librarians, West Bengal',
    group: 'Education & administration',
    category: 'Promotion file generator',
    year: '2026',
    status: 'Delivered',
    summary:
      'Generates the complete Career Advancement Scheme promotion file for teachers and librarians of government-aided colleges, following G.O. No. 1438 (17.09.2026) and UGC 2018 grading.',
    highlights: [
      'Enter your data once: the application letter, eligibility checklist, Appendix II A and B, Summary of Overall Grading and Parts C and D are produced for you',
      'Covers teachers and college librarians, with designations that follow the rule',
      'Teaching data per course, with optional auto-fill from the routine',
      'Role-based sign-in for Administrator, IQAC and Faculty',
      'CAS Pathway Explorer: a public self-service page with stage-wise eligibility and a flow diagram',
    ],
    metrics: [{ value: '3', label: 'Roles' }],
    stack: ['HTML & JavaScript', 'Google Apps Script'],
    links: [],
    cover: 'mono',
    accent: ['#34D399', '#60A5FA'],
  },
  {
    slug: 'routinehub',
    title: 'RoutineHub',
    client: 'Four science departments, Srikrishna College',
    group: 'Education & administration',
    category: 'Timetable builder',
    year: '2026',
    status: 'Delivered',
    summary: 'Builds the class routine automatically for four science departments under the NEP odd-semester framework.',
    highlights: [
      'Seven periods a day, with the last kept for remedial and mentor-mentee classes',
      'Every NEP slot type: MDC, Minor, Major, practicals, AECC, SEC, VAC and Tutorial',
      'Pools of teachers per subject, assigned by daily availability',
      'MDC and Minor slots enforced, with a clear message when one cannot be placed',
    ],
    metrics: [
      { value: '24', label: 'Faculty' },
      { value: '4', label: 'Departments' },
    ],
    stack: ['HTML & JavaScript', 'localStorage'],
    links: [],
    cover: 'mono',
    accent: ['#F472B6', '#A78BFA'],
  },
  {
    slug: 'tc-committee-system',
    title: 'TC Committee Manager',
    client: 'Srikrishna College Teachers’ Council',
    group: 'Education & administration',
    category: 'Committee register',
    year: '2026',
    status: 'Delivered',
    summary: 'A register and reporting tool for the Teachers’ Council sub-committees, loaded from the official 2026-27 list.',
    highlights: [
      'All committees loaded from the official 2026-27 sub-committee list',
      'Admin panel for adding and updating committees, members and details',
      'Printable committee reports',
      'Spelling inconsistencies in the source list flagged for review, never auto-corrected',
    ],
    metrics: [],
    stack: ['HTML & JavaScript', 'localStorage'],
    links: [],
    cover: 'mono',
    accent: ['#FBBF24', '#FB7185'],
  },
  {
    slug: 'attendly',
    title: 'Attendly',
    client: 'Colleges',
    group: 'Education & administration',
    category: 'Attendance system',
    year: '2026',
    status: 'Prototype',
    summary: 'Attendance for colleges with QR or one-time-code check-in for staff and students, on the web, on Windows and on Android.',
    highlights: [
      'QR or OTP check-in for staff and students',
      'Security hardening: secrets in a protected table, real student sessions, no anonymous database access',
      'Forced password change on first sign-in and brute-force throttling',
      'Windows desktop app and an Android package',
    ],
    metrics: [],
    stack: ['React', 'TanStack Start', 'Supabase', 'Electron'],
    links: [],
    cover: 'mono',
    accent: ['#2DD4BF', '#A3E635'],
    credit: 'Ujjal Kumar Das',
  },
  {
    slug: 'campuscore-erp',
    title: 'CampusCore ERP',
    client: 'Colleges (multi-tenant ready)',
    group: 'Education & administration',
    category: 'College ERP',
    year: '2026',
    status: 'In development',
    summary: 'A production-grade college management ERP for a single college, designed so it can serve many colleges later.',
    highlights: [
      'Requirements specification in IEEE-830 format',
      '47-table database design',
      '30-endpoint OpenAPI specification',
      'Docker Compose deployment and a full test suite',
    ],
    metrics: [
      { value: '47', label: 'Tables' },
      { value: '30', label: 'API endpoints' },
    ],
    stack: ['Next.js', 'TypeScript', 'Node & Express', 'Prisma', 'PostgreSQL', 'Docker'],
    links: [],
    cover: 'mono',
    accent: ['#818CF8', '#38BDF8'],
  },
  {
    slug: 'campusone-erp',
    title: 'CampusOne ERP',
    client: 'Government-aided degree colleges, West Bengal',
    group: 'Education & administration',
    category: 'College ERP',
    year: '2026',
    status: 'In development',
    summary: 'A college management ERP shaped around the rules of government-aided degree colleges in West Bengal.',
    highlights: [
      'Stage 1: a working demo',
      'Stage 2: requirements with roles and a compliance register',
    ],
    metrics: [],
    stack: ['HTML & JavaScript'],
    links: [],
    cover: 'mono',
    accent: ['#60A5FA', '#34D399'],
  },
  {
    slug: 'edusphere-school-erp',
    title: 'EduSphere School ERP',
    client: 'English-medium schools',
    group: 'Education & administration',
    category: 'School ERP',
    year: '2026',
    status: 'Prototype',
    summary: 'A school ERP with roles for principal, admin, teacher, student, parent, accountant, librarian, transport and HR.',
    highlights: [
      'Offline edition with every role module and clearly marked demo data',
      'Configurable school branding',
      'SMS, payment, GPS and AI features shown as “integration required” instead of being faked',
      'Online multi-user edition in progress',
    ],
    metrics: [
      { value: '9', label: 'Roles' },
      { value: '2,000', label: 'Users per school' },
    ],
    stack: ['HTML & JavaScript', 'IndexedDB', 'Firebase'],
    links: [],
    cover: 'mono',
    accent: ['#FBBF24', '#34D399'],
  },
  {
    slug: 'wb-government-school-erp',
    title: 'WB Government School ERP',
    client: 'Government primary and high schools, West Bengal',
    group: 'Education & administration',
    category: 'School administration',
    year: '2026',
    status: 'Prototype',
    pending: true,
    summary: 'An offline school management system for West Bengal Government primary schools, with a high-school edition for Classes V to XII, in Bengali and English.',
    highlights: [],
    metrics: [{ value: '2', label: 'Editions' }],
    stack: ['HTML & JavaScript', 'IndexedDB'],
    links: [],
    cover: 'mono',
    accent: ['#34D399', '#FBBF24'],
  },

  // ───────────────────────── Business software ─────────────────────────
  {
    slug: 'dentdesk',
    title: 'DentDesk',
    client: 'A dental surgeon with three practice locations',
    group: 'Business software',
    category: 'Clinic appointments',
    year: '2026',
    status: 'Prototype',
    summary: 'Appointments, prescriptions and patient records for a dental surgeon who works at a private chamber and two hospitals.',
    highlights: [
      'Patients check availability and book online',
      'The doctor sets weekly timings, special sessions and leave',
      'A slot taken at one location closes at the others, because the doctor can only be in one place',
      'Prescriptions written in the system and sent to the patient',
      'Patient history and reports, with WhatsApp links for notifications',
    ],
    metrics: [{ value: '3', label: 'Locations' }],
    stack: ['HTML & JavaScript', 'PWA', 'Firebase'],
    links: [],
    cover: 'mono',
    accent: ['#5EEAD4', '#60A5FA'],
  },
  {
    slug: 'himalaya360',
    title: 'Himalaya360 Travel ERP',
    client: 'A Sikkim and Darjeeling tour operator',
    group: 'Business software',
    category: 'Travel ERP',
    year: '2026',
    status: 'In development',
    summary: 'One system for a tour operator running owned, leased and partner rooms, tour packages, car rental, drivers and guides.',
    highlights: [
      'Phase 1 delivered: sign-in, role-based access, main dashboard and database foundation',
      'Planned: room inventory, bookings and CRM, transport, accounting with booking-wise profit, notifications and an AI assistant',
    ],
    metrics: [
      { value: '8', label: 'Planned phases' },
      { value: '50+', label: 'Properties it will scale to' },
    ],
    stack: ['Next.js', 'TypeScript', 'Node', 'PostgreSQL', 'Prisma', 'Google Cloud Run'],
    links: [],
    cover: 'mono',
    accent: ['#38BDF8', '#5EEAD4'],
  },
  {
    slug: 'hsms-commercial',
    title: 'HSMS Commercial',
    client: 'Hardware shops (SaaS)',
    group: 'Business software',
    category: 'Retail SaaS',
    year: '2026',
    status: 'In development',
    summary: 'A commercial-grade hardware shop management and POS platform for many shops, with GST-aware design for India.',
    highlights: [
      'Approved architecture and design pack',
      'Sign-in, role-based access control and an audit log',
      'Shop settings and document numbering',
      'Ledgers and payments',
    ],
    metrics: [{ value: '15', label: 'Planned phases' }],
    stack: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Celery', 'React', 'Docker'],
    links: [],
    cover: 'mono',
    accent: ['#F59E0B', '#FB7185'],
  },
  {
    slug: 'interior-studio-crm',
    title: 'Interior Studio CRM',
    client: 'Interior design firms',
    group: 'Business software',
    category: 'CRM',
    year: '2026',
    status: 'Prototype',
    summary: 'A CRM built around how interior design firms work, from the first enquiry to the final payment.',
    highlights: [
      'Leads and follow-ups',
      'Quotations and bills of quantities (BOQ)',
      'Projects tracked stage by stage',
      'Payments and vendor management',
    ],
    metrics: [],
    stack: ['HTML & JavaScript'],
    links: [],
    cover: 'mono',
    accent: ['#E0B872', '#A78BFA'],
  },
  {
    slug: 'aya-centre-manager',
    title: 'Aya Centre Manager',
    client: 'A domestic staff placement agency',
    group: 'Business software',
    category: 'Agency management',
    year: '2026',
    status: 'Prototype',
    summary: 'Runs an agency that places ayas, drivers and helpers in customers’ homes: workers, customers, placements, duty and bills.',
    highlights: [
      'Worker registration with photo, and customer registration',
      'Placement, duty and attendance tracking',
      'Bills that include the agency commission as a share of the wage',
      'English and Bengali labels',
    ],
    metrics: [],
    stack: ['HTML & JavaScript'],
    links: [],
    cover: 'mono',
    accent: ['#F472B6', '#FBBF24'],
  },
  {
    slug: 'contractor360',
    title: 'Contractor360 ERP',
    client: 'Building contractors',
    group: 'Business software',
    category: 'Contractor ERP',
    year: '2026',
    status: 'Prototype',
    pending: true,
    summary: 'A management ERP for building and works contractors, with AI features, designed as a product to sell.',
    highlights: [],
    metrics: [],
    stack: ['HTML & JavaScript'],
    links: [],
    cover: 'mono',
    accent: ['#FB923C', '#60A5FA'],
  },

  // ───────────────────────── Apps & teaching ─────────────────────────
  {
    slug: 'lecture-series',
    title: 'Animated Lecture Series',
    client: 'UG Computer Science students',
    group: 'Apps & teaching',
    category: 'Teaching software',
    year: '2026',
    status: 'Delivered',
    summary: 'Offline animated class notes and interactive workbooks for undergraduate Computer Science, all in one consistent visual style.',
    highlights: [
      'Artificial Intelligence in 18 topics, plus Algorithms, DBMS, Theory of Computation, IoT and Computational Geometry',
      'Animated diagrams and real-life analogies',
      'Probability workbook with a Galton board and a Bayes’ theorem visualiser',
      'Combinatorics workbook with 46 worked examples and an exact-arithmetic calculator',
      'Solutions that fold away, and open automatically when printed',
    ],
    metrics: [
      { value: '6', label: 'Subjects' },
      { value: '46', label: 'Worked examples' },
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    links: [],
    cover: 'mono',
    accent: ['#A78BFA', '#5EEAD4'],
    credit: 'Ujjal Kumar Das',
  },
];

export const featured = projects.filter((p) => p.featured);
