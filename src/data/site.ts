/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE DETAILS LIVE HERE. Edit this one file to update
 *  name, phone, WhatsApp, email, address, photo and biography.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: 'Vasudev Guruji',
  tagline: 'Guruji Official Website',
  shloka: '॥ ಲೋಕಾಃ ಸಮಸ್ತಾಃ ಸುಖಿನೋ ಭವನ್ತು ॥',
  shlokaMeaning: 'May all beings everywhere be happy and free.',

  /** WhatsApp number in international format, digits only (country code + number). */
  whatsapp: '919035959911',
  /** Phone number shown and dialled by the Call button. */
  phone: '+91 90359 59911',
  phoneHref: 'tel:+919035959911',
  email: 'srivasudevguruji@gmail.com',
  address: 'Near Sri Nimishambha Temple Dasoha Bhavan, Ganjam, Srirangapatna, Mandya District, Karnataka 571438, India',
  /** Text used for the Google Maps embed on the Contact page. */
  mapQuery: 'Sri Nimishambha Temple Dasoha Bhavan, Ganjam, Srirangapatna, Karnataka 571438',
  officeHours: 'Daily 6:00 AM – 12:00 PM (IST)',

  /** Guruji's portrait (public/img/guruji-portrait.jpg). Replace the file to change it. */
  photo: import.meta.env.BASE_URL + 'img/guruji-portrait.jpg',
  photoFallback: import.meta.env.BASE_URL + 'img/guruji-placeholder.svg',
  photoAlt: 'Vasudev Guruji seated in blessing',

  shortBio:
    'A revered spiritual teacher, compassionate guide and champion of human values, Guruji inspires countless individuals towards a life of dharma, clarity and inner freedom.',

  biography: [
    'Vasudev Guruji has devoted his life to the study of the Vedas, the Bhagavad Gita and Jyotisha (Vedic astrology). From a young age he was drawn to temple worship, japa and the company of saints, and spent many years in study under traditional teachers.',
    'Today Guruji guides seekers and families through discourses, Jataka (birth-chart) readings, Kundali matching and sadhana retreats — always pointing beyond prediction to dharma, self-effort and surrender to the Divine.',
    'His approach is simple: understand your karma through the light of Jyotisha, strengthen the mind through mantra and seva, and walk the path of dharma with a peaceful heart.',
  ],

  /** Lineage / parampara — edit to match Guruji's actual tradition. */
  lineage: [
    { title: 'Sanatana Dharma', text: 'Rooted in the eternal teachings of the Vedas, Upanishads and the Bhagavad Gita.' },
    { title: 'Jyotisha Parampara', text: 'Trained in classical Parashari Jyotisha — Brihat Parashara Hora Shastra, Phaladeepika and Jataka Parijata.' },
    { title: 'Bhakti & Seva', text: 'Devotion to Bhagavan Vasudeva expressed through daily puja, annadanam and service to society.' },
  ],

  latestDiscourse: {
    title: 'Business, Money & Negative Energy — Guruji Answers',
    duration: '1:25',
    /** YouTube video ID, e.g. 'dQw4w9WgXcQ'. It plays inside the card on the homepage. */
    youtubeId: '',
    /** OR a video file, e.g. '/videos/inner-peace.mp4' (put the file in public/videos). Used when youtubeId is empty. */
    videoSrc: import.meta.env.BASE_URL + 'videos/latest-discourse.mp4',
    /** Cover image shown before the video plays. */
    poster: import.meta.env.BASE_URL + 'videos/latest-discourse-cover.jpg',
  },

  social: {
    youtube: 'https://www.youtube.com/',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
  },

  autoReply: "Thank you, your enquiry has reached Guruji's office. We will reply soon. Hari Om 🙏",
}

export const topics = [
  'Online Consultation', 'Horoscope Reading', 'Vedic Astrology', 'Live Chat & Call', 'Career & Job', 'Love & Relationships', 'Marriage Matching',
  'Business & Finance', 'Wealth & Property', 'Health & Well-being', 'Gemstone Recommendation', 'Life Problems', 'Black Magic Removal', 'Vastu', 'Homa', 'Other',
] as const
export type Topic = (typeof topics)[number]

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
}
