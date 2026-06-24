import json

with open("public/data/artifacts_master.json", "r", encoding="utf-8") as f:
    artifacts = json.load(f)
    
valid_images = [a["primaryImage"] for a in artifacts if a.get("primaryImage") and "metmuseum.org" in a["primaryImage"]][:50]

# Update articles.json
with open("src/data/articles.json", "r", encoding="utf-8") as f:
    articles_data = json.load(f)

for i, a in enumerate(articles_data):
    if i < len(valid_images):
        a["images"] = [valid_images[i]]

with open("src/data/articles.json", "w", encoding="utf-8") as f:
    json.dump(articles_data, f, indent=2)


# Update press_releases.json
with open("src/data/press_releases.json", "r", encoding="utf-8") as f:
    press_data = json.load(f)

for i, p in enumerate(press_data):
    # offset by 20 so we use different images
    img_idx = (i + 20) % len(valid_images)
    p["image_url"] = valid_images[img_idx]

with open("src/data/press_releases.json", "w", encoding="utf-8") as f:
    json.dump(press_data, f, indent=2)

print("Updated articles and press releases with artwork images.")
