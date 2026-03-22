import React, { useState } from 'react';
import { Heart, Zap, Crown, ShieldCheck, Gem, Smartphone, Monitor, Star, CheckCircle, Info } from 'lucide-react';

export default function PremiumClub({ onClose }) {
    const [view, setView] = useState('tiers');

    const tiers = [
        {
            id: 'utility',
            name: 'Utilidad Pública',
            price: 'GRATIS $0',
            description: 'Avisos sociales vitales para la comunidad.',
            icon: <Heart size={32} color="#ff4757" fill="#ff4757" />,
            benefits: ['Mascotas extraviadas', 'Documentos perdidos', 'Vehículos robados', 'Salud & Alertas', 'Omnicanalidad VLS'],
            color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
        },
        {
            id: 'pyme',
            name: 'Pyme Auspiciador',
            price: '$9.990 / mes',
            description: 'Promociona tu negocio local de forma inteligente.',
            icon: <Zap size={32} color="#f97316" fill="#f97316" />,
            benefits: ['Spot Radio VLS (Aviso)', 'Voz de Serenito (Sencillo)', 'Frecuencia: 3 veces/día', 'Banner en Dashboard', 'Marca vecinos VLS'],
            color: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
        },
        {
            id: 'partner',
            name: 'Partner Pro',
            price: '$24.990 / mes',
            description: 'Máxima visibilidad y tecnología para tu marca.',
            icon: <Crown size={32} color="#3b82f6" fill="#3b82f6" />,
            benefits: ['Spot Radio Prime (Alta freq)', 'Lip-Sync Serenito (Pro)', 'Vídeo Creativo Mensual', 'Sin publicidad comercial', 'Soporte Búnker'],
            color: 'linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)'
        }
    ];

    const handleAction = (id) => {
        if (id === 'utility') alert('Redirigiendo al formulario gratuito de utilidad pública VLS.');
        else alert('Conectando con la pasarela Webpay/Flow Empresa...');
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ background: '#18181b', width: '100%', maxWidth: '1050px', borderRadius: '35px', padding: '2.5rem', color: 'white', border: '1px solid rgba(56,189,248,0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.8)', position: 'relative', overflow: 'hidden' }}>
                
                {/* Honeypot Invisible 🛡️ */}
                <input type="text" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.8rem', margin: 0, fontWeight: '900', color: 'white', textShadow: '0 4px 12px rgba(0,0,0,0.4)', letterSpacing: '1px' }}>CLUB PREMIUM VLS</h2>
                        <p style={{ opacity: 0.7, fontSize: '1.1rem', marginTop: '5px' }}>Modelos de suscripción y auspicio digital a precio de Smart City.</p>
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#555', cursor: 'pointer', padding: '10px 20px', borderRadius: '50px', fontWeight: 'bold' }}>CERRAR</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                    {tiers.map(t => (
                        <div key={t.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '30px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '18px' }}>{t.icon}</div>
                                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold' }}>{t.name}</h3>
                            </div>
                            <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#38bdf8', marginBottom: '1rem' }}>{t.price}</div>
                            <p style={{ fontSize: '0.95rem', opacity: 0.6, marginBottom: '2rem', flex: 1 }}>{t.description}</p>
                            
                            <ul style={{ padding: 0, listStyle: 'none', marginBottom: '2rem' }}>
                                {t.benefits.map((b, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '0.85rem' }}>
                                        <CheckCircle size={16} color="#38bdf8" /> {b}
                                    </li>
                                ))}
                            </ul>

                            <button onClick={() => handleAction(t.id)} style={{ width: '100%', padding: '15px', borderRadius: '18px', border: 'none', background: t.color, color: 'white', fontWeight: '900', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 5px 20px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}>
                                {t.id === 'utility' ? 'PUBLICAR AHORA' : 'COMPRAR AUSPICIO'}
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '30px', opacity: 0.4, fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} /> Entorno Seguro SII</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Gem size={16} /> Contenido Premium VLS</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Info size={16} /> Facturación Inmediata Flow</div>
                </div>
            </div>
        </div>
    );
}
