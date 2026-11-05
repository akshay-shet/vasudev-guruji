// Classical Vedic (Parashari) reference data.

export type Graha = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu'

export interface Rashi {
  name: string
  deva: string
  /** Kannada name */
  kn: string
  english: string
  glyph: string
  symbol: string
  element: 'Fire' | 'Earth' | 'Air' | 'Water'
  quality: 'Chara (Movable)' | 'Sthira (Fixed)' | 'Dvisvabhava (Dual)'
  lord: Graha
  degrees: string
  traits: string
}

export const rashis: Rashi[] = [
  { name: 'Mesha', deva: 'ಮೇಷ', kn: 'ಮೇಷ', english: 'Aries', glyph: '♈', symbol: 'Ram', element: 'Fire', quality: 'Chara (Movable)', lord: 'Mars', degrees: '0° – 30°', traits: 'Courageous, pioneering and energetic; quick to act and natural leaders.' },
  { name: 'Vrishabha', deva: 'ವೃಷಭ', kn: 'ವೃಷಭ', english: 'Taurus', glyph: '♉', symbol: 'Bull', element: 'Earth', quality: 'Sthira (Fixed)', lord: 'Venus', degrees: '30° – 60°', traits: 'Steady, patient and devoted to beauty, comfort and family.' },
  { name: 'Mithuna', deva: 'ಮಿಥುನ', kn: 'ಮಿಥುನ', english: 'Gemini', glyph: '♊', symbol: 'Couple with mace and veena', element: 'Air', quality: 'Dvisvabhava (Dual)', lord: 'Mercury', degrees: '60° – 90°', traits: 'Curious, witty and communicative; loves learning and conversation.' },
  { name: 'Karka', deva: 'ಕರ್ಕ', kn: 'ಕರ್ಕಾಟಕ', english: 'Cancer', glyph: '♋', symbol: 'Crab', element: 'Water', quality: 'Chara (Movable)', lord: 'Moon', degrees: '90° – 120°', traits: 'Nurturing, emotional and protective; deeply attached to home and mother.' },
  { name: 'Simha', deva: 'ಸಿಂಹ', kn: 'ಸಿಂಹ', english: 'Leo', glyph: '♌', symbol: 'Lion', element: 'Fire', quality: 'Sthira (Fixed)', lord: 'Sun', degrees: '120° – 150°', traits: 'Noble, generous and dignified; born to lead and to shine.' },
  { name: 'Kanya', deva: 'ಕನ್ಯಾ', kn: 'ಕನ್ಯಾ', english: 'Virgo', glyph: '♍', symbol: 'Maiden in a boat with grain and fire', element: 'Earth', quality: 'Dvisvabhava (Dual)', lord: 'Mercury', degrees: '150° – 180°', traits: 'Analytical, practical and service-minded; seeks purity and order.' },
  { name: 'Tula', deva: 'ತುಲಾ', kn: 'ತುಲಾ', english: 'Libra', glyph: '♎', symbol: 'Merchant holding scales', element: 'Air', quality: 'Chara (Movable)', lord: 'Venus', degrees: '180° – 210°', traits: 'Balanced, diplomatic and artistic; values harmony and partnership.' },
  { name: 'Vrishchika', deva: 'ವೃಶ್ಚಿಕ', kn: 'ವೃಶ್ಚಿಕ', english: 'Scorpio', glyph: '♏', symbol: 'Scorpion', element: 'Water', quality: 'Sthira (Fixed)', lord: 'Mars', degrees: '210° – 240°', traits: 'Intense, secretive and transformative; strong will and deep insight.' },
  { name: 'Dhanu', deva: 'ಧನು', kn: 'ಧನು', english: 'Sagittarius', glyph: '♐', symbol: 'Archer, half-horse', element: 'Fire', quality: 'Dvisvabhava (Dual)', lord: 'Jupiter', degrees: '240° – 270°', traits: 'Righteous, optimistic and philosophical; drawn to dharma and the guru.' },
  { name: 'Makara', deva: 'ಮಕರ', kn: 'ಮಕರ', english: 'Capricorn', glyph: '♑', symbol: 'Sea-creature (deer-faced crocodile)', element: 'Earth', quality: 'Chara (Movable)', lord: 'Saturn', degrees: '270° – 300°', traits: 'Disciplined, ambitious and responsible; builds slowly and lastingly.' },
  { name: 'Kumbha', deva: 'ಕುಮ್ಭ', kn: 'ಕುಂಭ', english: 'Aquarius', glyph: '♒', symbol: 'Man holding a water pot', element: 'Air', quality: 'Sthira (Fixed)', lord: 'Saturn', degrees: '300° – 330°', traits: 'Humanitarian, independent and visionary; serves the collective.' },
  { name: 'Meena', deva: 'ಮೀನ', kn: 'ಮೀನ', english: 'Pisces', glyph: '♓', symbol: 'Two fish', element: 'Water', quality: 'Dvisvabhava (Dual)', lord: 'Jupiter', degrees: '330° – 360°', traits: 'Compassionate, intuitive and devotional; seeks moksha and the infinite.' },
]

