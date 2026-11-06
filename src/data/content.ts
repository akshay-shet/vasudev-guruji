import type { Topic } from './site'

export interface NavItem { label: string; hi: string; to: string; children?: { label: string; hi: string; to: string }[] }

export const nav: NavItem[] = [
  { label: 'Home', hi: 'ಮುಖಪುಟ', to: '/' },
  { label: 'About Guruji', hi: 'ಗುರೂಜಿ ಬಗ್ಗೆ', to: '/about' },
  { label: 'The Book', hi: 'ಪುಸ್ತಕ', to: '/life-line-horoscope' },
  { label: 'Services', hi: 'ಸೇವೆಗಳು', to: '/services' },
  { label: 'Homa', hi: 'ಹೋಮ', to: '/homa' },
  { label: 'Guna Milan', hi: 'ಗುಣ ಮಿಲನ', to: '/kundali-matching' },
  { label: 'Shop', hi: 'ಅಂಗಡಿ', to: '/shop' },
  { label: 'Events', hi: 'ಕಾರ್ಯಕ್ರಮಗಳು', to: '/events' },
  { label: 'Gallery', hi: 'ಗ್ಯಾಲರಿ', to: '/gallery' },
  { label: 'Resources', hi: 'ಸಂಪನ್ಮೂಲಗಳು', to: '/mantras' },
  { label: 'Contact', hi: 'ಸಂಪರ್ಕ', to: '/contact' },
]

export interface Service {
  slug: string
  topic: Topic
  /** Short name — banner title, enquiry topic and homepage box */
  short: string
  /** Full service name (SEO keyword, English) */
  title: string
  /** The same keyword in Kannada — always shown as “English — Kannada” */
  kn: string
  /** Small red label above the title */
  label: string
  icon: string
  /** One-line summary on the card */
  desc: string
  /** Paragraph on the service page */
  about: string
  points: string[]
}

