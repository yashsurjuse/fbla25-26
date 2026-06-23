const fs = require('fs');

async function run() {
  let artists = JSON.parse(fs.readFileSync('public/data/artists_master.json'));
  let fetchedCount = 0;

  for (let i = 0; i < Math.min(500, artists.length); i++) {
    const a = artists[i];
    
    // Check if it already has a non-avatar portrait
    if (a.portrait_url && !a.portrait_url.includes('ui-avatars')) {
      continue;
    }

    try {
      // 1. Search Wikipedia for the best matching page title
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(a.name)}&utf8=&format=json&srlimit=1`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();
      
      if (searchData.query?.search?.length > 0) {
        const bestTitle = searchData.query.search[0].title;
        
        // 2. Fetch the thumbnail for that exact title
        const imageRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(bestTitle)}&pithumbsize=500`);
        const imageData = await imageRes.json();
        
        const pages = imageData.query?.pages;
        if (pages) {
          const pageId = Object.keys(pages)[0];
          if (pageId !== '-1' && pages[pageId].thumbnail) {
            a.portrait_url = pages[pageId].thumbnail.source;
            console.log(`Fetched portrait for ${a.name} (Matched: ${bestTitle})`);
            fetchedCount++;
          } else {
             console.log(`No thumbnail found for ${a.name} (Matched: ${bestTitle})`);
          }
        }
      } else {
         console.log(`No wikipedia page found for ${a.name}`);
      }
    } catch (e) {
      console.log(`Failed to fetch for ${a.name}`);
    }
  }

  console.log(`Fetched ${fetchedCount} new portraits.`);
  fs.writeFileSync('public/data/artists_master.json', JSON.stringify(artists, null, 2));
}

run();
