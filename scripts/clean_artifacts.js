const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/data/artifacts_master.json'));

const originalLength = data.length;

const junkKeywords = [
  'furniture hardware', 'andiron', 'fragment', 'sherd', 'mount', 'fitting',
  'terracotta', 'glass fragment', 'knob', 'handle', 'nail', 'screw', 'hinge',
  'bracket', 'plate', 'bowl', 'cup', 'vase', 'dish', 'bottle', 'jar', 'jug',
  'pitcher', 'teapot', 'saucer', 'spoon', 'fork', 'knife', 'ladle', 'tongs'
];

const filtered = data.filter(a => {
  if (!a.title) return false;
  const t = a.title.toLowerCase();
  
  // Exact match bans for generic objects
  const exactBans = ['furniture hardware', 'andiron', 'bowl', 'cup', 'vase', 'plate', 'dish', 'bottle', 'jar', 'jug', 'pitcher', 'teapot', 'saucer', 'spoon', 'fork', 'knife', 'ladle', 'tongs', 'mount', 'fitting', 'knob', 'handle', 'nail', 'screw', 'hinge', 'bracket', 'amulet', 'scarab'];
  if (exactBans.includes(t)) return false;

  // Contains bans
  if (t.includes('fragment') || t.includes('sherd') || t.includes('terracotta fragment')) return false;

  return true;
});

// Also remove exact duplicates by title + primaryImageSmall to be safe
const seen = new Set();
const deduplicated = filtered.filter(a => {
  const key = a.title + '|' + (a.primaryImageSmall || '');
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

console.log(`Removed ${originalLength - deduplicated.length} junk/duplicate artifacts.`);

fs.writeFileSync('public/data/artifacts_master.json', JSON.stringify(deduplicated, null, 2));
