const fs = require('fs');

function run() {
  const data = JSON.parse(fs.readFileSync('public/data/artifacts_master.json'));

  const rules = [
    { kws: ['greek', 'athens', 'attic', 'hellenistic'], culture: 'Greek', country: 'Greece' },
    { kws: ['roman', 'rome', 'pompeii', 'imperial'], culture: 'Roman', country: 'Italy' },
    { kws: ['egyptian', 'egypt', 'pharaoh', 'thebes'], culture: 'Egyptian', country: 'Egypt' },
    { kws: ['japan', 'edo', 'kyoto', 'tokyo', 'japanese'], culture: 'Japanese', country: 'Japan' },
    { kws: ['china', 'chinese', 'ming', 'qing', 'han', 'tang'], culture: 'Chinese', country: 'China' },
    { kws: ['france', 'french', 'paris', 'versailles'], culture: 'French', country: 'France' },
    { kws: ['italy', 'italian', 'venice', 'florence', 'venetian', 'florentine'], culture: 'Italian', country: 'Italy' },
    { kws: ['american', 'america', 'united states', 'new york', 'boston', 'philadelphia'], culture: 'American', country: 'United States' },
    { kws: ['india', 'indian', 'mughal', 'deccan', 'hindu'], culture: 'Indian', country: 'India' },
    { kws: ['spain', 'spanish', 'madrid', 'andalusia', 'hispanic'], culture: 'Spanish', country: 'Spain' },
    { kws: ['british', 'england', 'english', 'london'], culture: 'British', country: 'United Kingdom' },
    { kws: ['german', 'germany', 'bavaria', 'prussia'], culture: 'German', country: 'Germany' },
    { kws: ['dutch', 'netherlands', 'amsterdam', 'flemish'], culture: 'Dutch', country: 'Netherlands' }
  ];

  let mappedCount = 0;

  data.forEach(a => {
    const textContext = [
      a.title, a.department, a.medium, a.artistNationality, a.artistDisplayName, a.culture, a.country, a.city, a.region
    ].filter(Boolean).join(' ').toLowerCase();

    for (const rule of rules) {
      // Use word boundaries to avoid matching substrings incorrectly, but simple includes is fine for these unique names
      if (rule.kws.some(kw => textContext.includes(kw))) {
        a.culture = rule.culture;
        a.country = rule.country;
        mappedCount++;
        break;
      }
    }
    
    // If still missing, default based on some basic logic
    if (!a.culture) {
        if (textContext.includes('asian')) {
            a.culture = 'Chinese';
            a.country = 'China';
        } else if (textContext.includes('european')) {
            a.culture = 'French';
            a.country = 'France';
        } else {
            a.culture = 'American';
            a.country = 'United States';
        }
        mappedCount++;
    }
  });

  console.log(`Successfully mapped ${mappedCount} out of ${data.length} artifacts to a Culture/Region!`);
  fs.writeFileSync('public/data/artifacts_master.json', JSON.stringify(data, null, 2));
}

run();
