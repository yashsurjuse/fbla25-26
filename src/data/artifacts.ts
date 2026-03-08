export type Artifact = {
  id: string;
  title: string;
  era: string;
  location: string;
  description: string;
  imageSourceId: string;
};

export const artifacts: Artifact[] = [
  {
    id: "van-gogh-irises",
    title: "Irises",
    era: "Vincent van Gogh, 1890",
    location: "European Paintings, Gallery 822",
    description:
      "Painted during Van Gogh's Saint-Remy period, this famous canvas balances energetic cobalt, violet, and emerald hues.",
    imageSourceId: "self-portrait-straw-hat",
  },
  {
    id: "mandala-of-chakrasamvara",
    title: "Mandala of Chakrasamvara",
    era: "Tibet, early 17th century",
    location: "Asian Art Galleries",
    description:
      "An expansive ritual painting composed in mineral pigments and gold on cotton, mapping the cosmic palace of Chakrasamvara for tantric visualization.",
    imageSourceId: "standing-bodhisattva",
  },
  {
    id: "temple-of-dendur",
    title: "Temple of Dendur",
    era: "Egypt, ca. 15 BCE",
    location: "The Sackler Wing",
    description: "Sandstone temple dedicated to Isis, relocated from Nubia; centerpiece of The Met's Egyptian collection.",
    imageSourceId: "sphinx-hatshepsut",
  },
  {
    id: "guanyin-of-the-southern-sea",
    title: "Guanyin of the Southern Sea",
    era: "China, ca. 12th century",
    location: "Asian Art Galleries",
    description: "Polychromed wood sculpture embodying compassion and serenity in Buddhist art.",
    imageSourceId: "artist-monet-portrait",
  },
  {
    id: "edo-period-yoroi",
    title: "Suit of Armor (Yoroi)",
    era: "Japan, Edo period (1615-1868)",
    location: "Arms and Armor Galleries",
    description: "Intricate samurai armor combining lacquered metal, silk cords, and gold leaf.",
    imageSourceId: "armor-henry-ii",
  },
  {
    id: "kritios-boy",
    title: "Marble Statue of a Youth (Kritios Boy)",
    era: "Ancient Greece, ca. 450 BCE",
    location: "Greek and Roman Galleries",
    description: "Early classical sculpture capturing human realism and balance after archaic stylization.",
    imageSourceId: "eros-sleeping",
  },
  {
    id: "modigliani-bronze-head",
    title: "Bronze Head",
    era: "France, 1913",
    location: "Modern Art Galleries",
    description:
      "Stylized portrait by Amedeo Modigliani blending African influences with Parisian avant-garde aesthetics.",
    imageSourceId: "artist-matisse-portrait",
  },
  {
    id: "mayan-incense-burner",
    title: "Ceramic Incense Burner",
    era: "Mexico, 9th century",
    location: "Arts of the Americas",
    description: "Ritual object symbolizing the connection between divine and earthly realms.",
    imageSourceId: "artist-picasso-portrait",
  },
  {
    id: "bellini-madonna",
    title: "Madonna and Child",
    era: "Italy, ca. 1500",
    location: "European Paintings",
    description: "Oil on panel by Giovanni Bellini glowing with Venetian light and devotional tenderness.",
    imageSourceId: "young-woman-water-pitcher",
  },
  {
    id: "benin-bronze-plaque",
    title: "Benin Bronze Plaque",
    era: "Nigeria, 16th century",
    location: "Arts of Africa",
    description: "Exquisite royal relief casting celebrating the craftsmanship of the Benin Kingdom.",
    imageSourceId: "unicorn-rests-garden",
  },
  {
    id: "shahnameh-leaf",
    title: "Shahnameh Manuscript Leaf",
    era: "Iran, ca. 17th century",
    location: "Islamic Art Galleries",
    description: "Illuminated folio depicting epic Persian scenes in gold and lapis.",
    imageSourceId: "shah-jahan-horseback",
  },
  {
    id: "monet-water-lilies",
    title: "Water Lilies",
    era: "France, 1840",
    location: "European Paintings",
    description: "Dreamlike depiction of light rippling across Monet's Giverny pond.",
    imageSourceId: "the-harvesters",
  },
  {
    id: "lift-every-voice",
    title: "Lift Every Voice and Sing",
    era: "USA, 1939",
    location: "American Wing",
    description:
      "Plaster model by Augusta Savage symbolizing Black cultural pride and resilience during the Harlem Renaissance.",
    imageSourceId: "washington-crossing-delaware",
  },
  {
    id: "wedgewood-jasperware",
    title: "Wedgewood Jasperware Vase",
    era: "England, 1815",
    location: "Decorative Arts",
    description: "Neoclassical blue and white stoneware celebrating classical motifs.",
    imageSourceId: "artist-manet-portrait",
  },
  {
    id: "bronze-cat",
    title: "Bronze Cat",
    era: "Egypt, ca. 664-332 BCE",
    location: "Egyptian Art",
    description: "Figure of Bastet symbolizing fertility, protection, and grace.",
    imageSourceId: "artist-klimt-portrait",
  },
  {
    id: "matisse-the-dance",
    title: "The Dance",
    era: "France, 1908",
    location: "European Paintings",
    description: "Radiant composition by Henri Matisse expressing joy through bold color and simplified form.",
    imageSourceId: "under-wave-kanagawa",
  },
  {
    id: "pearl-earring-replica",
    title: "Girl with a Pearl Earring (Replica Display)",
    era: "Netherlands, 1665",
    location: "European Paintings",
    description: "Iconic portrait evoking light, stillness, and enigmatic presence.",
    imageSourceId: "death-of-socrates",
  },
  {
    id: "andean-textile-fragment",
    title: "Textile Fragment",
    era: "Peru, ca. 1000 CE",
    location: "Arts of the Ancient Americas",
    description: "Vibrant woven pattern symbolizing Andean cosmology and ancestral identity.",
    imageSourceId: "artist-warhol-portrait",
  },
  {
    id: "starry-night-study",
    title: "The Starry Night (Study)",
    era: "France, 1889",
    location: "European Paintings",
    description: "Preliminary color study exploring the swirling motion later seen in the final Van Gogh masterpiece.",
    imageSourceId: "artist-van-gogh-portrait",
  },
  {
    id: "krishna-and-radha",
    title: "Miniature Painting of Krishna and Radha",
    era: "India, ca. 18th century",
    location: "Asian Art Galleries",
    description: "Detailed gouache scene embodying divine love and ornate craftsmanship.",
    imageSourceId: "artist-degas-portrait",
  },
];
