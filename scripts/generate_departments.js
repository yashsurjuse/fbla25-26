const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/data/artifacts_master.json', 'utf8'));

const deptNames = [
  "African Art in The Michael C. Rockefeller Wing",
  "The American Wing",
  "Ancient American Art in The Michael C. Rockefeller Wing",
  "Ancient West Asian Art",
  "Arms and Armor",
  "Asian Art",
  "The Costume Institute",
  "Drawings and Prints",
  "Egyptian Art",
  "European Paintings",
  "European Sculpture and Decorative Arts",
  "Greek and Roman Art",
  "Islamic Art",
  "Medieval Art and The Cloisters",
  "Modern and Contemporary Art",
  "Musical Instruments",
  "Oceanic Art in The Michael C. Rockefeller Wing",
  "Photographs",
  "The Robert Lehman Collection"
];

// Mapping to match the dataset if there's a difference
const nameMap = {
  "African Art in The Michael C. Rockefeller Wing": "Arts of Africa, Oceania, and the Americas",
  "Ancient American Art in The Michael C. Rockefeller Wing": "Arts of Africa, Oceania, and the Americas",
  "Oceanic Art in The Michael C. Rockefeller Wing": "Arts of Africa, Oceania, and the Americas",
  "Medieval Art and The Cloisters": ["Medieval Art", "The Cloisters"],
  "Ancient West Asian Art": ["Ancient West Asian Art", "Ancient Near Eastern Art"],
  "The Robert Lehman Collection": "Robert Lehman Collection",
  "The Costume Institute": "Costume Institute",
};

const departments = deptNames.map(title => {
  let searchDept = nameMap[title] || title;
  
  let validImage = null;
  
  // Find a valid image for this department
  for (const item of data) {
    let match = false;
    if (Array.isArray(searchDept)) {
      match = searchDept.includes(item.department);
    } else {
      match = item.department === searchDept;
    }
    
    if (match && (item.primaryImageSmall || item.primaryImage)) {
      // Special check to avoid placeholder images
      if (!item.primaryImageSmall?.includes("No_image_available")) {
          validImage = item.primaryImageSmall || item.primaryImage;
          break;
      }
    }
  }

  // Fallbacks if no image found
  if (!validImage) {
    if (title.includes("African")) validImage = "https://images.metmuseum.org/CRDImages/ao/web-large/DP-15822-031.jpg";
    else if (title.includes("Ancient American")) validImage = "https://images.metmuseum.org/CRDImages/ao/web-large/DP-13495-001.jpg";
    else if (title.includes("Oceanic")) validImage = "https://images.metmuseum.org/CRDImages/ao/web-large/DP-13233-001.jpg";
    else if (title.includes("Costume")) validImage = "https://images.metmuseum.org/CRDImages/ci/web-large/CI54.50a_b_F.jpg";
    else validImage = "https://images.metmuseum.org/CRDImages/ep/web-large/DP353257.jpg"; // Vermeer fallback
  }

  return {
    id: title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''),
    title: title,
    description: `The ${title} collection spans thousands of years of art history and preserves the masterful creations of past and present cultures. Explore our comprehensive array of artifacts carefully curated by our scholars.`,
    image: validImage
  };
});

fs.writeFileSync('src/data/departments.json', JSON.stringify(departments, null, 2));
console.log('Successfully generated src/data/departments.json with ' + departments.length + ' departments');
