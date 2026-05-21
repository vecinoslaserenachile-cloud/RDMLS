$Headers = @{
    "X-Auth-Email" = "Vecinoslaserenachile@gmail.com"
    "X-Auth-Key"   = "bb53aaa5c29acc38c183291529a1dd8937d18"
    "Content-Type" = "application/json"
}
$AccountId = "f106b65228e370b7be63060b3ac84dee"
$Project = "vecinos-la-serena"

# Getting deployments around May 9th
$Url = "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$Project/deployments"
$Res = Invoke-RestMethod -Uri $Url -Method Get -Headers $Headers

# Filter deployments from roughly May 5th to May 11th
$OldDeploys = $Res.result | Where-Object { [DateTime]$_.created_on -gt "2026-05-05" -and [DateTime]$_.created_on -lt "2026-05-11" }
$OldDeploys | Select-Object id, created_on, url | Format-Table -AutoSize