export const services: Service[] = [
  { slug: 'best-astrologer-online', topic: 'Online Consultation', short: 'Online Consultation', title: 'Best Astrologer Online', kn: 'ಅತ್ಯುತ್ತಮ ಆನ್‌ಲೈನ್ ಜ್ಯೋತಿಷಿ', label: 'Online Astrologer', icon: 'globe',
    desc: 'Consult Guruji from anywhere in the world by video or phone, with the same care as an in-person visit.',
    about: 'Wherever you live, you can consult Guruji online. Share your birth details on WhatsApp, choose a time, and receive a full reading by video or phone call, followed by the remedies in writing.',
    points: ['Video or phone consultation', 'Birth chart prepared before the call', 'Remedies sent in writing afterwards'] },
  { slug: 'horoscope-reading', topic: 'Horoscope Reading', short: 'Horoscope Reading', title: 'Accurate Horoscope Reading', kn: 'ನಿಖರ ಜಾತಕ ಫಲ ವಿಶ್ಲೇಷಣೆ', label: 'Jathaka Reading', icon: 'book',
    desc: 'A complete reading of your birth chart — where you stand in your dasha now and what the coming years hold.',
    about: 'Guruji studies your Lagna, the nine grahas, the divisional charts and your running Vimshottari dasha to explain the patterns in your life and the periods ahead, with simple remedies.',
    points: ['Lagna, grahas and houses explained', 'Current and coming dasha periods', 'Simple, practical remedies'] },
  { slug: 'vedic-astrology-services', topic: 'Vedic Astrology', short: 'Vedic Astrology', title: 'Vedic Astrology Services', kn: 'ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ ಸೇವೆಗಳು', label: 'Vedic Astrologer', icon: 'sun',
    desc: 'Classical Parashari Jyotisha for every question — muhurta, prashna, transits and remedies.',
    about: 'Rooted in classical Parashari Jyotisha, Guruji offers muhurta for important beginnings, prashna for urgent questions, transit guidance and traditional remedies through mantra, puja and seva.',
    points: ['Muhurta for auspicious beginnings', 'Prashna for urgent questions', 'Transit and Sade Sati guidance'] },
  { slug: 'live-chat-call', topic: 'Live Chat & Call', short: 'Live Chat & Call', title: 'Live Astrologer Chat & Call', kn: 'ಜ್ಯೋತಿಷಿಯೊಂದಿಗೆ ನೇರ ಚಾಟ್ ಮತ್ತು ಕರೆ', label: 'Live Consultation', icon: 'phone',
    desc: 'Talk to Guruji’s office right away on WhatsApp or phone and book a live session.',
    about: 'Need guidance quickly? Message or call Guruji’s office during office hours. Your question is noted and a live chat or call with Guruji is arranged at the earliest available time.',
    points: ['Quick reply on WhatsApp', 'Live call with Guruji', 'Same-day slots when available'] },
  { slug: 'career-job', topic: 'Career & Job', short: 'Career & Job', title: 'Career & Job Astrology Prediction', kn: 'ವೃತ್ತಿ ಮತ್ತು ಉದ್ಯೋಗ ಜ್ಯೋತಿಷ್ಯ ಭವಿಷ್ಯ', label: 'Career Astrologer', icon: 'briefcase',
    desc: 'Job change, government exams, going abroad, a promotion that never comes.',
    about: 'Through the 10th house, the Dashamsha (D10) chart and your current dasha, Guruji shows which work suits you, when change is favourable, and how to remove obstacles in your career.',
    points: ['Right field and timing for change', 'Government jobs and exams', 'Foreign travel and settlement'] },
  { slug: 'love-relationships', topic: 'Love & Relationships', short: 'Love & Relationships', title: 'Love & Relationship Astrology Solutions', kn: 'ಪ್ರೀತಿ ಮತ್ತು ಸಂಬಂಧ ಜ್ಯೋತಿಷ್ಯ ಪರಿಹಾರಗಳು', label: 'Love Astrologer', icon: 'heart',
    desc: 'A relationship stuck in fights, facing family opposition, or already broken.',
    about: 'Guruji reads Venus, the Moon and the 5th and 7th houses of both partners to understand the misunderstandings, and gives remedies to bring back harmony and family acceptance.',
    points: ['Understanding both charts', 'Family acceptance and harmony', 'Remedies to heal misunderstandings'] },
  { slug: 'marriage-matching', topic: 'Marriage Matching', short: 'Marriage Matching', title: 'Marriage Matching & Kundali Milan', kn: 'ವಿವಾಹ ಹೊಂದಾಣಿಕೆ ಮತ್ತು ಕುಂಡಲಿ ಮಿಲನ', label: 'Marriage Astrologer', icon: 'rings',
    desc: 'Kundali matching before you say yes, and a close look when marriage keeps getting delayed.',
    about: 'A full Ashtakoota Guna Milan with Mangal Dosha, Navamsha and dasha compatibility — and for delayed marriage, the reasons in the chart and the remedies to remove them.',
    points: ['36 Guna Milan and doshas', 'Reasons for delay in marriage', 'Muhurta for the wedding'] },
  { slug: 'business-finance', topic: 'Business & Finance', short: 'Business & Finance', title: 'Business & Financial Growth Astrology', kn: 'ವ್ಯಾಪಾರ ಮತ್ತು ಆರ್ಥಿಕ ಪ್ರಗತಿ ಜ್ಯೋತಿಷ್ಯ', label: 'Business Astrologer', icon: 'coins',
    desc: 'Partnerships, loans, a shop that isn’t moving, money that won’t stay.',
    about: 'Guruji studies the 2nd, 10th and 11th houses and dhana yogas to guide new ventures, partnerships, investments and the right time to expand, with remedies for financial stability.',
    points: ['Business and partnership timing', 'Debt relief and stability', 'Name and muhurta for new ventures'] },
  { slug: 'wealth-property', topic: 'Wealth & Property', short: 'Wealth & Property', title: 'Wealth & Property Astrology Guidance', kn: 'ಸಂಪತ್ತು ಮತ್ತು ಆಸ್ತಿ ಜ್ಯೋತಿಷ್ಯ ಮಾರ್ಗದರ್ಶನ', label: 'Property Astrologer', icon: 'house',
    desc: 'Buying land or a house, property disputes, family inheritance.',
    about: 'The 4th house, Mars and Saturn show matters of land, house and vehicles. Guruji guides you on when to buy or sell, and on resolving property disputes peacefully.',
    points: ['Right time to buy or sell', 'Property and family disputes', 'Vehicle and house purchase'] },
  { slug: 'health-wellbeing', topic: 'Health & Well-being', short: 'Health & Well-being', title: 'Health & Well-being Astrological Remedies', kn: 'ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮಕ್ಕಾಗಿ ಜ್ಯೋತಿಷ್ಯ ಪರಿಹಾರಗಳು', label: 'Health Astrology', icon: 'leaf',
    desc: 'Which periods need extra care. Always alongside your doctor, never in place of one.',
    about: 'Guruji looks at the Lagna, the 6th and 8th houses and running dashas to show periods that need care, and suggests mantra, routine and diet. Always continue your doctor’s treatment.',
    points: ['Periods that need extra care', 'Mantra, routine and diet', 'Always alongside medical treatment'] },
  { slug: 'gemstone-recommendation', topic: 'Gemstone Recommendation', short: 'Gemstones', title: 'Gemstone Recommendation Services', kn: 'ರತ್ನ ಶಿಫಾರಸು ಸೇವೆಗಳು', label: 'Gemstone Consultant', icon: 'gem',
    desc: 'The right gemstone, weight and day to wear it — only after studying your chart.',
    about: 'A wrong gemstone can harm as much as the right one helps. Guruji checks your chart before recommending any stone, its weight, metal, finger and the day and mantra for wearing it.',
    points: ['Chart-based recommendation', 'Weight, metal and finger', 'Day and mantra for wearing'] },
  { slug: 'life-problems', topic: 'Life Problems', short: 'Life Problems', title: 'Trusted Astrologer for Life Problems', kn: 'ಜೀವನದ ಸಮಸ್ಯೆಗಳಿಗೆ ನಂಬಿಕಸ್ಥ ಜ್ಯೋತಿಷಿ', label: 'Life Guidance', icon: 'meditate',
    desc: 'When nothing seems to work out — family worries, stress, repeated setbacks.',
    about: 'Some problems don’t fit one category. Bring all your worries to Guruji — he listens patiently, reads your chart as a whole and guides you step by step with faith and practical advice.',
    points: ['Patient, confidential guidance', 'Whole-chart reading', 'Step-by-step remedies'] },
  { slug: 'black-magic-removal', topic: 'Black Magic Removal', short: 'Black Magic Removal', title: 'Black Magic Removal', kn: 'ಮಾಟ-ಮಂತ್ರ ನಿವಾರಣೆ', label: 'Negative Energy Removal', icon: 'shield',
    desc: 'Repeated bad luck, nazar, or a feeling that something is working against you.',
    about: 'Spiritual protection through Sudarshana and Hanuman upasana, home purification and traditional rituals for peace of mind. All remedies are sattvic — no harm is ever done to anyone.',
    points: ['Spiritual assessment', 'Protective mantras and kavacha', 'Home and workplace purification'] },
  { slug: 'vastu-expert', topic: 'Vastu', short: 'Vastu Expert', title: 'Vastu Expert', kn: 'ವಾಸ್ತು ತಜ್ಞರು', label: 'Vastu Consultant', icon: 'compass',
    desc: 'Before you buy, build or move in — and when a house just doesn’t feel right.',
    about: 'Guruji studies the plan and directions of your home, shop or office and suggests corrections, often without demolition, so that the space supports health, peace and prosperity.',
    points: ['Home, shop and office Vastu', 'Corrections without demolition', 'Griha pravesha muhurta'] },
]

