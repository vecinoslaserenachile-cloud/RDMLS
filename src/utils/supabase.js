import { createClient } from '@supabase/supabase-js';

// IMPORTANTE: El usuario debe reemplazar estos valores con su URL y KEY de Supabase
const supabaseUrl = 'TU_SUPABASE_URL';
const supabaseAnonKey = 'TU_SUPABASE_ANON_KEY';

let supabaseInstance = null;
try {
    // Only create client if URL looks like a valid URL or we are not in the browser yet
    if (supabaseUrl.startsWith('http')) {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    } else {
        console.warn('Supabase no está configurado. Usando un mock temporal para evitar que la app se caiga.');
        supabaseInstance = {
            from: () => ({ select: () => ({ data: [], error: null }), insert: () => ({ data: null, error: null }) }),
            auth: {
                getSession: async () => ({ data: { session: null }, error: null }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
                signInWithPassword: async () => ({ data: null, error: new Error('Supabase no está configurado. Las credenciales no funcionarán.') }),
                signOut: async () => ({ error: null })
            }
        }; // Simple mock
    }
} catch (e) {
    console.warn('Error inicializando Supabase. Revise las credenciales.', e);
}

export const supabase = supabaseInstance;
