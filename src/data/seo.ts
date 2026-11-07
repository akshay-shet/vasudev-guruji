/**
 * ─────────────────────────────────────────────────────────────
 *  SEO — titles, descriptions, keywords and structured data for every page.
 *
 *  SITE_URL must be the live address (change it when a custom domain is connected).
 *  Each page gets: <title>, meta description, keywords, canonical URL, Open Graph,
 *  Twitter card and JSON-LD. `npm run build` also writes one static HTML file per page
 *  with these tags already in place, so search engines and WhatsApp/Facebook previews
 *  see the right text even before JavaScript runs.
 * ─────────────────────────────────────────────────────────────
 */
import { homas, places, services } from './content'
import { site } from './site'

export const SITE_URL =
  (typeof process !== 'undefined' && process.env?.VITE_SITE_URL) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
  'https://vg-five-self.vercel.app'
export const BRAND = 'Vasudev Guruji'

/**
 * KEYWORD RESEARCH — what people actually type when looking for an astrologer like Guruji.
 * Grouped by search intent. Used across page titles, descriptions, keywords and headings.
 */
export const keywordGroups = {
  brand: ['Vasudev Guruji', 'Sri Vasudev Guruji', 'ವಾಸುದೇವ ಗುರೂಜಿ', 'Vasudev Guruji astrologer', 'Vasudev Guruji contact number'],
  local: [
    'astrologer near me', 'best astrologer near me', 'famous astrologer near me',
    'best astrologer in Mandya', 'astrologer in Srirangapatna', 'astrologer near Nimishamba temple',
    'best astrologer in Mysore', 'astrologer in Mysuru', 'best astrologer in Bangalore', 'astrologer in Bengaluru',
    'astrologer in Kollegal', 'astrologer in Guwahati', 'Kamakhya astrologer', 'famous astrologer in Karnataka',
    'Kannada astrologer', 'ಜ್ಯೋತಿಷಿ ಮಂಡ್ಯ', 'ಶ್ರೀರಂಗಪಟ್ಟಣ ಜ್ಯೋತಿಷಿ', 'ಮೈಸೂರು ಜ್ಯೋತಿಷಿ', 'ಬೆಂಗಳೂರು ಜ್ಯೋತಿಷಿ',
  ],
  online: [
    'best astrologer online', 'online astrologer', 'talk to astrologer', 'astrologer phone number',
    'astrologer WhatsApp number', 'astrology consultation online', 'live astrologer chat', 'call astrologer now',
    'video call astrologer', 'ask astrologer a question', 'ಆನ್‌ಲೈನ್ ಜ್ಯೋತಿಷಿ',
  ],
  horoscope: [
    'horoscope reading', 'accurate horoscope reading', 'birth chart reading', 'kundli reading', 'janam kundali',
    'jathaka', 'jataka reading', 'jathaka nodu', 'vedic astrology', 'jyotish', 'dasha prediction', 'sade sati remedies',
    'life prediction by date of birth', 'detailed horoscope book', 'life line horoscope', 'ಜಾತಕ', 'ಕುಂಡಲಿ', 'ಜಾತಕ ಫಲ',
  ],
  marriage: [
    'marriage matching', 'kundli matching', 'kundali milan', 'guna milan', 'horoscope matching for marriage',
    'jathaka matching', 'ashtakoota', '36 gunas', 'manglik dosha', 'marriage delay remedies', 'marriage problem solution',
    'love problem solution', 'husband wife problem solution', 'ಮದುವೆ ಜಾತಕ ಹೊಂದಾಣಿಕೆ', 'ಗುಣ ಮಿಲನ', 'ವಿವಾಹ ಹೊಂದಾಣಿಕೆ',
  ],
  life: [
    'career astrology', 'job problem astrology', 'government job astrology', 'business problem solution astrology',
    'financial problem astrology', 'property astrology', 'health astrology remedies', 'life problem solution astrologer',
    'family problem solution', 'astrology remedies',
  ],
  protection: [
    'black magic removal', 'black magic specialist', 'negative energy removal', 'evil eye remedy', 'drishti dosha',
    'ಮಾಟ ಮಂತ್ರ ನಿವಾರಣೆ', 'ದೃಷ್ಟಿ ದೋಷ ಪರಿಹಾರ',
  ],
  vastu: ['vastu expert', 'vastu consultant', 'vastu for home', 'vastu shastra consultant Mysore', 'vastu dosha remedies', 'ವಾಸ್ತು ತಜ್ಞರು', 'ವಾಸ್ತು ಶಾಸ್ತ್ರ'],
  homa: [
    'homa booking', 'homam booking online', 'havan puja', 'Ganapathi homa', 'Navagraha homa', 'Maha Mrityunjaya homa',
    'Sudarshana homa', 'Chandi homa', 'Lakshmi Kubera homa', 'Vastu homa', 'dosha nivarana puja', 'ಹೋಮ', 'ಹವನ',
  ],
  products: ['gemstone recommendation', 'astrology gemstones', 'rudraksha', 'original rudraksha', 'Shri Yantra', 'Navagraha Yantra', 'puja items', 'ರತ್ನ', 'ರುದ್ರಾಕ್ಷಿ'],
  learning: ['mantras with meaning', 'Gayatri mantra', 'Maha Mrityunjaya mantra', 'japa mala 108', 'rashi chakra', 'zodiac signs Vedic', 'spiritual discourses'],
}

