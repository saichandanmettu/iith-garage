/* =========================================================
   THE SINGLE EDIT POINT — IITH ARCHIVE & LABS

   GROUND RULES FOR THIS FILE (2026-08-19)
   ---------------------------------------
   1. No usage metrics. Nothing here claims trips taken, bookings made,
      or students reached — none of that is measured, and inventing it
      on a public page is a lie with a number attached. Every `metric`
      below is a STRUCTURAL fact (routes mapped, blocks modelled, fee
      tiers published) that can be checked by opening the project.
   2. No invented performance figures. `specs` carry real, checkable
      properties — not made-up latency or uptime percentages.
   3. `status` is one of: 'live' | 'testing' | 'soon'. Every project also
      carries a `statusNote` saying plainly what does and does not work.
      ('building' is still accepted as a legacy alias of 'soon'.)
   4. `github` is set only for repos verified public. Private repos stay
      null — a link that 404s is worse than no link.
   5. NEVER name a payment gateway anywhere in user-facing copy.
   ========================================================= */

var SITE = {
  title: 'IITH Garage',
  subtitle: 'The builds for IIT-H',
  shortTitle: 'iith.online',
  tagline:
    'The workshop behind every system built for the Indian Institute of Technology Hyderabad.',
  author: 'Chandan Mettu',
  location: 'IIT Hyderabad (17.599° N, 78.125° E)',
  coordinates: '17.599° N, 78.125° E',
  version: '2026.8.0'
};

/* ---- Status vocabulary ------------------------------------------------
   Three states, each with an icon as well as a colour — colour alone is
   never the carrier of meaning (WCAG: don't convey info by colour only). */
var STATUS = {
  live: {
    label: 'Live',
    tone: 'live',
    desc: 'Deployed on its own subdomain and usable right now.',
    icon: '<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="9"/>'
  },
  testing: {
    label: 'Testing',
    tone: 'testing',
    desc: 'Built and deployed, but not yet open to everyone.',
    icon: '<path d="M9 3h6M10 3v6.5L5.5 18A2 2 0 0 0 7.2 21h9.6a2 2 0 0 0 1.7-3L14 9.5V3"/>'
  },
  soon: {
    label: 'Coming soon',
    tone: 'soon',
    desc: 'In active build, not deployed yet.',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'
  },
  building: {
    label: 'Coming soon',
    tone: 'soon',
    desc: 'In active build, not deployed yet.',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'
  }
};

var CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'Academics', label: 'Academics & Notes' },
  { id: 'Merchandise', label: 'Clubs & Merch' },
  { id: 'Sport', label: 'Athletics & Sport' },
  { id: 'Transport', label: 'Mobility & Transit' },
  { id: 'Housing', label: 'Hostels & 3D' },
  { id: 'Dining', label: 'Dining & Mess' },
  { id: 'Facilities', label: 'Aquatics & Facilities' }
];

