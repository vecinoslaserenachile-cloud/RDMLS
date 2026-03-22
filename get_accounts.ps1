$Email = "Vecinoslaserenachile@gmail.com"
$Key = "bb53aaa5c29acc38c183291529a1dd8937d18"

$Headers = @{
    "X-Auth-Email" = $Email
    "X-Auth-Key"   = $Key
    "Content-Type"  = "application/json"
}

Write-Host "Recuperando ID de cuenta de Cloudflare..."
try {
    $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts" -Method Get -Headers $Headers
    if ($Response.success) {
        $Response.result | Select-Object id, name | Format-Table -AutoSize
    } else {
        Write-Error "Fallo: $($Response.errors[0].message)"
    }
} catch {
    Write-Error "Error: $_"
}
