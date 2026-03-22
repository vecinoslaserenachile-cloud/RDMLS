$Email = "Vecinoslaserenachile@gmail.com"
$Key = "bb53aaa5c29acc38c183291529a1dd8937d18"
$Domain = "farito.cl"
$Target = "vecinos-la-serena.pages.dev"

$Headers = @{
    "X-Auth-Email" = $Email
    "X-Auth-Key"   = $Key
    "Content-Type"  = "application/json"
}

Write-Host "Buscando zona para $Domain..."
$Zones = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones?name=$Domain" -Headers $Headers
if (-not $Zones.result) {
    Write-Error "Fallo: No se pudo encontrar la zona con esa clave API."
    exit
}

$ZoneId = $Zones.result[0].id
Write-Host "Zona encontrada: $ZoneId"

Write-Host "Listando registros DNS..."
$Records = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records" -Headers $Headers

# Find records to update or create (CNAME @ and www)
$BodyAt = @{
    type    = "CNAME"
    name    = "@"
    content = $Target
    proxied = $true
} | ConvertTo-Json

# Attempt to update or create
try {
    $Existing = $Records.result | Where-Object { $_.name -eq "$Domain" -and $_.type -eq "CNAME"}
    if ($Existing) {
        Write-Host "Actualizando registro CNAME @ existente..."
        Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records/$($Existing.id)" -Method Put -Headers $Headers -Body $BodyAt
    } else {
        Write-Host "Creando nuevo registro CNAME @..."
        Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records" -Method Post -Headers $Headers -Body $BodyAt
    }
    Write-Host "¡Registro @ OK!"
} catch {
    Write-Error "Error en @: $_"
}

$BodyWww = @{
    type    = "CNAME"
    name    = "www"
    content = $Target
    proxied = $true
} | ConvertTo-Json

try {
    $ExistingWww = $Records.result | Where-Object { $_.name -eq "www.$Domain" -and $_.type -eq "CNAME" }
    if ($ExistingWww) {
        Write-Host "Actualizando registro CNAME www existente..."
        Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records/$($ExistingWww.id)" -Method Put -Headers $Headers -Body $BodyWww
    } else {
        Write-Host "Creando nuevo registro CNAME www..."
        Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records" -Method Post -Headers $Headers -Body $BodyWww
    }
    Write-Host "¡Registro www OK!"
} catch {
    Write-Error "Error en www: $_"
}

Write-Host "Limpieza final: Borrando posibles registros redundantes o conflictivos (Error 1000)..."
# Borrar otros registros que puedan interferir (A records)
$TooOld = $Records.result | Where-Object { ($_.name -eq "$Domain" -or $_.name -eq "www.$Domain") -and $_.type -eq "A" }
foreach ($Old in $TooOld) {
    Write-Host "Borrando registro A causante del Error 1000: $($Old.content)"
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records/$($Old.id)" -Method Delete -Headers $Headers
}

Write-Host "FIN. El dominio farito.cl ha sido reconectado al motor Pages exitosamente."
