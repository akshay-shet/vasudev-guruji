/**
 * ─────────────────────────────────────────────────────────────
 *  GALLERY — add photos to public/img/gallery/ (or anywhere in public/)
 *  and list them here. Three sections: celebrity, photos, videos.
 * ─────────────────────────────────────────────────────────────
 */
import { site } from './site'

const img = (f: string) => import.meta.env.BASE_URL + 'img/' + f

export type GallerySection = 'celebrity' | 'photos' | 'videos'
export interface GalleryItem { section: GallerySection; src: string; caption: string; kn: string; poster?: string; video?: boolean; tall?: boolean }

export const gallerySections: { key: GallerySection; label: string; kn: string; icon: string }[] = [
  { key: 'celebrity', label: 'Celebrity Images', kn: 'ಗಣ್ಯರೊಂದಿಗೆ', icon: 'star' },
  { key: 'photos', label: 'Photos', kn: 'ಚಿತ್ರಗಳು', icon: 'lotus' },
  { key: 'videos', label: 'Videos', kn: 'ವೀಡಿಯೊಗಳು', icon: 'play' },
]

export const gallery: GalleryItem[] = [
  { section: 'celebrity', src: img('gallery/celebrity-1.jpg'), caption: 'Guruji at a podcast interview', kn: 'ಪಾಡ್‌ಕಾಸ್ಟ್ ಸಂದರ್ಶನದಲ್ಲಿ ಗುರೂಜಿ', tall: true },

  { section: 'photos', src: img('guruji-portrait.jpg'), caption: 'Vasudev Guruji', kn: 'ವಾಸುದೇವ ಗುರೂಜಿ', tall: true },
  { section: 'photos', src: img('kollegala-centre.jpg'), caption: 'Samruddhi Astro Center, Kollegala', kn: 'ಸಮೃದ್ಧಿ ಜ್ಯೋತಿಷ್ಯ ಕೇಂದ್ರ, ಕೊಳ್ಳೇಗಾಲ' },
  { section: 'photos', src: img('lifeline-poster.jpg'), caption: 'Life Line Horoscope book', kn: 'ಜೀವನ ರೇಖೆ ಜಾತಕ ಪುಸ್ತಕ', tall: true },
  { section: 'photos', src: site.latestDiscourse.poster, caption: 'Maa Kamakhya Devi Temple, Guwahati', kn: 'ಮಾ ಕಾಮಾಖ್ಯಾ ದೇವಿ ದೇವಸ್ಥಾನ, ಗುವಾಹಟಿ', tall: true },

  { section: 'videos', src: site.latestDiscourse.videoSrc, poster: site.latestDiscourse.poster, video: true, caption: site.latestDiscourse.title, kn: 'ವ್ಯಾಪಾರ, ಹಣ ಮತ್ತು ನಕಾರಾತ್ಮಕ ಶಕ್ತಿ — ಗುರೂಜಿ ಉತ್ತರಿಸುತ್ತಾರೆ', tall: true },
]
