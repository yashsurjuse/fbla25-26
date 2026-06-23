import os
import json
import time
from playwright.sync_api import sync_playwright
from playwright_stealth import Stealth

def get_wiki_summary(title):
    try:
        import requests
        search_url = "https://en.wikipedia.org/w/api.php"
        search_params = {"action": "query", "list": "search", "srsearch": title, "format": "json", "utf8": 1}
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

def scrape_current_future():
    output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'data', 'exhibitions_master.json')
    
    # Load existing to append to
    if os.path.exists(output_path):
        with open(output_path, 'r', encoding='utf-8') as f:
            all_exhibitions = json.load(f)
    else:
        all_exhibitions = []
        
    # Set all existing to "past"
    for ex in all_exhibitions:
        ex['status'] = 'past'

    new_exhibitions = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, channel="chrome")
        context = browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            viewport={'width': 1920, 'height': 1080}
        )

        targets = [
            {"url": "https://www.metmuseum.org/exhibitions", "status": "current"},
            {"url": "https://www.metmuseum.org/exhibitions/upcoming", "status": "future"}
        ]
        
        for target in targets:
            print(f"Scraping {target['status']}...", flush=True)
            page = context.new_page()
            Stealth().apply_stealth_sync(page)
            
            try:
                page.goto(target["url"], wait_until="domcontentloaded", timeout=60000)
                page.wait_for_timeout(2000)
                
                cards_data = page.evaluate('''() => {
                    return Array.from(document.querySelectorAll('article, .card')).map(article => {
                        const titleEl = article.querySelector('[role="heading"] a') || article.querySelector('h2') || article.querySelector('h3') || article.querySelector('.card__title');
                        const imgEl = article.querySelector('img');
                        
                        let dates = null;
                        const metaEl = article.querySelector('[class*="meta"], .card__subtitle, .card__date');
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
                
                print(f"Found {len(cards_data)} potential cards.", flush=True)
                
                unique_titles = set()
                for item in cards_data:
                    title = item['title'].strip()
                    if not title or len(title) < 3 or title in unique_titles:
                        continue
                    
                    unique_titles.add(title)
                    description = get_wiki_summary(title) or f"An exclusive art exhibition titled '{title}' hosted at the Metropolitan Museum of Art, featuring incredible pieces."
                    
                    new_exhibitions.append({
                        "title": title,
                        "dates": item['dates'],
                        "image_url": item['image_url'],
                        "description": description,
                        "status": target["status"]
                    })
                    
            except Exception as e:
                print(f"Error scraping {target['status']}: {e}", flush=True)

        browser.close()

    # Prepend the new exhibitions so they show up first
    all_exhibitions = new_exhibitions + all_exhibitions
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_exhibitions, f, indent=2, ensure_ascii=False)
        
    print(f"Added {len(new_exhibitions)} new current/future exhibitions.", flush=True)

if __name__ == "__main__":
    scrape_current_future()
