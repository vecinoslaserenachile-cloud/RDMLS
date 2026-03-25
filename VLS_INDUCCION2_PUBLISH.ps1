Write-Host "[1/3] Compilando..."
npx.cmd vite build -c vite.induccion2.config.js
Write-Host "[2/3] Desplegando..."
npx.cmd wrangler pages deploy dist_induccion2 --project-name rdmls-induccion2 --branch main --commit-dirty=true
Write-Host "[3/3] Finalizado."