var PROJECTS = [
  {
    slug: 'resources',
    logo: 'abhyas.png',
    name: 'Abhyas',
    zone: 'Academics',
    category: 'Academics',
    url: 'https://abhyas.iith.online',
    github: null,
    status: 'live',
    statusNote:
      'Live at abhyas.iith.online. Browse, search and the reference shelf work; the contribution flow and the contributor leaderboard are in. The catalogue is still being filled out course by course.',
    year: '2026',
    accentColor: '#F28700',
    metric: { label: 'Departments', value: '15 mapped' },
    blurb:
      'Course materials for IIT Hyderabad in one place — lecture notes, past exam papers, assignment solutions and the reference books each course leans on, organised by course and by all 15 of the institute’s departments, with instant search.',
    highlights: [
      'Search by course code, professor or topic (⌘K)',
      'Four resource kinds — past papers, notes, assignments, reference books — each colour-coded',
      'In-browser PDF reader (pdf.js) with a dark-mode inverter',
      'Open contribution flow with a review queue and a contributor leaderboard'
    ],
    stack: ['Vanilla JS', 'pdf.js', 'PHP API', 'Lenis'],
    specs: {
      departments: '15 mapped',
      'resource kinds': 'Papers, notes, assignments, books',
      deploy: 'Auto on push'
    }
  },
  {
    slug: 'merchstore',
    logo: 'merchstore.webp',
    name: 'Merch Store',
    zone: 'Merchandise',
    category: 'Merchandise',
    url: 'https://store.iith.online',
    github: null,
    status: 'live',
    year: '2026',
    accentColor: '#8C684E',
    metric: { label: 'Club Catalogs', value: '18+ Societies' },
    blurb:
      'A dedicated merchandise store for all student clubs and societies at IIT Hyderabad — custom hoodies, t-shirts, enamel pins, tote bags, and fest apparel in one curated storefront.',
    highlights: [
      'Multi-club apparel catalog for technical, cultural, and sports societies',
      'Integrated pre-order batches and automated size allocation',
      'Direct UPI checkout with digital pickup passes',
      'Inventory management dashboard for club coordinators'
    ],
    stack: ['WordPress', 'WooCommerce', 'Dokan multivendor', 'UPI checkout'],
    specs: {
      societies: '18+ listed',
      orders: 'Count to follow'
    }
  },
  {
    slug: 'athletics',
    logo: 'athletics.png',
    name: 'IITH Athletics',
    zone: 'Sport',
    category: 'Sport',
    url: 'https://athletics.iith.online',
    github: null,
    status: 'live',
    statusNote:
      'Live on its own subdomain, redeploying automatically on every push. The repository is private, so there is no public source link.',
    year: '2026',
    started: 'Jul 2026',
    accentColor: '#38BDF8',
    metric: { label: 'Meet sheets digitised', value: '45 scanned' },
    blurb:
      'The public home of the track and field club — events, meet results, institute records, Inter-IIT and IAL archives, athlete profiles, galleries and the NSO attendance board. It replaces WhatsApp broadcasts and paper result sheets with something permanent and linkable.',
    highlights: [
      '23 pages covering events, results, records, athlete profiles and galleries',
      '45 scanned Inter-IIT and institute meet sheets digitised into a record ledger',
      '14 handwritten pages of Diesta ’26 results transcribed by hand into structured data',
      'Kinetic typography and scroll choreography built on GSAP and Lenis, vendored locally with no CDN call',
      'Seven Python generators rebuild the profile, team and result pages from the source data rather than hand-editing HTML'
    ],
    stack: ['Static HTML5', 'GSAP', 'Lenis', 'Python generators'],
    specs: {
      pages: '23 served',
      'source data': '45 meet sheets',
      'build step': 'None',
      deploy: 'Auto on push'
    },
    next: [
      'Ingest more archived championship years into the record ledger',
      'Move the NSO roster off hardcoded JS and onto the sheet the code already supports',
      'Accessibility pass across the scroll animation'
    ]
  },
  {
    slug: 'sanchari',
    logo: 'sanchari.png',
    name: 'IITH Sanchari',
    zone: 'Transport',
    category: 'Transport',
    url: 'https://sanchari.iith.online',
    github: 'https://github.com/saichandanmettu/iith-sanchari',
    status: 'live',
    statusNote:
      'Routes, schedules and live countdowns are live and in use. Ticketing is built end to end and verified server-side, but it has not been switched on — no real payment has run through it yet.',
    year: '2026',
    started: 'Jul 2026',
    accentColor: '#0EA5E9',
    metric: { label: 'Routes mapped', value: '3 routes' },
    blurb:
      'Campus mobility in a pocket. The free Main Gate to Hostel Circle shuttle, the Patancheru city route and the Miyapur metro feeder — with expandable schedules, countdowns to the next departure, and a QR boarding pass at the end of it.',
    highlights: [
      'Three routes: the free campus shuttle, Patancheru at ₹30 a seat, and Miyapur at ₹100 flat to any stop',
      '11 timed stops on the Miyapur feeder, with a From IITH / To IITH toggle that flips both route cards',
      'Departure countdowns that refresh every 15 seconds, with schedules that expand in place',
      'Fare authority lives entirely server-side — the browser is never trusted to state the price',
      'Boarding passes are signed with HMAC and checked against the server before the pass will show as valid',
      'No cookies, no analytics, no trackers — stated in the terms and true in the code'
    ],
    stack: ['HTML/CSS/JS', 'PHP', 'HMAC signing', 'Mobile-first PWA'],
    specs: {
      routes: '3 mapped',
      stops: '11 timed',
      trackers: 'None',
      source: 'Public repo'
    },
    next: [
      'Run the first genuine end-to-end transaction and switch ticketing on',
      'Real tablet and desktop breakpoints — the app is mobile-only by construction today',
      'Driver-side scan screen, so a pass can be marked used',
      'Move pass issuance onto a webhook rather than the browser callback'
    ]
  },
  {
    slug: 'nivas',
    logo: 'nivas.png',
    name: 'Nivas',
    zone: 'Housing',
    category: 'Housing',
    url: 'https://nivas.iith.online',
    github: 'https://github.com/saichandanmettu/iith-nivas',
    status: 'live',
    statusNote:
      'Live on PHP and MySQL with real student-posted listings. Open source under MIT.',
    year: '2026',
    started: 'Jul 2026',
    accentColor: '#38BDF8',
    metric: { label: 'Hostel blocks', value: '16 modelled' },
    blurb:
      'A student-built room-swap board for the hostel precinct. Orbit a 3D model of a block, walk it floor by floor across plans traced from the real architectural drawing, then post or find a swap. It makes no claim about official occupancy — a room shows a status only because a student published one.',
    highlights: [
      'All 16 hostel blocks, each with a 3D model you can orbit and slice floor by floor',
      'Floor plans traced by hand from the real architectural drawing, not approximated',
      'Room-swap listings posted by students themselves, gated behind @iith.ac.in email verification',
      'Three.js and OrbitControls vendored locally — the page pulls nothing from a CDN',
      'Prepared statements throughout, tokens hashed before storage, per-IP throttles on every write path'
    ],
    stack: ['Three.js WebGL', 'PHP', 'MySQL', 'Vanilla JS'],
    specs: {
      blocks: '16 modelled',
      identity: '@iith.ac.in',
      licence: 'MIT',
      source: 'Public repo'
    },
    next: [
      'A complaints channel for hostel maintenance — Wi-Fi, washrooms, cleaning',
      'A wider institute complaints route, once it is clear who actually receives them',
      'A moderation console, so removing a bad listing is not a manual database edit'
    ]
  },
  {
    slug: 'mess',
    logo: 'mess.svg',
    name: 'IITH Ruchi',
    zone: 'Dining',
    category: 'Dining',
    url: 'https://ruchi.iith.online',
    github: 'https://github.com/saichandanmettu/iith-mess',
    status: 'testing',
    statusNote:
      'Live at ruchi.iith.online with registration, the counter scanner and the admin console all working. Marked testing rather than live because a registration cycle has not yet been run with real students.',
    year: '2026',
    started: 'Jul 2026',
    accentColor: '#F59E0B',
    metric: { label: 'Dining halls', value: '2 halls' },
    blurb:
      'Mess registration and a daily dining companion. Registration is the front door — pick your mess and dining hall with live seat counts. The daily menu, the extras, the cuisine of the day and what it costs you in calories are what should bring people back the other twenty-nine days of the month.',
    highlights: [
      'Registration in two taps — tap to arm, tap again to confirm, with a four-second window to change your mind',
      'Live seat counts per dining hall, so a hall filling up is visible before you commit to it',
      'Counter scanner that reads the barcode already printed on the student ID card — no new card to issue',
      'Admin console for the mess office to set per-hall caps and watch registrations land',
      'Runs against seeded local data or a real Postgres backend, switched by a single config file',
      'Next: the daily menu per meal and hall, à la carte extras, cuisine tags, and calorie information'
    ],
    stack: ['HTML/CSS/JS', 'Supabase Postgres', 'Barcode scanning'],
    specs: {
      halls: '2 (UDH / LDH)',
      identity: '@iith.ac.in',
      backend: 'Seeded or Postgres',
      source: 'Public repo'
    },
    next: [
      'The daily menu screen — per meal, per dining hall. The highest-leverage thing left',
      'À la carte extras beyond the standard thali',
      'Cuisine tags per item, so today is legible at a glance',
      'Calorie and nutrition information per item'
    ]
  },
  {
    slug: 'lane1',
    logo: 'lane1.svg',
    name: 'IITH Aquatics',
    zone: 'Facilities',
    category: 'Facilities',
    url: 'https://aquatics.iith.online',
    github: null,
    status: 'live',
    statusNote:
      'The registration portal is live. Lane 1 — the poolside gate scanner that goes with it — is finished and tested but deliberately not deployed yet.',
    year: '2026',
    started: 'Jul 2026',
    accentColor: '#06B6D4',
    metric: { label: 'Fee tiers published', value: '10 tiers' },
    blurb:
      'Everything needed to get into the SNCC pool on one page: the ten-tier fee structure, slot timings, safety rules and the full sign-up flow. It signposts rather than processes — and a companion gate-scanner app that checks subscribers in at the poolside is built and waiting for a home.',
    highlights: [
      'Ten-tier fee structure broken down per category, wrapped in a guided four-step sign-up',
      'Pool timings and safety rules published in one authoritative place instead of a circulated PDF',
      'Lane 1 companion app: PIN-gated, installable to a home screen, and fully operational offline',
      'Computes membership expiry that the pool’s own records never store — chaining renewals in date order against a fee table, with grace periods and manual overrides',
      'Looks a member up by roll number from a USB barcode scanner or typed by hand at the gate'
    ],
    stack: ['Static HTML/CSS/JS', 'Google Sheets', 'Apps Script', 'Offline PWA'],
    specs: {
      'fee tiers': '10 published',
      'sign-up': '4 steps',
      companion: 'Built, not deployed',
      'build step': 'None'
    },
    next: [
      'Find Lane 1 a home and onboard the gate staff',
      'Replace the third-party payment QR with a committed static image',
      'Write down who receives the form responses and holds the accounts — it matters when whoever runs it graduates'
    ]
  }
];