export interface EventItem { title: string; date: string; end?: string; place: string; type: string; description: string }

export const events: EventItem[] = [
  { title: 'Kartika Deepotsava & Satsang', date: '2026-11-15T18:00:00+05:30', place: 'Ashram main hall', type: 'Festival', description: 'Evening of 1,008 diyas, bhajans and a discourse on the light within.' },
  { title: 'Gita Jayanti — Full Bhagavad Gita Parayana', date: '2026-12-20T07:00:00+05:30', place: 'Ashram & live online', type: 'Discourse', description: 'Collective chanting of all 18 chapters followed by Guruji’s talk on Chapter 7, “Vasudevah sarvam iti”.' },
  { title: 'Vaikuntha Ekadashi Sadhana Retreat', date: '2026-12-29T05:30:00+05:30', end: '2026-12-31', place: 'Himalayan retreat centre', type: 'Retreat', description: 'Three days of silence, japa, meditation and evening satsang.' },
  { title: 'Makara Sankranti Surya Puja', date: '2027-01-14T06:30:00+05:30', place: 'Ashram', type: 'Puja', description: 'Surya Namaskara, Aditya Hridayam chanting and til-gud prasad.' },
  { title: 'Maha Shivaratri Night Vigil', date: '2027-03-06T18:00:00+05:30', place: 'Ashram & live online', type: 'Festival', description: 'Four prahara abhishekam, Rudram chanting and meditation through the night.' },
  { title: 'Jyotisha Foundations Course (Online)', date: '2027-01-25T19:00:00+05:30', place: 'Online — Zoom', type: 'Course', description: '8-week weekend course: rashis, nakshatras, grahas and reading your own chart.' },
]

