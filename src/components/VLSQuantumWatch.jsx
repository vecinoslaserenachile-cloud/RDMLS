import React, { useState, useEffect } from 'react';
import { Calendar, Zap } from 'lucide-react';

/**
 * VLSQuantumWatch — Reloj digital retro premium estilo "Quantum 5"
 * Siempre visible en el portal ComunaSmart.
 * Posicionado en la esquina inferior izquierda con alta visibilidad.
 * Click abre el calendario inteligente VLS.
 */
export default function VLSQuantumWatch({ onCalendarClick }) {
    const [time, setTime] = useState(new Date());
    const [blink, setBlink] = useState(true);

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
        <div 
            onClick={handleClick}
            title="VLS Quantum Watch - Abrir Calendario"
            style={{
                position: 'fixed',
                bottom: '25px',
                left: '25px',
                zIndex: 99999,
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
            }}
            className="faro-watch-hover"
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
                e.currentTarget.style.filter = 'drop-shadow(0 15px 30px rgba(56,189,248,0.4))';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.filter = 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))';
            }}
        >
            {/* Carcasa exterior Quantum 5 */}
            <div style={{
                background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                borderRadius: '12px',
                padding: '4px',
                border: '2px solid #334155',
                position: 'relative',
            }}>
                {/* Tornillos decorativos */}
                <div style={{ position: 'absolute', top: '4px', left: '4px', width: '3px', height: '3px', background: '#475569', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', top: '4px', right: '4px', width: '3px', height: '3px', background: '#475569', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '4px', left: '4px', width: '3px', height: '3px', background: '#475569', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '3px', height: '3px', background: '#475569', borderRadius: '50%' }} />

                {/* Marco interior metalizado */}
                <div style={{
                    background: 'linear-gradient(180deg, #64748b 0%, #334155 100%)',
                    borderRadius: '8px',
                    padding: '2px',
                }}>
                    {/* Pantalla LCD Quantum Blue */}
                    <div style={{
                        background: 'linear-gradient(180deg, #0ea5e9 0%, #0369a1 100%)',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        position: 'relative',
                        minWidth: '150px',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
                    }}>
                        {/* LCD Flare */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                            borderRadius: '6px',
                            pointerEvents: 'none'
                        }} />

                        {/* Top Info */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '4px',
                        }}>
                            <span style={{
                                fontFamily: '"Courier New", monospace',
                                fontSize: '0.65rem',
                                fontWeight: 'bold',
                                color: '#f0f9ff',
                                letterSpacing: '1px',
                                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                            }}>
                                {dayName}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Zap size={10} color="#fde047" fill="#fde047" />
                                <span style={{
                                    fontFamily: '"Courier New", monospace',
                                    fontSize: '0.65rem',
                                    fontWeight: 'bold',
                                    color: '#f0f9ff',
                                    letterSpacing: '1px',
                                }}>
                                    {dayNum} {monthName}
                                </span>
                            </div>
                        </div>

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
                                color: 'white',
                                opacity: blink ? 1 : 0.3,
                                transition: 'opacity 0.1s',
                                lineHeight: 1,
                                margin: '0 2px'
                            }}>:</span>
                            <span style={{
                                fontFamily: '"Courier New", monospace',
                                fontSize: '1.8rem',
                                fontWeight: '900',
                                color: 'white',
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
                                color: '#bae6fd',
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
                                color: '#bae6fd',
                                fontWeight: 'bold',
                                letterSpacing: '2px',
                            }}>
                                VLS QUANTUM
                            </span>
                            <Calendar size={10} color="white" />
                        </div>
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .faro-watch-hover:active {
                    transform: scale(0.95);
                }
            `}} />
        </div>
    );
}
