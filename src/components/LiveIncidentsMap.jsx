import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ShieldAlert, Construction, Cone, Sparkles, Navigation, Waves, Bird } from 'lucide-react';

// Generador de Íconos HTML (DivIcon) para puntos parpadeantes en el mapa
const createPulsingIcon = (color, emoji) => {
    return L.divIcon({
        className: 'custom-pulsing-icon',
        html: `
            <div style="
                width: 32px; height: 32px;
                background-color: ${color};
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 0 20px ${color};
                border: 2px solid white;
                animation: pulse-ring 1.5s infinite;
                font-size: 18px;
                color: white;
            ">
                ${emoji}
            </div>
            <style>
                @keyframes pulse-ring {
                    0% { transform: scale(0.8); box-shadow: 0 0 0 0 ${color}80; }
                    70% { transform: scale(1.1); box-shadow: 0 0 0 15px transparent; }
                    100% { transform: scale(0.8); box-shadow: 0 0 0 0 transparent; }
                }
            </style>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
};

const INCIDENTS = [
    { id: 1, pos: [-29.904, -71.251], type: 'Obras', desc: 'Reparación de pavimento', color: '#f59e0b', icon: '🚧' },
    { id: 2, pos: [-29.901, -71.258], type: 'Móvil', desc: 'Patrulla Municipal 1420', color: '#10b981', icon: '🚓', moving: true },
    { id: 3, pos: [-29.907, -71.248], type: 'Precaución', desc: 'Semáforo intermitente', color: '#ef4444', icon: '🚦' },
    { id: 4, pos: [-29.896, -71.260], type: 'Alerta', desc: 'Animales sueltos en vía', color: '#f97316', icon: '🐕' },
    { id: 5, pos: [-29.905, -71.240], type: 'Servicios', desc: 'Camión recolector', color: '#3b82f6', icon: '♻️', moving: true },
    { id: 8, pos: [-29.920, -71.285], type: 'Ambiental', desc: 'Zona de Nidificación - Humedal', color: '#06b6d4', icon: '🦆' },
    { id: 9, pos: [-29.932, -71.290], type: 'Ambiental', desc: 'Vehículo en Playa Arena', color: '#ef4444', icon: '🏖️' }
];

export default function LiveIncidentsMap() {
    const [markers, setMarkers] = useState(INCIDENTS);

    // Simular el movimiento aleatorio suave de las patrullas y camiones por La Serena
    useEffect(() => {
        const interval = setInterval(() => {
            setMarkers(prev => prev.map(m => {
                if (m.moving) {
                    const latMove = (Math.random() - 0.5) * 0.0005;
                    const lngMove = (Math.random() - 0.5) * 0.0005;
                    return { ...m, pos: [m.pos[0] + latMove, m.pos[1] + lngMove] };
                }
                return m;
            }));
        }, 1500);

        const handleNewIncident = (e) => {
            if (e.detail) {
                const isUrgent = e.detail.type?.includes('AMBIENTAL');
                setMarkers(prev => [...prev, {
                    id: e.detail.id,
                    pos: [e.detail.lat, e.detail.lng],
                    type: e.detail.type || 'Alerta',
                    desc: e.detail.desc || 'Incidencia Reportada',
                    color: isUrgent ? '#ef4444' : '#00e5ff',
                    icon: isUrgent ? '🚨' : '📡',
                    moving: false
                }]);
            }
        };

        window.addEventListener('c5-new-incident', handleNewIncident);

        return () => {
            clearInterval(interval);
            window.removeEventListener('c5-new-incident', handleNewIncident);
        };
    }, []);

    return (
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(5, 10, 25, 0.95)', border: '1px solid #3b82f6', borderRadius: '12px', boxShadow: '0 0 20px rgba(59, 130, 246, 0.1) inset' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', borderBottom: '1px dashed rgba(59, 130, 246, 0.4)', paddingBottom: '0.8rem' }}>
                <Navigation size={20} color="#3b82f6" />
                <span style={{ color: '#3b82f6', fontWeight: 'bold', letterSpacing: '2px', fontFamily: 'monospace', fontSize: '1.1rem' }}>TERRITORIO: MAPA TÁCTICO VLS 2026</span>
            </div>

            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '400px', border: '2px solid rgba(59, 130, 246, 0.5)', position: 'relative' }}>
                <MapContainer center={[-29.9027, -71.2520]} zoom={14} style={{ height: '100%', width: '100%', background: '#0e1726' }}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; CARTO'
                    />

                    {markers.map(item => (
                        <Marker
                            key={item.id}
                            position={item.pos}
                            icon={createPulsingIcon(item.color, item.icon)}
                        >
                            <Popup>
                                <div style={{ textAlign: 'center', padding: '10px', background: '#0f172a', borderRadius: '8px', border: `1px solid ${item.color}` }}>
                                    <h4 style={{ margin: '0 0 5px 0', color: item.color, fontSize: '1.1rem', fontWeight: 'bold' }}>{item.icon} {item.type.toUpperCase()}</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#f1f5f9' }}>{item.desc}</p>
                                    <div style={{ marginTop: '8px', fontSize: '0.7rem', color: '#64748b' }}>SISTEMA C5 - ComunaSmart</div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '1.5rem', justifyContent: 'center', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ color: '#10b981' }}>🚓 PATRULLAS</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ color: '#ef4444' }}>🚨 CRÍTICO</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ color: '#06b6d4' }}>🦆 AMBIENTAL</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ color: '#f59e0b' }}>🚧 OBRAS</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ color: '#3b82f6' }}>♻️ SERVICIOS</span></div>
            </div>
        </div>
    );
}
