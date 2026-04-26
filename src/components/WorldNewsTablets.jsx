import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ExternalLink, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { InternationalNewsService } from '../services/InternationalNewsService';

export default function WorldNewsTablets() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const data = await InternationalNewsService.getBreakingNews();
            setNews(data);
            setLoading(false);
        };
        fetchNews();
    }, []);

    // Auto-advance news
    useEffect(() => {
        if (news.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % news.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [news]);

    if (loading && news.length === 0) {
        return (
            <div style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid #ef4444', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
                <span style={{ color: '#ef4444', marginLeft: '10px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>SINCRONIZANDO PRENSA GLOBAL...</span>
            </div>
        );
    }

    const currentItem = news[currentIndex];

    return (
        <div style={{ width: '100%', marginBottom: '3rem', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', padding: '0 10px' }}>
                <div style={{ 
                    background: 'linear-gradient(90deg, #ef4444, #991b1b)', 
                    padding: '8px 20px', 
                    borderRadius: '50px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)'
                }}>
                    <Globe size={18} color="white" className="animate-spin-slow" />
                    <span style={{ color: 'white', fontWeight: '950', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>SENTINEL RADAR MUNDIAL</span>
                </div>
                <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.6), transparent)' }}></div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>PRENSA INTERNACIONAL EN VIVO</div>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '1.5rem' 
            }}>
                <AnimatePresence mode="popLayout">
                    {news.slice(currentIndex, currentIndex + (window.innerWidth < 1024 ? 1 : 3)).map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            style={{
                                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%)',
                                border: '1.5px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '24px',
                                padding: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onClick={() => window.open(item.url, '_blank')}
                            whileHover={{ y: -10, borderColor: '#ef4444', boxShadow: '0 30px 60px rgba(239, 68, 68, 0.2)' }}
                        >
                            {/* Decorative Corner Label */}
                            <div style={{ position: 'absolute', top: 15, right: 15, zIndex: 2 }}>
                                <div style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '6px', fontSize: '0.6rem', fontWeight: 900 }}>LIVE</div>
                            </div>

                            {item?.image && (
                                <div style={{ width: '100%', height: '160px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)' }}>
                                    <img 
                                        src={item.image} 
                                        alt="" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px' }}>{item?.source?.name || 'SENTINEL'}</span>
                                    <Activity size={14} color="#ef4444" className="animate-pulse" />
                                </div>
                                
                                <h4 style={{ color: 'white', margin: 0, fontSize: '1.2rem', fontWeight: '900', lineHeight: '1.2', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: '"Outfit", sans-serif' }}>
                                    {item?.title}
                                </h4>

                                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 'bold' }}>REUTERS / AP / BBC</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ef4444', fontSize: '0.8rem', fontWeight: 900 }}>
                                        LEER MÁS <ExternalLink size={14} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Manual Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '2rem' }}>
                <button 
                    onClick={() => setCurrentIndex(prev => (prev - 1 + news.length) % news.length)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 20px', borderRadius: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900' }}
                >
                    <ChevronLeft size={20} /> ANTERIOR
                </button>
                <button 
                    onClick={() => setCurrentIndex(prev => (prev + 1) % news.length)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 20px', borderRadius: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900' }}
                >
                    SIGUIENTE <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
