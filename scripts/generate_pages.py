import json
import os

def create_page(url_key, title, content_data, out_path, is_mock=False):
    paragraphs = content_data.get('paragraphs', [])
    images = content_data.get('images', [])
    
    # Filter out empty or irrelevant text
    cleaned = []
    for p in paragraphs:
        text = p['text'].replace('"', '&quot;').replace("'", "&apos;").replace("<", "&lt;").replace(">", "&gt;")
        if text.lower() in ["skip to main content", "menu", "search", "tickets", "the met", "listen"]:
            continue
        if "©" in text or "Image credit" in text or "All rights reserved" in text:
            continue
        cleaned.append((p['tag'], text))
        
    jsx_body = []
    img_idx = 0
    
    in_accordion = False
    
    for tag, text in cleaned:
        is_question = (tag in ['h2', 'h3', 'strong', 'b'] and text.endswith('?')) or text.endswith('?')
        
        if is_question:
            if in_accordion:
                jsx_body.append('        </Accordion>')
            jsx_body.append(f'        <Accordion title="{text}">')
            in_accordion = True
        elif tag == 'h1':
            pass
        elif tag in ['h2', 'h3']:
            if in_accordion:
                jsx_body.append('        </Accordion>')
                in_accordion = False
            jsx_body.append(f'        <h2 className="text-3xl font-display font-semibold mt-16 mb-6 text-black">{text}</h2>')
        elif tag == 'li':
            if in_accordion:
                jsx_body.append(f'          <ul className="list-disc pl-6 mb-4"><li>{text}</li></ul>')
            else:
                jsx_body.append(f'        <ul className="list-disc pl-6 mb-4"><li>{text}</li></ul>')
        else:
            if in_accordion:
                jsx_body.append(f'          <p className="mb-6">{text}</p>')
            else:
                jsx_body.append(f'        <p className="mb-6 leading-relaxed text-black/80">{text}</p>')
            
            # Add an image roughly after long paragraphs if outside accordion
            if len(text) > 150 and not in_accordion and img_idx < len(images):
                img_url = images[img_idx]
                if "logo" not in img_url.lower() and "icon" not in img_url.lower():
                    jsx_body.append(f'        <div className="my-12 rounded-2xl overflow-hidden shadow-xl border border-black/10">')
                    jsx_body.append(f'          <img src="{img_url}" alt="Section imagery" className="w-full h-auto object-cover max-h-[600px]" />')
                    jsx_body.append(f'        </div>')
                    img_idx += 1
                else:
                    img_idx += 1 # skip logo
                    
    if in_accordion:
        jsx_body.append('        </Accordion>')
                    
    body_str = "\n".join(jsx_body)
    
    hero_image = ""
    if images:
        hero_image = f'''
      <div className="relative w-full h-[50vh] min-h-[400px] mb-16 rounded-3xl overflow-hidden shadow-2xl border border-black/5">
        <img src="{images[0]}" alt="{title} Hero" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
            <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl shadow-black/50 drop-shadow-md">
              {title}
            </h1>
        </div>
      </div>
    '''
    else:
        hero_image = f'''
      <h1 className="mb-12 font-display text-5xl font-bold tracking-tight text-black sm:text-7xl">
        {title}
      </h1>
        '''

    mock_disclaimer = ""
    if is_mock:
        mock_disclaimer = '''
      <div className="mt-24 border-t border-black/10 pt-8 text-sm text-black/50 italic text-center">
        Disclaimer: This is a mock Terms and Conditions page created for the FBLA Exploring Website Design competition. The Metropolitan Museum of Art name and details are used for FBLA purposes only, and not for any monetary gain or publicity.
      </div>
    '''

    tsx = f'''import {{ Metadata }} from "next";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {{
  title: "{title} | The Met",
  description: "{title}",
}};

export default function Page() {{
  return (
    <div className="bg-[#f3f4f4] min-h-screen pb-24">
      <div className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 lg:px-10">
        {hero_image}
        <div className="prose prose-lg prose-black max-w-none mx-auto bg-white p-8 sm:p-12 md:p-16 rounded-3xl shadow-sm border border-black/5">
    {body_str}
        </div>
        {mock_disclaimer}
      </div>
    </div>
  );
}}
'''
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(tsx)

def main():
    with open("src/data/scraped/met_data.json", "r", encoding="utf-8") as f:
        data = json.load(f)
        
    pages_to_generate = [
        ("about", "About The Met", "src/app/about/page.tsx", False),
        ("history", "Mission and History", "src/app/mission/page.tsx", False),
        ("conservation", "Conservation", "src/app/conservation/page.tsx", False),
        ("accessibility", "Accessibility", "src/app/accessibility/page.tsx", False),
        ("press", "Press", "src/app/press/page.tsx", False),
        ("contact", "Contact Us", "src/app/contact/page.tsx", False),
        ("careers", "Careers", "src/app/careers/page.tsx", False),
        ("terms", "Terms and Conditions", "src/app/terms/page.tsx", True),
        ("privacy", "Privacy Policy", "src/app/privacy/page.tsx", False),
    ]
    
    for key, title, out_path, is_mock in pages_to_generate:
        if key in data and 'error' not in data[key]:
            print(f"Generating {out_path}...")
            create_page(key, title, data[key], out_path, is_mock)

if __name__ == "__main__":
    main()