export interface PageSeo { title: string; description: string; keywords: string[]; image?: string; type?: 'website' | 'profile' | 'product' | 'article' }

const IMG = {
  hero: '/img/hero-desktop.jpg',
  portrait: '/img/guruji-portrait.jpg',
  book: '/img/lifeline-poster.jpg',
  centre: '/img/kollegala-centre.jpg',
}

const k = keywordGroups

/** Static pages. Titles stay under ~60 characters and descriptions under ~160 where possible. */
export const pageSeo: Record<string, PageSeo> = {
  '/': {
    title: 'Vasudev Guruji — Best Astrologer in Mandya, Mysuru & Online',
    description: 'Vasudev Guruji — trusted Vedic astrologer at Srirangapatna, Mandya. Accurate horoscope reading, marriage matching, homa, vastu and remedies. Call or WhatsApp +91 90359 59911.',
    keywords: [...k.brand.slice(0, 3), 'best astrologer in Mandya', 'astrologer in Srirangapatna', 'best astrologer in Mysore', 'best astrologer online', 'astrologer near me', 'horoscope reading', 'kundli matching', 'vastu expert', 'black magic removal', 'homa booking', 'ಜ್ಯೋತಿಷಿ'],
    image: IMG.hero,
  },
  '/about': {
    title: 'About Vasudev Guruji — Vedic Astrologer, Srirangapatna',
    description: 'Meet Vasudev Guruji — a Vedic astrologer and spiritual guide devoted to Jyotisha, the Bhagavad Gita and dharma, guiding families from Srirangapatna, Mandya and online.',
    keywords: ['Vasudev Guruji', 'about Vasudev Guruji', 'Vedic astrologer Karnataka', 'famous astrologer in Karnataka', 'spiritual guru Srirangapatna', 'Kannada astrologer', 'jyotish'],
    image: IMG.portrait, type: 'profile',
  },
  '/life-line-horoscope': {
    title: 'Life Line Horoscope Book — 80–100 Page Life Prediction',
    description: 'Life Line Horoscope by Vasudev Guruji — a personal 80–100 page book on personality, marriage, career, wealth, health and yearly predictions from your birth chart. Order on WhatsApp.',
    keywords: ['life line horoscope', 'detailed horoscope book', 'horoscope book', 'life prediction by date of birth', 'janam kundali book', 'yearly prediction', 'full life horoscope', 'Vasudev Guruji book'],
    image: IMG.book, type: 'product',
  },
  '/services': {
    title: 'Astrology Services — Horoscope, Marriage, Career, Vastu',
    description: 'All astrology services by Vasudev Guruji: online consultation, horoscope reading, kundli matching, career, love, business, property, health, gemstones, black magic removal and vastu.',
    keywords: ['astrology services', 'astrologer consultation', ...k.life.slice(0, 6), 'marriage matching', 'vastu expert', 'black magic removal', 'gemstone recommendation'],
    image: IMG.hero,
  },
  '/homa': {
    title: 'Homa & Havan Booking — Ganapathi, Navagraha, Mrityunjaya',
    description: 'Book Vedic homas performed by Vasudev Guruji — Ganapathi, Navagraha Shanti, Maha Mrityunjaya, Sudarshana, Lakshmi Kubera, Chandi and more, with sankalpa in your name. At Srirangapatna or online.',
    keywords: k.homa, image: '/img/homa/ganapathi-homa.jpg',
  },
  '/kundali-matching': {
    title: 'Kundli Matching & Guna Milan Calculator — 36 Gunas',
    description: 'Free Guna Milan (Ashtakoota kundli matching) calculator for marriage — check all 8 kootas and 36 gunas, Nadi and Bhakoot dosha, then get a full horoscope matching from Vasudev Guruji.',
    keywords: k.marriage.slice(0, 12), image: IMG.hero,
  },
  '/shop': {
    title: 'Rudraksha, Yantras, Gemstones & Puja Items — Sacred Shop',
    description: 'Energised rudraksha malas, Shri Yantra, Navagraha Yantra, certified gemstones and puja items from Vasudev Guruji’s office. Gemstones suggested only after a chart reading. Enquire on WhatsApp.',
    keywords: k.products, image: IMG.hero,
  },
  '/events': {
    title: 'Events, Satsangs & Festivals with Vasudev Guruji',
    description: 'Upcoming satsangs, festivals, retreats and courses with Vasudev Guruji — Kartika Deepotsava, Gita Jayanti, Vaikuntha Ekadashi, Maha Shivaratri and more, at the ashram and online.',
    keywords: ['spiritual events Mysore', 'satsang Srirangapatna', 'Maha Shivaratri puja', 'Gita Jayanti', 'Vedic astrology course online', 'Vasudev Guruji events'],
    image: IMG.hero,
  },
  '/gallery': {
    title: 'Gallery — Photos & Videos of Vasudev Guruji',
    description: 'Photos and videos of Vasudev Guruji — discourses, interviews, the Samruddhi Astro Center at Srirangapatna and the Life Line Horoscope book.',
    keywords: ['Vasudev Guruji photos', 'Vasudev Guruji videos', 'astrologer interview', 'spiritual discourse video', 'Samruddhi Astro Center'],
    image: IMG.portrait,
  },
  '/mantras': {
    title: 'Mantras with Meaning, Japa Mala 108 & Light a Diya',
    description: 'Sacred mantras with meaning — Gayatri, Maha Mrityunjaya, Shanti and more — with a 108-bead japa counter and a light-a-diya practice, shared by Vasudev Guruji.',
    keywords: k.learning, image: IMG.hero,
  },
  '/contact': {
    title: 'Contact Vasudev Guruji — Call, WhatsApp, Address & Timings',
    description: 'Contact Vasudev Guruji: call or WhatsApp +91 90359 59911, srivasudevguruji@gmail.com. Near Sri Nimishamba Temple, Ganjam, Srirangapatna, Mandya 571438. Daily 10 AM – 6 PM.',
    keywords: ['Vasudev Guruji contact number', 'astrologer phone number', 'astrologer WhatsApp number', 'astrologer in Srirangapatna address', 'astrologer near Nimishamba temple', 'best astrologer in Mandya', 'astrologer in Bengaluru', 'astrologer in Kollegal', 'astrologer in Guwahati'],
    image: IMG.centre,
  },
  '/legal/privacy': { title: 'Privacy Policy — Vasudev Guruji', description: 'How Vasudev Guruji’s website handles your enquiry details, language and theme preferences.', keywords: [] },
  '/legal/terms': { title: 'Terms & Conditions — Vasudev Guruji', description: 'Terms for using Vasudev Guruji’s website and consultations.', keywords: [] },
  '/legal/disclaimer': { title: 'Disclaimer — Vasudev Guruji', description: 'Vedic astrology offers spiritual guidance and is not a substitute for medical, legal or financial advice.', keywords: [] },
}

