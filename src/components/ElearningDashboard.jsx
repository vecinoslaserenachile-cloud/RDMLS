import React, { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { BookOpen, User, Mail, Download, LogIn, Activity } from 'lucide-react';

export default function ElearningDashboard() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'elearning_records'), orderBy('timestamp', 'desc'), limit(100));
        const unsub = onSnapshot(q, (snapshot) => {
            const records = [];
            snapshot.forEach(doc => {
                records.push({ id: doc.id, ...doc.data() });
            });
            setLogs(records);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const getActionIcon = (action) => {
        if (action === 'login') return <LogIn size={16} color="#38bdf8" />;
        if (action === 'diploma_downloaded') return <Download size={16} color="#10b981" />;
        return <Activity size={16} color="#fbbf24" />;
    };

    if (loading) {
        return <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>Cargando registros e-learning...</div>;
    }

    return (
        <div style={{ padding: '2rem', color: 'white', height: '100%', overflowY: 'auto', background: '#0f172a', borderRadius: '20px', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '15px', borderRadius: '15px' }}>
                    <BookOpen size={30} color="#8b5cf6" />
                </div>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '900', margin: 0, color: 'white' }}>Registros E-Learning</h2>
                    <p style={{ color: '#94a3b8', margin: 0 }}>Monitoreo de capacitaciones y descargas de diplomas</p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {logs.length === 0 ? (
                    <p style={{ color: '#94a3b8' }}>No hay registros disponibles aún.</p>
                ) : (
                    logs.map(log => (
                        <div key={log.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', alignItems: 'center', gap: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', width: '40px', height: '40px', borderRadius: '10px' }}>
                                {getActionIcon(log.action)}
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#f8fafc' }}>{log.name}</span>
                                <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={14} /> {log.email}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}><BookOpen size={14} /> {log.course}</span>
                                </div>
                            </div>

                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: log.action === 'diploma_downloaded' ? '#10b981' : '#38bdf8' }}>
                                {log.action === 'diploma_downloaded' ? 'Descargó Diploma' : 'Inició Sesión'}
                            </div>

                            <div style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'right' }}>
                                {log.timestamp ? new Date(log.timestamp.toDate()).toLocaleString() : 'Reciente'}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