/* ---- The status board -------------------------------------------------
   Three columns: planned, active building, and live shipped.
   `progress` is only ever used where it maps to a countable ratio of
   milestones, and the body text states what that ratio is. Where there is
   no honest ratio, `meta` carries a plain status phrase instead.        */
var BOARD = [
  {
    key: 'horizon',
    title: 'On the Horizon',
    sub: 'Planned & Architecture Phase',
    icon: 'compass',
    items: [
      {
        title: 'This archive on the root domain',
        date: 'Aug 2026',
        isNew: true,
        body: 'Putting this showcase on the iith.online apex, which is the parent of every project subdomain and currently still shows a hosting placeholder.',
        tags: ['Deploy', 'Apex Domain']
      },
      {
        title: 'Ruchi daily menu loop',
        date: 'Sep 2026',
        body: 'The menu, extras, cuisine tags and calorie data that turn a once-a-month registration form into something worth opening daily.',
        tags: ['Ruchi', 'Menu', 'Nutrition']
      },
      {
        title: 'Nivas complaints channels',
        date: 'Sep 2026',
        body: 'Hostel maintenance complaints — Wi-Fi, washrooms, cleaning — and a wider institute route. Blocked on a question worth answering first: who actually receives them.',
        tags: ['Nivas', 'Complaints']
      },
      {
        title: 'Driver-side pass verification',
        date: 'Sep 2026',
        body: 'A scan screen for Sanchari that checks a boarding pass against the server and marks it used, which is also what makes single-use tickets possible.',
        tags: ['Sanchari', 'Ticketing']
      },
      {
        title: 'Athletics archive expansion',
        date: 'Oct 2026',
        body: 'More archived championship years ingested into the record ledger, and the NSO roster moved off hardcoded JS onto the sheet the code already supports.',
        tags: ['Athletics', 'Archive']
      }
    ]
  },
  {
    key: 'building',
    title: 'Building Now',
    sub: 'Active Sprint & Engineering',
    icon: 'bolt',
    items: [
      {
        title: 'Ruchi — registration to daily companion',
        body: 'Three of seven planned surfaces are built: student registration, the counter scanner and the admin console. Still to come are the daily menu, à la carte extras, cuisine tags and calorie data.',
        progress: 43,
        progressNote: '3 of 7 surfaces built',
        tags: ['Ruchi', 'Dining', 'Postgres']
      },
      {
        title: 'Sanchari ticketing switch-on',
        body: 'The whole path is built — server-side fare lookup, signed pass, server-side verification. What is missing is not code: no genuine transaction has been run through it end to end yet.',
        meta: { text: 'Built · awaiting first live run', state: 'testing' },
        tags: ['Sanchari', 'Ticketing', 'QR']
      },
      {
        title: 'Lane 1 poolside deployment',
        body: 'The gate scanner is finished, including the expiry logic that chains renewals in date order with grace periods, and it has tests. It needs a home and staff onboarding.',
        meta: { text: 'Built · awaiting deployment', state: 'testing' },
        tags: ['Aquatics', 'PWA', 'Barcode']
      },
      {
        title: 'Sanchari on tablet and desktop',
        body: 'The app is mobile-only by construction — a fixed narrow column that renders as a phone-shaped strip on a laptop. Real breakpoints are the next visual job.',
        meta: { text: 'Not started', state: 'soon' },
        tags: ['Sanchari', 'Responsive']
      }
    ]
  },
  {
    key: 'shipped',
    title: 'Shipped & Live',
    sub: 'Production Systems in the Wild',
    icon: 'check',
    items: [
      {
        title: 'Abhyas goes live',
        date: 'Aug 2026',
        isNew: true,
        body: 'The course library was rebuilt with an identity of its own and shipped to abhyas.iith.online — past papers, notes, assignment solutions and a reference shelf, grouped by course across 15 departments, with an open contribution flow and a contributor leaderboard.',
        tags: ['abhyas.iith.online', 'Contribution flow']
      },
      {
        title: 'Ruchi branded, sourced and published',
        date: 'Aug 2026',
        isNew: true,
        body: 'The mess portal picked up a name, a vision document, a public repository and a subdomain of its own at ruchi.iith.online.',
        tags: ['ruchi.iith.online', 'Open source']
      },
      {
        title: 'Security review across every live project',
        date: 'Aug 2026',
        isNew: true,
        body: 'Each deployed project was audited, and every finding tracked in a KNOWN_ISSUES file that lives with the code rather than in someone’s memory.',
        tags: ['Audit', 'Engineering']
      },
      {
        title: 'Athletics portal',
        date: 'Aug 2026',
        body: 'Institute records, meet results, championship archives, athlete profiles and the NSO board, live on a custom subdomain.',
        tags: ['athletics.iith.online', 'GSAP']
      },
      {
        title: 'Nivas 3D hostel navigator',
        date: 'Jul 2026',
        body: 'A WebGL building inspector and a student room-swap board across all 16 blocks, on an auto-deploy pipeline.',
        tags: ['nivas.iith.online', 'Three.js']
      },
      {
        title: 'Sanchari campus transit',
        date: 'Jul 2026',
        body: 'Shuttle, Patancheru and Miyapur schedules with live countdowns and expandable route cards.',
        tags: ['sanchari.iith.online', 'PWA']
      },
      {
        title: 'Aquatics pool portal',
        date: 'Jul 2026',
        body: 'The ten-tier fee structure, timings, safety rules and sign-up flow for the SNCC pool, published in one place.',
        tags: ['aquatics.iith.online', 'Static']
      },
      {
        title: 'Transit terms and privacy framework',
        date: 'Jul 2026',
        body: 'Terms of transit, student privacy and payment-safety guidance written and published alongside the transit app.',
        tags: ['Compliance', 'Privacy']
      }
    ]
  }
];

