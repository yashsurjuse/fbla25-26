import os
import json
import time
import requests
import pandas as pd

CSV_PATH = r"C:\Users\yashs\OneDrive\Documents\MetObjects.csv"
OUTPUT_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'data', 'artifacts_master.json')

def fetch_met_image(object_id):
    url = f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{object_id}"
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
        res = requests.get(url, headers=headers, timeout=(3.0, 5.0))
        if res.status_code == 200:
            data = res.json()
            return data.get('primaryImage'), data.get('primaryImageSmall')
    except Exception as e:
        print(f"Error fetching image for {object_id}: {e}")
    return None, None

def process_artifacts():
    print(f"Loading CSV from {CSV_PATH}...", flush=True)
    try:
        df = pd.read_csv(CSV_PATH, low_memory=False)
    except FileNotFoundError:
        print(f"File not found: {CSV_PATH}", flush=True)
        return
        
    print("Filtering for public domain and valid metadata...", flush=True)
    # Ensure public domain for highest chance of images
    df = df[df['Is Public Domain'].isin([True, 'True', 'true', 1, '1'])]
    
    # Must have these fields for the UI to be useful
    df = df.dropna(subset=['Title', 'Medium', 'Department'])
    
    # Optional but good: Artist Display Name
    # We will fill NA with 'Unknown Artist'
    df['Artist Display Name'] = df['Artist Display Name'].fillna('Unknown Artist')
    
    # Shuffle the dataframe to get a random assortment
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    
    artifacts = []
    valid_count = 0
    total_processed = 0
    
    print(f"Iterating through candidates to find 5000 with images...", flush=True)
    
    for index, row in df.iterrows():
        total_processed += 1
        obj_id = row['Object ID']
        
        if pd.isna(obj_id):
            continue
            
        obj_id = int(obj_id)
        
        primaryImage, primaryImageSmall = fetch_met_image(obj_id)
        
        if primaryImage and primaryImageSmall:
            artifacts.append({
                "objectID": obj_id,
                "title": str(row['Title']).strip(),
                "artistDisplayName": str(row['Artist Display Name']).strip(),
                "medium": str(row['Medium']).strip(),
                "department": str(row['Department']).strip(),
                "objectDate": str(row['Object Date']).strip() if not pd.isna(row['Object Date']) else "",
                "primaryImage": primaryImage,
                "primaryImageSmall": primaryImageSmall
            })
            valid_count += 1
            
            if valid_count % 50 == 0:
                print(f"Found {valid_count}/5000 valid artifacts (Processed {total_processed} items)...", flush=True)
                os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
                with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
                    json.dump(artifacts, f, indent=2, ensure_ascii=False)
                
            if valid_count >= 5000:
                print("Reached 5000 valid artifacts! Stopping.", flush=True)
                break
                
        # Be nice to the MET API
        time.sleep(0.15)
        
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(artifacts, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully saved {valid_count} artifacts to {OUTPUT_PATH}", flush=True)

if __name__ == "__main__":
    process_artifacts()
