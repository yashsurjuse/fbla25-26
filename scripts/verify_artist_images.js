const fs = require('fs');
const https = require('https');

async function checkUrl(url) {
  if (!url.includes('wikimedia.org')) return true;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function run() {
  const data = JSON.parse(fs.readFileSync('public/data/artists_master.json'));
  for (let i = 0; i < data.length; i++) {
    if (data[i].portrait_url && data[i].portrait_url.includes('wikimedia.org')) {
      const ok = await checkUrl(data[i].portrait_url);
      if (!ok) {
        console.log("Broken:", data[i].name);
        data[i].portrait_url = null; // frontend fallback
      }
    }
  }
  fs.writeFileSync('public/data/artists_master.json', JSON.stringify(data, null, 2));
  console.log("Verified all images");
}

run();
