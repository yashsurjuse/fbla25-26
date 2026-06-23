const fs = require('fs');

async function run() {
  console.log("Fetching top 500 highlights...");
  const res = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&q=a');
  const d = await res.json();
  const ids = d.objectIDs.slice(0, 500);
  
  const artifacts = [];
  for (let i = 0; i < ids.length; i++) {
    try {
      const artRes = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${ids[i]}`);
      const art = await artRes.json();
      if (art && art.objectID && art.primaryImageSmall) {
        artifacts.push(art);
      }
    } catch(e) {}
    if (i % 50 === 0) console.log(`Fetched ${i}/500`);
  }
  
  // load existing
  const existing = JSON.parse(fs.readFileSync('public/data/artifacts_master.json'));
  
  // remove any existing that are in the newly fetched ones to avoid duplicates
  const newIds = new Set(artifacts.map(a => a.objectID));
  const filteredExisting = existing.filter(a => !newIds.has(a.objectID));
  
  const combined = [...artifacts, ...filteredExisting];
  fs.writeFileSync('public/data/artifacts_master.json', JSON.stringify(combined, null, 2));
  console.log(`Saved! Total artifacts: ${combined.length}`);
}

run();
