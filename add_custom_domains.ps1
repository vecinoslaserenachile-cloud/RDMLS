$Email = "Vecinoslaserenachile@gmail.com"
$Key = "bb53aaa5c29acc38c183291529a1dd8937d18"
$AccountId = "f106b65228e370b7be63060b3ac84dee"
$ProjectName = "vecinos-la-serena"
$Domains = @("vecinoslaserena.cl", "www.vecinoslaserena.cl", "vecinosmart.cl", "www.vecinosmart.cl")

$Headers = @{
    "X-Auth-Email" = $Email
    "X-Auth-Key"   = $Key
    "Content-Type"  = "application/json"
}

Write-Host "Iniciando autorizacin de dominios personalizados en proyecto '${ProjectName}'..."

foreach ($Domain in $Domains) {
    try {
        $Body = @{
            name = $Domain
        } | ConvertTo-Json
        
        Write-Host "Aadiendo ${Domain}..."
        $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$AccountId/pages/projects/$ProjectName/domains" -Method Post -Headers $Headers -Body $Body
        if ($Response.success) {
            Write-Host "¡Éxito! ${Domain} aadido y autorizado."
        } else {
            Write-Error "Fallo en ${Domain}"
        }
    } catch {
        # Si ya existe, ignoramos el error
        if ($_.Exception.Message -match "409") {
            Write-Host "¡Aviso! ${Domain} ya estaba registrado en Pages."
        } else {
            Write-Error "Error de conexin en ${Domain}"
        }
    }
}

Write-Host "AUTORIZACIN COMPLETADA. Por favor, realiza una recarga forzada (Ctrl+F5) en el portal en 5 minutos."
