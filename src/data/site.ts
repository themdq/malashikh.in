// ─── Site-wide configuration ────────────────────────────────────────────────
// Edit this file to update any content on the site without touching components.

export const meta = {
  name: 'Dmitrii Malashikhin',
  nameShort: 'dmitrii',
  handle: 'dm',
  domain: 'malashikh.in',
  version: 'v2.5',
  refreshed: 'Apr 2026',
  role: 'Data Engineer',
  roles: ['data engineer', 'backend', 'cybersecurity'] as string[],
  location: 'New York City',
  timezone: 'America/New_York',
  coords: { display: '40.7128°N · 74.0060°W', lat: '40.7128°N', lon: '74.0060°W' },
  email: 'hello@malashikh.in',
  tagline: 'Building quiet things that run for a long time.',
  taglineFooter: 'Built with espresso tonic in NYC',
  colophon: ['Instrument Serif + JetBrains Mono', 'Astro + React', 'Flexoki palette'],
};

export const social = [
  { label: 'hello@malashikh.in',  href: 'mailto:hello@malashikh.in',           ext: '✉', name: 'email' },
  { label: 'github/malashikhin',  href: 'https://github.com/malashikhin',      ext: '↗', name: 'github' },
  { label: 'linkedin/malashikhin',href: 'https://linkedin.com/in/malashikhin', ext: '↗', name: 'linkedin' },
  { label: 'telegram/@dm',        href: 'https://t.me/dm',                     ext: '↗', name: 'telegram' },
];

export const nav = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills',   label: 'Skills' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
];

// ─── About ───────────────────────────────────────────────────────────────────

export const about = {
  bio: {
    lead: "I'm a data / pipeline engineer with a cybersecurity background. Born in Russia, studied in Saint Petersburg, recently moved to New York City.",
    paras: [
      `Most of my work has been around building and operating data integrations end-to-end: researching sources,
      writing Python connectors, designing ETL, and enriching / validating security data (including work with
      <a href="https://nvd.nist.gov" class="inlink" target="_blank" rel="noopener">NVD</a>).
      I keep systems stable with solid CI/CD and pragmatic automation.`,
      `Off-hours: MMA, NBA, swimming, rollerblading, way too much music.
      <span class="hl">Espresso tonic</span> is my happy place. I read, watch films, and shoot photos.
      Digital minimalism — fewer apps, more intent — is a quiet obsession.`,
    ],
    // plain-text versions used by terminal
    parasPlain: [
      'Most of my work has been around building and operating data integrations end-to-end: researching sources, writing Python connectors, designing ETL, and enriching / validating security data (including work with NVD). I keep systems stable with solid CI/CD and pragmatic automation.',
      'Off-hours: MMA, NBA, swimming, rollerblading, way too much music. Espresso tonic is my happy place. I read, watch films, and shoot photos. Digital minimalism — fewer apps, more intent — is a quiet obsession.',
    ],
  },
  // Used by the about page prose section
  prose: [
    `I'm Dmitrii Malashikhin — a data/pipeline engineer with 3+ years of experience in cybersecurity products.
    I was born in the south of Russia, studied in Saint Petersburg, and recently moved to New York City after winning the Green Card lottery.`,
    `Most of my work has been around building and operating data integrations end-to-end: researching sources, writing Python connectors,
    designing ETL pipelines, enriching and validating security data (including work with NVD), and keeping systems stable with solid CI/CD
    and pragmatic automation.`,
    `Outside of work, I'm into MMA and NBA, love swimming and rollerblading, and spend way too much time exploring music.
    I'm a coffee person (espresso tonic is my favorite) and a big fan of mineral water.
    I also enjoy books, films, and photography — and I'm a strong believer in digital minimalism and simplifying life through smart automation.`,
  ],
  facts: [
    { k: 'location',    v: 'New York City',                sub: "moved '25" },
    { k: 'time_zone',   v: 'America/New_York' },
    { k: 'role',        v: 'Data Engineer',                sub: '· ETL · security data' },
    { k: 'stack',       v: 'Python · SQL · Airflow · K8s' },
    { k: 'fuel',        v: 'Espresso tonic · sparkling water' },
    { k: 'off_hours',   v: 'MMA · NBA · swim · skate' },
    { k: 'believes_in', v: 'Digital minimalism' },
  ],
  stats: [
    { n: 3,  u: '+', label: 'Years in production', sub: 'since 2022 · ETL & security data' },
    { n: 20, u: '+', label: 'Pipelines shipped',   sub: 'connectors · normalizers · validators' },
    { n: 10, u: '+', label: 'Technologies',         sub: 'Python · SQL · K8s · Terraform' },
    { n: 2,  u: 'M', label: 'Records/day peak',    sub: 'across vulnerability feeds' },
  ],
  interests: [
    'Cybersecurity data pipelines',
    'ETL & data quality',
    'Automation & developer tooling',
    'Digital minimalism',
    'MMA & NBA',
    'Swimming & rollerblading',
    'Coffee',
    'Music & photography',
  ],
};

