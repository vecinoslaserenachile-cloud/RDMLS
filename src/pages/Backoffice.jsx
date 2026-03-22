import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { supabase } from '../utils/supabase';
import { socket } from '../utils/socket';
import { ShieldAlert, AlertTriangle, ShieldCheck, MapPin, Navigation, Droplets, Zap, Wifi, Mic, Activity, Car, Camera as CameraIcon, CheckCircle2, Send, History, LogOut, Megaphone, Radio as RadioIcon, Lock } from 'lucide-react';
import RadioBackofficeModal from '../components/RadioBackofficeModal';
import MartinSecurityShield from '../components/MartinSecurityShield';

// Fix para los iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente utilitario para cambiar la vista del mapa
function MapController({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom, { duration: 1.5 });
        }
    }, [center, zoom, map]);
    return null;
}

// Widget de Tiempo (Requisito Estricto)
function TimeWidget() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatoDia = new Intl.DateTimeFormat('es-CL', { weekday: 'long' }).format(time);
    const formatoFecha = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }).format(time);
    const formatoHora = new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(time);

    return (
        <div style={{ padding: '0.8rem', background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textTransform: 'capitalize', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{formatoDia}</span>, {formatoFecha}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white', fontFamily: 'monospace', letterSpacing: '1px' }}>
                {formatoHora}
            </div>
        </div>
    );
}

export default function Backoffice() {
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState([]);
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [mapCenter, setMapCenter] = useState([-29.90453, -71.24894]); // La Serena Default
    const [showReportModal, setShowReportModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState('todas'); // 'todas', 'servicios_basicos'
    const [showPowerOutageMap, setShowPowerOutageMap] = useState(false);
    const [showPatrols, setShowPatrols] = useState(true);
    const [showCCTV, setShowCCTV] = useState(true);
    const [showPushModal, setShowPushModal] = useState(false);
    const [pushForm, setPushForm] = useState({ title: '', body: '' });
    const [pushHistory, setPushHistory] = useState([]);
    const [vipsStatus, setVipsStatus] = useState([]);
    const [showRadioBackoffice, setShowRadioBackoffice] = useState(false);
    const [showSecurityShield, setShowSecurityShield] = useState(false);

    // Auth States
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user || null);
            setLoadingUser(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthError('');

        // 1. Acceso Directo Custom (Bypass para el admin) solicitado por User
        const allowedEmails = ['master@vecinosmart.cl', 'fabi@vecinosmart.cl', 'vecinosmart@gmail.com', 'vecinoslaserenachile@gmail.com'];
        if (allowedEmails.includes(loginData.email.toLowerCase()) && (loginData.password === 'admin2026' || loginData.password === 'admin123')) {
            setUser({ email: loginData.email, role: 'admin_backoffice' });
            localStorage.setItem('master_bypass', 'true');
            return;
        }

        // 2. Acceso regular vía Supabase
        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: loginData.email,
                password: loginData.password,
            });
            if (signInError) throw signInError;
        } catch (err) {
            setAuthError('Acceso denegado. Credenciales inválidas para Backoffice.');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    useEffect(() => {
        const saved = localStorage.getItem('smart_push_history');
        if (saved) setPushHistory(JSON.parse(saved));
        
        const savedVips = localStorage.getItem('smartls_vips_status');
        if (savedVips) setVipsStatus(JSON.parse(savedVips));
        
        const handleVipsSync = () => {
             const s = localStorage.getItem('smartls_vips_status');
             if(s) setVipsStatus(JSON.parse(s));
        };
        window.addEventListener('vips_updated', handleVipsSync);
        return () => window.removeEventListener('vips_updated', handleVipsSync);
    }, []);

    const [newReport, setNewReport] = useState({
        category: 'seguridad',
        subcategory: '',
        photo: null
    });

    // Filtros de servicios básicos requeridos en el audio
    const isServicioBasico = (cat) => ['ambiental', 'vialidad', 'telecom'].includes(cat?.toLowerCase());

    const filteredAlerts = alerts.filter(alert => {
        if (activeFilter === 'servicios_basicos') return isServicioBasico(alert.category);
        return true;
    });

    // Mapa de Cortes de Luz Simulados
    const powerOutages = [
        { id: 'C5', name: 'Sector C5 (Centro)', coords: [-29.904, -71.248], radius: 800, affected: 1540, eta: '2 Hrs' },
        { id: 'S2', name: 'Sector S2 (La Florida)', coords: [-29.920, -71.220], radius: 1200, affected: 3200, eta: '4 Hrs' }
    ];

    // Simulación de Patrullas GPS Municipales
    const patrolUnits = [
        { id: 'M-01', name: 'Móvil M-01 (Seguridad)', coords: [-29.902, -71.250], status: 'Ronda Preventiva' },
        { id: 'M-04', name: 'Móvil M-04 (Seguridad)', coords: [-29.910, -71.260], status: 'En Procedimiento' },
        { id: 'AM-2', name: 'Ambulancia SAPU', coords: [-29.908, -71.241], status: 'Base' }
    ];

    // Simulación Cámaras CCTV
    const cctvCameras = [
        { id: 'C-001', name: 'CCTV Av. de Aguirre', coords: [-29.905, -71.255] },
        { id: 'C-014', name: 'CCTV Faro Monumental', coords: [-29.903, -71.272] },
        { id: 'C-042', name: 'CCTV La Recova', coords: [-29.902, -71.247] }
    ];

    const territorialPills = [
        { id: 'centro', name: 'Centro Histórico', coords: [-29.9045, -71.2489] },
        { id: 'companias', name: 'Las Compañías', coords: [-29.8970, -71.2290] },
        { id: 'florida', name: 'La Florida', coords: [-29.9210, -71.2260] },
        { id: 'pampa', name: 'La Pampa', coords: [-29.9290, -71.2480] },
        { id: 'costero', name: 'Avenida del Mar', coords: [-29.9150, -71.2680] },
        { id: 'cerrogrande', name: 'Cerro Grande', coords: [-29.9400, -71.2150] },
        { id: 'alfalfares', name: 'Alfalfares', coords: [-29.9040, -71.1960] },
        { id: 'rural', name: 'Sector Rural (Algarrobito)', coords: [-29.9167, -71.1500] },
    ];

    useEffect(() => {
        socket.on('initial_state', (data) => {
            setAlerts(data);
        });

        socket.on('alert_broadcast', (newAlert) => {
            setAlerts(prev => [...prev, newAlert]);
            // AutoFocus y zoom al lugar de la alerta
            setSelectedAlert(newAlert);
            setMapCenter([newAlert.lat, newAlert.lng]);
        });

        return () => {
            socket.off('initial_state');
            socket.off('alert_broadcast');
        };
    }, []);

    const getCategoryColor = (cat) => {
        if (!cat) return '#3b82f6';
        const lowerCat = cat.toLowerCase();
        if (lowerCat === 'seguridad') return '#ef4444';
        if (lowerCat === 'animales') return '#f59e0b';
        if (lowerCat === 'sanitario') return '#0ea5e9';
        if (lowerCat === 'electrico') return '#eab308';
        if (lowerCat === 'telecom') return '#64748b';
        if (lowerCat === 'acustica') return '#8b5cf6';
        return '#3b82f6';
    };

    const getCategoryIcon = (cat) => {
        if (!cat) return <MapPin size={16} color="#3b82f6" />;
        const lowerCat = cat.toLowerCase();
        if (lowerCat === 'seguridad') return <AlertTriangle size={16} color="#ef4444" />;
        if (lowerCat === 'animales') return <ShieldCheck size={16} color="#f59e0b" />;
        if (lowerCat === 'sanitario') return <Droplets size={16} color="#0ea5e9" />;
        if (lowerCat === 'electrico') return <Zap size={16} color="#eab308" />;
        if (lowerCat === 'telecom') return <Wifi size={16} color="#64748b" />;
        if (lowerCat === 'acustica') return <Mic size={16} color="#8b5cf6" />;
        return <MapPin size={16} color="#3b82f6" />;
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewReport(prev => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendPush = (e) => {
        e.preventDefault();

        const newPush = {
            id: Date.now(),
            title: pushForm.title,
            body: pushForm.body,
            date: new Date().toLocaleString('es-CL'),
            status: 'Enviado'
        };

        socket.emit('send_push_notification', {
            title: pushForm.title,
            body: pushForm.body
        });

        setPushHistory(prev => {
            const updated = [newPush, ...prev];
            localStorage.setItem('smart_push_history', JSON.stringify(updated));
            return updated;
        });

        setPushForm({ title: '', body: '' });
        alert('Notificación enviada a la red vecinal exitosamente.');
    };

    const handleSubmitReport = (e) => {
        e.preventDefault();

        // Simular envío de alerta
        const fakeAlert = {
            id: Date.now().toString(),
            category: newReport.category,
            subcategory: newReport.subcategory || 'Reporte en Terreno',
            photo: newReport.photo,
            lat: mapCenter[0], // Usar la posición actual/seleccionada
            lng: mapCenter[1],
            timestamp: new Date().toISOString(),
            status: 'pending_triangulation',
            protocol: 'P-URGENTE'
        };

        socket.emit('new_alert', fakeAlert);

        // Cierre y limpieza
        setShowReportModal(false);
        setNewReport({ category: 'seguridad', subcategory: '', photo: null });
    };

    if (loadingUser) {
        return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}><div className="loader"></div></div>;
    }

    if (!user) {
        return (
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
                <div className="glass-panel animate-slide-up" style={{ padding: '3rem 2rem', width: '100%', maxWidth: '420px', textAlign: 'center', border: '1px solid var(--brand-primary)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                    <ShieldAlert size={64} color="var(--brand-primary)" style={{ margin: '0 auto 1.5rem' }} />
                    <h2 className="text-gradient" style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>Centro de Gestión / Puerta Serena</h2>
                    <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.4' }}>Autenticación estricta obligatoria para inspectores y personal en terreno.</p>
                    {authError && <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--alert-danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{authError}</div>}
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="email" placeholder="Correo Funcionario" required
                            value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                            className="input-base" style={{ padding: '1rem', width: '100%' }} />
                        <input type="password" placeholder="Contraseña Operativa" required
                            value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                            className="input-base" style={{ padding: '1rem', width: '100%' }} />
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1rem', fontWeight: 'bold' }}>Validar Identidad</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>

            {/* Sidebar - Liste de Alertas y Protocolos */}
            <aside style={{ width: '400px', background: 'var(--bg-primary)', borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', zIndex: 1000, boxShadow: '4px 0 15px rgba(0,0,0,0.5)' }}>
                {/* WIDGET DE TIEMPO OBLIGATORIO */}
                <TimeWidget />

                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h2 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, fontSize: '1.5rem' }}>
                            <ShieldAlert size={26} color="var(--brand-primary)" />
                            Centro de Gestión
                        </h2>
                        <div className="user-badge glass-panel" style={{ display: 'inline-flex', marginTop: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid #10b981', padding: '0.2rem 0.5rem' }}>
                            <CheckCircle2 size={12} style={{ marginRight: '4px' }} /> Central Activa
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Operador: {user.email}</div>
                    </div>
                    <button onClick={handleLogout} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }} title="Cerrar Sesión">
                        <LogOut size={18} color="var(--alert-danger)" />
                    </button>
                </div>

                {/* Filtros de Vistas (Capas de Inteligencia) */}
                <div style={{ padding: '1rem 1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--glass-border)' }}>
                    <p style={{ width: '100%', margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Capas de Visión Estratégica</p>
                    <button
                        className={`btn ${activeFilter === 'todas' && !showPowerOutageMap ? 'btn-primary' : 'btn-glass'}`}
                        style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', borderRadius: '8px' }}
                        onClick={() => { setActiveFilter('todas'); setShowPowerOutageMap(false); }}
                    >
                        General
                    </button>
                    <button
                        className={`btn ${activeFilter === 'servicios_basicos' ? 'btn-primary' : 'btn-glass'}`}
                        style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', background: activeFilter === 'servicios_basicos' ? '#eab308' : '', borderRadius: '8px' }}
                        onClick={() => { setActiveFilter('servicios_basicos'); setShowPowerOutageMap(false); }}
                    >
                        <Zap size={14} style={{ display: 'inline', marginRight: '4px' }} /> S. Básicos
                    </button>

                    {/* Botones de Capas Extra */}
                    <div style={{ width: '100%', display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button
                            className={`btn ${showPatrols ? 'btn-primary' : 'btn-glass'}`}
                            style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', background: showPatrols ? '#3b82f6' : 'rgba(59, 130, 246, 0.2)', borderRadius: '8px' }}
                            onClick={() => setShowPatrols(!showPatrols)}
                        >
                            <Car size={14} style={{ display: 'inline', marginRight: '4px' }} /> GPS Móviles
                        </button>
                        <button
                            className={`btn ${showCCTV ? 'btn-primary' : 'btn-glass'}`}
                            style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', background: showCCTV ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)', borderRadius: '8px' }}
                            onClick={() => setShowCCTV(!showCCTV)}
                        >
                            <CameraIcon size={14} style={{ display: 'inline', marginRight: '4px' }} /> Red CCTV
                        </button>
                    </div>

                    <button
                        className={`btn ${showPowerOutageMap ? 'btn-primary' : 'btn-glass'}`}
                        style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', background: showPowerOutageMap ? '#ef4444' : 'rgba(239, 68, 68, 0.2)', borderRadius: '8px', marginTop: '0.5rem' }}
                        onClick={() => { setShowPowerOutageMap(!showPowerOutageMap); setActiveFilter('todas'); }}
                    >
                        <Activity size={14} style={{ display: 'inline', marginRight: '4px' }} /> Mapa Cortes Eléctricos
                    </button>

                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', background: 'linear-gradient(45deg, #10b981, #047857)', borderRadius: '8px', marginTop: '0.5rem', border: '1px solid #10b981' }}
                        onClick={() => setShowPushModal(true)}
                    >
                        <ShieldAlert size={14} style={{ display: 'inline', marginRight: '4px' }} /> Notificar a Vecinos (App)
                    </button>

                    <button
                        className="btn btn-primary pulse-slow"
                        style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem', background: 'linear-gradient(90deg, #ec4899, #8b5cf6)', borderRadius: '8px', marginTop: '1rem', border: '1px solid #ec4899', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        onClick={() => navigate('/hub-comunicaciones')}
                    >
                        <Megaphone size={16} /> Hub Comunicaciones Externa
                    </button>
                    
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem', background: 'linear-gradient(90deg, #9333ea, #4f46e5)', borderRadius: '8px', marginTop: '0.5rem', border: '1px solid #9333ea', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}
                        onClick={() => navigate('/protocolo')}
                    >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={16} /> Inteligencia Protocolar</span>
                        {vipsStatus.length > 0 && (
                            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.1rem 0.5rem', borderRadius: '10px', fontSize: '0.7rem' }}>
                                VIPs: {vipsStatus.filter(v => v.estado === 'presente').length}/{vipsStatus.length}
                            </span>
                        )}
                    </button>

                    <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '1rem 0', paddingTop: '1rem' }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#38bdf8', fontWeight: 'bold' }}>SISTEMAS ESTRATÉGICOS Radio VLS</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <button
                                className="btn btn-glass"
                                style={{ padding: '0.8rem 0.5rem', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', border: '1px solid #f97316', background: 'rgba(249, 115, 22, 0.1)' }}
                                onClick={() => setShowRadioBackoffice(true)}
                            >
                                <RadioIcon size={20} color="#f97316" />
                                <span>Gestión Radio</span>
                            </button>
                            <button
                                className="btn btn-glass"
                                style={{ padding: '0.8rem 0.5rem', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.1)' }}
                                onClick={() => navigate('/hub-comunicaciones')}
                            >
                                <Megaphone size={20} color="#10b981" />
                                <span>Hub Multimedia</span>
                            </button>
                            <button
                                className="btn btn-glass"
                                style={{ padding: '0.8rem 0.5rem', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.1)' }}
                                onClick={() => setShowSecurityShield(true)}
                            >
                                <Lock size={20} color="#ef4444" />
                                <span>Seguridad CF</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Lista de Alertas */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                            {showPowerOutageMap ? 'Cortes Activos' : 'Alertas Activas'} ({showPowerOutageMap ? powerOutages.length : filteredAlerts.length})
                        </h3>
                    </div>

                    {showPowerOutageMap ? (
                        // Vista Especial Cortes Eléctricos
                        powerOutages.map(outage => (
                            <div key={outage.id} className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid #ef4444', background: 'rgba(239, 68, 68, 0.1)', cursor: 'pointer' }} onClick={() => setMapCenter(outage.coords)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                    <span>{outage.name}</span>
                                    <span style={{ color: '#ef4444' }}>CAÍDO</span>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Afectados: {outage.affected} clientes</div>
                                <div style={{ fontSize: '0.85rem', color: '#eab308' }}>Reparación estimada: {outage.eta}</div>
                            </div>
                        ))
                    ) : filteredAlerts.length === 0 ? (
                        <p className="text-muted" style={{ fontSize: '0.9rem', textAlign: 'center', marginTop: '2rem' }}>Monitoreando macro-zona...</p>
                    ) : (
                        filteredAlerts.map(alert => (
                            <div
                                key={alert.id}
                                className={`glass-panel ${selectedAlert?.id === alert.id ? 'active-alert' : ''}`}
                                style={{
                                    padding: '1rem',
                                    cursor: 'pointer',
                                    borderLeft: `4px solid ${getCategoryColor(alert.category)}`,
                                    background: selectedAlert?.id === alert.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                                    opacity: alert.status === 'pending_triangulation' ? 0.6 : 1
                                }}
                                onClick={() => { setSelectedAlert(alert); setMapCenter([alert.lat, alert.lng]); }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                        {getCategoryIcon(alert.category)}
                                        <span style={{ textTransform: 'capitalize' }}>{alert.category}</span>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        {new Date(alert.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.9rem' }}>{alert.subcategory}</div>
                                {alert.db && <div style={{ fontSize: '0.8rem', color: 'var(--alert-warning)', marginTop: '0.2rem' }}>🎤 Nivel Acústico: {alert.db}dB</div>}
                                <div style={{ marginTop: '0.5rem', display: 'inline-block', padding: '0.2rem 0.5rem', background: 'var(--bg-primary)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', color: alert.status === 'pending_triangulation' ? 'var(--alert-warning)' : 'var(--brand-accent)' }}>
                                    {alert.status === 'pending_triangulation' ? '⏳ Triangulando...' : `Protocolo: ${alert.protocol || 'P-GEN'}`}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Chat / Detalles */}
                <div style={{ height: '35%', borderTop: '1px solid var(--glass-border)', padding: '1.5rem', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Detalle y Contacto</h3>
                    {!selectedAlert ? (
                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>Seleccione una incidencia para visualizar evidencia o interactuar.</p>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {selectedAlert.photo ? (
                                    <img src={selectedAlert.photo} alt="Evidencia" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--glass-border)' }} />
                                ) : (
                                    <div style={{ width: '80px', height: '80px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>Sin<br />Foto</div>
                                )}
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>{selectedAlert.subcategory}</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lat: {selectedAlert.lat?.toFixed(5)}</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lng: {selectedAlert.lng?.toFixed(5)}</p>
                                    {selectedAlert.db && <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--alert-warning)' }}>DB: {selectedAlert.db} 🔊</p>}
                                </div>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.9rem' }}>Iniciar Chat Seguro</button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Map Area */}
            <main style={{ flex: 1, position: 'relative' }}>
                {/* Expansión Territorial Flotante (Botones Pastilla) */}
                <div style={{ position: 'absolute', top: '20px', left: '50px', zIndex: 1000, display: 'flex', gap: '0.5rem', flexWrap: 'wrap', maxWidth: '80%' }}>
                    <div style={{ background: 'var(--glass-bg)', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '1rem', color: 'white', border: '1px solid var(--glass-border)' }}>
                        <Navigation size={18} color="var(--brand-primary)" /> Expansión Territorial
                    </div>
                    {territorialPills.map(pill => (
                        <button
                            key={pill.id}
                            className="btn btn-glass"
                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '99px', background: 'rgba(15, 23, 42, 0.8)' }}
                            onClick={() => setMapCenter(pill.coords)}
                        >
                            {pill.name}
                        </button>
                    ))}
                </div>

                <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                    <MapController center={mapCenter} zoom={13} />
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />

                    {/* Render Markers for each alert (si NO estamos en mapa de cortes eléctricos) */}
                    {!showPowerOutageMap && filteredAlerts.map(alert => (
                        alert.lat && alert.lng && (
                            <React.Fragment key={alert.id}>
                                <CircleMarker
                                    center={[alert.lat, alert.lng]}
                                    pathOptions={{ fillColor: getCategoryColor(alert.category), color: getCategoryColor(alert.category), fillOpacity: 0.6, weight: 2 }}
                                    radius={15}
                                    className="pulse"
                                />
                                <Marker position={[alert.lat, alert.lng]}>
                                    <Popup>
                                        <div style={{ color: '#000', fontFamily: 'sans-serif' }}>
                                            <strong style={{ textTransform: 'uppercase', color: getCategoryColor(alert.category) }}>{alert.subcategory}</strong><br />
                                            <span style={{ fontSize: '0.8rem', color: '#666' }}>{new Date(alert.timestamp).toLocaleTimeString()}</span><br />
                                            Protocolo: <b>{alert.protocol}</b>
                                        </div>
                                    </Popup>
                                </Marker>
                            </React.Fragment>
                        )
                    ))}

                    {/* Render Patrullas GPS */}
                    {showPatrols && !showPowerOutageMap && patrolUnits.map(unit => (
                        <React.Fragment key={unit.id}>
                            <CircleMarker
                                center={unit.coords}
                                pathOptions={{ fillColor: '#3b82f6', color: '#60a5fa', fillOpacity: 1, weight: 3 }}
                                radius={8}
                            />
                            <Marker position={unit.coords}>
                                <Popup><div style={{ color: '#000' }}><strong>{unit.name}</strong><br />Estado: {unit.status}</div></Popup>
                            </Marker>
                        </React.Fragment>
                    ))}

                    {/* Render Cámaras CCTV */}
                    {showCCTV && !showPowerOutageMap && cctvCameras.map(cam => (
                        <React.Fragment key={cam.id}>
                            <CircleMarker
                                center={cam.coords}
                                pathOptions={{ fillColor: '#8b5cf6', color: '#a78bfa', fillOpacity: 0.8, weight: 2 }}
                                radius={6}
                            />
                            <Marker position={cam.coords}>
                                <Popup><div style={{ color: '#000' }}><strong>{cam.name}</strong><br />Transmisión: En Vivo (Segura)</div></Popup>
                            </Marker>
                        </React.Fragment>
                    ))}

                    {/* Render Mapa Cortes Eléctricos */}
                    {showPowerOutageMap && powerOutages.map(outage => (
                        <React.Fragment key={outage.id}>
                            <CircleMarker
                                center={outage.coords}
                                pathOptions={{ fillColor: '#ef4444', color: '#ef4444', fillOpacity: 0.3, weight: 2 }}
                                radius={outage.radius / 15} // Escala visual aproximada
                            />
                            <Marker position={outage.coords}>
                                <Popup>
                                    <div style={{ color: '#000' }}>
                                        <strong>{outage.name}</strong><br />
                                        Afectados: {outage.affected} clientes<br />
                                        ETA Reparación: <span style={{ color: '#d97706', fontWeight: 'bold' }}>{outage.eta}</span>
                                    </div>
                                </Popup>
                            </Marker>
                        </React.Fragment>
                    ))}
                </MapContainer>

                {/* FAB (Floating Action Button) para Portal Móvil / Terreno */}
                <button
                    className="btn btn-primary"
                    style={{
                        position: 'absolute',
                        bottom: '30px',
                        right: '30px',
                        zIndex: 1000,
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        padding: 0
                    }}
                    onClick={() => setShowReportModal(true)}
                    title="Registro In Situ"
                >
                    <Mic size={24} style={{ display: 'none' }} /> {/* just an invisible placeholder */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                        <circle cx="12" cy="13" r="3"></circle>
                    </svg>
                </button>
            </main>

            {/* Modal de Registro in situ */}
            {showReportModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-panel scale-in" style={{ width: '90%', maxWidth: '400px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>Registro en Terreno</h3>
                            <button className="btn-glass" onClick={() => setShowReportModal(false)} style={{ padding: '0.2rem 0.5rem' }}>X</button>
                        </div>

                        <form onSubmit={handleSubmitReport} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Capturar Evidencia (Cámara)</label>
                                <div style={{ position: 'relative', width: '100%', height: '150px', border: '2px dashed var(--glass-border)', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}>
                                    {newReport.photo ? (
                                        <img src={newReport.photo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                            <p style={{ margin: 0, fontSize: '0.9rem' }}>Toque para usar la cámara</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        onChange={handlePhotoUpload}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Categoría de la Incidencia</label>
                                <select
                                    className="input-base"
                                    style={{ width: '100%', appearance: 'auto' }}
                                    value={newReport.category}
                                    onChange={(e) => setNewReport(prev => ({ ...prev, category: e.target.value }))}
                                >
                                    <option value="seguridad">🚨 Convivencia y Seguridad</option>
                                    <option value="ambiental">💧 Gestión Ambiental</option>
                                    <option value="vialidad">⚡ Infraestructura y Vialidad</option>
                                    <option value="areasverdes">🌳 Áreas Verdes</option>
                                    <option value="acustica">🔊 Ruido Molesto</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Detalle / Subcategoría</label>
                                <input
                                    type="text"
                                    className="input-base"
                                    placeholder="Ej. Luminaria apagada, Robo..."
                                    style={{ width: '100%' }}
                                    value={newReport.subcategory}
                                    onChange={(e) => setNewReport(prev => ({ ...prev, subcategory: e.target.value }))}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.8rem', fontWeight: 'bold' }}>
                                Emitir Alerta In-Situ
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para Enviar Notificaciones Push */}
            {showPushModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-panel scale-in" style={{ width: '90%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid #10b981' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Send size={24} /> Red Vecinal: Centro de Mensajería</h3>
                            <button className="btn-glass" onClick={() => setShowPushModal(false)} style={{ padding: '0.2rem 0.5rem' }}>X</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '2rem' }}>
                            {/* Formulario Envío */}
                            <form onSubmit={handleSendPush} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Nueva Alerta</h4>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Título de la Alerta</label>
                                    <input
                                        type="text"
                                        className="input-base"
                                        placeholder="Ej. Precaución: Lluvias intensas"
                                        style={{ width: '100%', border: '1px solid rgba(16, 185, 129, 0.4)' }}
                                        value={pushForm.title}
                                        onChange={(e) => setPushForm(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Mensaje a Vecinos</label>
                                    <textarea
                                        className="input-base"
                                        placeholder="Detalles de la notificación que llegará al celular de los vecinos..."
                                        style={{ width: '100%', minHeight: '100px', resize: 'vertical', border: '1px solid rgba(16, 185, 129, 0.4)' }}
                                        value={pushForm.body}
                                        onChange={(e) => setPushForm(prev => ({ ...prev, body: e.target.value }))}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <Send size={18} /> Enviar Push Mundial
                                </button>
                            </form>

                            {/* Historial */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
                                <h4 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><History size={18} /> Historial de Envío</h4>
                                {pushHistory.length === 0 ? (
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>No hay alertas enviadas previamente.</div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '350px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                                        {pushHistory.map(history => (
                                            <div key={history.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                                    <strong style={{ fontSize: '0.9rem', color: '#10b981' }}>{history.title}</strong>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{history.date}</span>
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>{history.body}</div>
                                                <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#38bdf8' }}>✓ Entregado a dispositivos vecinos activos</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        .active-alert { border-color: var(--brand-primary) !important; }
        .leaflet-popup-content-wrapper { border-radius: 8px; }
      `}</style>
        </div>
    );
}
