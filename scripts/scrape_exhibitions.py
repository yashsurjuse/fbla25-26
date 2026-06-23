import os
import json
import time
import random
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright
from playwright_stealth import Stealth

load_dotenv()

def get_wiki_summary(title):
    search_url = "https://en.wikipedia.org/w/api.php"
    search_params = {"action": "query", "list": "search", "srsearch": title, "format": "json", "utf8": 1}
    try:
        search_res = requests.get(search_url, params=search_params, timeout=5).json()
        if not search_res.get("query", {}).get("search"): return None
        page_title = search_res["query"]["search"][0]["title"]
        details_params = {"action": "query", "prop": "extracts", "titles": page_title, "format": "json", "exintro": 1, "explaintext": 1}
        details_res = requests.get(search_url, params=details_params, timeout=5).json()
        pages = details_res.get("query", {}).get("pages", {})
        extract = list(pages.values())[0].get("extract")
        if extract:
            sentences = extract.split('. ')
            return '. '.join(sentences[:2]) + '.'
    except:
        return None
    return None

def generate_description(title, year):
    desc = get_wiki_summary(title)
    if desc: return desc
    return f"An exclusive art exhibition titled '{title}' hosted at the Metropolitan Museum of Art, featuring incredible pieces."

def scrape_exhibitions():
    all_exhibitions = []
    
    with sync_playwright() as p:
        # Using the local Chrome installation instead of Chromium nightly to bypass Vercel WAF
        browser = p.chromium.launch(headless=False, channel="chrome")
        context = browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            viewport={'width': 1920, 'height': 1080},
            has_touch=False,
            is_mobile=False
        )

        for year in range(1980, 2027):
            print(f"Scraping year {year}...", flush=True)
            url = f"https://www.metmuseum.org/exhibitions/past?year={year}"
            
            page = context.new_page()
            Stealth().apply_stealth_sync(page)
            
            try:
                # Fast scraping
                page.goto(url, wait_until="domcontentloaded", timeout=60000)
                
                # Wait briefly
                page.wait_for_timeout(1000)
                
                cards_data = page.evaluate('''() => {
                    return Array.from(document.querySelectorAll('article')).map(article => {
                        const titleEl = article.querySelector('[role="heading"] a') || article.querySelector('h2') || article.querySelector('h3');
                        const imgEl = article.querySelector('img');
                        
                        let dates = null;
                        const metaEl = article.querySelector('[class*="meta"]');
                        if (metaEl) {
                            dates = metaEl.innerText.trim();
                        } else {
                            const allText = article.innerText.trim().split('\\n');
                            if (allText.length > 1) {
                                dates = allText[allText.length - 1];
                            }
                        }
                        
                        return {
                            title: titleEl ? titleEl.innerText.trim() : '',
                            dates: dates,
                            image_url: imgEl ? imgEl.src : null
                        };
                    }).filter(item => item.title && item.title.length > 0);
                }''')
                
                unique_titles = set()
                unique_cards = []
                
                for item in cards_data:
                    title = item['title'].strip()
                    if not title or len(title) < 3 or title in unique_titles:
                        continue
                    
                    unique_titles.add(title)
                    
                    description = "Temporary description"
                    
                    unique_cards.append({
                        "title": title,
                        "dates": item['dates'],
                        "image_url": item['image_url'],
                        "description": description
                    })
                
                if unique_cards:
                    all_exhibitions.extend(unique_cards)
                    print(f"Found {len(unique_cards)} cards for year {year}", flush=True)
                else:
                    print(f"No cards found for year {year}", flush=True)
                
            except Exception as e:
                print(f"Error scraping year {year}: {e}", flush=True)

        browser.close()

    output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'data', 'exhibitions_master.json')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_exhibitions, f, indent=2, ensure_ascii=False)
        
    print(f"Saved to {output_path}", flush=True)

if __name__ == "__main__":
    scrape_exhibitions()
