const cheerio = require('cheerio');

async function run() {
  const res = await fetch('https://www.metmuseum.org/exhibitions/past?year=2023', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  });
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const results = [];
  $('article').each((i, el) => {
    const title = $(el).find('h2, h3, [role="heading"] a').text().trim();
    const img = $(el).find('img').attr('src');
    if (title && img) {
      results.push({ title, img });
    }
  });
  console.log(results);
}
run();
