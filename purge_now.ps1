$Headers = @{
    'X-Auth-Email' = 'Vecinoslaserenachile@gmail.com'
    'X-Auth-Key'   = 'bb53aaa5c29acc38c183291529a1dd8937d18'
    'Content-Type'  = 'application/json'
}
$Body = '{"purge_everything":true}'

Write-Host "[1/3] Purgando cache vecinoslaserena.cl..." -ForegroundColor Cyan
$r1 = Invoke-RestMethod -Uri 'https://api.cloudflare.com/client/v4/zones/f0daa77e49659c39fe7fd3f9b4abab35/purge_cache' -Method Post -Headers $Headers -Body $Body
Write-Host " -> VLS success: $($r1.success)" -ForegroundColor $(if($r1.success) {'Green'} else {'Red'})

Write-Host "[2/3] Purgando cache rdmls.cl..." -ForegroundColor Cyan
$r2 = Invoke-RestMethod -Uri 'https://api.cloudflare.com/client/v4/zones/165c0c9a9631b72cd8d314232bc2f1f1/purge_cache' -Method Post -Headers $Headers -Body $Body
Write-Host " -> RDMLS success: $($r2.success)" -ForegroundColor $(if($r2.success) {'Green'} else {'Red'})

Write-Host "[3/3] Esperando propagacion (8s)..." -ForegroundColor Cyan
Start-Sleep -Seconds 8
$Check = Invoke-WebRequest -Uri 'https://www.vecinoslaserena.cl/' -UseBasicParsing -TimeoutSec 10
Write-Host " -> Portal VLS HTTP: $($Check.StatusCode)" -ForegroundColor Green
Write-Host "PURGA Y HEALTH CHECK COMPLETADOS." -ForegroundColor Yellow
