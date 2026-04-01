import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Smartphone, X, Zap, MapPin, CheckCircle2, AlertTriangle } from 'lucide-react';
import { pushToBigBrain } from '../utils/BigBrainHelper';

export default function VLSSOSOverlay({ onCancel }) {
    const [mode, setMode] = useState(null); // 'security' | 'transport'
    const [countdown, setCountdown] = useState(3);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            });
        }
    }, []);

    useEffect(() => {
        let timer;
        if (mode === 'security' && countdown > 0 && !isConfirmed) {
            timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        } else if (mode === 'security' && countdown === 0 && !isConfirmed) {
            handleFinalSubmit('security');
        }
        return () => clearTimeout(timer);
    }, [mode, countdown, isConfirmed]);

    const handleFinalSubmit = async (finalMode) => {
        setIsConfirmed(true);
        const payload = {
            type: finalMode === 'security' ? 'security' : 'transport',
            title: finalMode === 'security' ? '¡S.O.S. SEGURIDAD ACTIVADO!' : 'ALERTA: SIN TRANSPORTE PÚBLICO',
            description: finalMode === 'security' ? 'Emergencia crítica reportada vía VLSOS' : 'Vecino reporta falta de locomoción en su sector.',
            location: location || { lat: -29.9027, lng: -71.2519 },
            metadata: { 
                protocol: 'VLSOS_ALERTA_DUAL',
                peakHour: new Date().getHours() 
            },
            user: { id: 'vls_user', name: 'Vecino VLSOS' }
        };

        await pushToBigBrain(payload);
        
        // Visual feedback
        setTimeout(() => onCancel(), 3000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ 
                position: 'fixed', inset: 0, zIndex: 900000, 
                background: mode === 'security' ? 'rgba(153, 27, 27, 0.98)' : 'rgba(15, 23, 42, 0.98)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(15px)',
                transition: 'background 0.5s'
            }}
        >
            <div style={{ padding: '2rem', textAlign: 'center', width: '100%', maxWidth: '500px' }}>
                
                <AnimatePresence mode="wait">
                    {!mode ? (
                        <motion.div key="selector" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
                            <ShieldAlert size={80} color="#ef4444" style={{ margin: '0 auto 2rem' }} className="animate-pulse" />
                            <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '2px' }}>VLSOS — ALERTA DUAL</h2>
                            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>Soberanía Digital en Acción. Seleccione el nivel de urgencia.</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <button 
                                    onClick={() => setMode('security')}
                                    style={{ padding: '2rem', borderRadius: '24px', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)' }}
                                >
                                    <ShieldAlert size={32} /> SOS SEGURIDAD
                                </button>
                                <button 
                                    onClick={() => setMode('transport')}
                                    style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}
                                >
                                    <Smartphone size={32} /> SIN TRANSPORTE
                                </button>
                                <button onClick={onCancel} style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>CANCELAR</button>
                            </div>
                        </motion.div>
                    ) : mode === 'security' && !isConfirmed ? (
                        <motion.div key="countdown" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <div style={{ fontSize: '12rem', fontWeight: '900', color: 'white', marginBottom: '2rem' }}>{countdown}</div>
                            <h3 style={{ color: 'white', letterSpacing: '4px' }}>ACTIVANDO PROTOCOLO SOS</h3>
                            <button onClick={onCancel} style={{ marginTop: '4rem', padding: '1rem 3rem', borderRadius: '50px', background: 'white', color: '#ef4444', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>DETENER AHORA</button>
                        </motion.div>
                    ) : mode === 'transport' && !isConfirmed ? (
                        <motion.div key="transport-confirm" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                            <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}>
                                <AlertTriangle size={48} color="#fbbf24" style={{ margin: '0 auto 1rem' }} />
                                <h3 style={{ color: 'white' }}>REPORTE DE FRECUENCIA</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>¿Lleva más de 20 minutos esperando transporte en su ubicación actual?</p>
                            </div>
                            <button 
                                onClick={() => handleFinalSubmit('transport')}
                                style={{ width: '100%', padding: '1.5rem', borderRadius: '24px', background: '#3b82f6', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}
                            >
                                CONFIRMAR FALTA DE MICRO/COLECTIVO
                            </button>
                            <button onClick={() => setMode(null)} style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>VOLVER</button>
                        </motion.div>
                    ) : (
                        <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <CheckCircle2 size={80} color="#10b981" style={{ margin: '0 auto 2rem' }} />
                            <h2 style={{ color: 'white' }}>ALERTA ENVIADA</h2>
                            <p style={{ color: 'rgba(255,255,255,0.7)' }}>El Gran Cerebro VLS ha registrado su posición. Los equipos de Rodrigo en C5 han sido notificados.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
