$Headers = @{
    "X-Auth-Email" = "Vecinoslaserenachile@gmail.com"
    "X-Auth-Key"   = "bb53aaa5c29acc38c183291529a1dd8937d18"
    "Content-Type" = "application/json"
}
try {
    $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/f106b65228e370b7be63060b3ac84dee/pages/projects/vecinos-la-serena/domains" -Method Post -Headers $Headers -Body '{"name":"radiovecinos.cl"}'
    Write-Host "Exito"
} catch {
    Write-Host $_.ErrorDetails.Message
}
