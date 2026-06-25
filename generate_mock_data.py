import json
import random

with open("public/data/artifacts_master.json", "r", encoding="utf-8") as f:
    artifacts = json.load(f)

# Filter out paintings to get "actual pictures, not paintings" as best as we can
# Paintings often have "Painting" in medium or classification
non_paintings = [a for a in artifacts if "Painting" not in a.get("classification", "") and "Painting" not in a.get("medium", "") and a.get("primaryImage")]

images_pool = [a["primaryImage"] for a in non_paintings]
if not images_pool:
    images_pool = [a["primaryImage"] for a in artifacts if a.get("primaryImage")]

def get_images(count=1):
    return random.sample(images_pool, min(count, len(images_pool)))

# --- Generate 25 LONG Research Articles ---
research_titles = [
    "Uncovering the History of the Benin Bronzes",
    "The Architectural Evolution of The Cloisters",
    "Restoring Ancient Greek Sculptures",
    "Textile Conservation: A Deep Dive into the Unicorn Tapestries",
    "Armor of the Samurai: Functional Art",
    "The Cultural Exchange in Islamic Art",
    "Egyptian Burial Practices: New Insights from Recent Excavations",
    "The Making of a Masterpiece: Bronze Casting Techniques",
    "Preserving Photographic Archives for the Next Century",
    "Deciphering Mayan Hieroglyphs on Pottery",
    "The Silk Road: Trade and Artistic Innovation",
    "Stained Glass Mastery in the Medieval Period",
    "Musical Instruments of the 17th Century European Court",
    "The Ritual Significance of African Masks",
    "Roman Glassblowing: Technology and Aesthetics",
    "The Evolution of the Japanese Tea Ceremony",
    "The Patronage of the Medici Family",
    "The Architecture of the Temple of Dendur",
    "Techniques of Renaissance Goldsmiths",
    "The Meaning of Jade in Ancient China",
    "The Influence of Oceanic Art on Modernism",
    "Byzantine Mosaics: A Study in Light and Color",
    "The Role of Women in 18th Century French Salons",
    "The Discovery of the Tomb of Perneb",
    "The Development of Printmaking in Northern Europe"
]

long_paragraph = "This extensive research study explores the multifaceted dimensions of the subject matter. Drawing upon recently discovered archival documents, rigorous material analysis, and cross-cultural comparisons, we propose a new framework for understanding these historical artifacts. The methodological approach combines traditional art historical techniques with cutting-edge scientific imaging, including X-ray fluorescence and multispectral reflectography. By doing so, we illuminate previously obscured details regarding the provenance, manufacture, and original context of these works. Furthermore, the socio-political climate of the era is analyzed to provide a comprehensive backdrop, revealing how global trade networks, religious shifts, and technological advancements directly influenced artistic production. This comprehensive analysis not only challenges previous assumptions but also opens new avenues for future scholarship in the field."

articles = []
for i, title in enumerate(research_titles):
    slug = title.lower().replace(" ", "-").replace(":", "")
    articles.append({
        "id": i + 1,
        "title": title,
        "author": "The Met Research Department",
        "category": "Research Publication",
        "date": "2026",
        "readTime": "15 min read",
        "slug": slug,
        "images": get_images(3),
        "content": [long_paragraph] * 8  # 8 long paragraphs makes it very long
    })

with open("src/data/articles.json", "w", encoding="utf-8") as f:
    json.dump(articles, f, indent=2)


# --- Generate 100 Press Releases ---
press_titles = [
    "The Met Announces Groundbreaking New Exhibition",
    "Major Acquisition of Contemporary Art Confirmed",
    "The Met Reports Record Attendance for the Fiscal Year",
    "New Director of Conservation Appointed",
    "The Met Cloisters Celebrates 90th Anniversary",
    "Innovative Digital Initiative Launched to Digitize Collection",
    "The Met Gala Theme for 2027 Revealed",
    "Curatorial Leadership Changes in Asian Art Department",
    "Significant Grant Awarded for Preservation Efforts",
    "The Met Fifth Avenue Restores Historic Skylights"
]

press_releases = []
for i in range(100):
    base_title = press_titles[i % len(press_titles)]
    title = f"{base_title} - Update {i + 1}"
    press_releases.append({
        "id": i + 1,
        "title": title,
        "date": f"June {max(1, 30 - (i % 30))}, 2026",
        "category": "Press Release",
        "excerpt": "The Metropolitan Museum of Art today announced a major update regarding its ongoing institutional goals, exhibitions, and public programs. For full details, please contact the Communications Department.",
        "image_url": get_images(1)[0],
        "url": f"/press/press-releases/{i+1}"
    })

with open("src/data/press_releases.json", "w", encoding="utf-8") as f:
    json.dump(press_releases, f, indent=2)

print("Mock data generation complete!")
