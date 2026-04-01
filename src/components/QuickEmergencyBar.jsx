import React from 'react';
import { 
    Droplet, Zap, ZapOff, Radio, Cat, AlertTriangle, 
    Phone, Smartphone, ShieldAlert, WifiOff, Activity, LifeBuoy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VLSSOSOverlay from './VLSSOSOverlay';

const EmergencyItem = ({ icon: Icon, label, color, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${color}50`,
            borderRadius: '20px',
            padding: '1rem',
            minWidth: '100px',
            flex: '1 1 auto',
            cursor: 'pointer',
            transition: 'background 0.3s',
            backdropFilter: 'blur(10px)',
            boxShadow: `0 4px 15px ${color}15`
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${color}15`; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
    >
        <div style={{ 
            background: color, 
            padding: '10px', 
            borderRadius: '12px', 
            color: 'white',
            boxShadow: `0 0 15px ${color}40`
        }}>
            <Icon size={20} />
        </div>
        <span style={{ 
            fontSize: '0.65rem', 
            fontWeight: '900', 
            color: 'white', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            textAlign: 'center',
            lineHeight: '1.2'
        }}>
            {label}
        </span>
    </motion.button>
);

export default function QuickEmergencyBar() {
    const [showSOS, setShowSOS] = React.useState(false);

    const handleReport = (type) => {
        // Disparar evento global para abrir el formulario de reportes con la categoría pre-seleccionada
        window.dispatchEvent(new CustomEvent('open-smart-report', { detail: { category: type } }));
    };

    const emergencies = [
        { id: 'agua', label: 'Agua / Alcantarillado', icon: Droplet, color: '#0ea5e9' },
        { id: 'energia', label: 'Energía Eléctrica', icon: Zap, color: '#f59e0b' },
        { id: 'señal', label: 'Señal de Celular', icon: WifiOff, color: '#ec4899' },
        { id: 'animales', label: 'Animales en Vía', icon: Cat, color: '#10b981' },
        { id: 'emergencia', label: 'Otras Emergencias', icon: ShieldAlert, color: '#ef4444' }
    ];

    return (
        <div style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto 2rem auto',
            padding: '0 1rem'
        }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                marginBottom: '1rem',
                justifyContent: 'center'
            }}>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, #ef444450)' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertTriangle size={16} color="#ef4444" />
                    <h3 style={{ 
                        margin: 0, 
                        fontSize: '0.75rem', 
                        color: 'white', 
                        fontWeight: '900', 
                        textTransform: 'uppercase', 
                        letterSpacing: '4px' 
                    }}>Reportes Directos & Emergencias</h3>
                </div>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(270deg, transparent, #ef444450)' }}></div>
            </div>

            <div style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '1rem',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                justifyContent: window.innerWidth > 768 ? 'center' : 'flex-start',
                alignItems: 'center'
            }}>
                {/* BOTÓN VLSOS MAESTRO */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSOS(true)}
                    style={{
                        padding: '1rem 2rem',
                        background: 'linear-gradient(135deg, #ef4444 0%, #7f1d1d 100%)',
                        borderRadius: '24px',
                        border: 'none',
                        color: 'white',
                        fontWeight: '900',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        boxShadow: '0 10px 20px rgba(239, 68, 68, 0.3)',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <ShieldAlert size={24} className="animate-pulse" /> VLSOS
                </motion.button>

                <div style={{ width: '2px', height: '40px', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }}></div>

                {emergencies.map(item => (
                    <EmergencyItem 
                        key={item.id} 
                        {...item} 
                        onClick={() => handleReport(item.id)} 
                    />
                ))}
            </div>

            <AnimatePresence>
                {showSOS && <VLSSOSOverlay onCancel={() => setShowSOS(false)} />}
            </AnimatePresence>
            
            <style>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
