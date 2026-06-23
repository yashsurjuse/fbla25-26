const fs = require('fs');

const MASTERPIECES = [
  "Washington Crossing the Delaware", "The Temple of Dendur", "Madame X", "Self-Portrait with a Straw Hat",
  "The Death of Socrates", "Bridge over a Pond of Water Lilies", "Aristotle with a Bust of Homer",
  "Young Woman with a Water Pitcher", "The Great Wave off Kanagawa", "Autumn Rhythm (Number 30)",
  "View of Toledo", "Juan de Pareja", "The Harvesters", "Wheat Field with Cypresses", "The Dance Class",
  "The Musicians", "The Card Players", "Sphinx of Hatshepsut", "Perseus with the Head of Medusa",
  "Gertrude Stein", "The Gulf Stream", "Madonna and Child Enthroned with Saints", "The Oxbow",
  "Crucifixion and Last Judgment Diptych", "Seated Harlequin", "Madame Cézanne in a Red Armchair",
  "La Berceuse (Augustine Roulin)", "Mars and Venus United by Love", "The Denial of Saint Peter",
  "Ancient Rome", "The Toilet of Venus", "Self-Portrait", "The Vision of Saint John",
  "Max Schmitt in a Single Scull", "The Veteran in a New Field", "Ugolino and His Sons", "The Thinker",
  "Marble Statue of a Eurykleidas Youth", "Night-Shining White", "Shiva as Lord of Dance",
  "Ritual Wine Container (Guang)", "Plaque: Equestrian Court Scene", "Seated Chieftain Figure",
  "Crown of the Andes", "Armor of King Henry II of France", "Field Armor of King Henry VIII of England",
  "The \"Amati\" Violin", "Astrolabe of Umar ibn Yusuf", "Statue of Gudea", "The Antioch Chalice",
  "Venus and Adonis", "Saint Andrew", "The Penitent Magdalen", "Broken Eggs", "The Love Letter",
  "Mezzetin", "The Sleepers", "Madame Charpentier and Her Children", "Joan of Arc", "Boating",
  "Oedipus and the Sphinx", "The Rehearsal of the Ballet Onstage", "Street in Auvers-sur-Oise",
  "Camille Monet on a Garden Bench", "Houses on the Achterzaan", "Circuses", "At the Lapin Agile",
  "I Saw the Figure 5 in Gold", "Cow's Skull: Red, White, and Blue", "Bird in Space", "The Blind Man's Meal",
  "Crucifixion", "Dressing Table", "The Street Pavers", "Number 1, 1950 (Lavender Mist)",
  "No. 13 (White, Red on Yellow)", "Two Women", "Reclining Figure", "The Rocky Mountains, Lander's Peak",
  "Heart of the Andes", "Fur Traders Descending the Missouri", "The Gross Clinic", "Prisoners from the Front",
  "Madame Errazuriz", "The Wyndham Sisters", "Autumn Oaks", "The Pathetic Song", "King David",
  "The Annunciation", "The Crucifixion", "Portrait of a Man", "Venus and Cupid",
  "Portrait of a Woman with a Man at a Casement", "The Last Supper", "Saint Peter Enthroned",
  "Madonna and Child", "The Adoration of the Magi", "The Journey of the Magi",
  "Scenes from the Life of Saint Augustine", "Virgin and Child with Four Angels"
];

async function run() {
  const existingArtifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json'));
  const masterpiecesData = [];
  
  for (let i = 0; i < MASTERPIECES.length; i++) {
    const title = MASTERPIECES[i];
    console.log(`Searching for: ${title}`);
    
    // First, try to find it in our existing dataset to save API calls
    const existing = existingArtifacts.find(a => a.title && a.title.toLowerCase().includes(title.toLowerCase()));
    
    if (existing) {
      masterpiecesData.push(existing);
      console.log(`Found locally: ${existing.title}`);
    } else {
      try {
        const res = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + encodeURIComponent(title));
        const d = await res.json();
        if (d.objectIDs && d.objectIDs.length > 0) {
          // get the first one that has an image
          let found = false;
          for(let id of d.objectIDs.slice(0, 5)) {
             const artRes = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id);
             const art = await artRes.json();
             if (art && art.primaryImageSmall) {
               masterpiecesData.push(art);
               console.log(`Fetched from API: ${art.title}`);
               found = true;
               break;
             }
          }
          if(!found) console.log(`No image found for API items of ${title}`);
        } else {
          console.log(`Not found in API: ${title}`);
        }
      } catch (e) {
        console.log(`Error searching: ${title}`);
      }
    }
  }

  // Remove the masterpieces from existing artifacts to avoid duplicates
  const mpIds = new Set(masterpiecesData.map(a => a.objectID));
  const filteredExisting = existingArtifacts.filter(a => !mpIds.has(a.objectID));
  
  const combined = [...masterpiecesData, ...filteredExisting];
  fs.writeFileSync('public/data/artifacts_master.json', JSON.stringify(combined, null, 2));
  console.log(`Injected ${masterpiecesData.length} masterpieces to the absolute front!`);
}

run();
