export type ImageSource = {
  id: string;
  title: string;
  url: string;
  credit: string;
};

export const ogImageSources: ImageSource[] = [
  {
    id: "washington-crossing-delaware",
    title: "Washington Crossing the Delaware",
    url: "https://images.metmuseum.org/CRDImages/ad/original/DP215410.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "young-woman-water-pitcher",
    title: "Young Woman with a Water Pitcher",
    url: "https://images.metmuseum.org/CRDImages/ep/original/DP353257.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "under-wave-kanagawa",
    title: "Under the Wave off Kanagawa",
    url: "https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "armor-henry-ii",
    title: "Armor of Henry II of France",
    url: "https://images.metmuseum.org/CRDImages/aa/original/DP256970.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "unicorn-rests-garden",
    title: "The Unicorn Rests in a Garden",
    url: "https://images.metmuseum.org/CRDImages/cl/original/DP118991.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "sphinx-hatshepsut",
    title: "Sphinx of Hatshepsut",
    url: "https://images.metmuseum.org/CRDImages/eg/original/DP-24216-003.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "eros-sleeping",
    title: "Bronze Statue of Eros Sleeping",
    url: "https://images.metmuseum.org/CRDImages/gr/original/DP123903.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "shah-jahan-horseback",
    title: "Portrait of Shah Jahan on Horseback",
    url: "https://images.metmuseum.org/CRDImages/is/original/DT5434.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "death-of-socrates",
    title: "The Death of Socrates",
    url: "https://images.metmuseum.org/CRDImages/ep/original/DP-13139-001.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "the-harvesters",
    title: "The Harvesters",
    url: "https://images.metmuseum.org/CRDImages/ep/original/DP119115.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "self-portrait-straw-hat",
    title: "Self-Portrait with a Straw Hat",
    url: "https://images.metmuseum.org/CRDImages/ep/original/DT1502_cropped2.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "standing-bodhisattva",
    title: "Standing Bodhisattva Maitreya",
    url: "https://images.metmuseum.org/CRDImages/as/original/DP291187.jpg",
    credit: "The Metropolitan Museum of Art Open Access",
  },
  {
    id: "artist-van-gogh-portrait",
    title: "Vincent van Gogh Portrait",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/960px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
    credit: "Wikimedia Commons",
  },
  {
    id: "artist-monet-portrait",
    title: "Claude Monet Portrait",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/960px-Claude_Monet_1899_Nadar_crop.jpg",
    credit: "Wikimedia Commons",
  },
  {
    id: "artist-manet-portrait",
    title: "Edouard Manet Portrait",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/%C3%89douard_Manet%2C_en_buste%2C_de_face_-_Nadar.jpg/960px-%C3%89douard_Manet%2C_en_buste%2C_de_face_-_Nadar.jpg",
    credit: "Wikimedia Commons",
  },
  {
    id: "artist-degas-portrait",
    title: "Edgar Degas Portrait",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Self-portrait_by_Edgar_Degas.jpg/960px-Self-portrait_by_Edgar_Degas.jpg",
    credit: "Wikimedia Commons",
  },
  {
    id: "artist-matisse-portrait",
    title: "Henri Matisse Portrait",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Henri_Matisse%2C_1913%2C_photograph_by_Alvin_Langdon_Coburn.jpg/960px-Henri_Matisse%2C_1913%2C_photograph_by_Alvin_Langdon_Coburn.jpg",
    credit: "Wikimedia Commons",
  },
  {
    id: "artist-picasso-portrait",
    title: "Pablo Picasso Portrait",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/960px-Pablo_picasso_1.jpg",
    credit: "Wikimedia Commons",
  },
  {
    id: "artist-klimt-portrait",
    title: "Gustav Klimt Portrait",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Klimt.jpg",
    credit: "Wikimedia Commons",
  },
  {
    id: "artist-warhol-portrait",
    title: "Andy Warhol Portrait",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Andy_Warhol_at_the_Jewish_Museum_%28by_Bernard_Gotfryd%29_%E2%80%93_LOC.jpg/960px-Andy_Warhol_at_the_Jewish_Museum_%28by_Bernard_Gotfryd%29_%E2%80%93_LOC.jpg",
    credit: "Wikimedia Commons",
  },
];

const sourceMap = new Map(ogImageSources.map((source) => [source.id, source]));

export function getImageSourceById(id: string): ImageSource {
  return sourceMap.get(id) ?? ogImageSources[0];
}
