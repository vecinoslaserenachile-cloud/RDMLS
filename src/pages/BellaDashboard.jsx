import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Sun, Moon, Rss, Radio, Info, Play, Pause, X, ChevronUp, ChevronDown } from 'lucide-react';
import { t } from '../context/LanguageContext';

// --- SUB-COMPONENTES SKELETON (Sin CSS final aún) ---

const BellaHeader = ({ theme, toggleTheme }) => (
    <header>
        <div>
            <h2>LA SERENA SMART CITY</h2>
            <p>Bento Box Edition (v3.2)</p>
        </div>
        <div>
            <button onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button><Settings size={18} /></button>
        </div>
    </header>
);

const BentoCard = ({ title, children, isSkeleton }) => (
    <div className={`bento-card ${isSkeleton ? 'skeleton-loading' : ''}`}>
        {title && <h3>{title}</h3>}
        <div className="bento-content">
            {children}
        </div>
    </div>
);

const BellaWeatherWidget = () => (
    <div>
        <p>18°C - Despejado</p>
        <p>Humedad: 75% | Viento: 12 km/h</p>
    </div>
);

const VecinityPayMini = () => (
    <div>
        <h3>Banco Vecinal</h3>
        <p>0 Fichas VLS</p>
        <button>Recargar</button>
    </div>
);

const BellaMediaWidget = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div>
            <h3>Reproductor VLS</h3>
            <div>
                <button><Play size={16} /></button>
                <button><Pause size={16} /></button>
            </div>
            <div>
               <button onClick={() => setIsExpanded(!isExpanded)}>
                   {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
               </button>
               <button><X size={14} /></button>
            </div>
        </div>
    );
};

const IconGrid = () => (
    <div>
        <button>Paseo 3D</button>
        <button>Eventos</button>
        <button>Salud</button>
        <button>Educación</button>
    </div>
);

const PatronageButton = () => (
    <button>
        Oye te queremos apoyar...
    </button>
);

// --- COMPONENTE PRINCIPAL ---

export default function BellaDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Simulando carga de skeleton ultra-rápida (Micro-interacción)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    return (
        <div className={`bella-container theme-${theme}`}>
            <BellaHeader theme={theme} toggleTheme={toggleTheme} />

            <main className="bella-bento-grid">
                
                {/* 1. Clima y Estado */}
                <BentoCard title="Monitor Local" isSkeleton={isLoading}>
                    {!isLoading && <BellaWeatherWidget />}
                </BentoCard>

                {/* 2. Banco Vecinal */}
                <BentoCard title="Finanzas" isSkeleton={isLoading}>
                    {!isLoading && <VecinityPayMini />}
                </BentoCard>

                {/* 3. Media & Radio */}
                <BentoCard title="Transmisión Oficial" isSkeleton={isLoading}>
                    {!isLoading && <BellaMediaWidget />}
                </BentoCard>

                {/* 4. Módulos Críticos */}
                <BentoCard title="Accesos Rápidos" isSkeleton={isLoading}>
                    {!isLoading && <IconGrid />}
                </BentoCard>

                {/* 5. Noticias Feed */}
                <BentoCard title="Smart Feed" isSkeleton={isLoading}>
                    {!isLoading && <p>Últimas noticias de La Serena...</p>}
                </BentoCard>

                {/* 6. Mecenazgo */}
                <BentoCard isSkeleton={isLoading}>
                    {!isLoading && <PatronageButton />}
                </BentoCard>

            </main>
        </div>
    );
}
