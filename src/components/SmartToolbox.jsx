import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Wrench, X as CloseIcon, Radio, MessageSquare, 
    Lightbulb, Scale, Mic, Settings,
    ChevronUp, ChevronDown, Eraser,
    Search, Map, Bell, Wifi, Activity,
    Music, Share2, ShieldCheck,
    Twitter, Facebook, Instagram,
    Calendar, Rocket
} from 'lucide-react';


export default function SmartToolbox() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const tools = [
        { 
            id: 'radio', 
            icon: Radio, 
            label: 'Radio VLS', 
            event: 'toggle-radio-visibility',
            color: '#38bdf8',
            bgColor: 'rgba(56, 189, 248, 0.2)'
        },
        { 
            id: 'chat', 
            icon: MessageSquare, 
            label: 'Asistente Faro', 
            event: 'open-faro',
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.2)'
        },
        { 
            id: 'piano', 
            icon: Music, 
            label: 'Piano Compita', 
            event: 'open-piano-compita',
            color: '#f472b6',
            bgColor: 'rgba(244, 114, 182, 0.2)'
        },
        { 
            id: 'share', 
            icon: Share2, 
            label: 'Difundir App', 
            event: 'open-smart-share-hub',
            color: '#fbbf24',
            bgColor: 'rgba(251, 191, 36, 0.2)'
        },
        { 
            id: 'security', 
            icon: ShieldCheck, 
            label: 'Martin Shield', 
            event: 'open-martin-shield',
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.2)'
        },
        { 
            id: 'sentinel', 
            icon: Search, 
            label: 'Sentinel Mini', 
            event: 'open-sentinel-mini',
            color: '#a78bfa',
            bgColor: 'rgba(167, 139, 250, 0.2)'
        },
        { 
            id: 'ideas', 
            icon: Lightbulb, 
            label: 'Sombreros DeBono', 
            event: 'open-debono-hats',
            color: '#3b82f6',
            bgColor: 'rgba(59, 130, 246, 0.2)'
        },
        { 
            id: 'radar', 
            icon: Wifi, 
            label: 'Radar Vecinal', 
            event: 'open-social-vision',
            color: '#f87171',
            bgColor: 'rgba(248, 113, 113, 0.2)'
        },
        { 
            id: 'twitter', 
            icon: Twitter, 
            label: 'Twitter VLS', 
            event: 'open-twitter-vls',
            color: '#1da1f2',
            bgColor: 'rgba(29, 161, 242, 0.2)'
        },
        { 
            id: 'facebook', 
            icon: Facebook, 
            label: 'Facebook VLS', 
            event: 'open-facebook-vls',
            color: '#1877f2',
            bgColor: 'rgba(24, 119, 242, 0.2)'
        },
        { 
            id: 'calendar', 
            icon: Calendar, 
            label: 'Calendario 2026', 
            event: 'open-calendar',
            color: '#38bdf8',
            bgColor: 'rgba(56, 189, 248, 0.2)'
        },
        { 
            id: 'instagram', 
            icon: Instagram, 
            label: 'Instagram VLS', 
            event: 'open-instagram-vls',
            color: '#e4405f',
            bgColor: 'rgba(228, 64, 95, 0.2)'
        },
        { 
            id: 'production-hub', 
            icon: Radio, 
            label: 'Hub de Producción', 
            event: 'open-broadcaster',
            color: '#f87171',
            bgColor: 'rgba(248, 113, 113, 0.2)'
        },
        { 
            id: 'radio-backoffice', 
            icon: Settings, 
            label: 'Backoffice RDMLS', 
            event: 'open-radio-master',
            color: '#94a3b8',
            bgColor: 'rgba(148, 163, 184, 0.2)'
        },
        { 
            id: 'smart-events', 
            icon: Calendar, 
            label: 'Smart Events VLS', 
            event: 'open-smart-events',
            color: '#fcd34d',
            bgColor: 'rgba(252, 211, 77, 0.2)'
        },

        localStorage.getItem('master_bypass') === 'true' && {
            id: 'lean-master',
            icon: Rocket,
            label: 'Estrategia Master',
            event: 'open-lean-master',
            color: '#facc15',
            bgColor: 'rgba(250, 204, 21, 0.2)'
        }
    ].filter(Boolean);

    const handleClick = (eventName) => {
        window.dispatchEvent(new CustomEvent(eventName));
        if (isMobile) setIsExpanded(false);
    };

    return (
        <motion.div 
            drag
            dragMomentum={false}
            style={{
                position: 'fixed',
                bottom: isMobile ? '20px' : '30px',
                right: isMobile ? '20px' : '30px',
                zIndex: 100000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '12px'
            }}>
            {/* Tool List */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                pointerEvents: isExpanded ? 'auto' : 'none',
                maxHeight: isExpanded ? '600px' : '0'
            }}>
                {tools.map((tool) => (
                    <div 
                        key={tool.id}
                        onClick={() => handleClick(tool.event)}
                        className="toolbox-item"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'rgba(15, 23, 42, 0.9)',
                            backdropFilter: 'blur(10px)',
                            padding: '8px 16px',
                            borderRadius: '50px',
                            border: `1px solid ${tool.color}40`,
                            cursor: 'pointer',
                            boxShadow: `0 4px 15px rgba(0,0,0,0.3)`,
                            transition: 'all 0.3s'
                        }}
                    >
                        <span style={{ 
                            color: 'white', 
                            fontSize: '0.8rem', 
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap'
                        }}>
                            {tool.label}
                        </span>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: tool.bgColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `1px solid ${tool.color}`
                        }}>
                            <tool.icon size={16} color={tool.color} />
                        </div>
                    </div>
                ))}

                {/* Clear All Tool */}
                <div 
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent('close-all-floating'));
                        setIsExpanded(false);
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(10px)',
                        padding: '8px 16px',
                        borderRadius: '50px',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        cursor: 'pointer',
                        boxShadow: `0 4px 15px rgba(0,0,0,0.3)`
                    }}
                >
                    <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>Cerrar Pantalla</span>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(239, 68, 68, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #ef4444'
                    }}>
                        <Eraser size={16} color="#ef4444" />
                    </div>
                </div>
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="toolbox-toggle animate-pulse-slow"
                style={{
                    width: isMobile ? '65px' : '70px',
                    height: isMobile ? '65px' : '70px',
                    borderRadius: '50%',
                    background: isExpanded ? '#ef4444' : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: isExpanded ? '0 0 30px rgba(239,68,68,0.6)' : '0 15px 35px rgba(30,58,138,0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                }}
            >
                {isExpanded ? <CloseIcon size={32} color="white" /> : <Wrench size={32} color="white" />}
            </button>

            <style>{`
                .toolbox-item:hover {
                    transform: translateX(-10px);
                    background: rgba(30, 41, 59, 0.95) !important;
                }
                .toolbox-toggle:hover {
                    transform: scale(1.1) rotate(5deg);
                }
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); filter: brightness(1); }
                    50% { transform: scale(1.05); filter: brightness(1.2); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite ease-in-out;
                }
            `}</style>
        </motion.div>
    );
}
