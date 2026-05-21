$Headers = @{
    "X-Auth-Email" = "Vecinoslaserenachile@gmail.com"
    "X-Auth-Key"   = "bb53aaa5c29acc38c183291529a1dd8937d18"
    "Content-Type" = "application/json"
}
$AccountId = "f106b65228e370b7be63060b3ac84dee"
$Project = "vecinos-la-serena"

$Domains = @(
    "vecinosmart.cl", "www.vecinosmart.cl",
    "rdmls.cl", "www.rdmls.cl",
    "vecinoslaserena.cl", "www.vecinoslaserena.cl",
    "entrevecinas.cl", "www.entrevecinas.cl"
)

foreach ($Dom in $Domains) {
    Write-Host "Reactivando $Dom..."
    # Primero intentamos borrar por si acaso está en un estado inconsistente
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$Project/domains/$Dom" -Method Delete -Headers $Headers -ErrorAction SilentlyContinue
    
    # Luego agregamos
    $Body = @{ name = $Dom } | ConvertTo-Json
    $Res = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$Project/domains" -Method Post -Headers $Headers -Body $Body -ErrorAction SilentlyContinue
    if ($Res.success) {
        Write-Host " - ${Dom} reactivado con éxito." -ForegroundColor Green
    } else {
        Write-Host " - Error al reactivar ${Dom}" -ForegroundColor Red
    }
}
Write-Host "Proceso de reactivación completo."
