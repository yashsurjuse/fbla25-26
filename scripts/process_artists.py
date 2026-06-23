import os
import json
import time
import requests
import pandas as pd

CSV_PATH = r"C:\Users\yashs\OneDrive\Documents\MetObjects.csv"
OUTPUT_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'data', 'artists_master.json')

def fetch_wikipedia_data(artist_name):
    # Search for the artist
    search_url = "https://en.wikipedia.org/w/api.php"
    search_params = {
        "action": "query",
        "list": "search",
        "srsearch": artist_name,
        "format": "json",
        "utf8": 1
    }
    
    try:
        headers = {
            'User-Agent': 'MetDataPipeline/1.0 (Contact: yashs@example.com)'
        }
        search_res = requests.get(search_url, params=search_params, headers=headers, timeout=10).json()
        if not search_res.get("query", {}).get("search"):
            return None, None
            
        # Get the top result title
        title = search_res["query"]["search"][0]["title"]
        
        # Fetch summary and categories
        details_params = {
            "action": "query",
            "prop": "extracts|categories|pageimages",
            "titles": title,
            "format": "json",
            "exintro": 1,
            "explaintext": 1,
            "pithumbsize": 500,
            "utf8": 1
        }
        
        details_res = requests.get(search_url, params=details_params, headers=headers, timeout=10).json()
        pages = details_res.get("query", {}).get("pages", {})
        if not pages:
            return None, None
            
        page = list(pages.values())[0]
        summary = page.get("extract", "").lower()
        categories = [cat.get("title", "").lower() for cat in page.get("categories", [])]
        image_url = page.get("thumbnail", {}).get("source", None)
        
        # Disambiguation strategy
        keywords = [" artist ", " painter ", " sculptor ", " photographer ", " engraver ", " architect ", " art "]
        is_artist = False
        
        # Add spaces around summary to match edge words
        summary_padded = f" {summary} "
        
        for kw in keywords:
            if kw in summary_padded:
                is_artist = True
                break
            for cat in categories:
                if kw.strip() in cat:
                    is_artist = True
                    break
                    
        if is_artist:
            return page.get("extract"), image_url
        else:
            return None, None

    except Exception as e:
        print(f"Error fetching Wikipedia data for {artist_name}: {e}")
        return None, None

def process_artists():
    print(f"Loading CSV from {CSV_PATH}...", flush=True)
    try:
        df = pd.read_csv(CSV_PATH, low_memory=False)
    except FileNotFoundError:
        print(f"File not found: {CSV_PATH}. Make sure it exists.", flush=True)
        return
        
    if 'Artist Display Name' not in df.columns or 'Object ID' not in df.columns:
        print("Required columns missing in CSV.", flush=True)
        return
        
    print("Extracting unique artists and Object IDs...", flush=True)
    # Group by Artist Name and collect Object IDs
    artist_objects = {}
    for index, row in df.iterrows():
        artist = str(row['Artist Display Name']).strip()
        if artist == "nan" or not artist or artist.lower() == "unknown":
            continue
            
        obj_id = row['Object ID']
        if pd.isna(obj_id):
            continue
            
        if artist not in artist_objects:
            artist_objects[artist] = []
        artist_objects[artist].append(int(obj_id))
        
    print(f"Found {len(artist_objects)} unique artists.", flush=True)
    
    artists_master = []
    
    count = 0
    valid_count = 0
    total = len(artist_objects)
    for artist, object_ids in artist_objects.items():
        if valid_count >= 1000:
            print("Reached limit of 1000 valid artists. Stopping.", flush=True)
            break
            
        if count % 100 == 0:
            print(f"Processing artist {count}/{total}: {artist}. Valid so far: {valid_count}", flush=True)
        count += 1
            
        bio, image_url = fetch_wikipedia_data(artist)
        
        time.sleep(1) # Rate limit Wikipedia API
        
        if not bio or not image_url:
            continue
            
        artists_master.append({
            "name": artist,
            "bio": bio,
            "portrait_url": image_url,
            "object_ids": list(set(object_ids)) # Ensure uniqueness
        })
        
        valid_count += 1
        
        if valid_count % 25 == 0:
            os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
            with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
                json.dump(artists_master, f, indent=2, ensure_ascii=False)
        
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(artists_master, f, indent=2, ensure_ascii=False)
        
    print(f"Saved successfully to {OUTPUT_PATH}", flush=True)

if __name__ == "__main__":
    process_artists()
