/**
 * ─────────────────────────────────────────────────────────────
 *  "LIFE LINE HOROSCOPE" BOOK — edit text, prices and chapters here.
 *  Every text has an English (en) and Kannada (kn) version; the book page shows both.
 *  Shown on the home page slider and on the /life-line-horoscope page ("The Book").
 * ─────────────────────────────────────────────────────────────
 */
import { whatsappLink } from './site'

export interface Bi { en: string; kn: string }

export const lifeline = {
  title: { en: 'Life Line Horoscope', kn: 'ಜೀವನ ರೇಖೆ ಜಾತಕ' },
  tagline: { en: 'Complete Blueprint of Your Life', kn: 'ನಿಮ್ಮ ಜೀವನದ ಸಂಪೂರ್ಣ ನೀಲನಕ್ಷೆ' },
  intro: {
    en: 'Get a deeply accurate, personalized book covering every aspect of your life — personality, relationships, career, wealth, health and spiritual path — based on your complete Vedic birth chart, prepared under the guidance of Vasudev Guruji.',
    kn: 'ನಿಮ್ಮ ಸಂಪೂರ್ಣ ವೈದಿಕ ಜನ್ಮ ಕುಂಡಲಿಯನ್ನು ಆಧರಿಸಿ, ವಾಸುದೇವ ಗುರೂಜಿಯವರ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಸಿದ್ಧಪಡಿಸಿದ — ವ್ಯಕ್ತಿತ್ವ, ಸಂಬಂಧಗಳು, ವೃತ್ತಿ, ಸಂಪತ್ತು, ಆರೋಗ್ಯ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಮಾರ್ಗ — ನಿಮ್ಮ ಜೀವನದ ಪ್ರತಿಯೊಂದು ಅಂಶವನ್ನೂ ಒಳಗೊಂಡ ಆಳವಾದ, ನಿಖರವಾದ ವೈಯಕ್ತಿಕ ಪುಸ್ತಕವನ್ನು ಪಡೆಯಿರಿ.',
  },
  originalPrice: 999,
  offerPrice: 499,
  /** 360-degree coverage */
  areas: [
    { icon: 'sun', title: { en: 'Personality & Traits', kn: 'ವ್ಯಕ್ತಿತ್ವ ಮತ್ತು ಗುಣಗಳು' }, text: { en: 'Uncover your core strengths, weaknesses and potential.', kn: 'ನಿಮ್ಮ ಮೂಲ ಶಕ್ತಿಗಳು, ದೌರ್ಬಲ್ಯಗಳು ಮತ್ತು ಸಾಮರ್ಥ್ಯವನ್ನು ಅರಿಯಿರಿ.' } },
    { icon: 'rings', title: { en: 'Relationships & Family', kn: 'ಸಂಬಂಧಗಳು ಮತ್ತು ಕುಟುಂಬ' }, text: { en: 'Insights into marriage, compatibility and family dynamics.', kn: 'ಮದುವೆ, ಹೊಂದಾಣಿಕೆ ಮತ್ತು ಕುಟುಂಬದ ಸಂಬಂಧಗಳ ಒಳನೋಟ.' } },
    { icon: 'briefcase', title: { en: 'Career & Business', kn: 'ವೃತ್ತಿ ಮತ್ತು ವ್ಯಾಪಾರ' }, text: { en: 'Clear direction on job stability, business opportunities and growth phases.', kn: 'ಉದ್ಯೋಗ ಸ್ಥಿರತೆ, ವ್ಯಾಪಾರ ಅವಕಾಶಗಳು ಮತ್ತು ಬೆಳವಣಿಗೆಯ ಹಂತಗಳ ಬಗ್ಗೆ ಸ್ಪಷ್ಟ ದಿಕ್ಕು.' } },
    { icon: 'coins', title: { en: 'Wealth & Finance', kn: 'ಸಂಪತ್ತು ಮತ್ತು ಹಣಕಾಸು' }, text: { en: 'Financial prospects, money flow and remedies for financial obstacles.', kn: 'ಆರ್ಥಿಕ ಅವಕಾಶಗಳು, ಹಣದ ಹರಿವು ಮತ್ತು ಆರ್ಥಿಕ ಅಡಚಣೆಗಳಿಗೆ ಪರಿಹಾರಗಳು.' } },
    { icon: 'leaf', title: { en: 'Health & Well-being', kn: 'ಆರೋಗ್ಯ ಮತ್ತು ಯೋಗಕ್ಷೇಮ' }, text: { en: 'Health forecasts and vital preventive advice.', kn: 'ಆರೋಗ್ಯದ ಭವಿಷ್ಯ ಮತ್ತು ಮುಖ್ಯ ಮುನ್ನೆಚ್ಚರಿಕೆಯ ಸಲಹೆ.' } },
    { icon: 'lotus', title: { en: 'Spiritual Path', kn: 'ಆಧ್ಯಾತ್ಮಿಕ ಮಾರ್ಗ' }, text: { en: 'Guidance on spiritual growth, remedies and inner alignment.', kn: 'ಆಧ್ಯಾತ್ಮಿಕ ಬೆಳವಣಿಗೆ, ಪರಿಹಾರಗಳು ಮತ್ತು ಆಂತರಿಕ ಸಮತೋಲನಕ್ಕೆ ಮಾರ್ಗದರ್ಶನ.' } },
  ],
  /** Chapters of the book — shown as its contents page */
  chapters: [
    { en: 'Personality & Ascendant Analysis', kn: 'ವ್ಯಕ್ತಿತ್ವ ಮತ್ತು ಲಗ್ನ ವಿಶ್ಲೇಷಣೆ' },
    { en: 'Special Yogas & Raj Yoga Analysis', kn: 'ವಿಶೇಷ ಯೋಗಗಳು ಮತ್ತು ರಾಜಯೋಗ ವಿಶ್ಲೇಷಣೆ' },
    { en: 'Love, Marriage & Relationship Insights', kn: 'ಪ್ರೀತಿ, ಮದುವೆ ಮತ್ತು ಸಂಬಂಧಗಳ ಒಳನೋಟ' },
    { en: 'Career & Professional Destiny', kn: 'ವೃತ್ತಿ ಮತ್ತು ವೃತ್ತಿಪರ ಭವಿಷ್ಯ' },
    { en: 'Wealth, Finances & Property Yoga', kn: 'ಸಂಪತ್ತು, ಹಣಕಾಸು ಮತ್ತು ಆಸ್ತಿ ಯೋಗ' },
    { en: 'Current Dasha & Antardasha Predictions', kn: 'ಪ್ರಸ್ತುತ ದಶೆ ಮತ್ತು ಅಂತರ್ದಶೆ ಭವಿಷ್ಯ' },
    { en: 'Health & Well-being Guidance', kn: 'ಆರೋಗ್ಯ ಮತ್ತು ಯೋಗಕ್ಷೇಮ ಮಾರ್ಗದರ್ಶನ' },
    { en: 'Spiritual Path & Higher Destiny', kn: 'ಆಧ್ಯಾತ್ಮಿಕ ಮಾರ್ಗ ಮತ್ತು ಉನ್ನತ ಭವಿಷ್ಯ' },
    { en: 'Business & Partnership Prospects', kn: 'ವ್ಯಾಪಾರ ಮತ್ತು ಪಾಲುದಾರಿಕೆ ಅವಕಾಶಗಳು' },
    { en: 'Foreign Travel & Settlement Yogas', kn: 'ವಿದೇಶ ಪ್ರಯಾಣ ಮತ್ತು ನೆಲೆಸುವ ಯೋಗ' },
    { en: 'Education & Higher Learning Success', kn: 'ಶಿಕ್ಷಣ ಮತ್ತು ಉನ್ನತ ಅಧ್ಯಯನದಲ್ಲಿ ಯಶಸ್ಸು' },
    { en: 'Dosha Analysis (Manglik, Kaal Sarp, Pitru, etc.)', kn: 'ದೋಷ ವಿಶ್ಲೇಷಣೆ (ಮಾಂಗಲಿಕ, ಕಾಳಸರ್ಪ, ಪಿತೃ ಇತ್ಯಾದಿ)' },
    { en: 'Powerful & Practical Astro Remedies', kn: 'ಶಕ್ತಿಶಾಲಿ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಜ್ಯೋತಿಷ್ಯ ಪರಿಹಾರಗಳು' },
    { en: 'Lucky Elements (Colors, Numbers & Days)', kn: 'ಅದೃಷ್ಟದ ಅಂಶಗಳು (ಬಣ್ಣಗಳು, ಸಂಖ್ಯೆಗಳು ಮತ್ತು ದಿನಗಳು)' },
    { en: 'Year-by-Year General Forecasts', kn: 'ವರ್ಷವಾರು ಸಾಮಾನ್ಯ ಭವಿಷ್ಯ' },
  ],
  /** Headings used around the book */
  labels: {
    coverage: { en: '360-Degree Coverage Across All Life Areas', kn: 'ಜೀವನದ ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳ 360 ಡಿಗ್ರಿ ವ್ಯಾಪ್ತಿ' },
    contents: { en: 'Contents of the Book', kn: 'ಪುಸ್ತಕದ ಪರಿವಿಡಿ' },
    contentsShort: { en: 'Contents', kn: 'ಪರಿವಿಡಿ' },
    order: { en: 'Order Your Book', kn: 'ನಿಮ್ಮ ಪುಸ್ತಕವನ್ನು ಆರ್ಡರ್ ಮಾಡಿ' },
    orderText: {
      en: 'Take control of your future with actionable guidance tailored specifically for you. Click below to place your order directly via WhatsApp.',
      kn: 'ನಿಮಗಾಗಿಯೇ ರೂಪಿಸಿದ ಪ್ರಾಯೋಗಿಕ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ನಿಮ್ಮ ಭವಿಷ್ಯವನ್ನು ನಿಮ್ಮ ಕೈಗೆ ತೆಗೆದುಕೊಳ್ಳಿ. ವಾಟ್ಸಾಪ್ ಮೂಲಕ ನೇರವಾಗಿ ಆರ್ಡರ್ ಮಾಡಲು ಕೆಳಗೆ ಒತ್ತಿ.',
    },
    preparedBy: { en: 'Prepared under the guidance of Vasudev Guruji', kn: 'ವಾಸುದೇವ ಗುರೂಜಿಯವರ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ' },
  } satisfies Record<string, Bi>,
}

export const lifelineOrderLink = () =>
  whatsappLink(`🙏 Hari Om Guruji, I would like to order the Life Line Horoscope book (₹${lifeline.offerPrice}/-).\n\nName:\nDate of birth:\nTime of birth:\nPlace of birth:\nLanguage of the book:`)
