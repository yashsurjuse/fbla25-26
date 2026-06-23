const fs = require('fs');

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const introPhrases = [
    "A visionary creator whose works are",
    "Known for their profound impact on the artistic world, this creator is",
    "A masterful figure in their respective medium, they are",
    "Recognized for extraordinary skill and vision, this artist remains",
    "With a legacy that spans generations, they are",
    "An influential figure whose pieces are",
    "Celebrated for their unique aesthetic approach, they are",
    "A cornerstone of the museum's collection, this artist is",
    "An imaginative force whose creations are",
    "Renowned for pushing the boundaries of traditional forms, they are"
];

const adjectives = [
    "prominently featured", "elegantly showcased", "beautifully preserved", 
    "carefully curated", "extensively represented", "proudly displayed", 
    "historically significant", "widely celebrated"
];

const departments = [
    "within the museum's historical archives",
    "across multiple curated collections",
    "in the Metropolitan Museum of Art's permanent collection",
    "within the esteemed galleries of the Met",
    "as part of the museum's cultural heritage displays",
    "in the grand halls of the institution",
    "among the museum's most treasured artifacts"
];

const conclusions = [
    "Their contributions continue to inspire modern audiences and historians alike.",
    "Their meticulous attention to detail remains a subject of widespread acclaim.",
    "The surviving pieces offer a rare glimpse into the cultural zeitgeist of their era.",
    "Their work stands as a testament to unparalleled dedication and creative genius.",
    "Through their enduring artifacts, their artistic voice continues to resonate deeply today.",
    "Scholars and visitors alike are continually captivated by the sheer brilliance of their technique.",
    "Their legacy is permanently cemented in the annals of art history.",
    "Each piece serves as a remarkable example of their visionary perspective.",
    "Their profound understanding of form and material continues to be studied globally.",
    "The emotional depth of their work continues to move viewers centuries later."
];

let artists = JSON.parse(fs.readFileSync('public/data/artists_master.json', 'utf-8'));

for (let a of artists) {
    // If the bio is one of the generic ones or missing, replace it!
    if (!a.bio || a.bio.includes('is a renowned artist represented in') || a.bio.includes('is an important artist represented in')) {
        let intro = randomChoice(introPhrases);
        let adj = randomChoice(adjectives);
        let dep = randomChoice(departments);
        let conclusion = randomChoice(conclusions);
        
        let randFormat = Math.random();
        
        if (randFormat < 0.33) {
            a.bio = `${intro} ${adj} ${dep}. ${conclusion}`;
        } else if (randFormat < 0.66) {
            a.bio = `${a.name} is ${adj} ${dep}. ${conclusion}`;
        } else {
            a.bio = `An exceptional historical talent, ${a.name}'s works are ${adj} ${dep}. ${conclusion}`;
        }
    }
}

// Sort the artists so the ones WITH real pictures (not ui-avatars) are at the top!
artists.sort((a, b) => {
    let aIsReal = a.portrait_url && !a.portrait_url.includes('ui-avatars');
    let bIsReal = b.portrait_url && !b.portrait_url.includes('ui-avatars');
    
    if (aIsReal && !bIsReal) return -1;
    if (!aIsReal && bIsReal) return 1;
    
    // Within the same group, sort by number of artifacts (most prolific first)
    return b.object_ids.length - a.object_ids.length;
});

fs.writeFileSync('public/data/artists_master.json', JSON.stringify(artists, null, 2));
console.log(`Updated bios and sorted ${artists.length} artists! Real pictures are now at the top.`);
