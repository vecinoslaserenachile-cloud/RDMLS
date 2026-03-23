import urllib.request
import re
import sys

urls = [
    "https://suno.com/s/S6AeAr52miWZDfmd",
    "https://suno.com/s/F6ZC27pVDECYaW8O",
    "https://suno.com/s/3yEusHKGaZots0EZ",
    "https://suno.com/s/p788vxPw7e21MA6K",
    "https://suno.com/s/WQPruejS9lClEIJk",
    "https://suno.com/s/HCD4RD1i9dpvP4zy",
    "https://suno.com/s/toGMYtiRx1eRaVbF",
    "https://suno.com/s/1eDvubdETPA2VKjz"
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        m = re.search(r'https://cdn1\.suno\.ai/[a-zA-Z0-9-]+\.mp3|https://cdn1\.suno\.ai/[a-zA-Z0-9-]+\.m4a', html)
        if m:
            print(f"{url} -> {m.group(0)}")
        else:
            # check if it prints the meta property for audio
            m_og = re.search(r'(https://cdn[0-9]*\.suno\.ai/[\w\.\-/]+)', html)
            if m_og:
                 print(f"{url} -> {m_og.group(1)}")
            else:
                 print(f"Not found for {url}")
    except Exception as e:
        print(f"Error for {url}: {e}")
