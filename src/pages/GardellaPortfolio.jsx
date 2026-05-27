import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, Camera, Palette, Music, Info, Car, Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GardellaPortfolio({ onClose }) {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Gallery Pages 1 to 53
    const pages = Array.from({ length: 53 }, (_, i) => i + 1);
    
    // Audio Player State
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const playlist = [
        { title: "Narrativa: Autos Clásicos en Tiza", src: "/media/arquiartista/Autos_clásicos_en_tiza_sobre_pizarrón.mp3", duration: "Track 1" },
        { title: "Canción: Tiza Sobre Pizarrón", src: "/media/arquiartista/Tiza_Sobre_Pizarron.mp3", duration: "Track 2" },
        { title: "Canción: LALO", src: "/media/arquiartista/LALO.mp3", duration: "Track 3" },
        { title: "Canción: LALO Auto", src: "/media/arquiartista/LALOauto.mp3", duration: "Track 4" }
    ];

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % playlist.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = playlist[currentTrack].src;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log('Audio play failed:', e));
            }
        }
    }, [currentTrack]);

    const handleEnded = () => {
        nextTrack();
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e5e7eb', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
            
            {/* Header Sticky */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '70px', background: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', padding: '0 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button 
                    onClick={() => { if(onClose) { onClose(); } else { window.history.back(); } }}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    <ChevronLeft size={16} /> Volver
                </button>
                <div style={{ flex: 1, textAlign: 'center', fontWeight: '900', letterSpacing: '2px', fontSize: '1rem', color: '#a855f7' }}>
                    BLACKBOARD SERIES
                </div>
            </div>

            {/* Hero Section */}
            <div style={{ paddingTop: '100px', paddingBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid #a855f7', padding: '6px 16px', borderRadius: '50px', color: '#d8b4fe', fontSize: '0.8rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '1.5rem' }}>
                        <Palette size={14} /> EXCLUSIVO - ARTE Y MOTOR
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '950', lineHeight: '1.1', letterSpacing: '-1.5px', marginBottom: '1rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        Luz, Tiza y Motor.<br/>
                        <span style={{ background: 'linear-gradient(90deg, #d8b4fe, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Eduardo Gardella</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#9ca3af', maxWidth: '800px', margin: '0 auto', fontWeight: '500', lineHeight: '1.6' }}>
                        El hiperrealismo automotriz que cautivó a la Región de Coquimbo (Edición Extendida)
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#a855f7', marginTop: '1rem', fontWeight: 'bold' }}>Por: Equipo de Cultura - Vecinos La Serena (vecinoslaserena.cl)</p>
                </motion.div>

                {/* Fundamental Photos */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', marginBottom: '4rem' }}>
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                        <img src="/media/arquiartista/EDUARDO.jpg" alt="Eduardo Gardella Fotografía" style={{ width: '100%', height: '400px', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }} />
                        <div style={{ position: 'absolute', bottom: 15, left: 15, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', padding: '6px 12px', borderRadius: '50px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}><Camera size={14} color="#a855f7"/> El Arquitecto - Artista Visual</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                        <img src="/media/arquiartista/Eduardo_Auto.png" alt="Eduardo Gardella en Auto Clásico" style={{ width: '100%', height: '400px', objectFit: 'cover', objectPosition: 'top' }} />
                        <div style={{ position: 'absolute', bottom: 15, left: 15, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', padding: '6px 12px', borderRadius: '50px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}><Car size={14} color="#a855f7"/> El Espíritu del Diseño Automotriz</div>
                    </motion.div>
                </div>

                {/* Embedded Radio Station Section */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }} style={{ width: '100%', maxWidth: '850px', background: 'linear-gradient(145deg, #111827, #0f172a)', border: '1px solid rgba(168, 85, 247, 0.4)', borderRadius: '24px', padding: '2rem', marginBottom: '4rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe', padding: '5px 15px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '1px' }}>
                            <Volume2 size={16} /> RADIO ESTUDIO: EXPERIENCIA INMERSIVA
                        </div>
                        
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', color: '#fff', fontWeight: '900' }}>{playlist[currentTrack].title}</h3>
                        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '2rem' }}>Narración extendida intercalada con sintonía musical</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
                            <button onClick={prevTrack} style={{ background: 'transparent', border: 'none', color: '#a855f7', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <SkipBack size={28} />
                            </button>
                            
                            <button onClick={togglePlay} style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #7e22ce)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(168, 85, 247, 0.4)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                {isPlaying ? <Pause size={30} color="white" /> : <Play size={30} color="white" style={{ marginLeft: '4px' }} />}
                            </button>

                            <button onClick={nextTrack} style={{ background: 'transparent', border: 'none', color: '#a855f7', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <SkipForward size={28} />
                            </button>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            {playlist.map((_, idx) => (
                                <div key={idx} style={{ width: currentTrack === idx ? '24px' : '8px', height: '8px', borderRadius: '4px', background: currentTrack === idx ? '#a855f7' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }} />
                            ))}
                        </div>
                    </div>

                    <audio 
                        ref={audioRef} 
                        onEnded={handleEnded}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        style={{ display: 'none' }}
                    />
                </motion.div>

                {/* Report Section */}
                <motion.article 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
                    style={{ width: '100%', maxWidth: '850px', lineHeight: '1.8', fontSize: '1.1rem', color: '#d1d5db', textAlign: 'justify' }}
                >
                    <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#fff', marginBottom: '2rem', borderLeft: '4px solid #a855f7', paddingLeft: '1.5rem' }}>
                        En el circuito del arte contemporáneo regional, pocas veces presenciamos exposiciones que logren fusionar con tanto éxito la precisión técnica de la ingeniería con la sensibilidad y atmósfera de las artes plásticas. Las salas de la conurbación La Serena-Coquimbo tienen un rico historial de recibir propuestas innovadoras, pero la exposición de la serie "CAR" (Blackboard Series), del destacado Arquitecto y Artista Visual Eduardo Gardella, marcó un hito particular.
                    </p>
                    <p style={{ marginBottom: '3rem' }}>
                        Presentada ante nuestra comunidad en las históricas instalaciones del Centro Cultural Palace de Coquimbo durante los años 2016 y 2017, esta inmensa colección nos invita a un recorrido donde la oscuridad profunda e infinita de un simple pizarrón negro escolar es transformada, mediante el rigor de la tiza y el oficio, en un museo hiperrealista del diseño mundial automotriz. A continuación, presentamos una disección profunda y extendida de cada dimensión que compone esta monumental obra, rindiendo tributo a un artista que supo leer el alma de las máquinas.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem', marginTop: '3rem' }}>CAPÍTULO I: La Dualidad del Creador – Cuando el Arquitecto toma la Tiza</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Para comprender la verdadera envergadura de la serie CAR, es imperativo analizar la lente a través de la cual fue creada. A lo largo de todo su portafolio, Eduardo Gardella firma su obra no solo como ilustrador, sino con su doble título: <strong>"Arquitecto - Artista Visual"</strong>. Esta no es una simple carta de presentación; es la declaración de principios que sostiene cada línea trazada en el pizarrón.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Desde el escrutinio del arquitecto, Gardella no concibe a los automóviles como meros medios de transporte, sino como intrincadas soluciones estructurales y espaciales. En cada modelo que elige retratar, el autor se dedica a observar con detención aquellos <em>"detalles en las formas"</em> que hacen única a cada máquina. Esta precisión es evidente cuando observamos la ejecución milimétrica de elementos mecánicos complejos: las fotografías de su proceso de trabajo lo muestran utilizando herramientas de dibujo técnico, como bolígrafos y lápices de punta finísima, para trazar con una exactitud asombrosa los radios metálicos de las llantas del Mercedes Benz SSK de Alemania o los emblemáticos aros concéntricos de las ruedas del clásico Mercedes Benz 300 E24.
                    </p>
                    <p style={{ marginBottom: '3rem' }}>
                        Por otro lado, desde la sensibilidad del artista visual, Gardella entiende que el diseño automotriz es un lienzo que captura el espíritu de su época. Los modelos ilustrados fueron elegidos porque reflejan directamente "el arte, la cultura, la ciencia y las nuevas tecnologías" del contexto histórico en que fueron fabricados. Al amalgamar ambas disciplinas —el rigor del plano arquitectónico y la expresión emotiva del arte— la serie CAR se erige como un testimonio visual que busca evidenciar de forma rotunda <strong>"la importancia del sutil dialogo entre la ingeniería y el arte"</strong>.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>CAPÍTULO II: El Pizarrón Negro y la Revalorización del Oficio</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Si los automóviles son los protagonistas, el soporte elegido es el teatro donde ocurre la magia. El artista enmarca todo este proyecto bajo el nombre de <strong>"Blackboard Series"</strong> (Serie de Pizarrón). Lejos de buscar los clásicos lienzos blancos o papeles texturizados de las bellas artes, Gardella acude a un formato de uso cotidiano, funcional y escolar. Su propósito explícito con esta decisión es lograr darle al pizarrón negro "una revalorización mediante el uso de la técnica y el oficio, intentando abarcar al máximo los potenciales que nos entrega este formato".
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Experimentar sobre este plano mate y completamente oscuro obliga al artista a invertir el proceso tradicional de la pintura: <strong>aquí no se dibujan las sombras, se "dibuja la luz"</strong>. Para lograr que el metal parezca metal, Gardella se apoya en una rigurosa receta de "tiza, pastel seco y técnicas mixtas":
                    </p>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li><strong style={{ color: '#d8b4fe' }}>Saturación del color:</strong> Utiliza barras de pastel seco aplicadas directamente por fricción para otorgar los colores vibrantes y saturados a las carrocerías, como se evidencia en su proceso de aplicar pigmento rojo intenso a las curvas del Ferrari Scaglietti.</li>
                        <li><strong style={{ color: '#d8b4fe' }}>Técnicas de sustracción (extraer la luz):</strong> El hiperrealismo no solo se logra pintando. Las imágenes de su proceso creativo en el Ford Edsel 40 y en el Hispano-Suiza muestran cómo utiliza una pequeña goma de borrar tradicional para frotar y retirar minuciosamente el pigmento previamente aplicado sobre la pizarra. Este proceso de "limpiar" el pizarrón le permite generar los gradientes suaves, las transiciones aerodinámicas y los deslumbrantes reflejos que engañan al ojo humano, simulando acero pulido.</li>
                        <li><strong style={{ color: '#d8b4fe' }}>Enmascarado arquitectónico:</strong> Para garantizar un acabado limpio y perfecto en las tipografías y emblemas cromados, Gardella recurre a técnicas propias del diseño industrial. En la elaboración del frontal del Buick Roadmaster Riviera (Estados Unidos), se observa cómo cubre meticulosamente la pizarra con bandas de cinta de enmascarar, utilizando luego un instrumento afilado para recortar las letras exactas ("B U I C K") antes de aplicar el color, asegurando bordes totalmente prístinos y rectos.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>CAPÍTULO III: Un Viaje Cronológico por la Historia del Motor</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Una de las grandes virtudes de la exposición que los vecinos de Coquimbo pudieron recorrer es su rigor temporal. El portafolio establece una regla inquebrantable para la lectura de la obra: <strong>"El orden de las ilustraciones responde a la cronología de fabricación de cada automóvil"</strong>.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Esta línea de tiempo conforma un total de 34 espectaculares piezas que actúan como una cápsula del tiempo a través de la evolución aerodinámica: Los pioneros y la elegancia de entreguerras (1928 - 1941): La serie arranca a finales de los dorados años 20 con el colosal Mercedes Benz SSK del año 1928, y sigue el transito hasta máquinas superdeportivas como el Maserati MC 20 del 2021.
                    </p>

                    <div style={{ background: '#111827', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '3rem' }}>
                        <h4 style={{ color: '#a855f7', marginTop: '0', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Info size={18}/> Dimensiones y Piezas Clave</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
                            <div style={{ background: '#1f2937', padding: '1rem', borderRadius: '8px' }}><strong>Mercedes Benz SSK</strong><br/>1928 <br/><span style={{color:'#9ca3af'}}>75 cm × 40 cm</span></div>
                            <div style={{ background: '#1f2937', padding: '1rem', borderRadius: '8px' }}><strong>Minerva 8 AL Conv.</strong><br/>1931 <br/><span style={{color:'#9ca3af'}}>50 cm × 80 cm</span></div>
                            <div style={{ background: '#1f2937', padding: '1rem', borderRadius: '8px' }}><strong>VW Beetle Type 60</strong><br/>1938 <br/><span style={{color:'#9ca3af'}}>75 cm × 55 cm</span></div>
                            <div style={{ background: '#1f2937', padding: '1rem', borderRadius: '8px' }}><strong>Batmobile (1966)</strong><br/>1955 <br/><span style={{color:'#9ca3af'}}>80 cm × 50 cm</span></div>
                            <div style={{ background: '#1f2937', padding: '1rem', borderRadius: '8px' }}><strong>Lamborghini Miura</strong><br/>1966 <br/><span style={{color:'#9ca3af'}}>80 cm × 45 cm</span></div>
                            <div style={{ background: '#1f2937', padding: '1rem', borderRadius: '8px' }}><strong>McLaren MP4/5B F1</strong><br/>1990 <br/><span style={{color:'#9ca3af'}}>100 cm × 50 cm</span></div>
                            <div style={{ background: '#1f2937', padding: '1rem', borderRadius: '8px' }}><strong>Maserati MC 20</strong><br/>2021 <br/><span style={{color:'#9ca3af'}}>80 cm × 50 cm</span></div>
                        </div>
                    </div>

                    <h2 style={{ fontSize: '1.8rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>EPÍLOGO</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        El arte tiene múltiples formas de registrar nuestra existencia, y Eduardo Gardella nos ha demostrado que las máquinas que construimos son, al final del día, autorretratos de nuestras sociedades. Con una simple tiza y una paciencia de relojero, el artista transformó pizarrones en portales del tiempo, invitándonos a escuchar el rugido de los motores y a apreciar el silencio del buen diseño.
                    </p>
                    
                    <div style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)', padding: '2rem', borderRadius: '16px', border: '1px solid #8b5cf6', margin: '3rem 0', color: 'white' }}>
                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Info size={20}/> Contacto Oficial del Artista</h4>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}><strong>Instagram Personal/Portafolio:</strong> <a href="https://instagram.com/_Eduardo_Gardella" target="_blank" rel="noreferrer" style={{color:'#d8b4fe'}}>@_Eduardo_Gardella</a></p>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}><strong>Instagram del Proyecto:</strong> <a href="https://instagram.com/BAQ_Blackboard" target="_blank" rel="noreferrer" style={{color:'#d8b4fe'}}>@BAQ_Blackboard</a></p>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}><strong>Correo Electrónico:</strong> <a href="mailto:gardellarq@gmail.com" style={{color:'#d8b4fe'}}>gardellarq@gmail.com</a></p>
                        <p style={{ margin: '0', fontSize: '0.95rem' }}><strong>Teléfono de Contacto:</strong> +56 9 4780 2929</p>
                    </div>

                </motion.article>
            </div>

            {/* Blackboard Series Full Gallery Extracted */}
            <div style={{ background: '#000', padding: '4rem 1.5rem', width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.1)', padding: '6px 20px', borderRadius: '50px', color: 'white', fontSize: '0.9rem', fontWeight: '900', letterSpacing: '4px', marginBottom: '3rem' }}>
                        <Palette size={16} /> GALERÍA OFICIAL CAR
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {pages.map((pageNum) => (
                            <motion.div 
                                key={`page-${pageNum}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                                transition={{ duration: 0.6 }}
                                style={{ 
                                    background: '#111', borderRadius: '16px', overflow: 'hidden', 
                                    border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' 
                                }}
                            >
                                <img 
                                    src={`/media/arquiartista/gallery/page_${pageNum}.jpg`} 
                                    alt={`Página ${pageNum}`} 
                                    loading="lazy"
                                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                                />
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
}