export interface Product { id: string; name: string; category: 'Rudraksha' | 'Yantras' | 'Gemstones' | 'Puja Items'; description: string; emoji: string }

export const products: Product[] = [
  { id: 'r5', name: '5 Mukhi Rudraksha Mala (108+1)', category: 'Rudraksha', description: 'Energised mala for daily japa. Ruled by Jupiter; brings calm and focus.', emoji: '📿' },
  { id: 'r1', name: '1 Mukhi Rudraksha (Half-moon)', category: 'Rudraksha', description: 'Sacred to Lord Shiva; for meditation and inner strength.', emoji: '🟤' },
  { id: 'r7', name: '7 Mukhi Rudraksha', category: 'Rudraksha', description: 'Associated with Mahalakshmi; supports prosperity.', emoji: '🟤' },
  { id: 'y1', name: 'Shri Yantra (Copper, 4")', category: 'Yantras', description: 'Prana-pratishtha done copper Shri Yantra for home altar.', emoji: '🔱' },
  { id: 'y2', name: 'Navagraha Yantra', category: 'Yantras', description: 'For balancing the nine planets; place facing east.', emoji: '✴️' },
  { id: 'y3', name: 'Sudarshana Yantra', category: 'Yantras', description: 'Protection from negative energies.', emoji: '☸️' },
  { id: 'g1', name: 'Yellow Sapphire (Pukhraj)', category: 'Gemstones', description: 'Natural, certified. Wear only after chart consultation.', emoji: '💛' },
  { id: 'g2', name: 'Pearl (Moti)', category: 'Gemstones', description: 'Natural, certified. For the Moon; wear only after consultation.', emoji: '⚪' },
  { id: 'g3', name: 'Emerald (Panna)', category: 'Gemstones', description: 'Natural, certified. For Mercury; wear only after consultation.', emoji: '💚' },
  { id: 'p1', name: 'Brass Deepa (Pair)', category: 'Puja Items', description: 'Traditional brass samai lamps for the home altar.', emoji: '🪔' },
  { id: 'p2', name: 'Puja Thali Set', category: 'Puja Items', description: 'Brass thali with bell, kalash, diya and kumkum holders.', emoji: '🛕' },
  { id: 'p3', name: 'Pure Sandalwood Agarbatti', category: 'Puja Items', description: 'Hand-rolled incense, 100 sticks.', emoji: '🌿' },
]

export interface Discourse { title: string; series: string; duration: string; youtubeId: string; description: string }

export const discourses: Discourse[] = [
  { title: 'The Science of Inner Peace', series: 'Satsang', duration: '56:20', youtubeId: '', description: 'How the restless mind becomes still through abhyasa and vairagya (Gita 6.35).' },
  { title: 'Vasudevah Sarvam Iti — Seeing God in All', series: 'Bhagavad Gita', duration: '48:05', youtubeId: '', description: 'A reflection on Gita 7.19 and the vision of the great soul.' },
  { title: 'Karma, Destiny & Free Will in Jyotisha', series: 'Jyotisha', duration: '1:02:14', youtubeId: '', description: 'What the chart shows, what it does not, and the role of self-effort.' },
  { title: 'The Power of Japa', series: 'Sadhana', duration: '39:42', youtubeId: '', description: 'Why 108? How to choose and chant a mantra with devotion.' },
  { title: 'Understanding Sade Sati', series: 'Jyotisha', duration: '44:10', youtubeId: '', description: 'Saturn’s 7½-year transit — fears, facts and remedies.' },
  { title: 'Seva as Worship', series: 'Satsang', duration: '35:55', youtubeId: '', description: 'Service to humanity as the highest form of puja.' },
]

