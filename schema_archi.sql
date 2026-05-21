-- ============================================================
-- ARCHI CAMPAIGN DATABASE - Cloudflare D1 (NO FIREBASE)
-- ============================================================

-- Tabla de Seguidores / Simpatizantes
CREATE TABLE IF NOT EXISTS archi_supporters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    radio_station TEXT,
    ideas TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
);

-- Tabla de Noticias de Campaña
CREATE TABLE IF NOT EXISTS archi_news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    category TEXT DEFAULT 'General',
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
);

-- Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_supporters_email ON archi_supporters(email);
CREATE INDEX IF NOT EXISTS idx_news_active ON archi_news(active, created_at);

-- Seed: 3 noticias iniciales de campaña
INSERT OR IGNORE INTO archi_news (id, title, content, image_url, category, active) VALUES
(1, 
 'ARCHI de todo Chile: Lanzamiento Oficial de la Lista Nueva Energía',
 'Con el respaldo de radios de norte a sur, la Lista Nueva Energía liderada por Solange Gómez Jelves marca un hito histórico: la primera candidatura presidencial femenina en 90 años de historia de ARCHI. La campaña recorre Chile defendiendo la soberanía de los medios regionales frente a la concentración capitalina.',
 NULL,
 'Campaña',
 1
),
(2,
 'Pilar 1 en Acción: Open Source Gratuito para Emisoras Regionales',
 'El equipo técnico de la Lista Nueva Energía presentó la primera versión del kit de herramientas de streaming de código abierto. Con este sistema, cualquier radio regional podrá transmitir en línea sin pagar licencias ni depender de software propietario. La soberanía digital empieza por las regiones.',
 NULL,
 'Innovación',
 1
),
(3,
 'Ley 19.733: Exigimos el 40% del Avisaje Estatal para Medios Regionales',
 'El Observatorio de Inversión Publicitaria y Periodística (OIPP), propuesta estrella del programa de la Lista Nueva Energía, busca fiscalizar el cumplimiento del artículo 4° de la Ley de Prensa. El Estado debe garantizar equidad territorial en sus pautas publicitarias.',
 NULL,
 'Programa',
 1
);
