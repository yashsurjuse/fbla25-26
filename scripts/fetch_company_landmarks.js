const fs = require('fs');

async function run() {
  let artists = JSON.parse(fs.readFileSync('public/data/artists_master.json'));
  let fetchedCount = 0;
  
  const headers = {
    'User-Agent': 'TheMetArchivist/1.0 (Contact: admin@example.com)'
  };

  const companyKeywords = ['company', 'co.', 'manufactory', 'works', 'factory', 'brothers', 'sons', 'inc', 'ltd'];

  for (let i = 0; i < artists.length; i++) {
    const a = artists[i];
    
    // Only target UI avatars
    if (!a.portrait_url || !a.portrait_url.includes('ui-avatars')) {
      continue;
    }

    const nameLower = a.name.toLowerCase();
    const isCompany = companyKeywords.some(kw => nameLower.includes(kw));

    if (isCompany) {
      // Find a good landmark keyword (first word > 3 chars)
      const words = a.name.split(/[^a-zA-Z]+/);
      const keyword = words.find(w => w.length > 3 && w.toLowerCase() !== 'company' && w.toLowerCase() !== 'factory');
      
      if (!keyword) continue;

      try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(keyword)}&utf8=&format=json&srlimit=1`;
        const searchRes = await fetch(searchUrl, { headers });
        const searchData = await searchRes.json();
        
        if (searchData.query?.search?.length > 0) {
          const bestTitle = searchData.query.search[0].title;
          
          const imageRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(bestTitle)}&pithumbsize=500`, { headers });
          const imageData = await imageRes.json();
          
          const pages = imageData.query?.pages;
          if (pages) {
            const pageId = Object.keys(pages)[0];
            if (pageId !== '-1' && pages[pageId].thumbnail) {
              a.portrait_url = pages[pageId].thumbnail.source;
              console.log(`Fetched landmark ${bestTitle} for company ${a.name}`);
              fetchedCount++;
            }
          }
        }
        
        await new Promise(r => setTimeout(r, 250));
      } catch (e) {
        console.log(`Failed for ${a.name}`);
      }
    }
  }

  console.log(`Fetched ${fetchedCount} landmark images for companies.`);
  fs.writeFileSync('public/data/artists_master.json', JSON.stringify(artists, null, 2));
}

run();
