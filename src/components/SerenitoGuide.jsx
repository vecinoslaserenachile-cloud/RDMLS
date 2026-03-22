import React, { useState, useEffect } from 'react';
import { Info, X } from 'lucide-react';

// Este componente representa a "Serenito" en versión interactiva 2D/3D (Placeholder)
// Está pensado para sobreponerse a los iframes y guiar al usuario.
export default function SerenitoGuide({ message, type = 'info', onDismiss }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true);
    }, [message]);

    if (!isVisible) return null;

    const handleDismiss = () => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
    };

    return (
        <div
            className="animate-slide-up"
            style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                maxWidth: '300px',
                display: 'flex',
                pointerEvents: 'auto',
                zIndex: 1000,
                alignItems: 'flex-end',
                gap: '10px'
            }}
        >
            <div
                className="glass-panel"
                style={{
                    padding: '1rem',
                    borderRadius: '16px',
                    borderBottomRightRadius: '0px',
                    position: 'relative',
                    background: type === 'warning' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
            >
                <button
                    onClick={handleDismiss}
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer'
                    }}
                >
                    <X size={14} />
                </button>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Info size={16} color="var(--brand-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'white', lineHeight: '1.4' }}>
                        {message || "Hola, soy Serenito. Te guiaré por esta herramienta municipal."}
                    </p>
                </div>
            </div>

            {/* Avatar Placeholder (Aquí irá el render 3D o imagen final de Serenito) */}
            <div
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    border: '2px solid rgba(255,255,255,0.5)',
                    flexShrink: 0,
                    animation: 'float 3s ease-in-out infinite'
                }}
            >
                <span style={{ fontSize: '24px' }}>🧑‍🚀</span>
            </div>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </div>
    );
}
