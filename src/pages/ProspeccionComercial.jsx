import React, { useState } from 'react';
import { Network, Lock, Eye, Building, Users, Server, Zap, ChevronRight, Activity, ThermometerSun, Leaf, Vote, Smartphone, CheckCircle2 } from 'lucide-react';

export default function ProspeccionComercial() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const allowedEmails = ['master@vecinosmart.cl', 'fabi@vecinosmart.cl', 'vecinosmart@gmail.com'];

    const handleLogin = (e) => {
        e.preventDefault();
        // Clave única simple para los fundadores "smart2026"
        if (allowedEmails.includes(email.toLowerCase()) && password === 'smart2026') {
            setIsAuthenticated(true);
            setErrorMsg('');
        } else {
            setErrorMsg('Credenciales inválidas o correo no autorizado.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #1e1b4b 0%, #020617 100%)', padding: '1rem', color: 'white' }}>
                <div className="glass-panel" style={{ background: 'rgba(15,23,42,0.8)', padding: '3rem', borderRadius: '24px', width: '100%', maxWidth: '400px', border: '1px solid rgba(212,175,55,0.3)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', textAlign: 'center' }}>
                    <div style={{ background: 'rgba(212,175,55,0.1)', padding: '1rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem', border: '1px solid rgba(212,175,55,0.5)' }}>
                        <Lock size={40} color="#d4af37" />
                    </div>
                    <h2 style={{ margin: '0 0 0.5rem 0', color: '#d4af37' }}>Área Privada</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>Pitch Deck y Proyección Comercial VecinoSmart</p>
                    
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input 
                            type="email" 
                            placeholder="Correo corporativo" 
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ padding: '0.8rem 1rem', borderRadius: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
                        />
                        <input 
                            type="password" 
                            placeholder="Clave de acceso" 
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ padding: '0.8rem 1rem', borderRadius: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
                        />
                        {errorMsg && <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 'bold' }}>{errorMsg}</div>}
                        <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(90deg, #d4af37, #f59e0b)', border: 'none', color: 'black', fontWeight: 'bold', padding: '1rem', borderRadius: '12px', marginTop: '1rem', cursor: 'pointer' }}>
                            Ingresar al Dossier Secreto
                        </button>
                    </form>
                    <button onClick={() => window.location.href = '/'} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', marginTop: '1.5rem', cursor: 'pointer', textDecoration: 'underline' }}>
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: 'white', padding: '0', display: 'flex', flexDirection: 'column' }}>
            {/* Cabecera */}
            <div style={{ background: 'rgba(15,23,42,0.9)', borderBottom: '1px solid rgba(212,175,55,0.3)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(212,175,55,0.2)', padding: '0.5rem', borderRadius: '8px' }}>
                        <Building size={24} color="#d4af37" />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>Dossier Comercial: VecinoSmart</h1>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div> Acceso Fundadores (Confidencial)</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => window.location.href = '/'} className="btn-glass" style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>Ir al Dashboard</button>
                    <button onClick={() => setIsAuthenticated(false)} className="btn-glass" style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>Cerrar Sesión</button>
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1rem' }}>
                
                {/* Intro Pitch */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', margin: '0 0 1rem 0', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: '900' }}>El Siguiente Nivel de Smart Comuna</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                        No vendemos una página web municipal. Vendemos un ecosistema de bolsillo inteligente, de uso interconectado y cero mantenimiento en tierra.
                    </p>
                </div>

                {/* VISIÓN ESTRATÉGICA Y NUEVO PARADIGMA: RED SENSORIAL */}
                <div className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(15,23,42,0.8))', border: '1px solid rgba(16,185,129,0.3)', padding: '2.5rem', borderRadius: '24px', marginBottom: '4rem', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)' }}></div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                        <div style={{ background: '#10b981', padding: '1rem', borderRadius: '12px', boxShadow: '0 5px 15px rgba(16,185,129,0.5)' }}>
                            <Network size={32} color="white" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'white' }}>La Macro Red Sensorial Ciudadana</h3>
                            <p style={{ margin: 0, color: '#a7f3d0', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '1px' }}>El Gran Atractivo de Venta (USP) para Licitaciones</p>
                        </div>
                    </div>
                    
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2.5rem', position: 'relative', zIndex: 1, borderLeft: '3px solid #10b981', paddingLeft: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '0 12px 12px 0' }}>
                        Así como convertimos cada teléfono en un super-sensor auditivo para el Faro IA (Midiendo Decibeles y Ruido de la ciudad en vivo)... 
                        <br/><br/>
                        <strong style={{ color: 'white', fontSize: '1.2rem' }}>Podemos escalar la APP para extraer toda la biometría ambiental e hiper-local.</strong>
                        <br/>
                        Estamos construyendo el <em>Waze Analítico</em> del gobierno regional, en absoluto anonimato, dándole al municipio información termográfica, flujos humanos y congestión que un sensor central jamás lograría, simplemente dejando la app abierta en el celular de los vecinos.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(245,158,11,0.3)', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <ThermometerSun color="#f59e0b" size={32} style={{ marginBottom: '1rem' }} />
                                <span style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', padding: '0.2rem 0.5rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' }}>FASE 2</span>
                            </div>
                            <h4 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Mapeo de Calor Humano</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                                Al usar la app, inferimos temperaturas por zona (según el sensor pasivo de batería del celular y la data de red), encontrando "Islas de Calor" para redirigir camiones aljibe y crear sombras en plazas públicas casi en tiempo real.
                            </p>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(56,189,248,0.3)', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Activity color="#38bdf8" size={32} style={{ marginBottom: '1rem' }} />
                                <span style={{ background: 'rgba(56,189,248,0.2)', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' }}>PROTOTIPO</span>
                            </div>
                            <h4 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Flujos de Movilidad Urbana</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                                Detectamos patrones de movimiento por la aceleración del teléfono para trazar si el ciudadano va a pie, en bici o en micro (Waze de multi-modalidad). Es vital para Planimetría Vial Municipal y Direcciones de Tránsito.
                            </p>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(236,72,153,0.3)', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Leaf color="#ec4899" size={32} style={{ marginBottom: '1rem' }} />
                                <span style={{ background: 'rgba(236,72,153,0.2)', color: '#ec4899', padding: '0.2rem 0.5rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' }}>VISIONARIO</span>
                            </div>
                            <h4 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>Contaminación y CO2 Inferido</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                                Cruzando el volumen (densidad de sensores) y nuestra IA climática, predecimos la concentración de PM2.5 por acumulación de personas y vehículos en tacos, sin tener que comprar un solo hardware físico extra.
                            </p>
                        </div>
                    </div>
                </div>

                {/* COSTOS Y MÁRGENES FINANCIEROS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    
                    <div className="glass-panel hover-lift" style={{ background: 'rgba(15,23,42,0.6)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h3 style={{ borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '1rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Server size={24} /> Operación Técnica (El Secreto)
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                            A diferencia de empresas telecom tradicionales, nuestra base *Serverless / Frontend First* nos permite gastos mínimos de nube (Entre $40 a $80 USD al mes) operando para 100.000 ciudadanos.
                        </p>
                        <h4 style={{ color: 'white', marginTop: '1.5rem' }}>Gastos Fijos x Municipio / Cliente:</h4>
                        <ul style={{ color: 'var(--text-muted)', paddingLeft: '0', listStyle: 'none', margin: 0 }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
                                <CheckCircle2 size={16} color="#10b981" /> Hosting CDN Estático: <strong style={{ color: '#10b981', marginLeft: 'auto' }}>~$0 a $20 USD</strong>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
                                <CheckCircle2 size={16} color="#10b981" /> Bases de Datos / Server IA: <strong style={{ color: '#10b981', marginLeft: 'auto' }}>~$15 USD</strong>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
                                <CheckCircle2 size={16} color="#f59e0b" /> Consumo AI Faro (Tokens): <strong style={{ color: '#f59e0b', marginLeft: 'auto' }}>~$40 a $80 USD</strong>
                            </li>
                        </ul>
                    </div>

                    <div className="glass-panel hover-lift" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(15,23,42,0.8) 100%)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.3)' }}>
                        <h3 style={{ borderBottom: '1px dashed rgba(212,175,55,0.4)', paddingBottom: '1rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Zap size={24} /> Modelo de Retorno Financiero
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                            Los márgenes de este modelo B2G superan el 90%. El negocio consiste en cobrar mantenimientos "Enterprises" (como si fueras Cisco o Entel) aunque tus costos reales sean ínfimos.
                        </p>
                        <h4 style={{ color: 'white', marginTop: '1.5rem' }}>Escalera de Precios Estimada:</h4>
                        <ul style={{ color: 'white', paddingLeft: '0', listStyle: 'none', margin: 0 }}>
                            <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '10px' }}>< बिल्डिंग size={14} /> Setup Gobierno Completo</span>
                                <strong>$8.0M a $15.0M CLP</strong>
                            </li>
                            <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                                <span style={{ color: '#d4af37', fontWeight: 'bold' }}>Retainer Mensual GORE (SaaS)</span>
                                <strong style={{ color: '#d4af37' }}>$1.0M a $2.5M CLP</strong>
                            </li>
                            <li style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                                <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px' }}><Smartphone size={14} /> Condominios B2B (Lite)</span>
                                <strong>$150.000 / mes</strong>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* PRÓXIMAS ACCIONES */}
                <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.2)', marginBottom: '4rem' }}>
                    <Users size={48} color="#38bdf8" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ color: 'white', fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Plan de Prospección Inmediata</h3>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '1.1rem' }}>
                        Con esta "Red Sensorial Ciudadana" en mano, ya no estamos vendiendo solo una App para reportar baches, estamos vendiendo el sistema de Telemetría Gubernamental más económico e inteligente que ha visto Chile. 
                    </p>
                    <button className="btn btn-primary" onClick={() => window.print()} style={{ background: '#3b82f6', border: 'none', padding: '1rem 2rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 10px 25px rgba(59,130,246,0.4)', cursor: 'pointer' }}>
                        Exportar a PDF Ejecutivo
                    </button>
                </div>
            </div>
            
            <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 'auto', background: 'black' }}>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>Módulo Privado Arquitectura Comercial VecinoSmart 2026. Documentación Confidencial.</p>
            </footer>
        </div>
    );
}
