import json
import time
import os
from playwright.sync_api import sync_playwright

def main():
    os.makedirs("src/data/scraped", exist_ok=True)
    departments_data = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        print("Scraping departments list...")
        try:
            page.goto("https://www.metmuseum.org/about-the-met/collection-areas", wait_until="networkidle", timeout=30000)
            time.sleep(3)
        except Exception as e:
            print(f"Failed to load departments index: {e}")
            browser.close()
            return
            
        # Extract department links
        dept_links = page.evaluate('''() => {
            const anchors = Array.from(document.querySelectorAll('a[href*="/about-the-met/collection-areas/"]'));
            return Array.from(new Set(anchors.map(a => a.href))).filter(h => h !== "https://www.metmuseum.org/about-the-met/collection-areas");
        }''')
        
        print(f"Found {len(dept_links)} departments to scrape.")
        
        for url in dept_links:
            print(f"Scraping: {url}")
            try:
                page.goto(url, wait_until="networkidle", timeout=30000)
                time.sleep(1.5)
                
                dept = page.evaluate('''() => {
                    const titleEl = document.querySelector('h1');
                    const title = titleEl ? titleEl.innerText : 'Untitled';
                    
                    const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText.trim()).filter(t => t.length > 50);
                    const images = Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src.startsWith('http') && !src.includes('logo') && !src.includes('icon'));
                    
                    return {
                        title: title,
                        description: paragraphs.slice(0, 3).join('\\n\\n'),
                        image: images.length > 0 ? images[0] : null,
                        url: window.location.href
                    };
                }''')
                
                dept['id'] = url.split('/')[-1]
                departments_data.append(dept)
                
            except Exception as e:
                print(f"Failed to scrape {url}: {e}")
                
        with open("src/data/departments.json", "w", encoding="utf-8") as f:
            json.dump(departments_data, f, indent=2)
            
        browser.close()

if __name__ == "__main__":
    main()
