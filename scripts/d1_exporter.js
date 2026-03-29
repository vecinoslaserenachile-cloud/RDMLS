/**
 * VLS Data Exporter PRO: Firestore -> D1 (Real Migration)
 * Intenta conectar con Firestore usando la configuración del portal y genera el SQL de migración.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, limit, orderBy } from 'firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración extraída de src/utils/firebase.js
const firebaseConfig = {
    apiKey: "AIzaSyCDUhik-oYwJ-yBkBYAohw6DJct5FQ78w4",
    authDomain: "laserena-d1263.firebaseapp.com",
    projectId: "laserena-d1263",
    storageBucket: "laserena-d1263.firebasestorage.app",
    messagingSenderId: "283725387947",
    appId: "1:283725387947:web:898aa22c80c2fadbe8bfee"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function runExporter() {
    console.log("🚀 Iniciando MIGRACIÓN DE DATOS REALES (Primeros 1,000 registros)...");

    let sql = `-- VLS DATA MIGRATION SOURCE: FIREBASE (REAL) -> CLOUDFLARE D1
-- Generado el: ${new Date().toLocaleString()}

`;

    try {
        // 1. MIGRACIÓN DE LEADS (Puerta Smart)
        console.log("📡 Consultando 'puerta_smart_leads'...");
        const leadsSnap = await getDocs(query(collection(db, 'puerta_smart_leads'), limit(500)));
        sql += `-- LEADS MIGRATION (${leadsSnap.size} registros)\n`;
        sql += "DELETE FROM puerta_leads;\n";
        
        leadsSnap.forEach(doc => {
            const d = doc.data();
            const nombre = (d.nombre || '').replace(/'/g, "''");
            const email = (d.email || '').replace(/'/g, "''");
            const empresa = (d.empresa || '').replace(/'/g, "''");
            const cargo = (d.cargo || '').replace(/'/g, "''");
            const telefono = (d.telefono || '').replace(/'/g, "''");
            const interes = (d.interes || '').replace(/'/g, "''");
            const source = (d.source || 'FIREBASE_MIGRATION').replace(/'/g, "''");
            
            sql += `INSERT INTO puerta_leads (nombre, email, empresa, cargo, telefono, interes, source) VALUES ('${nombre}', '${email}', '${empresa}', '${cargo}', '${telefono}', '${interes}', '${source}');\n`;
        });

        // 2. MIGRACIÓN DE REPORTES (VLS REPORTE CIUDADANO)
        console.log("📡 Consultando 'vls_reportes_ciudadanos'...");
        const reportsSnap = await getDocs(query(collection(db, 'vls_reportes_ciudadanos'), limit(500)));
        sql += `\n-- REPORTS MIGRATION (${reportsSnap.size} registros)\n`;
        sql += "DELETE FROM vls_reports;\n";

        reportsSnap.forEach(doc => {
            const d = doc.data();
            const tipo = (d.tipo || 'OTRO').replace(/'/g, "''");
            const desc = (d.descripcion || '').replace(/'/g, "''");
            const dir = (d.direccion || '').replace(/'/g, "''");
            const uid = (d.user_id || 'ANON').replace(/'/g, "''");
            
            sql += `INSERT INTO vls_reports (tipo, descripcion, direccion, user_id) VALUES ('${tipo}', '${desc}', '${dir}', '${uid}');\n`;
        });

        // 3. LOG DE ÉXITO
        sql += `\nINSERT INTO system_logs (modulo, accion, detalles, severidad) VALUES ('MIGRACION', 'SYNC_COMPLETED', 'Sincronización de ${leadsSnap.size + reportsSnap.size} registros completada.', 'INFO');\n`;

        const outputPath = path.join(__dirname, '../sql/migration_data.sql');
        fs.writeFileSync(outputPath, sql);

        console.log(`\n✅ ARCHIVO SQL GENERADO CON ÉXITO: ${outputPath}`);
        console.log(`📊 Total Registros Procesados: ${leadsSnap.size + reportsSnap.size}`);
        console.log("\n👉 PRÓXIMO PASO: Ejecuta el siguiente comando para inyectar los datos en Cloudflare:");
        console.log("   npx wrangler d1 execute vls-db --remote --file=./sql/migration_data.sql");

    } catch (err) {
        console.error("❌ Error durante la migración:", err.message);
        console.log("💡 Tip: Si ves errores de permisos, puede que necesites desactivar temporalmente las reglas de seguridad o usar el Admin SDK.");
    } finally {
        process.exit();
    }
}

runExporter();