/* ---- Build timeline ---------------------------------------------------
   Chronological, and deliberately including the unglamorous entries —
   consolidation and audit work is part of the record.                   */
var TIMELINE = [
  {
    date: 'Jul 2026',
    title: 'Sanchari and Nivas go live',
    body: 'Two subdomains inside the same month: campus transit schedules, and a 3D hostel navigator with real student listings on PHP and MySQL.',
    tags: ['Sanchari', 'Nivas']
  },
  {
    date: '24 Jul 2026',
    title: 'Lane 1 gate scanner begins',
    body: 'First commits on the poolside entry-verification app — barcode lookup, offline-first, and the expiry logic that computes what the pool’s own records never stored.',
    tags: ['Aquatics']
  },
  {
    date: '29 Jul 2026',
    title: 'Aquatics portal ships',
    body: 'The public-facing pool portal — fee tiers, timings, safety rules, sign-up flow — takes over the repository that started as Lane 1.',
    tags: ['Aquatics']
  },
  {
    date: '30 Jul 2026',
    title: 'Mess portal started',
    body: 'Registration flow, dining-hall allocation and per-hall capacity caps. Three separate builds were attempted; the plain-HTML one was kept for matching the rest of the stack.',
    tags: ['Ruchi']
  },
  {
    date: 'Aug 2026',
    title: 'Athletics portal ships',
    body: '23 pages of events, records, profiles and galleries, built on top of 45 digitised meet sheets and 14 hand-transcribed pages of results.',
    tags: ['Athletics']
  },
  {
    date: '19 Aug 2026',
    title: 'Consolidation and security sweep',
    body: 'Projects scattered across duplicate folders under rival names were consolidated to one folder each, audited, and given a KNOWN_ISSUES file that travels with the code.',
    tags: ['All projects']
  },
  {
    date: '19 Aug 2026',
    title: 'Ruchi named and published',
    body: 'The mess portal became IITH Ruchi, with a vision document separating the monthly registration loop from the daily menu loop, and went public on GitHub.',
    tags: ['Ruchi']
  }
];