export interface Mantra { name: string; text: string; meaning: string; source: string }

export const mantras: Mantra[] = [
  { name: 'Gayatri Mantra', text: 'ಓಂ ಭೂರ್ಭುವಃ ಸ್ವಃ । ತತ್ಸವಿತುರ್ವರೇಣ್ಯಂ ಭರ್ಗೋ ದೇವಸ್ಯ ಧೀಮಹಿ । ಧಿಯೋ ಯೋ ನಃ ಪ್ರಚೋದಯಾತ್ ॥', meaning: 'We meditate on the glorious light of the divine Savitr; may it illumine our intellect.', source: 'Rig Veda 3.62.10' },
  { name: 'Dvadashakshari Mantra', text: 'ಓಂ ನಮೋ ಭಗವತೇ ವಾಸುದೇವಾಯ', meaning: 'Salutations to Bhagavan Vasudeva, the indweller of all beings.', source: 'Bhagavata Purana' },
  { name: 'Maha Mrityunjaya Mantra', text: 'ಓಂ ತ್ರ್ಯಮ್ಬಕಂ ಯಜಾಮಹೇ ಸುಗನ್ಧಿಂ ಪುಷ್ಟಿವರ್ಧನಮ್ । ಉರ್ವಾರುಕಮಿವ ಬನ್ಧನಾನ್ಮೃತ್ಯೋರ್ಮುಕ್ಷೀಯ ಮಾಽಮೃತಾತ್ ॥', meaning: 'We worship the three-eyed One who nourishes all; may He free us from death as the ripe cucumber from its vine, not from immortality.', source: 'Rig Veda 7.59.12' },
  { name: 'Panchakshari Mantra', text: 'ಓಂ ನಮಃ ಶಿವಾಯ', meaning: 'Salutations to Shiva, the auspicious one.', source: 'Yajur Veda (Sri Rudram)' },
  { name: 'Shanti Mantra', text: 'ಓಂ ಸರ್ವೇ ಭವನ್ತು ಸುಖಿನಃ । ಸರ್ವೇ ಸನ್ತು ನಿರಾಮಯಾಃ । ಸರ್ವೇ ಭದ್ರಾಣಿ ಪಶ್ಯನ್ತು । ಮಾ ಕಶ್ಚಿದ್ದುಃಖಭಾಗ್ಭವೇತ್ ॥', meaning: 'May all be happy, may all be free from illness, may all see auspiciousness, may none suffer.', source: 'Traditional peace prayer' },
  { name: 'Lokah Samastah', text: 'ಲೋಕಾಃ ಸಮಸ್ತಾಃ ಸುಖಿನೋ ಭವನ್ತು', meaning: 'May all beings in all the worlds be happy.', source: 'Traditional benediction' },
]

export interface Review { name: string; place: string; rating: number; text: string; topic: string; sample: boolean }

