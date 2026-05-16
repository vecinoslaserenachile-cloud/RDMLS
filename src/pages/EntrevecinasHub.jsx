import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Mic, Users, Quote, Info, Search, Calendar, 
    MapPin, Share2, Award, Zap, ChevronRight,
    Play, Activity, Newspaper, Landmark, Radio,
    Heart, Sparkles, MessageCircle, Video,
    UserCircle, Upload, Camera, Send, CheckCircle,
    Store, Home as HomeIcon, Clock, X, Globe, BookOpen,
    ShieldAlert, Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HechoEnChile from '../components/HechoEnChile';

/**
 * ENTREVECINAS HUB - FEMININE PREMIUM EXPERIENCE V3
 * ------------------------------------------------
 * Centro de mando para la serie de entrevistas 'Entrevecinas'.
 * INCLUYE: Módulo de Logueo, Agendamiento y Carga de Evidencia para Vecinas.
 * Dominio: entrevecinas.cl
 */

const QuoteBlock = ({ text, author, sub }) => (
    <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative p-12 my-12 group"
    >
        <div className="absolute top-0 left-0 text-9xl text-pink-500/10 font-serif -z-10 select-none opacity-40">“</div>
        <div className="relative z-10">
            <p className="text-3xl md:text-5xl font-serif italic text-white leading-tight mb-8 group-hover:text-pink-400 transition-colors duration-500">
                {text}
            </p>
            <div className="flex items-center gap-4">
                <div className="w-12 h-0.5 bg-pink-500"></div>
                <div>
                    <span className="block text-xl font-black uppercase tracking-tighter text-pink-500">{author}</span>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 font-bold">{sub}</span>
                </div>
            </div>
        </div>
    </motion.div>
);

const SourceCard = ({ title, desc, icon: Icon }) => (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-pink-500/5 hover:border-pink-500/30 transition-all group">
        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <SafeIcon icon={Icon} className="text-pink-400" />
        </div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
);

// Icon Mapper to avoid ReferenceErrors
const ICON_MAP = {
    Shield, Globe, Zap, Sparkles, Mic, Heart, BookOpen, Activity, Award, Users, ShieldAlert, X
};

const SafeIcon = ({ icon, className, size }) => {
    const Component = typeof icon === 'string' ? ICON_MAP[icon] : icon;
    if (!Component) return <Zap className={className} size={size} />;
    return <Component className={className} size={size} />;
};

