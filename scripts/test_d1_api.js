/**
 * VLS D1 API Tester: Valida que el motor D1 de Cloudflare responda correctamente.
 */
async function testD1() {
  const BASE_URL = "http://localhost:8788/api/db"; // Cambiar a URL real al desplegar
  
  console.log("🔍 Iniciando prueba de API D1...");

  try {
    // 1. Probar inserción de log
    console.log("📝 Enviando log de prueba...");
    const postRes = await fetch(`${BASE_URL}?table=logs`, {
      method: 'POST',
      body: JSON.stringify({
        modulo: 'TEST_API',
        accion: 'D1_PROBE',
        detalles: 'PRUEBA OPERATIVA EXITOSA',
        severidad: 'INFO'
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (postRes.ok) {
        console.log("✅ Log insertado en D1.");
    }

    // 2. Probar lectura de reportes
    console.log("📊 Consultando reportes...");
    const getRes = await fetch(`${BASE_URL}?table=reports`);
    if (getRes.ok) {
        const data = await getRes.all ? await getRes.json() : [];
        console.log(`✅ Consulta exitosa. Reportes encontrados: ${data.length || 0}`);
    }

  } catch (err) {
    console.warn("⚠️ Advertencia: No se pudo conectar a la API local. Asegúrate de ejecutar: npx wrangler pages dev . --d1 DB");
  }
}

testD1();
