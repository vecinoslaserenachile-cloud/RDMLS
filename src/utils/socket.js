/**
 * VLS Socket Bridge — Motor de Comunicación en Tiempo Real
 * 
 * En producción (Cloudflare Pages, hosting estático) no existe un
 * servidor Socket.io, por lo que se usa un mock seguro para evitar
 * que la app crashee con "socket is not defined".
 * 
 * El socket real solo se activa cuando el servidor Node.js (server.js)
 * está corriendo en desarrollo local.
 */
import { io } from 'socket.io-client';

const isLocalDev = import.meta.env.MODE !== 'production' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Mock seguro para producción estática
const socketMock = {
    on: () => {},
    off: () => {},
    emit: () => {},
    connect: () => {},
    disconnect: () => {},
    connected: false,
    id: null
};

let socket;

if (isLocalDev) {
    try {
        socket = io('http://localhost:3001', {
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 3,
            timeout: 5000
        });
    } catch (e) {
        console.warn('VLS Socket: Conexión local fallida, usando mock seguro.');
        socket = socketMock;
    }
} else {
    // Producción: mock silencioso, no genera errores, no bloquea el render
    socket = socketMock;
}

export { socket };
