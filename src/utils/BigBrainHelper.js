/**
 * HELPER: BigBrainVLS (Gran Cerebro)
 * Digital sovereignty at the core of La Serena.
 * This helper centralizes all reporting events across the platform pillars.
 */

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase'; // Assuming Firestore is initialized here

/**
 * Pushes a telemetry event to the Gran Cerebro hub.
 * @param {Object} data 
 * @param {string} data.type - 'security' | 'transport' | 'religious' | 'secular' | 'event'
 * @param {string} data.title - Summary of the event
 * @param {string} data.description - Detailed info
 * @param {Object} data.location - { lat, lng }
 * @param {Object} data.metadata - Any additional data (line number, stars, etc.)
 * @param {Object} data.user - { id, name, isDelegado, level }
 */
export const pushToBigBrain = async (data) => {
    try {
        const payload = {
            ...data,
            timestamp: serverTimestamp(),
            source: 'VLS_PORTAL_WEB',
            priority: data.type === 'security' ? 'CRITICAL' : 'NORMAL'
        };

        const docRef = await addDoc(collection(db, 'vls_gran_cerebro'), payload);
        console.log('[BigBrain] Event recorded:', docRef.id);
        
        // Dispatch global event for real-time UI updates in Backoffice
        window.dispatchEvent(new CustomEvent('big-brain-pulse', { detail: payload }));
        
        return docRef.id;
    } catch (error) {
        console.error('[BigBrain] Failed to process intelligence:', error);
        // Fallback for offline or local testing if needed
        return null;
    }
};

/**
 * Calculates Delegado points and status based on a user's history.
 * (Placeholder logic for the "Delegado Virtual" gamification)
 */
export const checkDelegadoStatus = (userReportsCount) => {
    if (userReportsCount >= 50) return 'Delegado de la Comuna';
    if (userReportsCount >= 20) return 'Delegado Virtual';
    return 'Vecino Colaborador';
};
