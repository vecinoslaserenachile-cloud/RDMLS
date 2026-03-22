import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Plane, Navigation, Clock, Info, Search, X, Map as MapIcon, PlaneLanding, PlaneTakeoff, RefreshCw } from 'lucide-react';

// Corregir iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TODAY_STR = new Date().toLocaleDateString('es-CL');

export default function LaFloridaAirport({ onClose }) {
    const [arrivals, setArrivals] = useState([
        { airline: "LATAM", flight: "LA 100", origin: "SANTIAGO", date: TODAY_STR, time: "08:45", belt: "1", status: "ATERRIZADO" },
        { airline: "SKY", flight: "H2 1714", origin: "CALAMA", date: TODAY_STR, time: "10:30", belt: "2", status: "EN VUELO" },
        { airline: "JETSMART", flight: "JA 205", origin: "CONCEPCIÓN", date: TODAY_STR, time: "11:15", belt: "1", status: "PROGRAMADO" },
        { airline: "LATAM", flight: "LA 105", origin: "SANTIAGO", date: TODAY_STR, time: "13:20", belt: "2", status: "PROGRAMADO" }
    ]);

    const [departures, setDepartures] = useState([
        { airline: "LATAM", flight: "LA 101", destination: "SANTIAGO", date: TODAY_STR, time: "09:30", gate: "2", status: "FINALIZADO" },
        { airline: "SKY", flight: "H2 1715", destination: "CALAMA", date: TODAY_STR, time: "11:05", gate: "3", status: "EMBARCANDO" },
        { airline: "JETSMART", flight: "JA 206", destination: "SANTIAGO", date: TODAY_STR, time: "12:00", gate: "1", status: "PROGRAMADO" },
        { airline: "LATAM", flight: "LA 106", destination: "SANTIAGO", date: TODAY_STR, time: "14:10", gate: "2", status: "PROGRAMADO" }
    ]);

    useEffect(() => {
        const syncAirport = async () => {
            try {
                const res = await fetch('/api/airport-monitoring');
                const data = await res.json();
                if (data.arrivals) setArrivals(data.arrivals);
                if (data.departures) setDepartures(data.departures);
            } catch (e) { console.log("SCSE_AIRPORT: Worker offline, using cache."); }
        };
        syncAirport();
        const syncInt = setInterval(syncAirport, 600000); // 10 min
        return () => clearInterval(syncInt);
    }, []);
    const [activeTab, setActiveTab] = useState('arrivals');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Coordenadas Aeropuerto La Florida (La Serena)
    const airportPos = [-29.916, -71.199];

    const filteredFlights = (activeTab === 'arrivals' ? arrivals : departures).filter(f => 
        f.airline.toLowerCase().includes(search.toLowerCase()) || 
        f.flight.toLowerCase().includes(search.toLowerCase()) ||
        (f.origin || f.destination).toLowerCase().includes(search.toLowerCase())
    );

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
    };

    // Plane Icon for Map
    const planeIcon = new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/68/68380.png',
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        popupAnchor: [0, -10],
    });

    const activePlanes = [
        { id: 1, pos: [-29.85, -71.25], flight: "LA 100", type: "Arrival" },
        { id: 2, pos: [-29.98, -71.10], flight: "H2 1714", type: "Arrival" },
    ];

    return (
        <div className="airport-module animate-scale-in" style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex', flexDirection: 'column',
            padding: '1rem', overflowY: 'auto'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', maxWidth: '1200px', margin: '0 auto 1.5rem auto', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#38bdf8', padding: '0.8rem', borderRadius: '12px', boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}>
                        <Plane size={24} color="white" />
                    </div>
                    <div>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Aeropuerto La Florida (SCSE)</h2>
                        <span style={{ color: '#38bdf8', fontSize: '0.8rem', letterSpacing: '2px' }}>CONEXIÓN TRIPO 3D + OPENMAPS</span>
                    </div>
                </div>
                <button onClick={onClose} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                    <X size={24} color="white" />
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%', flex: 1 }}>
                
                {/* Panel Izquierdo: Vuelos */}
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '12px' }}>
                        <button 
                            onClick={() => setActiveTab('arrivals')}
                            style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: 'none', background: activeTab === 'arrivals' ? '#38bdf8' : 'transparent', color: activeTab === 'arrivals' ? 'black' : 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                            <PlaneLanding size={18} /> LLEGADAS
                        </button>
                        <button 
                            onClick={() => setActiveTab('departures')}
                            style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: 'none', background: activeTab === 'departures' ? '#38bdf8' : 'transparent', color: activeTab === 'departures' ? 'black' : 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                            <PlaneTakeoff size={18} /> SALIDAS
                        </button>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Search size={18} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input 
                            type="text" 
                            placeholder="Filtrar vuelo, ciudad o aerolínea..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none' }}
                        />
                    </div>

                    <div style={{ overflowX: 'auto', flex: 1 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#64748b', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>VUELO</th>
                                    <th style={{ padding: '1rem' }}>{activeTab === 'arrivals' ? 'ORIGEN' : 'DESTINO'}</th>
                                    <th style={{ padding: '1rem' }}>HORA</th>
                                    <th style={{ padding: '1rem' }}>ESTADO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFlights.map((f, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: 'bold' }}>{f.flight}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#38bdf8' }}>{f.airline}</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>{f.origin || f.destination}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <Clock size={14} color="#64748b" /> {f.time}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ 
                                                padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold',
                                                background: f.status === 'ATERRIZADO' || f.status === 'FINALIZADO' ? 'rgba(34, 197, 94, 0.2)' : 
                                                            f.status === 'EN VUELO' || f.status === 'EMBARCANDO' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                                                color: f.status === 'ATERRIZADO' || f.status === 'FINALIZADO' ? '#22c55e' : 
                                                       f.status === 'EN VUELO' || f.status === 'EMBARCANDO' ? '#38bdf8' : '#94a3b8'
                                            }}>
                                                {f.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button 
                        onClick={handleRefresh}
                        className="btn-glass" 
                        style={{ width: '100%', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: 'auto' }}
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Actualizar Datos en Vivo
                    </button>
                </div>

                {/* Panel Derecho: Mapa y Personaje */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Miniatura 3D / Satelital */}
                    <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', height: '300px', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 500, background: 'rgba(0,0,0,0.7)', padding: '5px 10px', borderRadius: '8px', color: 'white', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <MapIcon size={14} /> VISTA SATELITAL (MINIATURA PISTA)
                        </div>
                        <MapContainer center={airportPos} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false} scrollWheelZoom={false}>
                            <TileLayer
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
                            />
                            <Marker position={airportPos}>
                                <Popup>Terminal Aeropuerto La Florida</Popup>
                            </Marker>
                            {activePlanes.map(p => (
                                <Marker key={p.id} position={p.pos} icon={planeIcon}>
                                    <Popup>Vuelo {p.flight} - Acercándose</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 500 }}>
                            <button className="btn-glass" style={{ padding: '0.5rem', fontSize: '0.7rem' }}>Conectar Tripo Cloud</button>
                        </div>
                    </div>

                    {/* Flopy Host */}
                    <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', gap: '1.5rem', alignItems: 'center', flex: 1 }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(#38bdf8, #818cf8, #38bdf8)', padding: '3px' }}>
                                <img 
                                    src="https://api.dicebear.com/7.x/bottts/svg?seed=Flopy&backgroundColor=b6e3f4" 
                                    alt="Flopy" 
                                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', background: '#0f172a' }} 
                                />
                            </div>
                            <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: '#22c55e', width: '25px', height: '25px', borderRadius: '50%', border: '4px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                                <h4 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>Flopy</h4>
                                <span style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>GESTOR_AEROPUERTO</span>
                            </div>
                            <div className="glass-panel" style={{ padding: '1rem', position: 'relative', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <p style={{ margin: 0, color: '#bae6fd', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    "¡Hola! Soy Flopy. Te ayudo a monitorear los cielos de La Serena. Tenemos {filteredFlights.length} vuelos {activeTab === 'arrivals' ? 'llegando' : 'saliendo'} hoy. ¿Necesitas saber por qué puerta sale el de SKY?"
                                </p>
                                <div style={{ position: 'absolute', left: '-10px', top: '20px', width: '20px', height: '20px', background: 'rgba(0,0,0,0.4)', clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .animate-scale-in { animation: scaleIn 0.3s ease-out; }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
