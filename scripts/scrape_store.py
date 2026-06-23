import os
import glob
import json
import random
from bs4 import BeautifulSoup

def get_category_from_title(title):
    t = title.lower()
    if any(k in t for k in ['tee', 'shirt', 'hoodie', 'sweater', 'apron']):
        return "Apparel"
    if any(k in t for k in ['earring', 'necklace', 'bracelet', 'ring', 'brooch', 'bangle']):
        return "Jewelry"
    if any(k in t for k in ['scarf', 'tote', 'bag', 'umbrella', 'socks', 'necktie', 'pouch', 'watch']):
        return "Accessories"
    if any(k in t for k in ['book', 'guide', 'catalogue', 'journal', 'notebook']):
        return "Books"
    if any(k in t for k in ['plush', 'puzzle', 'game', 'toy', 'doll']):
        return "Toys"
    if any(k in t for k in ['mug', 'coaster', 'plate', 'bowl', 'decor', 'ornament', 'pillow', 'rug', 'poster', 'print']):
        return "Home Decor"
    return "Gifts"

def scrape_store():
    store_dir = r"C:\Users\yashs\store.metmuseum.org"
    files = glob.glob(os.path.join(store_dir, "*.html"))
    print(f"Found {len(files)} HTML files to process.")

    products = []
    
    for file in files:
        try:
            with open(file, "r", encoding="utf-8", errors="ignore") as f:
                html = f.read()
        except Exception:
            continue
            
        soup = BeautifulSoup(html, 'html.parser')
        
        # Check if it's a real product (has add to cart or product-info-main)
        if not soup.select_one(".product-info-main") and not soup.select_one("#product-addtocart-button"):
            continue
        
        # Title
        title_tag = soup.find("title")
        if not title_tag: continue
        title = title_tag.text.split("|")[0].strip()
        if not title: continue
        
        # Image
        img_url = None
        img_tag = soup.find("meta", property="og:image")
        if img_tag and img_tag.get("content"):
            img_url = img_tag["content"]
        else:
            img = soup.select_one('img.gallery-placeholder__image')
            if img and img.has_attr('src'):
                img_url = img['src']
                
        if not img_url: continue
        
        # Price
        price_str = None
        price_meta = soup.find("meta", property="product:price:amount")
        if price_meta and price_meta.get("content"):
            price_str = "$" + price_meta["content"]
        else:
            price_tag = soup.select_one(".price")
            if price_tag:
                price_str = price_tag.text.strip()
            else:
                continue # If there's no price, it's not a valid item
            
        # Description
        desc_str = ""
        desc_tag = soup.select_one(".value[itemprop='description']")
        if desc_tag:
            desc_str = desc_tag.text.strip()
        else:
            og_desc = soup.find("meta", property="og:description")
            if og_desc and og_desc.get("content"):
                desc_str = og_desc["content"]
                
        # Category
        category = "Gift"
        b_items = soup.select(".breadcrumbs .item")
        if len(b_items) > 1:
            category = b_items[-1].text.strip()
        else:
            category = get_category_from_title(title)
            
        # Standardize categories
        category = get_category_from_title(title) if category == "Gift" else category
        
        rating = round(random.uniform(4.0, 5.0), 1)
        reviews = random.randint(3, 340)

        prod_id = os.path.basename(file).split(".html")[0]

        products.append({
            "id": prod_id,
            "title": title,
            "price": price_str,
            "image": img_url,
            "description": desc_str,
            "category": category,
            "rating": rating,
            "reviews": reviews
        })
        
    # Shuffle so we get mixed products, not grouped alphabetically
    random.shuffle(products)
        
    print(f"Successfully scraped {len(products)} authentic products.")
    
    output_path = "public/data/store_master.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2)

if __name__ == "__main__":
    scrape_store()
