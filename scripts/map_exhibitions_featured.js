const fs = require('fs');

const exhibitions = JSON.parse(fs.readFileSync('public/data/exhibitions_master.json'));
const artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json'));

for (let i = 0; i < exhibitions.length; i++) {
  const ex = exhibitions[i];
  const featured = [];
  while (featured.length < 4) {
    const art = artifacts[Math.floor(Math.random() * 200)]; // pick from top 200 highlights
    if (!featured.includes(art)) {
      featured.push(art);
    }
  }
  ex.featured_object_ids = featured.map(a => a.objectID);
}

fs.writeFileSync('public/data/exhibitions_master.json', JSON.stringify(exhibitions, null, 2));
console.log("Mapped featured works to exhibitions");
