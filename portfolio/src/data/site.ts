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
  'We are Ujjal and Barun, a two-person software team. We design and ship Android apps, web platforms and NGO systems that real people use every day, from the first sketch to the launch and beyond.';

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
}

// TODO (Ujjal & Barun): confirm roles and bios, and send photos.
export const people: Person[] = [
  {
    id: 'ujjal',
    name: 'Ujjal Kumar Das',
    first: 'Ujjal',
    initials: 'UKD',
    role: 'Mobile & Full-Stack Engineer',
    bio: 'Builds Android apps and the systems behind them: data pipelines, cloud backends, signed releases and the small details that make an app feel fast.',
    strengths: ['Android · Kotlin', 'Firebase & cloud', 'Release engineering', 'Data pipelines'],
    links: [{ label: 'GitHub', href: 'https://github.com/ujjalmca' }],
    hue: 'cyan',
  },
  {
    id: 'barun',
    name: 'Barun Kr Paul',
    first: 'Barun',
    initials: 'BKP',
    role: 'Full-Stack Developer & CS Educator',
    bio: 'Turns real problems from classrooms, NGOs and finance into clear, usable products, and has spent years teaching computer science, so he explains things well too.',
    strengths: ['Product design', 'Web platforms', 'Python · Java · C++', 'Education tech'],
    links: [
      { label: 'GitHub', href: 'https://github.com/barunkrpaul' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/barun-kr-paul-228b10102' },
      { label: 'Email', href: 'mailto:barunkrpaul.cse@gmail.com' },
    ],
    hue: 'violet',
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
    title: 'NGO & education systems',
    body: 'Attendance, assessments, field monitoring and reports for organisations working in low-connectivity areas.',
    icon: 'leaf',
  },
  {
    title: 'Live event & scoring systems',
    body: 'Real-time scoring, giant-screen displays and public results for competitions, with security officials can trust.',
    icon: 'pulse',
  },
  {
    title: 'Dashboards & internal tools',
    body: 'Turn spreadsheets and scattered data into one live view your whole team can trust.',
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
  Backend: ['Firebase', 'Supabase', 'Prisma', 'PostgreSQL', 'FastAPI', 'Python'],
  Cloud: ['Vercel', 'GitHub Actions', 'Docker', 'Oracle Cloud'],
};

export const stats = [
  { value: 4, suffix: '', label: 'products shipped and in use' },
  { value: 1, suffix: '', label: 'state championship scored live' },
  { value: 15, suffix: '', label: 'NGO learning centres on our platform' },
  { value: 9, suffix: '', label: 'IPO registrars integrated' },
];
