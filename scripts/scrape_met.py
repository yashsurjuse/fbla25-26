import json
import time
import os
from playwright.sync_api import sync_playwright

URLS = {
    "about": "https://www.metmuseum.org/about-the-met",
    "history": "https://www.metmuseum.org/about-the-met/history",
    "conservation": "https://www.metmuseum.org/about-the-met/conservation-and-scientific-research",
    "accessibility": "https://www.metmuseum.org/visit-guides/accessibility",
    "press": "https://www.metmuseum.org/press",
    "contact": "https://www.metmuseum.org/about-the-met/contact-us",
    "careers": "https://www.metmuseum.org/opportunities/careers",
    "terms": "https://www.metmuseum.org/policies/terms-and-conditions",
    "privacy": "https://www.metmuseum.org/policies/privacy-policy",
    "research": "https://www.metmuseum.org/research"
}

output_data = {}

def scrape_page(page, url_key, url):
    print(f"Scraping {url_key}...")
    try:
        page.goto(url, wait_until="networkidle", timeout=30000)
        
        # Simple extraction strategy: get text from main body.
        # The Met typically uses <main> or some main content container
        # Let's extract headings and paragraphs to reconstruct later
        
        # Wait a bit just in case
        time.sleep(2)
        
        # Remove header and footer from evaluation if possible, or just extract everything inside <main>
        content_data = page.evaluate('''() => {
            const main = document.querySelector('main') || document.body;
            
            // Extract text nodes
            const paragraphs = Array.from(main.querySelectorAll('p, h1, h2, h3, li')).map(el => {
                return { tag: el.tagName.toLowerCase(), text: el.innerText.trim() }
            }).filter(item => item.text.length > 0);
            
            // Extract some hero or main images
            const images = Array.from(main.querySelectorAll('img')).map(img => img.src).filter(src => src && src.startsWith('http'));
            
            return {
                paragraphs: paragraphs,
                images: images
            };
        }''')
        
        output_data[url_key] = content_data
        print(f"Scraped {len(content_data['paragraphs'])} text elements and {len(content_data['images'])} images for {url_key}")
    except Exception as e:
        print(f"Failed to scrape {url_key}: {e}")
        output_data[url_key] = {"error": str(e)}

def main():
    os.makedirs("src/data/scraped", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 800}
        )
        page = context.new_page()
        
        for key, url in URLS.items():
            scrape_page(page, key, url)
            
        with open("src/data/scraped/met_data.json", "w", encoding="utf-8") as f:
            json.dump(output_data, f, indent=2)
            
        browser.close()

if __name__ == "__main__":
    main()
