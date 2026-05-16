-- FIX: Crear tabla puerta_smart_leads en Supabase
-- Este script resuelve el error PGRST205 (Table not found)

CREATE TABLE IF NOT EXISTS public.puerta_smart_leads (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    empresa TEXT,
    cargo TEXT,
    telefono TEXT,
    interes TEXT,
    source TEXT,
    status TEXT DEFAULT 'NUEVO',
    userAgent TEXT,
    url TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.puerta_smart_leads ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserciones públicas (Leads de la web)
CREATE POLICY "Permitir inserciones públicas" 
ON public.puerta_smart_leads 
FOR INSERT 
WITH CHECK (true);

-- Crear política para permitir lectura al administrador (puedes ajustar el rol)
CREATE POLICY "Permitir lectura autenticada" 
ON public.puerta_smart_leads 
FOR SELECT 
USING (true); -- Ajustar según sea necesario para seguridad real

-- Comentario informativo
COMMENT ON TABLE public.puerta_smart_leads IS 'Tabla para capturar leads de interesados en la plataforma Puerta Smart.';
