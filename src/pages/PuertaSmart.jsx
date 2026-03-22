import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, MapPin, Search, ShieldCheck, CheckCircle2, User, Building, 
    ShieldAlert, BarChart4, DoorOpen, Save, FileDown, Lock, Users, 
    MessageSquare, Settings, TrendingUp, Calendar, Zap, Share2, 
    Clock, Smartphone, Shield, Star, ExternalLink, Filter, Database, 
    Activity, ChevronRight, X, AlertTriangle, Info, Coffee, HelpCircle,
    Bell, ClipboardList, Eye, Download, ShieldClose, HardDrive
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

// ==================================================================================================
// CONSTANTES INSTITUCIONALES Y CONFIGURACIÓN TERRITORIAL
// ==================================================================================================

const INFRAESTRUCTURA_IMLS = {
    "Edificio Consistorial (Prat 451)": { dotacion: true, icono: "🏛️", zona: "Casco Histórico", id: "EC-01", capacidad: 150 },
    "Edificio Carrera (Prat esq. Matta)": { dotacion: true, icono: "🏢", zona: "Casco Histórico", id: "EC-02", capacidad: 120 },
    "Edificio Balmaceda (Ex-Aduana)": { dotacion: true, icono: "🏫", zona: "Casco Histórico", id: "EB-03", capacidad: 90 },
    "Dirección de Tránsito": { dotacion: true, icono: "🚦", zona: "Servicios", id: "DT-04", capacidad: 200 },
    "DIDECO (Almagro 450)": { dotacion: true, icono: "🤝", zona: "Social", id: "DI-05", capacidad: 180 },
    "Delegación Municipal Las Compañías": { dotacion: true, icono: "🏘️", zona: "Norte", id: "DLC-06", capacidad: 150 },
    "Delegación Municipal La Antena": { dotacion: false, icono: "📡", zona: "Oriente", id: "DLA-07", capacidad: 80 },
    "Delegación Municipal La Pampa": { dotacion: false, icono: "🌳", zona: "Sur", id: "DLP-08", capacidad: 80 },
    "Delegación Avenida del Mar": { dotacion: true, icono: "🏖️", zona: "Costa", id: "DAM-09", capacidad: 50 },
    "Delegación Rural (Algarrobito)": { dotacion: false, icono: "🚜", zona: "Rural", id: "DR-10", capacidad: 40 },
    "Coliseo Monumental": { dotacion: true, icono: "🏀", zona: "Deportes", id: "CM-11", capacidad: 500 },
    "Polideportivo Las Compañías": { dotacion: true, icono: "🏋️", zona: "Deportes", id: "PLC-12", capacidad: 200 },
    "Parque Pedro de Valdivia (Admin)": { dotacion: true, icono: "🦌", zona: "Recreación", id: "PPV-13", capacidad: 100 },
    "Juzgado de Policía Local": { dotacion: true, icono: "⚖️", zona: "Justicia", id: "JPL-14", capacidad: 110 },
    "Taller Municipal": { dotacion: false, icono: "🛠️", zona: "Operativa", id: "TM-15", capacidad: 60 },
    "Centro Cultural Santa Inés": { dotacion: false, icono: "🎨", zona: "Cultura", id: "CSI-16", capacidad: 150 },
    "Estadio La Portada (Admin)": { dotacion: true, icono: "⚽", zona: "Deportes", id: "ELP-17", capacidad: 300 }
};

const LISTADO_DEPARTAMENTOS = [
    "Alcaldía", "Secretaría Municipal", "Administración Municipal",
    "Dirección de Obras (DOM)", "Dirección de Tránsito", "DIDECO - Social",
    "Dirección Jurídica", "Comunicaciones y RR.PP.", "Turismo y Patrimonio",
    "Cultura y Artes", "Seguridad Ciudadana", "Finanzas y Tesorería",
    "SECPLAN", "Relaciones Internacionales", "Oficina de la Vivienda", 
    "Oficina Adulto Mayor", "Departamento de Educación", "Salud Municipal"
];

const PERFILES_SGAAC = [
    "Vecino(a) de La Serena", "Dirigente Social / JJVV", "Autoridad Pública", 
    "Funcionario Municipal", "Proveedor Externo", "Prensa / Medios", "Delegación"
];

const AVISOS_PROMO = [
    "🏛️ Mientras coordinamos su ingreso, admire nuestro Casco Histórico, Patrimonio Nacional.",
    "🌳 Disfrute la brisa en nuestra Plaza de Armas, joya del urbanismo serenense.",
    "☕ Calle Prat ofrece excelentes cafés para una espera amena y productiva.",
    "⛪ La Serena es la 'Ciudad de los Campanarios'. Descubra nuestra historia.",
    "🛍️ La Recova está a pocos pasos; artesanía, papaya y sabores únicos de nuestra tierra.",
    "🌊 Recuerde visitar la Avenida del Mar, el polo turístico más importante del norte."
];

