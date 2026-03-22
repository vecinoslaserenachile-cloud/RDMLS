import React from 'react';
import { Globe, Server, Link, ShieldCheck, HardDrive, Cpu, ExternalLink, ArrowRight } from 'lucide-react';

export default function DNSManager() {
    
    const configData = [
        { domain: "vecinoslaserena.cl", ip: "Vercel / Google Workspace", status: "Configurando MX de Google" },
        { domain: "vecinosmart.cl", ip: "Zoho / Firebase Hosting", status: "Activo & Protegido" },
        { domain: "smartcomuna.cl", ip: "34.117.XX.XX", status: "Pendiente NIC Chile" },
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '3rem auto', width: '100%', fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5))' }}></div>
                <h3 style={{ color: '#38bdf8', margin: 0, fontSize: '1.3rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Server size={24} /> Arquitectura Cloud & Dominios
                </h3>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(56,189,248,0.5))' }}></div>
            </div>

            <div className="glass-panel" style={{ background: 'rgba(15,23,42,0.8)', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(56,189,248,0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
                {/* Header */}
                <div style={{ padding: '1.5rem 2rem', background: 'linear-gradient(90deg, rgba(8,145,178,0.2) 0%, rgba(15,23,42,0) 100%)', borderBottom: '1px solid rgba(56,189,248,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'rgba(56,189,248,0.1)', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.3)' }}>
                            <Globe size={24} color="#38bdf8" />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Gestor de DNS & Servidores
                                <span style={{ fontSize: '0.7rem', background: '#f59e0b', color: '#000', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>MODO PREPARACIÓN</span>
                            </h4>
                            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Centro de Mando para Migración (NIC.cl / Cloudflare)</span>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    
                    {/* Lista Domain */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Link size={18} /> Tabla de Nombres de Dominio Registrados
                        </h5>
                        {configData.map((sys, idx) => (
                            <div key={idx} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h6 style={{ margin: 0, color: 'white', fontSize: '1.05rem', fontFamily: 'monospace' }}>{sys.domain}</h6>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>IP Destino: {sys.ip}</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', background: sys.status.includes('Pendiente') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: sys.status.includes('Pendiente') ? '#ef4444' : '#f59e0b', padding: '4px 8px', borderRadius: '6px', border: `1px solid ${sys.status.includes('Pendiente') ? '#ef4444' : '#f59e0b'}` }}>
                                    {sys.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Instrucciones de Migración */}
                    <div style={{ background: 'rgba(56,189,248,0.05)', border: '1px dashed rgba(56,189,248,0.3)', padding: '1.5rem', borderRadius: '16px' }}>
                        <h5 style={{ margin: '0 0 1rem 0', color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Cpu size={18} color="#38bdf8" /> Pasos Tácticos para la Migración
                        </h5>
                        <ul style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.8', margin: 0, paddingLeft: '1.2rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Paso 1:</strong> Ingresar a <a href="https://www.nic.cl" target="_blank" rel="noreferrer" style={{color: '#38bdf8', textDecoration: 'none'}}>NIC Chile <ExternalLink size={12}/></a> con la cuenta del representante legal.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Paso 2:</strong> En la configuración de cada dominio, buscar la sección <em>"Servidores de Nombre (DNS)"</em>.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Paso 3:</strong> Reemplazar los servidores actuales por los Nameservers autoritativos que te daremos (ej. los de Cloudflare o Firebase).</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Paso 4:</strong> En tu proveedor de Cloud, agregar Registro tipo `A` apuntando a la IP pública de nuestro servidor de React/Cloud Run.</li>
                            <li style={{ marginBottom: '0.5rem' }}><strong>Paso 5:</strong> Esperar la propagación global (Tarda entre 10 minutos a 24 horas máximo).</li>
                        </ul>
                    </div>
                </div>

                <div style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                        <ShieldCheck size={16} color="#10b981" /> SSL/TLS Auto-Renovable (Let's Encrypt / Google Managed)
                        <HardDrive size={16} color="#38bdf8" style={{ marginLeft: '1rem'}} /> CDN Global Activa
                    </div>
                    <button className="btn pulse-fast" style={{ background: '#38bdf8', color: '#000', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        Simular Ping Global <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