/** Replace these with real testimonials and set sample: false. */
export const reviews: Review[] = [
  { name: 'Ananya', place: 'Bengaluru', rating: 5, topic: 'Marriage', text: 'We came in very tense about our Kundali match because two people had already told us "no". Guruji sat with both families for almost an hour, explained what the Nadi dosha actually means and why it was cancelled in our case. My mother finally smiled. Wedding is fixed for Magha!', sample: true },
  { name: 'Rakesh', place: 'Hyderabad', rating: 5, topic: 'Career', text: 'Honestly I went only because my wife insisted. Guruji didn\'t promise me anything big, just said be patient till Jupiter changes sign and keep doing the Gayatri every morning. Got the transfer I wanted in April. Still doing the japa.', sample: true },
  { name: 'Lakshmi amma', place: 'Chennai', rating: 5, topic: 'Satsang', text: 'I attend the Thursday satsang every week. At my age I don\'t understand everything in the Gita, but the way Guruji tells it with small stories from daily life, it stays in the mind. I come home lighter.', sample: true },
  { name: 'Suresh', place: 'Pune', rating: 4, topic: 'Education', text: 'My son was confused between commerce and science. Reading was clear and practical — Guruji even said "don\'t force him, his Mercury is strong, let him try design also". Only thing, waiting time for appointment was nearly two weeks.', sample: true },
  { name: 'Kavya', place: 'Dubai', rating: 5, topic: 'Finance', text: 'Did an online consultation from Dubai. Office replied on WhatsApp within an hour and the video call ran properly. Guruji noted down everything and sent the remedies in a message after. Very simple remedies, nothing expensive.', sample: true },
  { name: 'Mahesh', place: 'Mysuru', rating: 5, topic: 'Retreat', text: 'Three days of silence at the Ekadashi retreat. First day was hard, my mind would not stop. By the third morning I sat for 40 minutes without noticing. Simple food, kind volunteers. Going again in December.', sample: true },
  { name: 'Priya', place: 'Mumbai', rating: 5, topic: 'Health', text: 'Guruji was very clear that I must continue my doctor\'s treatment. He only gave a Mrityunjaya japa and some routine changes. That honesty is why I trust him. Recovery has been good, by God\'s grace.', sample: true },
  { name: 'Venkat', place: 'Vijayawada', rating: 5, topic: 'Peace at Home', text: 'There was constant quarrelling at home after we shifted. Guruji did a small shanti puja and asked us to light a diya every evening together as a family. Maybe it is the puja, maybe it is sitting together — but the house feels different now.', sample: true },
]

export const tiles = [
  { icon: 'lotus', label: 'Spiritual', label2: 'Discourses', hi: 'ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರವಚನ', to: '/gallery' },
  { icon: 'book', label: 'Scriptures', label2: '& Wisdom', hi: 'ಶಾಸ್ತ್ರ ಮತ್ತು ಜ್ಞಾನ', to: '/mantras' },
  { icon: 'meditate', label: 'Life', label2: 'Guidance', hi: 'ಜೀವನ ಮಾರ್ಗದರ್ಶನ', to: '/contact' },
  { icon: 'seva', label: 'Seva', label2: '(Service to Society)', hi: 'ಸೇವೆ', to: '/events', small: true },
  { icon: 'mountain', label: 'Retreats', label2: '& Sadhana', hi: 'ಸಾಧನಾ ಶಿಬಿರ', to: '/events' },
  { icon: 'calendar', label: 'Events', label2: '& Programs', hi: 'ಕಾರ್ಯಕ್ರಮಗಳು', to: '/events' },
  { icon: 'people', label: 'Community', label2: '& Learning', hi: 'ಸಮುದಾಯ ಮತ್ತು ಕಲಿಕೆ', to: '/kundali-matching' },
] as const

/* ───────── Homas (sacred fire rituals) ───────── */
export type HomaEmblem = 'lakshmi' | 'sudarshana' | 'ganapathi' | 'mrityunjaya' | 'navagraha' | 'vastu' | 'santana' | 'dhanvantari' | 'aghora' | 'shatru' | 'pratyangira' | 'chandi'
export interface Homa { slug: string; emoji: string; name: string; kn: string; deity: string; desc: string; benefits: string[]; when: string; emblem: HomaEmblem; hue: string }

