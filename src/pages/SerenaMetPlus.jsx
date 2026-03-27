import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Cloud, Sun, Wind, Droplets, Thermometer, 
    Navigation, RefreshCcw, ShieldCheck, Ticket, 
    AlertTriangle, History, Info, MapPin, 
    ArrowLeft, Layers, Zap, Clock, Maximize2
} from 'lucide-react';

/* --- CONFIGURACIÓN --- */
const SMP_CONFIG = {
    apiKey: '9a9d7c3d9a5b4c1fb3a221013242503', // Placeholder / Clave institucional
    cacheTime: 15 * 60 * 1000,
    sessionTime: 60 * 1000
};

export default function SerenaMetPlus() {
    const navigate = useNavigate();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [error, setError] = useState(null);
    const [fichas, setFichas] = useState(15); // Mocked Balance

    /* --- LÓGICA DE FICHAS --- */
    const descontarFicha = () => {
        if (fichas > 0) {
            setFichas(prev => prev - 1);
            return true;
        }
        return false;
    };

    const reembolsarFicha = () => {
        setFichas(prev => prev + 1);
    };

    /* --- MOTOR CLIMÁTICO --- */
    const fetchWeather = useCallback(async (localidad = 'La Serena') => {
        const cacheKey = `smp_cache_${localidad}`;
        const cached = JSON.parse(localStorage.getItem(cacheKey));
        const now = Date.now();

        if (cached && (now - cached.timestamp < SMP_CONFIG.cacheTime)) {
            setWeather(cached.data);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${SMP_CONFIG.apiKey}&q=${localidad}&lang=es`);
            if (!res.ok) throw new Error("API Fallida");
            const data = await res.json();
            
            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: now,
                data: data
            }));
            setWeather(data);
        } catch (err) {
            setError("Error al sincronizar con satélite climatológico.");
            reembolsarFicha();
        } finally {
            setLoading(false);
        }
    }, []);

    const iniciarModulo = () => {
        if (descontarFicha()) {
            setActive(true);
            setTimeLeft(60);
            fetchWeather();
        } else {
            setError("Saldo insuficiente. Adquiere fichas en Vecinity Pay.");
        }
    };

    /* --- TIMER DE SESIÓN --- */
    useEffect(() => {
        let timer;
        if (active && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setActive(false);
        }
        return () => clearInterval(timer);
    }, [active, timeLeft]);

    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: 'white', fontFamily: 'system-ui', padding: '2rem' }}>
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '5px' }}>SerenaMet <span style={{ color: '#38bdf8' }}>Plus+</span></h1>
                        <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>SISTEMA DE PRECISIÓN CLIMATOLÓGICA URBANA</div>
                    </div>
                </div>

                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1.5rem', borderRadius: '20px', alignItems: 'center', gap: '15px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold' }}>BILLETERA VLS</div>
                        <div style={{ fontWeight: 'black', fontSize: '1.2rem' }}>{fichas} <span style={{ color: '#f59e0b' }}>🎟️</span></div>
                    </div>
                </div>
            </header>

            <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <AnimatePresence mode="wait">
                    {!active ? (
                        <motion.div 
                            key="locked"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            style={{ 
                                background: 'rgba(15, 23, 42, 0.5)', 
                                border: '1px solid rgba(255,255,255,0.05)', 
                                borderRadius: '32px', 
                                padding: '5rem', 
                                textAlign: 'center',
                                backdropFilter: 'blur(20px)'
                            }}
                        >
                            <div style={{ background: 'rgba(56, 189, 248, 0.1)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                <Zap size={50} color="#38bdf8" fill="#38bdf8" />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>Sincronización Meteorológica Requerida</h2>
                            <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                                Accede a telemetría de alta precisión, mapas de viento y sensores urbanos en tiempo real.
                            </p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                                <button 
                                    onClick={iniciarModulo}
                                    style={{ background: '#38bdf8', color: '#000', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }}
                                >
                                    INGRESAR 1 FICHA <Ticket size={20} />
                                </button>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Sesión activa de 60 segundos por ficha</div>
                            </div>

                            {error && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '2rem', color: '#ef4444', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <AlertTriangle size={16} /> {error}
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="unlocked"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }}
                        >
                            {/* Main Display */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '32px', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                                    {/* Timer Ring */}
                                    <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.4)', padding: '8px 15px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <Clock size={16} color={timeLeft < 10 ? '#ef4444' : '#38bdf8'} />
                                        <span style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.1rem', color: timeLeft < 10 ? '#ef4444' : 'white' }}>00:{timeLeft.toString().padStart(2, '0')}</span>
                                    </div>

                                    {loading ? (
                                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <RefreshCcw className="spin" size={40} color="#38bdf8" />
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <img src={weather?.current.condition.icon.replace('64x64', '128x128')} alt="Status" style={{ width: '150px', filter: 'drop-shadow(0 0 20px #38bdf850)' }} />
                                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{weather?.current.condition.text}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '6rem', fontWeight: 'black', lineHeight: 1 }}>{weather?.current.temp_c}°</div>
                                                <div style={{ fontSize: '1.2rem', color: '#94a3b8', marginTop: '-10px' }}>Sensación Térmica: {weather?.current.feelslike_c}°C</div>
                                                
                                                <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <Wind size={20} color="#38bdf8" /> 
                                                        <div>
                                                            <div style={{ fontSize: '0.6rem', color: '#64748b' }}>VIENTO</div>
                                                            <div style={{ fontWeight: 'bold' }}>{weather?.current.wind_kph} km/h</div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <Droplets size={20} color="#10b981" /> 
                                                        <div>
                                                            <div style={{ fontSize: '0.6rem', color: '#64748b' }}>HUMEDAD</div>
                                                            <div style={{ fontWeight: 'bold' }}>{weather?.current.humidity}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: '#94a3b8' }}>PRESIÓN ATMOSFÉRICA</h4>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{weather?.current.pressure_mb} mb</div>
                                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: '15px' }}>
                                            <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} style={{ height: '100%', background: '#38bdf8' }} />
                                        </div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: '#94a3b8' }}>ÍNDICE UV</h4>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{weather?.current.uv} LOW</div>
                                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: '15px' }}>
                                            <motion.div initial={{ width: 0 }} animate={{ width: '20%' }} style={{ height: '100%', background: '#10b981' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lateral Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '2rem', borderRadius: '28px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                        <Info size={16} color="#38bdf8" />
                                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#38bdf8' }}>SERENITO INFO</span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                                        "El clima en La Serena hoy es ideal para caminar por la Avenida del Mar. ¡Usa bloqueador!"
                                    </p>
                                </div>

                                <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '2rem', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h4 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem' }}>HISTORIAL DE FICHA</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                            <span style={{ color: '#94a3b8' }}>Consumo Sesión</span>
                                            <span style={{ color: '#ef4444' }}>-1 Ficha</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                            <span style={{ color: '#94a3b8' }}>IP Origin</span>
                                            <span>201.21.XX.X</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spin { animation: spin 2s linear infinite; }
            `}</style>
        </div>
    );
}
