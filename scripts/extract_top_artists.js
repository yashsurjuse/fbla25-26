const fs = require('fs');

const artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json'));
let artists = JSON.parse(fs.readFileSync('public/data/artists_master.json'));

const TOP_LIMIT = 500;
const topArtistsNames = new Set();
let count = 0;

for (let i = 0; count < TOP_LIMIT && i < artifacts.length; i++) {
  const art = artifacts[i];
  if (art.artistDisplayName) {
    if (!topArtistsNames.has(art.artistDisplayName)) {
      topArtistsNames.add(art.artistDisplayName);
      count++;
    }
  }
}

// Ensure all these artists exist
topArtistsNames.forEach(name => {
  if (!artists.find(a => a.name === name)) {
    artists.push({
      name,
      bio: `A celebrated artist whose incredible work is featured heavily in The Metropolitan Museum of Art.`,
      portrait_url: null,
      object_ids: []
    });
  }
});

// Update object_ids for all artists based on artifacts to fix missing paintings
const artistsMap = new Map();
artists.forEach(a => {
  a.object_ids = [];
  artistsMap.set(a.name, a);
});

artifacts.forEach(art => {
  if (art.artistDisplayName && artistsMap.has(art.artistDisplayName)) {
    artistsMap.get(art.artistDisplayName).object_ids.push(art.objectID);
  }
});

// Remove any duplicate artists that somehow exist
const uniqueArtists = [];
const seenNames = new Set();
artists.forEach(a => {
  if (!seenNames.has(a.name)) {
    seenNames.add(a.name);
    uniqueArtists.push(a);
  }
});
artists = uniqueArtists;

// Sort top artists to the top
artists.sort((a, b) => {
  const aTop = topArtistsNames.has(a.name);
  const bTop = topArtistsNames.has(b.name);
  if (aTop && !bTop) return -1;
  if (!aTop && bTop) return 1;
  return 0;
});

// Write intermediate just in case
fs.writeFileSync('public/data/artists_master.json', JSON.stringify(artists, null, 2));
console.log(`Updated artists! Top 500 artists sorted to front.`);
