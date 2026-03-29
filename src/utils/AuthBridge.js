/**
 * VLS Auth Bridge: Capa de Identidad Corporativa
 * Este puente permite desacoplar los dominios genéricos de Firebase del flujo de usuario,
 * preparando la transición a un sistema de sesión 100% municipal (Cloudflare Access/JWT).
 */
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

/**
 * Inicia sesión con Google ocultando el rastro de dominios genéricos.
 * @returns {Promise<User>}
 */
export const signInCorporativo = async () => {
    const provider = new GoogleAuthProvider();
    // En el futuro, configuraremos aquí el domain branding en el Firebase Console
    // para que use auth.vecinoslaserena.cl
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(`✅ Bienvenido(a) al Portal VLS: ${result.user.displayName}`);
        return result.user;
    } catch (error) {
        console.error("Auth Bridge Error:", error.message);
        throw error;
    }
};

/**
 * Cierra la sesión y limpia el rastro de la plataforma.
 */
export const logoutCorporativo = async () => {
    try {
        await signOut(auth);
        console.log("👋 Sesión VLS cerrada correctamente.");
        // Aquí podríamos disparar la limpieza de KV en Cloudflare si fuera necesario
    } catch (error) {
        console.error("Auth Bridge Logout Error:", error.message);
    }
};

/**
 * Valida si el dominio del usuario es institucional (opcional)
 */
export const isAdminDomain = (email) => {
    return email.endsWith('@vecinoslaserena.cl') || email.endsWith('@laserena.cl');
};
