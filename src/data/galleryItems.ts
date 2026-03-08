export type GalleryItem = {
  image: string;
  text: string;
  description: string;
  labelPosition?: "top" | "bottom";
};

const metProxy = (source: string) => `/api/gallery-image?src=${encodeURIComponent(source)}`;

export const metGalleryItems: GalleryItem[] = [
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/ad/original/DP215410.jpg"),
    text: "Washington Crossing the Delaware",
    description:
      "Leutze painted this sweeping scene decades after the Revolution to celebrate American grit. The snow, cramped boat, and rising sun make the moment feel urgent and heroic. Some details are inaccurate, yet the mood captures the hope of a surprise attack. It reminds viewers that symbols can be as powerful as facts.",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/ep/original/DP353257.jpg"),
    text: "Young Woman with a Water Pitcher",
    description:
      "This quiet Dutch interior shows a woman pausing beside a window while holding a silver pitcher. The soft light on the wall and tableware makes ordinary chores feel calm and dignified. Vermeer keeps the figures still so you notice the colors and reflections. It feels like a frozen moment in a real house.",
    labelPosition: "top",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg"),
    text: "Under the Wave off Kanagawa",
    description:
      "Hokusai's woodblock print contrasts a towering wave with the distant Mount Fuji. The claw-like water threatens the tiny boats, yet the fishermen stay focused. Bold Prussian blue ink helped the design travel worldwide. It shows how nature can be both beautiful and tense.",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/aa/original/DP256970.jpg"),
    text: "Armor of Henry II of France",
    description:
      "This suit of armor was crafted for King Henry II to wear in courtly parades, not in battle. The etched gold scenes and swirling vines show off royal wealth and taste. Even the smallest plates were shaped to look sleek while allowing movement. It proves armor could be fashion as well as protection.",
    labelPosition: "top",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/cl/original/DP118991.jpg"),
    text: "The Unicorn Rests in a Garden",
    description:
      "The tapestry shows a unicorn sitting in a fenced garden filled with flowers and ripe fruit. Tiny animals and shimmering gold thread make the scene feel magical but controlled. Historians think the unicorn stands for both purity and ownership. It reads like a medieval story told through color.",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/eg/original/DP-24216-003.jpg"),
    text: "Sphinx of Hatshepsut",
    description:
      "This sandstone sphinx has the body of a lion and the face of Pharaoh Hatshepsut. Carved inscriptions honor her as a powerful ruler even though she was a woman in a male role. The paws and calm expression echo older Egyptian art to claim legitimacy. It feels both ancient and personal.",
    labelPosition: "top",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/gr/original/DP123903.jpg"),
    text: "Bronze Statue of Eros Sleeping",
    description:
      "The Greek god of love is shown as a child curled up in sleep, with relaxed wings and limbs. Sculptors used bronze so the pose could stretch softly without breaking. The subject suggests even love needs to rest between adventures. It is surprisingly tender for an ancient myth figure.",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/is/original/DT5434.jpg"),
    text: "Portrait of Shah Jahan on Horseback",
    description:
      "This Mughal painting shows Emperor Shah Jahan riding a decorated horse against a blank background. Jewel-like colors and precise outlines highlight his wealth and control. The artist includes tiny inscriptions praising his leadership. It is a royal selfie meant to impress allies and rivals.",
    labelPosition: "top",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/ep/original/DP-13139-001.jpg"),
    text: "The Death of Socrates",
    description:
      "Jacques-Louis David depicts the moment Socrates chooses truth over exile. Cool light, calm gestures, and clear lines make the moral lesson easy to follow. Each student reacts differently, showing how hard the choice feels. It reads like a stage play about courage.",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/ep/original/DP119115.jpg"),
    text: "The Harvesters",
    description:
      "This panel by Pieter Bruegel shows peasants cutting grain and resting under trees on a hot day. The wide landscape includes games, food, and work happening at once. Warm colors and tiny details make you feel the summer heat. It honors everyday labor rather than noble heroes.",
    labelPosition: "top",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/ep/original/DT1502_cropped2.jpg"),
    text: "Self-Portrait with a Straw Hat",
    description:
      "Van Gogh painted himself in quick strokes of yellow, blue, and green to study light. The tilted hat casts bright highlights while the eyes look intense. Broken brushwork makes the painting feel like it is vibrating. It feels honest about both confidence and fatigue.",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/as/original/DP291187.jpg"),
    text: "Standing Bodhisattva Maitreya",
    description:
      "This tall Gandharan figure mixes Indian and Greco-Roman styles with soft drapery and calm features. The bodhisattva holds his hand in a gesture of reassurance for future followers. Carved jewelry and wavy hair show how Buddhism adapted to local tastes. It promises a compassionate guide yet to arrive.",
    labelPosition: "top",
  },
];
