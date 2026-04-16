import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  X, Share2, Anchor, Users, Info, ArrowLeft, Play, Pause, 
  Volume2, VolumeX, MessageSquare, Newspaper, Sparkles, Target, 
  Target as TargetIcon, ShieldCheck, ShieldAlert, Landmark, Droplets, Map as MapIcon,
  Globe, Zap, ExternalLink, ChevronRight, Heart, Star, Award
} from 'lucide-react';
import DistancesMap from '../components/DistancesMap';
import SmartFloatingTV from '../components/SmartFloatingTV';
import HechoEnChile from '../components/HechoEnChile';

/**
 * PESCA ARTESANAL NOTA - VLS PORTAL 2026
 * Dedicated news article about the fishing advocacy group.
 */
export default function PescaArtesanalNota() {
    const navigate = useNavigate();
    const [isMuted, setIsMuted] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [showDistances, setShowDistances] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        // Meta tags for SEO
        document.title = "Bancada Pesca Artesanal | Vecinos La Serena";
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShare = () => {
        const shareData = {
            title: 'Diputados FA conforman Bancada por la Defensa de la Pesca Artesanal',
            text: 'Revisa la nota completa sobre el fortalecimiento de la pesca artesanal en Chile.',
            url: window.location.href,
        };
        if (navigator.share) {
            navigator.share(shareData).catch(err => console.error('Share failed:', err));
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('¡Enlace copiado al portapapeles!');
        }
    };

    const newsContent = {
        title: "DIPUTADOS FA CONFORMAN BANCADA POR LA DEFENSA DE LA PESCA ARTESANAL",
        subtitle: "La conformación de esta bancada busca articular esfuerzos legislativos y políticos para fortalecer la pesca artesanal, promoviendo condiciones más justas y sostenibles.",
        paragraphs: [
            "Con la participación de la Alianza Nacional en Defensa de la Pesca Artesanal y la Red Nacional de Mujeres de la Pesca, parlamentarios del Frente Amplio sostuvieron una reunión para avanzar en la conformación de una bancada transversal en apoyo al sector.",
            "Tras el encuentro, la diputada Carolina Tello, jefa de bancada del Frente Amplio, destacó que “hemos sostenido una importante reunión junto a dirigentes y dirigentas de distintas regiones que se dedican a la pesca artesanal, con el objetivo de conformar una bancada por su defensa”.",
            "Subrayó que se trata de “una invitación abierta a todos los parlamentarios y parlamentarias que quieran sumarse, para construir una hoja de ruta que responda a las verdaderas necesidades del sector y avanzar en la correcta implementación de las leyes ya aprobadas”.",
            "Por su parte, el diputado Jorge Brito, expresidente de la Comisión de Pesca de la Cámara valoró el rol de las y los trabajadores del sector señalando que “se mantienen trabajando para defender el futuro y la sostenibilidad de la pesca artesanal”.",
            "“Nuestra preocupación frente al accionar de funcionarios del gobierno del presidente Kast, quienes hasta hace poco se desempeñaban como asesores de la industria pesquera y hoy son reguladores, cuestión que es a todas luces un conflicto de interés evidente”, señaló Brito.",
            "La instancia fue convocada por la jefa de bancada del Frente Amplio, diputada Carolina Tello y contó con la participación de las diputadas y diputados Matías Fernández, Erika Ñanco, Consuelo Veloso, Jorge Brito y Carolina Tello, junto a dirigentes y dirigentas de distintas regiones del país vinculadas a la pesca artesanal."
        ]
    };

    return (
        <div style={{ 
            background: '#020617', 
            color: 'white', 
            minHeight: '100vh',
            fontFamily: '"Outfit", sans-serif',
            overflowX: 'hidden'
        }}>
            {/* ── STICKY HEADER ── */}
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                padding: '1rem 2rem',
                background: scrolled ? 'rgba(2, 6, 23, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(56, 189, 248, 0.2)' : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all 0.3s ease'
            }}>
                <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '15px', padding: '0.8rem 1.2rem', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <ArrowLeft size={18} /> INICIO
                </button>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleShare} style={{ background: '#38bdf8', color: '#020617', border: 'none', borderRadius: '15px', padding: '0.8rem 1.5rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Share2 size={18} /> COMPARTIR
                    </button>
                </div>
            </header>

            {/* ── HERO SECTION ── */}
            <section style={{ position: 'relative', height: '80vh', display: 'flex', alignItems: 'flex-end', padding: '4rem 2rem', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img 
                        src="/pesca_artesanal/hero_pesca.jpg" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} 
                        alt="Bancada Pesca Artesanal"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #020617 20%, transparent 60%)' }} />
                </div>
                
                <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                            <Anchor size={16} /> DEFENSA CIUDADANA
                        </div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, lineHeight: 1, marginBottom: '2rem', letterSpacing: '-3px' }}>
                            {newsContent.title}
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '700px', lineHeight: 1.6 }}>
                            {newsContent.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── CONTENT GRID ── */}
            <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
                
                {/* ─ ARTICLE BODY ─ */}
                <article>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(56, 189, 248, 0.1)', borderRadius: '40px', padding: '3rem', position: 'relative' }}>
                        {/* Audio Player Widget */}
                        <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: '1.5rem 2rem', borderRadius: '25px', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '2rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                            <button 
                                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                                style={{ background: '#38bdf8', border: 'none', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)' }}
                            >
                                {isPlayingAudio ? <Pause size={30} color="black" fill="black" /> : <Play size={30} color="black" fill="black" style={{ marginLeft: '4px' }} />}
                            </button>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: '900', color: '#38bdf8', marginBottom: '4px', letterSpacing: '2px' }}>PODCAST VLS INFORMATIVO</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Escucha el relato de la Bancada FA</div>
                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '12px', position: 'relative', overflow: 'hidden' }}>
                                    <motion.div animate={{ width: isPlayingAudio ? '100%' : '0%' }} transition={{ duration: 120, ease: 'linear' }} style={{ height: '100%', background: '#38bdf8' }} />
                                    {isPlayingAudio && <audio src="/pesca_artesanal/audio_tello.m4a" autoPlay onEnded={() => setIsPlayingAudio(false)} />}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Volume2 size={24} color="#38bdf8" />
                            </div>
                        </div>

                        <p style={{ marginBottom: '2.5rem', fontWeight: 600, color: 'white', fontSize: '1.6rem', borderLeft: '6px solid #38bdf8', paddingLeft: '2rem' }}>
                            "Hemos sostenido una importante reunión junto a dirigentes y dirigentas de distintas regiones, con el objetivo de conformar una bancada transversal por su defensa y sostenibilidad." — Carolina Tello.
                        </p>

                        <p style={{ marginBottom: '2.5rem' }}>
                            Parlamentarios del Frente Amplio, encabezados por la jefa de bancada Carolina Tello y el diputado Jorge Brito, sostuvieron un encuentro estratégico con la <strong>Alianza Nacional en Defensa de la Pesca Artesanal</strong> y la <strong>Red Nacional de Mujeres de la Pesca</strong>. La iniciativa busca articular esfuerzos legislativos para asegurar condiciones más justas y frenar la influencia de intereses industriales en la regulación del sector.
                        </p>

                        <p style={{ marginBottom: '2.5rem' }}>
                            Carolina Tello subrayó que la invitación está abierta a todos los legisladores comprometidos con el futuro de las caletas chilenas. Por su parte, el diputado Brito denunció posibles conflictos de interés de exasesores industriales que hoy operan como reguladores, enfatizando la necesidad de una soberanía técnica al servicio de los pescadores artesanales.
                        </p>

                        {/* Interactive Pill */}
                        <div style={{ marginTop: '4rem', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {['Ley de Pesca', 'Frente Amplio', 'Región de Coquimbo', 'Carolina Tello', 'Sostenibilidad'].map(tag => (
                                <span key={tag} style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid rgba(56, 189, 248, 0.2)' }}>#{tag}</span>
                            ))}
                        </div>
                    </div>
                </article>

                {/* ─ SIDEBAR & SMART TOOLS ─ */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Character Advice Card */}
                    <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)', borderRadius: '40px', padding: '2.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>RELATO VECINAL</div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>
                                Hola, soy el Tío Pedro. Vengo de Caleta San Pedro y te aseguro que la pesca es el alma de nuestra costa.
                            </h3>
                            <button onClick={() => navigate('/Citizens')} style={{ background: 'white', color: '#0369a1', border: 'none', padding: '1rem 1.8rem', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                CONOCE MÁS HISTORIAS <MessageSquare size={18} />
                            </button>
                        </div>
                        <img 
                            src="/characters/tio_pedro.png" 
                            style={{ position: 'absolute', bottom: '-20px', right: '-10px', width: '220px', opacity: 0.9, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }} 
                            alt="Tío Pedro VLS"
                        />
                    </div>

                    {/* Multimedia Widget (Video) */}
                    <div style={{ background: '#0f172a', borderRadius: '40px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ position: 'relative', aspectRatio: '9/16', borderRadius: '25px', overflow: 'hidden', marginBottom: '1rem', background: 'black' }}>
                            <video 
                                src="/pesca_artesanal/video_tello.mp4" 
                                controls 
                                poster="/pesca_artesanal/mehuin.jpg"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ padding: '0 0.5rem' }}>
                            <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>Testimonio: Carolina Tello</h4>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Defensa Pesca Artesanal</p>
                        </div>
                    </div>

                    {/* Directory Sidebar */}
                    <div style={{ background: 'rgba(14, 165, 233, 0.05)', borderRadius: '40px', padding: '2.5rem', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
                        <div style={{ background: '#0ea5e9', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.4)' }}>
                            <Anchor size={26} color="white" />
                        </div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Directorio Marítimo</h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 950, color: '#38bdf8', letterSpacing: '2px', textTransform: 'uppercase' }}>SERNAPESCA Coquimbo</div>
                                <div style={{ fontSize: '1rem', fontWeight: 900 }}>800 320 032</div>
                            </div>
                            
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '20px' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 950, color: '#10b981', letterSpacing: '2px', textTransform: 'uppercase' }}>Armada de Chile</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Zap size={18} /> 137
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>Emergencias Marítimas</div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '20px' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 950, color: '#f59e0b', letterSpacing: '2px', textTransform: 'uppercase' }}>Radio Costera VLS</div>
                                <div style={{ fontSize: '1rem', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Canal 16 VHF
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            {/* ── SECCIÓN: GALERÍA DE ACCIÓN ── */}
            <section style={{ padding: '4rem 2rem', background: '#0b1120' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center' }}>MULTIMEDIA <span style={{ color: '#38bdf8' }}>TERRITORIAL</span></h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {[
                            '/pesca_artesanal/congreso.jpg',
                            '/pesca_artesanal/mehuin.jpg',
                            '/pesca_artesanal/whatsapp_info.jpg'
                        ].map((img, i) => (
                            <motion.div whileHover={{ scale: 1.05 }} key={i} style={{ borderRadius: '30px', overflow: 'hidden', height: '300px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <HechoEnChile footer />

            <SmartFloatingTV />

            {/* ── 3D ASSISTANT OVERLAY (SMART RULE) ── */}
            <div style={{ position: 'fixed', bottom: '20px', left: '25px', zIndex: 100, pointerEvents: 'none' }}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '12px 20px', borderRadius: '50px', backdropFilter: 'blur(20px)', border: '1px solid rgba(56, 189, 248, 0.4)', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.8)', pointerEvents: 'auto' }}
                >
                    <div style={{ width: '55px', height: '55px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #38bdf8', boxShadow: '0 0 15px rgba(56, 189, 248, 0.5)' }}>
                        <img src="/serenito-avatar.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Serenito" />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#38bdf8', letterSpacing: '2px', textTransform: 'uppercase' }}>Smart Comuna VLS</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'white' }}>Serenito te acompaña</div>
                    </div>
                </motion.div>
            </div>

            {/* ── MODALS & FLOATING TOOLS ── */}
            <AnimatePresence>
                {showDistances && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(2, 6, 23, 0.95)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', height: '90vh' }}>
                            <button 
                                onClick={() => setShowDistances(false)} 
                                style={{ position: 'absolute', top: '-10px', right: '-10px', zIndex: 101000, background: '#ef4444', color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                            >
                                <X size={28} />
                            </button>
                            <DistancesMap 
                                isOpen={true} 
                                onClose={() => setShowDistances(false)}
                                filterButtons={['Vicuña', 'Andacollo', 'Punta de Choros', 'Ovalle', 'Illapel', 'Parque Fray Jorge', 'Algarrobito', 'Coquimbo', 'Concepción', 'Santiago de Chile']}
                            />
                         </div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                ::-webkit-scrollbar { display: none; }
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
            `}</style>
        </div>
    );
}
