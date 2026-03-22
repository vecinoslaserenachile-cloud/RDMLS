# =========================================================================================
# VLS MAESTRO CONTROL v3.2 - PORTAL VECINOS LA SERENA (FULL EXTENDED)
# =========================================================================================
# Herramienta de despliegue, purga de caché y validación oficial.
# =========================================================================================

$Email = "Vecinoslaserenachile@gmail.com"
$Key = "bb53aaa5c29acc38c183291529a1dd8937d18"
$ZoneId = "f0daa77e49659c39fe7fd3f9b4abab35"
$PagesUrl = "https://www.vecinoslaserena.cl/"

$Headers = @{
    "X-Auth-Email" = $Email
    "X-Auth-Key"   = $Key
    "Content-Type"  = "application/json"
}

Write-Host "`n[1/4] VALIDANDO INTEGRIDAD DEL PORTAL..." -ForegroundColor Cyan
$CriticalFiles = @("src/pages/HubDashboard.jsx", "src/components/DeBonoThinkingHats.jsx", "index.html")
foreach ($File in $CriticalFiles) {
    if (Test-Path $File) {
        Write-Host " - OK: $File" -ForegroundColor Green
    } else {
        Write-Error "CRÍTICO: Faltan archivos esenciales. Despliegue CANCELADO." -ForegroundColor Red; exit
    }
}

Write-Host "`n[2/4] PREPARANDO DESPLIEGUE A CLOUDFLARE PAGES..." -ForegroundColor Cyan
Write-Host " (Recuerda que Cloudflare despliega automticamente al sincronizar con Git) " -ForegroundColor Yellow

Write-Host "`n[3/4] PURGANDO CACHÉ GLOBAL DE CLOUDFLARE (ANTI-ERRORES ROJOS)..." -ForegroundColor Cyan
$Body = @{ purge_everything = $true } | ConvertTo-Json
try {
    $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/purge_cache" -Method Post -Headers $Headers -Body $Body
    if ($Response.success) {
        Write-Host " ¡ÉXITO! Cach purgado globalmente. Los vecinos vern la versin v3.2 limpia." -ForegroundColor Green
    }
} catch {
    Write-Error "Fallo en purga: $_"
}

Write-Host "`n[4/4] VALIDANDO PORTAL VIVO (HEALTH CHECK)..." -ForegroundColor Cyan
Start-Sleep -Seconds 5
try {
    $Check = Invoke-WebRequest -Uri "$PagesUrl" -UseBasicParsing -TimeoutSec 10
    if ($Check.StatusCode -eq 200) {
        Write-Host " ¡PORTAL OPERATIVO! Status: 200 OK en $PagesUrl" -ForegroundColor Green
    }
} catch {
    Write-Warning "El portal podra estar propagando DNS o demorando en el boot inicial."
}

Write-Host "`n========================================================="
Write-Host " RESTAURACIN FULL EXTENDED (v3.2) COMPLETADA " -ForegroundColor Yellow -BackgroundColor Blue
Write-Host "=========================================================`n"
