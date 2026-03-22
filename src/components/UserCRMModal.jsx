import React, { useState, useEffect } from 'react';
import { X, User, Mail, Calendar, MessageSquare, CheckCircle, Clock, Search, LogOut, ShieldCheck, Activity, Fingerprint, Share2, Smartphone, Download, ExternalLink } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import VLSAvatarCreator from './VLSAvatarCreator';

export default function UserCRMModal({ onClose, currentUser }) {
    const [activeTab, setActiveTab] = useState('huella');
    const [historyInfo, setHistoryInfo] = useState({ 
        score: 125, 
        discounts: ['CUPON-VLS-5001'],
        interactions: 42,
        gestiones: 3,
        registros_3d: 1,
        tipo_perfil: 'VECINO', // VECINO, ESTUDIANTE, EMPRESA
        institucion: ''
    });

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('smart_history') || 'null');
            if (data) setHistoryInfo(prev => ({ ...prev, ...data }));
        } catch (e) {
            console.error(e);
        }
    }, []);

    const handleLogout = () => {
        if (auth && typeof signOut === 'function') {
            signOut(auth).then(() => {
                onClose();
            }).catch(console.error);
        } else {
            onClose();
        }
    };

    const crmData = [
        { id: 'VLS-1045', date: '05 Mar 2026', type: 'Reporte Vecinal', status: 'Resuelto', title: 'Iluminación Sector El Milagro' },
        { id: 'VLS-1089', date: '06 Mar 2026', type: 'Acceso Studio', status: 'Completado', title: 'Clip "Mi Barrio" Generado 4K' },
        { id: 'VLS-1120', date: '12 Mar 2026', type: 'Gestión CRM', status: 'Recibido', title: 'Solicitud Sello Vecino Smart' }
    ];

    const messagesData = [
        { id: 1, date: '12 Mar 2026', from: 'Mesa Vecinal VLS', text: '¡Felicidades! Tu avatar 3D ha sido verificado. Ya puedes compartirlo en redes.' },
        { id: 2, date: '05 Mar 2026', from: 'Búnker Creativo', text: 'Tu clip "Mi Barrio" está listo para descarga premium.' }
    ];

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(5, 10, 25, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(20px)' }}>
            <div className="picasso-fractal animate-scale-in" style={{ width: '100%', maxWidth: '1000px', height: '90vh', padding: '0', position: 'relative', display: 'flex', flexDirection: 'column', background: '#0a0a0c', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}>

                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #3b82f6, #10b981)', padding: '0.8rem', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }}>
                            <Fingerprint size={30} color="white" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '900', color: 'white', letterSpacing: '0.5px' }}>
                                MI HUELLA VLS <ShieldCheck size={18} color="#10b981" style={{ display: 'inline' }} />
                            </h2>
                            <p style={{ margin: '0.2rem 0 0 0', color: '#888', fontSize: '0.85rem' }}>
                                Perfil Ciudadano de Vecinos La Serena
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => alert("Copiando enlace de perfil VLS...")} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Share2 size={18} color="white" />
                        </button>
                        <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <X size={20} color="#ef4444" />
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: window.innerWidth > 900 ? 'row' : 'column' }}>
                    <div style={{ width: window.innerWidth > 900 ? '300px' : '100%', flexShrink: 0, borderRight: window.innerWidth > 900 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: 'rgba(0,0,0,0.3)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                           <div style={{ width: '100px', height: '100px', borderRadius: '25% 75% 75% 25% / 25% 25% 75% 75%', background: 'linear-gradient(135deg, #18181b, #3b82f6)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #3b82f6', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}>
                                {currentUser?.photoURL ? <img src={currentUser.photoURL} alt="Avatar" style={{ width: '80%', height: '80%', borderRadius: '50%' }} /> : <User size={50} color="white" />}
                           </div>
                           <h3 style={{ color: 'white', margin: '0 0 0.2rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{currentUser?.displayName || 'Vecino Smart'}</h3>
                           <p style={{ color: '#555', margin: '0 0 1rem 0', fontSize: '0.75rem' }}>{currentUser?.email}</p>
                           <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                               <button onClick={() => alert("Sincronizando...")} style={{ background: '#10b981', border: 'none', borderRadius: '8px', padding: '0.4rem 0.8rem', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>ACTIVO</button>
                               <button onClick={handleLogout} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', padding: '0.4rem 0.8rem', color: '#ef4444', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>SALIR</button>
                           </div>
                        </div>

                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>

                        <div>
                            <h4 style={{ color: '#fbbf24', margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: '900', letterSpacing: '1px' }}>PERFIL CIUDADANO</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <select 
                                    value={historyInfo.tipo_perfil}
                                    onChange={(e) => setHistoryInfo({...historyInfo, tipo_perfil: e.target.value})}
                                    style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: '10px', padding: '0.6rem', color: 'white', fontSize: '0.8rem' }}
                                >
                                    <option value="VECINO">Vecino Residente</option>
                                    <option value="ESTUDIANTE">Estudiante (U. / IP / Colegio)</option>
                                    <option value="EMPRESA">Comercio / Institución</option>
                                </select>
                                
                                {historyInfo.tipo_perfil === 'ESTUDIANTE' && (
                                    <input 
                                        type="text" 
                                        placeholder="🔍 ¿En qué institución estudias?" 
                                        value={historyInfo.institucion}
                                        onChange={(e) => setHistoryInfo({...historyInfo, institucion: e.target.value})}
                                        style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: '10px', padding: '0.6rem', color: '#fbbf24', fontSize: '0.8rem' }}
                                    />
                                )}
                            </div>
                        </div>

                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>

                        <div>
                            <h4 style={{ color: '#10b981', margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: '900', letterSpacing: '1px' }}>KPIs CIUDADANOS</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '0.8rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Interacciones VLS:</span>
                                    <strong style={{ color: '#3b82f6' }}>{historyInfo.interactions}</strong>
                                </div>
                                <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '0.8rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Gestiones Exitosas:</span>
                                    <strong style={{ color: '#10b981' }}>{historyInfo.gestiones}</strong>
                                </div>
                                <div style={{ background: 'rgba(251, 191, 36, 0.05)', padding: '0.8rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', border: '1px solid rgba(251, 191, 36, 0.1)' }}>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Score Smart:</span>
                                    <strong style={{ color: '#fbbf24' }}>{historyInfo.score} XP</strong>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', background: 'linear-gradient(45deg, #18181b, #000)', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.8rem' }}>HUELLA SOCIAL VLS:</p>
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1rem' }}>
                                <div title="Instagram VLS" style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => alert("Abriendo Instagram VLS...")}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </div>
                                <div title="TikTok VLS" style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => alert("Abriendo TikTok VLS...")}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff0050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                                </div>
                                <div title="YouTube VLS" style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => alert("Abriendo YouTube VLS...")}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
                                </div>
                            </div>
                            <button onClick={() => alert("Instalando PWA...")} style={{ width: '100%', background: '#3b82f6', border: 'none', borderRadius: '10px', padding: '0.6rem', color: 'white', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <Download size={16} /> INSTALAR PWA
                            </button>
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto' }}>
                            <button onClick={() => setActiveTab('huella')} style={{ flex: '1 1 auto', padding: '1.2rem', background: activeTab === 'huella' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', border: 'none', borderBottom: activeTab === 'huella' ? '3px solid #10b981' : '3px solid transparent', color: activeTab === 'huella' ? 'white' : '#555', fontWeight: 'bold', cursor: 'pointer' }}>MI HUELLA</button>
                            <button onClick={() => setActiveTab('atenciones')} style={{ flex: '1 1 auto', padding: '1.2rem', background: activeTab === 'atenciones' ? 'rgba(59, 130, 246, 0.1)' : 'transparent', border: 'none', borderBottom: activeTab === 'atenciones' ? '3px solid #3b82f6' : '3px solid transparent', color: activeTab === 'atenciones' ? 'white' : '#555', fontWeight: 'bold', cursor: 'pointer' }}>GESTIONES</button>
                            <button onClick={() => setActiveTab('mensajes')} style={{ flex: '1 1 auto', padding: '1.2rem', background: activeTab === 'mensajes' ? 'rgba(245, 158, 11, 0.1)' : 'transparent', border: 'none', borderBottom: activeTab === 'mensajes' ? '3px solid #f59e0b' : '3px solid transparent', color: activeTab === 'mensajes' ? 'white' : '#555', fontWeight: 'bold', cursor: 'pointer' }}>MENSAJES</button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {activeTab === 'huella' && (
                                <VLSAvatarCreator currentUser={currentUser} onComplete={() => setHistoryInfo(p => ({ ...p, registros_3d: p.registros_3d + 1 }))} />
                            )}

                            {activeTab === 'atenciones' && (
                                <div style={{ padding: '2rem' }}>
                                    {crmData.map((item, idx) => (
                                        <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <div>
                                                <div style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 'bold' }}>{item.id}</div>
                                                <h4 style={{ margin: 0, color: 'white' }}>{item.title}</h4>
                                                <div style={{ fontSize: '0.7rem', color: '#555' }}>{item.date}</div>
                                            </div>
                                            <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem' }}>{item.status}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'mensajes' && (
                                <div style={{ padding: '2rem' }}>
                                    {messagesData.map((msg, idx) => (
                                        <div key={idx} style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '1.5rem', borderRadius: '20px', borderLeft: '5px solid #f59e0b', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <strong style={{ color: '#f59e0b' }}>{msg.from}</strong>
                                                <span style={{ fontSize: '0.7rem', color: '#555' }}>{msg.date}</span>
                                            </div>
                                            <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>{msg.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