export type Gana = 'Deva' | 'Manushya' | 'Rakshasa'
export type Nadi = 'Adi' | 'Madhya' | 'Antya'

export interface Nakshatra {
  name: string
  deva: string
  lord: Graha
  deity: string
  symbol: string
  gana: Gana
  yoni: string
  span: string
}

const N = (name: string, deva: string, lord: Graha, deity: string, symbol: string, gana: Gana, yoni: string, span: string): Nakshatra => ({ name, deva, lord, deity, symbol, gana, yoni, span })

export const nakshatras: Nakshatra[] = [
  N('Ashwini', 'ಅಶ್ವಿನೀ', 'Ketu', 'Ashwini Kumaras', "Horse's head", 'Deva', 'Horse', 'Mesha 0°00′ – 13°20′'),
  N('Bharani', 'ಭರಣೀ', 'Venus', 'Yama', 'Yoni (womb)', 'Manushya', 'Elephant', 'Mesha 13°20′ – 26°40′'),
  N('Krittika', 'ಕೃತ್ತಿಕಾ', 'Sun', 'Agni', 'Razor / flame', 'Rakshasa', 'Sheep', 'Mesha 26°40′ – Vrishabha 10°00′'),
  N('Rohini', 'ರೋಹಿಣೀ', 'Moon', 'Brahma (Prajapati)', 'Chariot / ox-cart', 'Manushya', 'Serpent', 'Vrishabha 10°00′ – 23°20′'),
  N('Mrigashira', 'ಮೃಗಶಿರಾ', 'Mars', 'Soma', "Deer's head", 'Deva', 'Serpent', 'Vrishabha 23°20′ – Mithuna 6°40′'),
  N('Ardra', 'ಆರ್ದ್ರಾ', 'Rahu', 'Rudra', 'Teardrop / diamond', 'Manushya', 'Dog', 'Mithuna 6°40′ – 20°00′'),
  N('Punarvasu', 'ಪುನರ್ವಸು', 'Jupiter', 'Aditi', 'Quiver of arrows', 'Deva', 'Cat', 'Mithuna 20°00′ – Karka 3°20′'),
  N('Pushya', 'ಪುಷ್ಯ', 'Saturn', 'Brihaspati', "Cow's udder / lotus", 'Deva', 'Sheep', 'Karka 3°20′ – 16°40′'),
  N('Ashlesha', 'ಆಶ್ಲೇಷಾ', 'Mercury', 'Nagas (Sarpa)', 'Coiled serpent', 'Rakshasa', 'Cat', 'Karka 16°40′ – 30°00′'),
  N('Magha', 'ಮಘಾ', 'Ketu', 'Pitrs (ancestors)', 'Royal throne', 'Rakshasa', 'Rat', 'Simha 0°00′ – 13°20′'),
  N('Purva Phalguni', 'ಪೂರ್ವ ಫಾಲ್ಗುನೀ', 'Venus', 'Bhaga', 'Front legs of a bed', 'Manushya', 'Rat', 'Simha 13°20′ – 26°40′'),
  N('Uttara Phalguni', 'ಉತ್ತರ ಫಾಲ್ಗುನೀ', 'Sun', 'Aryaman', 'Back legs of a bed', 'Manushya', 'Cow', 'Simha 26°40′ – Kanya 10°00′'),
  N('Hasta', 'ಹಸ್ತ', 'Moon', 'Savitr', 'Hand', 'Deva', 'Buffalo', 'Kanya 10°00′ – 23°20′'),
  N('Chitra', 'ಚಿತ್ರಾ', 'Mars', 'Tvashtar (Vishwakarma)', 'Bright jewel', 'Rakshasa', 'Tiger', 'Kanya 23°20′ – Tula 6°40′'),
  N('Swati', 'ಸ್ವಾತಿ', 'Rahu', 'Vayu', 'Young sprout in the wind', 'Deva', 'Buffalo', 'Tula 6°40′ – 20°00′'),
  N('Vishakha', 'ವಿಶಾಖಾ', 'Jupiter', 'Indra-Agni', 'Triumphal arch', 'Rakshasa', 'Tiger', 'Tula 20°00′ – Vrishchika 3°20′'),
  N('Anuradha', 'ಅನುರಾಧಾ', 'Saturn', 'Mitra', 'Lotus', 'Deva', 'Deer', 'Vrishchika 3°20′ – 16°40′'),
  N('Jyeshtha', 'ಜ್ಯೇಷ್ಠಾ', 'Mercury', 'Indra', 'Circular amulet / umbrella', 'Rakshasa', 'Deer', 'Vrishchika 16°40′ – 30°00′'),
  N('Mula', 'ಮೂಲ', 'Ketu', 'Nirriti', 'Bunch of roots', 'Rakshasa', 'Dog', 'Dhanu 0°00′ – 13°20′'),
  N('Purva Ashadha', 'ಪೂರ್ವಾಷಾಢ಼ಾ', 'Venus', 'Apah (waters)', 'Elephant tusk / fan', 'Manushya', 'Monkey', 'Dhanu 13°20′ – 26°40′'),
  N('Uttara Ashadha', 'ಉತ್ತರಾಷಾಢ಼ಾ', 'Sun', 'Vishvedevas', 'Planks of a bed', 'Manushya', 'Mongoose', 'Dhanu 26°40′ – Makara 10°00′'),
  N('Shravana', 'ಶ್ರವಣ', 'Moon', 'Vishnu', 'Ear / three footprints', 'Deva', 'Monkey', 'Makara 10°00′ – 23°20′'),
  N('Dhanishta', 'ಧನಿಷ್ಠಾ', 'Mars', 'Eight Vasus', 'Drum (mridanga)', 'Rakshasa', 'Lion', 'Makara 23°20′ – Kumbha 6°40′'),
  N('Shatabhisha', 'ಶತಭಿಷಾ', 'Rahu', 'Varuna', 'Empty circle (100 healers)', 'Rakshasa', 'Horse', 'Kumbha 6°40′ – 20°00′'),
  N('Purva Bhadrapada', 'ಪೂರ್ವ ಭಾದ್ರಪದ', 'Jupiter', 'Aja Ekapada', 'Front of a funeral cot / swords', 'Manushya', 'Lion', 'Kumbha 20°00′ – Meena 3°20′'),
  N('Uttara Bhadrapada', 'ಉತ್ತರ ಭಾದ್ರಪದ', 'Saturn', 'Ahirbudhnya', 'Back of a funeral cot / twins', 'Manushya', 'Cow', 'Meena 3°20′ – 16°40′'),
  N('Revati', 'ರೇವತೀ', 'Mercury', 'Pushan', 'Fish / drum', 'Deva', 'Elephant', 'Meena 16°40′ – 30°00′'),
]

