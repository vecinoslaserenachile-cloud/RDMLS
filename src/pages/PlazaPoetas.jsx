import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, MapPin, Feather, BookOpen, Shield, Palette, 
    BookKey, Landmark, Heart, Newspaper, Flame, QrCode, Radio, Share2, Play
} from 'lucide-react';

const PlazaPoetas = ({ onClose }) => {
    const [activeMagallanesFacet, setActiveMagallanesFacet] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const radioPoetasPlaylist = [
        { title: "Rescate de la Plaza de los Poetas (Podcast Especial)", src: "/patrimonio/Rescate_de_la_Plaza_de_los_Poetas-_2_.mp3", isPodcast: true },
        { title: "Caminante, Son Tus Huellas (Tributo a Serrat)", src: "/patrimonio/radioPlazaPoetasVLS/Bachata golpe a golpe verso a verso.mp3" },
        { title: "Gabriela Mistral: La rebelde que Chile ocultó", src: "/patrimonio/Gabriela_Mistral_compressed.mp3", isPodcast: true },
        { title: "Guitarra de Versos: Serenata en la Avenida", src: "/patrimonio/radioPlazaPoetasVLS/Guitarra de versos.mp3" },
        { title: "Lo Nuestro es Pasar: Ecos del Grupo de los Diez", src: "/patrimonio/radioPlazaPoetasVLS/Lo nuestro es pasar.mp3" },
        { title: "Nunca Buscamos a Gloria: El Silencio del Plinto", src: "/patrimonio/radioPlazaPoetasVLS/Nunca buscamos a Gloria.mp3" },
        { title: "Poetas del Rock: Juventud del Norte", src: "/patrimonio/radioPlazaPoetasVLS/Poetas del Rock.mp3" },
        { title: "Dejar en la Memoria: Magallanes Moure", src: "/patrimonio/radioPlazaPoetasVLS/Rock Dejar en la memoria.mp3" },
        { title: "Sincronía Literaria: Entre Maestros", src: "/patrimonio/radioPlazaPoetasVLS/Entre Maestros.mp3" },
        { title: "Todo Queda en La Serena", src: "/patrimonio/radioPlazaPoetasVLS/todo queda en La Serena.mp3" },
        { title: "Verso a Verso: Voces del Patrimonio", src: "/patrimonio/radioPlazaPoetasVLS/Verso a verso.mp3" },
        { title: "Tributo al Maestro: Cantares Vecinales", src: "/patrimonio/radioPlazaPoetasVLS/Tributo al Maestro con Vecinos La Serena.mp3" },
        { title: "Todo Pasa y Todo Queda", src: "/patrimonio/radioPlazaPoetasVLS/todo queda.mp3" }
    ];

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        window.scrollTo(0, 0);
        
        // --- SILENCIO DE RESPETO PATRIMONIAL ---
        // Al entrar a la investigación, detenemos la radio global y locutoras
        window.dispatchEvent(new CustomEvent('stop-all-audio'));
        
        return () => {
            window.removeEventListener('resize', handleResize);
            // Al salir, también nos aseguramos de limpiar nuestro propio audio si fuera necesario
            window.dispatchEvent(new CustomEvent('vls-stop-internal-audio'));
        };
    }, []);

    const magallanesFacets = [
        {
            id: 'journalism',
            title: 'Periodismo',
            icon: Newspaper,
            color: '#38bdf8',
            content: 'Pionero en la prensa cultural bajo el seudónimo "M. de Ávila", redactor en El Mercurio y Las Últimas Noticias, y editor de Chile Ilustrado. Además, fundó el periódico La Reforma (1911-1916).'
        },
        {
            id: 'painting',
            title: 'Pintura',
            icon: Palette,
            color: '#f59e0b',
            content: 'Estudió dibujo en la Escuela de Bellas Artes. En 1916, realizó una histórica exposición pictórica junto al escultor Alberto Ried y el escritor Pedro Prado.'
        },
        {
            id: 'literature',
            title: 'Letras y Poesía',
            icon: Feather,
            color: '#10b981',
            content: 'Miembro del histórico Grupo de los Diez (1916), su poesía transitó desde un romanticismo de contemplación pura hacia un modernismo moderado en obras como Facetas, Matices y La casa junto al mar.'
        }
    ];

    return (
        <div style={{ 
            position: 'fixed', inset: 0, zIndex: 100080, background: '#020617', 
            display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden',
            fontFamily: '"Outfit", sans-serif', color: 'white',
            backgroundImage: 'radial-gradient(ellipse at top, #1e1b4b 0%, #020617 100%)'
        }}>
            {/* ── HEADER PREMIUM ── */}
            <header style={{ 
                position: 'sticky', top: 0, zIndex: 100, background: 'rgba(2, 6, 23, 0.8)', 
                backdropFilter: 'blur(20px)', padding: isMobile ? '1rem' : '1.2rem 2.5rem', 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                borderBottom: '1px solid rgba(245, 158, 11, 0.2)' 
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '15px' }}>
                    <div style={{ background: '#f59e0b', padding: isMobile ? '6px' : '10px', borderRadius: '12px', boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)' }}>
                        <Landmark size={isMobile ? 18 : 24} color="#020617" />
                    </div>
                    <div>
                        <h1 style={{ color: 'white', fontSize: isMobile ? '1rem' : '1.4rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '0.1rem', letterSpacing: '-0.5px' }}>
                            Patrimonio <span style={{ color: '#f59e0b' }}>Serenense</span>
                        </h1>
                        <div style={{ display: 'flex', gap: isMobile ? '5px' : '15px', color: '#f59e0b', fontSize: isMobile ? '0.6rem' : '0.85rem', fontWeight: 'bold', alignItems: 'center' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📜 HISTORIA</span>
                            <span style={{ opacity: 0.5 }}>|</span>
                            <span style={{ color: '#ef4444' }}>INVESTIGACIÓN VLS</span>
                            <span style={{ opacity: 0.5 }}>|</span>
                            <span>PLAZA DE LOS POETAS</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={() => {
                            const shareData = {
                                title: 'Plaza de los Poetas: Patrimonio Serenense',
                                text: 'Descubre la investigación oficial del legado Magallanes-Thenoux en vecinoslaserena.cl',
                                url: 'https://vecinoslaserena.cl/plazapoetas'
                            };
                            if (navigator.share) {
                                navigator.share(shareData);
                            } else {
                                navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                                alert('Link y mensaje copiados al portapapeles');
                            }
                        }}
                        style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.5)', padding: isMobile ? '8px 12px' : '10px 20px', borderRadius: '15px', fontSize: isMobile ? '0.65rem' : '0.75rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Share2 size={16} /> COMPARTIR
                    </button>
                    <button onClick={onClose || (() => window.history.back())} style={{ background: '#ef4444', color: 'white', border: 'none', padding: isMobile ? '8px 12px' : '10px 20px', borderRadius: '15px', fontSize: isMobile ? '0.65rem' : '0.75rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <X size={16} /> SALIR
                    </button>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: isMobile ? '2rem 1.5rem' : '4rem 1.5rem' }}>
                
                {/* ── HERO SECTION ── */}
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fcd34d', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 900, marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                        <MapPin size={16} /> Avenida Francisco de Aguirre, La Serena
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: isMobile ? '2.5rem' : '4.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', fontFamily: '"Playfair Display", serif' }}
                    >
                        RENACER EN LA PLAZA DE LOS POETAS:<br/>
                        <span style={{ background: 'linear-gradient(to right, #fbbf24, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            EL LEGADO MAGALLANES-THENOUX
                        </span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ color: '#94a3b8', fontSize: isMobile ? '1.1rem' : '1.4rem', maxWidth: '800px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}
                    >
                        Las ciudades no se construyen únicamente con cemento, asfalto y edificaciones modernas; su verdadero cimiento es la memoria.
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <a 
                            href="/patrimonio/VLS_Plaza_de_los_Poetas_Reborn.pdf" 
                            target="_blank" rel="noopener noreferrer"
                            style={{ background: '#f59e0b', color: '#000', textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '20px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)', transition: 'transform 0.2s', letterSpacing: '1px' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <BookOpen size={24} /> VER DOSSIER OFICIAL (PDF)
                        </a>
                    </motion.div>
                </header>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', padding: isMobile ? '2rem' : '3rem', marginBottom: '5rem', backdropFilter: 'blur(10px)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                    <p style={{ fontSize: '1.2rem', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                        Desde la mesa de redacción de <strong style={{ color: '#f59e0b' }}>vecinoslaserena.cl</strong>, nuestro equipo de investigación histórica y patrimonial ha querido detener su mirada analítica en uno de los espacios cívicos con mayor potencial de nuestra ciudad, pero que hoy clama por una revitalización urgente: la <strong>Plaza de los Poetas</strong>.
                    </p>
                    <p style={{ fontSize: '1.2rem', color: '#cbd5e1', lineHeight: 1.8 }}>
                        Este rincón urbano no es un simple cruce de transeúntes; es un altar cívico destinado a honrar a dos figuras fundamentales de nuestras letras, unidas por lazos de sangre y por un amor inquebrantable hacia la identidad local: el ilustre artista integral <strong style={{ color: 'white' }}>Manuel Magallanes Moure</strong> y su sobrino, el guardián de nuestra historia, <strong style={{ color: 'white' }}>Hugo Thenoux Moure</strong>.
                    </p>
                </div>

                {/* ── CAPÍTULO I ── */}
                <section style={{ marginBottom: '6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '3rem' }}>
                        <div style={{ height: '1px', background: 'rgba(245, 158, 11, 0.3)', flex: 1 }}></div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f59e0b', margin: 0, letterSpacing: '3px' }}>CAPÍTULO I: PERFIL INTERACTIVO</h3>
                        <div style={{ height: '1px', background: 'rgba(245, 158, 11, 0.3)', flex: 1 }}></div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '3rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', alignItems: isMobile ? 'flex-start' : 'center' }}>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <img src="/patrimonio/magallanes_portrait.png" alt="Restaurado" style={{ width: '120px', height: '160px', objectFit: 'cover', objectPosition: 'center 5%', borderRadius: '20px', border: '2px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 0 30px rgba(245, 158, 11, 0.2)' }} />
                                    <img src="/patrimonio/Manuel Magallanes Moure.png" alt="Histórico" style={{ width: '120px', height: '160px', objectFit: 'cover', objectPosition: 'center 5%', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.1)', filter: 'grayscale(100%)' }} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: isMobile ? '2.5rem' : '3rem', fontWeight: 900, margin: '0 0 10px 0', lineHeight: 1.1, fontFamily: '"Playfair Display", serif' }}>MANUEL<br/>MAGALLANES</h4>
                                    <div style={{ color: '#fbbf24', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '2px' }}>EL ARTISTA TOTAL</div>
                                    <div style={{ color: '#64748b', fontStyle: 'italic', marginTop: '5px' }}>1878 - 1924</div>
                                </div>
                            </div>
                            
                            <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '2rem', borderRadius: '24px' }}>
                                <div style={{ display: 'flex', gap: '15px', marginBottom: '1.5rem' }}>
                                    <MapPin size={28} color="#f59e0b" />
                                    <div>
                                        <h5 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '5px', color: 'white' }}>Raíces Serenenses</h5>
                                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>Nació en La Serena el 8 de noviembre de 1878. Su padre, Valentín Magallanes, fue intendente de Coquimbo. El paisaje del Norte Chico marcó profundamente su poética libre.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', marginBottom: '1.5rem' }}>
                                    <Shield size={28} color="#3b82f6" />
                                    <div>
                                        <h5 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '5px', color: 'white' }}>Servidor Público</h5>
                                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>Alcanzó la alcaldía de San Bernardo (1904-1909) y fue fundador de su Primera Compañía de Bomberos, siendo su primer Secretario en 1903.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <Heart size={28} color="#ec4899" />
                                    <div style={{ flex: 1 }}>
                                        <h5 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '5px', color: 'white' }}>Vínculo con Gabriela Mistral</h5>
                                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>Como jurado de los Juegos Florales de 1914, otorgó el premio a Lucila Godoy Alcayaga, desencadenando una intensa relación epistolar.</p>
                                        
                                        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f472b6', fontWeight: 900, fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '8px' }}>
                                                <Flame size={14}/> ARCHIVO SONORO
                                            </div>
                                            <div style={{ fontWeight: 800, marginBottom: '10px' }}>Gabriela Mistral: La rebelde que Chile ocultó</div>
                                            <audio controls controlsList="nodownload" style={{ width: '100%', height: '40px', borderRadius: '20px' }}>
                                                <source src="/patrimonio/Gabriela_Mistral_compressed.mp3" type="audio/mpeg" />
                                            </audio>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '30px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}><QrCode size={200} /></div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#f59e0b', fontWeight: 900, letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '2rem' }}>
                                    <Flame size={16} /> EL PIONERO MULTIDISCIPLINARIO <Flame size={16} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {magallanesFacets.map(facet => {
                                        const isActive = activeMagallanesFacet === facet.id;
                                        return (
                                            <div 
                                                key={facet.id}
                                                onClick={() => setActiveMagallanesFacet(isActive ? null : facet.id)}
                                                style={{ background: 'rgba(15, 23, 42, 0.8)', border: `1px solid ${isActive ? facet.color : 'rgba(255,255,255,0.1)'}`, borderRadius: '20px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' }}
                                            >
                                                <div style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px' }}>
                                                        <facet.icon size={24} color={facet.color} />
                                                    </div>
                                                    <div style={{ flex: 1, fontWeight: 900, fontSize: '1.1rem' }}>Explorar: {facet.title}</div>
                                                    <div style={{ transform: isActive ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>▼</div>
                                                </div>
                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                                            <div style={{ padding: '0 1.5rem 1.5rem', color: '#cbd5e1', lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                                                                {facet.content}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <img src="/patrimonio/magallanes_book.jpg" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }} alt="Obra Literaria" />
                                <img 
                                    src="/patrimonio/magallanes_full_body.png" 
                                    style={{ width: '100%', height: '400px', objectFit: 'cover', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', objectPosition: 'center 10%' }} 
                                    alt="Retrato Completo" 
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CAPÍTULO II ── */}
                <section style={{ marginBottom: '6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '3rem' }}>
                        <div style={{ height: '1px', background: 'rgba(99, 102, 241, 0.3)', flex: 1 }}></div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#818cf8', margin: 0, letterSpacing: '3px' }}>CAPÍTULO II: EL GUARDIÁN DE LA MEMORIA</h3>
                        <div style={{ height: '1px', background: 'rgba(99, 102, 241, 0.3)', flex: 1 }}></div>
                    </div>
                    
                    <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f172a)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '30px', padding: isMobile ? '2rem' : '4rem', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 300px', gap: '3rem', position: 'relative', zIndex: 10 }}>
                            <div>
                                <h4 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, margin: '0 0 10px 0', lineHeight: 1.1, fontFamily: '"Playfair Display", serif' }}>HUGO THENOUX MOURE</h4>
                                <div style={{ color: '#818cf8', fontWeight: 900, fontSize: '1rem', letterSpacing: '2px', marginBottom: '2rem' }}>EL BANCARIO DE LA MEMORIA (1992)</div>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <Landmark size={36} color="#818cf8" style={{ marginBottom: '1.5rem' }} />
                                        <h5 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem' }}>El Funcionario Público</h5>
                                        <p style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.95rem' }}>Durante más de 40 años, entregó su vida al servicio financiero como funcionario del Banco del Estado. Esta inmersión le otorgó una perspectiva privilegiada sobre la vida ciudadana.</p>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <BookKey size={36} color="#34d399" style={{ marginBottom: '1.5rem' }} />
                                        <h5 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem' }}>El Escritor Rescatista</h5>
                                        <p style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.95rem' }}>Consciente de que la modernidad amenazaba las costumbres locales, cultivó las memorias. A él debemos textos como <em>La Serena que yo veo y siento</em>.</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <img 
                                    src="/patrimonio/hugo_thenoux_premium_hd.jpg" 
                                    style={{ width: '100%', height: isMobile ? '300px' : '350px', objectFit: 'cover', objectPosition: 'top', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', filter: 'contrast(1.1) brightness(1.05)' }} 
                                    alt="Retrato Hugo" 
                                />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <img 
                                        src="/patrimonio/Hugo Thenoux Moure PLAZA POETAS BUSTO REAL ANTES.jpeg" 
                                        onClick={() => setSelectedImage("/patrimonio/Hugo Thenoux Moure PLAZA POETAS BUSTO REAL ANTES.jpeg")}
                                        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.2)', cursor: 'zoom-in' }} 
                                        alt="Busto Histórico" 
                                    />
                                    <img 
                                        src="/patrimonio/HUGO THENOUX MOURE BREVE.jpeg" 
                                        onClick={() => setSelectedImage("/patrimonio/HUGO THENOUX MOURE BREVE.jpeg")}
                                        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.2)', cursor: 'zoom-in' }} 
                                        alt="Hugo Joven" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ── SECCIÓN: VIVENCIAS DE UN SERENENSE ── */}
                        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <motion.img 
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    src="/patrimonio/Portada Libro SerenenseREALHD.png" 
                                    style={{ width: '100%', maxWidth: '350px', borderRadius: '15px', boxShadow: '0 30px 60px rgba(0,0,0,0.8)', cursor: 'zoom-in' }} 
                                    alt="Vivencias de un Serenense Book"
                                />
                                <div style={{ marginTop: '1.5rem', color: '#818cf8', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '2px' }}>TESORO LITERARIO VLS</div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(129, 140, 248, 0.2)' }}>
                                <Feather size={40} color="#818cf8" style={{ marginBottom: '1.5rem' }} />
                                <h4 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'white', marginBottom: '1.5rem', fontFamily: '"Playfair Display", serif' }}>
                                    "Vivencias de un Serenense"
                                </h4>
                                <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                    En su obra cumbre, <strong style={{ color: 'white' }}>Hugo Thenoux Moure</strong> plasmó no solo crónicas, sino el latido mismo de la ciudad que amó. Editado por <em>Ediciones Rumbos</em>, este texto es el testimonio vivo de una fisonomía urbana que hoy intentamos rescatar.
                                </p>
                                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '10px 20px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 900, color: '#818cf8' }}>📚 EDICIONES RUMBOS</div>
                                    <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px 20px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 900 }}>✍️ CRÓNICA HISTÓRICA</div>
                                </div>
                            </div>
                        </div>

                        {/* ── GALERÍA DE MEMORIAS ── */}
                        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(99, 102, 241, 0.2)' }}>
                             <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
                                <img src="/patrimonio/hugo_thenoux_premium_hd.jpg" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', objectPosition: 'top' }} alt="Hugo Memorial" />
                                <img src="/patrimonio/Foto histórica.jpeg" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }} alt="La Serena Histórica" />
                                <img src="/patrimonio/magallanes_beard.jpg" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '24px', border: '1px solid rgba(99, 102, 241, 0.3)', objectPosition: 'center 5%' }} alt="Manuel Magallanes" />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '2rem', color: '#818cf8', fontWeight: 900, letterSpacing: '4px', fontSize: '0.8rem' }}>COLECCIÓN ARCHIVO T. MOURE · INVESTIGACIÓN VLS 2026</div>
                        </div>
                        
                        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid rgba(99, 102, 241, 0.2)' }}>
                            <div style={{ textAlign: 'center', color: '#818cf8', fontWeight: 900, letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '2rem' }}>ARCHIVO DOCUMENTAL: EL LEGADO THENOUX</div>
                            <a href="/patrimonio/LegadoThenoux.png" target="_blank" rel="noopener noreferrer" style={{ display: 'block', borderRadius: '30px', overflow: 'hidden', border: '2px solid rgba(99, 102, 241, 0.4)', position: 'relative' }}>
                                <img src="/patrimonio/LegadoThenoux.png" style={{ width: '100%', display: 'block', opacity: 0.9, transition: 'opacity 0.3s' }} alt="Legado Documento" onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.9'} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── PLAN DE ACCION Y RADIO ── */}
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{ background: 'rgba(127, 29, 29, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: isMobile ? '2rem' : '4rem', borderRadius: '30px', marginBottom: '3rem' }}>
                        <h4 style={{ fontSize: '2rem', fontWeight: 900, color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Shield size={36} /> DIAGNÓSTICO ACTUAL
                        </h4>
                        <p style={{ fontSize: '1.2rem', color: '#f87171', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                            En febrero de 2011, la ciudad saldó parte de su deuda instalando un busto de Hugo Thenoux Moure. Sin embargo, el diagnóstico actual oficial del CMN respecto al homenaje a Manuel Magallanes Moure es una herida abierta: <strong style={{ borderBottom: '2px solid #ef4444' }}>"a la fecha sólo permanece el plinto y una parte menor del busto"</strong>.
                        </p>
                        <p style={{ fontSize: '1.2rem', color: '#fca5a5', lineHeight: 1.8 }}>¿Podemos permitir que el primer poeta chileno en recibir un monumento público en Santiago, tenga su efigie destruida en su tierra natal?</p>
                    </div>

                    <div style={{ background: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.4)', padding: isMobile ? '2rem' : '4rem', borderRadius: '30px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', marginBottom: '4rem' }}>
                        <div style={{ position: 'absolute', right: '-50px', top: '-50px', opacity: 0.05 }}><Radio size={300} /></div>
                        <div style={{ position: 'relative', zIndex: 10 }}>
                            <h4 style={{ fontSize: '2rem', fontWeight: 900, color: '#38bdf8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: 'rgba(56, 189, 248, 0.2)', padding: '12px', borderRadius: '16px' }}><Radio size={28} /></div> 
                                RADIO INTERNA VLS
                            </h4>
                            <p style={{ fontSize: '1.1rem', color: '#bae6fd', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
                                Sintoniza nuestro podcast documental de investigación. Analizamos rigurosamente el abandono de la Plaza de los Poetas y las metodologías contemporáneas para devolverle su sitial patrimonial en La Serena.
                            </p>
                            <div style={{ background: 'rgba(0,0,0,0.6)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: radioPoetasPlaylist[currentAudioIndex].isPodcast ? '#f59e0b' : '#38bdf8', fontWeight: 900, letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '10px' }}>
                                    {radioPoetasPlaylist[currentAudioIndex].isPodcast ? <Flame size={16}/> : <Radio size={16}/>} 
                                    {radioPoetasPlaylist[currentAudioIndex].isPodcast ? "EPISODIO DOCUMENTAL" : "TRIBUTO VLS & SERRAT"}
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                                    {radioPoetasPlaylist[currentAudioIndex].title}
                                </div>
                                <audio 
                                    controls 
                                    controlsList="nodownload" 
                                    style={{ width: '100%', height: '45px', borderRadius: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)', marginBottom: '1.5rem' }}
                                    src={radioPoetasPlaylist[currentAudioIndex].src}
                                    onEnded={() => setCurrentAudioIndex((prev) => (prev + 1) % radioPoetasPlaylist.length)}
                                    onPlay={() => {
                                        // Asegurar que nada más suene si el usuario le da play manualmente
                                        window.dispatchEvent(new CustomEvent('radio-duck'));
                                    }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto', paddingRight: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                                    <h5 style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '1px', marginBottom: '5px' }}>LISTA DE REPRODUCCIÓN</h5>
                                    {radioPoetasPlaylist.map((track, idx) => (
                                        <div 
                                            key={idx} 
                                            onClick={() => setCurrentAudioIndex(idx)}
                                            style={{ 
                                                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '12px', cursor: 'pointer',
                                                background: currentAudioIndex === idx ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.03)',
                                                border: currentAudioIndex === idx ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: currentAudioIndex === idx ? '#38bdf8' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentAudioIndex === idx ? '#000' : 'white', fontWeight: 900, fontSize: '0.8rem', flexShrink: 0 }}>
                                                {currentAudioIndex === idx ? <Play size={14} /> : idx + 1}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ color: currentAudioIndex === idx ? 'white' : '#cbd5e1', fontWeight: 800, fontSize: '0.9rem' }}>{track.title}</span>
                                                <span style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 700 }}>{track.isPodcast ? 'Podcast de Investigación' : 'Pieza Musical Patrimonial'}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ height: '1px', background: 'rgba(245, 158, 11, 0.3)', flex: 1 }}></div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f59e0b', margin: 0, letterSpacing: '3px' }}>RUTAS DE ACCIÓN</h3>
                            <div style={{ height: '1px', background: 'rgba(245, 158, 11, 0.3)', flex: 1 }}></div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
                        {[
                            { num: '01', title: 'Restauración Colaborativa', desc: 'Visualizamos una alianza donde el municipio y entidades culturales co-financien la recuperación del busto, abriendo la oportunidad a los talentosos escultores de nuestra Región.' },
                            { num: '02', title: 'Museo Cívico Digital', desc: 'Proponemos instalar placas o códigos QR en los plintos para conectar a los transeúntes con este mismo portal patrimonial impulsado por Inteligencia Artificial.' },
                            { num: '03', title: 'Rutas Educativas', desc: 'Sugerimos integrar cariñosamente este espacio en recorridos escolares, acercando la hermosa idea de que el artista integral y el servidor público caminan juntos.' },
                            { num: '04', title: 'Apropiación Cultural', desc: 'Invitamos humildemente a las juntas vecinales a soñar juntas con revivir el sector mediante ferias del libro, Juegos Florales y cálidas tertulias de barrio.' }
                        ].map((item, i) => (
                            <div key={i} style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.05)', padding: '2.5rem', borderRadius: '24px', display: 'flex', gap: '25px', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'rgba(245, 158, 11, 0.2)', lineHeight: 0.8 }}>{item.num}</div>
                                <div>
                                    <h5 style={{ fontWeight: 900, fontSize: '1.3rem', color: 'white', marginBottom: '10px' }}>{item.title}</h5>
                                    <p style={{ color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer style={{ textAlign: 'center', padding: '4rem 0 6rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ color: '#94a3b8', fontSize: '1.2rem', fontStyle: 'italic', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                        "Reconstruyamos la Plaza de los Poetas infundiendo vida, tecnología, lectura y memoria en cada uno de sus rincones. La Serena tiene la obligación ética de hacer florecer nuevamente sus raíces."
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button 
                            onClick={onClose || (() => window.history.back())}
                            style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', letterSpacing: '2px', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', gap: '10px' }}
                        >
                            <X size={20} />
                            VOLVER AL PORTAL
                        </button>
                        <button 
                            onClick={() => {
                                const shareData = {
                                    title: 'Plaza de los Poetas: Investigación Patrimonio Serenense',
                                    text: 'Descubre la investigación oficial del legado Magallanes-Thenoux en vecinoslaserena.cl',
                                    url: 'https://vecinoslaserena.cl/plazapoetas'
                                };
                                if (navigator.share) {
                                    navigator.share(shareData);
                                } else {
                                    navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                                    alert('¡Enlace de investigación copiado para compartir!');
                                }
                            }}
                            style={{ background: 'transparent', color: '#38bdf8', border: '2px solid #38bdf8', padding: '1.2rem 3rem', borderRadius: '50px', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', letterSpacing: '2px', boxShadow: '0 10px 30px rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                        >
                            <Share2 size={20} />
                            COMPARTIR INVESTIGACIÓN
                        </button>
                    </div>
                    <div style={{ marginTop: '2.5rem', fontSize: '0.8rem', fontWeight: 900, color: '#ef4444', letterSpacing: '4px' }}>
                        VECINOSLASERENA.CL
                    </div>

                </footer>

            </div>

            {/* ── MODAL DE AMPLIACIÓN DE IMAGEN ── */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        style={{ position: 'fixed', inset: 0, zIndex: 100100, background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', cursor: 'pointer' }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={{ position: 'relative', maxWidth: '1000px', width: '100%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <img src={selectedImage} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }} alt="Zoom" />
                            <button 
                                onClick={() => setSelectedImage(null)}
                                style={{ position: 'absolute', top: '-20px', right: '-20px', background: '#ef4444', color: 'white', border: 'none', padding: '12px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
                            >
                                <X size={20} />
                            </button>
                            <div style={{ marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Click en cualquier lugar para cerrar</div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PlazaPoetas;