export default function EntrevecinasHub() {
    const navigate = useNavigate();
    
    const interviews = [
        { 
            id: 'A5HhQX7ODzU', 
            title: 'VLS es Vecinos La Serena: EL MANIFIESTO', 
            guest: 'Identidad Soberana', 
            duration: '02:52', 
            tag: 'Soberanía',
            desc: 'La visión fundacional de nuestro ecosistema digital. Un recorrido por los valores que unen a la comunidad de LA❤️SERENA bajo una tecnología propia y transparente. En este episodio, desglosamos por qué la soberanía digital no es una opción técnica, sino una defensa territorial necesaria para proteger nuestros datos y nuestra identidad frente a las grandes plataformas globales.',
            img: '/images/entrevecinas_manifiesto.png',
            quote: 'La soberanía digital no es una opción, es nuestra defensa como comunidad para que nadie decida por nosotros desde afuera.',
            stats: [
                { icon: 'Shield', title: "Soberanía", desc: "Datos unificados" },
                { icon: 'Globe', title: "Territorio", desc: "Conquista digital" },
                { icon: 'Zap', title: "Impacto", desc: "+20k Alcance" }
            ]
        },
        { 
            id: 'jWmaGafzEuk', 
            title: 'Soberanía Digital: El Poder de la Comunidad', 
            guest: 'VLS TV', 
            duration: '15:20', 
            tag: 'Especial',
            desc: 'Un análisis profundo sobre cómo la tecnología vecinal está transformando la gestión territorial en la zona norte. Este especial de VLS TV explora las herramientas que permiten a los ciudadanos tomar el control de su entorno mediante el uso inteligente de datos y la colaboración digital descentralizada.',
            img: 'https://img.youtube.com/vi/jWmaGafzEuk/maxresdefault.jpg',
            quote: 'La tecnología es el puente, pero la comunidad es el motor de nuestra soberanía.',
            stats: [
                { icon: 'Shield', title: "Protección", desc: "Escudo VLS" },
                { icon: 'Zap', title: "Fuerza", desc: "Red Propia" },
                { icon: 'Globe', title: "Visión", desc: "Smart City" }
            ]
        },
        { 
            id: 'HHHC7oEyyj4', 
            title: 'Serenito: El Sueño de una Ciudad Inteligente', 
            guest: 'Serenito 3D Ariel', 
            duration: '01:26', 
            tag: 'Innovación',
            desc: 'Un viaje onírico por la historia de Coquimbo y LA❤️SERENA. Nuestro avatar institucional nos guía hacia el futuro de los Smart Citizens. Serenito no es solo un personaje; es la interfaz humana que traduce la complejidad de la Smart City en gestos cercanos y cotidianos para cada vecino de la conurbación.',
            img: '/images/entrevecinas_serenito.png',
            quote: 'Soñamos con una ciudad donde la tecnología sea tan humana como un saludo vecinal en la Avenida Francisco de Aguirre.',
            stats: [
                { icon: 'Sparkles', title: "Avatar", desc: "Identidad 3D" },
                { icon: 'Zap', title: "Futuro", desc: "Rumbo Smart" },
                { icon: 'Zap', title: "Impacto", desc: "Viralidad 3D" }
            ]
        },
        { 
            id: 'R-hC2QuUdE8', 
            title: 'Grupo Colapso: Sesiones Jazz con Sello Local', 
            guest: 'Jazz Maestros', 
            duration: '23:26', 
            tag: 'Cultura',
            desc: 'Grabado para Thema TV y Montecarlo. La sofisticación del Jazz regional en un formato cinematográfico íntimo y elegante. Esta sesión explora los límites de la improvisación y cómo el paisaje semidesértico influye en las armonías de los músicos que han decidido hacer de La Serena su escenario principal.',
            img: '/images/entrevecinas_jazz.png',
            quote: 'Traducimos el silencio de la Pampa en una sinfonía eléctrica que resuena en cada rincón del centro histórico.',
            stats: [
                { icon: 'Mic', title: "Jazz", desc: "Maestría Reg" },
                { icon: 'Mic', title: "Grabación", desc: "Alta Fide" },
                { icon: 'Zap', title: "Vibra", desc: "Sello VLS" }
            ]
        },
        { 
            id: 'wzNKbSUFHQk', 
            title: 'Fernando Figueroa: La Sonoridad de la Tierra', 
            guest: 'Fernando Figueroa', 
            duration: '25:21', 
            tag: 'Liderazgo',
            desc: 'Conversación sobre las influencias y el proceso creativo de un disco que redefine la identidad sonora de nuestra región. Fernando nos cuenta cómo el Valle de Elqui se convierte en un pentagrama natural y cómo la radio municipal puede ser el puente para que estos sonidos lleguen al mundo.',
            img: '/images/entrevecinas_fernando.png',
            quote: 'Cada acorde es una historia que el Valle nos ha contado al oído bajo las estrellas más limpias del planeta.',
            stats: [
                { icon: 'Heart', title: "Pasión", desc: "Entrega total" },
                { icon: 'BookOpen', title: "Relatos", desc: "Memoria Aud" },
                { icon: 'Zap', title: "Ritmo", desc: "Voz Elquina" }
            ]
        },
        { 
            id: 'e4AYdzIF6OQ', 
            title: 'Maestros del Ritmo: Estilo Cuturrufo Live', 
            guest: 'Patrimonio Vivo', 
            duration: '34:43', 
            tag: 'Especial',
            desc: 'Despliegue total en una sesión de larga duración. Registro histórico del talento musical que nace en nuestra conurbación. Un homenaje rítmico que mezcla el funk, el latín y la esencia del Barrio Inglés de Coquimbo en una sola toma cinematográfica.',
            img: '/images/entrevecinas_sesion.png',
            quote: 'El sonido de La Serena es el latido de su gente despierta, vibrando en la misma frecuencia que el mar.',
            stats: [
                { icon: 'Activity', title: "Ritmo", desc: "Mestizaje" },
                { icon: 'Award', title: "Distinción", desc: "Sello VLS" },
                { icon: 'Zap', title: "Impacto", desc: "Oro Regional" }
            ]
        },
        { 
            id: 'ZAJpC9o-Mok', 
            title: 'El Parcito Final: Un Cierre de Oro', 
            guest: 'Cutu & Campos', 
            duration: '40:03', 
            tag: 'Maestros',
            desc: 'El encuentro magistral de dos leyendas. Historia viva de la música local capturada en alta fidelidad y narrativa visual premium. Este episodio cierra la primera temporada de Entrevecinas, dejando el listón alto para lo que será la integración total de la Radio Digital Municipal.',
            img: '/images/entrevecinas_final.png',
            quote: 'Cerrar este ciclo es abrir la puerta a una nueva generación de Smart Citizens que saben de dónde vienen.',
            stats: [
                { icon: 'Users', title: "Encuentro", desc: "Magistral" },
                { icon: 'Sparkles', title: "Legado", desc: "Trasfusión" },
                { icon: 'Zap', title: "Impacto", desc: "Final de Gala" }
            ]
        }
    ];
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(interviews[0].id);
    const [bookingStep, setBookingStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        title: '',
        desc: '',
        location: 'studio', // 'studio', 'home', 'store'
        date: '',
        time: '',
        media: []
    });
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const selectedData = interviews.find(v => v.id === selectedVideo) || interviews[0];

    const handleSubmitBooking = (e) => {
        e.preventDefault();
        setBookingSuccess(true);
        setTimeout(() => {
            setShowBookingModal(false);
            setBookingSuccess(false);
            setBookingStep(1);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#07010a] text-white selection:bg-pink-500/30 overflow-x-hidden">
            
            {/* STICKY NAV */}
            <nav className={`fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-[#07010a]/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
                <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-500/20 group-hover:rotate-12 transition-transform">
                        <Heart size={20} fill="currentColor" />
                    </div>
                    <div>
                        <span className="block font-black uppercase tracking-tighter text-xl leading-none">Entre<span className="text-pink-400">vecinas</span></span>
                        <span className="block text-[8px] uppercase tracking-[0.2em] text-gray-400 font-black">La Voz Que Nos Une · v2.0</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/')} className="hidden lg:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
                        <Video size={14} /> CLIPS
                    </button>
                    
                    {!isLoggedIn ? (
                        <button onClick={() => setIsLoggedIn(true)} className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:border-pink-500/50 transition-all">
                            <UserCircle size={18} /> ACCESO VECINA
                        </button>
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-pink-400">HOLA, VECINA MASTER</span>
                            <button onClick={() => setIsLoggedIn(false)} className="w-10 h-10 rounded-full border border-pink-500/20 flex items-center justify-center hover:bg-pink-500 hover:text-black transition-all">
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    <button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all active:scale-95">
                        <Share2 size={16} /> ENTREVECINAS.CL
                    </button>
                </div>
            </nav>

            {/* HERO SECTION */}
            <header className="relative w-full h-screen overflow-hidden flex flex-col justify-center px-8 lg:px-24">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#07010a] via-[#07010a] to-pink-900/10 -z-10"></div>
                
                <div className="max-w-4xl relative">
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] text-pink-400 mb-8">
                        <Sparkles size={14} fill="currentColor" /> IDENTIDAD REGIONAL Y LIDERAZGO
                    </motion.div>
                    <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-7xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-12">
                        Dialogar es <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-amber-200">Construir</span>
                    </motion.h1>
                    <div className="flex flex-wrap gap-6 items-center">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowBookingModal(true)} className="px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center gap-3 shadow-[0_20px_40px_-10px_rgba(236,72,153,0.5)] transition-all">
                            <Calendar size={20} /> AGENDAR MI ENTREVISTA
                        </motion.button>
                        <a href="#experiencia" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">REPRODUCIR PLAYLIST RECIENTE ↓</a>
                    </div>
                </div>
            </header>

            {/* BOOKING MODAL */}
            <AnimatePresence>
                {showBookingModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowBookingModal(false)} className="absolute inset-0 bg-[#07010a]/95 backdrop-blur-3xl" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }} className="relative w-full max-w-5xl bg-[#12051a] rounded-[3rem] border border-pink-500/20 shadow-2xl overflow-hidden min-h-[600px]">
                            <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                                <div className="lg:col-span-4 bg-gradient-to-b from-pink-500/10 to-transparent p-12 flex flex-col justify-between border-r border-white/5">
                                    <div>
                                        <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center text-black mb-8"><Mic size={32} /></div>
                                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Postula tu <br/><span className="text-pink-400 italic">Historia</span></h3>
                                        <p className="text-sm text-gray-400 leading-relaxed font-medium">Queremos conocer tu emprendimiento, tu oficio o tu visión para LA❤️SERENA. Sube tu evidencia para agendar.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-xs font-bold text-gray-300 transition-all"><div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-[10px]">1</div> Sube tu evidencia</div>
                                        <div className="flex items-center gap-3 text-xs font-bold text-gray-300 transition-all"><div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-[10px]">2</div> Elige fecha y lugar</div>
                                    </div>
                                </div>
                                <div className="lg:col-span-8 p-12 overflow-y-auto max-h-[80vh]">
                                    {bookingSuccess ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center">
                                            <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center text-black mb-6 shadow-2xl"><CheckCircle size={48} /></div>
                                            <h4 className="text-3xl font-black uppercase tracking-tighter mb-2">¡POSTULACIÓN ENVIADA!</h4>
                                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Te contactaremos pronto.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmitBooking} className="space-y-8">
                                            {bookingStep === 1 ? (
                                                <div className="space-y-6">
                                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-pink-400 mb-8 decoration-pink-500/30 underline underline-offset-8">PASO 1: DETALLES</h4>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase text-gray-500 ml-2">¿De qué trata tu entrevista?</label>
                                                        <input type="text" placeholder="Ej: Tejidos Ancestrales" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-pink-500/50 transition-all" value={bookingData.title} onChange={e => setBookingData({...bookingData, title: e.target.value})} required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase text-gray-500 ml-2">Breve descripción</label>
                                                        <textarea placeholder="Cuéntanos un poco más..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-pink-500/50 transition-all h-32 resize-none" value={bookingData.desc} onChange={e => setBookingData({...bookingData, desc: e.target.value})} required />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <label className="p-6 bg-white/5 border border-dashed border-white/10 rounded-3xl flex flex-col items-center gap-4 hover:bg-pink-500/5 cursor-pointer transition-all">
                                                            <Video className="text-pink-500" size={32} />
                                                            <span className="text-[10px] font-black uppercase">SUBIR VIDEO</span>
                                                            <input type="file" accept="video/*" capture="environment" className="hidden" onChange={(e) => console.log('Video captured:', e.target.files[0])} />
                                                        </label>
                                                        <label className="p-6 bg-white/5 border border-dashed border-white/10 rounded-3xl flex flex-col items-center gap-4 hover:bg-pink-500/5 cursor-pointer transition-all">
                                                            <Camera className="text-pink-500" size={32} />
                                                            <span className="text-[10px] font-black uppercase">SUBIR FOTOS</span>
                                                            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => console.log('Photo captured:', e.target.files[0])} />
                                                        </label>
                                                    </div>
                                                    <button type="button" onClick={() => setBookingStep(2)} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-pink-400 transition-all">SIGUIENTE</button>
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-pink-400 mb-8 decoration-pink-500/30 underline underline-offset-8">PASO 2: LOGÍSTICA</h4>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {['studio', 'home', 'store'].map(loc => (
                                                            <div key={loc} onClick={() => setBookingData({...bookingData, location: loc})} className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-3 ${bookingData.location === loc ? 'bg-pink-500 border-pink-500 text-black' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                                                {loc === 'studio' ? <Radio size={20}/> : loc === 'home' ? <HomeIcon size={20}/> : <Store size={20}/>}
                                                                <span className="text-[10px] font-black uppercase tracking-widest">{loc}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold text-white [color-scheme:dark]" value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value})} required />
                                                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold text-white" value={bookingData.time} onChange={e => setBookingData({...bookingData, time: e.target.value})} required>
                                                            <option value="">Bloque Horario</option>
                                                            <option value="mañana">Mañana</option>
                                                            <option value="tarde">Tarde</option>
                                                            <option value="estudio">Especial (19:00+)</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <button type="button" onClick={() => setBookingStep(1)} className="flex-1 py-5 bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all">ATRÁS</button>
                                                        <button type="submit" className="flex-[2] py-5 bg-pink-500 text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-pink-400 transition-all">CONFIRMAR</button>
                                                    </div>
                                                </div>
                                            )}
                                        </form>
                                    )}
                                </div>
                            </div>
                            <button onClick={() => setShowBookingModal(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500 transition-all"><X size={20} /></button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* CINEMATIC ARCHIVE */}
            <section id="experiencia" className="px-8 lg:px-24 py-32 bg-black relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>
                <div className="max-w-7xl mx-auto mb-20 text-center">
                    <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 italic font-serif">
                        Despliegue <span className="text-pink-500">Mundial</span>
                    </motion.h2>
                    <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-xs">Omniactualización Multidominio para Smart Citizens</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-8 sticky top-32">
                        <motion.div key={selectedVideo} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="aspect-video w-full rounded-[3rem] overflow-hidden bg-white/5 border-4 border-white/5 shadow-2xl relative group">
                            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&mute=0&rel=0&showinfo=0`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            <div className="absolute top-8 left-8 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-[10px] font-black uppercase text-pink-400 block mb-2 tracking-widest">EN REPRODUCCIÓN</span>
                                <h4 className="text-2xl font-black uppercase tracking-tighter leading-none">{interviews.find(v => v.id === selectedVideo).title}</h4>
                            </div>
                        </motion.div>
                        <div className="mt-12 p-12 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] border border-white/10 backdrop-blur-2xl">
                            <div className="flex gap-4 mb-6">
                                <span className="px-4 py-1 bg-pink-500 text-black text-[10px] font-black rounded-full uppercase tracking-widest">PREMIUM</span>
                                <span className="px-4 py-1 bg-white/10 text-white text-[10px] font-black rounded-full uppercase tracking-widest">4K CINEMA</span>
                            </div>
                            <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-6 italic">
                                {interviews.find(v => v.id === selectedVideo).title}
                            </h3>
                            <p className="text-gray-300 text-xl leading-relaxed italic font-serif">"{interviews.find(v => v.id === selectedVideo).desc}"</p>
                            
                            <div className="mt-10 pt-10 border-t border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400"><Mic size={20} /></div>
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-400">Canal Oficial: <span className="text-white">VecinosLaSerenaChile</span></div>
                                </div>
                                <button className="btn-glass px-6 py-3 rounded-2xl flex items-center gap-3 text-xs font-black uppercase tracking-widest border-white/20 hover:bg-pink-500/10"><Share2 size={16} /> COMPARTIR CLAVE</button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6 max-h-[900px] overflow-y-auto pr-4 custom-scrollbar">
                        <div className="pb-8 border-b border-white/10 mb-8">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-2">LISTA DE REPRODUCCIÓN</h4>
                            <span className="text-2xl font-black uppercase tracking-tighter italic">Especial <span className="text-pink-500">Vol. 2.0</span></span>
                        </div>
                        {interviews.map((video, idx) => (
                            <motion.div 
                                key={video.id} 
                                whileHover={{ x: 15, rotate: -1 }} 
                                onClick={() => setSelectedVideo(video.id)} 
                                className={`p-6 rounded-[2.5rem] cursor-pointer transition-all border-2 relative overflow-hidden group ${selectedVideo === video.id ? 'bg-pink-500 border-pink-500 text-black shadow-[0_20px_40px_rgba(236,72,153,0.3)]' : 'bg-[#12051a] border-white/5 hover:border-pink-500/50'}`}
                            >
                                <div className="flex gap-6 items-center relative z-10">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/10 shadow-2xl relative">
                                        <img src={video.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
                                            <Play size={20} className={selectedVideo === video.id ? 'text-black' : 'text-white'} fill="currentColor" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${selectedVideo === video.id ? 'text-black/60' : 'text-pink-500'}`}>{video.tag}</span>
                                            <span className={`text-[8px] font-black uppercase ${selectedVideo === video.id ? 'text-black/60' : 'text-gray-500'}`}>{video.duration}</span>
                                        </div>
                                        <h4 className="font-black leading-tight uppercase tracking-tighter text-base">{video.title}</h4>
                                        <p className={`text-[9px] font-bold mt-2 uppercase tracking-widest ${selectedVideo === video.id ? 'text-black' : 'text-gray-400'}`}>{video.guest}</p>
                                    </div>
                                </div>
                                {selectedVideo === video.id && (
                                    <motion.div layoutId="active-pill" className="absolute left-0 top-0 bottom-0 w-1 bg-black" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ARTÍCULO EDITORIAL */}
            <article className="max-w-6xl mx-auto px-8 py-32 relative">
                <div className="absolute top-0 left-0 text-[15rem] font-black text-white/[0.02] tracking-tighter select-none -z-10 italic uppercase">Voz</div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-3 space-y-12">
                        {selectedData.stats.map((s, i) => (
                            <SourceCard key={i} icon={s.icon} title={s.title} desc={s.desc} />
                        ))}
                    </div>
                    <div className="lg:col-span-9">
                        <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-16 italic">El Arte de <span className="text-pink-400">Escucharnos</span></h2>
                        <div className="prose prose-invert prose-xl font-serif text-gray-200 space-y-8 max-w-none leading-relaxed">
                            <p className="text-3xl font-black font-sans text-pink-400 italic">Bienvenidos al despliegue total de '{selectedData.guest}'.</p>
                            <p>
                                Entrevecinas no es solo un programa de entrevistas; es una red de contención y visibilidad para el liderazgo femenino y comunitario en la zona norte. En este espacio, cada relato es una piedra angular de lo que llamamos 'Soberanía Digital'. No esperamos que las plataformas externas nos den permiso para hablar; hemos construido nuestro propio estudio, nuestra propia red y nuestra propia audiencia.
                            </p>
                            <p>
                                Al explorar este archivo, te invitamos a mirar más allá de la pantalla. Cada vecina entrevistada representa un proyecto, una familia y una visión de ciudad. Nuestra misión en 2025 es que esta tecnología premium esté al servicio de las voces que históricamente han sido silenciadas por la pauta comercial tradicional.
                            </p>
                            <QuoteBlock text={selectedData.quote} author={selectedData.guest} sub={selectedData.tag} />
                        </div>
                    </div>

                </div>
            </article>

            {/* FOOTER */}
            <footer className="px-8 lg:px-24 py-32 bg-gradient-to-t from-pink-900/10 to-transparent border-t border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {interviews.slice(0, 4).map(it => (
                        <div key={it.id} className="bg-[#0c0312] p-8 rounded-[2.5rem] border border-white/5 hover:border-pink-500/30 transition-all group">
                            <h5 className="font-bold text-lg mb-4 group-hover:text-pink-400 transition-colors uppercase tracking-tight">{it.title}</h5>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{it.guest}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-40 text-center relative">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-24 opacity-5 pointer-events-none">
                         <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}><Zap size={300} /></motion.div>
                    </div>
                    <img src="/vls-logo-3d.png" alt="VLS" className="w-16 h-16 mx-auto mb-12 opacity-30 grayscale" />
                    <p className="text-[10px] uppercase font-black tracking-[1em] text-gray-700">ENTREVECINAS.CL · SOBERANÍA DIGITAL FEMENINA · 2025</p>
                </div>
            </footer>

            <style jsx>{`
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Inter', system-ui, sans-serif; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(236,72,153,0.3); border-radius: 10px; }
            `}</style>
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
            
            {/* FOOTER SOBERANO - HECHO EN CHILE */}
            <HechoEnChile dark={true} />
        </div>
    );
}
