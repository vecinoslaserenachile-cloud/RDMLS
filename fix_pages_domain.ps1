$Email = "Vecinoslaserenachile@gmail.com"
$Key = "bb53aaa5c29acc38c183291529a1dd8937d18"
$AccountId = "f106b65228e370b7be63060b3ac84dee"
$ProjectName = "vecinos-la-serena"
$Domains = @("radiovecinos.cl", "www.radiovecinos.cl")

$Headers = @{
    "X-Auth-Email" = $Email
    "X-Auth-Key"   = $Key
    "Content-Type"  = "application/json"
}

foreach ($Domain in $Domains) {
    try {
        $Body = @{ name = $Domain } | ConvertTo-Json
        $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$ProjectName/domains" -Method Post -Headers $Headers -Body $Body
        Write-Host "Exito agregando $Domain"
    } catch {
        Write-Host "Error agregando $Domain : $($_.Exception.Message)"
    }
}