// ==================================================================================================
// COMPONENTE PRINCIPAL: PUERTA SMART (PRO)
// ==================================================================================================

export default function PuertaSmart() {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('citizen'); // citizen, monitor, admin
    const [activeAdminTab, setActiveAdminTab] = useState('dashboard'); // dashboard, guard, secretary, analytics, crm, logs
    
    // Configuración de Marca
    const [orgName, setOrgName] = useState(localStorage.getItem('smart_custom_config') ? JSON.parse(localStorage.getItem('smart_custom_config')).orgName : 'I.M. La Serena');
    const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('smart_custom_config') ? JSON.parse(localStorage.getItem('smart_custom_config')).primaryColor : '#1e3a8a');

    // --- ESTADO GLOBAL PUERTA SMART ---
    const [waitingRoom, setWaitingRoom] = useState(() => {
        const saved = localStorage.getItem('puerta_smart_waiting_room');
        return saved ? JSON.parse(saved) : {};
    });

    const [auditLogs, setAuditLogs] = useState(() => {
        const saved = localStorage.getItem('puerta_smart_audit_logs');
        return saved ? JSON.parse(saved) : [`[${new Date().toLocaleString()}] SISTEMA PUERTA SMART ACTIVO - NODO SEGURIDAD OPERATIVO`];
    });

    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('puerta_smart_history');
        if (saved) return JSON.parse(saved);
        
        // Generar datos históricos mock si no hay
        const mockData = [];
        const now = new Date();
        for (let i = 0; i < 200; i++) {
            const date = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
            mockData.push({
                id: `VIS-${100000 + i}`,
                fecha: date.toISOString(),
                recinto: Object.keys(INFRAESTRUCTURA_IMLS)[Math.floor(Math.random() * Object.keys(INFRAESTRUCTURA_IMLS).length)],
                depto: LISTADO_DEPARTAMENTOS[Math.floor(Math.random() * LISTADO_DEPARTAMENTOS.length)],
                perfil: PERFILES_SGAAC[Math.floor(Math.random() * PERFILES_SGAAC.length)],
                visitante: "REGISTRO HISTÓRICO",
                rut: "12.XXX.XXX-X",
                telefono: "+56 9 " + Math.floor(10000000 + Math.random() * 90000000),
                email: "contacto@smart.cl",
                permanencia: Math.floor(5 + Math.random() * 85),
                nps: Math.floor(3 + Math.random() * 3),
                estado: "Completado",
                validador: "Guardia Turno A"
            });
        }
        return mockData;
    });

    // --- PERSISTENCIA ---
    useEffect(() => {
        localStorage.setItem('puerta_smart_waiting_room', JSON.stringify(waitingRoom));
    }, [waitingRoom]);

    useEffect(() => {
        localStorage.setItem('puerta_smart_audit_logs', JSON.stringify(auditLogs));
    }, [auditLogs]);

    useEffect(() => {
        localStorage.setItem('puerta_smart_history', JSON.stringify(history));
    }, [history]);

    // --- MOTOR DE AUDITORÍA ---
    const addLog = (msg) => {
        const stamp = new Date().toLocaleString();
        setAuditLogs(prev => [`[${stamp}] ${msg}`, ...prev].slice(0, 500));
    };

    // --- LÓGICA DE CIEMPO (TIMER) ---
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setWaitingRoom(prev => {
                const updated = { ...prev };
                let changed = false;
                Object.keys(updated).forEach(uid => {
                    const info = updated[uid];
                    if (info.estado === 'COORDINANDO') {
                        const diff = (now - new Date(info.inicio)) / 1000;
                        if (diff >= 180) { // 3 minutos timeout
                            updated[uid].estado = 'EXPIRADO';
                            changed = true;
                            addLog(`TIMEOUT AUTOMÁTICO: ${info.nombre} en ${info.recinto}`);
                        }
                    }
                });
                return changed ? updated : prev;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // --- HANDLERS ---
    const registerVisitor = (data) => {
        const uid = `V-${Date.now()}`;
        const info = {
            ...data,
            id: uid,
            inicio: new Date().toISOString(),
            estado: 'COORDINANDO',
            assisted: INFRAESTRUCTURA_IMLS[data.recinto].dotacion,
            inicio_reunion: null,
            fin_reunion: null,
            nps: 5
        };
        setWaitingRoom(prev => ({ ...prev, [uid]: info }));
        addLog(`NUEVO REGISTRO: ${data.nombre} en ${data.recinto} -> ${data.depto}`);
        return uid;
    };

    const updateStatus = (uid, newStatus) => {
        setWaitingRoom(prev => {
            if (!prev[uid]) return prev;
            const updated = { ...prev[uid], estado: newStatus };
            if (newStatus === 'EN_REUNION') updated.inicio_reunion = new Date().toISOString();
            if (newStatus === 'EVALUACION') updated.fin_reunion = new Date().toISOString();
            return { ...prev, [uid]: updated };
        });
        addLog(`CAMBIO ESTADO [${uid}]: ${newStatus}`);
    };

    const completeSession = (uid, nps) => {
        const info = waitingRoom[uid];
        if (!info) return;
        
        const permanencia = info.inicio_reunion && info.fin_reunion 
            ? Math.floor((new Date(info.fin_reunion) - new Date(info.inicio_reunion)) / 60000)
            : 15;

        const newEntry = {
            ...info,
            nps: nps,
            estado: 'Completado',
            permanencia,
            validador: info.assisted ? 'Guardia Turno Activo' : 'Autónomo'
        };

        setHistory(prev => [newEntry, ...prev]);
        setWaitingRoom(prev => {
            const up = { ...prev };
            delete up[uid];
            return up;
        });
        addLog(`SESIÓN FINALIZADA Y ARCHIVADA: ${info.nombre}`);
    };

    // --- VIEWS ---

    return (
        <div className="puerta-smart-pro" style={{ 
            minHeight: '100vh', 
            background: '#ffffff', // Fondo sólido blanco para evitar dark mode accidental
            color: '#001f3f',
            fontFamily: "'Outfit', sans-serif"
        }}>
            {/* Header Soberano (Titanium Style) */}
            <div style={{ background: primaryColor, padding: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => navigate('/welcome')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.8rem', borderRadius: '50%', color: 'white', cursor: 'pointer' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>Puerta Smart v4.9</h1>
                        <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>{orgName} | Misión Crítica</p>
                    </div>
                </div>
                
                {/* Navigation Desktop */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <TabButton active={activeView === 'citizen'} label="Ciudadano" icon={<Smartphone size={18} />} onClick={() => setActiveView('citizen')} color={primaryColor} />
                    <TabButton active={activeView === 'monitor'} label="Monitor" icon={<Eye size={18} />} onClick={() => setActiveView('monitor')} color={primaryColor} />
                    <TabButton active={activeView === 'admin'} label="Gestión" icon={<Shield size={18} />} onClick={() => setActiveView('admin')} color={primaryColor} />
                </div>
            </div>

            <main style={{ padding: '1rem', maxWidth: '1400px', margin: '0 auto' }}>
                {activeView === 'citizen' && <CitizenNode register={registerVisitor} update={updateStatus} complete={completeSession} current={waitingRoom} primaryColor={primaryColor} />}
                {activeView === 'monitor' && <MonitorNode current={waitingRoom} primaryColor={primaryColor} />}
                {activeView === 'admin' && (
                    <AdminNode 
                        tab={activeAdminTab} 
                        setTab={setActiveAdminTab} 
                        current={waitingRoom} 
                        history={history} 
                        logs={auditLogs} 
                        update={updateStatus} 
                        complete={completeSession}
                        primaryColor={primaryColor} 
                    />
                )}
            </main>

            {/* Footer Footer */}
            <footer style={{ padding: '2rem', textAlign: 'center', background: '#f8fafc', color: '#64748b' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                   <img src="/logo-smartls-v3.png" alt="SGAAC" style={{ height: '30px', opacity: 0.5 }} />
                   <div style={{ width: '2px', height: '30px', background: '#e2e8f0' }} />
                   <ShieldCheck size={30} opacity={0.5} />
                </div>
                <p style={{ fontWeight: 'bold' }}>SGAAC-360 Version Platinum | Smart City Chile</p>
                <p style={{ fontSize: '0.8rem' }}>Registro Inmutable de Transacciones Operativas</p>
            </footer>
        </div>
    );
}

// ==================================================================================================
// SUB-COMPONENTES (LOS 7 NODOS)
// ==================================================================================================

// --- NODO I: CIUDADANO (PÓRTICO QR / REGISTRO) ---
function CitizenNode({ register, update, complete, current, primaryColor }) {
    const [step, setStep] = useState('form'); // form, tracking, result
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '', rut: '', recinto: Object.keys(INFRAESTRUCTURA_IMLS)[0],
        depto: LISTADO_DEPARTAMENTOS[0], perfil: PERFILES_SGAAC[0], motivo: ''
    });

    const activeVisitor = token ? current[token] : null;

    useEffect(() => {
        if (activeVisitor) {
            if (activeVisitor.estado === 'EXPIRADO') setStep('form');
        }
    }, [activeVisitor]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.rut) return alert("Por favor complete nombre y RUT");
        const uid = register(formData);
        setToken(uid);
        setStep('tracking');
    };

    if (activeVisitor && (activeVisitor.estado === 'AUTORIZADO' || activeVisitor.estado === 'EN_REUNION' || activeVisitor.estado === 'EVALUACION' || activeVisitor.estado === 'SALIDA_PENDIENTE')) {
        return (
            <div className="glass-panel-white animate-fade-in" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
                {activeVisitor.estado === 'AUTORIZADO' && (
                    <>
                        <CheckCircle2 color="#10b981" size={80} style={{ margin: '0 auto 2rem' }} />
                        <h2 style={{ fontSize: '2.5rem', color: '#10b981', fontWeight: '900' }}>¡PASE ADELANTE!</h2>
                        <h3 style={{ margin: '1rem 0' }}>Hola, {activeVisitor.nombre.split(' ')[0]}</h3>
                        <p style={{ fontSize: '1.2rem' }}>Su ingreso a <strong>{activeVisitor.recinto}</strong> ha sido validado.</p>
                        <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '16px', border: '2px solid #10b981', margin: '2rem 0' }}>
                            <p style={{ fontWeight: '900', margin: 0 }}>Diríjase a: {activeVisitor.depto}</p>
                        </div>
                        {!activeVisitor.assisted && (
                            <button onClick={() => update(token, 'EN_REUNION')} className="action-btn" style={{ background: primaryColor }}>
                                YA INGRESÉ A LA OFICINA
                            </button>
                        )}
                        {activeVisitor.assisted && (
                            <div className="instruction-box-white">
                                <Shield size={24} color={primaryColor} />
                                <span>Por favor, presente su RUT al guardia para validar la entrada física.</span>
                            </div>
                        )}
                    </>
                )}

                {activeVisitor.estado === 'EN_REUNION' && (
                    <>
                        <Clock color={primaryColor} size={80} className="animate-pulse" style={{ margin: '0 auto 2rem' }} />
                        <h2 style={{ fontSize: '2rem', fontWeight: '900' }}>USTED ESTÁ EN REUNIÓN</h2>
                        <p style={{ fontSize: '1.1rem', color: '#64748b' }}>La secretaría finalizará su atención en el sistema cuando el trámite termine.</p>
                        <div className="instruction-box-white" style={{ marginTop: '2rem' }}>
                            <Lock size={20} />
                            <span>Su tiempo está siendo contabilizado por transparencia y seguridad ciudadana.</span>
                        </div>
                    </>
                )}

                {activeVisitor.estado === 'EVALUACION' && (
                    <>
                        <div style={{ background: primaryColor, color: 'white', padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                           <h2 style={{ margin: 0, fontSize: '2rem', color: 'white' }}>¡REUNIÓN FINALIZADA!</h2>
                        </div>
                        <h3 style={{ marginBottom: '2rem' }}>¿Cómo evalúa la atención recibida?</h3>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '3rem' }}>
                            {[1, 2, 3, 4, 5].map(star => (
                                <button 
                                    key={star} 
                                    onClick={() => complete(token, star)}
                                    style={{ fontSize: '3rem', cursor: 'pointer', background: 'none', border: 'none' }}
                                >
                                    ⭐
                                </button>
                            ))}
                        </div>
                        <button onClick={() => complete(token, 5)} className="action-btn" style={{ background: primaryColor }}>ENVIAR Y SALIR</button>
                    </>
                )}

                {activeVisitor.estado === 'SALIDA_PENDIENTE' && (
                    <>
                        <DoorOpen color="#ef4444" size={80} style={{ margin: '0 auto 2rem' }} />
                        <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#ef4444' }}>SALIDA AUTORIZADA</h2>
                        <p style={{ fontSize: '1.1rem' }}>Gracias por visitarnos. Por favor, diríjase a la salida del recinto.</p>
                        {!activeVisitor.assisted && (
                            <button onClick={() => complete(token, 5)} className="action-btn" style={{ background: '#ef4444', marginTop: '2rem' }}>YA SALÍ DEL RECINTO</button>
                        )}
                        {activeVisitor.assisted && (
                            <div className="instruction-box-white" style={{ borderColor: '#ef4444' }}>
                                <ShieldClose size={24} color="#ef4444" />
                                <span>No olvide avisar al guardia al salir para cerrar su ciclo de seguridad.</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }

    if (step === 'tracking') {
        const timeDiff = token ? Math.max(0, 180 - Math.floor((new Date() - new Date(current[token]?.inicio)) / 1000)) : 0;
        return (
            <div className="glass-panel-white scale-in" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
                <Smartphone color={primaryColor} size={64} style={{ margin: '0 auto 1.5rem' }} />
                <h2 style={{ fontWeight: '900', color: primaryColor }}>COORDINANDO INGRESO...</h2>
                <p>Avisando a la oficina de <strong>{formData.depto}</strong> en <strong>{formData.recinto}</strong>.</p>
                
                <div style={{ fontSize: '6rem', fontWeight: '900', color: timeDiff < 30 ? '#ef4444' : primaryColor, margin: '2rem 0', fontFamily: 'monospace', border: '10px solid', borderColor: timeDiff < 30 ? '#ef4444' : primaryColor, borderRadius: '30px', padding: '10px' }}>
                    {timeDiff}s
                </div>

                <p style={{ fontWeight: 'bold' }}>Por favor, espere la validación en esta pantalla.</p>

                <div className="promo-box" style={{ marginTop: '3rem' }}>
                    <h4 style={{ color: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Coffee size={18} /> ¿Por qué no aprovechar el tiempo?
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{AVISOS_PROMO[Math.floor(Math.random() * AVISOS_PROMO.length)]}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="citizen-form-view scale-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="form-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <ShieldCheck color={primaryColor} size={64} style={{ margin: '0 auto 1rem' }} />
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>PUERTA SMART</h2>
                <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Formulario Oficial de Registro y Control de Audiencias</p>
            </div>

            <div className="instruction-box-white" style={{ background: '#f8fafc', borderLeft: `10px solid ${primaryColor}`, marginBottom: '2rem' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: primaryColor }}>Estimado Vecino(a) o Visitante:</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontWeight: 'bold', lineHeight: '1.6' }}>
                    <li>Seleccione el edificio donde se encuentra.</li>
                    <li>Ingrese sus datos personales fidedignos.</li>
                    <li>Indique la oficina a la que desea acudir.</li>
                    <li>Solicite su validación en el botón inferior.</li>
                </ul>
            </div>

            <form onSubmit={handleSubmit} className="glass-panel-white" style={{ background: '#fff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="input-group">
                        <label className="titanium-label">1. Edificio o Recinto:</label>
                        <select value={formData.recinto} onChange={e => setFormData({ ...formData, recinto: e.target.value })} className="titanium-input">
                            {Object.keys(INFRAESTRUCTURA_IMLS).map(r => <option key={r} value={r}>{INFRAESTRUCTURA_IMLS[r].icono} {r}</option>)}
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="titanium-label">2. Categoría de Visitante:</label>
                        <select value={formData.perfil} onChange={e => setFormData({ ...formData, perfil: e.target.value })} className="titanium-input">
                            {PERFILES_SGAAC.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                </div>

                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="titanium-label">3. Nombre y Apellidos Completos:</label>
                    <input type="text" placeholder="Ej: Juan Pérez Soto" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} className="titanium-input" />
                </div>

                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="titanium-label">4. RUT o Identificación:</label>
                    <input type="text" placeholder="12.345.678-9" value={formData.rut} onChange={e => setFormData({ ...formData, rut: e.target.value })} className="titanium-input" />
                </div>

                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="titanium-label">5. Oficina de Destino:</label>
                    <select value={formData.depto} onChange={e => setFormData({ ...formData, depto: e.target.value })} className="titanium-input">
                        {LISTADO_DEPARTAMENTOS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                <div className="input-group" style={{ marginBottom: '2rem' }}>
                    <label className="titanium-label">6. Motivo de Visita (Opcional):</label>
                    <textarea placeholder="Ej: Pago de contribuciones, reunión con administrador..." value={formData.motivo} onChange={e => setFormData({ ...formData, motivo: e.target.value })} className="titanium-input" style={{ minHeight: '80px' }} />
                </div>

                <button type="submit" className="action-btn" style={{ background: primaryColor }}>
                    SOLICITAR INGRESO AHORA
                </button>
            </form>
            
            {/* Personaje 3D Serenito (Regla Global) */}
            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <img src="/primo_santiago_cocinero_moneda_3d_v2_1773526608944.png" alt="Asistente Virtual" style={{ width: '150px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }} />
                <p style={{ fontWeight: 'bold', color: primaryColor }}>¿Necesita ayuda? Escanee el QR para soporte por Whatsapp.</p>
            </div>
        </div>
    );
}

// --- NODO II: MONITOR MAESTRO (GRID 360°) ---
function MonitorNode({ current, primaryColor }) {
    const list = Object.keys(INFRAESTRUCTURA_IMLS);
    
    return (
        <div className="monitor-view animate-fade-in">
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                 <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryColor, textTransform: 'uppercase' }}>Command Center Puerta Smart</h2>
                 <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Monitoreo en Tiempo Real de la Red Territorial</p>
                 <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}><div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%' }} className="animate-pulse" /> <strong>ESPERAS: {Object.values(current).filter(v => v.estado === 'COORDINANDO').length}</strong></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}><div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '50%' }} /> <strong>EN VIVO: {Object.values(current).filter(v => v.estado === 'EN_REUNION').length}</strong></div>
                 </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {list.map(venueName => {
                    const venue = INFRAESTRUCTURA_IMLS[venueName];
                    const venueWait = Object.values(current).filter(v => v.recinto === venueName && v.estado === 'COORDINANDO').length;
                    const venueLive = Object.values(current).filter(v => v.recinto === venueName && v.estado === 'EN_REUNION').length;
                    const hasAlert = venueWait > 3;

                    return (
                        <div key={venueName} className="venue-card-premium" style={{ borderTop: `10px solid ${hasAlert ? '#ef4444' : primaryColor}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '1.5rem' }}>{venue.icono}</span>
                                <span style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold' }}>ID: {venue.id}</span>
                            </div>
                            <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', lineHeight: '1.2', height: '2.4rem', overflow: 'hidden' }}>{venueName}</h4>
                            
                            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '0 0 1rem 0' }} />
                            
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: hasAlert ? '#ef4444' : '#1e3a8a' }}>{venueWait}</div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#64748b' }}>ESPERA</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#10b981' }}>{venueLive}</div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#64748b' }}>EN VIVO</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// --- NODO III-VII: PANEL DE GESTIÓN (TÁCTICO, SECRETARÍAS, ANALÍTICA, CRM, LOGS) ---
function AdminNode({ tab, setTab, current, history, logs, update, complete, primaryColor }) {
    
    // KPIs Cálculos
    const stats = useMemo(() => {
        if (!history.length) return { avgDuration: 0, avgNps: 0, total: 0 };
        const total = history.length;
        const avgDuration = history.reduce((acc, v) => acc + (v.permanencia || 0), 0) / total;
        const avgNps = history.reduce((acc, v) => acc + (v.nps || 0), 0) / total;
        return { avgDuration: Math.round(avgDuration), avgNps: avgNps.toFixed(2), total };
    }, [history]);

    return (
        <div className="admin-view scale-in">
            {/* Sub-Navegación Admin */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <AdminTab active={tab === 'dashboard'} label="Resumen Táctico" onClick={() => setTab('dashboard')} color={primaryColor} />
                <AdminTab active={tab === 'guard'} label="Control Guardia" onClick={() => setTab('guard')} color={primaryColor} />
                <AdminTab active={tab === 'secretary'} label="Hub Secretarías" onClick={() => setTab('secretary')} color={primaryColor} />
                <AdminTab active={tab === 'analytics'} label="Analítica Avanzada" onClick={() => setTab('analytics')} color={primaryColor} />
                <AdminTab active={tab === 'crm'} label="CRM & Data" onClick={() => setTab('crm')} color={primaryColor} />
                <AdminTab active={tab === 'logs'} label="Auditoría" onClick={() => setTab('logs')} color={primaryColor} />
            </div>

            {/* TAB: DASHBOARD (OVERVIEW) */}
            {tab === 'dashboard' && (
                <div className="animate-fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <StatCardWhite title="Volumen Histórico" value={stats.total} icon={<Database />} color={primaryColor} />
                        <StatCardWhite title="Promedio NPS" value={`${stats.avgNps} / 5`} icon={<Star />} color="#f59e0b" />
                        <StatCardWhite title="Permanencia Media" value={`${stats.avgDuration} min`} icon={<Clock />} color="#8b5cf6" />
                        <StatCardWhite title="Recintos Activos" value={Object.keys(INFRAESTRUCTURA_IMLS).length} icon={<Building />} color="#10b981" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                        <div className="glass-panel-white">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}><TrendingUp size={20} color={primaryColor} /> Tendencia de Atención (Últimos 30 días)</h3>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={history.slice(0, 50).reverse()}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                        <XAxis dataKey="fecha" tickFormatter={(t) => new Date(t).toLocaleDateString()} stroke="#94a3b8" />
                                        <YAxis stroke="#94a3b8" />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="permanencia" stroke={primaryColor} fill={primaryColor} fillOpacity={0.1} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="glass-panel-white">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}><ShieldCheck size={20} color="#10b981" /> Últimos Logs de Seguridad</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {logs.slice(0, 8).map((log, i) => (
                                    <div key={i} style={{ fontSize: '0.8rem', padding: '0.5rem', background: '#f8fafc', borderRadius: '8px', fontFamily: 'monospace', borderLeft: '3px solid #e2e8f0' }}>
                                        {log}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: GUARD (CONTROL FÍSICO) */}
            {tab === 'guard' && (
                <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="glass-panel-white">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#10b981' }}><DoorOpen size={24} /> 🛡️ VALIDACIÓN DE ENTRADA</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {Object.values(current).filter(v => v.estado === 'AUTORIZADO').map(v => (
                                <div key={v.id} className="admin-list-item" style={{ borderLeft: '5px solid #10b981' }}>
                                    <div>
                                        <div style={{ fontWeight: '900', fontSize: '1.1rem' }}>{v.nombre}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>RUT: {v.rut} | Hacia: {v.depto}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>RECINTO: {v.recinto}</div>
                                    </div>
                                    <button onClick={() => update(v.id, 'EN_REUNION')} className="small-action-btn" style={{ background: '#10b981' }}>VALIDAR INGRESO</button>
                                </div>
                            ))}
                            {Object.values(current).filter(v => v.estado === 'AUTORIZADO').length === 0 && (
                                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Sin pases de entrada pendientes</div>
                            )}
                        </div>
                    </div>

                    <div className="glass-panel-white">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#ef4444' }}><ShieldClose size={24} /> 🛡️ VALIDACIÓN DE SALIDA</h3>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {Object.values(current).filter(v => ['EVALUACION', 'SALIDA_PENDIENTE'].includes(v.estado)).map(v => (
                                <div key={v.id} className="admin-list-item" style={{ borderLeft: '5px solid #ef4444' }}>
                                    <div>
                                        <div style={{ fontWeight: '900', fontSize: '1.1rem' }}>{v.nombre}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>RUT: {v.rut} | Saliendo de: {v.depto}</div>
                                    </div>
                                    <button onClick={() => complete(v.id, v.nps)} className="small-action-btn" style={{ background: '#ef4444' }}>CONFIRMAR SALIDA</button>
                                </div>
                            ))}
                            {Object.values(current).filter(v => ['EVALUACION', 'SALIDA_PENDIENTE'].includes(v.estado)).length === 0 && (
                                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Sin vecinos en retiro</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: SECRETARY (HUB DE AUTORIZACIÓN) */}
            {tab === 'secretary' && (
                <div className="animate-fade-in">
                    <div className="glass-panel-white">
                        <h3 style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', color: primaryColor }}><Bell size={24} /> Solicitudes de Ingreso Entrantes</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                            {Object.values(current).filter(v => v.estado === 'COORDINANDO').map(v => (
                                <div key={v.id} className="admin-list-item" style={{ flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', borderLeft: `6px solid ${primaryColor}` }}>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold' }}>{new Date(v.inicio).toLocaleTimeString()}</div>
                                        <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>{v.nombre}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{v.perfil} | {v.rut}</div>
                                        <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '8px', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                            <strong>MOTIVO:</strong> {v.motivo || 'No especificado'}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                                        <button onClick={() => update(v.id, 'AUTORIZADO')} className="small-action-btn" style={{ background: '#10b981', flex: 1 }}>✅ AUTORIZAR</button>
                                        <button onClick={() => update(v.id, 'EXPIRADO')} className="small-action-btn" style={{ background: '#ef4444', flex: 1 }}>❌ DENEGAR</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel-white" style={{ marginTop: '2rem' }}>
                         <h3 style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', color: '#10b981' }}><Users size={24} /> Audiencias en Curso (Control de Tiempos)</h3>
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                             {Object.values(current).filter(v => v.estado === 'EN_REUNION').map(v => (
                                 <div key={v.id} className="admin-list-item">
                                     <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center', background: '#f8fafc', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>INICIO</div>
                                            <div style={{ fontWeight: '900', color: primaryColor }}>{new Date(v.inicio_reunion).toLocaleTimeString()}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '900' }}>{v.nombre}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Depto: {v.depto}</div>
                                        </div>
                                     </div>
                                     <button onClick={() => update(v.id, 'EVALUACION')} className="small-action-btn" style={{ background: '#3b82f6' }}>FINALIZAR ATENCIÓN</button>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>
            )}

            {/* TAB: ANALYTICS (PANDAS STYLE) */}
            {tab === 'analytics' && (
                <div className="analytics-view animate-fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div className="glass-panel-white">
                             <h4 style={{ margin: '0 0 1.5rem 0' }}>Flujo por Recinto Municipal</h4>
                             <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={Object.entries(history.reduce((acc, v) => {
                                        acc[v.recinto] = (acc[v.recinto] || 0) + 1;
                                        return acc;
                                    }, {})).map(([name, total]) => ({ name, total })).sort((a,b) => b.total - a.total).slice(0, 8)}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                        <XAxis dataKey="name" tickFormatter={(t) => t.substring(0, 6)} />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="total" fill={primaryColor} radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                             </div>
                        </div>

                        <div className="glass-panel-white">
                             <h4 style={{ margin: '0 0 1.5rem 0' }}>Satisfacción Ciudadana (CSAT/NPS)</h4>
                             <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie 
                                            data={Object.entries(history.reduce((acc, v) => {
                                                acc[v.nps] = (acc[v.nps] || 0) + 1;
                                                return acc;
                                            }, {})).map(([name, value]) => ({ name: `${name} Estrellas`, value }))} 
                                            cx="50%" cy="50%" 
                                            outerRadius={100} 
                                            fill="#8884d8" 
                                            dataKey="value"
                                            label
                                        >
                                            <Cell fill="#ef4444" />
                                            <Cell fill="#f97316" />
                                            <Cell fill="#f59e0b" />
                                            <Cell fill="#3b82f6" />
                                            <Cell fill="#10b981" />
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: CRM & DATA */}
            {tab === 'crm' && (
                <div className="crm-view animate-fade-in">
                    <div className="glass-panel-white">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                             <h3 style={{ margin: 0 }}>Base de Datos Ciudadana Pro</h3>
                             <div style={{ display: 'flex', gap: '1rem' }}>
                                <input type="text" placeholder="Buscar por RUT o Nombre..." className="titanium-input" style={{ width: '300px', margin: 0 }} />
                                <button className="small-action-btn" style={{ background: primaryColor }}><Search size={18} /></button>
                             </div>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                        <th style={{ padding: '1rem' }}>ID</th>
                                        <th style={{ padding: '1rem' }}>Fecha</th>
                                        <th style={{ padding: '1rem' }}>Ciudadano</th>
                                        <th style={{ padding: '1rem' }}>Recinto / Depto</th>
                                        <th style={{ padding: '1rem', textAlign: 'center' }}>CSAT</th>
                                        <th style={{ padding: '1rem' }}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.slice(0, 30).map(v => (
                                        <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.8rem' }}>{v.id}</td>
                                            <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{new Date(v.fecha).toLocaleDateString()}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: 'bold' }}>{v.visitante === "REGISTRO HISTÓRICO" ? 'Anónimo Pro' : v.visitante}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{v.rut}</div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontSize: '0.85rem' }}>{v.recinto}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>{v.depto}</div>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                                                <div style={{ color: '#f59e0b', fontWeight: '900' }}>{'⭐'.repeat(v.nps)}</div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <button className="btn-glass" style={{ padding: '5px', borderColor: '#e2e8f0' }}><ExternalLink size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: AUDIT LOGS */}
            {tab === 'logs' && (
                <div className="logs-view animate-fade-in">
                    <div className="glass-panel-white" style={{ background: '#0f172a' }}>
                        <h3 style={{ color: '#5eead4', display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}><HardDrive size={24} /> Auditoría del Sistema Inmutable</h3>
                        <div style={{ height: '600px', overflowY: 'auto', padding: '1rem', background: 'rgba(0,0,0,0.4)', borderRadius: '12px' }}>
                            {logs.map((log, i) => (
                                <div key={i} style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem', fontFamily: 'monospace', borderLeft: '2px solid #1e293b', paddingLeft: '10px' }}>
                                    <span style={{ color: '#10b981' }}>SYSTEM_CORE:</span> {log}
                                </div>
                            ))}
                        </div>
                        <button className="action-btn" style={{ marginTop: '1rem', background: '#334155' }}>DESCARGAR HASH DE AUDITORÍA (SHA-256)</button>
                    </div>
                </div>
            )}

        </div>
    );
}

// ==================================================================================================
// ESTILOS Y COMPONENTE AUXILIARES
// ==================================================================================================

function TabButton({ active, label, icon, onClick, color }) {
    return (
        <button 
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1.2rem',
                borderRadius: '50px',
                border: 'none',
                background: active ? 'white' : 'rgba(255,255,255,0.1)',
                color: active ? color : 'white',
                cursor: 'pointer',
                fontWeight: '900',
                transition: 'all 0.3s',
                boxShadow: active ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
                fontSize: '0.9rem'
            }}
        >
            {icon} {label}
        </button>
    );
}

function AdminTab({ active, label, onClick, color }) {
    return (
        <button 
            onClick={onClick}
            style={{
                padding: '0.8rem 1.5rem',
                background: active ? color : '#f1f5f9',
                color: active ? 'white' : '#64748b',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '900',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minWidth: '150px'
            }}
        >
            {label}
        </button>
    );
}

function StatCardWhite({ title, value, icon, color }) {
    return (
        <div className="glass-panel-white" style={{ borderLeft: `8px solid ${color}`, textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{title}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                <div style={{ color: color }}>{icon}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#001f3f' }}>{value}</div>
            </div>
        </div>
    );
}

// INYECCIÓN DE ESTILOS GLOBALES 
const styleTag = document.createElement('style');
styleTag.innerHTML = `
    .glass-panel-white {
        background: white;
        border-radius: 24px;
        padding: 2rem;
        box-shadow: 2px 10px 30px rgba(0, 31, 63, 0.08);
        border: 1px solid #f1f5f9;
        margin-bottom: 2rem;
    }
    .titanium-label {
        display: block;
        font-weight: 900;
        color: #001f3f;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
    }
    .titanium-input {
        width: 100%;
        padding: 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 700;
        color: #001f3f;
        background: #f8fafc;
        transition: all 0.2s;
    }
    .titanium-input:focus {
        border-color: #1e3a8a;
        outline: none;
        background: white;
    }
    .action-btn {
        width: 100%;
        padding: 1.5rem;
        border: none;
        border-radius: 16px;
        color: white;
        font-weight: 900;
        font-size: 1.4rem;
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(30, 58, 138, 0.2);
        transition: all 0.2s;
    }
    .action-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 25px rgba(30, 58, 138, 0.3);
    }
    .small-action-btn {
        padding: 0.6rem 1rem;
        border: none;
        border-radius: 8px;
        color: white;
        font-weight: 900;
        font-size: 0.8rem;
        cursor: pointer;
    }
    .instruction-box-white {
        padding: 1.5rem;
        background: #f0f7ff;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 1rem;
        color: #1e3a8a;
        font-weight: 800;
    }
    .venue-card-premium {
        background: white;
        padding: 1.5rem;
        border-radius: 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        transition: all 0.3s;
    }
    .venue-card-premium:hover {
        transform: scale(1.03);
        box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    }
    .admin-list-item {
        background: #fff;
        padding: 1rem;
        border-radius: 16px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #f1f5f9;
    }
    .promo-box {
        background: #fff8eb;
        border: 3px dashed #f59e0b;
        padding: 2rem;
        border-radius: 20px;
    }
`;
document.head.appendChild(styleTag);
