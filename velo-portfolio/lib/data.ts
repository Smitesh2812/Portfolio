export interface Project {
  id: string;
  slug: string;
  category: string;
  name: string;
  tagline: string;
  image: string;
  heroImage: string;
  tags: string[];
  result: string;
  stats: { value: string; label: string }[];
  overview: string;
  problem: string;
  solution: string;
  outcome: string;
  url: string;
  featured: boolean;
  color: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
}

export interface Service {
  id: string;
  icon: string;
  name: string;
  description: string;
  features: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "pilgrim-sands-hotel",
    category: "Hotel & Hospitality",
    name: "Pilgrim Sands Hotel",
    tagline: "Booking-Optimized Hotel Experience",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80",
    heroImage: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=80",
    tags: ["Next.js", "Tailwind", "Booking Engine", "SEO"],
    result: "+47% direct bookings in 60 days",
    stats: [
      { value: "+47%", label: "Direct Bookings" },
      { value: "99/100", label: "PageSpeed Score" },
      { value: "0.8s", label: "Load Time" },
    ],
    overview:
      "Pilgrim Sands Hotel needed a modern, conversion-focused website to reduce OTA dependency and drive direct bookings. The previous site was slow, dated, and losing revenue to commission-heavy platforms.",
    problem:
      "The hotel was paying 15–25% commission on every OTA booking. The old website had a 78% bounce rate and an average booking funnel completion of just 4%.",
    solution:
      "Rebuilt the entire stack in Next.js with a custom booking flow, immersive room galleries, trust signals, and real-time availability. Added local SEO and a loyalty program landing page.",
    outcome:
      "Direct bookings jumped 47% within 60 days, reducing OTA dependency by 30%. The site now consistently scores 99/100 on PageSpeed and ranks #1 for branded search terms.",
    url: "https://www.pilgrimsandsma.com/",
    featured: true,
    color: "#00E5CC",
  },
  {
    id: "2",
    slug: "blue-spruce-motel",
    category: "Hospitality",
    name: "Blue Spruce Motel",
    tagline: "Clean, Responsive Motel Website",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1400&q=80",
    tags: ["React", "CSS3", "PWA", "Responsive"],
    result: "99/100 PageSpeed · Mobile-first rebuild",
    stats: [
      { value: "99", label: "PageSpeed Score" },
      { value: "0.7s", label: "Load Time" },
      { value: "100%", label: "Mobile Optimized" },
    ],
    overview:
      "Blue Spruce Motel required a clean, fast, and trustworthy web presence that reflected the property character and made booking effortless across all devices.",
    problem:
      "Existing website was built on an outdated CMS, loading in 8+ seconds on mobile. Guests were calling to book because the online process was too confusing.",
    solution:
      "Complete React rebuild as a Progressive Web App. Simplified booking flow to 3 steps. Mobile-first responsive design with offline capability.",
    outcome:
      "PageSpeed score went from 34 to 99. Phone bookings dropped 60% as guests switched to online. Bounce rate reduced from 72% to 31%.",
    url: "https://www.bluesprucema.com/",
    featured: true,
    color: "#8B5CF6",
  },
  {
    id: "3",
    slug: "earl-of-sandwich",
    category: "Restaurant & F&B",
    name: "Earl of Sandwich",
    tagline: "Restaurant UI with Menu Optimization",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80",
    tags: ["Vue.js", "GSAP", "CMS", "Menu UX"],
    result: "+28% avg online order value",
    stats: [
      { value: "+28%", label: "Avg Order Value" },
      { value: "+65%", label: "Online Orders" },
      { value: "3.2s", label: "Avg Session" },
    ],
    overview:
      "Earl of Sandwich needed a complete digital menu overhaul to encourage higher-value orders and streamline the online ordering experience for their growing customer base.",
    problem:
      "The old menu was a PDF download. Zero upsell logic, no filtering, difficult to update. Online orders were 12% of revenue — far below industry average.",
    solution:
      "Built an interactive digital menu with smart upsell prompts, dietary filters, and high-quality food photography. Integrated with their existing POS via a headless CMS.",
    outcome:
      "Online orders now represent 41% of revenue. Average order value increased 28%. Staff time spent on phone orders reduced by 70%.",
    url: "https://www.earlofsandwich.com/",
    featured: true,
    color: "#F59E0B",
  },
  {
    id: "4",
    slug: "river-edge-inn",
    category: "Boutique Hotel",
    name: "River Edge Inn",
    tagline: "Modern Boutique Hotel Interface",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1400&q=80",
    tags: ["Next.js", "Framer Motion", "Vercel", "TypeScript"],
    result: "Immersive UI · Vercel Edge deployed",
    stats: [
      { value: "100ms", label: "TTFB (Edge)" },
      { value: "4.9★", label: "UX Rating" },
      { value: "+38%", label: "Session Duration" },
    ],
    overview:
      "River Edge Inn is a boutique property that needed a digital experience matching the warmth and character of the physical space — modern yet inviting, fast yet beautiful.",
    problem:
      "The property had unique charm but their website felt generic. Guests couldn't feel the experience before arriving, leading to lower conversion from browse to book.",
    solution:
      "Built with Next.js App Router on Vercel Edge for <100ms global response times. Framer Motion animations create immersive room walkthroughs. Custom photo galleries per room type.",
    outcome:
      "Session duration increased 38%. Conversion rate doubled from 2.1% to 4.3%. The site became a direct selling tool — guests often mention the website in reviews.",
    url: "https://river-edge-inn.vercel.app/",
    featured: false,
    color: "#F43F5E",
  },
  {
    id: "5",
    slug: "neel-core-international",
    category: "Corporate & Branding",
    name: "Neel Core International",
    tagline: "Corporate Identity & Web Presence",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
    tags: ["React", "Sanity CMS", "Brand Strategy", "TypeScript"],
    result: "Full brand + digital launch in 6 weeks",
    stats: [
      { value: "6 weeks", label: "Full Launch" },
      { value: "12+", label: "Pages Delivered" },
      { value: "98", label: "Lighthouse Score" },
    ],
    overview:
      "Neel Core International required a complete corporate identity and digital presence for their international business launch — credible, professional, and built for growth.",
    problem:
      "No existing brand identity or digital footprint. Needed to establish credibility with enterprise clients in multiple countries within a tight timeline.",
    solution:
      "Built a comprehensive corporate website with Sanity CMS for easy content management, multilingual-ready architecture, and a brand system that scales across all touchpoints.",
    outcome:
      "Launched on time with full brand identity, corporate website, and CMS. Secured two enterprise clients within the first month citing the website as a trust factor.",
    url: "https://www.neelcoreinternational.com/",
    featured: false,
    color: "#00E5CC",
  },
  {
    id: "6",
    slug: "prada-hotels",
    category: "Luxury Hospitality",
    name: "Prada Hotels",
    tagline: "Ultra-Luxury Hotel Web Design",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    heroImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80",
    tags: ["Next.js", "Three.js", "GSAP", "WebGL"],
    result: "Award-worthy luxury digital experience",
    stats: [
      { value: "3D", label: "WebGL Effects" },
      { value: "+52%", label: "Avg Stay Value" },
      { value: "5★", label: "UX Rating" },
    ],
    overview:
      "Prada Hotels demanded the absolute pinnacle of luxury web design — an experience that would match their five-star physical properties and command premium pricing.",
    problem:
      "The brand was competing on the same platforms as mid-tier hotels. The website needed to visually justify their premium pricing and attract high-net-worth guests directly.",
    solution:
      "Crafted a fully custom luxury experience with Three.js WebGL effects, GSAP scroll animations, and cinematic video. Every micro-interaction engineered to feel opulent.",
    outcome:
      "Average booking value increased 52%. The site won recognition in design communities. High-net-worth direct bookings increased significantly, reducing reliance on luxury travel agents.",
    url: "https://pradahotels.us/",
    featured: false,
    color: "#8B5CF6",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The redesign directly transformed our revenue stream. Direct bookings jumped 47% — it paid for itself within the first month.",
    author: "Sarah Mitchell",
    role: "General Manager",
    company: "Pilgrim Sands Hotel",
    initials: "SM",
    rating: 5,
  },
  {
    quote:
      "Incredible attention to detail. Our site now loads under a second and looks stunning on every device. Guests constantly compliment it.",
    author: "James Teller",
    role: "Owner",
    company: "Blue Spruce Motel",
    initials: "JT",
    rating: 5,
  },
  {
    quote:
      "They understood our F&B brand deeply. The menu UX overhaul is now our single highest-converting channel.",
    author: "Priya Kapoor",
    role: "Marketing Director",
    company: "Earl of Sandwich",
    initials: "PK",
    rating: 5,
  },
  {
    quote:
      "The River Edge Inn site feels genuinely premium. Guests tell us the website convinced them to book. That's rare.",
    author: "David Reeves",
    role: "COO",
    company: "River Edge Inn",
    initials: "DR",
    rating: 5,
  },
  {
    quote:
      "From zero to a full corporate presence in 6 weeks. Professional, fast, and always responsive to our needs.",
    author: "Arun Nair",
    role: "CEO",
    company: "Neel Core International",
    initials: "AN",
    rating: 5,
  },
  {
    quote:
      "The Prada Hotels site is unlike anything I've seen in our industry. It's a work of art that also converts.",
    author: "Maria Lucchini",
    role: "Brand Director",
    company: "Prada Hotels",
    initials: "ML",
    rating: 5,
  },
];

