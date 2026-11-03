// One entry per project. The home page grid and the /work/<slug> case-study
// pages are both built from this list, in this order.

export interface Project {
  slug: string;
  title: string;
  category: string;
  /** Leave empty to hide the year chip. */
  year: string;
  status: string;
  flagship?: boolean;
  /** Case study details still to come: the page shows a "coming soon" panel. */
  pending?: boolean;
  summary: string;
  problem?: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  cover: 'pulse' | 'phone' | 'dashboard' | 'papers' | 'hotel' | 'transfer' | 'exam';
  accent: [string, string];
  motto?: string;
}

export const projects: Project[] = [
  {
    slug: 'gymlive-2026',
    title: 'Gymlive 2026',
    category: 'Live sports scoring system',
    year: '2026',
    status: 'Delivered · used live',
    flagship: true,
    summary:
      'The digital live scoring and results system for the 70th West Bengal State School Games in Gymnastics 2026: judges score at the venue, the giant screen updates in seconds, and parents follow results on their phones.',
    problem:
      'A state-level championship across four gymnastics disciplines and three age groups, scored by panels of judges. Paper score sheets meant slow results, transcription errors and parents waiting for hours. The organisers needed live, trustworthy results without any risk of scores being changed.',
    highlights: [
      'Live judge scoring for Men’s and Women’s Artistic, Rhythmic and Acrobatic gymnastics, U14, U17 and U19, boys and girls',
      'Public results page for parents and coaches: no sign-in, search, final scores, prize list and the YouTube live stream',
      'Giant venue display with split and four-way screens and up to 8 live hall cameras, with the athlete and last score on the video',
      'Chief Judge approvals: only approved scores go public, with a full audit trail and score history',
      'Three-step sign-in for officials (password, competition passphrase and a 6-digit authenticator code), encrypted data and role-based rules',
      'Result book, medal table, judge slips and certificates that anyone can verify online',
    ],
    metrics: [
      { value: '4', label: 'Disciplines' },
      { value: '6', label: 'Age & gender classes' },
      { value: '24', label: 'Official accounts' },
      { value: '8', label: 'Live hall cameras' },
    ],
    stack: ['JavaScript', 'Firebase Realtime Database', 'Firebase Auth', 'Firebase Hosting', 'Web Crypto (AES-GCM)', 'YouTube Live'],
    links: [{ label: 'See the live results', href: 'https://gymlive2026.web.app' }],
    cover: 'pulse',
    accent: ['#FB7185', '#FBBF24'],
  },
  {
    slug: 'ipo-one',
    title: 'IPO One',
    category: 'Android app',
    year: '2026',
    status: 'Live · free APK',
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
      'PAN, demat and UPI details encrypted on the phone with Android Keystore (AES-256-GCM)',
    ],
    metrics: [
      { value: '9', label: 'Registrars integrated' },
      { value: '6', label: 'Lifecycle stages' },
      { value: 'AES-256', label: 'On-device encryption' },
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room', 'Firebase', 'WorkManager', 'Android Keystore'],
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
    category: 'NGO platform',
    year: '2025–26',
    status: 'In production',
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
    category: 'Web platform',
    year: '2026',
    status: 'Live',
    summary:
      'Previous-year university question papers in one searchable place, contributed by students and reviewed by admins before they go public.',
    problem:
      'Old question papers are scattered across WhatsApp groups and photocopy shops. Students needed one trusted place to find them, and a fair way to add more.',
    highlights: [
      'Search and filter by university, college and subject',
      'Google sign-in, or email and password',
      'Contribution form that warns about duplicates before upload',
      'Admin review queue: every paper is checked before it appears',
      'Access rules enforced in the database itself with row-level security',
      'Bulk importer that loads a whole folder of PDFs in one go',
    ],
    metrics: [
      { value: '3', label: 'Access levels' },
      { value: '100%', label: 'Papers reviewed before publishing' },
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Vercel'],
    links: [{ label: 'Visit the live site', href: 'https://question-paper-portal-henna.vercel.app' }],
    cover: 'papers',
    accent: ['#A78BFA', '#F472B6'],
  },
  // TODO (Ujjal & Barun): for each project below send what it does, who it is
  // for, the main features, the stack, the year, screenshots and any live link.
  // Until then the page shows "Full case study coming soon".
  {
    slug: 'hotel-davana',
    title: 'Hotel D’Avana',
    category: 'Hospitality',
    year: '',
    status: 'Delivered',
    pending: true,
    summary: 'Software we designed and built for Hotel D’Avana.',
    highlights: [],
    metrics: [],
    stack: [],
    links: [],
    cover: 'hotel',
    accent: ['#E0B872', '#F472B6'],
  },
  {
    slug: 'transfer-portal',
    title: 'Transfer Portal',
    category: 'Web portal',
    year: '',
    status: 'Delivered',
    pending: true,
    summary: 'An online transfer portal, designed, built and delivered by the two of us.',
    highlights: [],
    metrics: [],
    stack: [],
    links: [],
    cover: 'transfer',
    accent: ['#38BDF8', '#818CF8'],
  },
  {
    slug: 'exam-management-portal',
    title: 'Exam Management Portal',
    category: 'Web portal',
    year: '',
    status: 'Delivered',
    pending: true,
    summary: 'A web portal for managing examinations, built and delivered by the two of us.',
    highlights: [],
    metrics: [],
    stack: [],
    links: [],
    cover: 'exam',
    accent: ['#FB923C', '#FBBF24'],
  },
];
