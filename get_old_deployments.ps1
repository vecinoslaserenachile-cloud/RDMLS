$Headers = @{
    "X-Auth-Email" = "Vecinoslaserenachile@gmail.com"
    "X-Auth-Key"   = "bb53aaa5c29acc38c183291529a1dd8937d18"
    "Content-Type" = "application/json"
}
$AccountId = "f106b65228e370b7be63060b3ac84dee"
$Project = "vecinos-la-serena"

$Url = "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$Project/deployments?per_page=100"
$Res = Invoke-RestMethod -Uri $Url -Method Get -Headers $Headers

$Res.result | Select-Object id, created_on, environment, @{n='commit';e={$_.deployment_trigger.metadata.commit_hash}}, @{n='message';e={$_.deployment_trigger.metadata.commit_message}} | Format-Table -AutoSize
