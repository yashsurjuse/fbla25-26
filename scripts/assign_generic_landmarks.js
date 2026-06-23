const fs = require('fs');

function run() {
  let artists = JSON.parse(fs.readFileSync('public/data/artists_master.json'));
  
  const genericLandmarks = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Wolfsburg_VW-Werk.jpg/500px-Wolfsburg_VW-Werk.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/500px-London_Skyline_%28125508655%29.jpeg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/500px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/500px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg'
  ];

  const badUrls = [
    'A_view_of_the_industrial_town_of_Bochum',
    '1881_-_H%C3%B6chst_-_the_industrial_plant',
    'Factory_in_Birmingham',
    'Interior_of_a_Factory_in_the_19th_century'
  ];

  let replacedCount = 0;

  for (let i = 0; i < artists.length; i++) {
    const a = artists[i];
    
    // Check if it has a bad URL
    if (a.portrait_url && badUrls.some(bad => a.portrait_url.includes(bad))) {
      // Pick one of the generic landmarks deterministically based on name length
      const img = genericLandmarks[a.name.length % genericLandmarks.length];
      a.portrait_url = img;
      replacedCount++;
      console.log(`Re-assigned generic landmark to ${a.name}`);
    }
  }

  console.log(`Re-assigned ${replacedCount} generic landmarks.`);
  fs.writeFileSync('public/data/artists_master.json', JSON.stringify(artists, null, 2));
}

run();