/* ---- What runs underneath --------------------------------------------
   Which technologies are actually in use, and by which projects.        */
var STACK_MATRIX = [
  {
    tech: 'Vanilla JS, no build step',
    note: 'Every project ships the files it serves. No bundler, no framework, no compile.',
    projects: ['athletics', 'sanchari', 'nivas', 'mess', 'lane1']
  },
  {
    tech: 'PHP + MySQL',
    note: 'Server-side authority where money or real data is involved.',
    projects: ['sanchari', 'nivas']
  },
  {
    tech: 'Three.js WebGL',
    note: 'Orbitable hostel blocks, vendored locally rather than pulled from a CDN.',
    projects: ['nivas']
  },
  {
    tech: 'GSAP + Lenis',
    note: 'Kinetic typography and scroll choreography, also vendored locally.',
    projects: ['athletics']
  },
  {
    tech: 'Supabase Postgres',
    note: 'Seat caps and registrations, behind a one-file config switch.',
    projects: ['mess']
  },
  {
    tech: 'Google Sheets + Apps Script',
    note: 'A free reactive datastore where a real database would be overkill.',
    projects: ['lane1']
  },
  {
    tech: 'HMAC-signed tokens',
    note: 'Boarding passes that cannot be forged by editing the URL.',
    projects: ['sanchari']
  },
  {
    tech: 'Barcode scanning',
    note: 'Reading the card students already carry instead of issuing a new one.',
    projects: ['lane1', 'mess']
  },
  {
    tech: 'Offline-first PWA',
    note: 'Service workers, so a poolside gate keeps working when campus Wi-Fi does not.',
    projects: ['lane1']
  },
  {
    tech: 'Git auto-deploy',
    note: 'Push to main, and the live site updates itself.',
    projects: ['athletics', 'sanchari', 'nivas', 'lane1']
  }
];

