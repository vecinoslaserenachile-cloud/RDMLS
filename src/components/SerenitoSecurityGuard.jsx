import React, { useState, useEffect } from 'react';
import { ShieldAlert, Terminal, Eye, AlertCircle } from 'lucide-react';

const SerenitoSecurityGuard = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [phase, setPhase] = useState('none'); // none, walking, approaching, warning
    const [text, setText] = useState('');
    const fullMessage = "SISTEMA SENTINEL: ACTIVIDAD INUSUAL DETECTADA... PURIFICANDO CANAL...";

    useEffect(() => {
        const handleTrigger = () => {
            setIsVisible(true);
            setPhase('walking');
            
            // Iniciar voz
            setTimeout(() => {
                speakWarning();
            }, 1000);

            // Cambiar fase a "acercándose"
            setTimeout(() => {
                setPhase('approaching');
            }, 3000);

            // Mostrar texto de advertencia
            setTimeout(() => {
                setPhase('warning');
            }, 5000);

            // Efecto loop: Recargar o volver al inicio después de un tiempo
            setTimeout(() => {
                window.location.href = '/welcome'; // Volver al inicio 
            }, 12000);
        };

        window.addEventListener('trigger-serenito-security', handleTrigger);
        return () => window.removeEventListener('trigger-serenito-security', handleTrigger);
    }, []);

    const speakWarning = () => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance("Ojo con lo que estás haciendo, te estamos observando. Gracias, sigue disfrutando.");
        msg.lang = 'es-CL';
        msg.pitch = 0.9;
        msg.rate = 0.85;
        window.speechSynthesis.speak(msg);
    };

    useEffect(() => {
        if (phase === 'warning') {
            let i = 0;
            const interval = setInterval(() => {
                setText(fullMessage.substring(0, i));
                i++;
                if (i > fullMessage.length) clearInterval(interval);
            }, 50);
            return () => clearInterval(interval);
        }
    }, [phase]);

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000000,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            fontFamily: '"JetBrains Mono", monospace'
        }}>
            {/* Background Glitch Effects */}
            <div className="security-scan-line"></div>
            <div className="glitch-overlay"></div>

            {/* Serenito Image */}
            <div style={{
                transition: 'all 5s cubic-bezier(0.19, 1, 0.22, 1)',
                transform: phase === 'none' ? 'translateY(100vh) scale(0.5)' :
                           phase === 'walking' ? 'translateY(0) scale(1)' :
                           'translateY(0) scale(2.5)',
                filter: phase === 'approaching' ? 'drop-shadow(0 0 50px rgba(255,0,0,0.5))' : 'none',
                position: 'relative',
                zIndex: 2
            }}>
                <img 
                    src="/serenito_security_guard_close_up_1773392164475.png" 
                    alt="Serenito Security" 
                    style={{ height: '600px', objectFit: 'contain' }}
                />
            </div>

            {/* Warning Message */}
            {phase === 'warning' && (
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    width: '80%',
                    background: 'rgba(255,0,0,0.1)',
                    border: '2px solid #ff0000',
                    padding: '2rem',
                    borderRadius: '16px',
                    color: '#ff0000',
                    textAlign: 'center',
                    boxShadow: '0 0 50px rgba(255,0,0,0.3)',
                    zIndex: 3
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <ShieldAlert size={32} className="blink" />
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '900' }}>SECURITY ALERT</h2>
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px' }}>
                        {text}
                    </div>
                    <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', opacity: 0.7 }}>
                        SISTEMA SENTINEL FARO // PROTOCOLO DE DEFENSA ACTIVO
                    </div>
                </div>
            )}

            {/* Terminal Log in Corners */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', color: '#ff0000', fontSize: '0.7rem' }}>
                <Terminal size={14} style={{ marginBottom: '5px' }} />
                <div>ID: VLS_SEC_PROT_99</div>
                <div>NODE: LS_CENTRO_RADAR</div>
                <div>IP: 192.168.1.1 [PURIFIED]</div>
            </div>

            <div style={{ position: 'absolute', top: '20px', right: '20px', color: '#ff0000', fontSize: '0.7rem', textAlign: 'right' }}>
                <Eye size={14} style={{ marginBottom: '5px' }} />
                <div>STATUS: MONITORING</div>
                <div>USER_THREAT_LEVEL: MEDIUM</div>
            </div>

            <style>{`
                .security-scan-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(0deg, transparent 50%, rgba(255,0,0,0.05) 51%, transparent 52%);
                    background-size: 100% 4px;
                    z-index: 1;
                    pointer-events: none;
                    animation: scanSlide 10s linear infinite;
                }

                @keyframes scanSlide {
                    from { background-position: 0 0; }
                    to { background-position: 0 100%; }
                }

                .blink {
                    animation: blink-anim 1s infinite;
                }

                @keyframes blink-anim {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }

                .glitch-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(255,0,0,0.02);
                    opacity: 0;
                    animation: glitch-anim 0.2s infinite;
                    z-index: 0;
                    pointer-events: none;
                }

                @keyframes glitch-anim {
                    0% { transform: translate(0); opacity: 0; }
                    20% { transform: translate(-5px, 5px); opacity: 0.1; }
                    40% { transform: translate(5px, -5px); opacity: 0.1; }
                    60% { transform: translate(-5px, -5px); opacity: 0.1; }
                    80% { transform: translate(5px, 5px); opacity: 0.1; }
                    100% { transform: translate(0); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default SerenitoSecurityGuard;
