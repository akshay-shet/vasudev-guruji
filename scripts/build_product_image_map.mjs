import fs from 'fs';

const jitenCatalog = JSON.parse(fs.readFileSync('scripts/jiten_catalog.json', 'utf8'));
const plusCatalog = JSON.parse(fs.readFileSync('scripts/plusvalue_catalog.json', 'utf8'));
const checklist = JSON.parse(fs.readFileSync('scripts/products_checklist.json', 'utf8'));

const pool = [
  ...jitenCatalog.map(p => ({ title: p.title, img: p.images[0]?.src, src: 'jiten' })),
  ...plusCatalog.map(p => ({ title: p.title, img: p.images[0]?.src, src: 'plus' }))
].filter(p => p.img);

function findExactOrFuzzy(query, fallback) {
  const q = query.toLowerCase();
  const found = pool.find(p => p.title.toLowerCase().includes(q));
  if (found) return found;
  if (fallback) {
    const fb = pool.find(p => p.title.toLowerCase().includes(fallback.toLowerCase()));
    if (fb) return fb;
  }
  return null;
}

// Explicit mappings map: id -> query
const explicitMap = {
  // Pyramids
  'energy-01': 'Energy 9x9 Prime',
  'jiten1-01': 'Yantron Disc',
  'jiten1-02': 'Divine Locket Is A Pyramid Yantra',
  'jiten1-03': 'Fortune Glass Gold',
  'jiten1-04': 'Fortune Door Gold',
  'jiten1-05': 'Promax Is A Pyramid Vastu Yantra',
  'jiten1-06': 'Ashta Ganesh Pyramid Disc',
  'jiten1-07': 'Eye 9x9 Vastu Yantra',
  'jiten1-08': 'Luck 9x9 Pyramid Vastu Yantra',
  'jiten1-09': 'Fortune Master Card',
  'jiten1-10': 'VIP Fortune Card',
  'jiten1-11': 'Supreme Disc Protection',
  'jiten1-12': 'Doorink Copper pyramid',
  'jiten1-13': 'Fortune Key Chain',
  'jiten1-14': 'Fortune Chip',
  'jiten2-01': 'Pyra Fire Is A Pramid',
  'jiten2-02': 'Smart Fire Pyramid Vastu',
  'jiten2-03': 'Fortune Fire - Copper',
  'jiten2-04': 'Table Max Pyramid',
  'jiten2-05': 'Promax 5G is a pyramid',
  'jiten2-06': 'Prime Wish -  Desire Manifestation',
  'jiten2-07': 'Wish Pyramid Vastu Yantra',
  'jiten2-08': 'Marriage Pyramid Is A Vastu',
  'jiten2-09': 'Protect 9X9 Eco Is A Pyramid',
  'jiten2-10': 'Education Pyramid With Saraswati',
  'jiten2-11': 'Education Pyramid Gold Yantra',
  'jiten2-12': 'Back & Belly Belt',
  'jiten2-13': 'Jiten Pyra Shubh Labh For Vastu',
  'jiten2-14': 'Pyra Shubh Labh-Mega',
  'jiten2-15': 'Bed Pro – Sleep Energy',

  // PyraCards
  'pyracard-01': 'Pyra Card - Luck & Fortune',
  'pyracard-02': 'Pyra Card- Energy & Vitality',
  'pyracard-03': 'Pyra Card- Job And Pramotion',
  'pyracard-04': 'Pyra Card- Foreign & Higher Study',
  'pyracard-05': 'Pyra Card - Money & Finance',
  'pyracard-06': 'Pyra Card- Fame And Power',
  'pyracard-07': 'Pyra Card - Success And Progress',
  'pyracard-08': 'Pyra Card - Memory And Concentration',
  'pyracard-09': 'Pyra Card - Protection And Safe Guard',
  'pyracard-10': 'Pyra Card- Peace And Relaxation',
  'pyracard-11': 'Pyra Card - Marriage And Love',
  'pyracard-12': 'Pyra Card - Strength And Confidence',
  'pyracard-13': 'Pyra Card - Family And Children',
  'pyracard-14': 'Pyra Card -Business And Career',
  'pyracard-15': 'Pyra Card - Positivity And Happiness',
  'pyracard-16': 'Pyra Card - Legal And Court Case',

  // Pyron
  'pyron-01': 'Pyron Gold - Friend',
  'pyron-02': 'Pyron - Sun & Vitality',
  'pyron-03': 'Pyron - Saturn- Happiness',
  'pyron-04': 'Pyron - Green Family Relationship',
  'pyron-05': 'Pyron - Moon – Calm mind',
  'pyron-06': 'Pyron - Rahu Status',
  'pyron-07': 'Pyron - Brown Education',
  'pyron-08': 'Pyron Gold - Courage',
  'pyron-09': 'Pyron  Ketu  Prosperity',
  'pyron-10': 'Pyron - Blue Career',
  'pyron-11': 'Pyron - Mercury Business',
  'pyron-12': 'Pyron - Pink Love',
  'pyron-13': 'Pyron - Metallic Helpful Friends',
  'pyron-14': 'Pyron - Jupiter spirituality',
  'pyron-15': 'Pyron - Red Fame',
  'pyron-16': 'Pyron - Gray- Children',
  'pyron-17': 'Pyron -  Venus- Luxury',
  'pyron-18': 'Pyron- Live Green Wealth',
  'pyron-19': 'Pyron -Yellow Health',

  // Bracelets
  'bracelet-01': 'Wealth Abundance Bracelet | Dhan Yog',
  'bracelet-02': 'Combined Tiger Eye Hematite Black Obsidian Bracelet',
  'bracelet-03': 'Original 7 Chakra Protection Bracelet',
  'bracelet-04': 'Tiger Eye Bracelet Stone of Strength',
  'bracelet-05': 'Natural Pink Rose Quartz Bracelet To Attract Love',
  'bracelet-06': 'Rose Quartz and Amethyst Bracelet For Mind Healing',
  'bracelet-07': 'Combined Green Aventurine and Citrine Bracelet',
  'bracelet-08': "Education Bracelet for Boy's and Girls",
  'bracelet-09': 'Pyrite Bracelet to Attract Abundance',
  'bracelet-10': 'Green Aventurine Bracelet for Health Luck',
  'bracelet-11': 'New Fancy Pattern Wealth Abundance Bracelet',
  'bracelet-12': 'Vastu Earth Potli (Premium)',

  // Accessories
  'acc-01': 'Protect Car Is A Pyramid Yantra',
  'acc-02': 'Reiki Card Set Is A Personal Well Being',
  'acc-03': 'Swastik 700 Gold Is Pyramid Yantra',
  'acc-04': 'Swastik Pyramid Mini Yantra Brings All Round',
  'acc-05': 'Swastik Copper Is A Pyramid Vastu',
  'acc-06': 'Pyron 9G Is A Pyramid Vastu Yantra For Overall',
  'acc-07': 'Pyra Arrow Gold – Directional Energy Correction',
  'acc-08': 'Airon Vastu Spray For Positivity',
  'acc-09': 'Vastu Salt Himalayan Rock Salt',
  'acc-10': 'Jiten Pyramid Gold Aum',
  'acc-11': 'Jiten Gold Cross For Divine Blessings',
  'acc-12': 'Trishul',
  'acc-13': 'Ashta Ganesh Pyramid Disc',
  'acc-14': 'Pyra Arrow Gold – Directional Energy',
  'acc-15': 'Education Pyramid Gold Yantra'
};

const results = [];
for (const item of checklist) {
  const query = explicitMap[item.id] || item.name;
  const match = findExactOrFuzzy(query);
  if (match) {
    results.push({
      id: item.id,
      name: item.name,
      file: item.file,
      matchedTitle: match.title,
      imgUrl: match.img,
      source: match.src
    });
  } else {
    results.push({
      id: item.id,
      name: item.name,
      file: item.file,
      matchedTitle: null,
      imgUrl: null
    });
  }
}

const missing = results.filter(r => !r.imgUrl);
console.log(`Matched: ${results.length - missing.length} / ${results.length}`);
if (missing.length > 0) {
  console.log('Still missing:', missing.map(m => `${m.id}: ${m.name}`));
}

fs.writeFileSync('scripts/mapped_products.json', JSON.stringify(results, null, 2));
