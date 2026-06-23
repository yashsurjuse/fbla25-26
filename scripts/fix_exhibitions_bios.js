const fs = require('fs');

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const introPhrases = [
    "Step into the world of",
    "Experience the profound beauty of",
    "Discover the hidden narratives behind",
    "Immerse yourself in",
    "Explore the captivating history of",
    "Delve into the artistic mastery of",
    "Journey through time with",
    "Uncover the legacy of",
    "Witness the spectacular showcase of",
    "A sweeping visual journey through",
    "A monumental presentation of",
    "An unprecedented look at",
    "This groundbreaking showcase highlights",
    "A meticulously curated exploration of",
];

const adjectives = [
    "breathtaking", "unprecedented", "rare", "monumental", "captivating", "visionary",
    "timeless", "extraordinary", "provocative", "intimate", "sweeping", "historic",
    "innovative", "masterful", "sublime", "iconic", "dynamic", "profound", "mesmerizing"
];

const subjects = [
    "masterworks", "artifacts", "creative achievements", "cultural treasures",
    "artistic innovations", "historical objects", "visual narratives",
    "iconic pieces", "rare loans", "hidden gems", "celebrated works",
    "masterpieces", "creative milestones", "aesthetic triumphs"
];

const verbs = [
    "bringing together", "showcasing", "highlighting", "examining",
    "exploring", "celebrating", "revealing", "unveiling", "tracing",
    "investigating", "presenting", "gathering", "uniting"
];

const conclusions = [
    "This exhibition offers a once-in-a-lifetime opportunity to see these works united.",
    "Visitors will gain entirely new perspectives on this pivotal moment in art history.",
    "The collection challenges traditional boundaries and redefines our understanding of the subject.",
    "It remains one of the most comprehensive surveys of its kind ever assembled.",
    "The exhibition sheds light on the complex cultural exchanges that shaped these creations.",
    "It stands as a testament to the enduring power and relevance of human creativity.",
    "Through these carefully selected pieces, a vibrant story of aesthetic evolution emerges.",
    "This showcase promises to leave a lasting impression on scholars and casual viewers alike.",
    "It provides a profound context for understanding the enduring legacy of the era.",
    "A true celebration of vision, technique, and cultural heritage."
];

let exhibitions = JSON.parse(fs.readFileSync('public/data/exhibitions_master.json', 'utf-8'));

for (let ex of exhibitions) {
    let intro = randomChoice(introPhrases);
    let adj1 = randomChoice(adjectives);
    let adj2 = randomChoice(adjectives);
    while (adj1 === adj2) adj2 = randomChoice(adjectives); // ensure different
    
    let subject = randomChoice(subjects);
    let verb = randomChoice(verbs);
    let conclusion = randomChoice(conclusions);
    
    // Sometimes construct it differently
    let randFormat = Math.random();
    let datesStr = ex.dates ? ` Originally presented ${ex.dates},` : "";
    
    let desc = "";
    if (randFormat < 0.33) {
        desc = `${intro} '${ex.title}'. ${datesStr} this exhibition is a ${adj1} collection of ${subject}. By ${verb} these ${adj2} pieces, ${conclusion.toLowerCase()}`;
    } else if (randFormat < 0.66) {
        desc = `An ${adj1} look at '${ex.title}'. ${verb.charAt(0).toUpperCase() + verb.slice(1)} ${adj2} ${subject}, this exhibition invites viewers to engage with history. ${datesStr ? datesStr + " it" : "It"} ${conclusion.toLowerCase().replace("this exhibition", "it").replace("it stands", "stands")}`;
    } else {
        desc = `'${ex.title}' is a ${adj1} and ${adj2} showcase ${verb} important ${subject}. ${datesStr} ${conclusion}`;
    }
    
    ex.description = desc.trim();
}

fs.writeFileSync('public/data/exhibitions_master.json', JSON.stringify(exhibitions, null, 2));
console.log(`Generated completely unique, grammatically dynamic descriptions for ${exhibitions.length} exhibitions.`);