export const homas: Homa[] = [
  { slug: 'maha-lakshmi-kubera-homa', emoji: '💰', name: 'Maha Lakshmi & Kubera Homa', kn: 'ಮಹಾಲಕ್ಷ್ಮೀ ಮತ್ತು ಕುಬೇರ ಹೋಮ', deity: 'Goddess Mahalakshmi and Lord Kubera', emblem: 'lakshmi', hue: '#C0392B',
    desc: 'Invokes Goddess Mahalakshmi and Lord Kubera, the guardian of wealth, for prosperity and lasting abundance.',
    benefits: ['Steady income and prosperity', 'Relief from debts and losses', 'Growth in business and savings'], when: 'Fridays, Deepavali and Akshaya Tritiya' },
  { slug: 'maha-sudarshana-homa', emoji: '🛡️', name: 'Maha Sudarshana Homa', kn: 'ಮಹಾ ಸುದರ್ಶನ ಹೋಮ', deity: 'Lord Sudarshana, the divine discus of Vishnu', emblem: 'sudarshana', hue: '#1F5FA8',
    desc: 'Invokes Lord Sudarshana, the blazing discus of Lord Vishnu, as a powerful shield for the family and home.',
    benefits: ['Protection from negative energies and evil eye', 'Relief from enemies and obstacles', 'Good health and peace at home'], when: 'Ekadashi, and before moving into a new home' },
  { slug: 'ganapathi-homa', emoji: '🎯', name: 'Ganapathi Homa', kn: 'ಗಣಪತಿ ಹೋಮ', deity: 'Lord Ganapathi, the remover of obstacles', emblem: 'ganapathi', hue: '#D35400',
    desc: 'Performed first before any new beginning, so that Lord Ganapathi removes every obstacle from the path.',
    benefits: ['Removes obstacles in work and life', 'Success in new ventures', 'Clarity, wisdom and good beginnings'], when: 'Sankashti Chaturthi, and before any new venture' },
  { slug: 'maha-mrityunjaya-homa', emoji: '🏥', name: 'Maha Mrityunjaya Homa', kn: 'ಮಹಾ ಮೃತ್ಯುಂಜಯ ಹೋಮ', deity: 'Lord Shiva as Mrityunjaya, the conqueror of death', emblem: 'mrityunjaya', hue: '#5B4B8A',
    desc: 'Chanting of the Maha Mrityunjaya mantra into the sacred fire for health, healing and long life.',
    benefits: ['Health and faster recovery', 'Long life and protection', 'Freedom from fear and anxiety'], when: 'Mondays, Pradosha and birthdays' },
  { slug: 'navagraha-shanti-homa', emoji: '💼', name: 'Navagraha Shanti Homa', kn: 'ನವಗ್ರಹ ಶಾಂತಿ ಹೋಮ', deity: 'The nine grahas', emblem: 'navagraha', hue: '#2E6E62',
    desc: 'Offerings to all nine grahas to calm difficult planetary periods and strengthen the favourable ones.',
    benefits: ['Calms graha doshas and Sade Sati', 'Smoother dasha periods', 'Balance in career, health and family'], when: 'During a difficult dasha or Sade Sati, and on birthdays' },
  { slug: 'vastu-purusha-homa', emoji: '🏡', name: 'Vastu Purusha Homa', kn: 'ವಾಸ್ತು ಪುರುಷ ಹೋಮ', deity: 'Vastu Purusha, the spirit of the land and dwelling', emblem: 'vastu', hue: '#8E5A1E',
    desc: 'Honours Vastu Purusha to purify a new home, office or plot and correct vastu doshas.',
    benefits: ['Removes vastu doshas', 'Peace and positive energy in the home', 'Blessings for a new house or business'], when: 'Griha Pravesha, Bhoomi Puja and opening of a new office' },
  { slug: 'santana-gopala-homa', emoji: '👶', name: 'Santana Gopala Homa', kn: 'ಸಂತಾನ ಗೋಪಾಲ ಹೋಮ', deity: 'Lord Santana Gopala, child Krishna', emblem: 'santana', hue: '#2B7BB9',
    desc: 'Prayers to child Krishna as Santana Gopala for couples seeking the blessing of children.',
    benefits: ['Blessing of healthy children', 'Safe pregnancy and childbirth', 'Well-being of the children in the family'], when: 'Thursdays, Rohini nakshatra and Krishna Janmashtami' },
  { slug: 'dhanvantari-homa', emoji: '🌿', name: 'Dhanvantari Homa', kn: 'ಧನ್ವಂತರಿ ಹೋಮ', deity: 'Lord Dhanvantari, the divine physician', emblem: 'dhanvantari', hue: '#2F7D3A',
    desc: 'Worship of Lord Dhanvantari, the father of Ayurveda, for healing and strength of body and mind.',
    benefits: ['Healing and good health', 'Strength during treatment and recovery', 'Wellness for the whole family'], when: 'Dhanteras and Ekadashi' },
  { slug: 'aghora-homa', emoji: '🔱', name: 'Aghora Homa', kn: 'ಅಘೋರ ಹೋಮ', deity: 'Lord Aghora Rudra, the fierce and compassionate form of Shiva', emblem: 'aghora', hue: '#3B3B4F',
    desc: 'Invokes Aghora Rudra, the fierce yet compassionate form of Lord Shiva, to burn away deep negativity.',
    benefits: ['Removes black magic and negative forces', 'Freedom from fear and bad dreams', 'Inner strength and protection'], when: 'Amavasya and Pradosha' },
  { slug: 'shatru-samhara-homa', emoji: '⚔️', name: 'Shatru Samhara Homa', kn: 'ಶತ್ರು ಸಂಹಾರ ಹೋಮ', deity: 'Lord Subrahmanya, who holds the divine Vel', emblem: 'shatru', hue: '#B03A2E',
    desc: 'Worship of Lord Subrahmanya with his Vel to overcome enemies, rivalry and court cases.',
    benefits: ['Victory over enemies and rivals', 'Success in court cases', 'Courage and confidence'], when: 'Shashti and Tuesdays' },
  { slug: 'pratyangira-devi-homa', emoji: '🦁', name: 'Pratyangira Devi Homa', kn: 'ಪ್ರತ್ಯಂಗಿರಾ ದೇವಿ ಹೋಮ', deity: 'Goddess Pratyangira, the lion-faced Divine Mother', emblem: 'pratyangira', hue: '#7A1F1F',
    desc: 'Invokes the lion-faced Goddess Pratyangira, the most powerful shield against evil intentions.',
    benefits: ['Reverses black magic and evil eye', 'Protection from hidden enemies', 'Courage and spiritual strength'], when: 'Amavasya and Sundays' },
  { slug: 'chandi-homa', emoji: '🌺', name: 'Chandi Homa (Durga Saptashati Homa)', kn: 'ಚಂಡೀ ಹೋಮ (ದುರ್ಗಾ ಸಪ್ತಶತೀ ಹೋಮ)', deity: 'Goddess Chandi (Durga)', emblem: 'chandi', hue: '#C2185B',
    desc: 'All 700 verses of the Durga Saptashati are offered into the fire to invoke the Divine Mother Chandi.',
    benefits: ['Victory over every obstacle', 'Protection and courage', 'Fulfilment of sincere wishes'], when: 'Navaratri, Ashtami and Fridays' },
]

