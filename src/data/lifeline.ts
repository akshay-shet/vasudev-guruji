/**
 * ─────────────────────────────────────────────────────────────
 *  "LIFE LINE HOROSCOPE" REPORT — edit text, prices and lists here.
 *  Shown as a slider on the home page and on the /life-line-horoscope page.
 * ─────────────────────────────────────────────────────────────
 */
import { whatsappLink } from './site'

export const lifeline = {
  title: 'Life Line Horoscope',
  kn: 'ಜೀವನ ರೇಖೆ ಜಾತಕ',
  tagline: 'Complete Blueprint of Your Life',
  pages: '80–100 Page Detailed Report',
  intro:
    'Get a deeply accurate, personalized report covering every aspect of your life — personality, relationships, career, wealth, health and spiritual path — based on your complete Vedic birth chart, prepared under the guidance of Vasudev Guruji.',
  originalPrice: 999,
  offerPrice: 499,
  /** Three headline benefits */
  highlights: [
    { icon: 'book', title: 'Comprehensive 80–100 Page Report', text: 'A thorough, deep-dive analysis of your horoscope that acts as a lifelong guide.' },
    { icon: 'calendar', title: 'Yearly Predictions Included', text: 'Detailed year-by-year forecasts, key milestones and important timing guidance for your future.' },
    { icon: 'globe', title: '360-Degree Coverage', text: 'Every area of life — from personality and family to wealth, health and the spiritual path.' },
  ],
  /** 360-degree coverage */
  areas: [
    { icon: 'sun', title: 'Personality & Traits', text: 'Uncover your core strengths, weaknesses and potential.' },
    { icon: 'rings', title: 'Relationships & Family', text: 'Insights into marriage, compatibility and family dynamics.' },
    { icon: 'briefcase', title: 'Career & Business', text: 'Clear direction on job stability, business opportunities and growth phases.' },
    { icon: 'coins', title: 'Wealth & Finance', text: 'Financial prospects, money flow and remedies for financial obstacles.' },
    { icon: 'leaf', title: 'Health & Well-being', text: 'Health forecasts and vital preventive advice.' },
    { icon: 'lotus', title: 'Spiritual Path', text: 'Guidance on spiritual growth, remedies and inner alignment.' },
  ],
  /** "Full Life Report" — chapters inside the book */
  contents: [
    'Personality & Ascendant Analysis',
    'Special Yogas & Raj Yoga Analysis',
    'Love, Marriage & Relationship Insights',
    'Career & Professional Destiny',
    'Wealth, Finances & Property Yoga',
    'Current Dasha & Antardasha Predictions',
    'Health & Well-being Guidance',
    'Spiritual Path & Higher Destiny',
    'Business & Partnership Prospects',
    'Foreign Travel & Settlement Yogas',
    'Education & Higher Learning Success',
    'Dosha Analysis (Manglik, Kaal Sarp, Pitru, etc.)',
    'Powerful & Practical Astro Remedies',
    'Lucky Elements (Colors, Numbers & Days)',
    'Year-by-Year General Forecasts',
  ],
}

export const lifelineOrderLink = () =>
  whatsappLink(`🙏 Hari Om Guruji, I would like to order the Life Line Horoscope report (₹${lifeline.offerPrice}/-).\n\nName:\nDate of birth:\nTime of birth:\nPlace of birth:\nLanguage of report:`)
