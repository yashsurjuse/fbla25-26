const fs = require('fs');

const famousArtists = [
    {
        name: "Vincent van Gogh",
        bio: "Vincent Willem van Gogh was a Dutch Post-Impressionist painter who posthumously became one of the most famous and influential figures in Western art history.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg"
    },
    {
        name: "Edgar Degas",
        bio: "Edgar Degas was a French Impressionist artist famous for his pastel drawings and oil paintings. Degas also produced bronze sculptures, prints and drawings.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Edgar_Degas_self_portrait_1855.jpeg"
    },
    {
        name: "Katsushika Hokusai",
        bio: "Katsushika Hokusai was a Japanese ukiyo-e artist of the Edo period, active as a painter and printmaker. He is best known for the woodblock print series Thirty-six Views of Mount Fuji.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/2/23/Hokusai-portrait.jpg"
    },
    {
        name: "Emanuel Leutze",
        bio: "Emanuel Gottlieb Leutze was a German American historical painter best known for his 1851 painting Washington Crossing the Delaware.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Emanuel_Leutze_by_Schwarz.jpg"
    },
    {
        name: "John Singer Sargent",
        bio: "John Singer Sargent was an American expatriate artist, considered the leading portrait painter of his generation for his evocations of Edwardian-era luxury.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/7/77/John_Singer_Sargent_by_J_E_Purdy_1903.jpg"
    },
    {
        name: "Claude Monet",
        bio: "Oscar-Claude Monet was a French painter and founder of impressionist painting who is seen as a key precursor to modernism.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Claude_Monet_1899_Nadar_crop.jpg"
    },
    {
        name: "Jacques Louis David",
        bio: "Jacques-Louis David was a French painter in the Neoclassical style, considered to be the preeminent painter of the era.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Jacques-Louis_David_self-portrait_1794.jpg"
    },
    {
        name: "Pierre-Auguste Renoir",
        bio: "Pierre-Auguste Renoir was a French artist who was a leading painter in the development of the Impressionist style.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/1/16/Renoir_1910.jpg"
    },
    {
        name: "François Boucher",
        bio: "François Boucher was a French painter, draughtsman and etcher, who worked in the Rococo style.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Francois_Boucher_by_Gustaf_Lundberg_1741.jpg"
    },
    {
        name: "El Greco",
        bio: "Domḗnikos Theotokópoulos, most widely known as El Greco, was a Greek painter, sculptor and architect of the Spanish Renaissance.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/El_Greco_-_Portrait_of_a_Man_-_WGA10554.jpg"
    },
    {
        name: "Pieter Bruegel the Elder",
        bio: "Pieter Bruegel the Elder was the most significant artist of Dutch and Flemish Renaissance painting.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Pieter_Bruegel_the_Elder_portrait_by_Lampsonius.jpg"
    },
    {
        name: "Johannes Vermeer",
        bio: "Johannes Vermeer was a Dutch Baroque Period painter who specialized in domestic interior scenes of middle-class life.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/7/78/The_Procuress_%28detail%29_by_Johannes_Vermeer_%281656%29.jpg"
    },
    {
        name: "Jackson Pollock",
        bio: "Paul Jackson Pollock was an American painter and a major figure in the abstract expressionist movement.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/4/46/Jackson_Pollock_1928_Portrait.jpg"
    },
    {
        name: "Raphael",
        bio: "Raffaello Sanzio da Urbino, known as Raphael, was an Italian painter and architect of the High Renaissance.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Raffaello_Sanzio.jpg"
    },
    {
        name: "Rembrandt (Rembrandt van Rijn)",
        bio: "Rembrandt Harmenszoon van Rijn was a Dutch Golden Age painter, printmaker and draughtsman.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg"
    },
    {
        name: "Caravaggio",
        bio: "Michelangelo Merisi da Caravaggio was an Italian painter active in Rome for most of his life.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Ottavio_Leoni_-_Portrait_of_Caravaggio_-_Marucelliana_Florence.jpg"
    },
    {
        name: "Winslow Homer",
        bio: "Winslow Homer was an American landscape painter and printmaker, best known for his marine subjects.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Winslow_Homer_1880.jpg"
    },
    {
        name: "Paul Cézanne",
        bio: "Paul Cézanne was a French artist and Post-Impressionist painter whose work laid the foundations of the transition from the 19th-century conception of artistic endeavor to a new and radically different world of art in the 20th century.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/7/70/Paul_C%C3%A9zanne_1861.jpg"
    },
    {
        name: "Auguste Rodin",
        bio: "François Auguste René Rodin was a French sculptor generally considered the founder of modern sculpture.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Auguste_Rodin.jpg"
    },
    {
        name: "William Hogarth",
        bio: "William Hogarth was an English painter, printmaker, pictorial satirist, social critic, and editorial cartoonist.",
        portrait_url: "https://upload.wikimedia.org/wikipedia/commons/0/09/William_Hogarth_by_William_Hogarth_1745.jpg"
    }
];

let artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json', 'utf-8'));

for (let artist of famousArtists) {
    let ids = artifacts.filter(a => a.artistDisplayName === artist.name || a.artistDisplayName.includes(artist.name)).map(a => a.objectID);
    artist.object_ids = ids;
}

// Write the file replacing EVERYTHING. The user ONLY wants real pictures. They hate the letters and hate the SVGs.
// This means the artists page will have ~20 artists, but they will be high quality, beautifully curated real people.
fs.writeFileSync('public/data/artists_master.json', JSON.stringify(famousArtists, null, 2));

console.log(`Saved ${famousArtists.length} famous artists with hand-picked beautiful portraits.`);
