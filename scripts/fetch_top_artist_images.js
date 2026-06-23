const fs = require('fs');

async function getWikiImage(name) {
  try {
    const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name)}&utf8=&format=json`);
    const searchData = await searchRes.json();
    if (!searchData.query.search.length) return null;
    
    const title = searchData.query.search[0].title;
    const imgRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=800&format=json`);
    const imgData = await imgRes.json();
    
    const pages = imgData.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pages[pageId] && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
  } catch(e) {}
  return null;
}

async function run() {
  const artists = JSON.parse(fs.readFileSync('public/data/artists_master.json'));
  let updated = 0;
  
  for (let i = 0; i < 500; i++) {
    const a = artists[i];
    if (!a.portrait_url || !a.portrait_url.includes('wikimedia.org')) {
      const url = await getWikiImage(a.name);
      if (url) {
        a.portrait_url = url;
        updated++;
      } else {
        // Fallback to UI Avatar if wiki image not found
        a.portrait_url = `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}&background=random&color=fff&size=512&font-size=0.33`;
      }
    }
    if (i % 50 === 0) console.log(`Processed ${i}/500`);
  }
  
  fs.writeFileSync('public/data/artists_master.json', JSON.stringify(artists, null, 2));
  console.log(`Updated ${updated} Wikipedia images for top 500 artists!`);
}

run();
