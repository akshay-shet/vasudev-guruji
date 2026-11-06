/**
 * ─────────────────────────────────────────────────────────────
 *  CHAT QUESTIONS & ANSWERS — no AI, no API key.
 *  The chat matches a visitor's message against `keys` and shows the answer.
 *  If nothing matches, it asks them to call or WhatsApp Guruji's office.
 *  To add a question: copy one block, change q / keys / a.
 *  (If you add or change text, also add its translation in src/lib/i18n/*.ts.)
 * ─────────────────────────────────────────────────────────────
 */
export interface Faq {
  id: string
  /** Question shown as a tap-able chip */
  q: string
  /** Words or phrases that trigger this answer (lower-case; English, Kannada or other scripts) */
  keys: string[]
  /** The answer */
  a: string
  /** Optional page button under the answer */
  link?: { to: string; label: string }
  /** Show the Call Guruji + WhatsApp buttons under the answer */
  contact?: boolean
  /** Hide from the chip list (e.g. greetings) */
  hidden?: boolean
  /** Score multiplier — below 1 for broad topics so a more specific answer wins */
  weight?: number
}

export const faqs: Faq[] = [
  { id: 'greet', hidden: true, q: 'Hello',
    keys: ['hi', 'hello', 'hey', 'namaste', 'namaskara', 'namaskaram', 'hari om', 'pranam', 'ನಮಸ್ಕಾರ', 'ಹರಿ ಓಂ', 'नमस्ते', 'प्रणाम'],
    a: '🙏 Hari Om! I am Guruji’s website assistant. Ask me about Guruji, his services, homas, Guna Milan, events, the shop or how to reach him.' },

  { id: 'lifeline', q: 'What is the Life Line Horoscope report?',
    keys: ['life line', 'lifeline', 'life report', 'full life report', 'horoscope report', 'detailed report', 'report', 'blueprint', 'pdf', 'yearly prediction', 'yearly predictions', '499', '999', 'ಜೀವನ ರೇಖೆ', 'ವರದಿ'],
    a: 'It is an 80–100 page personal report on your whole life — personality, relationships, career, wealth, health and spiritual path, with year-by-year predictions — prepared from your Vedic birth chart under the guidance of Vasudev Guruji. Special offer: ₹499/- instead of ₹999/-. Order on WhatsApp below.',
    contact: true, link: { to: '/life-line-horoscope', label: 'Life Line Report' } },

  { id: 'about', q: 'Who is Vasudev Guruji?',
    keys: ['who is', 'about guruji', 'vasudev', 'background', 'lineage', 'parampara', 'teacher', 'biography', 'ಗುರೂಜಿ', 'ಯಾರು'],
    a: 'Vasudev Guruji is a Vedic astrologer and spiritual teacher who has devoted his life to the Vedas, the Bhagavad Gita and Jyotisha. He guides seekers and families through birth-chart readings, Kundali matching, homas and discourses.',
    link: { to: '/about', label: 'About Guruji' } },

  { id: 'contact', q: 'How can I contact Guruji?',
    keys: ['contact', 'phone', 'number', 'call', 'whatsapp', 'mobile', 'email', 'mail', 'reach', 'talk to', 'speak', 'meet', 'appointment', 'ಸಂಪರ್ಕ', 'ಫೋನ್', 'ನಂಬರ್', 'संपर्क', 'नंबर'],
    a: 'You can call or WhatsApp Guruji’s office on +91 90359 59911, or write to srivasudevguruji@gmail.com. Use the buttons below.',
    contact: true },

  { id: 'hours', q: 'What are the office hours?',
    keys: ['hours', 'timing', 'timings', 'office time', 'open', 'opening', 'closed', 'what time', 'ಸಮಯ', 'समय'],
    a: 'Guruji’s office is open daily from 6:00 AM to 12:00 PM (IST). Please message on WhatsApp before visiting.',
    contact: true },

  { id: 'location', q: 'Where is Guruji’s main centre?',
    keys: ['where', 'address', 'location', 'ashram', 'centre', 'center', 'visit', 'directions', 'mandya', 'srirangapatna', 'srirangapattana', 'ganjam', 'nimishamba', 'map', 'ವಿಳಾಸ', 'ಎಲ್ಲಿ', 'ಮಂಡ್ಯ', 'पता', 'कहाँ'],
    a: 'The main centre is near Sri Nimishambha Temple Dasoha Bhavan, Ganjam, Srirangapatna, Mandya District, Karnataka 571438. Please message before visiting so the office can confirm Guruji’s availability.',
    link: { to: '/contact', label: 'Contact' } },

  { id: 'places', q: 'Where else is Guruji available?',
    keys: ['where else', 'other locations', 'bengaluru', 'bangalore', 'kollegala', 'kollegal', 'guwahati', 'assam', 'perandapalli', 'tamil nadu', 'other places', 'other cities', 'branch', 'branches', 'cities', 'ಬೆಂಗಳೂರು', 'ಕೊಳ್ಳೇಗಾಲ'],
    a: 'Besides the main centre at Srirangapatna (Mandya), Guruji is available at Bengaluru, Kollegala, Guwahati and Perandapalli — by appointment or during his visits. Map links are on the Contact page.',
    link: { to: '/contact', label: 'Contact' } },

  { id: 'online', q: 'Can I consult Guruji online?',
    keys: ['online', 'video call', 'video', 'abroad', 'remote', 'outside india', 'usa', 'uk', 'dubai', 'zoom', 'from home', 'ಆನ್‌ಲೈನ್', 'ऑनलाइन'],
    a: 'Yes. Wherever you live, you can consult Guruji by video or phone. Share your birth details on WhatsApp, choose a time, and the office will arrange the consultation.',
    contact: true },

  { id: 'details', q: 'What details are needed for a horoscope reading?',
    keys: ['details', 'birth', 'date of birth', 'time of birth', 'birth time', 'horoscope', 'jataka', 'jathaka', 'janma', 'chart', 'reading', 'kundli', 'ಜಾತಕ', 'जन्म', 'कुंडली'],
    a: 'Please share your full name, date of birth, exact time of birth and place of birth. The more accurate the birth time, the more accurate the reading.',
    contact: true },

  { id: 'gunamilan', q: 'How does Guna Milan work?',
    keys: ['guna', 'milan', 'matching', 'matchmaking', 'horoscope match', 'kundali match', 'jathaka match', 'compatibility', 'ashtakoota', 'koota', 'kundali milan', 'porutham', 'ಗುಣ', 'ಹೊಂದಾಣಿಕೆ', 'गुण', 'मिलान'],
    a: 'Guna Milan compares the Moon nakshatras of the bride and groom across eight kootas, out of 36 gunas. 18 or more is generally acceptable and 25 or more is very good. Try the free calculator, then ask Guruji for a full matching.',
    link: { to: '/kundali-matching', label: 'Guna Milan' } },

  { id: 'marriage', q: 'Can Guruji help with marriage or relationship problems?',
    keys: ['marriage', 'married', 'wedding', 'delay', 'spouse', 'husband', 'wife', 'divorce', 'love', 'relationship', 'partner', 'family problem', 'fight', 'ಮದುವೆ', 'ವಿವಾಹ', 'शादी', 'विवाह'],
    a: 'Yes. Guruji studies the birth charts to understand delays and misunderstandings in love and marriage, and suggests sattvic remedies. For your personal situation, please speak to Guruji directly.',
    contact: true },

  { id: 'homas', weight: 0.75, q: 'Which homas are performed?',
    keys: ['homa', 'homas', 'havan', 'havana', 'homam', 'yagna', 'yajna', 'yagya', 'ಹೋಮ', 'हवन', 'होम'],
    a: 'Guruji performs 12 homas, including Ganapathi, Maha Mrityunjaya, Navagraha Shanti, Maha Lakshmi & Kubera, Maha Sudarshana and Vastu Purusha Homa. See the Homa page for the full list.',
    link: { to: '/homa', label: 'Homa' } },

  { id: 'book', q: 'How do I book a homa?',
    keys: ['book', 'booking', 'perform', 'arrange', 'schedule', 'sankalpa', 'gotra', 'ಬುಕ್', 'बुक'],
    a: 'Tap “Book” on any homa on the Homa page, or WhatsApp Guruji’s office with your name, gotra, nakshatra, preferred date and place. The sankalpa is taken in your name.',
    contact: true, link: { to: '/homa', label: 'Homa' } },

  { id: 'obstacles', q: 'Which homa removes obstacles?',
    keys: ['obstacle', 'obstacles', 'blockage', 'new beginning', 'new venture', 'ganapathi', 'ganapati', 'ganesha', 'ganesh', 'ವಿಘ್ನ', 'ಗಣಪತಿ', 'गणपति', 'बाधा'],
    a: 'Ganapathi Homa is performed before any new beginning so that obstacles are removed from the path. It is best done on Sankashti Chaturthi or before a new venture.',
    link: { to: '/homa', label: 'Homa' } },

  { id: 'health', q: 'Is there a homa for health?',
    keys: ['health', 'illness', 'sick', 'disease', 'recovery', 'hospital', 'surgery', 'mrityunjaya', 'long life', 'ಆರೋಗ್ಯ', 'स्वास्थ्य'],
    a: 'Maha Mrityunjaya Homa is performed for health, faster recovery and long life. Please continue medical treatment alongside — Guruji’s guidance is spiritual, not medical.',
    contact: true, link: { to: '/homa', label: 'Homa' } },

  { id: 'negative', q: 'Can Guruji help with negative energy?',
    keys: ['negative', 'negative energy', 'black magic', 'evil eye', 'nazar', 'drishti', 'dhrishti', 'curse', 'spirit', 'sudarshana', 'protection', 'bad luck', 'maata', 'ಮಾಟ', 'ದೃಷ್ಟಿ', 'काला जादू', 'नज़र'],
    a: 'Yes. Guruji offers sattvic remedies such as Maha Sudarshana Homa, mantra and puja for protection from negative energy. Every situation is different, so please speak to Guruji directly.',
    contact: true },

  { id: 'career', q: 'Can Guruji guide on career or business?',
    keys: ['career', 'job', 'promotion', 'exam', 'government job', 'business', 'loss', 'losses', 'money', 'finance', 'debt', 'partnership', 'transfer', 'ಉದ್ಯೋಗ', 'ವ್ಯಾಪಾರ', 'नौकरी', 'व्यापार'],
    a: 'Yes. Guruji reads the 10th house, the D10 chart and your running dasha to guide you on the right field, the timing for change and business decisions. Share your birth details with the office to begin.',
    contact: true, link: { to: '/services', label: 'Services' } },

  { id: 'vastu', q: 'Does Guruji give Vastu advice?',
    keys: ['vastu', 'vaastu', 'house', 'home', 'plot', 'site', 'building', 'construction', 'direction', 'griha pravesha', 'gruhapravesha', 'ವಾಸ್ತು', 'वास्तु'],
    a: 'Yes. Guruji gives Vastu guidance before you buy, build or move in, and Vastu Purusha Homa can be performed when a house does not feel right.',
    link: { to: '/services/vastu-expert', label: 'Vastu' } },

  { id: 'gemstone', q: 'Should I wear a gemstone?',
    keys: ['gem', 'gems', 'gemstone', 'stone', 'ring', 'sapphire', 'pukhraj', 'pearl', 'moti', 'emerald', 'panna', 'ruby', 'ರತ್ನ', 'रत्न'],
    a: 'Gemstones are suggested only after Guruji studies your birth chart — the wrong stone can do more harm than good. Share your birth details for a recommendation.',
    contact: true, link: { to: '/shop', label: 'Shop' } },

  { id: 'shop', q: 'How do I order from the shop?',
    keys: ['shop', 'buy', 'order', 'purchase', 'item', 'items', 'product', 'products', 'yantra', 'rudraksha', 'mala', 'deepa', 'agarbatti', 'thali', 'delivery', 'courier', 'ಅಂಗಡಿ', 'ರುದ್ರಾಕ್ಷಿ', 'रुद्राक्ष'],
    a: 'Open the Shop page, tap “+ Add” on the items you want, set the quantity, then tap “Enquire on WhatsApp”. The office will confirm availability.',
    link: { to: '/shop', label: 'Shop' } },

  { id: 'price', q: 'What are the charges?',
    keys: ['price', 'prices', 'cost', 'fee', 'fees', 'charge', 'charges', 'rate', 'amount', 'how much', 'payment', 'pay', 'dakshina', 'rupees', 'ಬೆಲೆ', 'ಶುಲ್ಕ', 'कीमत', 'शुल्क'],
    a: 'For consultation, homa and product details, please call or WhatsApp Guruji’s office directly — we will be happy to help.',
    contact: true },

  { id: 'events', q: 'What are the upcoming events?',
    keys: ['event', 'events', 'program', 'programme', 'programs', 'festival', 'retreat', 'satsang', 'course', 'upcoming', 'shivaratri', 'deepotsava', 'gita jayanti', 'ಕಾರ್ಯಕ್ರಮ', 'कार्यक्रम'],
    a: 'Upcoming programmes include Kartika Deepotsava & Satsang, Gita Jayanti, the Vaikuntha Ekadashi retreat and Maha Shivaratri. See the Events page for dates.',
    link: { to: '/events', label: 'Events' } },

  { id: 'videos', q: 'Where can I watch Guruji’s discourses?',
    keys: ['videos', 'discourse', 'discourses', 'talk', 'talks', 'youtube', 'watch', 'pravachana', 'speech', 'ಪ್ರವಚನ', 'ವೀಡಿಯೊ', 'प्रवचन'],
    a: 'Guruji’s talks on the Gita, Jyotisha and sadhana are on the Videos page, and the latest discourse plays on the home page.',
    link: { to: '/discourses', label: 'Videos' } },

  { id: 'mantra', q: 'Which mantra should I chant?',
    keys: ['mantra', 'mantras', 'chant', 'chanting', 'japa', 'jap', 'gayatri', 'shloka', 'sloka', 'prayer', 'meditation', 'peace', 'diya', 'ಮಂತ್ರ', 'ಜಪ', 'मंत्र', 'जाप'],
    a: 'The Resources page has sacred mantras with their meanings, a 108-bead japa counter and a light-a-diya practice. For a mantra chosen for your own chart, ask Guruji.',
    link: { to: '/mantras', label: 'Resources' } },
]

