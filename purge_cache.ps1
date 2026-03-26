$Email = "Vecinoslaserenachile@gmail.com"
$Key = "bb53aaa5c29acc38c183291529a1dd8937d18"
$Zones = @("f0daa77e49659c39fe7fd3f9b4abab35", "165c0c9a9631b72cd8d314232bc2f1f1") # VLS and RDMLS

$Headers = @{
    "X-Auth-Email" = $Email
    "X-Auth-Key"   = $Key
    "Content-Type"  = "application/json"
}

$Body = @{
    purge_everything = $true
} | ConvertTo-Json

foreach ($ZoneId in $Zones) {
    Write-Host "Purgando TODO el caché de Cloudflare para la zona $ZoneId..." -ForegroundColor Cyan
    try {
        $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/purge_cache" -Method Post -Headers $Headers -Body $Body
        if ($Response.success) {
            Write-Host "¡Éxito! El caché de la zona $ZoneId ha sido purgado." -ForegroundColor Green
        } else {
            Write-Error "Fallo en la purga: $($Response.errors[0].message)"
        }
    } catch {
        Write-Error "Error de conexión en zona ${ZoneId} - Error: $_"
    }
}
