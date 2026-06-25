import json
import random

with open("public/data/image_library.json", "r", encoding="utf-8") as f:
    images_pool = json.load(f)

with open("src/data/articles.json", "r", encoding="utf-8") as f:
    articles = json.load(f)

for article in articles:
    # Ensure they have valid images from the library pool
    article["images"] = random.sample(images_pool, 3)

with open("src/data/articles.json", "w", encoding="utf-8") as f:
    json.dump(articles, f, indent=2)

print("Article images fixed.")
