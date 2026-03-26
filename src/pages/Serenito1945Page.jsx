import React, { useEffect } from 'react';
import { Share2, ArrowLeft, Gamepad2, Shield, Zap, Trophy, ChevronRight } from 'lucide-react';

export default function Serenito1945Page() {
    const shareUrl = 'https://www.vecinoslaserena.cl/1945';
    const shareMsg = `🛩️ ¡Juega SERENITO 1945, el juego oficial de Vecinos La Serena!\n✈️ Defiende La Serena con el Halcón de Serenito.\n🎮 Juega gratis en: ${shareUrl}\n#Serenito1945 #VecinosLaSerena`;

    useEffect(() => {
        document.title = 'Serenito 1945 · VLS Game · vecinoslaserena.cl/1945';
        return () => { document.title = 'vecinoslaserena.cl'; };
    }, []);

    const compartir = () => {
        if (navigator.share) {
            navigator.share({ title: 'Serenito 1945', text: shareMsg, url: shareUrl }).catch(() => {});
        } else {
            window.open('https://wa.me/?text=' + encodeURIComponent(shareMsg), '_blank');
        }
    };

    return (
        <div style={{
            minHeight: '100dvh', background: '#020617', color: '#fff',
            fontFamily: "'Orbitron', sans-serif, Inter",
            display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
            {/* Banner superior */}
            <div style={{
                background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)',
                borderBottom: '2px solid #38bdf8',
                padding: '0.6rem 1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '1rem', flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            background: 'rgba(56,189,248,0.1)', border: '1px solid #38bdf8',
                            color: '#38bdf8', borderRadius: '50%', width: '34px', height: '34px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: '900', letterSpacing: '2px', color: '#38bdf8' }}>
                        🛩️ SERENITO 1945 · VLS MASTER
                    </span>
                </div>
                <button
                    onClick={compartir}
                    style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        border: 'none', color: '#fff', padding: '0.5rem 1.2rem',
                        borderRadius: '20px', cursor: 'pointer', fontWeight: '900',
                        display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem',
                        boxShadow: '0 4px 15px rgba(16,185,129,0.4)'
                    }}
                >
                    <Share2 size={14} /> COMPARTIR
                </button>
            </div>

            {/* Iframe del juego — ocupa toda la pantalla disponible */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <iframe
                    src="/minijuegos/serenito-1945/index.html"
                    title="Serenito 1945"
                    style={{
                        width: '100%', height: '100%', border: 'none',
                        position: 'absolute', inset: 0
                    }}
                    allow="autoplay; fullscreen"
                />
            </div>

            {/* Footer info */}
            <div style={{
                background: '#0f172a', borderTop: '1px solid rgba(56,189,248,0.2)',
                padding: '0.5rem 1rem',
                display: 'flex', gap: '1rem', justifyContent: 'center',
                flexWrap: 'wrap', fontSize: '0.7rem', color: '#64748b'
            }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Shield size={12} color="#38bdf8" /> Colecciona escudos</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Zap size={12} color="#fbbf24" /> Mejora armas</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Gamepad2 size={12} color="#818cf8" /> 5 Niveles con Boss Final</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Trophy size={12} color="#10b981" /> vecinoslaserena.cl/1945</span>
            </div>
        </div>
    );
}
