import React, { useState, useEffect } from 'react';
import { Settings, Shield, Plus, Trash2, Edit2, CheckCircle, Smartphone, Users } from 'lucide-react';
import { auth, db } from '../../utils/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function AdminRadio() {
    const [user, setUser] = useState(null);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [authError, setAuthError] = useState('');

    const [news, setNews] = useState(() => JSON.parse(localStorage.getItem('rdmls_news')) || []);
    const [marquees, setMarquees] = useState(() => JSON.parse(localStorage.getItem('rdmls_marquees')) || []);
    const [accessLogs, setAccessLogs] = useState(() => JSON.parse(localStorage.getItem('rdmls_access_logs')) || []);

    const [newNews, setNewNews] = useState({ title: '', detail: '', category: '' });
    const [newMarquee, setNewMarquee] = useState('');

    // Sincronizar con LocalStorage inter-tabs
    useEffect(() => {
        const handleStorage = () => {
            try {
                const snStr = localStorage.getItem('rdmls_news');
                const smStr = localStorage.getItem('rdmls_marquees');
                const slStr = localStorage.getItem('rdmls_access_logs');
                
                if (snStr) setNews(JSON.parse(snStr) || []);
                if (smStr) setMarquees(JSON.parse(smStr) || []);
                if (slStr) setAccessLogs(JSON.parse(slStr) || []);
            } catch (e) {
                console.warn("Storage sync error:", e);
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    useEffect(() => {
        const bypass = sessionStorage.getItem('rdmls_admin_bypass');
        if (bypass) {
            setUser({ email: bypass, role: 'director' });
        } else if (auth && auth.onAuthStateChanged) {
            const unsubscribe = auth.onAuthStateChanged(u => {
                if (u) setUser(u);
            });
            return () => unsubscribe();
        }
    }, []);

    const logAccess = (email) => {
        const history = JSON.parse(localStorage.getItem('rdmls_access_logs')) || [];
        const newLog = { email, date: new Date().toLocaleString('es-CL'), id: Date.now() };
        const updated = [newLog, ...history].slice(0, 50); // Keep last 50
        localStorage.setItem('rdmls_access_logs', JSON.stringify(updated));
        setAccessLogs(updated);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthError('');

        // Acceso VIP Bypass
        if (loginData.email === 'director@rdmls.cl' && loginData.password === 'radio2026') {
            setUser({ email: 'director@rdmls.cl', role: 'director' });
            sessionStorage.setItem('rdmls_admin_bypass', 'director@rdmls.cl');
            logAccess('director@rdmls.cl');
            return;
        }

        try {
            if (!auth) throw new Error("Firebase Auth no disponible");
            const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
            setUser(userCredential.user);
            logAccess(userCredential.user.email);
        } catch (err) {
            console.error(err);
            setAuthError('Credenciales inválidas o base de datos no configurada. (Use director@rdmls.cl / radio2026 para bypass)');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('rdmls_admin_bypass');
        setUser(null);
        if (auth) signOut(auth);
    };

    const handleAddNews = () => {
        if (!newNews.title) return;
        const updated = [...news, { ...newNews, id: Date.now(), date: new Date().toLocaleDateString('es-CL') }];
        setNews(updated);
        localStorage.setItem('rdmls_news', JSON.stringify(updated));
        setNewNews({ title: '', detail: '', category: '' });
    };

    const handleRemoveNews = (id) => {
        const updated = news.filter(item => item.id !== id);
        setNews(updated);
        localStorage.setItem('rdmls_news', JSON.stringify(updated));
    };

    const handleAddMarquee = () => {
        if (!newMarquee) return;
        const updated = [...marquees, { text: newMarquee, id: Date.now() }];
        setMarquees(updated);
        localStorage.setItem('rdmls_marquees', JSON.stringify(updated));
        setNewMarquee('');
    };

    const handleRemoveMarquee = (id) => {
        const updated = marquees.filter(item => item.id !== id);
        setMarquees(updated);
        localStorage.setItem('rdmls_marquees', JSON.stringify(updated));
    };

    if (!user) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
                <div className="glass-panel scale-in" style={{ padding: '3rem 2rem', width: '100%', maxWidth: '400px', textAlign: 'center', border: '1px solid #FFD700', borderRadius: '16px' }}>
                    <Shield size={64} color="#FFD700" style={{ margin: '0 auto 1.5rem' }} />
                    <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>Consola Master RDMLS</h2>
                    <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.9rem' }}>Acceso exclusivo para directores de programación CRM.</p>

                    {authError && <div style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{authError}</div>}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="email" placeholder="Correo Autorizado" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} className="input-base" style={{ padding: '1rem' }} required />
                        <input type="password" placeholder="Clave de Transmisión" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} className="input-base" style={{ padding: '1rem' }} required />
                        <button type="submit" className="btn pulse" style={{ marginTop: '1rem', padding: '1rem', background: '#FFD700', color: '#8B1D19', fontWeight: 'bold' }}>Ingresar al Switcher</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', padding: '2rem', fontFamily: 'system-ui' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFD700', margin: 0 }}>
                        <Settings size={28} /> RDMLS Control Panel & CRM
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>En vivo: {user.email}</span>
                        <button onClick={handleLogout} className="btn-glass" style={{ padding: '0.5rem 1rem', border: '1px solid #ef4444', color: '#ef4444' }}>Desconectar</button>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

                    {/* GESTOR DE NOTICIAS LATERALES */}
                    <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px' }}>
                        <h2 style={{ color: '#38bdf8', fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(56, 189, 248, 0.3)', paddingBottom: '0.5rem' }}>Último Minuto (App & Web)</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            <input type="text" placeholder="Categoría (Ej: Tránsito)" value={newNews.category} onChange={e => setNewNews({ ...newNews, category: e.target.value })} className="input-base" />
                            <input type="text" placeholder="Titular Corto" value={newNews.title} onChange={e => setNewNews({ ...newNews, title: e.target.value })} className="input-base" />
                            <textarea placeholder="Detalle Opcional..." value={newNews.detail} onChange={e => setNewNews({ ...newNews, detail: e.target.value })} className="input-base" style={{ minHeight: '80px', resize: 'none' }}></textarea>
                            <button onClick={handleAddNews} className="btn" style={{ background: '#38bdf8', color: '#0f172a', fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                <Plus size={18} /> Publicar Pauta
                            </button>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
                            {news.length === 0 && <li style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center' }}>No hay noticias configuradas.</li>}
                            {news.map(n => (
                                <li key={n.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', position: 'relative' }}>
                                    <strong style={{ color: '#38bdf8', fontSize: '0.8rem', display: 'block' }}>{n.category} • {n.date}</strong>
                                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{n.title}</span>
                                    {n.detail && <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.5rem 0 0 0' }}>{n.detail}</p>}
                                    <button onClick={() => handleRemoveNews(n.id)} className="btn-glass" style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.3rem', color: '#ef4444' }}><Trash2 size={16} /></button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* GESTOR DE HUINCHA (MARQUEE) */}
                    <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px' }}>
                        <h2 style={{ color: '#f59e0b', fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(245, 158, 11, 0.3)', paddingBottom: '0.5rem' }}>Huincha de Texto Inferior</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                            <input type="text" placeholder="Escriba el mensaje urgente..." value={newMarquee} onChange={e => setNewMarquee(e.target.value)} className="input-base" />
                            <button onClick={handleAddMarquee} className="btn" style={{ background: '#f59e0b', color: '#0f172a', fontWeight: 'bold' }}>Añadir al GC</button>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                            {marquees.length === 0 && <li style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center' }}>Huincha vacía.</li>}
                            {marquees.map(m => (
                                <li key={m.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.9rem', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{m.text}</span>
                                    <button onClick={() => handleRemoveMarquee(m.id)} className="btn-glass" style={{ padding: '0.3rem', color: '#ef4444', marginLeft: '0.5rem' }}><Trash2 size={16} /></button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* LOG DE ACCESO CRM */}
                    <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px' }}>
                        <h2 style={{ color: '#10b981', fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Users size={20} /> Entradas CRM
                        </h2>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '430px', overflowY: 'auto' }}>
                            {accessLogs.length === 0 && <li style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center' }}>No hay registros de ingreso.</li>}
                            {accessLogs.map(log => (
                                <li key={log.id} style={{ background: 'rgba(0,0,0,0.4)', padding: '0.8rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                                    <div style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>{log.date}</div>
                                    <div style={{ fontSize: '0.95rem', wordBreak: 'break-all' }}>{log.email}</div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    );
}
