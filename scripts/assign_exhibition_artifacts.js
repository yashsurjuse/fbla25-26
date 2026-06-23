const fs = require('fs');

function run() {
  const artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json'));
  const exhibitions = JSON.parse(fs.readFileSync('public/data/exhibitions_master.json'));

  // Get a list of all object IDs
  const allIds = artifacts.map(a => a.objectID);

  let updatedCount = 0;

  exhibitions.forEach(exh => {
    if (!exh.featured_object_ids || exh.featured_object_ids.length === 0) {
      // Pick 4 random artifacts. 
      // Try to be slightly intelligent: check if exhibition title has a culture keyword.
      const titleLower = exh.title.toLowerCase();
      let candidates = artifacts;

      if (titleLower.includes('asian') || titleLower.includes('china') || titleLower.includes('japan')) {
        candidates = artifacts.filter(a => a.department.includes('Asian'));
      } else if (titleLower.includes('egypt')) {
        candidates = artifacts.filter(a => a.department.includes('Egyptian'));
      } else if (titleLower.includes('greek') || titleLower.includes('roman')) {
        candidates = artifacts.filter(a => a.department.includes('Greek and Roman'));
      } else if (titleLower.includes('modern') || titleLower.includes('contemporary')) {
        candidates = artifacts.filter(a => a.department.includes('Modern'));
      }

      if (candidates.length < 4) candidates = artifacts; // fallback

      const picked = [];
      for(let i = 0; i < 4; i++) {
        const randIndex = Math.floor(Math.random() * candidates.length);
        picked.push(candidates[randIndex].objectID);
      }
      exh.featured_object_ids = picked;
      updatedCount++;
    }
  });

  fs.writeFileSync('public/data/exhibitions_master.json', JSON.stringify(exhibitions, null, 2));
  console.log(`Assigned 4 featured works to ${updatedCount} exhibitions.`);
}

run();
