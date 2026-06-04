$srcDir = "C:\Users\estud\APP_LS_SEGURA\entrevecinas.cltano Sin logo\PDFs sin marcas tano"
$destDir = "C:\Users\estud\APP_LS_SEGURA\public\media\tano"

$fileMap = @{
    "ev_Bella Ciao.pdf" = "Bella Ciao.pdf"
    "ev_Infografia Ristorante.png" = "Infografia Ristorante.png"
    "ev_Infografía Lezione 4.png" = "Infografía Lezione 4.png"
    "ev_Infografía.png" = "Infografía.png"
    "ev_Introducción_al_Italiano.pdf" = "Introducción_al_Italiano.pdf"
    "ev_Italian_Urban_Blueprint.pdf" = "Italian_Urban_Blueprint.pdf"
    "ev_Italy_to_the_Stars.pdf" = "Italy_to_the_Stars.pdf"
    "ev_L'italiano.pdf" = "L'italiano.pdf"
    "ev_La Differenza Tra Me e Te.pdf" = "La Differenza Tra Me e Te.pdf"
    "ev_Leccion_3_Inclusiva_Pictografica.pdf" = "Leccion_3_Inclusiva_Pictografica.pdf"
    "ev_Lezione 2.pdf" = "Lezione 2.pdf"
    "ev_Più Bella Cosa.pdf" = "Più Bella Cosa.pdf"
    "ev_Torna a casa.pdf" = "Torna a casa.pdf"
    "ev_Vivere la Vita.pdf" = "Vivere la Vita.pdf"
}

foreach ($key in $fileMap.Keys) {
    $srcFile = Join-Path $srcDir $key
    $destFile = Join-Path $destDir $fileMap[$key]
    
    if (Test-Path $srcFile) {
        Write-Host "Copying $key to $($fileMap[$key])"
        Copy-Item -Path $srcFile -Destination $destFile -Force
    } else {
        Write-Host "File not found: $srcFile"
    }
}
Write-Host "Building project..."
npm run build
Write-Host "Deploying project..."
.\deploy_vls_real.ps1
