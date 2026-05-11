export type Exhibition = {
  id: string;
  title: string;
  start: string;
  end: string;
  dateRange: string;
  description: string;
  imageSourceId: string;
};

export const exhibitions: Exhibition[] = [
  {
    id: "picasso-in-the-met",
    title: "Picasso in The Metropolitan Museum of Art",
    start: "2010-04-27",
    end: "2010-08-15",
    dateRange: "Apr 27 - Aug 15, 2010",
    description:
      "Focused look at Picasso works in The Met collection, spanning his career and showing his formal experiments.",
    imageSourceId: "self-portrait-straw-hat",
  },
  {
    id: "alexander-mcqueen-savage-beauty",
    title: "Alexander McQueen: Savage Beauty",
    start: "2011-05-04",
    end: "2011-07-31",
    dateRange: "May 4 - Jul 31, 2011",
    description:
      "A legendary retrospective celebrating McQueen's genius in blending fashion, fantasy, and technical innovation.",
    imageSourceId: "armor-henry-ii",
  },
  {
    id: "the-steins-collect",
    title: "The Steins Collect: Matisse, Picasso, and the Parisian Avant-Garde",
    start: "2012-02-28",
    end: "2012-06-03",
    dateRange: "Feb 28 - Jun 3, 2012",
    description:
      "Explored Gertrude Stein's influence and her role in shaping early modernism through her personal art collection.",
    imageSourceId: "young-woman-water-pitcher",
  },
  {
    id: "impressionism-fashion-modernity",
    title: "Impressionism, Fashion, and Modernity",
    start: "2013-04-15",
    end: "2013-09-02",
    dateRange: "Apr 15 - Sep 2, 2013",
    description:
      "Connected the evolution of Parisian fashion with Impressionist painting, revealing how style defined modern life.",
    imageSourceId: "the-harvesters",
  },
  {
    id: "charles-marville",
    title: "Charles Marville: Photographer of Paris",
    start: "2014-02-26",
    end: "2014-05-11",
    dateRange: "Feb 26 - May 11, 2014",
    description:
      "Documented Haussmann's transformation of Paris through Marville's haunting, precise nineteenth-century photographs.",
    imageSourceId: "death-of-socrates",
  },
  {
    id: "plains-indians-earth-and-sky",
    title: "The Plains Indians: Artists of Earth and Sky",
    start: "2015-03-04",
    end: "2015-07-05",
    dateRange: "Mar 4 - Jul 5, 2015",
    description:
      "Highlighted Indigenous artistry across centuries, merging historic craftsmanship with contemporary cultural voices.",
    imageSourceId: "standing-bodhisattva",
  },
  {
    id: "manus-x-machina",
    title: "Manus x Machina: Fashion in an Age of Technology",
    start: "2016-03-07",
    end: "2016-08-07",
    dateRange: "Mar 7 - Aug 7, 2016",
    description: "Explored couture and machine fashion, showing how innovation and tradition can coexist in design.",
    imageSourceId: "armor-henry-ii",
  },
  {
    id: "rei-kawakubo-art-of-the-in-between",
    title: "Rei Kawakubo/Comme des Garcons: Art of the In-Between",
    start: "2017-03-21",
    end: "2017-07-23",
    dateRange: "Mar 21 - Jul 23, 2017",
    description:
      "Presented Kawakubo's radical designs challenging the boundaries between fashion, sculpture, and concept.",
    imageSourceId: "under-wave-kanagawa",
  },
  {
    id: "heavenly-bodies",
    title: "Heavenly Bodies: Fashion and the Catholic Imagination",
    start: "2018-03-19",
    end: "2018-07-08",
    dateRange: "Mar 19 - Jul 8, 2018",
    description:
      "The Met's most visited show, juxtaposing haute couture with religious art to explore sacred influence in design.",
    imageSourceId: "unicorn-rests-garden",
  },
  {
    id: "camp-notes-on-fashion",
    title: "Camp: Notes on Fashion",
    start: "2019-04-15",
    end: "2019-10-27",
    dateRange: "Apr 15 - Oct 27, 2019",
    description:
      "Examined the playful, exaggerated aesthetics of camp through historic and contemporary fashion icons.",
    imageSourceId: "shah-jahan-horseback",
  },
  {
    id: "making-the-met",
    title: "Making The Met, 1870-2020",
    start: "2020-02-01",
    end: "2020-08-02",
    dateRange: "Feb 1 - Aug 2, 2020",
    description:
      "A celebration of The Met's 150th anniversary, showcasing its transformation into one of the world's most influential museums.",
    imageSourceId: "washington-crossing-delaware",
  },
  {
    id: "in-america-lexicon-of-fashion",
    title: "In America: A Lexicon of Fashion",
    start: "2021-09-10",
    end: "2022-09-05",
    dateRange: "Sep 10, 2021 - Sep 5, 2022",
    description:
      "Defined American fashion through emotion and identity, highlighting designers across eras and backgrounds.",
    imageSourceId: "young-woman-water-pitcher",
  },
  {
    id: "lives-of-the-gods",
    title: "Lives of the Gods: Divinity in Maya Art",
    start: "2022-09-18",
    end: "2023-02-20",
    dateRange: "Sep 18, 2022 - Feb 20, 2023",
    description:
      "Showcased rare Maya sculpture and ceramics illustrating gods, ancestors, and creation myths.",
    imageSourceId: "sphinx-hatshepsut",
  },
  {
    id: "karl-lagerfeld-line-of-beauty",
    title: "Karl Lagerfeld: A Line of Beauty",
    start: "2023-03-10",
    end: "2023-07-16",
    dateRange: "Mar 10 - Jul 16, 2023",
    description:
      "Celebrated Karl Lagerfeld's evolution across decades, tracing his creative discipline and iconic silhouettes.",
    imageSourceId: "self-portrait-straw-hat",
  },
  {
    id: "harlem-renaissance-modernism",
    title: "The Harlem Renaissance and Transatlantic Modernism",
    start: "2024-02-09",
    end: "2024-06-23",
    dateRange: "Feb 9 - Jun 23, 2024",
    description:
      "Explored Harlem's flowering arts and its connections to global modernism through painting, sculpture, and print.",
    imageSourceId: "the-harvesters",
  },
  {
    id: "manet-degas",
    title: "Manet/Degas",
    start: "2025-07-12",
    end: "2025-10-26",
    dateRange: "Jul 12 - Oct 26, 2025",
    description:
      "An exhibition studying the friendship, rivalries, and experiments that shaped Edouard Manet and Edgar Degas in modern Paris.",
    imageSourceId: "death-of-socrates",
  },
  {
    id: "hidden-faces-covered-identities",
    title: "Hidden Faces: Covered Identities",
    start: "2023-11-07",
    end: "2024-02-11",
    dateRange: "Nov 7, 2023 - Feb 11, 2024",
    description:
      "Explored veiling and masking across cultures through sculpture, painting, and textile traditions from antiquity to the present.",
    imageSourceId: "unicorn-rests-garden",
  },
  {
    id: "the-realms-of-earthly-and-divine",
    title: "The Realms of Earthly and Divine",
    start: "2023-09-18",
    end: "2024-01-07",
    dateRange: "Sep 18, 2023 - Jan 7, 2024",
    description:
      "A thematic presentation of sacred imagery and material culture, highlighting artistic interpretations of spiritual authority.",
    imageSourceId: "standing-bodhisattva",
  },
  {
    id: "matthew-wong-vincent-van-gogh",
    title: "Matthew Wong - Vincent van Gogh: Painting as a Last Resort",
    start: "2024-03-01",
    end: "2024-08-31",
    dateRange: "Mar 1 - Aug 31, 2024",
    description:
      "Placed works by Matthew Wong in dialogue with Van Gogh to examine solitude, color, and expressive mark-making.",
    imageSourceId: "self-portrait-straw-hat",
  },
  {
    id: "sleeping-beauties-reawakening-fashion",
    title: "Sleeping Beauties: Reawakening Fashion",
    start: "2024-05-10",
    end: "2024-09-02",
    dateRange: "May 10 - Sep 2, 2024",
    description:
      "A Costume Institute exhibition examining conservation, material fragility, and multisensory approaches to historic fashion.",
    imageSourceId: "armor-henry-ii",
  },
  {
    id: "fables-and-folklore-europe",
    title: "Fables and Folklore in European Art",
    start: "2024-09-14",
    end: "2025-01-12",
    dateRange: "Sep 14, 2024 - Jan 12, 2025",
    description:
      "Surveyed narrative traditions in painting and decorative arts, connecting literary storytelling with visual invention.",
    imageSourceId: "the-harvesters",
  },
  {
    id: "architecture-of-ritual",
    title: "Architecture of Ritual",
    start: "2025-02-08",
    end: "2025-06-22",
    dateRange: "Feb 8 - Jun 22, 2025",
    description:
      "Focused on how temples, shrines, and ceremonial spaces were represented and reimagined across media.",
    imageSourceId: "sphinx-hatshepsut",
  },
  {
    id: "threads-of-empire",
    title: "Threads of Empire: Global Textiles 1500-1900",
    start: "2025-03-21",
    end: "2025-08-10",
    dateRange: "Mar 21 - Aug 10, 2025",
    description:
      "Examined trade, diplomacy, and cultural exchange through woven, embroidered, and printed textiles.",
    imageSourceId: "young-woman-water-pitcher",
  },
  {
    id: "visions-of-modern-city",
    title: "Visions of the Modern City",
    start: "2025-04-12",
    end: "2025-09-07",
    dateRange: "Apr 12 - Sep 7, 2025",
    description:
      "Investigated how artists represented urban motion, spectacle, and changing social life in the nineteenth and twentieth centuries.",
    imageSourceId: "death-of-socrates",
  },
  {
    id: "across-oceans-americas",
    title: "Across Oceans: Art of the Early Americas",
    start: "2025-05-03",
    end: "2025-10-19",
    dateRange: "May 3 - Oct 19, 2025",
    description:
      "A cross-regional exhibition highlighting artistic innovation and ceremonial objects from North, Central, and South America.",
    imageSourceId: "shah-jahan-horseback",
  },
];
