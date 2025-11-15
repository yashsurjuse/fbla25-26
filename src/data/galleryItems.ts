export type GalleryItem = {
  image: string;
  text: string;
  labelPosition?: "top" | "bottom";
};

const metProxy = (source: string) => `/api/gallery-image?src=${encodeURIComponent(source)}`;

export const metGalleryItems: GalleryItem[] = [
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/ad/original/DP215410.jpg"),
    text: "Washington Crossing the Delaware",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/ep/original/DP353257.jpg"),
    text: "Young Woman with a Water Pitcher",
    labelPosition: "top",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg"),
    text: "Under the Wave off Kanagawa",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/aa/original/DP256970.jpg"),
    text: "Armor of Henry II of France",
    labelPosition: "top",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/cl/original/DP118991.jpg"),
    text: "The Unicorn Rests in a Garden",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/eg/original/DP-24216-003.jpg"),
    text: "Sphinx of Hatshepsut",
    labelPosition: "top",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/gr/original/DP123903.jpg"),
    text: "Bronze Statue of Eros Sleeping",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/is/original/DT5434.jpg"),
    text: "Portrait of Shah Jahan on Horseback",
    labelPosition: "top",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/ep/original/DP-13139-001.jpg"),
    text: "The Death of Socrates",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/ep/original/DP119115.jpg"),
    text: "The Harvesters",
    labelPosition: "top",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/ep/original/DT1502_cropped2.jpg"),
    text: "Self-Portrait with a Straw Hat",
    labelPosition: "bottom",
  },
  {
    image: metProxy("https://images.metmuseum.org/CRDImages/as/original/DP291187.jpg"),
    text: "Standing Bodhisattva Maitreya",
    labelPosition: "top",
  },
];
