$Token = "v1.0-e833abbdf6053b1522986170-7f5cafa7b405adfeabe6c9c771d84922bc822ee4d9f7de23121daa785b2718f34396ab2a940b0087b6cccae66bd73a8ce734da09c129999ba6baed8111136a798a5b92b4d1ba4e8587"
$Domain = "vecinoslaserena.cl"
$Target = "vecinos-la-serena.pages.dev"

$Headers = @{
    "Authorization" = "Bearer $Token"
    "Content-Type"  = "application/json"
}

Write-Host "Buscando zona para $Domain..."
$Zones = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones?name=$Domain" -Headers $Headers
if (-not $Zones.result) {
    Write-Error "No se encontró la zona o el token no tiene permisos."
    exit
}

$ZoneId = $Zones.result[0].id
Write-Host "Zona encontrada: $ZoneId"

Write-Host "Listando registros DNS..."
$Records = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records" -Headers $Headers

$Targets = $Records.result | Where-Object { $_.name -match "$Domain" }

foreach ($Rec in $Targets) {
    Write-Host "Actualizando $($Rec.name) ($($Rec.type)) -> $Target"
    $Body = @{
        type    = "CNAME"
        name    = $Rec.name
        content = $Target
        proxied = $true
    } | ConvertTo-Json

    try {
        $Update = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records/$($Rec.id)" -Method Put -Headers $Headers -Body $Body
        Write-Host "¡Éxito!"
    } catch {
        Write-Error "Fallo al actualizar $($Rec.name): $_"
    }
}

Write-Host "Todo listo. El cambio puede tardar unos minutos en propagarse."
