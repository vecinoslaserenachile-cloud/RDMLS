-- VLS DATA MIGRATION SOURCE: FIREBASE (REAL) -> CLOUDFLARE D1
-- Generado el: 29-03-2026, 11:45:35 a. m.

-- LEADS MIGRATION (0 registros)
DELETE FROM puerta_leads;

-- REPORTS MIGRATION (0 registros)
DELETE FROM vls_reports;

INSERT INTO system_logs (modulo, accion, detalles, severidad) VALUES ('MIGRACION', 'SYNC_COMPLETED', 'Sincronización de 0 registros completada.', 'INFO');
