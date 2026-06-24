import json
import time
import os
from playwright.sync_api import sync_playwright

ARTICLES_TO_SCRAPE = [
    {
        "url": "https://www.metmuseum.org/toah/hd/imml/hd_imml.htm",
        "slug": "impressionism"
    },
    {
        "url": "https://www.metmuseum.org/toah/hd/cube/hd_cube.htm",
        "slug": "cubism"
    },
    {
        "url": "https://www.metmuseum.org/toah/hd/popa/hd_popa.htm",
        "slug": "pop-art"
    },
    {
        "url": "https://www.metmuseum.org/toah/hd/roma/hd_roma.htm",
        "slug": "romanticism"
    },
    {
        "url": "https://www.metmuseum.org/toah/hd/edph/hd_edph.htm",
        "slug": "documentary-photography"
    },
    {
        "url": "https://www.metmuseum.org/toah/hd/mome/hd_mome.htm",
        "slug": "modern-metalwork"
    },
    {
        "url": "https://www.metmuseum.org/toah/hd/fauv/hd_fauv.htm",
        "slug": "fauvism"
    },
    {
        "url": "https://www.metmuseum.org/toah/hd/abex/hd_abex.htm",
        "slug": "abstract-expressionism"
    },
    {
        "url": "https://www.metmuseum.org/toah/hd/rems/hd_rems.htm",
        "slug": "rembrandt"
    },
    {
        "url": "https://www.metmuseum.org/toah/hd/mimo/hd_mimo.htm",
        "slug": "minimalism"
    }
]

def main():
    os.makedirs("src/data/scraped", exist_ok=True)
    articles_data = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 800}
        )
        page = context.new_page()
        
        for item in ARTICLES_TO_SCRAPE:
            url = item["url"]
            slug = item["slug"]
            print(f"Scraping article: {url}")
            try:
                page.goto(url, wait_until="networkidle", timeout=30000)
                time.sleep(2)
                
                article = page.evaluate('''() => {
                    const titleEl = document.querySelector('h1, .essay__title');
                    const title = titleEl ? titleEl.innerText : 'Untitled Article';
                    
                    const paragraphs = Array.from(document.querySelectorAll('p, .essay__text')).map(p => p.innerText.trim()).filter(t => t.length > 50);
                    
                    const images = Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src.startsWith('http') && !src.includes('logo') && !src.includes('icon') && !src.includes('footer'));
                    
                    return {
                        title: title,
                        content: paragraphs,
                        images: images
                    };
                }''')
                
                article['slug'] = slug
                articles_data.append(article)
                print(f"Scraped {slug}: {len(article['content'])} paragraphs, {len(article['images'])} images")
                
            except Exception as e:
                print(f"Failed to scrape {url}: {e}")
                
        with open("src/data/scraped/articles.json", "w", encoding="utf-8") as f:
            json.dump(articles_data, f, indent=2)
            
        browser.close()

if __name__ == "__main__":
    main()
