-- VLS Smart Comuna - Schema Digital 2026 (Cloudflare D1)
-- Centralizando la inteligencia urbana y eliminando dependencias externas.

-- 1. REPORTES CIUDADANOS (Smart Citizens)
CREATE TABLE IF NOT EXISTS vls_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL, -- Bache, Luminaria, Microbasural, etc.
    descripcion TEXT,
    ubicacion_lat REAL,
    ubicacion_lng REAL,
    direccion TEXT,
    fotos TEXT, -- JSON array de URLs en R2
    estado TEXT DEFAULT 'PENDIENTE',
    prioridad TEXT DEFAULT 'NORMAL',
    user_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. LEADS PUERTA SMART (CRM)
CREATE TABLE IF NOT EXISTS puerta_leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    empresa TEXT,
    cargo TEXT,
    telefono TEXT,
    interes TEXT,
    source TEXT,
    status TEXT DEFAULT 'NUEVO',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. INDUCCIÓN Y CERTIFICADOS (Smart Administration)
CREATE TABLE IF NOT EXISTS induction_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    curso_id TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'IN_PROGRESS',
    diploma_url TEXT, -- Link a R2
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME
);

-- 4. VETcinos (Alertas de Mascotas)
CREATE TABLE IF NOT EXISTS vetcinos_alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    tipo TEXT, -- Perdido / Encontrado / Adopción
    foto_url TEXT,
    contacto TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. LOGS DEL SISTEMA (Auditoría VLS)
CREATE TABLE IF NOT EXISTS system_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    modulo TEXT,
    accion TEXT,
    detalles TEXT,
    severidad TEXT DEFAULT 'INFO',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
