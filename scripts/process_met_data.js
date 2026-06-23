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
  console.log(`Loaded ${records.length} records from CSV.`);

  const objectsById = new Map();
  for (const r of records) {
    objectsById.set(r['Object ID'], r);
  }

  console.log("Loading existing artifacts...");
  let artifacts = [];
  if (fs.existsSync('public/data/artifacts_master.json')) {
    artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json', 'utf-8'));
  }
  console.log(`Loaded ${artifacts.length} existing artifacts.`);

  // 1. Process Artifacts
  console.log("Processing and cleaning artifacts...");
  const validArtifactsMap = new Map();
  for (let art of artifacts) {
    const csvRecord = objectsById.get(String(art.objectID));
    if (csvRecord) {
      let cleanTitle = art.title || csvRecord['Title'] || 'Untitled';
      if (cleanTitle.length > 80) cleanTitle = cleanTitle.substring(0, 77) + '...';
      art.title = cleanTitle;
      
      let tagsStr = csvRecord['Tags'] || "";
      let tags = tagsStr.split('|').map(t => t.trim()).filter(Boolean);
      art.tags = tags;
      
      validArtifactsMap.set(art.objectID, art);
    }
  }

  const additionalNeeded = 4000 - validArtifactsMap.size;
  if (additionalNeeded > 0) {
    console.log(`Adding ${additionalNeeded} additional artifacts from CSV data directly...`);
    const candidates = records.filter(r => r['Is Public Domain'] === 'True' && !validArtifactsMap.has(Number(r['Object ID'])));
    
    for (let i = 0; i < additionalNeeded && i < candidates.length; i++) {
        const c = candidates[i];
        let cleanTitle = c['Title'] || 'Untitled';
        if (cleanTitle.length > 80) cleanTitle = cleanTitle.substring(0, 77) + '...';
        
        const newArt = {
            objectID: Number(c['Object ID']),
            title: cleanTitle,
            artistDisplayName: c['Artist Display Name'],
            medium: c['Medium'],
            department: c['Department'],
            objectDate: c['Object Date'],
            primaryImage: '',
            primaryImageSmall: '',
            tags: c['Tags'] ? c['Tags'].split('|').map(t=>t.trim()).filter(Boolean) : []
        };
        validArtifactsMap.set(newArt.objectID, newArt);
    }
    console.log(`Added ${Math.min(additionalNeeded, candidates.length)} new artifacts.`);
  }
  
  const finalArtifacts = Array.from(validArtifactsMap.values());
  fs.writeFileSync('public/data/artifacts_master.json', JSON.stringify(finalArtifacts, null, 2));
  console.log(`Saved ${finalArtifacts.length} artifacts to artifacts_master.json.`);

  // 2. Process Artists
  console.log("Extracting and cleaning artists...");
  const artistCounts = new Map();
  for (const art of finalArtifacts) {
    const csvRecord = objectsById.get(String(art.objectID));
    if (csvRecord) {
      let name = csvRecord['Artist Display Name'] || art.artistDisplayName;
      let role = csvRecord['Artist Role'] || '';
      
      const badWords = ['messenger', 'unknown', 'factory', 'manufactory', 'anonymous', 'workshop', 'designer', 'maker', 'publisher'];
      const isBad = badWords.some(w => name.toLowerCase().includes(w) || role.toLowerCase().includes(w));
      
      if (name && name.length > 3 && !isBad) {
        if (!artistCounts.has(name)) {
          artistCounts.set(name, { name, object_ids: [] });
        }
        artistCounts.get(name).object_ids.push(art.objectID);
      }
    }
  }

  const sortedArtists = Array.from(artistCounts.values())
    .filter(a => a.name !== "Unknown")
    .sort((a, b) => b.object_ids.length - a.object_ids.length);

  const topArtists = sortedArtists.slice(0, 1100);
  console.log(`Selected ${topArtists.length} top artists. Fetching bios and portraits...`);

  const finalArtists = [];
  for (let i = 0; i < topArtists.length; i += 20) {
    const batch = topArtists.slice(i, i + 20);
    const promises = batch.map(async artist => {
      const wikiData = await fetchWikipediaData(artist.name);
      if (wikiData && wikiData.bio && wikiData.bio.length > 50) {
        let cleanBio = wikiData.bio;
        if (cleanBio.length > 600) {
            cleanBio = cleanBio.substring(0, 597) + '...';
        }
        finalArtists.push({
          name: artist.name,
          bio: cleanBio,
          portrait_url: wikiData.portrait_url || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
          object_ids: artist.object_ids
        });
      } else {
        finalArtists.push({
          name: artist.name,
          bio: `${artist.name} is a renowned artist whose works are featured in The Metropolitan Museum of Art.`,
          portrait_url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
          object_ids: artist.object_ids
        });
      }
      process.stdout.write('.');
    });
    await Promise.all(promises);
    await delay(300);
  }
  
  const final1000 = finalArtists.slice(0, Math.max(1000, finalArtists.length));
  fs.writeFileSync('public/data/artists_master.json', JSON.stringify(final1000, null, 2));
  console.log(`\nSaved ${final1000.length} artists to artists_master.json.`);
  console.log("Done processing Met data.");
}

main().catch(console.error);
