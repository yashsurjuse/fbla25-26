const fs = require('fs');

async function rebuildArtists() {
    let artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json', 'utf-8'));
    
    // Count frequencies of artists
    const artistCounts = {};
    for (const a of artifacts) {
        if (a.artistDisplayName && a.artistDisplayName !== "Unknown" && a.artistDisplayName.length > 3) {
            artistCounts[a.artistDisplayName] = (artistCounts[a.artistDisplayName] || 0) + 1;
        }
    }
    
    // Sort by most artifacts
    const sortedNames = Object.entries(artistCounts)
        .sort((a, b) => b[1] - a[1])
        .map(e => e[0]);
    
    let realArtists = [];
    
    console.log(`Checking Wikipedia for real images...`);
    // Check top 150 artists, keep until we get ~40 with real images
    for (let i = 0; i < Math.min(250, sortedNames.length); i++) {
        const name = sortedNames[i];
        
        try {
            // 1. Search for page
            const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name)}&format=json&utf8=1`);
            const searchData = await searchRes.json();
            if (!searchData.query || !searchData.query.search || searchData.query.search.length === 0) continue;
            
            const title = searchData.query.search[0].title;
            
            // 2. Fetch page info including image and extract
            const infoRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages|extracts&titles=${encodeURIComponent(title)}&pithumbsize=600&exintro=1&explaintext=1&format=json`);
            const infoData = await infoRes.json();
            const pages = infoData.query.pages;
            const pageId = Object.keys(pages)[0];
            const pageInfo = pages[pageId];
            
            if (pageInfo.thumbnail && pageInfo.thumbnail.source && !pageInfo.thumbnail.source.includes('No_image')) {
                // We got a real image!
                let bio = pageInfo.extract || `${name} is a renowned artist whose works are featured in The Metropolitan Museum of Art.`;
                let sentences = bio.split('. ');
                bio = sentences.slice(0, 3).join('. ') + (sentences.length > 3 ? '.' : '');
                
                // Find artifacts for this artist
                const objIds = artifacts.filter(a => a.artistDisplayName === name).map(a => a.objectID);
                
                realArtists.push({
                    name: name,
                    bio: bio,
                    portrait_url: pageInfo.thumbnail.source,
                    object_ids: objIds
                });
                console.log(`Found image for ${name}`);
            }
        } catch(e) {
            console.log(`Error checking ${name}`);
        }
        
        if (realArtists.length >= 40) break; // 40 is plenty for the page to look good
    }
    
    fs.writeFileSync('public/data/artists_master.json', JSON.stringify(realArtists, null, 2));
    console.log(`Saved ${realArtists.length} artists with real pictures.`);
}

rebuildArtists();
