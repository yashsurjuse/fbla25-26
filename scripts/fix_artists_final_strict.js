const fs = require('fs');

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

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const intro1 = ["A visionary creator,", "An influential figure,", "A celebrated historical talent,", "Recognized for extraordinary skill,", "A masterful presence,", "An imaginative force,", "A cornerstone of art history,"];
const intro2 = ["whose works are", "with pieces that are", "whose legacy is", "whose creations remain", "with a portfolio that is", "whose artistic output is"];
const adj = ["prominently featured", "elegantly showcased", "beautifully preserved", "carefully curated", "extensively represented", "proudly displayed", "historically significant", "widely celebrated", "magnificently maintained"];
const dep = ["within the museum's archives", "across multiple curated collections", "in the permanent collection", "within the esteemed galleries", "as part of the cultural displays", "among the most treasured artifacts", "in the Met's historical exhibits"];
const conc1 = ["Their contributions continue to inspire audiences.", "Their meticulous attention to detail is widely acclaimed.", "The surviving pieces offer a rare historical glimpse.", "Their work stands as a testament to creative genius.", "Their artistic voice resonates deeply today.", "Scholars are continually captivated by their technique.", "Their profound understanding of form is studied globally.", "The emotional depth of their work continues to move viewers."];

const altIntro = ["The legacy of", "The artistic achievements of", "The creative genius behind", "The historical significance of", "The remarkable technique of", "The enduring influence of"];
const altVerb = ["can be seen", "is perfectly captured", "is beautifully illustrated", "is prominently exhibited", "is preserved forever", "remains immortalized"];
const altConc = ["Providing endless inspiration for modern creators.", "Offering a window into the artistic standards of their era.", "Remaining a crucial part of the museum's narrative.", "Capturing the essence of their historical period.", "A true marvel of aesthetic mastery.", "A lasting tribute to human creativity."];

let artists = JSON.parse(fs.readFileSync('public/data/artists_master.json', 'utf-8'));

for (let a of artists) {
    let rand = Math.random();
    if (rand < 0.5) {
        a.bio = `${randomChoice(intro1)} ${randomChoice(intro2)} ${randomChoice(adj)} ${randomChoice(dep)}. ${randomChoice(conc1)}`;
    } else {
        a.bio = `${randomChoice(altIntro)} ${a.name} ${randomChoice(altVerb)} ${randomChoice(dep)}. ${randomChoice(altConc)}`;
    }
}

// Sort the artists
artists.sort((a, b) => {
    let aAnon = isAnonymous(a.name);
    let bAnon = isAnonymous(b.name);
    
    // Group 3: Anonymous at the very bottom
    if (aAnon && !bAnon) return 1;
    if (!aAnon && bAnon) return -1;
    
    // Group 1 vs 2: Real pictures at the top
    let aReal = a.portrait_url && !a.portrait_url.includes('ui-avatars');
    let bReal = b.portrait_url && !b.portrait_url.includes('ui-avatars');
    
    if (aReal && !bReal) return -1;
    if (!aReal && bReal) return 1;
    
    // Within the same group, sort by number of artifacts (most prolific first)
    return b.object_ids.length - a.object_ids.length;
});

fs.writeFileSync('public/data/artists_master.json', JSON.stringify(artists, null, 2));
console.log(`Updated bios and strictly sorted ${artists.length} artists!`);
