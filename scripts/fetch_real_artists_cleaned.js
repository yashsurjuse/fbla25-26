const fs = require('fs');
const https = require('https');

let artists = JSON.parse(fs.readFileSync('public/data/artists_master.json', 'utf-8'));

function isAnonymous(name) {
    name = name.toLowerCase();
    return name.includes('unknown') || 
           name.includes('anonymous') || 
           name.includes('unidentified') || 
           name.includes('maker') || 
           name.includes('workshop') || 
           name.includes('school of') ||
           name.includes('style of') ||
           name.includes('attributed to') ||
           name.includes('company') ||
           name.includes('factory');
}

function cleanName(name) {
    if (name.includes('|')) name = name.split('|')[0];
    if (name.includes('(')) name = name.split('(')[0];
    return name.trim();
}

async function fetchWikipediaImage(name) {
    return new Promise((resolve) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=600`;
        const req = https.get(url, { headers: { 'User-Agent': 'FBLA-Met-Project/1.0 (yash@example.com)' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const pages = json.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pageId !== '-1' && pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
                        const img = pages[pageId].thumbnail.source;
                        // Avoid generic placeholders
                        if (!img.includes('No_image') && !img.includes('Flag_of') && !img.includes('Red_Pencil_Icon')) {
                            resolve(img);
                            return;
                        }
                    }
                    resolve(null);
                } catch(e) {
                    resolve(null);
                }
            });
        });
        req.on('error', () => resolve(null));
    });
}

// We want to fetch the real images for the top 600 non-anonymous artists.
// First, sort by most prolific (object_ids.length)
artists.sort((a, b) => b.object_ids.length - a.object_ids.length);

async function run() {
    let checked = 0;
    let found = 0;
    
    for (let i = 0; i < artists.length; i++) {
        let a = artists[i];
        if (isAnonymous(a.name)) continue;
        
        checked++;
        if (checked > 800) break; // Try up to 800 people to find as many as possible
        
        let cleaned = cleanName(a.name);
        
        console.log(`Checking [${checked}]: ${cleaned}...`);
        
        let img = await fetchWikipediaImage(cleaned);
        if (img) {
            console.log(` ---> FOUND: ${img}`);
            a.portrait_url = img;
            found++;
        } else {
            // Default to UI avatar
            const colors = ["2B2B2B", "1A365D", "064E3B", "78350F", "4C1D95", "831843", "0F766E"];
            const color = colors[Math.floor(Math.random() * colors.length)];
            a.portrait_url = `https://ui-avatars.com/api/?name=${encodeURIComponent(cleaned)}&background=${color}&color=fff&size=512&font-size=0.33`;
        }
        
        // Don't overwhelm Wikipedia
        await new Promise(r => setTimeout(r, 100));
    }
    
    // Now re-sort: Real pictures at top, then fake avatars, then anonymous at bottom
    artists.sort((a, b) => {
        let aAnon = isAnonymous(a.name);
        let bAnon = isAnonymous(b.name);
        if (aAnon && !bAnon) return 1;
        if (!aAnon && bAnon) return -1;
        
        let aReal = a.portrait_url && !a.portrait_url.includes('ui-avatars');
        let bReal = b.portrait_url && !b.portrait_url.includes('ui-avatars');
        
        if (aReal && !bReal) return -1;
        if (!aReal && bReal) return 1;
        
        return b.object_ids.length - a.object_ids.length;
    });

    fs.writeFileSync('public/data/artists_master.json', JSON.stringify(artists, null, 2));
    console.log(`\nComplete! Found ${found} real pictures.`);
}

run();
