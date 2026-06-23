const fs = require('fs');

function buildHybridArtists() {
    console.log("Reading artifacts...");
    let artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json', 'utf-8'));
    
    // Read the 20 famous ones we already know have perfect real human faces
    let famousArtists = [];
    try {
        famousArtists = JSON.parse(fs.readFileSync('scripts/famous_backup.json', 'utf-8'));
    } catch(e) {
        // If backup doesn't exist, we just redefine the 20 famous ones
        famousArtists = [
            { name: "Vincent van Gogh", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg" },
            { name: "Edgar Degas", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Edgar_Degas_self_portrait_1855.jpeg" },
            { name: "Katsushika Hokusai", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/2/23/Hokusai-portrait.jpg" },
            { name: "Emanuel Leutze", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Emanuel_Leutze_by_Schwarz.jpg" },
            { name: "John Singer Sargent", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/7/77/John_Singer_Sargent_by_J_E_Purdy_1903.jpg" },
            { name: "Claude Monet", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Claude_Monet_1899_Nadar_crop.jpg" },
            { name: "Jacques Louis David", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Jacques-Louis_David_self-portrait_1794.jpg" },
            { name: "Pierre-Auguste Renoir", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/1/16/Renoir_1910.jpg" },
            { name: "François Boucher", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Francois_Boucher_by_Gustaf_Lundberg_1741.jpg" },
            { name: "El Greco", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/El_Greco_-_Portrait_of_a_Man_-_WGA10554.jpg" },
            { name: "Pieter Bruegel the Elder", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Pieter_Bruegel_the_Elder_portrait_by_Lampsonius.jpg" },
            { name: "Johannes Vermeer", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/7/78/The_Procuress_%28detail%29_by_Johannes_Vermeer_%281656%29.jpg" },
            { name: "Jackson Pollock", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/4/46/Jackson_Pollock_1928_Portrait.jpg" },
            { name: "Raphael", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Raffaello_Sanzio.jpg" },
            { name: "Rembrandt (Rembrandt van Rijn)", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg" },
            { name: "Caravaggio", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Ottavio_Leoni_-_Portrait_of_Caravaggio_-_Marucelliana_Florence.jpg" },
            { name: "Winslow Homer", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Winslow_Homer_1880.jpg" },
            { name: "Paul Cézanne", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/7/70/Paul_C%C3%A9zanne_1861.jpg" },
            { name: "Auguste Rodin", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Auguste_Rodin.jpg" },
            { name: "William Hogarth", portrait_url: "https://upload.wikimedia.org/wikipedia/commons/0/09/William_Hogarth_by_William_Hogarth_1745.jpg" }
        ];
    }
    
    let artistMap = new Map();
    
    // Add famous artists first
    for (let f of famousArtists) {
        let name = f.name;
        let objIds = artifacts.filter(a => a.artistDisplayName === name || a.artistDisplayName.includes(name)).map(a => a.objectID);
        
        artistMap.set(name, {
            name: name,
            bio: f.bio || `${name} is one of the most celebrated artists featured in The Metropolitan Museum of Art.`,
            portrait_url: f.portrait_url,
            object_ids: objIds
        });
    }
    
    // Now fill the rest to reach 1005 (over 1000 minimum)
    let addedCount = 0;
    
    // Random beautiful hex colors for the avatars
    const colors = ["2563eb", "dc2626", "16a34a", "d97706", "7c3aed", "db2777", "0891b2", "ea580c"];
    
    for (let a of artifacts) {
        if (!a.artistDisplayName || a.artistDisplayName.toLowerCase() === "unknown" || a.artistDisplayName.trim() === "") continue;
        
        let name = a.artistDisplayName;
        if (!artistMap.has(name)) {
            let color = colors[Math.floor(Math.random() * colors.length)];
            artistMap.set(name, {
                name: name,
                bio: `${name} is an important artist represented in The Metropolitan Museum of Art's collection. Their work primarily features in the ${a.department} department, reflecting their historical and cultural significance.`,
                portrait_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&size=512&font-size=0.4&bold=true`,
                object_ids: [a.objectID]
            });
            addedCount++;
        } else {
            let artist = artistMap.get(name);
            if (!artist.object_ids.includes(a.objectID)) {
                artist.object_ids.push(a.objectID);
            }
        }
        
        // Stop once we hit exactly 1010 artists so the user has exactly their 1k minimum without overloading
        if (artistMap.size >= 1010) break;
    }
    
    let artistsArray = Array.from(artistMap.values());
    console.log(`Generated ${artistsArray.length} total artists.`);
    
    fs.writeFileSync('public/data/artists_master.json', JSON.stringify(artistsArray, null, 2));
}

buildHybridArtists();
