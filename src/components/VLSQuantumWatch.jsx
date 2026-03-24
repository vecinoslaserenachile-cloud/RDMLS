import React, { useState, useEffect } from 'react';
import { Calendar, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * VLSQuantumWatch — Reloj digital retro premium estilo "Quantum 5"
 * Siempre visible en el portal ComunaSmart.
 * Posicionado en la esquina inferior izquierda con alta visibilidad.
 * Click abre el calendario inteligente VLS.
 */
export default function VLSQuantumWatch({ onCalendarClick }) {
    const [time, setTime] = useState(new Date());
    const [blink, setBlink] = useState(true);
    const [isMinimized, setIsMinimized] = useState(() => {
        return localStorage.getItem('vls_quantum_minimized') === 'true';
    });
    
    // Temas de color para el reloj
    const themes = [
        { id: 'blue', bg: 'linear-gradient(180deg, #0ea5e9 0%, #0369a1 100%)', text: 'white', subText: '#bae6fd', pin: '#0ea5e9' },
        { id: 'green', bg: 'linear-gradient(180deg, #22c55e 0%, #15803d 100%)', text: 'white', subText: '#bbf7d0', pin: '#22c55e' },
        { id: 'red', bg: 'linear-gradient(180deg, #ef4444 0%, #b91c1c 100%)', text: '#fee2e2', subText: '#fecaca', pin: '#ef4444' },
        { id: 'purple', bg: 'linear-gradient(180deg, #a855f7 0%, #7e22ce 100%)', text: 'white', subText: '#e9d5ff', pin: '#a855f7' },
        { id: 'amber', bg: 'linear-gradient(180deg, #f59e0b 0%, #b45309 100%)', text: '#fffbeb', subText: '#fde68a', pin: '#f59e0b' },
        { id: 'dark', bg: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', text: '#38bdf8', subText: '#94a3b8', pin: '#334155' }
    ];

    // Read stored theme or use default blue
    const [currentThemeId, setCurrentThemeId] = useState(() => {
        return localStorage.getItem('vls_quantum_watch_theme') || 'blue';
    });

    const toggleMinimize = (e) => {
        e.stopPropagation();
        const newState = !isMinimized;
        setIsMinimized(newState);
        localStorage.setItem('vls_quantum_minimized', newState.toString());
    };

    const handleThemeChange = (id, e) => {
        e.stopPropagation(); // Don't trigger calendar
        setCurrentThemeId(id);
        localStorage.setItem('vls_quantum_watch_theme', id);
    };

    const currentTheme = themes.find(t => t.id === currentThemeId) || themes[0];

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
            setBlink(prev => !prev);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const pad = (n) => n.toString().padStart(2, '0');
    
    const hours = pad(time.getHours());
    const minutes = pad(time.getMinutes());
    const seconds = pad(time.getSeconds());
    
    const dayNames = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
    const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const dayName = dayNames[time.getDay()];
    const monthName = monthNames[time.getMonth()];
    const dayNum = pad(time.getDate());

    const handleClick = () => {
        if (onCalendarClick) {
            onCalendarClick();
        } else {
            window.dispatchEvent(new CustomEvent('open-smart-calendar'));
        }
    };

    return (
        <motion.div 
            drag
            dragMomentum={false}
            title={isMinimized ? "VLS Quantum (Minimizado) - Arrastrable" : "VLS Quantum Watch - Arrastrable"}
            id="vls-quantum-watch-container"
            style={{
                position: 'fixed',
                top: isMinimized ? '10px' : '220px',
                left: isMinimized ? 'auto' : '20px',
                right: isMinimized ? '140px' : 'auto',
                zIndex: 10000000,
                cursor: 'grab',
                userSelect: 'none',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                width: isMinimized ? 'auto' : '170px'
            }}
            animate={{ 
                scale: isMinimized ? 1 : 1.05,
                y: isMinimized ? 0 : [0, -4, 0] 
            }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ cursor: 'grabbing', scale: 0.95 }}
        >
            {/* Carcasa exterior Quantum 5 */}
            <div style={{
                background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                borderRadius: isMinimized ? '30px' : '12px',
                padding: '3px',
                border: '1px solid #334155',
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Marco interior metalizado */}
                <div style={{
                    background: 'linear-gradient(180deg, #64748b 0%, #334155 100%)',
                    borderRadius: isMinimized ? '28px' : '8px',
                    padding: '1px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {/* Pantalla LCD */}
                    <div 
                        onClick={isMinimized ? toggleMinimize : handleClick}
                        style={{
                        background: currentTheme.bg,
                        borderRadius: isMinimized ? '25px' : '6px',
                        padding: isMinimized ? '4px 12px' : '8px 12px',
                        position: 'relative',
                        minWidth: isMinimized ? '120px' : '150px',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: isMinimized ? 'row' : 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: isMinimized ? '10px' : '0'
                    }}>
                        {/* LCD Flare */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
                            borderRadius: isMinimized ? '25px' : '6px',
                            pointerEvents: 'none'
                        }} />

                        {!isMinimized ? (
                            <>
                                {/* Top Info */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '4px',
                                    width: '100%'
                                }}>
                                    <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.65rem', fontWeight: 'bold', color: currentTheme.subText }}>{dayName}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={toggleMinimize}>
                                        <Zap size={10} color="#fde047" fill="#fde047" className="animate-pulse" />
                                        <span style={{ fontSize: '0.5rem', color: 'white', opacity: 0.6 }}>MIN</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Zap size={12} color="#fde047" fill="#fde047" />
                        )}

                        {/* Middle: Time */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'center',
                        }}>
                            <span style={{
                                fontFamily: '"Courier New", monospace',
                                fontSize: '1.8rem',
                                fontWeight: '900',
                                color: 'white',
                                letterSpacing: '2px',
                                textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                                lineHeight: 1,
                            }}>
                                {hours}
                            </span>
                            <span style={{
                                fontFamily: '"Courier New", monospace',
                                fontSize: '1.8rem',
                                fontWeight: '900',
                                color: currentTheme.text,
                                opacity: blink ? 1 : 0.3,
                                transition: 'opacity 0.1s',
                                lineHeight: 1,
                                margin: '0 2px'
                            }}>:</span>
                            <span style={{
                                fontFamily: '"Courier New", monospace',
                                fontSize: '1.8rem',
                                fontWeight: '900',
                                color: currentTheme.text,
                                letterSpacing: '2px',
                                textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                                lineHeight: 1,
                            }}>
                                {minutes}
                            </span>
                            <span style={{
                                fontFamily: '"Courier New", monospace',
                                fontSize: '0.9rem',
                                fontWeight: '900',
                                color: currentTheme.subText,
                                marginLeft: '5px',
                                marginBottom: '2px',
                                alignSelf: 'flex-end',
                                textShadow: '1px 1px 0px rgba(0,0,0,0.3)',
                            }}>
                                {seconds}
                            </span>
                        </div>

                        {/* Bottom Branding */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '6px',
                            borderTop: '1px solid rgba(255,255,255,0.2)',
                            paddingTop: '4px'
                        }}>
                            <span style={{
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '0.5rem',
                                color: currentTheme.subText,
                                fontWeight: 'bold',
                                letterSpacing: '2px',
                            }}>
                                VLS QUANTUM
                            </span>
                            <Calendar size={10} color={currentTheme.subText} />
                        </div>
                    </div>

                    {/* Botones Pequeñísimos para Temas */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '4px',
                        marginBottom: '2px'
                    }}>
                        {themes.map(t => (
                            <button
                                key={t.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentThemeId(t.id);
                                    localStorage.setItem('vls_quantum_watch_theme', t.id);
                                }}
                                title={`Tema ${t.id}`}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: t.pin,
                                    border: currentThemeId === t.id ? '1px solid #ffffff' : '1px solid #1e293b',
                                    boxShadow: currentThemeId === t.id ? `0 0 5px ${t.pin}` : 'inset 0 1px 2px rgba(0,0,0,0.5)',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'all 0.2s',
                                    transform: currentThemeId === t.id ? 'scale(1.2)' : 'scale(1)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .faro-watch-hover:active {
                    transform: scale(0.95);
                }
            `}} />
        </motion.div>
    );
}
