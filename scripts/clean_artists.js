const fs = require('fs');

function cleanName(name) {
  if (!name) return name;
  return name.replace(/\s*\(.*?\)\s*/g, '').replace(/\s*\[.*?\]\s*/g, '').trim();
}

const TOP_20_ARTISTS = [
  "Leonardo da Vinci", "Vincent van Gogh", "Claude Monet", "Pablo Picasso", 
  "Rembrandt", "Michelangelo", "Johannes Vermeer", "Edgar Degas",
  "Paul Cézanne", "Auguste Rodin", "Emanuel Leutze", "John Singer Sargent",
  "Jacques-Louis David", "Katsushika Hokusai", "Jackson Pollock", "El Greco",
  "Diego Velázquez", "Pieter Bruegel the Elder", "Caravaggio", "Raphael"
];

async function run() {
  const artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json'));
  const oldArtists = JSON.parse(fs.readFileSync('public/data/artists_master.json'));
  
  const artistData = new Map();
  // Migrate existing portrait URLs
  oldArtists.forEach(a => {
    // split just in case the old database had merged ones
    a.name.split('|').forEach(n => {
      const c = cleanName(n);
      if (!artistData.has(c)) {
        artistData.set(c, { name: c, bio: a.bio, portrait_url: a.portrait_url, object_ids: new Set() });
      }
    });
  });

  // Clean artifacts
  artifacts.forEach(art => {
    if (art.title) art.title = cleanName(art.title);
    if (art.artistDisplayName) {
      const artistsSplit = art.artistDisplayName.split('|').map(n => cleanName(n)).filter(Boolean);
      art.artistDisplayName = artistsSplit.join(' | '); // Update artifact to show cleanly
      
      artistsSplit.forEach(aName => {
        if (!artistData.has(aName)) {
           artistData.set(aName, {
             name: aName,
             bio: `A prominent figure featured in The Metropolitan Museum of Art.`,
             portrait_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(aName)}&background=random&color=fff&size=512&font-size=0.33`,
             object_ids: new Set()
           });
        }
        artistData.get(aName).object_ids.add(art.objectID);
      });
    }
  });

  let finalArtists = Array.from(artistData.values()).map(a => ({
    ...a,
    object_ids: Array.from(a.object_ids)
  }));
  
  // Clean out weird artifacts that became artists (if they have no objects?)
  finalArtists = finalArtists.filter(a => a.object_ids.length > 0 && !a.name.match(/^[0-9]+ /)); // removes things like "7 Allen & Ginter"
  
  // Sort Top 20 to front
  finalArtists.sort((a, b) => {
    const idxA = TOP_20_ARTISTS.indexOf(a.name);
    const idxB = TOP_20_ARTISTS.indexOf(b.name);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    // fallback sort by number of artifacts to push famous ones up
    return b.object_ids.length - a.object_ids.length; 
  });

  fs.writeFileSync('public/data/artifacts_master.json', JSON.stringify(artifacts, null, 2));
  fs.writeFileSync('public/data/artists_master.json', JSON.stringify(finalArtists, null, 2));
  console.log(`Cleaned and separated artists! Total unique: ${finalArtists.length}`);
}

run();
