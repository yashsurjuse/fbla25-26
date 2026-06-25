import urllib.request
import json

req = urllib.request.Request(
    'https://www.metmuseum.org/hubs/research-at-the-met',
    headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
    }
)
try:
    with urllib.request.urlopen(req) as response:
        print(response.status)
        html = response.read().decode('utf-8')
        print(html[:500])
except Exception as e:
    print("Error:", e)