/** Per-service SEO for /services/:slug — the service keyword plus local intent. */
const serviceExtra: Record<string, string[]> = {
  'best-astrologer-online': ['online astrologer', 'talk to astrologer', 'video call astrologer', 'astrology consultation online'],
  'horoscope-reading': ['birth chart reading', 'kundli reading', 'jathaka reading', 'dasha prediction'],
  'vedic-astrology-services': ['vedic astrology', 'jyotish', 'muhurta', 'prashna', 'sade sati remedies'],
  'live-chat-call': ['astrologer phone number', 'astrologer WhatsApp number', 'call astrologer now', 'live astrologer chat'],
  'career-job': ['career astrology', 'job problem astrology', 'government job astrology', 'foreign settlement astrology'],
  'love-relationships': ['love problem solution', 'relationship problem astrologer', 'husband wife problem solution'],
  'marriage-matching': ['kundli matching', 'guna milan', 'horoscope matching for marriage', 'manglik dosha', 'marriage delay remedies'],
  'business-finance': ['business problem solution astrology', 'financial problem astrology', 'business astrology'],
  'wealth-property': ['property astrology', 'land dispute astrology', 'house purchase muhurta'],
  'health-wellbeing': ['health astrology remedies', 'Maha Mrityunjaya remedy', 'health problems astrology'],
  'gemstone-recommendation': ['gemstone recommendation', 'astrology gemstones', 'which gemstone should I wear', 'rudraksha'],
  'life-problems': ['life problem solution astrologer', 'family problem solution', 'astrology remedies'],
  'black-magic-removal': ['black magic removal', 'negative energy removal', 'evil eye remedy', 'drishti dosha', 'ಮಾಟ ಮಂತ್ರ ನಿವಾರಣೆ'],
  'vastu-expert': ['vastu expert', 'vastu consultant', 'vastu for home', 'vastu dosha remedies', 'ವಾಸ್ತು ತಜ್ಞರು'],
}

