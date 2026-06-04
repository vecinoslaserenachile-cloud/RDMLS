import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Moon, Sun, ChevronRight, ChevronLeft, Bookmark } from 'lucide-react';

const PAGES = [
    {
        title: "El Génesis de la Plataforma",
        text: (
            <>
                <p>Hola a todos. Hoy quiero contarles cómo, durante este último periodo, logramos transformar una visión de modernización institucional en una realidad tecnológica tangible, de bajo costo y completamente de código abierto para nuestra Ilustre Municipalidad de La Serena (IMLS).</p>
                <p>Comenzamos nuestro viaje construyendo los cimientos con <strong>RDMLS.cl</strong>, la Radio Digital Municipal. Lo que partió como el génesis de nuestra comunicación soberana se convirtió en un nodo de transmisión en tiempo real que no necesita grandes espectros radioeléctricos, sino que aprovecha la inmensa red de internet para llevar nuestra voz comunal a cada hogar.</p>
                <p>Y desde esa voz, empezamos a articular los cuatro grandes pilares de la plataforma <strong>VecinoSmart</strong>.</p>
            </>
        )
    },
    {
        title: "Pilares Fundamentales",
        text: (
            <>
                <p>En la arista de la gestión ciudadana <em>(Smart Citizens)</em>, desplegamos herramientas para que cada residente sienta a su municipio más cerca. Habilitamos nuestro portal principal y herramientas como <strong>PuertaSmart Evolution</strong>, que pasó de ser un simple prototipo a un robusto sistema de radar y control de acceso inteligente.</p>
                <p>Por otro lado, sabíamos que la modernización tiene que empezar por casa <em>(Smart Administration)</em>. Logramos un salto gigante implementando nuestro módulo de <strong>Gestión de Recursos Humanos Cero Papel</strong>, donde los trabajadores a honorarios pueden emitir sus informes mensuales con firma digital, ahorrando tiempo y muchísimos recursos.</p>
                <p>A esto le sumamos nuestra plataforma de <strong>E-Learning</strong>, para que cada nuevo funcionario, mediante un portal interactivo, complete su inducción y reciba de manera inmediata su diploma validado.</p>
            </>
        )
    },
    {
        title: "Inteligencia y Eventos",
        text: (
            <>
                <p>No nos detuvimos ahí. Para mantener la excelencia en nuestras actividades oficiales <em>(Smart Events)</em>, lanzamos nuestro monitor de <strong>Protocolo Institucional</strong>, que gestiona en tiempo real las precedencias de las autoridades para que cada evento municipal sea impecable.</p>
                <p>Y con miras al futuro <em>(Smart Listening)</em>, hemos encendido la mecha de <strong>Centinel Faro</strong>, una iniciativa impulsada por inteligencia artificial (IA) local, diseñada para hacer una escucha territorial genuina y entender cómo se siente nuestra gente en las calles, ayudándonos a tomar decisiones con precisión forense.</p>
            </>
        )
    },
    {
        title: "Campañas y Visuales",
        text: (
            <>
                <p>Y porque la tecnología debe estar al servicio de lo cotidiano, en este periodo también fortalecimos nuestro rol de difusión mediante la <strong>Radio de Campaña</strong>. Implementamos reproductores de audio directo para masificar las campañas vitales del año: los jingles informativos sobre el pago de <em>Permisos de Circulación</em> y las iniciativas educativas de nuestros <em>Cursos y Talleres de Inglés</em>.</p>
                <p>Finalmente, cerramos este gran ciclo integrando la identidad de nuestros proyectos a la vista de todos. Alojamos de forma segura nuestras propuestas gráficas directamente en <strong>vecinosmart.cl</strong>. Hoy, cualquier ciudadano puede revisar en un par de clics la Guía de Producción y las asombrosas narrativas en 3D de nuestro querido Serenito.</p>
                <p style={{ marginTop: '2rem', fontStyle: 'italic', textAlign: 'center', opacity: 0.8 }}>"El futuro digital del municipio ya no es una promesa; está desplegado, está en línea y está funcionando."</p>
            </>
        )
    }
];

