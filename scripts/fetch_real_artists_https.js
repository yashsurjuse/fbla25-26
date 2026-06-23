const fs = require('fs');
const https = require('https');

function httpsGet(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'MetMuseumProject/1.0 (test@example.com)' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch(e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

async function fetchRealArtists() {
    console.log("Reading MetObjects.csv...");
    const csvData = fs.readFileSync('C:\\Users\\yashs\\OneDrive\\Documents\\MetObjects.csv', 'utf-8');
    
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const idIdx = headers.findIndex(h => h === 'Object ID');
    let artistIdx = headers.findIndex(h => h === 'Artist Display Name');
    if (artistIdx === -1) artistIdx = 14;
    
    let artistMap = new Map();
    
    for (let i = 1; i < lines.length; i++) {
        const row = lines[i];
        if (!row) continue;
        
        const cols = [];
        let cur = '';
        let inQuotes = false;
        for (let char of row) {
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) { cols.push(cur); cur = ''; }
            else cur += char;
        }
        cols.push(cur);
        
        if (cols.length > artistIdx) {
            let artist = cols[artistIdx].trim();
            let objId = parseInt(cols[idIdx]);
            
            if (artist && artist !== "Unknown" && artist.length > 3 && !artist.includes('|')) {
                if (!artistMap.has(artist)) {
                    artistMap.set(artist, { name: artist, object_ids: [objId] });
                } else {
                    let a = artistMap.get(artist);
                    if (a.object_ids.length < 15) a.object_ids.push(objId);
                }
            }
        }
    }
    
    let allArtists = Array.from(artistMap.values()).sort((a, b) => b.object_ids.length - a.object_ids.length);
    console.log(`Found ${allArtists.length} unique artists. Starting Wikipedia fetch via HTTPS...`);
    
    let finalArtists = [];
    let checked = 0;
    const BATCH_SIZE = 25;
    
    for (let i = 0; i < allArtists.length; i += BATCH_SIZE) {
        if (finalArtists.length >= 1000) break;
        
        const batch = allArtists.slice(i, i + BATCH_SIZE);
        checked += batch.length;
        
        const promises = batch.map(async (artistObj) => {
            try {
                const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(artistObj.name)}&format=json&utf8=1`;
                const searchData = await httpsGet(searchUrl);
                if (!searchData || !searchData.query || !searchData.query.search || searchData.query.search.length === 0) return null;
                
                const title = searchData.query.search[0].title;
                const infoUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages|extracts&titles=${encodeURIComponent(title)}&pithumbsize=600&exintro=1&explaintext=1&format=json`;
                const infoData = await httpsGet(infoUrl);
                
                if (!infoData) return null;
                const pages = infoData.query.pages;
                const pageId = Object.keys(pages)[0];
                const pageInfo = pages[pageId];
                
                if (pageInfo.thumbnail && pageInfo.thumbnail.source && !pageInfo.thumbnail.source.includes('No_image') && !pageInfo.thumbnail.source.includes('Flag_of') && !pageInfo.thumbnail.source.includes('Question_mark') && pageInfo.extract && pageInfo.extract.length > 50) {
                    
                    let bio = pageInfo.extract;
                    let sentences = bio.split('. ');
                    bio = sentences.slice(0, 3).join('. ') + (sentences.length > 3 ? '.' : '');
                    
                    return {
                        name: artistObj.name,
                        bio: bio,
                        portrait_url: pageInfo.thumbnail.source,
                        object_ids: artistObj.object_ids
                    };
                }
            } catch (e) {}
            return null;
        });
        
        const results = await Promise.all(promises);
        for (let res of results) {
            if (res && finalArtists.length < 1000) {
                finalArtists.push(res);
                console.log(`Found valid artist: ${res.name}`);
            }
        }
        
        console.log(`Checked ${checked}/${allArtists.length}. Found ${finalArtists.length}/1000 valid artists.`);
    }
    
    fs.writeFileSync('public/data/artists_master.json', JSON.stringify(finalArtists, null, 2));
    console.log(`Successfully saved ${finalArtists.length} artists with real portraits and bios!`);
}

fetchRealArtists();
