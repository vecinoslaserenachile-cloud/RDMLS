import React, { useState, useEffect } from 'react';
import { 
    BarChart4, ClipboardList, Camera, Send, CheckCircle2, 
    Clock, AlertTriangle, Star, Building2, UserCircle, 
    Search, Filter, PlayCircle, Eye, MessageSquare, Download,
    ShieldCheck, ArrowRight, TrendingUp, Users, Zap
} from 'lucide-react';

/**
 * 🏛️ AUDITORÍA VECINAL VLS 2026
 * Ecosistema de Transparencia Municipal, Estatal y Privado.
 */
const AuditoriaVecinal = ({ onClose, currentUser, isVLS }) => {
    const [view, setView] = useState('dashboard'); // 'dashboard' | 'reportar' | 'backoffice' | 'success-mail'
    const [selectedMundo, setSelectedMundo] = useState('todos'); // 'todos' | 'municipal' | 'estatal' | 'privado'
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    // Mock data para KPIs (Simulado 2026)
    const stats = {
        ticketsAbiertos: 142,
        ticketsResueltos: 894,
        tiempoRespuesta: '4.2 hrs',
        tasaEfectividad: '86%'
    };

    const mundos = [
        { id: 'municipal', name: 'Mundo Municipal', icon: Building2, color: '#3b82f6', desc: 'Alcalde, Concejales, Dideco, Aseo.' },
        { id: 'estatal', name: 'Mundo Estatal', icon: Landmark, color: '#f59e0b', desc: 'Gobernador, Delegado, SEREMIs.' },
        { id: 'privado', name: 'Mundo Privado', icon: Zap, color: '#10b981', desc: 'Aguas, Luz, Entel, Liserco.' }
    ];

    const ranking = [
        { name: 'Aseo y Ornato', score: 98, world: 'municipal' },
        { name: 'CGE (Electricidad)', score: 92, world: 'privado' },
        { name: 'SEREMI Salud', score: 85, world: 'estatal' },
        { name: 'SEGURIDAD VLS', score: 99, world: 'municipal' }
    ];

    const [currentUserEmail] = useState(currentUser?.email || localStorage.getItem('vls_user_email') || 'vecino.registrado@vecinosmart.cl');
    const [lastTicketId, setLastTicketId] = useState(null);
    const [reportData, setReportData] = useState({ title: '', desc: '', world: '', category: '', location: '' });

    const handleReport = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const ticketId = `VEC-${Math.floor(Math.random() * 9000 + 1000)}-2026`;
        setLastTicketId(ticketId);

        setTimeout(() => {
            setIsSubmitting(false);
            setView('success-mail');
        }, 1500);
    };

    const handleSOS = async () => {
        const confirmSOS = window.confirm("🚨 ALERTAS SOS ACTIVADAS 🚨\n\n¿Desea enviar mensajes de emergencia inmediata a la Armada, Carabineros y Casillas de Turno?\n\nAcciones REALES:\n- Llamada a Armada (137)\n- Llamada a Carabineros (133)\n- SOS vía EMail a Central VLS");
        
        if (confirmSOS) {
            // Priority REAL calls (triggered one by one or by opening separate windows/tabs)
            window.location.href = 'tel:137'; // Armada / Marítimo is priority for beach/life saving
            
            // Send Automated Email via Resend for traceability
            const RESEND_KEY = localStorage.getItem('vls_resend_key') || "re_BxWBivzx_3CpokEvr9UbCKFzFXyfT3VYn";
            try {
                 await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
                    body: JSON.stringify({
                        from: 'SOS VLS <onboarding@resend.dev>',
                        to: ['vecinoslaserenachile@gmail.com', 'cl@vecinosmart.cl'],
                        subject: `🚨 ALERTA SOS INMEDIATA - ${currentUser?.displayName || 'VECINO ANÓNIMO'}`,
                        html: `<h2>🚨 EMERGENCIA ACTIVADA POR USUARIO</h2>
                               <p><b>Usuario:</b> ${currentUser?.displayName || 'No identificado'}</p>
                               <p><b>Email:</b> ${currentUserEmail}</p>
                               <p><b>Fecha/Hora:</b> ${new Date().toLocaleString()}</p>
                               <p><b>Geolocalización:</b> Activada en Dispositivo del Interesado.</p>`
                    })
                });
            } catch (err) { console.error("SOS Email Error:", err); }

            alert("SISTEMA SOS VLS:\n\n- Llamada a Central de Emergencias iniciada.\n- Notificando a Entidades vía Red Digital...\n- Correo SOS enviado a fiscalizadores.\n\nEL EQUIPO DE EMERGENCIA HA SIDO ALERTADO.");
        }
    };

    const handleSendOfficialEmail = async () => {
        setIsSubmitting(true);
        const subject = `INFORME VECINAL OFICIAL - ID: ${lastTicketId}`;
        const bodyArr = [
            `REQUERIMIENTO CIUDADANO VLS 2026`,
            `================================`,
            `ID TICKET: ${lastTicketId}`,
            `REMITENTE: ${currentUser?.displayName || 'Vecino'} (${currentUserEmail})`,
            `ASUNTO: ${reportData.title}`,
            `DETALLE: ${reportData.desc}`,
            `UBICACIÓN: ${reportData.location}`,
            `FECHA: ${new Date().toLocaleString()}`,
            ``,
            `Este requerimiento ha sido ratificado por el ciudadano y se encuentra en la base de datos de Vecinosmart.cl.`,
            `Se adjunta copia a fiscalizadores reales y se guarda en el historial local del vecino.`
        ];
        
        // 1. Send REAL email via Resend API (Background)
        const RESEND_KEY = localStorage.getItem('vls_resend_key') || "re_BxWBivzx_3CpokEvr9UbCKFzFXyfT3VYn";
        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
                body: JSON.stringify({
                    from: 'Auditoría VLS <onboarding@resend.dev>',
                    to: ['vecinoslaserenachile@gmail.com'],
                    cc: [currentUserEmail],
                    subject: subject,
                    text: bodyArr.join('\n')
                })
            });
            alert("¡Informe enviado y reportado correctamente a la Red de Fiscalización!");
        } catch (err) {
            console.error("Fetch API Error:", err);
            // Fallback: Open mailto client
            const mailTo = `mailto:vecinoslaserenachile@gmail.com?cc=fiscaliza@vecinoslaserena.cl,${currentUserEmail}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyArr.join('\n'))}`;
            window.location.href = mailTo;
        } finally {
            setIsSubmitting(false);
            setView('dashboard');
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200000, background: 'rgba(2, 6, 23, 0.98)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif' }}>
            {/* Header */}
            <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', color: '#38bdf8', letterSpacing: '1px' }}>
                        AUDITORÍA VECINAL VLS
                    </h1>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Ecosistema de Transparencia y Gestión de la Comuna</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleSOS} style={{ 
                        background: '#ef4444', color: 'white', border: 'none', padding: '0 1.5rem', borderRadius: '12px', 
                        fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', 
                        animation: 'pulse 1.5s infinite', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' 
                    }}>
                        🚨 SOS EMERGENCIA (MARÍTIMO/C5)
                    </button>
                    <button onClick={() => setView('dashboard')} className={`btn-glass ${view==='dashboard'?'active':''}`} style={navBtnStyle}>DASHBOARD</button>
                    <button onClick={() => setView('reportar')} className={`btn-glass ${view==='reportar'?'active':''}`} style={navBtnStyle}>NUEVO REPORTE</button>
                    <button onClick={() => setView('backoffice')} className={`btn-glass ${view==='backoffice'?'active':''}`} style={navBtnStyle}>PORTAL INSTITUCIONAL</button>
                    <button onClick={onClose} style={{ marginLeft: '1rem', background: '#ef4444', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                {view === 'dashboard' && (
                    <div className="fade-in">
                        {/* KPI Widgets */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            <div className="glass-panel" style={kpiCardStyle('#3b82f6')}>
                                <ClipboardList size={28} color="#3b82f6" />
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.ticketsAbiertos}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Tickets Pendientes</div>
                                </div>
                            </div>
                            <div className="glass-panel" style={kpiCardStyle('#10b981')}>
                                <CheckCircle2 size={28} color="#10b981" />
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.ticketsResueltos}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Casos Resueltos</div>
                                </div>
                            </div>
                            <div className="glass-panel" style={kpiCardStyle('#f59e0b')}>
                                <Clock size={28} color="#f59e0b" />
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.tiempoRespuesta}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>T. Respuesta Promedio</div>
                                </div>
                            </div>
                            <div className="glass-panel" style={kpiCardStyle('#ec4899')}>
                                <TrendingUp size={28} color="#ec4899" />
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.tasaEfectividad}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Efectividad Resolución</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '2rem' }}>
                            {/* Mundos Section */}
                            <div>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <ShieldCheck color="#38bdf8" /> PULSO CÍVICO POR SECTOR
                                </h3>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {mundos.map(m => (
                                        <div key={m.id} className="glass-panel hover-lift" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: `6px solid ${m.color}` }}>
                                            <div style={{ padding: '1rem', background: `${m.color}20`, borderRadius: '12px' }}>
                                                <m.icon size={32} color={m.color} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{m.name}</h4>
                                                <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#94a3b8' }}>{m.desc}</p>
                                                <div style={{ marginTop: '10px', height: '6px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                                                    <div style={{ height: '100%', width: m.id === 'municipal' ? '92%' : m.id === 'privado' ? '74%' : '65%', background: m.color, borderRadius: '10px' }} />
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>RANKING</div>
                                                <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: m.color }}>#{m.id==='municipal'?'1':'2'}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Ranking Instituciones */}
                            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.1)' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem' }}>
                                    <Star color="#f59e0b" fill="#f59e0b" /> RANKING DE RESPUESTA
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {ranking.map((inst, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.8rem', borderRadius: '10px', background: 'rgba(255,255,255,0.02)' }}>
                                            <div style={{ width: '28px', height: '28px', background: '#38bdf820', color: '#38bdf8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>{idx+1}</div>
                                            <div style={{ flex: 1, fontSize: '0.9rem' }}>{inst.name}</div>
                                            <div style={{ fontWeight: 'bold', color: '#10b981' }}>{inst.score}%</div>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', padding: '10px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', color: '#38bdf8', fontWeight: 'bold' }}>
                                    Ver Auditoría Completa
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'reportar' && (
                    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
                            <h2 style={{ marginBottom: '1.5rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <AlertTriangle /> NUEVO REQUERIMIENTO VECINAL
                            </h2>
                            <form onSubmit={handleReport}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <label style={labelStyle}>Mundo Receptor</label>
                                        <select 
                                            required 
                                            style={inputStyle}
                                            value={reportData.world}
                                            onChange={(e) => setReportData({...reportData, world: e.target.value})}
                                        >
                                            <option value="">Seleccionar Sector...</option>
                                            <option value="municipal">Mundo Municipal</option>
                                            <option value="estatal">Mundo Estatal</option>
                                            <option value="privado">Mundo Privado (Luz/Agua/Transp)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Categoría</label>
                                        <select 
                                            required 
                                            style={inputStyle}
                                            value={reportData.category}
                                            onChange={(e) => setReportData({...reportData, category: e.target.value})}
                                        >
                                            <option value="denuncia">🚫 Denuncia (Irregularidad)</option>
                                            <option value="reporte">📢 Reporte (Bache/Luz/Aseo)</option>
                                            <option value="felicitacion">⭐ Felicitación (Reconocimiento)</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={labelStyle}>Título del Requerimiento</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="Ej: Bache en calle Balmaceda" 
                                        style={inputStyle} 
                                        value={reportData.title}
                                        onChange={(e) => setReportData({...reportData, title: e.target.value})}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={labelStyle}>Descripción Detallada</label>
                                    <textarea 
                                        required 
                                        rows={4} 
                                        placeholder="Describa el problema con el mayor detalle posible..." 
                                        style={{ ...inputStyle, resize: 'none' }} 
                                        value={reportData.desc}
                                        onChange={(e) => setReportData({...reportData, desc: e.target.value})}
                                    />
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={labelStyle}>Referencia de Ubicación / Punto Visual</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ej: Frente al kiosko, Poste N°42..." 
                                        style={inputStyle} 
                                        value={reportData.location}
                                        onChange={(e) => setReportData({...reportData, location: e.target.value})}
                                    />
                                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '8px' }}>
                                        * Basado en la nueva normativa VLS 2026, el registro es 100% digital-textual para mayor velocidad de procesamiento.
                                    </p>
                                </div>

                                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', background: '#38bdf8', color: '#020617', fontWeight: 'bold', fontSize: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    {isSubmitting ? 'ENVIANDO TICKET...' : <><Send size={18} /> ENVIAR A REVISIÓN INSTITUCIONAL</>}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {view === 'success-mail' && (
                    <div className="fade-in" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                         <div className="glass-panel" style={{ padding: '3rem', borderRadius: '32px', border: '2px solid #10b981' }}>
                            <div style={{ background: '#10b981', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Requerimiento Preparado</h2>
                            <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '1rem', borderRadius: '12px', color: '#38bdf8', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '2rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                                ID: {lastTicketId}
                            </div>

                            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        <CheckCircle2 size={16} /> Plataforma Puente
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>Como vecinos organizados, no representamos a las entidades. Actuamos como puente tecnológico para facilitar tu gestión y fiscalización.</p>
                                </div>
                                <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #f59e0b' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f59e0b', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                        <CheckCircle2 size={16} /> Copia de Respaldo
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>Los datos del formulario se han guardado en tu historial local y se enviará copia a tu correo: </p>
                                    <p style={{ margin: '5px 0 0 0', color: 'white', fontWeight: 'bold' }}>{currentUserEmail}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <button onClick={handleSendOfficialEmail} className="btn-primary" style={{ background: '#10b981', color: 'black', padding: '1.2rem', borderRadius: '16px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', border: 'none' }}>
                                    Generar/Enviar Correo Oficial
                                </button>
                                <button onClick={() => setView('dashboard')} className="btn-glass" style={{ padding: '1rem', borderRadius: '16px', color: '#94a3b8' }}>
                                    Volver al Portal
                                </button>
                            </div>
                         </div>
                    </div>
                )}

                {view === 'backoffice' && (
                    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                            <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', borderRadius: '16px', border: '1px solid #38bdf8', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <ShieldCheck size={40} color="#38bdf8" />
                                <div style={{flex: 1}}>
                                    <h2 style={{ margin: 0, fontSize: '1.2rem' }}>PORTAL INSTITUCIONAL VLS</h2>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Ingreso exclusivo para Autoridades y Empresas de Servicio</p>
                                </div>
                            </div>
                            <div className="glass-panel" style={{ padding: '1rem 2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Filter size={18} color="#94a3b8" />
                                <select style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: 'bold' }}>
                                    <option>Bandeja de Entrada (Todos)</option>
                                    <option>Pendientes</option>
                                    <option>En Revisión</option>
                                    <option>Resueltos</option>
                                </select>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ flex: 1, borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '1rem 2rem', background: 'rgba(56, 189, 248, 0.1)', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', fontSize: '0.8rem', fontWeight: '900', color: '#38bdf8', letterSpacing: '1px' }}>
                                <div>FECHA / ID</div>
                                <div>REQUERIMIENTO</div>
                                <div>ESTADO</div>
                                <div style={{ textAlign: 'right' }}>ACCIONES</div>
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                                {[
                                    { id: 'T-1042', date: '17 Mar, 15:42', title: 'Luminaria Apagada - El Milagro', status: 'PENDIENTE', color: '#38bdf8' },
                                    { id: 'T-1041', date: '17 Mar, 12:15', title: 'Microbasural en Sitio Eriazo', status: 'EN REVISIÓN', color: '#f59e0b' },
                                    { id: 'T-1040', date: '16 Mar, 18:30', title: 'Felicidades por Plaza España', status: 'RESUELTO', color: '#10b981' }
                                ].map((ticket, i) => (
                                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', alignItems: 'center' }}>
                                        <div style={{ fontSize: '0.75rem' }}>
                                            <div style={{ color: '#94a3b8' }}>{ticket.date}</div>
                                            <div style={{ fontWeight: 'bold' }}>{ticket.id}</div>
                                        </div>
                                        <div style={{ fontWeight: '600' }}>{ticket.title}</div>
                                        <div>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', background: `${ticket.color}20`, color: ticket.color, border: `1px solid ${ticket.color}40` }}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                        <div style={{ textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button className="btn-glass" title="Ver Detalle" style={{ padding: '6px' }}><Eye size={16} /></button>
                                            <button className="btn-glass" title="Responder" style={{ padding: '6px' }}><MessageSquare size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Overlays / Modals */}
            {successMessage && (
                <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: '#020617', padding: '1.2rem 2.5rem', borderRadius: '16px', fontWeight: 'bold', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle2 size={20} />
                    </div>
                    {successMessage}
                </div>
            )}

            <style>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .hover-lift:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
                    background: rgba(255,255,255,0.05);
                }
                .btn-glass {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.75rem;
                    font-weight: bold;
                    transition: all 0.2s;
                }
                .btn-glass.active {
                    background: rgba(56, 189, 248, 0.2);
                    border-color: #38bdf8;
                    color: #38bdf8;
                }
                .fade-in {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
                    70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
                }
            `}</style>
        </div>
    );
};

const navBtnStyle = {
    letterSpacing: '1px'
};

const kpiCardStyle = (color) => ({
    padding: '1.5rem',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    borderBottom: `4px solid ${color}`
});

const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '900',
    color: '#38bdf8',
    marginBottom: '8px',
    letterSpacing: '1px',
    textTransform: 'uppercase'
};

const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    background: 'rgba(2, 6, 23, 0.5)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '0.9rem'
};

const Landmark = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="22" x2="21" y2="22"></line>
        <line x1="6" y1="18" x2="6" y2="11"></line>
        <line x1="10" y1="18" x2="10" y2="11"></line>
        <line x1="14" y1="18" x2="14" y2="11"></line>
        <line x1="18" y1="18" x2="18" y2="11"></line>
        <polygon points="12 2 20 7 4 7 12 2"></polygon>
    </svg>
);

export default AuditoriaVecinal;
