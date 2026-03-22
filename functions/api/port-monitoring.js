export async function onRequest(context) {
    // Simulación de un Worker que "genera" o "scrappea" datos del puerto diariamente
    // En producción aquí se conectaría a un servicio AIS real o se leería de un CSV/DB
    
    const today = new Date();
    const dayStr = today.toLocaleDateString('es-CL');
    
    // Generar datos "dinámicos" basados en el día para que cambien cada 24h
    // Usamos el día del mes como semilla
    const daySeed = today.getDate();
    
    const vessels = [
        { 
            name: "OCEAN JASMIN", 
            tipo: "Carga General", 
            bandera: "LR", 
            eslora: "180m", 
            eta: `${dayStr} 06:00`, 
            estado: daySeed % 2 === 0 ? "Fondeado" : "Atracado / Operando",
            muelle: "Sitio 1" 
        },
        { 
            name: "CHACABUCO", 
            tipo: "Carga General", 
            bandera: "CL", 
            eslora: "80m", 
            eta: `${dayStr} 14:30`, 
            estado: "En Tránsito",
            muelle: "Sitio 2" 
        },
        { 
            name: "WILD LOTUS", 
            tipo: "Frigorífico", 
            bandera: "BS", 
            eslora: "149m", 
            eta: `${dayStr} 18:00`, 
            estado: "Esperando Giro",
            muelle: "Sitio 3" 
        }
    ];

    return new Response(JSON.stringify({
        updated_at: new Date().toISOString(),
        vessels: vessels,
        source: "VLS-Worker AIS Hub"
    }), {
        headers: { "Content-Type": "application/json" }
    });
}