export const services: Service[] = [
  {
    id: "design",
    icon: "✦",
    name: "Web Design",
    description:
      "Award-worthy interfaces engineered to convert. Every pixel serves your bottom line.",
    features: [
      "Custom UI/UX Design",
      "Brand Identity Systems",
      "Design Systems & Components",
      "Prototype & Wireframing",
    ],
  },
  {
    id: "dev",
    icon: "⚡",
    name: "Web Development",
    description:
      "Lightning-fast, scalable builds. Next.js, React, Node — zero compromise on performance.",
    features: [
      "Next.js / React",
      "Serverless & Edge Functions",
      "API Development (Node.js)",
      "Headless CMS Integration",
    ],
  },
  {
    id: "ux",
    icon: "◈",
    name: "UI/UX Strategy",
    description:
      "Data-driven user journeys that reduce friction and maximize conversions at every touchpoint.",
    features: [
      "Conversion Rate Optimization",
      "User Research & Testing",
      "Funnel Analysis",
      "A/B Testing Frameworks",
    ],
  },
  {
    id: "perf",
    icon: "◎",
    name: "Performance Optimization",
    description:
      "Core Web Vitals mastery. Sub-second loads that search engines and users both love.",
    features: [
      "Core Web Vitals Audit",
      "Image & Asset Optimization",
      "Edge Caching Strategy",
      "SEO Architecture",
    ],
  },
];