export function serviceSeo(slug: string): PageSeo | undefined {
  const s = services.find((x) => x.slug === slug)
  if (!s) return undefined
  return {
    title: s.title.length > 40 ? `${s.title} — Vasudev Guruji` : `${s.title} — Vasudev Guruji, Mandya`,
    description: `${s.title} by Vasudev Guruji, Srirangapatna (Mandya) & online. ${s.desc} Call/WhatsApp +91 90359 59911.`,
    keywords: [s.title, s.kn, ...(serviceExtra[slug] ?? []), 'Vasudev Guruji', 'astrologer in Mandya', 'astrologer in Mysuru'],
    image: IMG.hero,
  }
}

/** All crawlable paths (used for the sitemap and the static per-page HTML). */
export const allPaths = [
  ...Object.keys(pageSeo),
  ...services.map((s) => `/services/${s.slug}`),
]

export function seoFor(path: string): PageSeo {
  const clean = path.replace(/\/+$/, '') || '/'
  if (clean.startsWith('/services/')) return serviceSeo(clean.split('/')[2]) ?? pageSeo['/services']
  return pageSeo[clean] ?? pageSeo['/']
}

/* ───────── Structured data (JSON-LD) ───────── */
const abs = (p: string) => (p.startsWith('http') ? p : SITE_URL + p)

const orgId = SITE_URL + '/#astrologer'
const personId = SITE_URL + '/#vasudev-guruji'

const business = {
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': orgId,
  name: BRAND,
  alternateName: ['ವಾಸುದೇವ ಗುರೂಜಿ', 'Sri Vasudev Guruji', 'Samruddhi Astro Center'],
  description: 'Vedic astrologer offering horoscope reading, marriage matching, homa, vastu and remedies at Srirangapatna, Mandya and online.',
  url: SITE_URL,
  telephone: '+91-90359-59911',
  email: site.email,
  image: abs(IMG.portrait),
  logo: abs('/favicon.svg'),
  priceRange: '₹₹',
  address: { '@type': 'PostalAddress', streetAddress: 'Near Sri Nimishambha Temple Dasoha Bhavan, Ganjam', addressLocality: 'Srirangapatna', addressRegion: 'Karnataka', postalCode: '571438', addressCountry: 'IN' },
  hasMap: places.find((p) => p.main)?.map,
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '10:00', closes: '18:00' }],
  areaServed: ['Srirangapatna', 'Mandya', 'Mysuru', 'Bengaluru', 'Kollegal', 'Guwahati', 'Karnataka', 'India', 'Worldwide (online)'].map((name) => ({ '@type': 'Place', name })),
  knowsLanguage: ['en', 'kn', 'te', 'ta', 'ml', 'mr', 'hi'],
  founder: { '@id': personId },
  sameAs: Object.values(site.social).filter((u) => u.split('/').filter(Boolean).length > 2),
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'Astrology services',
    itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, url: `${SITE_URL}/services/${s.slug}` } })),
  },
  department: places.filter((p) => !p.main).map((p) => ({ '@type': 'Place', name: `${BRAND} — ${p.city}`, address: { '@type': 'PostalAddress', addressLocality: p.city, addressRegion: p.state, addressCountry: 'IN' }, hasMap: p.map })),
}

