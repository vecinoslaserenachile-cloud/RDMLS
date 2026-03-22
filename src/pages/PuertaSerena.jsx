import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, ShieldCheck, CheckCircle2, User, Building, ShieldAlert, BarChart4, DoorOpen, Save, FileDown, Lock } from 'lucide-react';
import { supabase } from '../utils/supabase';

import LiveVenuesMonitor, { INFRAESTRUCTURA_IMLS } from '../components/LiveVenuesMonitor';

const DEPARTAMENTOS = [
    "Alcaldía", "Secretaría Municipal", "Administración Municipal",
    "Dirección de Obras (DOM)", "Dirección de Tránsito", "DIDECO - Social",
    "Dirección Jurídica", "Comunicaciones y RR.PP.", "Turismo y Patrimonio",
    "Cultura y Artes", "Seguridad Ciudadana", "Finanzas y Tesorería"
];

const PERFILES = [
    "Vecino(a) de La Serena", "Dirigente Social / JJVV", "Autoridad Pública",
    "Funcionario Municipal", "Proveedor Externo", "Prensa / Medios", "Delegación"
];

export default function PuertaSerena() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('ciudadano'); // ciudadano, monitor, gestion

    // Ciudadano States
    const [formData, setFormData] = useState({
        recinto: INFRAESTRUCTURA_IMLS[0].nombre,
        nombre: '',
        rut: '',
        perfil: PERFILES[0],
        depto: DEPARTAMENTOS[0],
        motivo: ''
    });

    const [citizenStatus, setCitizenStatus] = useState('inicio'); // inicio, coordinando, autorizado, reunion, evaluacion, fin
    const [timeRemaining, setTimeRemaining] = useState(180);

    // Mock Data para el monitor
    const [esperasActivas, setEsperasActivas] = useState(12);
    const [audienciasVivo, setAudienciasVivo] = useState(8);

    useEffect(() => {
        let timer;
        if (citizenStatus === 'coordinando' && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0 && citizenStatus === 'coordinando') {
            setCitizenStatus('autorizado'); // Auto-simulación para que pase
        }
        return () => clearInterval(timer);
    }, [citizenStatus, timeRemaining]);

    const handleSubmitCiudadano = (e) => {
        e.preventDefault();
        if (formData.nombre && formData.rut) {
            setCitizenStatus('coordinando');
            setTimeRemaining(15); // Simular validación rápida en 15 segs
        }
    };

    return (
        <div className="page-container" style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px', background: 'radial-gradient(circle at top center, #1e3a8a 0%, #020617 100%)' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <button onClick={() => navigate('/hub')} className="btn-glass animate-fade-in" style={{ padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={18} /> Volver al Hub
                </button>

                {/* Header Institucional */}
                <div className="scale-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem', textAlign: 'center' }}>
                    <Lock size={64} color="#38bdf8" style={{ marginBottom: '1rem', filter: 'drop-shadow(0 0 15px rgba(56,189,248,0.5))' }} />
                    <h1 className="serena-title-glow" style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem', textTransform: 'uppercase' }}>Puerta Serena</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', margin: 0 }}>Gestión de Accesos, Audiencias y Coordinación Municipal (SGAAC-360)</p>
                </div>

                {/* Tabs de Navegación */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setActiveTab('ciudadano')} className={`btn ${activeTab === 'ciudadano' ? 'btn-primary' : 'btn-glass'}`} style={{ padding: '1rem 2rem', borderRadius: '50px', fontSize: '1.1rem', background: activeTab === 'ciudadano' ? 'var(--brand-primary)' : '' }}>
                        <User size={20} /> Vecino (Pórtico QR)
                    </button>
                    <button onClick={() => setActiveTab('monitor')} className={`btn ${activeTab === 'monitor' ? 'btn-primary' : 'btn-glass'}`} style={{ padding: '1rem 2rem', borderRadius: '50px', fontSize: '1.1rem', background: activeTab === 'monitor' ? 'var(--brand-secondary)' : '' }}>
                        <Building size={20} /> Monitor Control
                    </button>
                    <button onClick={() => setActiveTab('gestion')} className={`btn ${activeTab === 'gestion' ? 'btn-primary' : 'btn-glass'}`} style={{ padding: '1rem 2rem', borderRadius: '50px', fontSize: '1.1rem', background: activeTab === 'gestion' ? 'var(--alert-success)' : '' }}>
                        <ShieldCheck size={20} /> Panel Interno (SGAAC)
                    </button>
                </div>

                {/* --- TAB: CIUDADANO (PÓRTICO QR MÓVIL) --- */}
                {activeTab === 'ciudadano' && (
                    <div className="glass-panel scale-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(56,189,248,0.3)' }}>
                        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <DoorOpen color="#38bdf8" /> Registro de Entrada
                        </h2>

                        {citizenStatus === 'inicio' && (
                            <form onSubmit={handleSubmitCiudadano} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div>
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>1. Edificio o Recinto</label>
                                    <select value={formData.recinto} onChange={(e) => setFormData({ ...formData, recinto: e.target.value })} className="input-base" style={{ width: '100%', padding: '0.8rem' }}>
                                        {INFRAESTRUCTURA_IMLS.map(inf => <option key={inf.id} value={inf.nombre}>{inf.icono} {inf.nombre}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>2. Nombre Completo</label>
                                    <input type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ej: Juan Pérez" className="input-base" style={{ width: '100%', padding: '0.8rem' }} required />
                                </div>

                                <div>
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>3. RUT o Pasaporte</label>
                                    <input type="text" value={formData.rut} onChange={(e) => setFormData({ ...formData, rut: e.target.value })} placeholder="Ej: 15.123.456-7" className="input-base" style={{ width: '100%', padding: '0.8rem' }} required />
                                </div>

                                <div>
                                    <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.3rem', display: 'block' }}>4. Departamento de Destino</label>
                                    <select value={formData.depto} onChange={(e) => setFormData({ ...formData, depto: e.target.value })} className="input-base" style={{ width: '100%', padding: '0.8rem' }}>
                                        {DEPARTAMENTOS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>Solicitar Ingreso Oficial</button>
                            </form>
                        )}

                        {citizenStatus === 'coordinando' && (
                            <div className="scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ textAlign: 'center', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                                    <ShieldAlert size={48} color="#f59e0b" style={{ margin: '0 auto 1rem auto' }} className="animate-pulse" />
                                    <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Procesando Ingreso...</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>Avisando a {formData.depto} en {formData.recinto}</p>
                                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#f59e0b', margin: '1rem 0', fontFamily: 'monospace' }}>
                                        {timeRemaining}s
                                    </div>
                                    <p style={{ color: '#fbbf24', fontSize: '0.9rem', fontWeight: 'bold' }}>Esperando validación de la encargada respectiva.</p>
                                </div>

                                <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                    <h4 style={{ color: '#38bdf8', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <MapPin size={18} /> ¿Por qué no aprovechar el tiempo?
                                    </h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                                        Mientras gestionamos su acceso, le sugerimos disfrutar de nuestra hermosa Plaza de Armas, tomar un café cercano o visitar los panoramas que La Serena tiene para usted hoy.
                                    </p>

                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <div style={{ flex: '1', minWidth: '120px', background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '12px', textAlign: 'center' }}>
                                            <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>🌤️</div>
                                            <div style={{ color: 'white', fontWeight: 'bold' }}>18°C</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Parcialmente Nublado</div>
                                        </div>

                                        <div style={{ flex: '1', minWidth: '120px', background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                            <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>🟢</div>
                                            <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.9rem' }}>Info C5</div>
                                            <div style={{ color: '#a7f3d0', fontSize: '0.7rem' }}>Tránsito fluido en centro</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {citizenStatus === 'autorizado' && (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }} className="scale-in">
                                <CheckCircle2 size={80} color="#10b981" style={{ margin: '0 auto 1.5rem auto', filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.5))' }} />
                                <h3 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Ingreso Aprobado</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>Bienvenido {formData.nombre}. Diríjase a {formData.depto}.</p>
                                <button onClick={() => setCitizenStatus('reunion')} className="btn btn-primary" style={{ width: '100%' }}>Ya ingresé a la oficina</button>
                            </div>
                        )}

                        {citizenStatus === 'reunion' && (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }} className="scale-in">
                                <User size={80} color="#38bdf8" style={{ margin: '0 auto 1.5rem auto' }} />
                                <h3 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '1rem' }}>En Reunión</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>Su tiempo está siendo contabilizado por transparencia y seguridad.</p>
                                <button onClick={() => setCitizenStatus('evaluacion')} className="btn" style={{ background: 'var(--alert-danger)', width: '100%', color: 'white' }}>Finalizar Trámite / Salir</button>
                            </div>
                        )}

                        {citizenStatus === 'evaluacion' && (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }} className="scale-in">
                                <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '2rem' }}>¿Cómo evalúa la atención recibida?</h3>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button key={star} onClick={() => setCitizenStatus('fin')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '2.5rem' }}>⭐</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {citizenStatus === 'fin' && (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }} className="scale-in">
                                <CheckCircle2 size={60} color="#38bdf8" style={{ margin: '0 auto 1rem auto' }} />
                                <h3 style={{ color: 'white', fontSize: '1.5rem' }}>Gracias por visitar la I.M. La Serena</h3>
                                <button onClick={() => { setCitizenStatus('inicio'); setFormData({ ...formData, nombre: '', rut: '' }) }} className="btn-glass" style={{ marginTop: '2rem' }}>Hacer Nuevo Registro</button>
                            </div>
                        )}
                    </div>
                )}

                {/* --- TAB: MONITOR --- */}
                {activeTab === 'monitor' && (
                    <div className="scale-in">
                        <LiveVenuesMonitor detailed={true} showPrintQR={true} />
                    </div>
                )}

                {/* --- TAB: GESTION INTERNA --- */}
                {activeTab === 'gestion' && (
                    <div className="scale-in">
                        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                            <h3 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}><ShieldCheck color="#10b981" /> Autorizaciones de Entrada Pendientes</h3>

                            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Ciudadano</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Recinto / Destino</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Perfil</th>
                                        <th style={{ padding: '1rem', textAlign: 'center' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}><strong>Ricardo Mendizábal</strong><br /><span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>RUT: 12.345.xxx-x</span></td>
                                        <td style={{ padding: '1rem' }}>Edificio Consistorial<br /><span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>DIDECO - Social</span></td>
                                        <td style={{ padding: '1rem' }}>Vecino(a)</td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                            <button className="btn btn-primary" style={{ background: '#10b981', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Aprobar</button>
                                            <button className="btn btn-primary" style={{ background: '#ef4444', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Denegar</button>
                                        </td>
                                    </tr>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}><strong>Valeria Silva M.</strong><br /><span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>RUT: 19.876.xxx-x</span></td>
                                        <td style={{ padding: '1rem' }}>Dirección de Tránsito<br /><span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Licencias</span></td>
                                        <td style={{ padding: '1rem' }}>Vecino(a)</td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                            <button className="btn btn-primary" style={{ background: '#10b981', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Aprobar</button>
                                            <button className="btn btn-primary" style={{ background: '#ef4444', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Denegar</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}><BarChart4 color="#38bdf8" /> Analítica y CRM Central</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Descarga y gestión de Base de Datos inmutable de Registros (Auditoría de Control Físico).</p>
                                <button className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <FileDown size={20} /> Exportar Matriz (SGAAC CSV)
                                </button>

                                <button onClick={() => alert("Generando Tarjeta QR... Esta tarjeta debe ser impresa y pegada en el acceso de los recintos.")} className="btn-glass" style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#ec4899', borderColor: '#ec4899' }}>
                                    <DoorOpen size={20} /> Imprimir QR para Puerta de Acceso
                                </button>
                            </div>
                            <div className="glass-panel" style={{ padding: '2rem' }}>
                                <h3 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}><Search color="#f59e0b" /> Búsqueda Trazabilidad CRM</h3>
                                <input type="text" placeholder="Buscar RUT, Nombre o Recinto..." className="input-base" style={{ width: '100%', marginBottom: '1rem' }} />
                                <button className="btn-glass" style={{ width: '100%' }}>Buscar en Historial de Registros</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
