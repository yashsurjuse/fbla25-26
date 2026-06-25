import json
import re

with open("src/data/press_releases.json", "r", encoding="utf-8") as f:
    prs = json.load(f)

for pr in prs:
    if "excerpt" in pr:
        pr["summary"] = pr.pop("excerpt")
    if "image_url" in pr:
        pr["image"] = pr.pop("image_url")
    if "slug" not in pr:
        pr["slug"] = re.sub(r'[^a-z0-9-]', '', pr["title"].lower().replace(' ', '-')) + f"-{pr['id']}"

with open("src/data/press_releases.json", "w", encoding="utf-8") as f:
    json.dump(prs, f, indent=2)

print("Fixed press releases schema.")
