const fs = require('fs');

// 1. Fix Artists: Filter out anyone without a real portrait
let artists = JSON.parse(fs.readFileSync('public/data/artists_master.json', 'utf-8'));
const goodArtists = artists.filter(a => a.portrait_url && !a.portrait_url.includes('No_image_available.svg'));
fs.writeFileSync('public/data/artists_master.json', JSON.stringify(goodArtists, null, 2));

// 2. Fix Artifact Titles: Strip long explanations
let artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json', 'utf-8'));
artifacts.forEach(a => {
    if (a.title) {
        // Find the first occurrence of '(' or ',' and take everything before it.
        // Exception: if the title is very short, keep it.
        let cleaned = a.title;
        
        // Strip anything after first '('
        if (cleaned.includes('(')) {
            cleaned = cleaned.substring(0, cleaned.indexOf('(')).trim();
        }
        
        // Strip anything after first ',' if the comma is somewhat deep in the string
        // or just split by comma and take first part.
        if (cleaned.includes(',')) {
            // Some titles are like "Bowl, 14th century", we just want "Bowl".
            cleaned = cleaned.substring(0, cleaned.indexOf(',')).trim();
        }
        
        if (cleaned.length > 0) {
            a.title = cleaned;
        }
    }
});
fs.writeFileSync('public/data/artifacts_master.json', JSON.stringify(artifacts, null, 2));

console.log(`Filtered down to ${goodArtists.length} artists with real pictures.`);
console.log(`Cleaned artifact titles.`);
