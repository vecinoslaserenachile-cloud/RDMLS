import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CloudRain, Sun, Moon, Cloud, CloudSnow, CloudFog, CloudLightning } from 'lucide-react';
import OldTVModal from '../../components/OldTVModal';
import VhsTVModal from '../../components/VhsTVModal';
import RadioPlayer from '../../components/RadioPlayer';

function TimeWidget() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatoDia = new Intl.DateTimeFormat('es-CL', { weekday: 'long' }).format(time);
    const formatoFecha = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }).format(time);
    const formatoHora = new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(time);

    return (
        <div style={{ padding: '0.8rem', background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', fontFamily: 'monospace', letterSpacing: '2px', marginBottom: '0.2rem' }}>
                {formatoHora}
            </div>
            <div style={{ textTransform: 'capitalize', color: 'white', fontSize: '0.9rem' }}>
                {formatoDia}, {formatoFecha}
            </div>
        </div>
    );
}

export default function PuntoVecinal() {
    const navigate = useNavigate();
    const [weather, setWeather] = useState(null);
    const [showRetroTV, setShowRetroTV] = useState(false);
    const [showVhsTV, setShowVhsTV] = useState(false);

    useEffect(() => {
        // Clima real y preciso de La Serena
        const fetchWeather = () => {
            fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2520&current=temperature_2m,weathercode,is_day&timezone=America%2FSantiago')
                .then(res => res.json())
                .then(data => {
                    if (data?.current) {
                        setWeather({
                            temp: data.current.temperature_2m,
                            code: data.current.weathercode,
                            isDay: data.current.is_day
                        });
                    }
                })
                .catch(err => console.error("Error fetching real weather:", err));
        };

        fetchWeather();
        const weatherInterval = setInterval(fetchWeather, 300000);
        return () => clearInterval(weatherInterval);
    }, []);

    const [newsItems, setNewsItems] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('rdmls_news'));
            return (stored && Array.isArray(stored) && stored.length > 0) ? stored : [
                { title: "Municipio lanza plan de recambio de luminarias", date: "Hace 2 horas", type: "Obras" },
                { title: "Nuevas cámaras conectadas a Faro C5", date: "Hace 5 horas", type: "Seguridad" },
                { title: "Corte de calle programado en sector Las Compañías", date: "Ayer", type: "Tránsito" },
                { title: "Abiertas postulaciones a capital semilla comunal", date: "Ayer", type: "Fomento" }
            ];
        } catch(e) {
            return [
                { title: "Municipio lanza plan de recambio de luminarias", date: "Hace 2 horas", type: "Obras" },
                { title: "Nuevas cámaras conectadas a Faro C5", date: "Hace 5 horas", type: "Seguridad" },
                { title: "Corte de calle programado en sector Las Compañías", date: "Ayer", type: "Tránsito" },
                { title: "Abiertas postulaciones a capital semilla comunal", date: "Ayer", type: "Fomento" }
            ];
        }
    });

    const [marquees, setMarquees] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('rdmls_marquees'));
            return (stored && Array.isArray(stored) && stored.length > 0) ? stored : [
                { id: 1, text: "🚨 MUNICIPALIDAD INFORMA: Evite transitar por Avenida de Aguirre entre Balmaceda y Los Carrera hoy a las 18:00 hrs por trabajos de mantención. /// ✅ Recordatorio: El pago del permiso de circulación vence el 31 de marzo, puede pagar online en nuestro portal. /// ☀️ Pronóstico para hoy: Despejado, máxima de 21°C. Manténgase hidratado." }
            ];
        } catch(e) {
            return [
                { id: 1, text: "🚨 MUNICIPALIDAD INFORMA: Evite transitar por Avenida de Aguirre entre Balmaceda y Los Carrera hoy a las 18:00 hrs por trabajos de mantención. /// ✅ Recordatorio: El pago del permiso de circulación vence el 31 de marzo, puede pagar online en nuestro portal. /// ☀️ Pronóstico para hoy: Despejado, máxima de 21°C. Manténgase hidratado." }
            ];
        }
    });

    useEffect(() => {
        const handleStorage = () => {
            try {
                const snStr = localStorage.getItem('rdmls_news');
                const smStr = localStorage.getItem('rdmls_marquees');
                if (snStr) {
                    const sn = JSON.parse(snStr);
                    if (sn && sn.length > 0) setNewsItems(sn);
                }
                if (smStr) {
                    const sm = JSON.parse(smStr);
                    if (sm && sm.length > 0) setMarquees(sm);
                }
            } catch (e) { }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const getWeatherIcon = () => {
        if (!weather) return null;
        const { code, isDay } = weather;
        let Icon = isDay ? Sun : Moon;
        let animClass = 'pulse-slow';
        if (code === 1 || code === 2 || code === 3) { Icon = Cloud; animClass = 'float-slow'; }
        if (code >= 45 && code <= 48) { Icon = CloudFog; animClass = 'fade-slow'; }
        if (code >= 51 && code <= 67) { Icon = CloudRain; animClass = 'shake-slow'; }
        if (code >= 71 && code <= 86) { Icon = CloudSnow; animClass = 'spin-slow'; }
        if (code >= 95) { Icon = CloudLightning; animClass = 'flash-slow'; }
        return <Icon size={40} className={animClass} color={isDay ? "#fcd34d" : "#bae6fd"} />;
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #020617 100%)', color: 'white', overflow: 'hidden', padding: '1rem', boxSizing: 'border-box'
        }}>
            {/* Header y Clima */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={() => navigate('/')} className="btn-glass" style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}>
                        <Home size={24} />
                    </button>
                    <img src="/logo-smartls-v3.png" alt="Smart LS" style={{ height: '50px', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.5))' }} />
                </div>

                <div>
                    <TimeWidget />
                </div>

                <div className="glass-panel" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                    {getWeatherIcon()}
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: weather?.isDay ? '#fcd34d' : '#bae6fd' }}>
                            {weather ? `${weather.temp}°C` : '--'}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>La Serena, CL</div>
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr) minmax(300px, 0.8fr)', gap: '1.5rem', flex: 1, minHeight: 0 }}>

                {/* Columna Izquierda: Noticias */}
                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', overflowY: 'auto' }}>
                    <h2 style={{ margin: 0, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', paddingBottom: '0.8rem' }}>
                        Titulares Comunales
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {newsItems.map((news, i) => (
                            <div key={news.id || i} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
                                <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginBottom: '0.3rem', fontWeight: 'bold' }}>{news.category || news.type} • {news.date}</div>
                                <div style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{news.title}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Columna Central: TV / Media */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ flex: 1, border: '1px solid rgba(236, 72, 153, 0.4)', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8))', zIndex: 1 }}></div>
                        <img src="/tv-bg.jpg" alt="Fondo Nostalgia" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} onError={(e) => { e.target.style.display = 'none'; }} />
                        <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                            <h2 style={{ color: '#ec4899', margin: '0 0 1rem 0', textShadow: '0 2px 10px rgba(0,0,0,0.8)', fontSize: '1.8rem', textAlign: 'center' }}>Portal del Recuerdo TV</h2>
                            <p style={{ textAlign: 'center', color: '#e2e8f0', marginBottom: '2rem' }}>Revive momentos dorados de la ciudad en nuestras pantallas interactivas.</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={() => setShowRetroTV(true)} className="btn pulse" style={{ background: 'linear-gradient(45deg, #ec4899, #be185d)', border: 'none', color: 'white', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 'bold' }}>Canal 4 Retro</button>
                                <button onClick={() => setShowVhsTV(true)} className="btn pulse" style={{ background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)', border: 'none', color: 'white', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 'bold' }}>Canal 5 VHS</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Radio y Arcade */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: '180px' }}>
                        <h2 style={{ color: '#f59e0b', margin: '0 0 1rem 0', fontSize: '1.3rem' }}>Radio Digital</h2>
                        {/* Invocar al RadioPlayer. Necesitaremos estilizarlo un poco si no queremos que flote aquí */}
                        <div style={{ width: '100%', transform: 'scale(0.9)', transformOrigin: 'top center' }}>
                            <RadioPlayer globalWeather={weather} inline={true} />
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(88,28,135,0.4))' }}>
                        <h2 style={{ color: '#c084fc', margin: '0 0 0.5rem 0', fontSize: '1.8rem', textShadow: '0 0 15px rgba(192, 132, 252, 0.5)', fontFamily: 'cursive' }}>Delta Arcade</h2>
                        <p style={{ color: '#e2e8f0', textAlign: 'center', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Play Center Comunitario</p>
                        <button onClick={() => navigate('/senior-games')} className="btn pulse" style={{ background: 'transparent', border: '2px solid #c084fc', color: '#c084fc', padding: '0.8rem 2rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Entrar a la Zona de Juegos
                        </button>
                    </div>
                </div>
            </div>

            {/* Modales TV */}
            {showRetroTV && <OldTVModal onClose={() => setShowRetroTV(false)} />}
            {showVhsTV && <VhsTVModal onClose={() => setShowVhsTV(false)} />}

            {/* Franja Mensajes Foot */}
            <div style={{ marginTop: '1.5rem', background: 'rgba(56, 189, 248, 0.1)', borderTop: '2px solid rgba(56, 189, 248, 0.5)', padding: '0.5rem', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '8px' }}>
                <div style={{ display: 'inline-block', animation: 'marquee 30s linear infinite', color: '#38bdf8', fontWeight: 'bold' }}>
                    {marquees.map((m, i) => (
                        <span key={m.id || i} style={{ marginRight: '3rem' }}>{m.text}</span>
                    ))}
                    {marquees.map((m, i) => (
                        <span key={(m.id || i) + 'repeat'} style={{ marginRight: '3rem' }}>{m.text}</span>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(100vw); }
                    100% { transform: translateX(-150%); }
                }
            `}</style>
        </div>
    );
}
