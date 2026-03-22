$Email = "Vecinoslaserenachile@gmail.com"
$Key = "bb53aaa5c29acc38c183291529a1dd8937d18"
$ZoneId = "f0daa77e49659c39fe7fd3f9b4abab35"

$Headers = @{
    "X-Auth-Email" = $Email
    "X-Auth-Key"   = $Key
    "Content-Type"  = "application/json"
}

$Body = @{
    purge_everything = $true
} | ConvertTo-Json

Write-Host "Purgando TODO el caché de Cloudflare para la zona $ZoneId..."
try {
    $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/purge_cache" -Method Post -Headers $Headers -Body $Body
    if ($Response.success) {
        Write-Host "¡Éxito! El caché ha sido purgado globalmente."
    } else {
        Write-Error "Fallo en la purga: $($Response.errors[0].message)"
    }
} catch {
    Write-Error "Error de conexión: $_"
}