/* ---- Architecture & Sustainability Breakdown -------------------------
   `amount: null` renders as an em dash. Figures that have not been
   confirmed are left null on purpose — a placeholder zero would read as
   a claim that something is free when it is not.                        */
var ARCHITECTURE = {
  headline: 'Small stack. Cheap to run.',
  subline:
    'Every project is plain HTML, CSS and JavaScript with no build step, so what ships is what was written. ' +
    'Servers only appear where something genuinely needs one.',
  pillars: [
    {
      icon: 'zap',
      title: 'No build step, anywhere',
      desc: 'No bundler and no framework on any project. The file that ships is the file that was written, which makes a four-month-old project still editable today.'
    },
    {
      icon: 'shield',
      title: 'Works when the network does not',
      desc: 'The poolside gate scanner runs fully offline through a service worker, because campus Wi-Fi at a pool gate is not something to depend on.'
    },
    {
      icon: 'cpu',
      title: 'Server-side where it counts',
      desc: 'Fares, seat caps and pass verification are decided on the server. The browser is never trusted to state a price or confirm its own ticket.'
    },
    {
      icon: 'lock',
      title: 'No trackers by default',
      desc: 'No analytics, no cookies, no third-party tracking scripts across the suite. Where a project promises that in its terms, the code actually holds to it.'
    }
  ],
  costs: {
    currency: '₹',
    totalNote: 'Annual running cost across every subdomain',
    items: [
      {
        label: 'Domain (iith.online)',
        amount: 2000,
        period: 'per year',
        note: 'Covers the apex and every project subdomain'
      },
      {
        label: 'Hosting',
        amount: null,
        period: 'per year',
        note: 'Shared plan serving all subdomains — figure to be confirmed'
      },
      {
        label: 'Everything else',
        amount: 0,
        period: 'free tier',
        note: 'Database, sheets and scripting all sit inside free allowances'
      }
    ]
  }
};
