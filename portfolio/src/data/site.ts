import { projects } from './projects';

// Everything a visitor reads that is not a project lives here.
// Edit this file to change names, bios, services or contact details.

export interface Brand {
  id: string;
  name: string;
  short: string; // used in the nav on small screens
}

// The name is not decided yet. All options stay available; the floating
// "Name preview" switcher lets you compare them on the live page.
// Set `showBrandSwitcher` to false once you have chosen, and put the
// chosen one first.
export const brands: Brand[] = [
  { id: 'k2', name: 'k = 2', short: 'k=2' },
  { id: 'dps', name: 'Das & Paul Studio', short: 'D&P' },
  { id: 'tv', name: 'Twin Vector', short: 'TV' },
  { id: 'df', name: 'DuoForge', short: 'DF' },
];
export const showBrandSwitcher = true;

export const tagline = { line1: 'Two minds.', line2: 'One build.' };

export const intro =
  'We are Ujjal and Barun, from the Department of Computer Science at Srikrishna College, Bagula. Together we design and ship live platforms, college and NGO systems, business software and Android apps that real people use every day.';

export const availability = 'Open to new projects';

export interface Person {
  id: 'ujjal' | 'barun';
  name: string;
  first: string;
  initials: string;
  role: string;
  bio: string;
  strengths: string[];
  links: { label: string; href: string }[];
  hue: 'cyan' | 'violet';
  /** Card photo (4:3) and small round face, in public/people/. */
  photo: string;
  face: string;
}

// TODO (Ujjal & Barun): confirm roles and bios, and send photos.
export const people: Person[] = [
  {
    id: 'ujjal',
    name: 'Ujjal Kumar Das',
    first: 'Ujjal',
    initials: 'UKD',
    role: 'Systems Builder & CS Educator',
    bio: 'Builds the offline-first suites and administration systems a college runs on, from an eight-module college suite to attendance and teaching software, plus the Android and cloud work behind them.',
    strengths: ['Offline-first apps', 'College administration', 'Android · Kotlin', 'Teaching software'],
    links: [{ label: 'GitHub', href: 'https://github.com/ujjalmca' }],
    hue: 'cyan',
    photo: '/people/ujjal.webp',
    face: '/people/ujjal-face.webp',
  },
  {
    id: 'barun',
    name: 'Barun Kr Paul',
    first: 'Barun',
    initials: 'BKP',
    role: 'Product Engineer & CS Educator',
    bio: 'Turns real problems from classrooms, shops, sports councils and finance into clear, usable products, and runs the hosting, data and launches that keep them live.',
    strengths: ['Live platforms', 'Firebase & Supabase', 'Product design', 'Launch & hosting'],
    links: [
      { label: 'GitHub', href: 'https://github.com/barunkrpaul' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/barun-kr-paul-228b10102' },
      { label: 'Email', href: 'mailto:barunkrpaul.cse@gmail.com' },
    ],
    hue: 'violet',
    photo: '/people/barun.webp',
    face: '/people/barun-face.webp',
  },
];

export const contactEmail = 'barunkrpaul.cse@gmail.com';

export const services = [
  {
    title: 'Android apps',
    body: 'Native Kotlin apps with Jetpack Compose: offline-first, encrypted where it matters, shipped as signed releases.',
    icon: 'phone',
  },
  {
    title: 'Web platforms & portals',
    body: 'Fast, accessible web apps with sign-in, roles, dashboards and admin tools, built on React and Next.js.',
    icon: 'globe',
  },
  {
    title: 'College, school & NGO systems',
    body: 'Leave, exam duty, timetables, promotion files, attendance and field monitoring, built around the rules you actually follow.',
    icon: 'leaf',
  },
  {
    title: 'Live event & scoring systems',
    body: 'Real-time scoring, giant-screen displays and public results for competitions, with security officials can trust.',
    icon: 'pulse',
  },
  {
    title: 'Business ERPs & point of sale',
    body: 'Stock and billing for shops, bookings for hotels and clinics, and ERPs for travel firms, contractors and agencies.',
    icon: 'chart',
  },
  {
    title: 'AI inside your product',
    body: 'Smart search, summaries and assistants added to the apps you already have, with costs kept under control.',
    icon: 'spark',
  },
];

export const process = [
  { step: '01', title: 'Discover', body: 'We listen first: your users, your constraints, what success looks like.' },
  { step: '02', title: 'Design', body: 'Flows and screens you can click through before a line of production code.' },
  { step: '03', title: 'Build', body: 'Short cycles with a working build you can try every week.' },
  { step: '04', title: 'Launch', body: 'Store releases, domains, hosting and a calm launch day.' },
  { step: '05', title: 'Support', body: 'Fixes, updates and new features after launch. We stay.' },
];

export const tech = {
  Mobile: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room', 'WorkManager', 'Android Keystore'],
  Web: ['TypeScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'PWA'],
  Backend: ['Firebase', 'Supabase', 'PostgreSQL', 'Prisma', 'Django', 'Apps Script'],
  Cloud: ['Vercel', 'Cloudflare Workers', 'GitHub Actions', 'Docker'],
};

export const stats = [
  { value: projects.length, suffix: '', label: 'products and tools built' },
  { value: projects.filter((p) => p.status === 'Live').length, suffix: '', label: 'platforms live on the public web' },
  { value: 2000, suffix: '', label: 'live viewers our results platform is built for' },
  { value: 15, suffix: '', label: 'NGO learning centres on our platform' },
];
