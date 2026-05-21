$Headers = @{
    "X-Auth-Email" = "Vecinoslaserenachile@gmail.com"
    "X-Auth-Key"   = "bb53aaa5c29acc38c183291529a1dd8937d18"
}
$Url = "https://api.cloudflare.com/client/v4/accounts/f106b65228e370b7be63060b3ac84dee/pages/projects/prendes-vls/deployments"
$Res = Invoke-RestMethod -Uri $Url -Method Get -Headers $Headers
$Res.result | Select-Object id, created_on, url | Format-Table -AutoSize
