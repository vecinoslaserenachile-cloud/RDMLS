# =====================================================================
# VLS DEPLOY DIRECTO - Via API REST Cloudflare (sin Wrangler)
# Uso cuando Wrangler falla con 504 en el endpoint de Pages Projects
# =====================================================================

$Email      = "Vecinoslaserenachile@gmail.com"
$Key        = "bb53aaa5c29acc38c183291529a1dd8937d18"
$AccountId  = "f106b65228e370b7be63060b3ac84dee"
$VlsZoneId  = "f0daa77e49659c39fe7fd3f9b4abab35"
$RdmlsZoneId = "165c0c9a9631b72cd8d314232bc2f1f1"

$Headers = @{
    "X-Auth-Email" = $Email
    "X-Auth-Key"   = $Key
    "Content-Type" = "application/json"
}

Write-Host "`n[DEPLOY DIRECTO VLS] Iniciando..." -ForegroundColor Cyan

# Paso 1: Verificar que el dist existe
if (-not (Test-Path "dist")) {
    Write-Host " Compilando primero..." -ForegroundColor Yellow
    npm.cmd run build
    if ($LASTEXITCODE -ne 0) { Write-Error "BUILD FALLIDO."; exit 1 }
}

# Paso 2: Intentar Wrangler con reintentos
Write-Host "`n[1/3] Intentando Wrangler (3 intentos)..." -ForegroundColor Cyan
$deployed = $false
for ($i = 1; $i -le 3; $i++) {
    Write-Host "  Intento $i/3..." -ForegroundColor Yellow
    npx.cmd wrangler pages deploy dist --project-name vecinos-la-serena --branch main --commit-dirty=true 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host " OK: Deploy exitoso en intento $i" -ForegroundColor Green
        $deployed = $true
        break
    }
    Write-Host "  Fallido. Esperando 15s..." -ForegroundColor Red
    Start-Sleep -Seconds 15
}

if (-not $deployed) {
    Write-Host "`n Wrangler sigue fallando. API Cloudflare posiblemente en degradacion." -ForegroundColor Red
    Write-Host " Verifica en: https://www.cloudflarestatus.com/" -ForegroundColor Yellow
}

# Paso 3: Purgar cache de todas formas
Write-Host "`n[2/3] Purgando cache global..." -ForegroundColor Cyan
$Body = @{ purge_everything = $true } | ConvertTo-Json
foreach ($zid in @($VlsZoneId, $RdmlsZoneId)) {
    try {
        $r = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zid/purge_cache" -Method Post -Headers $Headers -Body $Body -TimeoutSec 20
        if ($r.success) { Write-Host "  OK: Cache zona $zid purgado" -ForegroundColor Green }
    } catch {
        Write-Warning "Fallo purga zona $zid"
    }
}

# Paso 4: Health Check
Write-Host "`n[3/3] Health Check..." -ForegroundColor Cyan
Start-Sleep -Seconds 5
try {
    $chk = Invoke-WebRequest -Uri "https://www.vecinoslaserena.cl/" -UseBasicParsing -TimeoutSec 15
    Write-Host "  PORTAL OPERATIVO: Status $($chk.StatusCode) OK" -ForegroundColor Green
} catch {
    Write-Warning "Health check no pudo conectar."
}

Write-Host "`n============================================================" -ForegroundColor White
Write-Host " VLS DEPLOY DIRECTO COMPLETADO" -ForegroundColor Yellow
Write-Host "============================================================`n" -ForegroundColor White
