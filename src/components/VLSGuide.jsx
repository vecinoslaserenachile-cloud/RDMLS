import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Info, CheckCircle2, Navigation, 
    MousePointer2, LogOut, Sparkles, 
    HelpCircle, ChevronRight, PlayCircle
} from 'lucide-react';

/**
 * VLSGuide: Micro-tutoriales interactivos con animaciones ultra-light.
 */
const VLSGuide = ({ sectionId, sectionName, onClose }) => {
    const [step, setStep] = useState(0);

    const tutorials = {
        'radar': [
            {
                title: 'Escucha Social',
                content: 'El Radar Vecinal captura conversaciones en tiempo real de Facebook, X e Instagram sobre La Serena.',
                animation: 'pulse',
                icon: HelpCircle
            },
            {
                title: 'Navegación Táctica',
                content: 'Usa el selector de localidad para ver qué ocurre en tu barrio específico (v.gr. El Milagro, Centro, La Florida).',
                animation: 'slide',
                icon: Navigation
            },
            {
                title: 'Cómo Salir',
                content: 'Haz clic en el botón [CERRAR] en la esquina superior derecha o pulsa la tecla ESC.',
                animation: 'exit',
                icon: LogOut
            }
        ],
        'vlspeak': [
            {
                title: 'Traducción P2P',
                content: 'VLSpeak traduce al instante entre Creole, Inglés y Mapudungun para una atención inclusiva.',
                animation: 'pulse',
                icon: Sparkles
            },
            {
                title: 'Activación',
                content: 'Haz clic en las banderas de la barra inferior para activar el modo de traducción en cualquier sección.',
                animation: 'click',
                icon: MousePointer2
            },
            {
                title: 'Cómo Salir',
                content: 'El widget se minimiza automáticamente al hacer clic fuera o al pulsar el icono de cierre del globo.',
                animation: 'exit',
                icon: X
            }
        ],
        'safe-route': [
            {
                title: 'Telemetría Real',
                content: 'Analizamos luminarias LED activas y rutas de patrullaje para sugerirte el camino más seguro.',
                animation: 'scan',
                icon: Activity
            },
            {
                title: 'Mapa de Calor',
                content: 'Las zonas verdes indican alta visibilidad y presencia de seguridad municipal certificada.',
                animation: 'glow',
                icon: Map
            },
            {
                title: 'Cómo Salir',
                content: 'Usa el botón de retroceso o la "X" en la cabecera del módulo para volver al Hub.',
                animation: 'exit',
                icon: LogOut
            }
        ]
    };

    const currentTutorial = tutorials[sectionId] || tutorials['radar'];
    const currentStep = currentTutorial[step];

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel"
            style={{
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(15px)',
                border: '1px solid var(--brand-primary)',
                borderRadius: '24px',
                padding: '2rem',
                width: '320px',
                color: 'white',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                position: 'relative'
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: 'var(--brand-primary)', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PlayCircle size={14} color="black" />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Tutorial VLS</span>
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            {/* Animation Canvas (Ultra-light CSS) */}
            <div style={{ 
                height: '120px', 
                background: 'rgba(0,0,0,0.3)', 
                borderRadius: '16px', 
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div className={`vls-anim-${currentStep.animation}`} style={{ fontSize: '40px' }}>
                    {step === currentTutorial.length - 1 ? '👋' : '🚀'}
                </div>
                
                {/* Decoration */}
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '10px', opacity: 0.3 }}>
                    vecinoslaserena.cl
                </div>
            </div>

            {/* Content */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--brand-primary)' }}>
                {currentStep.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5', minHeight: '60px' }}>
                {currentStep.content}
            </p>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {currentTutorial.map((_, i) => (
                        <div key={i} style={{ width: i === step ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === step ? 'var(--brand-primary)' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }}></div>
                    ))}
                </div>
                
                {step < currentTutorial.length - 1 ? (
                    <button 
                        onClick={() => setStep(step + 1)}
                        style={{ background: 'white', color: 'black', border: 'none', padding: '8px 16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                        Siguiente <ChevronRight size={14} />
                    </button>
                ) : (
                    <button 
                        onClick={onClose}
                        style={{ background: 'var(--brand-primary)', color: 'black', border: 'none', padding: '8px 16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                        Comenzar <CheckCircle2 size={14} />
                    </button>
                )}
            </div>

            <style>{`
                .vls-anim-pulse { animation: vls-pulse 2s infinite; }
                .vls-anim-slide { animation: vls-slide 3s infinite; }
                .vls-anim-exit { animation: vls-exit 2s infinite; }
                .vls-anim-click { animation: vls-click 1.5s infinite; }
                .vls-anim-scan { animation: vls-scan 2s infinite; }
                .vls-anim-glow { animation: vls-glow 2s infinite; }

                @keyframes vls-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.2); opacity: 1; filter: drop-shadow(0 0 10px var(--brand-primary)); }
                }
                @keyframes vls-slide {
                    0% { transform: translateX(-50px); opacity: 0; }
                    50% { transform: translateX(0); opacity: 1; }
                    100% { transform: translateX(50px); opacity: 0; }
                }
                @keyframes vls-exit {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(0.5); opacity: 0; }
                }
                @keyframes vls-click {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(0.9) translateY(5px); }
                }
                @keyframes vls-scan {
                    0% { transform: translateY(-30px); opacity: 0.3; }
                    50% { transform: translateY(30px); opacity: 1; box-shadow: 0 0 20px var(--brand-primary); }
                    100% { transform: translateY(-30px); opacity: 0.3; }
                }
                @keyframes vls-glow {
                   0%, 100% { filter: contrast(1); }
                   50% { filter: contrast(2) brightness(1.5); color: #38bdf8; }
                }
            `}</style>
        </motion.div>
    );
};

export default VLSGuide;
