const fs = require('fs');

async function run() {
  const backup = JSON.parse(fs.readFileSync('public/data/exhibitions_master_backup.json'));
  const scraped = JSON.parse(fs.readFileSync('public/data/exhibitions_master.json'));
  
  const backupMap = new Map();
  backup.forEach(ex => backupMap.set(ex.title, ex));
  
  scraped.forEach(ex => {
    if (backupMap.has(ex.title)) {
      const old = backupMap.get(ex.title);
      ex.description = old.description;
      ex.featured_object_ids = old.featured_object_ids;
    } else {
      ex.featured_object_ids = [];
    }
  });
  
  fs.writeFileSync('public/data/exhibitions_master.json', JSON.stringify(scraped, null, 2));
  console.log("Restored descriptions and featured works!");
}
run();
