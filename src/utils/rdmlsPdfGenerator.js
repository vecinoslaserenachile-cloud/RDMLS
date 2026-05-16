/**
 * Generador de Expediente Consolidado RDMLS (PDF via Print)
 * Este módulo agrupa la documentación técnica original y el informe de desarrollo 2026-2027.
 * Incluye diagramas reales de la ruta de migración y soberanía digital.
 */

export const generateRDMLSPDF = (opcionesData, migraData) => {
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
        alert("El bloqueador de ventanas emergentes impidió abrir el PDF. Por favor, permita ventanas emergentes para este sitio.");
        return;
    }
    
    // Convertir datos a HTML
    const renderFeatures = (features) => features.map(f => `
        <div class="card">
            <div class="card-header" style="color: ${f.color}">${f.label}</div>
            <div class="card-subtitle">${f.subtitle}</div>
            <ul>
                ${f.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');

    const renderTechStack = (stack) => stack.map(s => `
        <div class="tech-item">
            <strong>${s.label}:</strong> ${s.desc}
        </div>
    `).join('');

    const renderLegal = (legal) => legal.map(l => `
        <div class="legal-item">
            <div class="legal-num">${l.num}</div>
            <strong>${l.title}:</strong> ${l.desc}
        </div>
    `).join('');

    const renderRoadmap = (phases) => phases.map(p => `
        <div class="roadmap-phase">
            <div class="phase-header">
                <span>${p.fase}</span>
                <strong>${p.label}</strong>
                <span class="status" style="color: ${p.color}">${p.status}</span>
            </div>
            <ul>
                ${p.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');

    const renderBenchmark = (benchmark) => `
        <table class="benchmark-table">
            <thead>
                <tr>
                    <th>PROVEEDOR</th>
                    <th>TECNOLOGÍA</th>
                    <th>UPTIME</th>
                    <th>LATENCIA</th>
                    <th>COSTO</th>
                    <th>CALIFICACIÓN</th>
                </tr>
            </thead>
            <tbody>
                ${benchmark.map(row => `
                    <tr>
                        <td>${row.provider}</td>
                        <td>${row.tech}</td>
                        <td>${row.uptime}</td>
                        <td>${row.latency}</td>
                        <td>${row.cost}</td>
                        <td>${row.rating}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    printWindow.document.write(`
        <html>
            <head>
                <title>Expediente Consolidado RDMLS 2026-2027</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&display=swap');
                    body { font-family: 'Outfit', sans-serif; padding: 50px; color: #1e293b; line-height: 1.6; }
                    .header { border-bottom: 5px solid #f97316; padding-bottom: 20px; margin-bottom: 40px; display: flex; align-items: center; justify-content: space-between; }
                    .logo-section { display: flex; align-items: center; gap: 20px; }
                    .header h1 { margin: 0; color: #f97316; font-size: 28px; font-weight: 900; }
                    .header p { margin: 5px 0 0; color: #64748b; font-size: 14px; letter-spacing: 2px; }
                    
                    h2 { color: #f97316; border-left: 5px solid #f97316; padding-left: 15px; margin: 40px 0 20px; text-transform: uppercase; font-size: 18px; }
                    h3 { color: #334155; margin: 30px 0 15px; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
                    
                    .section-break { page-break-before: always; }
                    
                    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 15px; }
                    .card-header { font-weight: 900; font-size: 14px; margin-bottom: 5px; }
                    .card-subtitle { font-weight: 700; font-size: 16px; color: #1e293b; margin-bottom: 10px; }
                    
                    ul { padding-left: 20px; }
                    li { margin-bottom: 5px; font-size: 13px; }
                    
                    .tech-item, .legal-item { margin-bottom: 15px; font-size: 13px; }
                    .legal-num { display: inline-block; background: #fef3c7; color: #f59e0b; padding: 2px 8px; border-radius: 4px; font-weight: 900; font-size: 11px; margin-right: 10px; }
                    
                    .roadmap-phase { border-left: 2px solid #f97316; padding-left: 20px; margin-bottom: 25px; }
                    .phase-header { display: flex; align-items: center; gap: 15px; margin-bottom: 10px; }
                    .phase-header span { font-size: 11px; font-weight: 900; color: #f97316; }
                    .phase-header .status { font-size: 11px; font-weight: 700; margin-left: auto; }
                    
                    .benchmark-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 12px; }
                    .benchmark-table th { background: #f1f5f9; text-align: left; padding: 12px; border-bottom: 2px solid #cbd5e1; }
                    .benchmark-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; }
                    
                    .migra-hero { background: #eff6ff; border: 2px solid #3b82f6; border-radius: 20px; padding: 30px; text-align: center; margin-bottom: 30px; }
                    .migra-hero h2 { border: none; padding: 0; color: #3b82f6; margin-top: 0; }
                    
                    .illustration-box { border-radius: 24px; overflow: hidden; margin: 30px 0; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; flex-direction: column; }
                    .illustration-box img { width: 100%; height: auto; display: block; }
                    .illustration-caption { padding: 15px; background: #f8fafc; font-size: 11px; color: #64748b; font-style: italic; text-align: center; border-top: 1px solid #eee; }
                    
                    .stage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
                    .stage-card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 15px; background: #fff; }
                    .stage-card img { width: 100%; border-radius: 8px; margin-bottom: 10px; }
                    .stage-card h4 { margin: 0 0 10px; color: #1e3a8a; font-size: 14px; text-transform: uppercase; }
                    
                    .footer { margin-top: 60px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #eee; padding-top: 20px; }
                    
                    @media print {
                        body { padding: 20px; }
                        .no-print { display: none; }
                        .section-break { page-break-before: always; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo-section">
                        <img src="/rdmls_pwa_icon.png" style="height: 60px;" />
                        <div>
                            <h1>RED DIGITAL LA SERENA</h1>
                            <p>EXPEDIENTE TÉCNICO E INSTITUCIONAL CONSOLIDADO 2026-2027</p>
                        </div>
                    </div>
                    <div style="text-align: right; font-size: 10px; color: #64748b;">
                        FECHA: ${new Date().toLocaleDateString('es-CL')}<br/>
                        ESTADO: CONFIDENCIAL / MUNICIPAL
                    </div>
                </div>

                <div class="intro">
                    <p style="font-size: 14px;">Este documento agrupa la documentación técnica de los sistemas <strong>RDMLS</strong> y el <strong>Informe de Desarrollo y Soberanía 2026-2027</strong>. Detalla la ruta crítica desde la infraestructura internacional actual hasta la licitación pública nacional definitiva.</p>
                </div>

                <h2>1. HOJA DE RUTA: MIGRACIÓN Y SOBERANÍA DIGITAL</h2>
                
                <div class="stage-grid">
                    <div class="stage-card">
                        <img src="/assets/stage1_intl.png" />
                        <h4>Etapa 1: Servidor Internacional</h4>
                        <p style="font-size: 11px; color: #64748b;">Infraestructura de bajo costo basada en clusters internacionales (AzuraCast + YesStreaming) para garantizar continuidad operativa inmediata.</p>
                    </div>
                    <div class="stage-card">
                        <img src="/assets/stage2_chile.png" />
                        <h4>Etapa 2: Migración Nacional</h4>
                        <p style="font-size: 11px; color: #64748b;">Traslado íntegro de la pila tecnológica a Datacenters Tier III en territorio chileno, asegurando cumplimiento de soberanía de datos.</p>
                    </div>
                </div>

                <div class="illustration-box" style="margin-top: 0;">
                    <img src="/assets/stage3_pac2027.png" />
                    <div class="illustration-caption">Etapa 3: Desarrollo PAC 2027 - Preparación de Bases Técnicas para Licitación en Mercado Público.</div>
                </div>

                <div class="section-break"></div>

                <h2>2. DOCUMENTACIÓN TÉCNICA ORIGINAL (RDMLS)</h2>
                
                <h3>2.1 Módulos y Funcionalidades</h3>
                ${renderFeatures(opcionesData.features)}

                <div class="section-break"></div>
                
                <h3>2.2 Arquitectura y Stack Tecnológico</h3>
                ${renderTechStack(opcionesData.techStack)}

                <h3>2.3 Marco Legal de Operación</h3>
                ${renderLegal(opcionesData.legal)}

                <div class="section-break"></div>

                <h2>3. INFORME DE DESARROLLO TÉCNICO: SOBERANÍA 2026</h2>
                <p>Análisis para el desarrollo de infraestructura en territorio nacional chileno bajo estándares de ciberseguridad municipal.</p>

                <h3>3.1 Benchmark de Proveedores (ChileCompra)</h3>
                ${renderBenchmark(migraData.benchmark)}

                <div class="section-break"></div>

                <h3>3.2 Marco Legal de Migración y Soberanía</h3>
                <p>Cumplimiento estricto con el Decreto 1730 (Estructura), Decreto 19 (Redes Sociales) y Ley 21.180 (Transformación Digital). Se incluye la preparación del **PAC 2027** para la consolidación definitiva del servicio.</p>
                
                <h3>3.3 Presupuesto Estimado 2026-2027</h3>
                <div class="card">
                    <strong>Inversión Mensual:</strong> $350.000 CLP<br/>
                    <strong>Inversión Anual:</strong> $4.200.000 CLP<br/>
                    <strong>Proyección PAC 2027 (Licitación):</strong> Sujeto a bases técnicas de Mercado Público.
                </div>

                <div class="footer">
                    © 2026-2027 RDMLS.CL · ILUSTRE MUNICIPALIDAD DE LA SERENA<br/>
                    Documento generado electrónicamente para fines administrativos y de planificación estratégica.
                </div>

                <script>
                    function startPrint() {
                        window.print();
                    }
                    if (document.readyState === 'complete') {
                        startPrint();
                    } else {
                        window.addEventListener('load', startPrint);
                    }
                </script>
            </body>
        </html>
    `);
    
    printWindow.document.close();
};
