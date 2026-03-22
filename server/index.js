import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

const activeAlerts = [];

io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.emit('initial_state', activeAlerts);

    socket.on('new_alert', (data) => {
        const isAcoustic = data.isAcoustic;
        const alertId = Date.now().toString();

        if (data.category) {
            data.category = data.category.toLowerCase();
        }

        const alert = {
            id: alertId,
            ...data,
            timestamp: new Date().toISOString(),
            status: isAcoustic ? 'pending_triangulation' : 'active'
        };

        // Regla: Triangulación (Anti-Falsos Positivos) para Acústica
        if (isAcoustic) {
            // Umbrales MMA
            const isNightMode = new Date().getHours() < 7 || new Date().getHours() >= 21;
            const threshold = isNightMode ? 45 : 55;

            if (data.db < threshold && data.db < 80) {
                console.log(`Ruido descartado (${data.db}dB) por debajo del umbral de ${threshold}dB`);
                return; // Ignorar si no viola la norma base
            }

            // Buscar si hay reportes similares en los últimos 5 minutos dentro de ~100m (0.001 grados lat/lng es ~111m)
            const recentAcousticAlerts = activeAlerts.filter(a =>
                a.isAcoustic &&
                (Date.now() - new Date(a.timestamp).getTime() < 5 * 60000) &&
                Math.abs(a.lat - data.lat) < 0.0015 &&
                Math.abs(a.lng - data.lng) < 0.0015
            );

            // Se necesitan 2 o más reportes concurrentes en la zona para confirmar
            if (recentAcousticAlerts.length >= 1) { // 1 previo + este = 2
                alert.status = 'active';
                alert.protocol = data.db >= 80 ? 'P-RUIDO-MOTO' : 'P-RUIDO-FIESTA';

                // Activar también los previos pendientes
                recentAcousticAlerts.forEach(prevAlert => {
                    if (prevAlert.status === 'pending_triangulation') {
                        prevAlert.status = 'active';
                        io.emit('alert_broadcast', prevAlert);
                    }
                });

                console.log('🚨 TRIANGULACIÓN CONFIRMADA: Ruido en la zona. Despachando Inspector.');
                activeAlerts.push(alert);
                io.emit('alert_broadcast', alert);
            } else {
                console.log(`⚠️ ALERTA ACÚSTICA EN ESPERA DE TRIANGULACIÓN: Sensor aislado detectó ${data.db}dB`);
                activeAlerts.push(alert);
                // No emitimos broadcast al escritorio aún, esperamos segundo reporte vecinal.
            }
            return;
        }

        // Flujo normal para otras incidencias (Seguridad, Animales, Servicios, etc)
        activeAlerts.push(alert);
        let protocol = 'P-GEN';
        // Asignación de Protocolos
        if (alert.category === 'animales') { protocol = alert.subcategory.includes('Mayor') ? 'P-VIAL-01' : 'P-ZOO-02'; }
        if (alert.category === 'seguridad') { protocol = 'P-CARAB-00'; }
        if (alert.category === 'sanitario') { protocol = alert.subcategory.includes('Rebalse') ? 'P-SISS-EMERG' : 'P-AGUAS-VALLE'; }
        if (alert.category === 'electrico') { protocol = alert.subcategory.includes('Poste') ? 'P-MUNI-LUZ' : 'P-SEC-CGE'; }
        if (alert.category === 'telecom') { protocol = 'P-SUBTEL-CABLES'; }

        alert.protocol = protocol;

        console.log('Nueva Alerta Inmediata (Protocolo):', protocol);
        io.emit('alert_broadcast', alert);
    });

    socket.on('send_push_notification', (data) => {
        console.log('Admin enviando Notificación Push Masiva a App Vecinos:', data.title);
        io.emit('receive_push_notification', data);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Smart Comuna Socket Server corriendo en puerto ${PORT}`);
});
