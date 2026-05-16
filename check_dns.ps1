$Headers = @{
    "X-Auth-Email" = "Vecinoslaserenachile@gmail.com"
    "X-Auth-Key"   = "bb53aaa5c29acc38c183291529a1dd8937d18"
    "Content-Type" = "application/json"
}
$ZoneId = "dd4cc8d65b4c98f4176f09e746106e6b"
try {
    $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records" -Method Get -Headers $Headers
    $Response.result | Select-Object name, type, content, proxied | Format-Table -AutoSize
} catch {
    Write-Error $_.Exception.Message
}
