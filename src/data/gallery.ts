/**
 * ─────────────────────────────────────────────────────────────
 *  GALLERY — add photos to public/img/gallery/ (or anywhere in public/)
 *  and list them here. Three sections: celebrity, photos, videos.
 * ─────────────────────────────────────────────────────────────
 */
import { site } from './site'
import { MEDIA } from '../lib/media'

const img = (f: string) => MEDIA + 'img/' + f

export type GallerySection = 'celebrity' | 'photos' | 'videos'
export interface GalleryItem { section: GallerySection; src: string; caption: string; kn: string; poster?: string; video?: boolean; tall?: boolean }

const vid = (f: string) => MEDIA + 'videos/' + f

export const gallerySections: { key: GallerySection; label: string; kn: string; icon: string }[] = [
  { key: 'celebrity', label: 'Celebrity Images', kn: 'ಗಣ್ಯರೊಂದಿಗೆ', icon: 'star' },
  { key: 'photos', label: 'Photos', kn: 'ಚಿತ್ರಗಳು', icon: 'lotus' },
  { key: 'videos', label: 'Videos', kn: 'ವೀಡಿಯೊಗಳು', icon: 'play' },
]

export const gallery: GalleryItem[] = [
  { section: 'celebrity', src: img('gallery/celebrity-1.webp'), caption: 'Guruji at a podcast interview', kn: 'ಪಾಡ್‌ಕಾಸ್ಟ್ ಸಂದರ್ಶನದಲ್ಲಿ ಗುರೂಜಿ', tall: true },

  { section: 'photos', src: img('gallery/guruji-desk.webp'), caption: 'Vasudev Guruji', kn: 'ವಾಸುದೇವ ಗುರೂಜಿ', tall: true },
  { section: 'photos', src: img('lifeline-poster.webp'), caption: 'Life Line Horoscope book', kn: 'ಜೀವನ ರೇಖೆ ಜಾತಕ ಪುಸ್ತಕ', tall: true },

  { section: 'videos', src: site.latestDiscourse.videoSrc, poster: site.latestDiscourse.poster, video: true, caption: site.latestDiscourse.title, kn: 'ವ್ಯಾಪಾರ, ಹಣ ಮತ್ತು ನಕಾರಾತ್ಮಕ ಶಕ್ತಿ — ಗುರೂಜಿ ಉತ್ತರಿಸುತ್ತಾರೆ', tall: true },
  { section: 'videos', src: vid('reel-1.mp4'), poster: vid('reel-1.webp'), video: true, caption: 'Niranjan Swamy — Reel 1', kn: 'ನಿರಂಜನ ಸ್ವಾಮಿ — ರೀಲ್ 1', tall: true },
  { section: 'videos', src: vid('reel-2.mp4'), poster: vid('reel-2.webp'), video: true, caption: 'Niranjan Swamy — Reel 2', kn: 'ನಿರಂಜನ ಸ್ವಾಮಿ — ರೀಲ್ 2', tall: true },
  { section: 'videos', src: vid('reel-3.mp4'), poster: vid('reel-3.webp'), video: true, caption: 'Guruji — a moment from the ashram', kn: 'ಆಶ್ರಮದಿಂದ ಗುರೂಜಿಯವರ ಒಂದು ಕ್ಷಣ', tall: true },
]
