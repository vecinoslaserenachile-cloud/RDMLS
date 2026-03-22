import React, { useState } from 'react';
import { ChevronLeft, ExternalLink, RefreshCw } from 'lucide-react';
import SerenitoGuide from './SerenitoGuide';

export default function SmartFrame({ url, title, onBack, guideMessage }) {
    const [isLoading, setIsLoading] = useState(true);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', position: 'relative' }}>
            {/* Cabecera Antigravity */}
            <header
                className="glass-panel"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    marginBottom: '0',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    zIndex: 10
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="btn-glass" onClick={onBack} style={{ padding: '0.5rem', borderRadius: '50%' }}>
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'white' }}>{title}</h2>
                        <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 'bold' }}>Plataforma Integrada La Serena</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-glass" onClick={() => window.open(url, '_blank')} title="Abrir en nueva pestaña" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                        <ExternalLink size={20} />
                    </button>
                </div>
            </header>

            {/* Contenedor del Iframe con Loader */}
            <div style={{ flex: 1, position: 'relative', background: '#ffffff' /* Fondo blanco normal para iframes legados */ }}>
                {isLoading && (
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', background: 'var(--background-base)', zIndex: 5
                    }}>
                        <RefreshCw size={40} color="var(--brand-primary)" className="spin" style={{ marginBottom: '1rem' }} />
                        <p className="text-gradient">Cargando módulo interactivo...</p>
                    </div>
                )}

                <iframe
                    src={url}
                    title={title}
                    onLoad={handleIframeLoad}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        display: isLoading ? 'none' : 'block'
                    }}
                    allow="camera; microphone; geolocation"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                />
            </div>

            {/* Guía Interactiva Sobrepuesta */}
            <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, pointerEvents: 'none' }}>
                <SerenitoGuide message={guideMessage} type="info" />
            </div>

            <style>{`
                .spin { animation: spin 2s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
