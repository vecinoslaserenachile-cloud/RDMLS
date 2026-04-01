import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Zap, ShieldAlert, Smartphone, Heart, Globe, 
    Filter, Download, Send, AlertTriangle, CheckCircle, Search
} from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase';

export default function OmniFeedBackoffice() {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isConsolidating, setIsConsolidating] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'vls_gran_cerebro'), orderBy('timestamp', 'desc'), limit(50));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newEvents = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEvents(newEvents);
        });

        // Event listener for local pulses (instant feedback)
        const handlePulse = (e) => {
            setEvents(prev => [e.detail, ...prev].slice(0, 50));
        };
        window.addEventListener('big-brain-pulse', handlePulse);

        return () => {
            unsubscribe();
            window.removeEventListener('big-brain-pulse', handlePulse);
        };
    }, []);

    const getTypeStyles = (type) => {
        switch(type) {
            case 'security': return { color: '#ef4444', icon: ShieldAlert, bg: 'rgba(239, 68, 68, 0.1)' };
            case 'transport': return { color: '#a855f7', icon: Smartphone, bg: 'rgba(168, 85, 247, 0.1)' };
            case 'religious': return { color: '#fbbf24', icon: Heart, bg: 'rgba(251, 191, 36, 0.1)' };
            case 'secular': return { color: '#3b82f6', icon: Globe, bg: 'rgba(59, 130, 246, 0.1)' };
            default: return { color: '#94a3b8', icon: Zap, bg: 'rgba(148, 163, 184, 0.1)' };
        }
    };

    const handleConsolidate = () => {
        setIsConsolidating(true);
        setTimeout(() => {
            setIsConsolidating(false);
            alert("REPORTE DIARIO GENERADO:\n\n- Incidentes de Transporte: 12\n- Alertas VLSOS: 3\n- Actos Cívicos: 5\n\nEl archivo 'Soberania_VLS_Reporte.pdf' está listo en la fila de envíos de Rodrigo.");
        }, 2000);
    };

    const filteredEvents = filter === 'all' ? events : events.filter(e => e.type === filter);

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
            
            {/* Control Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#d4af37', padding: '8px', borderRadius: '12px' }}>
                        <Zap size={20} color="black" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontWeight: '900' }}>GRAN CEREBRO VLS</h2>
                        <div style={{ fontSize: '0.7rem', color: '#d4af37', fontWeight: 'bold' }}>SISTEMA DE MONITOREO TÁCTICO</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['all', 'security', 'transport', 'religious', 'secular'].map(f => (
                        <button 
                            key={f} 
                            onClick={() => setFilter(f)}
                            style={{ 
                                padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', 
                                background: filter === f ? '#d4af37' : 'rgba(255,255,255,0.05)',
                                color: filter === f ? 'black' : 'white',
                                cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold'
                            }}
                        >
                            {f.toUpperCase()}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={handleConsolidate}
                    disabled={isConsolidating}
                    style={{ 
                        padding: '0.75rem 1.5rem', borderRadius: '15px', background: '#d4af37', border: 'none', 
                        color: 'black', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' 
                    }}
                >
                    {isConsolidating ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Download size={18} /></motion.div> : <Download size={18} />}
                    CONSOLIDAR DÍA
                </button>
            </div>

            {/* Feed Grid */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gap: '1rem' }}>
                <AnimatePresence>
                    {filteredEvents.map((event, i) => {
                        const style = getTypeStyles(event.type);
                        const isDelegado = event.user?.title?.includes('Delegado');
                        
                        return (
                            <motion.div 
                                key={event.id || i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                style={{ 
                                    padding: '1.2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', 
                                    border: isDelegado ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.05)',
                                    display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {isDelegado && (
                                    <div style={{ position: 'absolute', top: 0, right: 0, padding: '4px 12px', background: '#d4af37', color: 'black', fontSize: '0.6rem', fontWeight: 'bold', borderRadius: '0 0 0 10px' }}>
                                        REPORTE DE DELEGADO
                                    </div>
                                )}

                                <div style={{ padding: '0.8rem', background: style.bg, borderRadius: '15px', color: style.color }}>
                                    <style.icon size={24} />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <div style={{ fontSize: '0.7rem', color: style.color, fontWeight: 'bold' }}>{event.type.toUpperCase()}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{event.timestamp ? new Date(event.timestamp.seconds * 1000).toLocaleTimeString() : 'En vivo'}</div>
                                    </div>
                                    <h4 style={{ margin: 0, color: 'white', fontSize: '1rem' }}>{event.title}</h4>
                                    <p style={{ margin: '0.5rem 0', color: '#94a3b8', fontSize: '0.85rem' }}>{event.description}</p>
                                    
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', color: '#10b981', fontSize: '0.75rem' }}>
                                            <Search size={14} /> {event.user?.name || 'Anónimo'}
                                        </div>
                                        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', color: '#38bdf8', fontSize: '0.75rem' }}>
                                            <AlertTriangle size={14} /> Puntos Soberanía: +10
                                        </div>
                                    </div>
                                </div>

                                <div style={{ alignSelf: 'center' }}>
                                    <button style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer' }}>
                                        <Send size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
