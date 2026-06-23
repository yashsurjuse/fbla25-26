const fs = require('fs');

const exhibitions = JSON.parse(fs.readFileSync('public/data/exhibitions_master.json'));
const artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json'));

const MET_EXTERIOR = "https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg";

let count = 0;
for (let i = 0; i < exhibitions.length; i++) {
  const ex = exhibitions[i];
  
  // if image_url matches an artifact's image, it means I overrode it
  const isArtifact = artifacts.some(a => a.primaryImageSmall === ex.image_url || a.primaryImage === ex.image_url);
  
  if (isArtifact) {
    ex.image_url = MET_EXTERIOR;
    count++;
  }
}

fs.writeFileSync('public/data/exhibitions_master.json', JSON.stringify(exhibitions, null, 2));
console.log(`Fixed ${count} exhibitions to use Met exterior`);
