import React, { useState } from 'react';
import { X, Gamepad2, Ticket, ArrowLeft, Camera, History } from 'lucide-react';

export default function PlayCenterNostalgia({ onClose }) {
    const [view, setView] = useState('entrance'); // 'entrance', 'pinball', 'ticket'

    const images = {
        entrance: '/nostalgia/play_center_entrance.jpg',
        pinball: '/nostalgia/pinball_kids.jpg',
        ticket: '/nostalgia/play_center_ticket.jpg'
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60000,
            background: '#0a0a0a',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'monospace'
        }}>
            {/* Header */}
            <div style={{ 
                padding: '1rem 2rem', 
                background: '#111', 
                borderBottom: '4px solid #f97316', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <History size={30} color="#f97316" />
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '2px' }}>PLAY CENTER - CORDOVEZ 607</h2>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>La Serena '90: El epicentro de la entretención</span>
                    </div>
                </div>
                <button onClick={onClose} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                    <X size={24} color="#ef4444" />
                </button>
            </div>

            {/* Main Content Area */}
            <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Decor */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url(/comic-cielo.jpg)', backgroundSize: 'cover' }}></div>

                {/* Main Visual Display */}
                <div className="glass-panel scale-in" style={{ 
                    position: 'relative',
                    width: '100%',
                    maxWidth: '800px',
                    aspectRatio: '4/3',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '5px solid #333',
                    boxShadow: '0 0 50px rgba(249, 115, 22, 0.3)'
                }}>
                    <img 
                        src={images[view]} 
                        alt="Play Center Nostalgia" 
                        style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }} 
                    />
                    
                    {/* Caption Overlay */}
                    <div style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        right: 0, 
                        padding: '1.5rem', 
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        {view === 'entrance' && (
                            <p style={{ fontSize: '1.1rem', margin: 0 }}>
                                "Bajo el parasol café con el conejo de Playboy calado... ahí empezaba la magia."
                            </p>
                        )}
                        {view === 'pinball' && (
                            <p style={{ fontSize: '1.1rem', margin: 0 }}>
                                "La destreza en los flippers: el sonido metálico y las luces que marcaron una época."
                            </p>
                        )}
                        {view === 'ticket' && (
                            <p style={{ fontSize: '1.1rem', margin: 0 }}>
                                "Boleta de Venta N° 218963. Agosto 1995. El tesoro guardado en el bolsillo."
                            </p>
                        )}
                    </div>
                </div>

                {/* Navigation Pills */}
                <div style={{ 
                    marginTop: '2rem', 
                    display: 'flex', 
                    gap: '1rem', 
                    zIndex: 10,
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <button 
                        onClick={() => setView('entrance')}
                        className={`btn ${view === 'entrance' ? 'btn-primary' : 'btn-glass'}`}
                        style={{ background: view === 'entrance' ? '#f97316' : 'rgba(255,255,255,0.1)', borderColor: '#f97316' }}
                    >
                        <Camera size={18} /> LOCAL CORDOVEZ
                    </button>
                    <button 
                        onClick={() => setView('pinball')}
                        className={`btn ${view === 'pinball' ? 'btn-primary' : 'btn-glass'}`}
                        style={{ background: view === 'pinball' ? '#f97316' : 'rgba(255,255,255,0.1)', borderColor: '#f97316' }}
                    >
                        <Gamepad2 size={18} /> LOS FLIPPERS
                    </button>
                    <button 
                        onClick={() => setView('ticket')}
                        className={`btn ${view === 'ticket' ? 'btn-primary' : 'btn-glass'}`}
                        style={{ background: view === 'ticket' ? '#f97316' : 'rgba(255,255,255,0.1)', borderColor: '#f97316' }}
                    >
                        <Ticket size={18} /> LA BOLETA
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '1rem', textAlign: 'center', background: '#111', color: '#666', fontSize: '0.8rem' }}>
                RECUERDOS DE UNA CIUDAD SMART QUE NUNCA OLVIDA SUS RAÍCES.
            </div>

            <style>{`
                .scale-in { animation: scaleIn 0.5s ease-out; }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