const person = {
  '@type': 'Person', '@id': personId, name: BRAND, alternateName: 'ವಾಸುದೇವ ಗುರೂಜಿ',
  jobTitle: 'Vedic Astrologer', image: abs(IMG.portrait), url: SITE_URL + '/about', worksFor: { '@id': orgId },
  knowsAbout: ['Vedic astrology', 'Jyotisha', 'Kundali matching', 'Vastu Shastra', 'Homa', 'Bhagavad Gita'],
}

const website = { '@type': 'WebSite', '@id': SITE_URL + '/#website', url: SITE_URL, name: BRAND, inLanguage: ['en', 'kn'], publisher: { '@id': orgId } }

const crumbName: Record<string, string> = { about: 'About Guruji', 'life-line-horoscope': 'The Book', services: 'Services', homa: 'Homa', 'kundali-matching': 'Guna Milan', shop: 'Shop', events: 'Events', gallery: 'Gallery', mantras: 'Resources', contact: 'Contact', legal: 'Legal' }

function breadcrumbs(path: string) {
  const parts = path.split('/').filter(Boolean)
  const items = [{ name: 'Home', url: SITE_URL + '/' }]
  parts.forEach((p, i) => {
    const url = SITE_URL + '/' + parts.slice(0, i + 1).join('/')
    const name = parts[0] === 'services' && i === 1 ? services.find((s) => s.slug === p)?.title ?? p : crumbName[p] ?? p
    items.push({ name, url })
  })
  return { '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })) }
}

/** JSON-LD graph for a page. `faq` is passed in by the app (questions shown in the chat). */
export function jsonLdFor(path: string, faq: { q: string; a: string }[] = []) {
  const clean = path.replace(/\/+$/, '') || '/'
  const seo = seoFor(clean)
  const graph: Record<string, unknown>[] = [website, business, person]
  graph.push({ '@type': seo.type === 'profile' ? 'ProfilePage' : 'WebPage', '@id': SITE_URL + clean + '#page', url: SITE_URL + clean, name: seo.title, description: seo.description, isPartOf: { '@id': SITE_URL + '/#website' }, about: { '@id': orgId }, primaryImageOfPage: seo.image ? abs(seo.image) : undefined })
  if (clean !== '/') graph.push(breadcrumbs(clean))
  if (clean === '/' && faq.length) {
    graph.push({ '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })
  }
  if (clean === '/life-line-horoscope') {
    graph.push({ '@type': 'Product', name: 'Life Line Horoscope — personal horoscope book', image: abs(IMG.book), brand: { '@type': 'Brand', name: BRAND }, description: seo.description,
      offers: { '@type': 'Offer', price: '499', priceCurrency: 'INR', availability: 'https://schema.org/InStock', url: SITE_URL + clean, seller: { '@id': orgId } } })
  }
  if (clean.startsWith('/services/')) {
    const s = services.find((x) => x.slug === clean.split('/')[2])
    if (s) graph.push({ '@type': 'Service', name: s.title, alternateName: s.kn, description: s.about, provider: { '@id': orgId }, areaServed: business.areaServed, serviceType: 'Astrology consultation', url: SITE_URL + clean })
  }
  if (clean === '/homa') {
    graph.push({ '@type': 'ItemList', name: 'Homas performed by Vasudev Guruji', itemListElement: homas.map((h, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Service', name: h.name, description: h.desc, provider: { '@id': orgId } } })) })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}
