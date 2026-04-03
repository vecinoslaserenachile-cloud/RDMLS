import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    AlertTriangle, MapPin, Camera, CheckCircle2, 
    Heart, Shield, Info, Radio, Zap, 
    Layers, Search, Users, DollarSign, ArrowLeft, 
    Plus, Clock, Bird, PawPrint, Eye, Share2, Upload
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Environment, ContactShadows } from '@react-three/drei';
import { db } from '../utils/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

import UniversalSerenito from '../components/UniversalSerenito';

/* --- 3D AVATAR (Serenito & Pandilla) --- */
function SerenitoEdu() {
    return (
        <group scale={0.08} position={[0, -2, 0]}>
            <UniversalSerenito animation="Talking" />
        </group>
    );
}

export default function VETcinos() {
    const navigate = useNavigate();
    const [step, setStep] = useState('sos'); // sos, map, volunteers, donate, legal
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    // SOS Form State
    const [formData, setFormData] = useState({
        tipo: '',
        gravedad: '1',
        descripcion: '',
        lat: '',
        lng: '',
        status: 'Reportado'
    });
    const [gpsStatus, setGpsStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ticketId, setTicketId] = useState(null);
    const [activeAlerts, setActiveAlerts] = useState([]);

    // Capture GPS
    const capturarGPS = () => {
        if (!navigator.geolocation) {
            setGpsStatus('Tu navegador bloquea la geolocalización.');
            return;
        }
        setGpsStatus('Conectando con satélites...');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setFormData(prev => ({ ...prev, lat: pos.coords.latitude, lng: pos.coords.longitude }));
                setGpsStatus('📍 Ubicación confirmada.');
            },
            () => { setGpsStatus('Error: Activa el GPS de tu dispositivo.'); }
        );
    };

    // Submit SOS
    const handleSubmitSOS = async (e) => {
        e.preventDefault();
        if (!formData.lat || !formData.tipo) return alert("Faltan datos vitales (Ubicación/Tipo)");
        
        setIsSubmitting(true);
        try {
            const docRef = await addDoc(collection(db, 'vetcinos_alerts'), {
                ...formData,
                timestamp: serverTimestamp(),
                ticket: `VET-${Math.floor(1000 + Math.random() * 9000)}-2026`
            });
            
            setTicketId(`VET-${Math.floor(1000 + Math.random() * 9000)}-2026`);
            
            // FASE 3: Simular Integración RDMLS si Gravedad es 3
            if (formData.gravedad === '3') {
                console.log("RDMLS OVERRIDE: ALERTA CRÍTICA VETCINOS");
                // Aquí se inyectaría el aviso a la radio si hay socket conectado
            }

            setStep('success');
            setFormData({ tipo: '', gravedad: '1', descripcion: '', lat: '', lng: '', status: 'Reportado' });
            setGpsStatus('');
        } catch (error) {
            console.error(error);
            alert("Error al emitir alerta.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Real-time Map Alerts
    useEffect(() => {
        const q = query(collection(db, 'vetcinos_alerts'), orderBy('timestamp', 'desc'), limit(10));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const alerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setActiveAlerts(alerts);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#0d1117', color: 'white', fontFamily: 'system-ui', display: 'flex', flexDirection: 'column' }}>
            {/* Header / Nav */}
            <header style={{ background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#f97316', padding: '8px', borderRadius: '12px' }}>
                        <PawPrint size={24} color="white" />
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold', letterSpacing: '2px', fontSize: '1.2rem' }}>VETcinos</div>
                        <div style={{ fontSize: '0.6rem', color: '#f97316', fontWeight: 'bold' }}>HUB ANIMAL LA SERENA</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {['sos', 'map', 'volunteers', 'donate', 'legal'].map(s => (
                        <button key={s} onClick={() => setStep(s)} style={{ background: step === s ? 'rgba(249, 115, 22, 0.15)' : 'transparent', border: 'none', color: step === s ? '#f97316' : '#94a3b8', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>{s}</button>
                    ))}
                    <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}><ArrowLeft size={16} /></button>
                </div>
            </header>

            <main style={{ flex: 1, padding: '2rem', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                <AnimatePresence mode="wait">
                    {step === 'sos' && (
                        <motion.div key="sos" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
                            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid rgba(249, 115, 22, 0.2)', background: 'rgba(15, 23, 42, 0.4)' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>🚨 Reporte de Emergencia</h2>
                                <p style={{ color: '#94a3b8', marginBottom: '2.5rem' }}>Conectando a la comunidad para el cuidado animal en La Serena. Triage automático Fase 1.</p>
                                
                                <form onSubmit={handleSubmitSOS} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>CLASIFICACIÓN DEL ANIMAL</label>
                                        <select 
                                            value={formData.tipo}
                                            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                                            style={{ width: '100%', padding: '1rem', borderRadius: '15px', background: '#0d1117', border: '1px solid #334155', color: 'white' }}
                                            required
                                        >
                                            <option value="">Selecciona una opción...</option>
                                            <option value="mascota_perdida">Mascota (Perro/Gato)</option>
                                            <option value="animal_mayor">Animal Mayor (Caballo/Vaca)</option>
                                            <option value="fauna_silvestre">Fauna Silvestre / Humedales</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>NIVEL DE GRAVEDAD</label>
                                        <select 
                                            value={formData.gravedad}
                                            onChange={(e) => setFormData({ ...formData, gravedad: e.target.value })}
                                            style={{ width: '100%', padding: '1rem', borderRadius: '15px', background: formData.gravedad === '3' ? 'rgba(239, 68, 68, 0.1)' : '#0d1117', border: `1px solid ${formData.gravedad === '3' ? '#ef4444' : '#334155'}`, color: 'white' }}
                                            required
                                        >
                                            <option value="1">1 - Preventivo (Avistamiento)</option>
                                            <option value="2">2 - Asistencia Requerida (Estable)</option>
                                            <option value="3">3 - Emergencia Vital (Peligro Inminente)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>SITUACIÓN ACTUAL / ENTORNO</label>
                                        <textarea 
                                            rows="3"
                                            value={formData.descripcion}
                                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                            placeholder="Describe el estado del animal..."
                                            style={{ width: '100%', padding: '1rem', borderRadius: '15px', background: '#0d1117', border: '1px solid #334155', color: 'white', resize: 'none' }}
                                            required
                                        />
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <button 
                                            type="button" 
                                            onClick={capturarGPS}
                                            style={{ flex: 1, padding: '1rem', borderRadius: '15px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', color: '#38bdf8', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                        >
                                            <MapPin size={20} /> Fijar Ubicación
                                        </button>
                                        <span style={{ fontSize: '0.8rem', color: '#38bdf8' }}>{gpsStatus}</span>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={!formData.lat || isSubmitting}
                                        style={{ width: '100%', padding: '1.2rem', borderRadius: '15px', background: formData.gravedad === '3' ? '#ef4444' : '#f97316', border: 'none', color: 'white', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', opacity: (!formData.lat || isSubmitting) ? 0.5 : 1 }}
                                    >
                                        {isSubmitting ? 'DERIVANDO ALERTAS...' : 'EMITIR ALERTA A LA RED'}
                                    </button>
                                </form>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ height: '350px', background: 'rgba(255,255,255,0.03)', borderRadius: '32px', overflow: 'hidden', position: 'relative' }}>
                                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                                        <Suspense fallback={null}>
                                            <ambientLight intensity={0.5} />
                                            <pointLight position={[10, 10, 10]} />
                                            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                                                <SerenitoEdu />
                                            </Float>
                                            <Environment preset="night" />
                                            <ContactShadows opacity={0.4} />
                                        </Suspense>
                                    </Canvas>
                                </div>
                                <div className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, #1e1b4b 0%, #0d1117 100%)', borderRadius: '24px', border: '1px solid #4338ca' }}>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Info color="#38bdf8" /> Educación 3D VLS</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#c7d2fe', lineHeight: 1.6 }}>"Hola vecino, recuerda que el botón SOS es para emergencias reales. La tenencia responsable evita el abandono. ¡Cuidado con la fauna en los humedales!"</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 'success' && (
                        <motion.div key="success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '5rem 0' }}>
                            <div style={{ background: '#10b981', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                <CheckCircle2 size={60} color="white" />
                            </div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Alerta Emitida Exitosamente</h2>
                            <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '3rem' }}>Ticket de Seguimiento: <strong style={{ color: '#10b981' }}>{ticketId}</strong></p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                <button onClick={() => setStep('map')} style={{ padding: '1rem 3rem', background: '#38bdf8', color: '#0d1117', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>VER MAPA EN VIVO</button>
                                <button onClick={() => setStep('sos')} style={{ padding: '1rem 3rem', background: 'transparent', border: '1px solid #334155', color: 'white', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>NUEVO REPORTE</button>
                            </div>
                        </motion.div>
                    )}

                    {step === 'map' && (
                        <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Mapa Interactivo de Alertas</h2>
                                <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.5rem 1.5rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid #ef4444' }}>{activeAlerts.length} REPORTES ACTIVOS</div>
                            </div>
                            <div className="glass-panel" style={{ height: '600px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', background: 'rgba(15, 23, 42, 0.2)', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
                                    {activeAlerts.map(alert => (
                                        <div key={alert.id} style={{ background: '#0d1117', padding: '1.5rem', borderRadius: '16px', borderLeft: `6px solid ${alert.gravedad === '3' ? '#ef4444' : '#f97316'}` }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{alert.ticket} • {alert.tipo}</span>
                                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: alert.status === 'Reportado' ? '#f59e0b' : '#10b981' }}>{alert.status.toUpperCase()}</span>
                                            </div>
                                            <h4 style={{ margin: '0 0 0.5rem 0' }}>{alert.descripcion}</h4>
                                            <div style={{ fontSize: '0.75rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <MapPin size={12} /> {alert.lat.toFixed(4)}, {alert.lng.toFixed(4)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {/* Aquí se integraría Leaflet/Google Maps. Simularemos con un gráfico 3D */}
                                    <Globe size={150} color="#334155" style={{ opacity: 0.2 }} />
                                    <div style={{ position: 'absolute' }}>Simulador de Mapa Georreferenciado</div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 'volunteers' && (
                        <motion.div key="volunteers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div style={{ marginBottom: '3rem' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Matchmaking Cuidadores Transitorios</h2>
                                <p style={{ color: '#94a3b8' }}>Algoritmo de compatibilidad para hogares temporales en La Serena.</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {[
                                    { name: "Familia González (LS)", space: "Patio Amplio", children: "No", pets: "2 perros", match: "95%" },
                                    { name: "Andrés Silva (Coq)", space: "Departamento", children: "Sí", pets: "Ninguna", match: "82%" },
                                    { name: "Rescate Norte (NGO)", space: "Refugio", children: "N/A", pets: "Múltiples", match: "100%" }
                                ].map((h, i) => (
                                    <div key={i} className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981', marginBottom: '0.5rem' }}>{h.match}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px' }}>Compatibilidad</div>
                                        <h3 style={{ margin: '1rem 0 0.5rem 0' }}>{h.name}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                                            <div>📍 Espacio: {h.space}</div>
                                            <div>👨‍👩‍👧‍👦 Niños: {h.children}</div>
                                            <div>🐾 Otras: {h.pets}</div>
                                        </div>
                                        <button style={{ width: '100%', padding: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#10b981', borderRadius: '12px', marginTop: '1.5rem', cursor: 'pointer', fontWeight: 'bold' }}>Solicitar Tránsito</button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 'donate' && (
                        <motion.div key="donate" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                                <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Aportes y Trazabilidad Pública</h2>
                                <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Todo aporte financiero o en insumos genera un comprobante de destino final.</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                                <div className="glass-panel" style={{ padding: '3rem', borderRadius: '32px', background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
                                    <DollarSign size={40} color="#f97316" style={{ marginBottom: '1.5rem' }} />
                                    <h3>Aporte Financiero (Pasarela VLS)</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
                                        {["$5.000", "$10.000", "$20.000", "Otro"].map(v => (
                                            <button key={v} style={{ padding: '1rem', background: '#0d1117', border: '1px solid #334155', color: 'white', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>{v}</button>
                                        ))}
                                    </div>
                                    <button style={{ width: '100%', padding: '1.2rem', marginTop: '1.5rem', borderRadius: '15px', background: '#f97316', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>DONAR AHORA</button>
                                </div>
                                <div className="glass-panel" style={{ padding: '3rem', borderRadius: '32px', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                    <Layers size={40} color="#38bdf8" style={{ marginBottom: '1.5rem' }} />
                                    <h3>Inventario Virtual de Insumos</h3>
                                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {[
                                            { item: "Comida Adulto (Kg)", stock: "145 kg", needed: "500 kg" },
                                            { item: "Antibióticos (Dosis)", stock: "12 dos", needed: "80 dos" },
                                            { item: "Mantas / Camas", stock: "8 unid", needed: "25 unid" }
                                        ].map((inv, i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                                                <div>
                                                    <div style={{ fontWeight: 'bold' }}>{inv.item}</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Stock Actual: {inv.stock}</div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '0.9rem', color: '#ef4444', fontWeight: 'bold' }}>Meta: {inv.needed}</div>
                                                    <button style={{ fontSize: '0.7rem', color: '#38bdf8', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Donar Físico</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 'legal' && (
                        <motion.div key="legal" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} style={{ maxWidth: '700px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <div style={{ background: '#3b82f6', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}>
                                    <Shield size={40} color="white" />
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Portal de Onboarding Legal</h2>
                                <p style={{ color: '#94a3b8' }}>Validación de Fundaciones y Agrupaciones (Check Azul VETcinos).</p>
                            </div>
                            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '32px', background: 'rgba(15, 23, 42, 0.4)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>RUT INSTITUCIONAL (PJ)</label>
                                        <input type="text" placeholder="Ej: 65.123.456-7" style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#0d1117', border: '1px solid #334155', color: 'white' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>CERTIFICADO DE VIGENCIA (PDF)</label>
                                        <div style={{ height: '100px', border: '2px dashed #334155', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                                            <Upload size={24} style={{ marginRight: '10px' }} /> Arrastrar o Click para subir
                                        </div>
                                    </div>
                                    <button style={{ width: '100%', padding: '1.2rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold' }}>SOLICITAR VALIDACIÓN "CHECK AZUL"</button>
                                    <p style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'center' }}>* Solo entidades validadas podrán recibir fondos recaudados y derivaciones de Nivel 3.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.5)', color: '#64748b', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Radio size={14} /> RDMLS Sync Activo</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={14} /> Ecosistema Validado</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Heart size={14} /> 100% Comunitario</div>
                </div>
                <div>© 2026 Vecinos La Serena SpA · Módulo VETcinos Fase 1-5</div>
            </footer>
        </div>
    );
}
