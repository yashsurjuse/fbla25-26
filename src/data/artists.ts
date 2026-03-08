export type Artist = {
  id: string;
  name: string;
  bio: string;
  image: string;
};

export const artists: Artist[] = [
  {
    id: "vincent-van-gogh",
    name: "Vincent van Gogh",
    bio: "Post-Impressionist whose expressive brushwork and color transformed modern art; known for Irises and Starry Night.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/960px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
  },
  {
    id: "claude-monet",
    name: "Claude Monet",
    bio: "Pioneer of Impressionism, capturing light and atmosphere in works such as Water Lilies and Impression, Sunrise.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/960px-Claude_Monet_1899_Nadar_crop.jpg",
  },
  {
    id: "edouard-manet",
    name: "Edouard Manet",
    bio: "Combined Realism and Impressionism, known for bold modern paintings such as Olympia and Le Dejeuner sur l'Herbe.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/%C3%89douard_Manet%2C_en_buste%2C_de_face_-_Nadar.jpg/960px-%C3%89douard_Manet%2C_en_buste%2C_de_face_-_Nadar.jpg",
  },
  {
    id: "edgar-degas",
    name: "Edgar Degas",
    bio: "Master of movement and composition, famed for ballet scenes and candid portraits of Parisian life.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Self-portrait_by_Edgar_Degas.jpg/960px-Self-portrait_by_Edgar_Degas.jpg",
  },
  {
    id: "henri-matisse",
    name: "Henri Matisse",
    bio: "Innovator of color and form, leading Fauvism with vibrant works like The Dance.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Henri_Matisse%2C_1913%2C_photograph_by_Alvin_Langdon_Coburn.jpg/960px-Henri_Matisse%2C_1913%2C_photograph_by_Alvin_Langdon_Coburn.jpg",
  },
  {
    id: "pablo-picasso",
    name: "Pablo Picasso",
    bio: "Revolutionary artist who co-founded Cubism and reshaped twentieth-century art with relentless experimentation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/960px-Pablo_picasso_1.jpg",
  },
  {
    id: "joan-miro",
    name: "Joan Miro",
    bio: "Spanish surrealist who merged biomorphic abstraction with playful symbols and dreamlike compositions.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Portrait_of_Joan_Miro%2C_Barcelona_1935_June_13.jpg/960px-Portrait_of_Joan_Miro%2C_Barcelona_1935_June_13.jpg",
  },
  {
    id: "gustav-klimt",
    name: "Gustav Klimt",
    bio: "Austrian painter celebrated for golden ornamental portraits and allegories of sensuality and life.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Klimt.jpg",
  },
  {
    id: "georgia-okeeffe",
    name: "Georgia O'Keeffe",
    bio: "American modernist known for abstract floral forms and desert landscapes reflecting quiet power.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Georgia_O%27Keeffe_MET_DP230868.jpg/960px-Georgia_O%27Keeffe_MET_DP230868.jpg",
  },
  {
    id: "frida-kahlo",
    name: "Frida Kahlo",
    bio: "Mexican painter who expressed identity, pain, and surrealist vision through striking self-portraits.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg/960px-Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg",
  },
  {
    id: "augusta-savage",
    name: "Augusta Savage",
    bio: "Harlem Renaissance sculptor celebrated for portraiture of Black cultural leaders; her 1939 work Lift Every Voice and Sing remains a touchstone in The Met's American Wing.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Augusta_Savage%2C_H-HNE-20-87.jpg/960px-Augusta_Savage%2C_H-HNE-20-87.jpg",
  },
  {
    id: "auguste-rodin",
    name: "Rodin (Auguste Rodin)",
    bio: "French sculptor pioneering expressive realism in bronze; The Thinker and The Kiss are icons of form and emotion.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/94/Auguste_Rodin_by_George_Charles_Beresford_%28NPG_x6573%29.jpg",
  },
  {
    id: "alexander-mcqueen",
    name: "Alexander McQueen",
    bio: "Fashion designer redefining couture with conceptual works that merged craft, history, and rebellion.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Alexander_McQueen_by_FashionWirePress.jpg",
  },
  {
    id: "rei-kawakubo",
    name: "Rei Kawakubo",
    bio: "Avant-garde designer challenging structure, gender, and beauty through her label Comme des Garcons.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Rihanna_Met_Gala_2017.jpg",
  },
  {
    id: "karl-lagerfeld",
    name: "Karl Lagerfeld",
    bio: "German designer whose sharp wit and discipline defined fashion houses including Chanel and Fendi.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Fendi_store_opening_-_Karl_Lagerfeld_%2814091153382%29_crop.jpg",
  },
  {
    id: "jean-michel-basquiat",
    name: "Jean-Michel Basquiat",
    bio: "Neo-expressionist painter whose raw energy and social commentary reshaped 1980s art culture.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Jean-Michel_Basquiat_passport_%28cropped%29.jpg",
  },
  {
    id: "andy-warhol",
    name: "Andy Warhol",
    bio: "Pop Art leader merging celebrity culture and consumerism in silkscreens such as Marilyn Diptych.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Andy_Warhol_at_the_Jewish_Museum_%28by_Bernard_Gotfryd%29_%E2%80%93_LOC.jpg/960px-Andy_Warhol_at_the_Jewish_Museum_%28by_Bernard_Gotfryd%29_%E2%80%93_LOC.jpg",
  },
  {
    id: "diego-rivera",
    name: "Diego Rivera",
    bio: "Mexican muralist fusing political narrative and indigenous symbolism into monumental public art.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Diego_Rivera_-_Google_Art_Project_%28cropped%29.jpg/960px-Diego_Rivera_-_Google_Art_Project_%28cropped%29.jpg",
  },
  {
    id: "mary-cassatt",
    name: "Mary Cassatt",
    bio: "American Impressionist capturing domestic intimacy and female experience through tender observation.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mary_Cassatt_photograph_1913.jpg/960px-Mary_Cassatt_photograph_1913.jpg",
  },
  {
    id: "auguste-renoir",
    name: "Auguste Renoir",
    bio: "French Impressionist famed for luminous depictions of leisure, family, and sensual warmth.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Pierre_Auguste_Renoir%2C_uncropped_image.jpg",
  },
  {
    id: "john-singer-sargent",
    name: "John Singer Sargent",
    bio: "American expatriate portrait painter featured throughout The Met, admired for luminous brushwork and striking society portraits.",
    image:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTUEsaCikkS7aUsZBeBgU_Ea20ObskYpn-PeLV5mKjcPDoeBY92T3z7Ky9S_TQf9eEqVWjJmEgRFHIXrCg",
  },
];
