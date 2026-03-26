
# =============================================================================
# RDMLS DEPLOY SCRIPT v1.0
# Portal Institucional Municipal - rdmls.cl
# =============================================================================
# Deploy dedicado para el proyecto rdmls en Cloudflare Pages.
# =============================================================================

$Email    = "Vecinoslaserenachile@gmail.com"
$Key      = "bb53aaa5c29acc38c183291529a1dd8937d18"
$ZoneId   = "165c0c9a9631b72cd8d314232bc2f1f1"   # <-- zona RDMLS (segundo zoneId del maestro)
$PagesUrl = "https://rdmls.cl/"
$ProjectName = "rdmls"    # nombre del proyecto en Cloudflare Pages

$Headers = @{
    "X-Auth-Email" = $Email
    "X-Auth-Key"   = $Key
    "Content-Type"  = "application/json"
}

Write-Host "`n[1/4] COMPILANDO PARA RDMLS.CL..." -ForegroundColor Cyan
npm.cmd run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "BUILD FALLIDO. Deploy cancelado."
    exit 1
}
Write-Host " OK: Build completado." -ForegroundColor Green

Write-Host "`n[2/4] SUBIENDO A CLOUDFLARE PAGES (proyecto: $ProjectName)..." -ForegroundColor Cyan
npx.cmd wrangler pages deploy dist --project-name $ProjectName --branch main
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Wrangler reportó un problema. Verifica en: https://dash.cloudflare.com/"
} else {
    Write-Host " OK: Deploy enviado a Cloudflare Pages." -ForegroundColor Green
}

Write-Host "`n[3/4] PURGANDO CACHE DE RDMLS.CL (zona: $ZoneId)..." -ForegroundColor Cyan
$Body = @{ purge_everything = $true } | ConvertTo-Json
try {
    $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/purge_cache" -Method Post -Headers $Headers -Body $Body
    if ($Response.success) {
        Write-Host " OK: Cache de rdmls.cl purgado globalmente." -ForegroundColor Green
    } else {
        Write-Warning "Purga respondio pero success=false. Verifica manualmente."
    }
} catch {
    Write-Warning "Fallo en purga de cache: $_"
}

Write-Host "`n[4/4] HEALTH CHECK DE RDMLS.CL..." -ForegroundColor Cyan
Start-Sleep -Seconds 8
try {
    $Check = Invoke-WebRequest -Uri $PagesUrl -UseBasicParsing -TimeoutSec 15
    if ($Check.StatusCode -eq 200) {
        Write-Host " PORTAL OPERATIVO: Status 200 OK en $PagesUrl" -ForegroundColor Green
    }
} catch {
    Write-Warning "El portal puede estar propagando DNS. Espera 2-5 minutos y recarga."
}

Write-Host "`n============================================================"
Write-Host "  RDMLS.CL DEPLOY COMPLETADO " -ForegroundColor Yellow -BackgroundColor DarkBlue
Write-Host "============================================================`n"
