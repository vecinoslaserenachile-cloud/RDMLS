import { createClient } from '@supabase/supabase-js';

// Credenciales Restauradas: Proyecto original Vecinos La Serena
const supabaseUrl = 'https://pfemyswvswftwnhqifeu.supabase.co';
const supabaseAnonKey = 'sb_publishable_zCMJ_CRMz9ACcxq0kECt2Q_tTRX-8q5';

let supabaseInstance = null;
try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
    console.warn('Error inicializando Supabase. Revise las credenciales.', e);
}

export const supabase = supabaseInstance;
