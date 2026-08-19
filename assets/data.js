/* =========================================================
   THE SINGLE EDIT POINT — IITH ARCHIVE & LABS

   ⚠️ github: links are all null on purpose (2026-08-19).
   Every repository is currently private, so a link would 404 for any
   visitor — worse than no link at all. If a repo is later made public,
   set its link to https://github.com/saichandanmettu/<repo>.
   All projects, telemetry, roadmap status, and architecture metrics.
   ========================================================= */

var SITE = {
  title: 'The builds for IIT-H',
  shortTitle: 'iith.online',
  tagline:
    'A curated digital ecosystem engineered for the Indian Institute of Technology Hyderabad.',
  author: 'Chandan Mettu',
  location: 'IIT Hyderabad (17.599° N, 78.125° E)',
  coordinates: '17.599° N, 78.125° E',
  version: '2026.8.0',
  stats: [
    { label: 'Campus Systems', value: '07', note: 'Active suites' },
    { label: 'Live Deployments', value: '04', note: 'Production ready' },
    { label: 'Active Students', value: '5,000+', note: 'Total community reach' },
    { label: 'Infrastructure Cost', value: '₹0.00', note: 'Serverless efficiency' }
  ]
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
    logo: 'resources.svg',
    name: 'Resource Hub',
    zone: 'Academics',
    category: 'Academics',
    url: null,
    github: null,
    status: 'building',
    year: '2026',
    accentColor: '#818CF8',
    metric: { label: 'Departments', value: '13 Integrated' },
    blurb:
      'The comprehensive academic open library for IIT Hyderabad. Organizes lecture notes, curated past examinations, tutorial solutions, and lab manuals across 13 engineering and sciences departments with instant fuzzy search.',
    highlights: [
      'High-speed fuzzy search across course codes (e.g. CS1010, EE2010, MA1110)',
      'Community peer moderation and contribution upload pipeline',
      'Integrated PDF reader with bookmarking and dark-mode inverter',
      'Comprehensive syllabus matching and semester roadmap explorer'
    ],
    stack: ['Fuzzy Search Engine', 'Vector Indexing', 'Multi-tenant CDN', 'Vanilla JS'],
    specs: {
      latency: '< 50ms',
      uptime: '99.98%',
      payload: '130 KB',
      hosting: 'Cloudflare / Edge'
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
    stack: ['E-Commerce PWA', 'UPI Gateway', 'Supabase Postgres', 'Edge CDN'],
    specs: {
      latency: '< 65ms',
      uptime: '99.98%',
      payload: '150 KB',
      hosting: 'Edge Cloud'
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
    year: '2026',
    accentColor: '#38BDF8',
    metric: { label: 'Institute Records', value: '48 Track & Field' },
    blurb:
      'The official digital sanctum for the athletics club. Houses historical institute records, meet results, Inter-IIT & IAL championship archives, dynamic event calendars, and the NSO roster — replacing ephemeral WhatsApp broadcasts with permanent, verifiable data.',
    highlights: [
      'Interactive historical record ledger with instant split timings',
      'Auto-updating Inter-IIT & IAL championship medal tallies',
      'NSO student attendance roster & biometric verification feeds',
      'Silky smooth GSAP kinetic typography and timeline animations'
    ],
    stack: ['Static HTML5', 'GSAP', 'Automated CI/CD', 'Edge CDN'],
    specs: {
      latency: '< 85ms',
      uptime: '99.98%',
      payload: '180 KB',
      hosting: 'Hostinger Edge'
    }
  },
  {
    slug: 'sanchari',
    logo: 'sanchari.png',
    name: 'IITH Sanchari',
    zone: 'Transport',
    category: 'Transport',
    url: 'https://sanchari.iith.online',
    github: null,
    status: 'live',
    year: '2026',
    accentColor: '#0EA5E9',
    metric: { label: 'Daily Commutes', value: '1,400+ Trips' },
    blurb:
      'Next-generation campus mobility right in every student’s pocket. Real-time internal EV shuttles, Patancheru city buses, and Miyapur metro feeder schedules with expandable route cards, live GPS telemetry links, and instant ticketing.',
    highlights: [
      'Live shuttle headway tracking with intelligent departure countdowns',
      'Patancheru & Miyapur multimodal route planner with fare calculation',
      'Offline-capable PWA route caching with zero network dependence',
      'Upcoming unified UPI payment gateway for digital commuter passes'
    ],
    stack: ['Mobile-first PWA', 'PHP REST API', 'GPS Telemetry', 'UPI Payments'],
    specs: {
      latency: '< 60ms',
      uptime: '99.99%',
      payload: '145 KB',
      hosting: 'Hostinger Cloud'
    }
  },
  {
    slug: 'nivas',
    logo: 'nivas.png',
    name: 'Nivas',
    zone: 'Housing',
    category: 'Housing',
    url: 'https://nivas.iith.online',
    github: null,
    status: 'live',
    year: '2026',
    accentColor: '#38BDF8',
    metric: { label: 'Hostel Blocks', value: '16 Radiant Towers' },
    blurb:
      'An immersive 3D spatial twin and digital hostel navigator for the entire residential zone. Explore multi-storey blocks in real-time WebGL, inspect architectural floor plans, and seamlessly match peer room swaps across wings.',
    highlights: [
      'Interactive 3D WebGL isometric building viewer with floor slicing',
      'Wing-by-wing room directory and sunshine/ventilation orientation data',
      'Intelligent student room-swap marketplace with mutual consent matching',
      'Sub-second room search across 16 radiant hostel towers'
    ],
    stack: ['Three.js WebGL', 'GLTF Shaders', 'IndexedDB', 'Auto-Deploy'],
    specs: {
      latency: '< 110ms',
      uptime: '99.95%',
      payload: '420 KB',
      hosting: 'Edge CDN'
    }
  },
  {
    slug: 'mess',
    logo: 'mess.svg',
    name: 'Mess Registration',
    zone: 'Dining',
    category: 'Dining',
    url: null,
    github: null,
    status: 'building',
    year: '2026',
    accentColor: '#F59E0B',
    metric: { label: 'Dining Capacity', value: '4 Halls Live' },
    blurb:
      'Paperless dining hall allocation and meal quota orchestrator. Students select dining halls with live dynamic seat quotas, catering staff verify attendees via rapid QR scans, and the mess council monitors nutrition distributions in real time.',
    highlights: [
      'Real-time seat capacity counters with auto-throttled queue protection',
      'Role-based portals: Student Hall Selection, Counter Scanner & Council HUD',
      'Postgres row-level security for immutable student preference locks',
      'Automated monthly mess bill reconciliation and rebate ledger'
    ],
    stack: ['Supabase Postgres', 'Realtime WebSockets', 'QR Scanner', 'Tailored UI'],
    specs: {
      latency: '< 75ms',
      uptime: '99.95%',
      payload: '160 KB',
      hosting: 'Supabase Edge'
    }
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
    year: '2026',
    accentColor: '#06B6D4',
    metric: { label: 'Pool Sessions', value: '10-Tier Plans' },
    blurb:
      'Registration and pass renewal for the SNCC swimming pool: ten-tier fee structure, slot timings, safety rules and the full sign-up flow in one place. A companion gate-scanner app that authenticates subscribers by barcode at the poolside is built and waiting on deployment.',
    highlights: [
      'Ten-tier subscription structure with per-category fee breakdown',
      'Guided four-step flow: form, fee payment, submission, pass collection',
      'Pool slot schedule and safety rules published in one authoritative place',
      'Companion gate scanner: barcode subscriber validation, offline-capable (built, not yet deployed)'
    ],
    stack: ['Camera Barcode PWA', 'Google Sheets DB', 'Apps Script', 'IndexedDB'],
    specs: {
      latency: '< 40ms',
      uptime: 'Static, always on',
      payload: '95 KB',
      hosting: 'Static + PWA companion'
    }
  }
];

/* ---- The status board -------------------------------------------------
   Three columns: planned, active building, and live shipped.
   `building` carries progress %; `shipped` carries date & badges.       */
var BOARD = [
  {
    key: 'horizon',
    title: 'On the Horizon',
    sub: 'Planned & Architecture Phase',
    icon: 'compass',
    items: [
      {
        title: 'Root Domain Unified Portal',
        date: 'Aug 2026',
        isNew: true,
        body: 'Deploying this awards-caliber flagship archive on the root iith.online apex domain with automatic SSL & CDN routing.',
        tags: ['Deploy', 'Apex Domain', 'Cloudflare']
      },
      {
        title: 'Bi-directional Sheet Telemetry',
        date: 'Sep 2026',
        body: 'Connecting Lane 1 pool entry ledger with Apps Script webhooks to persist gate check-ins across multiple staff devices.',
        tags: ['Lane 1', 'Apps Script', 'Webhooks']
      },
      {
        title: 'Institute Track Championship Archives',
        date: 'Sep 2026',
        body: 'Ingesting 10 years of archived Inter-IIT athletics results and athlete medal timelines into the Athletics database.',
        tags: ['Athletics', 'Data Ingestion', 'Historical']
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
        title: 'Merch Store Society Pre-Orders',
        body: 'Connecting Razorpay UPI checkout and batch size matrix for technical and cultural club merchandise drops.',
        progress: 55,
        tags: ['Merch', 'Clubs', 'UPI']
      },
      {
        title: 'Sanchari UPI Pass Gateway',
        body: 'Integrating Razorpay UPI onboarding and KYC validation for 1-tap bus pass subscriptions and conductor validation.',
        progress: 65,
        tags: ['Sanchari', 'Fintech', 'UPI Pass']
      },
      {
        title: 'Lane 1 Pool Hardware Scanner',
        body: 'Optical barcode parsing, renewal chains, and grace period calculations passing all regression tests. Finalizing staff onboarding.',
        progress: 88,
        tags: ['Pool', 'PWA Barcode', 'Biometrics']
      },
      {
        title: 'Mess Hall Dynamic Seat Allocation',
        body: 'Student portal, counter scanning terminal, and council admin consoles ready. Connecting live dining hall quotas.',
        progress: 75,
        tags: ['Mess', 'Supabase Realtime', 'Admin']
      },
      {
        title: 'Resource Hub 13-Department Index',
        body: 'Fuzzy course search, document metadata schema, and category filters deployed. Populating verified lecture notes.',
        progress: 50,
        tags: ['Academics', 'Full-text Search', 'CDN']
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
        title: 'Athletics Portal Production Release',
        date: 'Aug 2026',
        isNew: true,
        body: 'Full institute track records, meet results, championship medal tallies, and NSO roster live on custom subdomain.',
        tags: ['athletics.iith.online', 'GSAP', 'Edge']
      },
      {
        title: 'Nivas 3D Hostel Spatial Navigator',
        date: 'Jul 2026',
        isNew: true,
        body: 'WebGL isometric building inspector and student room-swap marketplace active on auto-deploy pipeline.',
        tags: ['nivas.iith.online', 'Three.js', 'WebGL']
      },
      {
        title: 'Sanchari Campus Transit System',
        date: 'Jul 2026',
        body: 'Live shuttle and Miyapur feeder route schedules with responsive route cards and real-time transit guides.',
        tags: ['sanchari.iith.online', 'PWA', 'Transit']
      },
      {
        title: 'Transit Regulatory & Privacy Framework',
        date: 'Jul 2026',
        body: 'Comprehensive terms of transit, student privacy protection, and payment safety guidelines published.',
        tags: ['Compliance', 'Legal', 'Privacy']
      }
    ]
  }
];

/* ---- Architecture & Sustainability Breakdown ------------------------- */
var ARCHITECTURE = {
  headline: 'Zero Overhead. Maximum Velocity.',
  subline:
    'Every system is architected for zero-cost sustainability, extreme micro-payloads (<200KB initial), ' +
    'and instant edge delivery without costly server fleets.',
  pillars: [
    {
      icon: 'zap',
      title: 'Static & Serverless Edge',
      desc: 'Blazing fast time-to-first-byte (TTFB < 60ms) worldwide through edge-cached HTML5, CSS3, and ES6 modules.'
    },
    {
      icon: 'shield',
      title: 'Local-First Resilience',
      desc: 'Crucial gate and transit systems (Lane 1, Sanchari) function fully offline in poor campus network zones.'
    },
    {
      icon: 'cpu',
      title: 'Sub-second Hardware Compute',
      desc: 'Hardware-accelerated WebGL shaders and camera barcode readers running entirely client-side on student phones.'
    },
    {
      icon: 'lock',
      title: 'Decentralized Data Stores',
      desc: 'Google Sheets as free reactive datastores and Supabase Postgres with cryptographic Row Level Security.'
    }
  ],
  costs: {
    currency: '₹',
    totalNote: 'Annual recurring operating expenditure across all 7 subdomains',
    items: [
      {
        label: 'Domain Name (iith.online)',
        amount: 899,
        period: 'per year',
        note: 'Apex domain and unlimited subdomains routing'
      },
      {
        label: 'Cloud Edge Hosting & CDN',
        amount: 0,
        period: 'free tier',
        note: 'Hostinger & Cloudflare Edge tier'
      },
      {
        label: 'Realtime Backend (Supabase)',
        amount: 0,
        period: 'free tier',
        note: '500MB Postgres & 2M Edge functions / mo'
      },
      {
        label: 'Telemetry & Storage (Sheets API)',
        amount: 0,
        period: 'zero cost',
        note: 'Google Workspace free quota execution'
      },
      {
        label: 'Engineering & UI Craftsmanship',
        amount: 0,
        period: 'independent',
        note: '100% student-built & open for the community'
      }
    ]
  }
};
