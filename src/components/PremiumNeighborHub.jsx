import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Gift, TrendingUp, Users, ShieldCheck, Mail, Send, Award, Zap, Gem, CheckCircle, Smartphone } from 'lucide-react';

export default function PremiumNeighborHub({ onClose }) {
    const [referralSlots, setReferralSlots] = useState([
        { id: 1, email: '', status: 'empty' },
        { id: 2, email: '', status: 'empty' },
        { id: 3, email: '', status: 'empty' },
        { id: 4, email: '', status: 'empty' },
        { id: 5, email: '', status: 'empty' }
    ]);

    const sendInvite = (id, email) => {
        setReferralSlots(prev => prev.map(slot => 
            slot.id === id ? { ...slot, email, status: 'sent' } : slot
        ));
        alert(`¡Invitación Soberana enviada a ${email}! Has ganado un bono de 20 Fichas VLS por tu proactividad.`);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 6000000, background: 'rgba(2, 6, 23, 0.99)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* ELITE HEADER */}
            <div style={{ background: 'linear-gradient(90deg, #1e3a8a, #1e40af)', padding: '1.5rem 3rem', borderBottom: '5px solid #fcd34d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: '#fcd34d', padding: '10px', borderRadius: '15px' }}>
                        <Gem color="#1e3a8a" size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' }}>VDS ELITE: PROGRAMA DE REFERIDOS</h2>
                        <span style={{ fontSize: '0.65rem', color: '#e0f2fe', fontWeight: 'bold' }}>BONIFICACIÓN EXTRA POR SOBERANÍA REFRERENCIADA</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>CERRAR HUB</button>
            </div>

            <div style={{ flex: 1, padding: '3rem', display: 'grid', gridTemplateColumns: '400px 1fr', gap: '2rem', overflowY: 'auto' }}>
                
                {/* 1. BONIFICACIÓN EXTRA LOGIN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(252, 211, 77, 0.05)', padding: '2.5rem', borderRadius: '40px', border: '1px solid rgba(252, 211, 77, 0.2)', textAlign: 'center' }}>
                        <Zap color="#fcd34d" size={40} style={{ margin: '0 auto 1.5rem auto' }} />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>BONO DE LOGIN PREMIUN</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fcd34d', margin: '1rem 0' }}>+150 FICHAS</div>
                        <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Abonadas automáticamente por tu conexión soberana diaria.</p>
                    </div>

                    <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '2rem', borderRadius: '40px', border: '1px solid rgba(56, 189, 248, 0.1)' }}>
                        <h4 style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 'bold', marginBottom: '1rem' }}>ESTATUS DE SOCIO ELITE</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                            <Award color="#38bdf8" />
                            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>EMBAJADOR VLS</span>
                        </div>
                        <div style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ width: '65%', height: '100%', background: '#38bdf8' }} />
                        </div>
                        <span style={{ fontSize: '0.6rem', color: '#64748b', marginTop: '10px', display: 'block' }}>PRÓXIMO NIVEL: ARQUITECTO DE RED</span>
                    </div>
                </div>

                {/* 2. REFERRAL SLOTS (5 SLOTS) */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '40px', padding: '3.5rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                         <UserPlus color="#fcd34d" /> TUS 5 CUPOS SOBERANOS
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2.5rem' }}>Invita a tus aliados estratégicos a unirse a la Revolución de La Serena Inteligente. Ganarás bonos por cada nuevo nodo activo.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        {referralSlots.map(slot => (
                            <div key={slot.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold' }}>CUPO {slot.id}</span>
                                    {slot.status === 'sent' && <CheckCircle size={14} color="#22c55e" />}
                                </div>
                                {slot.status === 'empty' ? (
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input 
                                            placeholder="aliado@correo.com"
                                            onKeyDown={(e) => { if (e.key === 'Enter') sendInvite(slot.id, e.target.value); }}
                                            style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: 'white', fontSize: '0.8rem' }}
                                        />
                                        <button 
                                            onClick={(e) => {
                                                const input = e.target.parentElement.querySelector('input');
                                                if (input.value) sendInvite(slot.id, input.value);
                                            }}
                                            style={{ background: '#fcd34d', color: '#000', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold' }}
                                        >
                                            <Send size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 'bold' }}>{slot.email}</span>
                                )}
                                <span style={{ fontSize: '0.6rem', color: slot.status === 'sent' ? '#22c55e' : '#64748b' }}>
                                    {slot.status === 'sent' ? 'INVITACIÓN PENDIENTE DE VALIDACIÓN' : 'PREPARADO PARA ENVÍO'}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* REWARD FOOTER */}
                    <div style={{ marginTop: '3rem', background: 'rgba(252, 211, 77, 0.05)', padding: '2rem', borderRadius: '30px', border: '1px solid #fcd34d44', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Gift color="#fcd34d" size={24} />
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem' }}>RECOMPENSA POR RED SOBERANA</h4>
                                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Desbloquea contenido VIP al completar tus 5 referidos.</span>
                            </div>
                         </div>
                         <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fcd34d' }}>+500 FICHAS</div>
                    </div>
                </div>

            </div>

            {/* STATUS FOOTER */}
            <div style={{ padding: '1rem 3rem', background: '#000', color: '#334155', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={14} color="#fcd34d" />
                    <span>RED ELITE VLS — EXPANSIÓN CONTROLADA POR EL ARQUITECTO</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Smartphone size={14} color="#38bdf8" />
                    <span>SISTEMA DE SEGURIDAD ACTIVADO</span>
                    <span>© COMUNA SMART</span>
                </div>
            </div>
        </div>
    );
}
