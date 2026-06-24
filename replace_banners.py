import json
import glob
import re
import os

with open("public/data/artifacts_master.json", "r", encoding="utf-8") as f:
    artifacts = json.load(f)
    
valid_images = [a["primaryImage"] for a in artifacts if a.get("primaryImage") and "metmuseum.org" in a["primaryImage"]][50:100]

sanity_pattern = re.compile(r'"https://cdn\.sanity\.io/images/[^"]+"')

files_to_check = []
for root, dirs, files in os.walk("src/app"):
    for file in files:
        if file.endswith(".tsx"):
            files_to_check.append(os.path.join(root, file))

img_idx = 0
for filepath in files_to_check:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "cdn.sanity.io" in content:
        def replace_func(match):
            global img_idx
            new_img = f'"{valid_images[img_idx % len(valid_images)]}"'
            img_idx += 1
            return new_img
            
        new_content = sanity_pattern.sub(replace_func, content)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Replaced images in {filepath}")

print("Banner images replacement complete.")
