import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, TrendingUp, Cpu, Radar, Zap, ExternalLink } from 'lucide-react';
import VigiaGubernamental from '../services/vigiaGubernamental';

const NOTICIAS_CRUDAS = [
    {
        titulo: "Modificación Mecanismo MEPCO - Combustibles v2026",
        descripcion: "Actualización de Hacienda sobre el subsidio móvil para gasolinas. Se espera un ajuste preventivo por volatilidad internacional.",
        fuente: "VLS Hacienda Monitor"
    },
    {
        titulo: "Refuerzo Zanjas Norte y Control Fronterizo",
        descripcion: "Nuevas medidas de seguridad en la frontera para control preventivo de ingresos no regulados.",
        fuente: "VLS Seguridad Interior"
    },
    {
        titulo: "Humedal Urbano El Culebrón: Reporte de Sequía",
        descripcion: "Monitoreo de niveles de agua en el sector. Alerta preventiva para riego y conservación de biodiversidad.",
        fuente: "VLS Eco-Guardianes"
    }
];

export default function VigiaSentinelFeed() {
    const [processedEvents, setProcessedEvents] = useState([]);

    useEffect(() => {
        // Simulamos la entrada de noticias crudas al motor Vigía
        const results = NOTICIAS_CRUDAS.map(n => VigiaGubernamental.procesarEvento(n));
        setProcessedEvents(results);
    }, []);

    return (
        <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <ShieldCheck size={20} color="#10b981" />
                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#10b981', letterSpacing: '2px' }}>VIGÍA_SENTINEL: BLINDAJE_ACTIVO</span>
            </div>

            {processedEvents.map((evt, idx) => (
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    style={{ 
                        background: 'rgba(255,255,255,0.03)', 
                        border: `1px solid ${evt.data.color_referencia}50`, 
                        borderRadius: '20px', 
                        padding: '1.2rem',
                        position: 'relative'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {evt.data.etiquetas.map(t => (
                                <span key={t} style={{ fontSize: '0.65rem', color: evt.data.color_referencia, fontWeight: 900, padding: '2px 8px', background: `${evt.data.color_referencia}15`, borderRadius: '6px' }}>{t}</span>
                            ))}
                        </div>
                        <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <TrendingUp size={12} /> {evt.data.impacto_local} IMPACTO
                        </div>
                    </div>
                    
                    <h5 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: 'white', fontWeight: 900 }}>{evt.data.titulo}</h5>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>{evt.data.resumen}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px' }}>
                        <div style={{ fontSize: '0.6rem', color: '#64748b' }}>FUENTE: {evt.data.fuente_verificada}</div>
                        <button style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            REPORTE COMPLETO <ExternalLink size={12} />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
