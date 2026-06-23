const fs = require('fs');

async function run() {
  let artists = JSON.parse(fs.readFileSync('public/data/artists_master.json'));
  
  // 1. Filter out unknown/anonymous/unidentified
  const ignoreWords = ['unknown', 'anonymous', 'unidentified', 'artist', 'maker', 'painter', 'workshop'];
  artists = artists.filter(a => {
    const nameLower = a.name.toLowerCase();
    for (let word of ignoreWords) {
      if (nameLower.includes(word)) return false;
    }
    return true;
  });

  console.log(`Remaining artists after filter: ${artists.length}`);

  // 2. Fetch Wikipedia portraits for the top 500
  let fetchedCount = 0;
  for (let i = 0; i < Math.min(500, artists.length); i++) {
    const a = artists[i];
    
    // Check if it already has a non-avatar portrait
    if (a.portrait_url && !a.portrait_url.includes('ui-avatars')) {
      continue;
    }

    try {
      // Use wikipedia API
      const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(a.name)}&pithumbsize=500`);
      const data = await searchRes.json();
      
      const pages = data.query?.pages;
      if (pages) {
        const pageId = Object.keys(pages)[0];
        if (pageId !== '-1' && pages[pageId].thumbnail) {
          a.portrait_url = pages[pageId].thumbnail.source;
          console.log(`Fetched portrait for ${a.name}`);
          fetchedCount++;
        }
      }
    } catch (e) {
      console.log(`Failed to fetch for ${a.name}`);
    }
  }

  console.log(`Fetched ${fetchedCount} new portraits.`);
  fs.writeFileSync('public/data/artists_master.json', JSON.stringify(artists, null, 2));
}

run();