export default function EInkReader() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const nextPage = () => {
        if (currentPage < PAGES.length - 1) setCurrentPage(p => p + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(p => p - 1);
    };

    // Estilos de Tinta Electrónica
    const colors = isDarkMode 
        ? { bg: '#1a1a1a', border: '#333333', text: '#d4d4d4', highlight: '#f59e0b', subtext: '#737373', screenBg: '#121212' }
        : { bg: '#f4f4f4', border: '#d1d1d1', text: '#2d2d2d', highlight: '#c0392b', subtext: '#737373', screenBg: '#e8e8e8' };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            padding: '2rem clamp(0.5rem, 2vw, 1rem)', width: '100%', minHeight: '600px',
            fontFamily: '"Merriweather", "Georgia", serif'
        }}>
            {/* Bisel del dispositivo E-Ink */}
            <div style={{
                background: colors.border,
                padding: 'clamp(0.5rem, 3vw, 1.5rem)',
                borderRadius: '24px',
                boxShadow: isDarkMode ? '0 20px 40px rgba(0,0,0,0.8)' : '0 20px 40px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '700px',
                transition: 'background 0.4s'
            }}>
                {/* Pantalla E-Ink */}
                <div style={{
                    background: colors.screenBg,
                    borderRadius: '12px',
                    minHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'background 0.4s'
                }}>
                    {/* Header del Lector */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '1rem clamp(0.75rem, 3vw, 1.5rem)', borderBottom: `1px solid ${isDarkMode ? '#333' : '#d1d1d1'}`,
                        color: colors.subtext, fontSize: '0.8rem', fontFamily: 'sans-serif', fontWeight: 'bold'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '1px' }}>
                            <BookOpen size={14} /> <span>MEMORIA VECINOSMART</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span>{currentPage + 1} de {PAGES.length}</span>
                            <button 
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                style={{
                                    background: 'transparent', border: 'none', cursor: 'pointer',
                                    color: colors.subtext, display: 'flex', alignItems: 'center'
                                }}
                                title="Cambiar modo noche"
                            >
                                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Contenido del Libro (Animado) */}
                    <div style={{ flex: 1, padding: 'clamp(1.5rem, 5vw, 2.5rem) clamp(1.2rem, 5vw, 3rem)', position: 'relative' }}>
                        <h2 style={{ 
                            color: colors.text, fontSize: '1.6rem', marginTop: 0, marginBottom: '2rem',
                            fontWeight: '700', letterSpacing: '-0.5px', transition: 'color 0.4s',
                            display: 'flex', alignItems: 'center', gap: '0.75rem'
                        }}>
                            <Bookmark size={24} color={colors.highlight} />
                            {PAGES[currentPage].title}
                        </h2>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    color: colors.text,
                                    fontSize: '1.1rem',
                                    lineHeight: '1.8',
                                    transition: 'color 0.4s'
                                }}
                                className="e-ink-content"
                            >
                                {PAGES[currentPage].text}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controles de Navegación Footer */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', padding: '1rem clamp(0.75rem, 3vw, 2rem)',
                        background: isDarkMode ? '#1a1a1a' : '#f4f4f4', borderTop: `1px solid ${isDarkMode ? '#333' : '#d1d1d1'}`
                    }}>
                        <button 
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            style={{
                                background: 'transparent', border: 'none', color: currentPage === 0 ? 'transparent' : colors.text,
                                cursor: currentPage === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                                fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.85rem'
                            }}
                        >
                            <ChevronLeft size={18} /> ANTERIOR
                        </button>

                        <div style={{ color: colors.highlight, fontWeight: '900', letterSpacing: '2px', fontSize: '0.7rem', display: 'flex', alignItems: 'center' }}>
                            VECINOSMART.CL
                        </div>

                        <button 
                            onClick={nextPage}
                            disabled={currentPage === PAGES.length - 1}
                            style={{
                                background: 'transparent', border: 'none', color: currentPage === PAGES.length - 1 ? 'transparent' : colors.text,
                                cursor: currentPage === PAGES.length - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                                fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.85rem'
                            }}
                        >
                            SIGUIENTE <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
            {/* CSS Global Injectado para asegurar estilos dentro de e-ink-content */}
            <style dangerouslySetInnerHTML={{__html: `
                .e-ink-content p { margin-bottom: 1.5rem; text-align: justify; hyphens: auto; color: ${colors.text} !important; }
                .e-ink-content strong { font-weight: 800; color: ${isDarkMode ? '#fff' : '#000'} !important; }
                .e-ink-content em { font-style: italic; color: ${colors.highlight} !important; }
            `}} />
        </div>
    );
}
