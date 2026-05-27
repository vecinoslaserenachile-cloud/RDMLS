import { createClient } from '@supabase/supabase-js';

// Credenciales recuperadas desde el proyecto Norte Casas
const supabaseUrl = 'https://svfepietzoydigmicety.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZmVwaWV0em95ZGlnbWljZXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDcxMTgsImV4cCI6MjA5NTE4MzExOH0.-E1IL8Zl93W2mR6GEFX4WOBn8idrxDOSPtzAF7FlaKE';

let supabaseInstance = null;
try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
    console.warn('Error inicializando Supabase. Revise las credenciales.', e);
}

export const supabase = supabaseInstance;
