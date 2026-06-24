import json

with open("src/data/articles.json", "r", encoding="utf-8") as f:
    articles = json.load(f)

for idx, a in enumerate(articles):
    # Add slug
    a["slug"] = a["title"].lower().replace(" ", "-").replace(":", "").replace("'", "")
    
    # Ensure images array exists
    if "image" in a:
        a["images"] = [a.pop("image")]
        
    # Ensure content array exists
    if "excerpt" in a:
        a["content"] = [
            a.pop("excerpt"),
            f"This is a deeper exploration of {a['title']}. Here we examine the historical context and the techniques used by the creators.",
            "In recent years, our understanding of this subject has grown thanks to new analytical methods and cross-disciplinary research."
        ]

with open("src/data/articles.json", "w", encoding="utf-8") as f:
    json.dump(articles, f, indent=2)

print("Articles fixed")
