$h = @{
    "X-Auth-Email" = "Vecinoslaserenachile@gmail.com"
    "X-Auth-Key"   = "bb53aaa5c29acc38c183291529a1dd8937d18"
    "Content-Type" = "application/json"
}
$b = '{"purge_everything":true}'

foreach ($zid in @("f0daa77e49659c39fe7fd3f9b4abab35", "165c0c9a9631b72cd8d314232bc2f1f1")) {
    try {
        $r = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zid/purge_cache" -Method Post -Headers $h -Body $b
        if ($r.success) { Write-Host "OK: Cache zona $zid purgado" -ForegroundColor Green }
        else { Write-Warning "Fallo zona $zid" }
    } catch {
        Write-Warning "Error zona $zid : $_"
    }
}
Write-Host "Cache purge completado." -ForegroundColor Cyan
