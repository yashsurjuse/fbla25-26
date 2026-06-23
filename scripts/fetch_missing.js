const fs = require('fs');

async function fetchMissing() {
  const data = JSON.parse(fs.readFileSync('public/data/artifacts_master.json'));
  const ids = [11417, 544692, 467642, 23936, 437881, 38245, 544442, 451268, 254924];
  
  for (const id of ids) {
    if (!data.find(d => d.objectID == id)) {
      try {
        console.log("Fetching", id);
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        const obj = await res.json();
        if (obj && obj.objectID) {
          data.unshift(obj);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  
  fs.writeFileSync('public/data/artifacts_master.json', JSON.stringify(data, null, 2));
  console.log("Done");
}

fetchMissing();
