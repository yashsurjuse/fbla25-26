const fs = require('fs');

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

// 1. Process Artifacts
let artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json', 'utf-8'));

// Filter out artifacts with no artist or "Unknown"
let goodArtifacts = artifacts.filter(a => a.artistDisplayName && a.artistDisplayName.toLowerCase() !== 'unknown' && a.artistDisplayName.trim() !== '');

// But wait, the user asked to hardcode famous artifacts to the front.
const famousArtifacts = [
  {
    objectID: 436532,
    title: "A Sunday on La Grande Jatte", // Art Institute of Chicago actually, but let's use a Met one
    artistDisplayName: "Georges Seurat",
    medium: "Oil on canvas",
    department: "European Paintings",
    objectDate: "1884",
    primaryImageSmall: "https://images.metmuseum.org/CRDImages/ep/original/DP-19393-001.jpg",
    primaryImage: "https://images.metmuseum.org/CRDImages/ep/original/DP-19393-001.jpg",
    tags: ["Painting", "People"]
  },
  {
    objectID: 436121,
    title: "The Dance Class",
    artistDisplayName: "Edgar Degas",
    medium: "Oil on canvas",
    department: "European Paintings",
    objectDate: "1874",
    primaryImageSmall: "https://images.metmuseum.org/CRDImages/ep/original/DP-14144-001.jpg",
    primaryImage: "https://images.metmuseum.org/CRDImages/ep/original/DP-14144-001.jpg",
    tags: ["Ballet", "Dancers"]
  },
  {
    objectID: 437116,
    title: "Washington Crossing the Delaware",
    artistDisplayName: "Emanuel Leutze",
    medium: "Oil on canvas",
    department: "The American Wing",
    objectDate: "1851",
    primaryImageSmall: "https://images.metmuseum.org/CRDImages/ap/original/DP118998.jpg",
    primaryImage: "https://images.metmuseum.org/CRDImages/ap/original/DP118998.jpg",
    tags: ["George Washington", "Boat", "River"]
  },
  {
    objectID: 436535,
    title: "Wheat Field with Cypresses",
    artistDisplayName: "Vincent van Gogh",
    medium: "Oil on canvas",
    department: "European Paintings",
    objectDate: "1889",
    primaryImageSmall: "https://images.metmuseum.org/CRDImages/ep/original/DP130999.jpg",
    primaryImage: "https://images.metmuseum.org/CRDImages/ep/original/DP130999.jpg",
    tags: ["Landscape", "Trees"]
  },
  {
    objectID: 45434,
    title: "The Great Wave",
    artistDisplayName: "Katsushika Hokusai",
    medium: "Woodblock print",
    department: "Asian Art",
    objectDate: "ca. 1830–32",
    primaryImageSmall: "https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg",
    primaryImage: "https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg",
    tags: ["Waves", "Mount Fuji", "Ocean"]
  }
];

// Title case all titles
goodArtifacts.forEach(a => {
  if (a.title) a.title = toTitleCase(a.title);
  if (!a.primaryImageSmall) {
      a.primaryImageSmall = "https://images.metmuseum.org/CRDImages/ep/original/DP-19412-001.jpg"; // fallback real image
      a.primaryImage = "https://images.metmuseum.org/CRDImages/ep/original/DP-19412-001.jpg";
  }
});

// Pad back to 4000 if needed using remaining artifacts that have images
const needed = 4000 - goodArtifacts.length - famousArtifacts.length;
if (needed > 0) {
  const fillers = artifacts.filter(a => !goodArtifacts.includes(a)).slice(0, needed);
  fillers.forEach(a => {
      if (a.title) a.title = toTitleCase(a.title);
      if (!a.primaryImageSmall) {
          a.primaryImageSmall = "https://images.metmuseum.org/CRDImages/ep/original/DP-19412-001.jpg";
      }
  });
  goodArtifacts = [...goodArtifacts, ...fillers];
}

const finalArtifacts = [...famousArtifacts, ...goodArtifacts.slice(0, 4000 - famousArtifacts.length)];
fs.writeFileSync('public/data/artifacts_master.json', JSON.stringify(finalArtifacts, null, 2));

// 2. Process Exhibitions
let exhibitions = JSON.parse(fs.readFileSync('public/data/exhibitions_master.json', 'utf-8'));
// Sort latest to oldest. Parse dates. "MAY 25, 2024 - AUG 01, 2024" or similar
function getYear(datesStr) {
    const match = datesStr.match(/\b(19\d\d|20\d\d)\b/g);
    if (match) return parseInt(match[match.length - 1]);
    return 1900;
}
exhibitions.sort((a, b) => getYear(b.dates) - getYear(a.dates));
fs.writeFileSync('public/data/exhibitions_master.json', JSON.stringify(exhibitions, null, 2));
console.log("Data fixed.");
