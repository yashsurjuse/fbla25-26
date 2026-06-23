const fs = require('fs');

function buildArtistsFromArtifacts() {
    let artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json', 'utf-8'));
    
    let artistMap = new Map();
    
    for (let a of artifacts) {
        if (!a.artistDisplayName || a.artistDisplayName.toLowerCase() === "unknown" || a.artistDisplayName.trim() === "") continue;
        
        let name = a.artistDisplayName;
        if (!artistMap.has(name)) {
            artistMap.set(name, {
                name: name,
                bio: `${name} is a renowned artist represented in The Metropolitan Museum of Art's extensive collection. Their work spans the ${a.department} department, showcasing exceptional mastery of their craft.`,
                portrait_url: a.primaryImageSmall, // Use their artwork as their portrait!
                object_ids: [a.objectID]
            });
        } else {
            let artist = artistMap.get(name);
            if (!artist.object_ids.includes(a.objectID)) {
                artist.object_ids.push(a.objectID);
            }
        }
    }
    
    let artistsArray = Array.from(artistMap.values());
    console.log(`Generated ${artistsArray.length} artists from artifacts.`);
    
    fs.writeFileSync('public/data/artists_master.json', JSON.stringify(artistsArray, null, 2));
}

buildArtistsFromArtifacts();
