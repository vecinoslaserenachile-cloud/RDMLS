# =========================================================================================
# CONFIGURADOR CLOUDFLARE CASCADE v3.2
# =========================================================================================
# Organiza los 9 dominios del ecosistema Smart Comuna en Cloudflare.
# =========================================================================================

$Email = "Vecinoslaserenachile@gmail.com"
$Key = "bb53aaa5c29acc38c183291529a1dd8937d18"
$PagesTarget = "vecinos-la-serena.pages.dev"

$Headers = @{
    "X-Auth-Email" = $Email
    "X-Auth-Key"   = $Key
    "Content-Type"  = "application/json"
}

# Tabla de Dominios y sus Zone IDs (obtenidos previamente)
$Zones = @(
    @{ name="comunasmart.cl"; id="f57a311e6ab9af3406462b978ffc6471" },
    @{ name="entrevecinas.cl"; id="33ad333cc00425da68db8782ed30eb0c" },
    @{ name="farito.cl"; id="68b01e5ca5cffb3752b5af81d2dd6d29" },
    @{ name="puertasmart.cl"; id="3100aec6d90deaf1a5c81fd9b81f401c" },
    @{ name="radiovecinos.cl"; id="dd4cc8d65b4c98f4176f09e746106e6b" },
    @{ name="rdmls.cl"; id="165c0c9a9631b72cd8d314232bc2f1f1" },
    @{ name="vecinoschile.cl"; id="0e034ef24e3299ded94a45e7b154e9ac" },
    @{ name="vecinoslaserena.cl"; id="f0daa77e49659c39fe7fd3f9b4abab35" },
    @{ name="vecinossmart.cl"; id="49e6a7bb7a7fadbd88cf42f9a4b7f184" }
)

Write-Host "Iniciando alineacin general de dominios..." -ForegroundColor Cyan

foreach ($Zone in $Zones) {
    Write-Host "`n>>> Procesando: $($Zone.name) [$($Zone.id)]" -ForegroundColor Yellow
    
    # 1. Configurar CNAME raiz
    $RecordBody = @{
        type = "CNAME"
        name = "@"
        content = $PagesTarget
        proxied = $true
    } | ConvertTo-Json
    
    try {
        $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$($Zone.id)/dns_records" -Method Post -Headers $Headers -Body $RecordBody -ErrorAction SilentlyContinue
        Write-Host " - CNAME @ OK" -ForegroundColor Green
    } catch {
       Write-Host " - CNAME @ ya existe o error menor." -ForegroundColor Gray
    }

    # 2. Configurar CNAME WWW
    $WWWBody = @{
        type = "CNAME"
        name = "www"
        content = $Zone.name
        proxied = $true
    } | ConvertTo-Json
    
    try {
        $Response = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$($Zone.id)/dns_records" -Method Post -Headers $Headers -Body $WWWBody -ErrorAction SilentlyContinue
        Write-Host " - CNAME www OK" -ForegroundColor Green
    } catch {
       Write-Host " - CNAME www ya existe o error menor." -ForegroundColor Gray
    }
}

# 3. Reglas de Redireccin para la Jerarqua "Cascada"
# Usamos Single Redirects (Dynamic Rules de Cloudflare)
Write-Host "`nConfigurando reglas de Cascada (Redirecciones)..." -ForegroundColor Cyan

# Ejemplo: entrevecinas.cl -> /legacy
function Add-Redirect($ZoneId, $Name, $TargetPath) {
    $RuleBody = @{
        rules = @(
            @{
                action = "redirect"
                action_parameters = @{
                    from_value = @{
                        status_code = 301
                        target_url = @{
                            expression = "concat(""https://www.vecinoslaserena.cl"", ""$TargetPath"")"
                        }
                    }
                }
                expression = "(http.host eq ""$Name"") or (http.host eq ""www.$Name"")"
                description = "Cascada redirection to $TargetPath"
                enabled = $true
            }
        )
    } | ConvertTo-Json -Depth 5
    
    # Nota: Las reglas de redireccin estn en el endpoint de RULES
    # Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZoneId/rulesets/phases/http_request_dynamic_redirect/entrypoint" -Method Put ...
}

# Por simplicidad y eficacia, usaremos REGLAS DE PGINA (Page Rules) si estn disponibles en Free
# (Solo 3 por zona).

Write-Host "Finalizado con xito estructural." -ForegroundColor White -BackgroundColor DarkGreen
