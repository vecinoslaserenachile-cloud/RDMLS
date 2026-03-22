import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { ShieldAlert, LogOut, CheckCircle2, Search, Filter } from 'lucide-react';

export default function Admin() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [reports, setReports] = useState([]);
    const [filter, setFilter] = useState('pending'); // pending, resolved, all
    const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' or 'kpi'

    // Observador de Autenticación
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user || null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Listener de Reportes (Bandeja de Entrada en Supabase)
    useEffect(() => {
        if (!user) return;

        const fetchReports = async () => {
            const { data, error } = await supabase
                .from('reports')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error cargando reportes:", error);
                setError("Ocurrió un error conectando a Supabase.");
            } else {
                setReports(data || []);
            }
        };

        fetchReports();

        // Realtime Subscription
        const subscription = supabase
            .channel('public:reports')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, payload => {
                fetchReports(); // Simple refetch on change
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // 1. Acceso Directo Custom (Bypass para el admin) solicitado por User
        const allowedEmails = ['master@vecinosmart.cl', 'fabi@vecinosmart.cl', 'vecinosmart@gmail.com', 'vecinoslaserenachile@gmail.com'];
        if (allowedEmails.includes(loginData.email.toLowerCase()) && (loginData.password === 'admin2026' || loginData.password === 'admin123')) {
            setUser({ email: loginData.email, role: 'admin_backoffice' });
            localStorage.setItem('master_bypass', 'true');
            return;
        }

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: loginData.email,
                password: loginData.password,
            });
            if (signInError) throw signInError;
        } catch (err) {
            setError('Credenciales inválidas o falta configuración Supabase.');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const markAsResolved = async (id) => {
        try {
            const { error } = await supabase
                .from('reports')
                .update({ status: 'resolved', resolved_at: new Date().toISOString() })
                .eq('id', id);

            if (error) throw error;
        } catch (err) {
            alert('Error actualizando estado. Verifica consola.');
        }
    };

    if (loading) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}><div className="loader"></div></div>;

    if (!user) {
        return (
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
                <div className="glass-panel animate-slide-up" style={{ padding: '3rem 2rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                    <ShieldAlert size={64} color="var(--brand-primary)" style={{ margin: '0 auto 1.5rem' }} />
                    <h2 className="text-gradient" style={{ marginBottom: '0.5rem' }}>Acceso Funcionarios</h2>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>Solo personal municipal autorizado.</p>
                    {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--alert-danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{error}</div>}
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="email" placeholder="Correo Institucional (@laserena.cl)" required
                            value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
                        <input type="password" placeholder="Contraseña Segura" required
                            value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Ingresar al Sistema</button>
                    </form>
                </div>
            </div>
        );
    }

    const filteredReports = reports.filter(r => {
        if (filter === 'pending') return r.status !== 'resolved';
        if (filter === 'resolved') return r.status === 'resolved';
        return true;
    });

    const renderKPI = () => {
        const totalReports = reports.length || 1;
        const resolvedReportsList = reports.filter(r => r.status === 'resolved');

        let totalHours = 0;
        let validSLACount = 0;
        resolvedReportsList.forEach(r => {
            const start = new Date(r.created_at || r.timestamp);
            const end = r.resolved_at ? new Date(r.resolved_at) : new Date();
            if (start && end && end >= start) {
                const diffMs = end - start;
                totalHours += diffMs / (1000 * 60 * 60);
                validSLACount++;
            }
        });
        const SLA = validSLACount > 0 ? parseFloat((totalHours / validSLACount).toFixed(1)) : 24;
        const paperSavings = (reports.length * 5) + 14000; // Base + 5 hojas aprox por reporte digitalizado

        const colors = ['#ef4444', '#f59e0b', '#0ea5e9', '#8b5cf6', '#10b981', '#ec4899'];
        const cats = {};
        reports.forEach(r => {
            const c = r.category || 'General';
            if (!cats[c]) cats[c] = { total: 0, res: 0 };
            cats[c].total++;
            if (r.status === 'resolved') cats[c].res++;
        });

        const resolutionData = Object.keys(cats).map((c, i) => ({
            name: c,
            valor: Math.round((cats[c].res / cats[c].total) * 100),
            color: colors[i % colors.length]
        })).sort((a, b) => b.valor - a.valor).slice(0, 5);

        if (resolutionData.length === 0) {
            resolutionData.push(
                { name: 'Seguridad Integral', valor: 0, color: '#ef4444' },
                { name: 'Vialidad y Tránsito', valor: 0, color: '#f59e0b' }
            );
        }

        const mData = {};
        reports.forEach(r => {
            const d = new Date(r.created_at || r.timestamp || new Date());
            const m = d.toLocaleString('es-CL', { month: 'short' });
            if (!mData[m]) mData[m] = 0;
            mData[m]++;
        });

        const monthlyChartRaw = Object.keys(mData).map(m => ({ month: m, val: mData[m] })).slice(-5);
        if (monthlyChartRaw.length === 0) {
            monthlyChartRaw.push({ month: 'Mes Actual', val: 0 });
        }
        const maxVal = Math.max(...monthlyChartRaw.map(d => d.val), 10);
        const monthlyChart = monthlyChartRaw.map(d => ({ month: d.month, valRaw: d.val, val: Math.round((d.val / maxVal) * 100) }));

        return (
            <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0, color: 'white' }}>Inteligencia Operativa & KPIs</h2>
                </div>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-cyan)' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tiempo de Respuesta Promedio (SLA)</span>
                        <h3 style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', color: 'white' }}>{SLA} hrs</h3>
                        <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Basado en datos reales de {validSLACount} casos</span>
                    </div>
                    <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Documentos Digitalizados</span>
                        <h3 style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', color: 'white' }}>{(paperSavings / 1000).toFixed(1)}K</h3>
                        <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Política Cero Papel (Ecológico)</span>
                    </div>
                    <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #f59e0b' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Reportes Vecinales Recibidos</span>
                        <h3 style={{ margin: '0.5rem 0 0 0', fontSize: '2rem', color: 'white' }}>{reports.length}</h3>
                        <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>Total Histórico</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Bar Chart Lateral */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.1rem' }}>Tasa de Resolución por Área</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {resolutionData.map((d, i) => (
                                <div key={parseInt(i, 10)}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                        <span style={{ color: 'var(--text-main)' }}>{d.name}</span>
                                        <span style={{ fontWeight: 'bold', color: d.color }}>{d.valor}%</span>
                                    </div>
                                    <div style={{ width: '100%', background: 'rgba(255,255,255,0.05)', height: '14px', borderRadius: '10px', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}>
                                        <div style={{ width: `${d.valor}%`, background: `linear-gradient(90deg, ${d.color}88, ${d.color})`, height: '100%', borderRadius: '10px', transition: 'width 1s ease-out' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bar Chart Vertical */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.1rem' }}>Reportes Recibidos Mensuales</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', height: '220px', gap: '1rem', marginTop: '1rem', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                            {monthlyChart.map((d, i) => (
                                <div key={parseInt(i, 10)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                                    <div style={{ width: '60%', height: `${Math.max(d.val, 5)}%`, background: 'linear-gradient(to top, rgba(0,229,255,0.5), rgba(0,229,255,1))', borderRadius: '6px 6px 0 0', position: 'relative', minWidth: '25px', boxShadow: '0 0 10px rgba(0,229,255,0.2)', transition: 'height 1s ease-out' }}>
                                        <span style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', color: 'white', fontWeight: 'bold' }}>{d.valRaw}</span>
                                    </div>
                                    <span style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{d.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-primary)' }}>
            <header style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldAlert color="var(--brand-primary)" />
                    <h1 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>ComunaSmart - Bandeja Municipal</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '2px' }}>
                        <button onClick={() => setActiveTab('inbox')} className={`btn ${activeTab === 'inbox' ? 'btn-primary' : ''}`} style={{ padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', background: activeTab === 'inbox' ? 'var(--brand-primary)' : 'transparent', border: 'none', color: 'white' }}>Bandeja Entrada</button>
                        <button onClick={() => setActiveTab('kpi')} className={`btn ${activeTab === 'kpi' ? 'btn-primary' : ''}`} style={{ padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', background: activeTab === 'kpi' ? 'var(--brand-primary)' : 'transparent', border: 'none', color: 'white' }}>Dashboard KPIs</button>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '1rem' }}>{user.email}</span>
                    <button onClick={handleLogout} className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '99px', border: 'none', cursor: 'pointer' }}>
                        <LogOut size={16} /> Salir
                    </button>
                </div>
            </header>

            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                {activeTab === 'kpi' ? renderKPI() : (
                    <div className="animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ margin: 0, color: 'white' }}>Bandeja de Entrada Integrada</h2>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {['pending', 'resolved', 'all'].map(f => (
                                    <button key={f}
                                        onClick={() => setFilter(f)}
                                        className={`btn ${filter === f ? 'btn-primary' : 'btn-glass'}`}
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                                        {f === 'pending' ? 'Pendientes' : f === 'resolved' ? 'Resueltos' : 'Historial'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {filteredReports.length === 0 ? (
                                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No hay reportes en esta categoría.
                                </div>
                            ) : (
                                filteredReports.map(report => (
                                    <div key={report.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                            <div style={{ width: '8px', height: '100%', minHeight: '60px', borderRadius: '99px', background: report.status === 'resolved' ? 'var(--brand-secondary)' : 'var(--alert-warning)' }}></div>
                                            <div>
                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                    <span style={{ padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{report.category}</span>
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(report.timestamp).toLocaleString()}</span>
                                                </div>
                                                <h3 style={{ margin: '0 0 0.25rem 0', color: 'white' }}>{report.subcategory}</h3>
                                                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{report.address && <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />}{report.address}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            {report.photo && <img src={report.photo} alt="Evidencia" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {report.status !== 'resolved' ? (
                                                    <button onClick={() => markAsResolved(report.id)} className="btn btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                                        <CheckCircle2 size={16} /> Marcar Resuelto
                                                    </button>
                                                ) : (
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--brand-secondary)', borderRadius: '8px', fontSize: '0.85rem' }}>
                                                        <CheckCircle2 size={16} /> Resuelto
                                                    </span>
                                                )}
                                                <button className="btn-glass" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Ver Detalle</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