const NADI_CYCLE: Nadi[] = ['Adi', 'Madhya', 'Antya', 'Antya', 'Madhya', 'Adi']
export const nadiOf = (nak: number): Nadi => NADI_CYCLE[nak % 6]

export interface GrahaInfo {
  key: Graha
  name: string
  deva: string
  day: string
  gem: string
  metal: string
  colour: string
  owns: string
  exalted: string
  debilitated: string
  dashaYears: number
  karaka: string
  mantra: string
  glyph: string
  hue: string
}

export const navagraha: GrahaInfo[] = [
  { key: 'Sun', name: 'Surya', deva: 'ಸೂರ್ಯ', day: 'Sunday (Ravivara)', gem: 'Ruby (Manikya)', metal: 'Copper / Gold', colour: 'Red, saffron', owns: 'Simha (Leo)', exalted: 'Mesha (Aries) 10°', debilitated: 'Tula (Libra) 10°', dashaYears: 6, karaka: 'Soul, father, authority, vitality', mantra: 'ಓಂ ಹ್ರಾಂ ಹ್ರೀಂ ಹ್ರೌಂ ಸಃ ಸೂರ್ಯಾಯ ನಮಃ', glyph: '☉', hue: '#E07B14' },
  { key: 'Moon', name: 'Chandra', deva: 'ಚನ್ದ್ರ', day: 'Monday (Somavara)', gem: 'Pearl (Moti)', metal: 'Silver', colour: 'White', owns: 'Karka (Cancer)', exalted: 'Vrishabha (Taurus) 3°', debilitated: 'Vrishchika (Scorpio) 3°', dashaYears: 10, karaka: 'Mind, mother, emotions, nourishment', mantra: 'ಓಂ ಶ್ರಾಂ ಶ್ರೀಂ ಶ್ರೌಂ ಸಃ ಚನ್ದ್ರಮಸೇ ನಮಃ', glyph: '☽', hue: '#BFC6D6' },
  { key: 'Mars', name: 'Mangala', deva: 'ಮಂಗಲ', day: 'Tuesday (Mangalavara)', gem: 'Red Coral (Moonga)', metal: 'Copper', colour: 'Red', owns: 'Mesha (Aries), Vrishchika (Scorpio)', exalted: 'Makara (Capricorn) 28°', debilitated: 'Karka (Cancer) 28°', dashaYears: 7, karaka: 'Courage, siblings, land, energy', mantra: 'ಓಂ ಕ್ರಾಂ ಕ್ರೀಂ ಕ್ರೌಂ ಸಃ ಭೌಮಾಯ ನಮಃ', glyph: '♂', hue: '#C0392B' },
  { key: 'Mercury', name: 'Budha', deva: 'ಬುಧ', day: 'Wednesday (Budhavara)', gem: 'Emerald (Panna)', metal: 'Bronze', colour: 'Green', owns: 'Mithuna (Gemini), Kanya (Virgo)', exalted: 'Kanya (Virgo) 15°', debilitated: 'Meena (Pisces) 15°', dashaYears: 17, karaka: 'Intellect, speech, trade, learning', mantra: 'ಓಂ ಬ್ರಾಂ ಬ್ರೀಂ ಬ್ರೌಂ ಸಃ ಬುಧಾಯ ನಮಃ', glyph: '☿', hue: '#2E8B57' },
  { key: 'Jupiter', name: 'Guru (Brihaspati)', deva: 'ಗುರು', day: 'Thursday (Guruvara)', gem: 'Yellow Sapphire (Pukhraj)', metal: 'Gold', colour: 'Yellow', owns: 'Dhanu (Sagittarius), Meena (Pisces)', exalted: 'Karka (Cancer) 5°', debilitated: 'Makara (Capricorn) 5°', dashaYears: 16, karaka: 'Wisdom, children, guru, fortune', mantra: 'ಓಂ ಗ್ರಾಂ ಗ್ರೀಂ ಗ್ರೌಂ ಸಃ ಗುರವೇ ನಮಃ', glyph: '♃', hue: '#E1A623' },
  { key: 'Venus', name: 'Shukra', deva: 'ಶುಕ್ರ', day: 'Friday (Shukravara)', gem: 'Diamond (Heera)', metal: 'Silver', colour: 'White, pastel', owns: 'Vrishabha (Taurus), Tula (Libra)', exalted: 'Meena (Pisces) 27°', debilitated: 'Kanya (Virgo) 27°', dashaYears: 20, karaka: 'Love, marriage, art, comforts', mantra: 'ಓಂ ದ್ರಾಂ ದ್ರೀಂ ದ್ರೌಂ ಸಃ ಶುಕ್ರಾಯ ನಮಃ', glyph: '♀', hue: '#D88FB0' },
  { key: 'Saturn', name: 'Shani', deva: 'ಶನಿ', day: 'Saturday (Shanivara)', gem: 'Blue Sapphire (Neelam)', metal: 'Iron', colour: 'Black, dark blue', owns: 'Makara (Capricorn), Kumbha (Aquarius)', exalted: 'Tula (Libra) 20°', debilitated: 'Mesha (Aries) 20°', dashaYears: 19, karaka: 'Karma, discipline, longevity, service', mantra: 'ಓಂ ಪ್ರಾಂ ಪ್ರೀಂ ಪ್ರೌಂ ಸಃ ಶನೈಶ್ಚರಾಯ ನಮಃ', glyph: '♄', hue: '#34495E' },
  { key: 'Rahu', name: 'Rahu', deva: 'ರಾಹು', day: 'Saturday', gem: 'Hessonite (Gomed)', metal: 'Lead', colour: 'Smoky', owns: 'Shadow graha (no sign of its own)', exalted: 'Vrishabha (Taurus) — per most texts', debilitated: 'Vrishchika (Scorpio) — per most texts', dashaYears: 18, karaka: 'Desire, foreign lands, illusion, innovation', mantra: 'ಓಂ ಭ್ರಾಂ ಭ್ರೀಂ ಭ್ರೌಂ ಸಃ ರಾಹವೇ ನಮಃ', glyph: '☊', hue: '#5D6D7E' },
  { key: 'Ketu', name: 'Ketu', deva: 'ಕೇತು', day: 'Tuesday', gem: "Cat's Eye (Lehsunia)", metal: 'Mixed metals', colour: 'Grey, multi-colour', owns: 'Shadow graha (no sign of its own)', exalted: 'Vrishchika (Scorpio) — per most texts', debilitated: 'Vrishabha (Taurus) — per most texts', dashaYears: 7, karaka: 'Detachment, moksha, past karma, intuition', mantra: 'ಓಂ ಸ್ರಾಂ ಸ್ರೀಂ ಸ್ರೌಂ ಸಃ ಕೇತವೇ ನಮಃ', glyph: '☋', hue: '#8E6E53' },
]

/** Vimshottari order (starting from Ketu) and years — total 120. */
export const dashaOrder: { lord: Graha; years: number }[] = [
  { lord: 'Ketu', years: 7 },
  { lord: 'Venus', years: 20 },
  { lord: 'Sun', years: 6 },
  { lord: 'Moon', years: 10 },
  { lord: 'Mars', years: 7 },
  { lord: 'Rahu', years: 18 },
  { lord: 'Jupiter', years: 16 },
  { lord: 'Saturn', years: 19 },
  { lord: 'Mercury', years: 17 },
]

export const grahaName = (g: Graha) => navagraha.find((x) => x.key === g)!.name
