const fs = require('fs');
const exhibitions = JSON.parse(fs.readFileSync('public/data/exhibitions_master.json'));
exhibitions.reverse();
fs.writeFileSync('public/data/exhibitions_master.json', JSON.stringify(exhibitions, null, 2));
console.log('Reversed exhibitions array');
