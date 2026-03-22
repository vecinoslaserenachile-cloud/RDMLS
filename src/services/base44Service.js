/**
 * Motor de Integración con Juego Base44 (Smart Gamification VLS)
 * 
 * Este módulo extrae datos en tiempo real desde el backend del juego
 * para inyectarlos en la plataforma Smart Comuna, promoviendo la participación cívica.
 */

const BASE44_URL = 'https://app.base44.com';
const APP_ID = '69c03ca5b06c1989ecbe308a';
const API_KEY = '598a68756bf94e118cfc8c09f62a4958';

/**
 * Obtener todos los registros de una entidad del Juego.
 * @param {string} entityName - Nombre de la tabla/entidad (ej: "Users", "Scores", "Misiones")
 */
export const fetchGameEntities = async (entityName) => {
    try {
        const response = await fetch(`${BASE44_URL}/api/apps/${APP_ID}/entities/${entityName}`, {
            method: 'GET',
            headers: {
                'api_key': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`[Base44 Error] Falló la extracción de ${entityName}:`, error);
        return [];
    }
};

/**
 * Actualizar o Mutar un registro específico dentro del juego desde la Plataforma
 * @param {string} entityName - Nombre de la tabla / entidad
 * @param {string} id - ID único del registro a actualizar
 * @param {object} updateData - Objeto JSON con los nuevos valores a guardar
 */
export const updateGameEntity = async (entityName, id, updateData) => {
    try {
        const response = await fetch(`${BASE44_URL}/api/apps/${APP_ID}/entities/${entityName}/${id}`, {
            method: 'PUT',
            headers: {
                'api_key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`[Base44 Error] Falló la actualización de ${entityName}/${id}:`, error);
        return null;
    }
};

/**
 * Insertar un NUEVO registro (Por ejemplo, cuando un ciudadano completa una misión y el portal se lo reporta al juego)
 */
export const createGameEntity = async (entityName, newData) => {
    try {
        const response = await fetch(`${BASE44_URL}/api/apps/${APP_ID}/entities/${entityName}`, {
            method: 'POST',
            headers: {
                'api_key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        return await response.json();
    } catch (error) {
        console.error(`[Base44 Error] Falló la creación en ${entityName}:`, error);
        return null;
    }
};
