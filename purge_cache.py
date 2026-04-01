import urllib.request
import json

ZONES = [
    "f0daa77e49659c39fe7fd3f9b4abab35",
    "165c0c9a9631b72cd8d314232bc2f1f1"
]

EMAIL = "Vecinoslaserenachile@gmail.com"
# Global API Key del VLS_MAESTRO.ps1
KEY = "bb53aaa5c29acc38c183291529a1dd8937d18"

data = json.dumps({"purge_everything": True}).encode("utf-8")

for zone_id in ZONES:
    url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache"
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "X-Auth-Email": EMAIL,
            "X-Auth-Key": KEY,
            "Content-Type": "application/json"
        },
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            if result.get("success"):
                print(f"[OK] Zona {zone_id} purgada exitosamente.")
            else:
                print(f"[ERROR] Zona {zone_id}: {result.get('errors')}")
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"[HTTP {e.code}] Zona {zone_id}: {body}")
    except Exception as e:
        print(f"[EXCEPTION] Zona {zone_id}: {e}")