/* ───────── Locations where Guruji is available ───────── */
export interface Place { slug: string; city: string; kn: string; state: string; address?: string; map: string; main?: boolean; /** Temple the centre is at / near */ note: string }
export const places: Place[] = [
  { slug: 'mandya', city: 'Mandya', kn: 'ಮಂಡ್ಯ', state: 'Karnataka', main: true,
    address: 'Near Sri Nimishambha Temple Dasoha Bhavan, Ganjam, Srirangapatna, Mandya District, Karnataka 571438, India',
    map: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Sri Nimishambha Temple Dasoha Bhavan, Ganjam, Srirangapatna, Karnataka 571438'),
    note: 'Sri Nimishambha Temple' },
  { slug: 'bengaluru', city: 'Bengaluru', kn: 'ಬೆಂಗಳೂರು', state: 'Karnataka', map: 'https://maps.app.goo.gl/DbdrteosCRNRoA1n6?g_st=aw',
    note: 'ISKCON Temple' },
  { slug: 'kollegala', city: 'Kollegala', kn: 'ಕೊಳ್ಳೇಗಾಲ', state: 'Karnataka', map: 'https://maps.app.goo.gl/nTiKYugMhFvqaMia7?g_st=aw',
    note: 'Sri Male Mahadeshwara Swamy Devasthana' },
  { slug: 'guwahati', city: 'Guwahati', kn: 'ಗುವಾಹಟಿ', state: 'Assam', map: 'https://maps.app.goo.gl/ViF3UqYdf6kSoYUMA?g_st=aw',
    note: 'Maa Kamakhya Devi Temple' },
  { slug: 'perandapalli', city: 'Perandapalli', kn: 'ಪೆರಂಡಪಲ್ಲಿ', state: 'Tamil Nadu', map: 'https://maps.app.goo.gl/bbj7LkdMAPzQvSsv5?g_st=aw',
    note: 'Sri Maha Pratyangira Devi Temple' },
]