/** Shown when nothing matches. */
export const FAQ_FALLBACK = 'Please call or WhatsApp Guruji’s office directly — we will be happy to help. 🙏'

/** Chips shown when the chat opens. */
export const FAQ_START = ['lifeline', 'contact', 'hours', 'location', 'homas', 'gunamilan']

const norm = (s: string) => ' ' + s.toLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu, ' ').trim() + ' '

/**
 * Finds the best answer for a message. `translated` lets visitors type in their own language:
 * each question's translated text is also compared word by word.
 */
export function matchFaq(message: string, translated?: (s: string) => string): Faq | undefined {
  const text = norm(message)
  const words = new Set(text.trim().split(' '))
  let best: Faq | undefined
  let bestScore = 0
  for (const f of faqs) {
    let score = 0
    for (const k of f.keys) {
      const nk = norm(k)
      if (text.includes(nk)) score += nk.trim().includes(' ') ? 3 : 2
    }
    // Visitors typing in Kannada, Hindi etc.: compare with the question as translated on screen.
    const tq = translated?.(f.q)
    if (tq && tq !== f.q) {
      for (const w of norm(tq).trim().split(' ')) if (w.length > 3 && words.has(w)) score += 1
    }
    score *= f.weight ?? 1
    if (f.id === 'greet') score = score ? 0.5 : 0
    if (score > bestScore) { bestScore = score; best = f }
  }
  return bestScore >= 1 || best?.id === 'greet' ? best : undefined
}
