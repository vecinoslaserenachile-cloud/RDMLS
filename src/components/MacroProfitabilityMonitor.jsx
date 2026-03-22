import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Zap, ShieldCheck, Activity, BarChart3, PieChart, ArrowUpRight, ArrowDownRight, Briefcase, Globe, Globe2 } from 'lucide-react';

const MACRO_METRICS = {
    totalLiquidity: "45.2M V-FICHAS",
    corporateReserve: "$12.5M USD",
    activeMerchants: 125,
    adRevenueGrowth: "+24%",
    subsistenceLevel: "98.5%",
    neighborDividend: "4.5M V-FICHAS (MONTHLY)",
    communitySavings: "15% (REALISED)",
    roiProjected: "320% (Annual)"
};

export default function MacroProfitabilityMonitor({ onClose }) {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000000, background: 'rgba(2, 6, 23, 0.95)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* HEADER RENTABILIDAD */}
            <div style={{ background: '#0f172a', padding: '1.5rem 3rem', borderBottom: '3px solid #22c55e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: '#22c55e', padding: '10px', borderRadius: '12px' }}>
                        <TrendingUp color="white" size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' }}>CONTROL DE RENTABILIDAD MACRO — COMUNA SMART</h2>
                        <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold' }}>SISTEMA DE SUBSISTENCIA B2B/SaaS — NODO CENTRAL</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'transparent', color: '#64748b', border: '1px solid #334155', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>CERRAR PANEL</button>
            </div>

            <div style={{ flex: 1, padding: '3rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto 1fr', gap: '2rem', overflowY: 'auto' }}>
                
                {/* KEY STATS */}
                <div className="glass-panel" style={{ background: 'rgba(34, 197, 94, 0.05)', padding: '2rem', borderRadius: '32px', border: '1px solid #22c55e44' }}>
                    <div style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                        <DollarSign size={20} /> <span style={{ fontWeight: 'bold' }}>RESERVA CORPORATIVA</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>{MACRO_METRICS.corporateReserve}</div>
                    <div style={{ color: '#22c55e', fontSize: '0.8rem', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <ArrowUpRight size={14} /> +12.4% VS MES ANTERIOR
                    </div>
                </div>

                <div className="glass-panel" style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '2rem', borderRadius: '32px', border: '1px solid #38bdf844' }}>
                    <div style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                        <Briefcase size={20} /> <span style={{ fontWeight: 'bold' }}>MERCHANTS ACTIVOS (B2B)</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>{MACRO_METRICS.activeMerchants}</div>
                    <div style={{ color: '#38bdf8', fontSize: '0.8rem', marginTop: '10px' }}>CONTRATOS DE RENTABILIDAD ANUAL</div>
                </div>

                <div className="glass-panel" style={{ background: 'rgba(252, 211, 77, 0.05)', padding: '2rem', borderRadius: '32px', border: '1px solid #fcd34d44' }}>
                    <div style={{ color: '#fcd34d', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                        <PieChart size={20} /> <span style={{ fontWeight: 'bold' }}>DIVIDENDO VECINAL PAGO</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '900' }}>{MACRO_METRICS.neighborDividend}</div>
                    <div style={{ color: '#fcd34d', fontSize: '0.8rem', marginTop: '10px' }}>REDISTRIBUCIÓN DE UTILIDADES B2B</div>
                </div>

                {/* ROI GRAPH SIMULATION */}
                <div style={{ gridColumn: 'span 2', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>PROYECCIÓN DINÁMICA DE ROI (12 MESES)</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                             <span style={{ fontSize: '0.7rem', background: '#22c55e22', color: '#22c55e', padding: '5px 15px', borderRadius: '5px' }}>ESCENARIO OPTIMISTA</span>
                        </div>
                    </div>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                        {[40, 55, 45, 70, 85, 90, 110, 130, 150, 180, 220, 320].map((h, i) => (
                            <motion.div 
                                initial={{ height: 0 }} 
                                animate={{ height: `${h / 3.2}%` }} 
                                transition={{ delay: i * 0.1 }}
                                key={i} 
                                style={{ flex: 1, background: 'linear-gradient(to top, #22c55e, #38bdf8)', borderRadius: '5px 5px 0 0' }} 
                            />
                        ))}
                    </div>
                </div>

                {/* REVENUE STREAMS */}
                <div style={{ background: 'rgba(15, 23, 42, 0.5)', borderRadius: '40px', padding: '2.5rem', border: '1px solid rgba(56, 189, 248, 0.1)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>FUENTES DE SUBSISTENCIA</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { label: 'SaaS - Faro Centinel', share: '45%', icon: Globe },
                            { label: 'Dividendo Vecino (Re-inyección)', share: '30%', icon: Heart },
                            { label: 'B2B - Ad Revenue', share: '15%', icon: Zap },
                            { label: 'Fichas Marketplace', share: '10%', icon: ArrowUpRight }
                        ].map(stream => (
                            <div key={stream.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '15px', background: 'rgba(255,255,255,0.03)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <stream.icon size={16} color="#38bdf8" />
                                    <span style={{ fontSize: '0.8rem' }}>{stream.label}</span>
                                </div>
                                <span style={{ fontWeight: 'bold', color: '#38bdf8' }}>{stream.share}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* STATUS FOOTER */}
            <div style={{ padding: '1rem 3rem', background: '#000', color: '#64748b', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BarChart3 size={12} color="#22c55e" />
                    <span>AUDITORÍA MACROECONÓMICA VLS v2.0 — OPERACIÓN RENTABLE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ color: '#22c55e' }}>● SISTEMA SUBSISTENTE</span>
                    <span>© COMUNA SMART — MODO ARQUITECTO</span>
                </div>
            </div>
        </div>
    );
}

const ShoppingBag = ({ size, color }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
