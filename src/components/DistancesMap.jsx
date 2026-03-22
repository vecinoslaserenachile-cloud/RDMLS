import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import { X, Navigation, Car, Bus, Bike, Plane, Footprints, Minimize2 } from 'lucide-react';

const MapController = ({ selectedRoute }) => {
    const map = useMap();
    useEffect(() => {
        // Fix for blank map area in modals
        setTimeout(() => map.invalidateSize(), 300);
        
        if (selectedRoute) {
            map.flyTo(selectedRoute.coords, map.getZoom(), { animate: true, duration: 2 });
        } else {
            map.flyTo([-29.9045, -71.2489], 8, { animate: true, duration: 2 });
        }
    }, [selectedRoute, map]);
    return null;
};

const serenitoIcon = new L.Icon({
    iconUrl: '/serenito.png', // Avatar de serenito público
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -60]
});

export default function DistancesMap({ onClose }) {
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [serenitoPos, setSerenitoPos] = useState([-29.9045, -71.2489]);
    const animRef = useRef(null);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showBillboard, setShowBillboard] = useState(false);

    useEffect(() => {
        if (selectedRoute) {
            // Animacion nativa simple de georeferenciacion
            const points = selectedRoute.route;
            if (points.length < 2) return;

            let currentSegment = 0;
            let p = 0;

            if (animRef.current) clearInterval(animRef.current);

            animRef.current = setInterval(() => {
                if (currentSegment >= points.length - 1) {
                    clearInterval(animRef.current);
                    setSerenitoPos(points[points.length - 1]);
                    return;
                }

                p += 0.05; // Velocidad
                const start = points[currentSegment];
                const end = points[currentSegment + 1];

                const lat = start[0] + (end[0] - start[0]) * p;
                const lon = start[1] + (end[1] - start[1]) * p;

                setSerenitoPos([lat, lon]);

                if (p >= 1) {
                    p = 0;
                    currentSegment++;
                }
            }, 30);
        } else {
            setSerenitoPos([-29.9045, -71.2489]);
            if (animRef.current) clearInterval(animRef.current);
        }
        return () => { if (animRef.current) clearInterval(animRef.current); };
    }, [selectedRoute]);

    const handleSearch = async (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            setIsSearching(true);
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    const bestMatch = data[0];
                    const lat = parseFloat(bestMatch.lat);
                    const lon = parseFloat(bestMatch.lon);

                    const newRoute = {
                        id: `custom-${Date.now()}`,
                        name: bestMatch.name || searchQuery,
                        coords: [lat, lon],
                        color: '#00ffff',
                        route: [[-29.9045, -71.2489], [lat, lon]],
                        times: { car: 'Variable', plane: 'Sujeto a disponibilidad' }
                    };
                    setSelectedRoute(newRoute);
                } else {
                    alert('Destino no encontrado. Intenta con un nombre más específico.');
                }
            } catch (error) {
                console.error('Error buscando destino:', error);
                alert('Ocurrió un error al buscar. Inténtalo de nuevo.');
            } finally {
                setIsSearching(false);
            }
        }
    };

    const locations = [
        { id: 'vicuna', name: 'Vicuña', coords: [-30.0333, -70.7167], color: '#3b82f6', route: [[-29.9045, -71.2489], [-30.0000, -71.0000], [-30.0333, -70.7167]], times: { walk: '13h', bike: '4h', car: '50m', bus: '1h 10m' } },
        { id: 'andacollo', name: 'Andacollo', coords: [-30.2333, -71.0833], color: '#10b981', route: [[-29.9045, -71.2489], [-30.1000, -71.2000], [-30.2333, -71.0833]], times: { walk: '11h', bike: '4h 30m', car: '1h', bus: '1h 20m' } },
        { id: 'punta_choros', name: 'Punta de Choros', coords: [-29.2500, -71.4667], color: '#f59e0b', route: [[-29.9045, -71.2489], [-29.5000, -71.3000], [-29.2500, -71.4667]], times: { walk: '23h', bike: '7h', car: '1h 30m', bus: '2h' } },
        { id: 'ovalle', name: 'Ovalle', coords: [-30.6000, -71.2000], color: '#ef4444', route: [[-29.9045, -71.2489], [-30.3000, -71.2500], [-30.6000, -71.2000]], times: { walk: '18h', bike: '5h', car: '1h 15m', bus: '1h 40m' } },
        { id: 'illapel', name: 'Illapel', coords: [-31.6333, -71.1667], color: '#8b5cf6', route: [[-29.9045, -71.2489], [-30.8000, -71.4000], [-31.6333, -71.1667]], times: { walk: '56h', bike: '15h', car: '3h 30m', bus: '4h 30m' } },
        { id: 'fray_jorge', name: 'Parque Fray Jorge', coords: [-30.6667, -71.6667], color: '#06b6d4', route: [[-29.9045, -71.2489], [-30.4000, -71.5000], [-30.6667, -71.6667]], times: { walk: '22h', bike: '7h', car: '2h', bus: 'N/A' } },
        { id: 'algarrobito', name: 'Algarrobito', coords: [-29.9167, -71.1500], color: '#ec4899', route: [[-29.9045, -71.2489], [-29.9167, -71.1500]], times: { walk: '2h', bike: '45m', car: '15m', bus: '25m' } },
        { id: 'coquimbo', name: 'Coquimbo', coords: [-29.9533, -71.3394], color: '#f97316', route: [[-29.9045, -71.2489], [-29.9300, -71.3000], [-29.9533, -71.3394]], times: { walk: '3h', bike: '1h', car: '20m', bus: '30m' } },
        { id: 'concepcion', name: 'Concepción', coords: [-36.827, -73.050], color: '#ef4444', route: [[-29.9045, -71.2489], [-33.4372, -70.6506], [-36.827, -73.050]], times: { walk: '180h', bike: '48h', car: '11h', bus: '13h 30m' } }
    ];

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        window.addEventListener('minimize-all', () => setIsMinimized(true));
        window.addEventListener('close-all-floating', onClose);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('minimize-all', () => setIsMinimized(true));
            window.removeEventListener('close-all-floating', onClose);
        };
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div 
                drag={isMinimized && !isMobile}
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    inset: isMinimized ? 'auto' : (isMobile ? '0' : '5%'),
                    bottom: isMinimized ? (isMobile ? '230px' : '260px') : (isMobile ? '0' : 'auto'),
                    right: isMinimized ? (isMobile ? '20px' : '30px') : (isMobile ? '20px' : 'auto'),
                    left: isMinimized ? 'auto' : (isMobile ? '0' : '50%'),
                    transform: isMinimized ? 'none' : (isMobile ? 'none' : 'translateX(-50%)'),
                    width: isMinimized ? (isMobile ? '60px' : '70px') : (isMobile ? '100vw' : '100%'),
                    maxWidth: isMinimized ? 'none' : '1000px',
                    height: isMinimized ? (isMobile ? '60px' : '70px') : (isMobile ? '100dvh' : '85vh'),
                    maxHeight: isMinimized ? 'none' : (isMobile ? '100dvh' : '85vh'),
                    borderRadius: isMinimized ? '50%' : (isMobile ? '0' : '32px'),
                    zIndex: 200000
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-panel" 
                style={{
                    position: 'fixed',
                    display: 'flex', flexDirection: 'column', overflow: 'hidden',
                    background: isMinimized ? 'rgba(56, 189, 248, 0.98)' : 'rgba(2, 6, 23, 0.98)',
                    border: isMinimized ? '2px solid white' : '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                {isMinimized ? (
                    <button 
                        onClick={() => setIsMinimized(false)}
                        style={{ width: '100%', height: '100%', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
                    >
                        <Navigation size={isMobile ? 24 : 35} className="pulse" />
                    </button>
                ) : (
                    <>
                        <div style={{ padding: '1.2rem', background: 'linear-gradient(90deg, #0f172a, #1e293b)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                            <h2 style={{ margin: 0, fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontWeight: 900 }}>
                                <Navigation size={24} color="#38bdf8" />
                                CUADRO DE DISTANCIAS VLS
                            </h2>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={() => setIsMinimized(true)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Minimizar">
                                    <Minimize2 size={18} />
                                </button>
                                <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Cerrar">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                disabled={isSearching}
                                placeholder={isSearching ? "Analizando coordenadas geográficas..." : "🔍 Escriba aquí la ciudad destino"}
                                style={{ width: '100%', padding: '0.8rem 1.5rem', borderRadius: '30px', border: '1px solid #334155', background: '#020617', color: 'white', outline: 'none', fontSize: '1rem', letterSpacing: '1px' }}
                            />
                        </div>

                        <div className="distances-pills-container" style={{ 
                            padding: '1.2rem', 
                            display: 'flex', 
                            gap: '0.6rem', 
                            flexWrap: 'wrap', 
                            background: 'rgba(15, 23, 42, 0.4)', 
                            overflowY: 'auto', 
                            maxHeight: isMobile ? '120px' : '180px', 
                            flexShrink: 0,
                            justifyContent: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            {locations.map(loc => (
                                <motion.button
                                    key={loc.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        borderRadius: '99px',
                                        padding: '0.6rem 1.2rem',
                                        fontSize: '0.75rem',
                                        border: '1.5px solid',
                                        borderColor: selectedRoute?.id === loc.id ? loc.color : 'rgba(255,255,255,0.2)',
                                        background: selectedRoute?.id === loc.id ? loc.color : 'rgba(255,255,255,0.1)',
                                        color: selectedRoute?.id === loc.id ? 'black' : 'white',
                                        fontWeight: '900',
                                        cursor: 'pointer',
                                        transition: '0.3s',
                                        boxShadow: selectedRoute?.id === loc.id ? `0 0 15px ${loc.color}50` : 'none'
                                    }}
                                    onClick={() => { setSelectedRoute(loc); setShowBillboard(false); }}
                                >
                                    {loc.name.toUpperCase()}
                                </motion.button>
                            ))}
                        </div>

                        <div style={{ flex: 1, position: 'relative', minHeight: 0, display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                            {selectedRoute && (
                                <div className="glass-panel scale-in" style={{ 
                                    position: isMobile ? 'relative' : 'absolute', 
                                    top: isMobile ? '0' : '15px', 
                                    right: isMobile ? '0' : '15px', 
                                    left: isMobile ? '0' : 'auto',
                                    zIndex: 1000, 
                                    padding: '1.2rem', 
                                    background: 'rgba(15, 23, 42, 0.98)', 
                                    borderRadius: isMobile ? '0' : '20px', 
                                    border: isMobile ? 'none' : `2px solid ${selectedRoute.color}`, 
                                    borderBottom: isMobile ? `4px solid ${selectedRoute.color}` : `2px solid ${selectedRoute.color}`,
                                    color: 'white', 
                                    backdropFilter: 'blur(20px)', 
                                    width: isMobile ? '100%' : '280px',
                                    flexShrink: 0,
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                        <h4 style={{ margin: 0, fontSize: '1rem', color: selectedRoute.color, fontWeight: '900' }}>{selectedRoute.name.toUpperCase()}</h4>
                                        <button onClick={() => setSelectedRoute(null)} style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '4px', padding: '4px 8px', color: '#fca5a5', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}>CERRAR</button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Car size={14} color="#38bdf8" /> <span>{selectedRoute.times.car}</span></div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bus size={14} color="#fcd34d" /> <span>{selectedRoute.times.bus}</span></div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bike size={14} color="#10b981" /> <span>{selectedRoute.times.bike}</span></div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Footprints size={14} color="#ec4899" /> <span>{selectedRoute.times.walk}</span></div>
                                    </div>
                                    <div style={{ marginTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.6rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <motion.img animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} src="/ananuca_flower_3d_icon_1773625751027.png" style={{ height: '25px' }} alt="flor" />
                                        <span style={{ fontSize: '0.65rem', color: '#fca5a5', fontWeight: '900' }}>¡RECOMPENSA: AÑAÑUCA!</span>
                                    </div>
                                </div>
                            )}
                            
                            <div style={{ flex: 1, minHeight: isMobile ? '300px' : 'auto', width: '100%', position: 'relative' }}>
                                <MapContainer center={[-29.9045, -71.2489]} zoom={8} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                                    <MapController selectedRoute={selectedRoute} />
                                    <Marker position={[-29.9045, -71.2489]}><Popup>La Serena (Matriz Hub)</Popup></Marker>
                                    {selectedRoute && (
                                        <>
                                            <Polyline positions={selectedRoute.route} color={selectedRoute.color} weight={5} opacity={0.8} />
                                            <Marker position={selectedRoute.coords}><Popup>{selectedRoute.name}</Popup></Marker>
                                        </>
                                    )}
                                    <Marker position={serenitoPos} icon={serenitoIcon}><Popup>Serenito en ruta VLS</Popup></Marker>
                                </MapContainer>
                            </div>
                        </div>
                    </>
                )}
            </motion.div>
            <style>{`
                .pulse { animation: pulse_vls_m 1.5s infinite alternate; }
                @keyframes pulse_vls_m { from { filter: brightness(1); transform: scale(1); } to { filter: brightness(1.5); transform: scale(1.1); } }
                .scale-in { animation: scaleIn 0.3s ease-out; }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </AnimatePresence>
    );
}
