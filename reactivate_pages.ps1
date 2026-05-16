$Headers = @{
    "X-Auth-Email" = "Vecinoslaserenachile@gmail.com"
    "X-Auth-Key"   = "bb53aaa5c29acc38c183291529a1dd8937d18"
    "Content-Type" = "application/json"
}
$AccountId = "f106b65228e370b7be63060b3ac84dee"
$Project = "vecinos-la-serena"

$Domains = @("radiovecinos.cl", "www.radiovecinos.cl")

foreach ($Dom in $Domains) {
    Write-Host "Borrando $Dom..."
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$Project/domains/$Dom" -Method Delete -Headers $Headers -ErrorAction SilentlyContinue
    
    Write-Host "Agregando $Dom..."
    $Body = @{ name = $Dom } | ConvertTo-Json
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$Project/domains" -Method Post -Headers $Headers -Body $Body -ErrorAction SilentlyContinue
}
Write-Host "Proceso completo."
