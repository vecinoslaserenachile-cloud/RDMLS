import requests
import json
import csv
from datetime import datetime, timedelta

# Cloudflare Config
EMAIL = "Vecinoslaserenachile@gmail.com"
KEY = "bb53aaa5c29acc38c183291529a1dd8937d18"
ZONE_ID = "165c0c9a9631b72cd8d314232bc2f1f1"

headers = {
    "X-Auth-Email": EMAIL,
    "X-Auth-Key": KEY,
    "Content-Type": "application/json"
}

def fetch_cloudflare_metrics():
    # Last 90 days
    date_end = datetime.now()
    date_start = date_end - timedelta(days=90)
    
    # GraphQL Query
    query = """
    query {
      viewer {
        zones(filter: {zoneTag: "%s"}) {
          httpRequests1dGroups(
            limit: 90,
            filter: {date_geq: "%s"},
            orderBy: [date_ASC]
          ) {
            dimensions {
              date
            }
            sum {
              requests
              pageViews
              bytes
            }
            uniq {
              uniques
            }
          }
        }
      }
    }
    """ % (ZONE_ID, date_start.strftime("%Y-%m-%d"))

    url = "https://api.cloudflare.com/client/v4/graphql"
    response = requests.post(url, headers=headers, json={'query': query})
    
    if response.status_code == 200:
        data = response.json()
        return data['data']['viewer']['zones'][0]['httpRequests1dGroups']
    else:
        print(f"Error fetching Cloudflare metrics: {response.status_code}")
        print(response.text)
        return []

def save_to_csv(data):
    filename = "scratch/rdmls_metrics_90d.csv"
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Date", "Requests", "PageViews", "Bytes", "Uniques"])
        for day in data:
            writer.writerow([
                day['dimensions']['date'],
                day['sum']['requests'],
                day['sum']['pageViews'],
                day['sum']['bytes'],
                day['uniq']['uniques']
            ])
    return filename

def generate_report_summary(data):
    total_uniques = sum(day['uniq']['uniques'] for day in data)
    total_pageviews = sum(day['sum']['pageViews'] for day in data)
    
    summary = f"""# REPORT DE ANALÍTICAS RDMLS (90 DÍAS)
Generado el: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

## Resumen Ejecutivo
- **Periodo:** Últimos 90 días
- **Total Visitantes Únicos:** {total_uniques}
- **Total Visualizaciones de Página:** {total_pageviews}
- **Promedio de Tráfico Diario:** {total_pageviews // 90 if data else 0} views/día

## Detalle por Día (Muestra)
| Fecha | Únicos | Page Views |
|-------|--------|------------|
"""
    for day in data[-10:]: # Show last 10 days
        summary += f"| {day['dimensions']['date']} | {day['uniq']['uniques']} | {day['sum']['pageViews']} |\n"
        
    summary += "\n*Este reporte ha sido extraído y blindado para auditoría institucional.*"
    
    with open("scratch/rdmls_metrics_report.md", "w", encoding="utf-8") as f:
        f.write(summary)
    return "scratch/rdmls_metrics_report.md"

if __name__ == "__main__":
    print("Iniciando extracción de métricas...")
    metrics_data = fetch_cloudflare_metrics()
    if metrics_data:
        csv_file = save_to_csv(metrics_data)
        md_file = generate_report_summary(metrics_data)
        print(f"Éxito: Métricas guardadas en {csv_file} y {md_file}")
    else:
        print("No se pudieron obtener métricas reales. Verificando API Key o Permisos.")