export const experience = [
  {
    title: 'Data Engineer',
    company: 'R-Vision',
    period: 'Oct 2023 - Jan 2026',
    description: 'Owned end-to-end vulnerability data feeds for a security scanner: source research and onboarding, ETL pipelines, enrichment across multiple vulnerability databases (incl. NVD), and validation in product. Partnered with customers, wrote automation scripts and developer tools (VS Code / PyCharm / Chrome extensions), improved CI/CD, reviewed code, mentored junior engineers, and maintained an internal knowledge base.',
  },
  {
    title: 'Data Engineer',
    company: 'Datagile',
    period: 'Aug 2022 - Oct 2023',
    description: 'Built and maintained SIEM normalization rules: onboarded and analyzed log sources, implemented and tested parsing/normalization, and collaborated with analysts on downstream correlation use cases. Wrote Python connectors for non-standard sources, produced technical documentation for integrations, rotated on technical support, and automated routine workflows with Python while improving CI/CD.',
  },
];

export const education = [
  {
    degree: 'Master in Information Systems',
    school: 'Admiral Makarov State University',
    year: '2022 - 2024',
  },
  {
    degree: 'Bachelor in Computer Science',
    school: 'Admiral Makarov State University',
    year: '2018 - 2022',
  },
];

// ─── Now (updated manually to reflect current activities) ────────────────────

export const now = {
  label: 'apr 2026',
  items: [
    { ic: '▶', k: 'listening', v: 'King Krule — Borderline',         sub: 'on repeat this week' },
    { ic: '☕', k: 'drinking',  v: 'Espresso tonic',                  sub: 'Today with lime' },
    { ic: '✎', k: 'reading',   v: 'Designing Data-Intensive Apps',   sub: 'ch. 7 — transactions' },
    { ic: '▲', k: 'building',  v: 'a tiny SIEM normalizer',          sub: 'weekend project · Python + DuckDB' },
  ],
};

// ─── Deploy log (updated manually) ───────────────────────────────────────────

export const deploys = {
  uptime: '99.98%',
  entries: [
    { date: 'apr 17 09:12', status: 'ok',  msg: 'site v2.5.1 · <code>hero/ascii</code>', dur: '1.2s' },
    { date: 'apr 16 18:44', status: 'ok',  msg: 'blog post published',                   dur: '0.8s' },
    { date: 'apr 15 11:03', status: 'ok',  msg: 'tg-to-drive v1.4 · <code>release</code>', dur: '42s' },
    { date: 'apr 14 21:17', status: 'wip', msg: 'asos-map canary → 20%',                  dur: '—' },
    { date: 'apr 13 08:29', status: 'ok',  msg: 'cron · NVD sync',                        dur: '3.1s' },
    { date: 'apr 12 02:04', status: 'err', msg: 'auto-retry · upstream 502',              dur: '14s' },
    { date: 'apr 11 17:45', status: 'ok',  msg: 'site v2.5.0 · redesign',                 dur: '1.4s' },
  ],
};

// ─── Ticker ───────────────────────────────────────────────────────────────────

export const ticker = [
  'currently in NYC 🗽',
  'reading: Designing Data-Intensive Apps',
  'espresso tonic — 3:1, no syrup',
  'open to interesting problems',
  'NVD sync at 09:00 UTC daily',
  'uptime 99.98% (last 90d)',
  'deploys from main, no staging drama',
  '40.7128°N · 74.0060°W',
  'digital minimalism since 2021',
  'MMA · NBA · swim · skate',
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const hero = {
  greeting: "Hi there — I'm",
  description: `I build reliable ETL end-to-end — from source onboarding and normalization to
    <b>enrichment, validation and production support</b>. I care a lot about automation,
    data quality, and simple systems that teams can operate with confidence.`,
  cta: [
    { label: 'view work', href: '#projects', kbd: 'W', primary: true },
    { label: 'say hello', href: '#contact',  kbd: 'C', primary: false },
    { label: 'résumé.pdf', href: '#',        kbd: '↓', primary: false, id: 'resumeBtn' },
  ],
};

// ─── Contact page ─────────────────────────────────────────────────────────────

export const contactPage = {
  form: {
    accessKey: 'cdccb814-7566-4efc-a93b-3a0fd5f9ddfc',
  },
  responseTime: 'I typically respond to messages within 24-48 hours. For urgent matters, please reach out via email directly.',
};
