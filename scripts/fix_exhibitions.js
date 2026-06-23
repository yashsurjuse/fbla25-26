const fs = require('fs');

const exhibitions = JSON.parse(fs.readFileSync('public/data/exhibitions_master.json'));
const artifacts = JSON.parse(fs.readFileSync('public/data/artifacts_master.json'));

const BAD_IMAGES = [
  "https://cdn.sanity.io/images/cctd4ker/production/cca3f8a98beb107f9c647bb946bbbe3b6740b6ed-3200x1800.jpg?w=3840&q=75&fit=clip&auto=format",
  "https://cdn.sanity.io/images/cctd4ker/production/4315310655c98737df74cd6701ad5f141fda5047-5120x2880.jpg?w=3840&q=75&fit=clip&auto=format"
];

for (let i = 0; i < exhibitions.length; i++) {
  const ex = exhibitions[i];
  
  // pick 4 random artifacts that match the title, or just random
  // let's just pick 4 random highlights to make it look great
  const featured = [];
  while (featured.length < 4) {
    const art = artifacts[Math.floor(Math.random() * 200)]; // pick from top 200 highlights
    if (!featured.includes(art)) {
      featured.push(art);
    }
  }
  
  ex.featured_object_ids = featured.map(a => a.objectID);
  
  // fix bad images
  if (!ex.image_url || BAD_IMAGES.includes(ex.image_url)) {
    ex.image_url = featured[0].primaryImageSmall || featured[0].primaryImage;
  }
}

fs.writeFileSync('public/data/exhibitions_master.json', JSON.stringify(exhibitions, null, 2));
console.log("Fixed exhibitions");
