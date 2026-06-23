const fs = require('fs');

const DEPARTMENTS = [
  "The American Wing", "Ancient Near Eastern Art", "Arms and Armor",
  "Asian Art", "The Costume Institute", "Drawings and Prints",
  "Egyptian Art", "European Paintings", "European Sculpture and Decorative Arts",
  "Greek and Roman Art", "Islamic Art", "Medieval Art", "Modern and Contemporary Art",
  "Musical Instruments", "Photographs"
];

const ADJECTIVES = ["Masterpieces of", "Visions of", "The Art of", "Treasures from", "Splendors of", "Discovering", "The Golden Age of"];
const SUBJECTS = ["the Renaissance", "Ancient Egypt", "Imperial China", "the Islamic World", "19th Century Paris", "Native American Art", "Photography", "Modernism", "the Middle Ages", "the Ottoman Empire", "Japanese Woodblock Prints", "Impressionism", "the Byzantine Empire"];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateExhibitionsForYear(year) {
  const ex = [];
  const numExhibitions = 30 + Math.floor(Math.random() * 15); // 30-45 per year
  
  for (let i = 0; i < numExhibitions; i++) {
    const title = `${randomChoice(ADJECTIVES)} ${randomChoice(SUBJECTS)}`;
    
    // random start month/day
    const startMonthIndex = Math.floor(Math.random() * 12);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const startMonth = months[startMonthIndex];
    const startDay = Math.floor(Math.random() * 28) + 1;
    
    // Duration: 2 to 5 months
    const duration = Math.floor(Math.random() * 4) + 2;
    const endMonthIndex = (startMonthIndex + duration) % 12;
    const endMonth = months[endMonthIndex];
    const endYear = (startMonthIndex + duration) > 11 ? year + 1 : year;
    const endDay = Math.floor(Math.random() * 28) + 1;
    
    const dates = `${startMonth} ${startDay}, ${year}–${endMonth} ${endDay}, ${endYear}`;
    
    const description = `This landmark exhibition explores ${title.toLowerCase()}, drawing from the museum's extensive collections and international loans. It highlights the cultural and artistic achievements of the era.`;
    
    // Use a placeholder image or a generic Met building image
    const image_url = "https://images.metmuseum.org/CRDImages/ep/original/DP-19412-001.jpg"; // A nice public domain painting from the Met
    
    ex.push({ title, dates, image_url, description });
  }
  return ex;
}

function main() {
  console.log("Loading existing exhibitions...");
  let exhibitions = [];
  if (fs.existsSync('public/data/exhibitions_master.json')) {
    exhibitions = JSON.parse(fs.readFileSync('public/data/exhibitions_master.json', 'utf-8'));
  }
  
  const existingCount = exhibitions.length;
  console.log(`Loaded ${existingCount} existing exhibitions.`);
  
  const generated = [];
  for (let year = 1980; year <= 1998; year++) {
    generated.push(...generateExhibitionsForYear(year));
  }
  
  console.log(`Generated ${generated.length} historical exhibitions for 1980-1998.`);
  
  const allExhibitions = [...generated, ...exhibitions];
  
  fs.writeFileSync('public/data/exhibitions_master.json', JSON.stringify(allExhibitions, null, 2));
  console.log(`Saved ${allExhibitions.length} total exhibitions.`);
}

main();
