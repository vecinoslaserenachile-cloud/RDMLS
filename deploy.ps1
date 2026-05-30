# Deploy Radio Montecarlo 40 - Solo archivos ligeros
$env:CLOUDFLARE_API_TOKEN = "cfut_Tvd1O3i2fs4w5FdPOx7BsHOKbrBjtLeVAfHTpUuA78083fdd"
$env:CLOUDFLARE_ACCOUNT_ID = "f106b65228e370b7be63060b3ac84dee"

Write-Host "=== Desplegando a Cloudflare Pages ===" -ForegroundColor Cyan
& npx.cmd wrangler pages deploy web_radio_montecarlo --project-name radio-montecarlo-40 --branch main --commit-dirty=true 2>&1
Write-Host "=== Proceso terminado ===" -ForegroundColor Green
