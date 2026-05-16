$Headers = @{
    "X-Auth-Email" = "Vecinoslaserenachile@gmail.com"
    "X-Auth-Key"   = "bb53aaa5c29acc38c183291529a1dd8937d18"
    "Content-Type" = "application/json"
}
try {
    $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/f106b65228e370b7be63060b3ac84dee/pages/projects/vecinos-la-serena/domains" -Method Get -Headers $Headers
    $Response.result | Select-Object name, status | Format-Table -AutoSize
} catch {
    Write-Host $_.Exception.Message
}
