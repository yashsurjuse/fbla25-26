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
    id: "washington-crossing-delaware",
    title: "Washington Crossing the Delaware",
    era: "Emanuel Leutze, 1851",
    location: "American Wing",
    description:
      "Leutze's monumental history painting depicts Washington's crossing of the icy Delaware River and has become one of the most recognized patriotic images in American art.",
    imageSourceId: "washington-crossing-delaware",
  },
  {
    id: "death-of-socrates",
    title: "The Death of Socrates",
    era: "Jacques-Louis David, 1787",
    location: "European Paintings",
    description:
      "This neoclassical masterpiece presents Socrates' final moments with exceptional clarity and moral gravity, emphasizing reason, conviction, and civic virtue.",
    imageSourceId: "death-of-socrates",
  },
  {
    id: "the-harvesters",
    title: "The Harvesters",
    era: "Pieter Bruegel the Elder, 1565",
    location: "European Paintings",
    description:
      "Part of Bruegel's celebrated series of the months, the panel combines panoramic landscape and everyday rural life with extraordinary observational detail.",
    imageSourceId: "the-harvesters",
  },
  {
    id: "under-wave-kanagawa",
    title: "Under the Wave off Kanagawa",
    era: "Katsushika Hokusai, ca. 1830-32",
    location: "Asian Art Galleries",
    description:
      "Commonly known as The Great Wave, this woodblock print is a defining image of global visual culture and a key work of Edo-period Japanese printmaking.",
    imageSourceId: "under-wave-kanagawa",
  },
  {
    id: "temple-of-dendur",
    title: "Temple of Dendur",
    era: "Egypt, ca. 15 BCE",
    location: "The Sackler Wing",
    description:
      "Gifted to the United States in 1965, the sandstone temple is one of The Met's most visited landmarks and a centerpiece of the Egyptian Art galleries.",
    imageSourceId: "sphinx-hatshepsut",
  },
  {
    id: "unicorn-rests-garden",
    title: "The Unicorn Rests in a Garden",
    era: "South Netherlands, ca. 1495-1505",
    location: "The Cloisters",
    description:
      "A highlight of The Unicorn Tapestries, this intricately woven panel combines symbolic imagery, botanic detail, and courtly storytelling.",
    imageSourceId: "unicorn-rests-garden",
  },
  {
    id: "armor-henry-ii",
    title: "Armor of Henry II of France",
    era: "France, 16th century",
    location: "Arms and Armor Galleries",
    description:
      "Produced for ceremonial and courtly display, this decorated armor exemplifies Renaissance metalwork and royal self-fashioning.",
    imageSourceId: "armor-henry-ii",
  },
  {
    id: "young-woman-water-pitcher",
    title: "Young Woman with a Water Pitcher",
    era: "Johannes Vermeer, ca. 1662",
    location: "European Paintings",
    description:
      "Vermeer's luminous interior scene demonstrates his mastery of quiet narrative, controlled composition, and the nuanced rendering of light.",
    imageSourceId: "young-woman-water-pitcher",
  },
  {
    id: "standing-bodhisattva",
    title: "Standing Bodhisattva Maitreya",
    era: "Pakistan, 3rd-4th century",
    location: "Asian Art Galleries",
    description:
      "Carved in the Gandharan tradition, the sculpture reflects the cross-cultural artistic exchange between South Asia and the Hellenistic world.",
    imageSourceId: "standing-bodhisattva",
  },
  {
    id: "sphinx-hatshepsut",
    title: "Sphinx of Hatshepsut",
    era: "Egypt, Dynasty 18",
    location: "Egyptian Art Galleries",
    description:
      "This royal monument links the female pharaoh Hatshepsut to long-standing visual traditions of kingship, authority, and divine legitimacy.",
    imageSourceId: "sphinx-hatshepsut",
  },
  {
    id: "shah-jahan-horseback",
    title: "Portrait of Shah Jahan on Horseback",
    era: "Mughal India, 17th century",
    location: "Islamic Art Galleries",
    description:
      "A refined imperial portrait emphasizing rank, ceremony, and dynastic image-making in the Mughal court.",
    imageSourceId: "shah-jahan-horseback",
  },
  {
    id: "eros-sleeping",
    title: "Bronze Statue of Eros Sleeping",
    era: "Roman, Imperial period",
    location: "Greek and Roman Galleries",
    description:
      "The small-scale bronze demonstrates technical sophistication and an intimate approach to mythological subject matter.",
    imageSourceId: "eros-sleeping",
  },
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
    id: "alexander-mcqueen-ensemble",
    title: "Alexander McQueen Ensemble",
    era: "United Kingdom, late 20th-early 21st century",
    location: "The Costume Institute",
    description:
      "Representative of McQueen's theatrical design language, the garment demonstrates the intersection of fashion, performance, and craftsmanship.",
    imageSourceId: "armor-henry-ii",
  },
  {
    id: "renaissance-altarpiece-panel",
    title: "Renaissance Altarpiece Panel",
    era: "Italy, 15th century",
    location: "European Paintings",
    description:
      "This devotional panel reflects workshop production methods and the renewed interest in perspective and naturalism during the early Renaissance.",
    imageSourceId: "young-woman-water-pitcher",
  },
  {
    id: "harlem-renaissance-sculpture",
    title: "Harlem Renaissance Sculpture Study",
    era: "United States, 1930s",
    location: "American Wing",
    description:
      "A figurative study connected to Harlem Renaissance aesthetics, emphasizing Black cultural expression and modern sculptural form.",
    imageSourceId: "washington-crossing-delaware",
  },
  {
    id: "mughal-illuminated-manuscript",
    title: "Mughal Illuminated Manuscript Leaf",
    era: "India, 17th century",
    location: "Islamic Art Galleries",
    description:
      "The manuscript page demonstrates highly controlled linework, precious pigments, and the literary culture of the Mughal atelier.",
    imageSourceId: "shah-jahan-horseback",
  },
  {
    id: "medieval-devotional-ivory",
    title: "Medieval Devotional Ivory",
    era: "France, 14th century",
    location: "Medieval Art",
    description:
      "Carved for private devotion, this work highlights the fine-scale craftsmanship and iconographic clarity characteristic of Gothic devotional art.",
    imageSourceId: "unicorn-rests-garden",
  },
  {
    id: "japanese-screen-landscape",
    title: "Japanese Folding Screen Landscape",
    era: "Japan, Edo period",
    location: "Asian Art Galleries",
    description:
      "A gold-ground byobu depicting seasonal scenery and courtly movement, representative of elite painting traditions in early modern Japan.",
    imageSourceId: "under-wave-kanagawa",
  },
  {
    id: "andes-ritual-vessel",
    title: "Andean Ritual Vessel",
    era: "Peru, 10th-12th century",
    location: "Arts of the Americas",
    description:
      "A ceremonial vessel with symbolic motifs used in ritual settings, emphasizing continuity between visual language and sacred practice.",
    imageSourceId: "artist-warhol-portrait",
  },
  {
    id: "islamic-metalwork-basin",
    title: "Islamic Inlaid Metal Basin",
    era: "Syria or Egypt, 14th century",
    location: "Islamic Art Galleries",
    description:
      "The basin's intricate silver and brass inlay demonstrates technical virtuosity and the prestige of metalwork in Mamluk court culture.",
    imageSourceId: "shah-jahan-horseback",
  },
  {
    id: "benin-bronze-plaque",
    title: "Benin Bronze Plaque",
    era: "Nigeria, 16th century",
    location: "Arts of Africa",
    description:
      "A cast brass court plaque recording dynastic authority and ceremonial life in the Kingdom of Benin, now interpreted within broader provenance histories.",
    imageSourceId: "unicorn-rests-garden",
  },
  {
    id: "classical-marble-relief",
    title: "Classical Marble Relief",
    era: "Roman, 2nd century CE",
    location: "Greek and Roman Galleries",
    description:
      "This architectural fragment illustrates how narrative relief sculpture shaped public space and commemorative culture in the Roman world.",
    imageSourceId: "eros-sleeping",
  },
  {
    id: "indian-miniature-krishna",
    title: "Miniature of Krishna and Radha",
    era: "India, 18th century",
    location: "Asian Art Galleries",
    description:
      "A finely painted miniature combining poetic narrative and ornamental precision, representative of courtly painting traditions in North India.",
    imageSourceId: "artist-degas-portrait",
  },
  {
    id: "american-portrait-study",
    title: "American Portrait Study",
    era: "United States, late 19th century",
    location: "American Wing",
    description:
      "Executed with confident brushwork and controlled palette, this portrait reflects changing tastes in status, identity, and modernity.",
    imageSourceId: "artist-van-gogh-portrait",
  },
  {
    id: "tibetan-thangka",
    title: "Tibetan Thangka",
    era: "Tibet, 17th century",
    location: "Asian Art Galleries",
    description:
      "Painted in mineral pigments on cloth, this devotional image demonstrates the iconographic rigor and meditative function of Himalayan Buddhist painting.",
    imageSourceId: "standing-bodhisattva",
  },
  {
    id: "neoclassical-silver-object",
    title: "Neoclassical Silver Object",
    era: "Europe, early 19th century",
    location: "European Sculpture and Decorative Arts",
    description:
      "This work pairs classical revival ornament with luxury materials, illustrating the social role of decorative arts in elite domestic settings.",
    imageSourceId: "artist-manet-portrait",
  },
  {
    id: "egyptian-bronze-animal",
    title: "Egyptian Bronze Animal Figure",
    era: "Egypt, Late Period",
    location: "Egyptian Art Galleries",
    description:
      "Small bronze votive figures like this one are central to understanding ritual practice and temple donation in ancient Egypt.",
    imageSourceId: "artist-klimt-portrait",
  },
  {
    id: "post-impressionist-study",
    title: "Post-Impressionist Study",
    era: "France, late 19th century",
    location: "European Paintings",
    description:
      "Color-driven brushwork and compressed space characterize this study, reflecting major developments in European painting before modernism.",
    imageSourceId: "self-portrait-straw-hat",
  },
];
