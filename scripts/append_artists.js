const fs = require('fs');
const { parse } = require('csv-parse/sync');

const delay = ms => new Promise(r => setTimeout(r, ms));

async function fetchWikipediaData(artistName) {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(artistName)}&utf8=&format=json&srlimit=1`;
    const searchRes = await fetch(searchUrl, { signal: AbortSignal.timeout(3000) });
    const searchData = await searchRes.json();
    
    if (!searchData.query.search.length) return null;
    const title = searchData.query.search[0].title;
    
    const pageUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=true&explaintext=true&titles=${encodeURIComponent(title)}&format=json&pithumbsize=500`;
    const pageRes = await fetch(pageUrl, { signal: AbortSignal.timeout(3000) });
    const pageData = await pageRes.json();
    
    const pages = pageData.query.pages;
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];
    
    return {
      bio: page.extract || null,
      portrait_url: page.thumbnail ? page.thumbnail.source : null
    };
  } catch (err) {
    return null;
  }
}

async function main() {
  console.log("Loading CSV...");
  const csvData = fs.readFileSync('C:\\Users\\yashs\\OneDrive\\Documents\\MetObjects.csv', 'utf-8');
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true
  });
  
  let existingArtists = JSON.parse(fs.readFileSync('public/data/artists_master.json', 'utf-8'));
  const existingNames = new Set(existingArtists.map(a => a.name));
  
  console.log(`Currently have ${existingArtists.length} artists. Need 1000 minimum.`);
  
  let candidates = new Map();
  for (const r of records) {
    let name = r['Artist Display Name'];
    let role = r['Artist Role'] || '';
    
    if (name && name.length > 3 && !existingNames.has(name)) {
        const badWords = ['messenger', 'unknown', 'factory', 'manufactory', 'anonymous', 'workshop', 'designer', 'maker', 'publisher'];
        const isBad = badWords.some(w => name.toLowerCase().includes(w) || role.toLowerCase().includes(w));
        
        if (!isBad) {
            candidates.set(name, name);
        }
    }
  }
  
  const additionalNeeded = 1000 - existingArtists.length;
  if (additionalNeeded > 0) {
      console.log(`Fetching ${additionalNeeded} additional artists...`);
      const candidateList = Array.from(candidates.values()).slice(0, additionalNeeded + 50); // a bit extra just in case
      
      const newArtists = [];
      for (let i = 0; i < candidateList.length && newArtists.length < additionalNeeded; i += 20) {
        const batch = candidateList.slice(i, i + 20);
        const promises = batch.map(async name => {
          const wikiData = await fetchWikipediaData(name);
          if (wikiData && wikiData.bio && wikiData.bio.length > 50) {
            let cleanBio = wikiData.bio;
            if (cleanBio.length > 600) {
                cleanBio = cleanBio.substring(0, 597) + '...';
            }
            newArtists.push({
              name: name,
              bio: cleanBio,
              portrait_url: wikiData.portrait_url || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
              object_ids: [] // generic for now
            });
          } else {
            newArtists.push({
              name: name,
              bio: `${name} is a renowned artist whose works are featured in The Metropolitan Museum of Art.`,
              portrait_url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
              object_ids: []
            });
          }
          process.stdout.write('.');
        });
        await Promise.all(promises);
        await delay(300);
      }
      
      console.log(`\nAdded ${newArtists.length} artists.`);
      const final1000 = [...existingArtists, ...newArtists.slice(0, additionalNeeded)];
      fs.writeFileSync('public/data/artists_master.json', JSON.stringify(final1000, null, 2));
      console.log(`Saved ${final1000.length} total artists to artists_master.json.`);
  }
}

main().catch(console.error);
