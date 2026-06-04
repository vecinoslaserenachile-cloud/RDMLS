
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

$env:CLOUDFLARE_API_TOKEN="cfut_77iJjU8iL9OeSVwKUIsHYTSMWsxQUbZiCPTuXTbY639ca9d4"
$env:CLOUDFLARE_ACCOUNT_ID="f106b65228e370b7be63060b3ac84dee"
$env:NODE_OPTIONS="--dns-result-order=ipv4first"

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
$deployed = $false
for ($i = 1; $i -le 3; $i++) {
    Write-Host "  Intento $i/3..." -ForegroundColor Yellow
    npx.cmd wrangler@latest pages deploy dist --project-name $ProjectName --branch main --commit-dirty=true 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host " OK: Deploy exitoso en intento $i" -ForegroundColor Green
        $deployed = $true
        break
    }
    Write-Host "  Fallido. Esperando 15s antes de reintentar..." -ForegroundColor Red
    Start-Sleep -Seconds 15
}

if (-not $deployed) {
    Write-Error "Wrangler falló permanentemente tras 3 intentos. Revisa tu conexión de red o el estado de Cloudflare."
    exit 1
}

Write-Host "`n[3/4] PURGANDO CACHE DE RDMLS.CL (zona: $ZoneId)..." -ForegroundColor Cyan
$Body = @{ purge_everything = $true } | ConvertTo-Json
$purged = $false
for ($j = 1; $j -le 3; $j++) {
    try {
        $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/purge_cache" -Method Post -Headers $Headers -Body $Body -TimeoutSec 30
        if ($Response.success) {
            Write-Host " OK: Cache de rdmls.cl purgado globalmente." -ForegroundColor Green
            $purged = $true
            break
        } else {
            Write-Warning "Purga respondió pero success=false. Intento $j/3..."
        }
    } catch {
        Write-Warning "Fallo de red en purga de cache (Intento $j/3): $_"
        Start-Sleep -Seconds 5
    }
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
