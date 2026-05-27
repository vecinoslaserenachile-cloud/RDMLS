import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, History, Globe, Shield, Heart, 
  Mic2, Music, ArrowRight, BookOpen, 
  Info, ExternalLink, Menu, X, Play, Pause,
  SkipBack, SkipForward, Volume2, Hammer, Flame, Star
} from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

const Nav = ({ activeTab, setActiveTab }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-red-900/40 px-6 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
          <History className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-white font-black text-xl leading-tight tracking-wide">1 DE MAYO</h1>
          <p className="text-red-400 text-[10px] font-bold tracking-[0.2em] uppercase">Día del Trabajador</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
        {['LA SERENA', 'HISTORIA', 'CHILE', 'MUNDO', 'FAMILIA'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs md:text-sm font-bold tracking-widest rounded-full transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-red-700/20 text-red-400 border border-red-500/50 shadow-[0_0_10px_rgba(220,38,38,0.2)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

const SectionHero = () => (
  <div className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-slate-950">
    {/* Fondo Artístico */}
    <div className="absolute inset-0 opacity-40 pointer-events-none">
      <img src="/1demayo/dia_trabajador_v2.png" alt="1 de Mayo" className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
    </div>

    {/* Partículas flotantes decorativas */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-500/50 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{ 
            y: [null, Math.random() * -200 - 50],
            opacity: [null, 0]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div 
          animate={{ scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-red-950/40 backdrop-blur-sm border border-red-800/60 rounded-full mb-8 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
        >
          <Star className="w-4 h-4 text-red-500" />
          <span className="text-red-400 text-xs font-bold tracking-[0.3em] uppercase">Homenaje Institucional 2026</span>
          <Star className="w-4 h-4 text-red-500" />
        </motion.div>
        
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none tracking-tighter drop-shadow-2xl">
          DIGNIDAD <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-800 drop-shadow-none">
            Y TRABAJO
          </span>
        </h2>
        
        <p className="text-slate-300 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 font-light italic border-l-4 border-red-600 pl-6 text-left bg-gradient-to-r from-red-950/30 to-transparent py-4">
          "A quienes con sus manos construyen el futuro de nuestra región y el mundo. Un recorrido por la memoria viva de la lucha obrera."
        </p>
      </motion.div>
    </div>

    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
    >
      <p className="text-red-500/70 text-[10px] font-black tracking-[0.5em] uppercase">Deslizar</p>
      <div className="w-px h-16 bg-gradient-to-b from-red-500 to-transparent"></div>
    </motion.div>
  </div>
);

const SectionLaSerena = () => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
    className="max-w-6xl mx-auto px-6 py-20"
  >
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-900/30 border border-red-800/50 rounded-full mb-6">
          <Star className="w-4 h-4 text-red-500" />
          <span className="text-red-400 text-xs font-bold tracking-widest uppercase">Homenaje Local</span>
        </div>
        
        <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          El Alma de Nuestra Ciudad
        </h3>
        
        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
          <p>
            <span className="text-2xl">☀️</span> El alma de nuestra ciudad está en sus trabajadoras y trabajadores, vecinas y vecinos. <span className="text-2xl">👷🏽‍♂️</span> Hoy no solo conmemoramos una fecha, honramos una historia.
          </p>
          <p>
            Desde los cimientos de piedra caliza, ladrillo y cemento, hasta los jardines de la Población Romeral o la Villa El Indio, La Serena creció gracias a manos que transformaron el concreto en hogar.
          </p>
          <p className="p-4 bg-slate-900/60 border-l-4 border-red-500 rounded-r-2xl italic text-slate-400 text-base">
            📝 El legado de la Bethlehem Iron Company, la CAP y la Minera El Indio, nos recuerda una época donde el trabajador y su familia eran el centro de la comunidad. En un presente de tercerización e invisibilidad, este saludo es un llamado a no olvidar ese rostro humano que hoy sigue luchando, ahora por nuevas conquistas como las 40 horas y muchas más que vendrán.
          </p>
          <p className="font-bold text-xl text-white mt-8">
            🫂 ¡Feliz Día del Trabajador a quienes construyeron nuestro pasado y sostienen nuestro presente!
          </p>
        </div>
        
        <div className="mt-12 pt-6 border-t border-slate-800/50">
          <p className="text-xs text-slate-500 leading-relaxed">
            ©️ Imágenes originales de Internet, archivo y desde Grupo Historia de La Serena en Facebook. Publicaciones de Miguel Rivera Flores, Iván Samuel Acevedo, Juan Pereira, Elizabeth Pinina Beck, Juan Rojas Morales, Marko Boniche Castillo, Benito Orlando, Felipe Briceño, Miguel Rivera, Julio Lenz Levy y Grupo Facebook Villa El Indio. Edición de vecinoslaserena.cl
          </p>
        </div>
      </div>
      
      {/* Contenedor del Video */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 p-4 rounded-[2rem] shadow-2xl relative group overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        <div className="aspect-video bg-black rounded-2xl overflow-hidden relative border border-slate-800">
          <video 
            src="/1demayo/clip_trabajador.mp4" 
            controls 
            className="w-full h-full object-cover"
            poster="/1demayo/dia_trabajador_v2.png"
          >
            Tu navegador no soporta el formato de video.
          </video>
          
          {/* Overlay si el video falla o está cargando */}
          <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-16 h-16 text-white/50 mb-4" />
            <p className="text-white/50 text-sm font-medium tracking-widest uppercase">Clip Conmemorativo</p>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

// --- SECCIONES PRINCIPALES ---

const HistoryChicago = () => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
    className="max-w-6xl mx-auto px-6 py-20"
  >
    <div className="text-center mb-16">
      <Hammer className="w-16 h-16 text-red-600 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
      <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">LOS MÁRTIRES DE CHICAGO</h3>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto">1 de mayo de 1886: La huelga que detuvo a más de 300.000 trabajadores en EE.UU. y cambió las reglas del mundo laboral para siempre.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-8 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-red-600/20"></div>
        <History className="w-10 h-10 text-red-500 mb-6" />
        <h4 className="text-2xl font-bold text-white mb-4">El contexto de 1886</h4>
        <p className="text-slate-300 leading-relaxed">
          Las jornadas de trabajo en las fábricas eran extenuantes, a menudo alcanzando las 14 o 18 horas diarias. El movimiento obrero norteamericano se organizó bajo una demanda clara y unificada que resonó en todo el mundo occidental.
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-red-950/40 to-slate-900/60 backdrop-blur-md border border-red-900/30 p-8 rounded-3xl relative overflow-hidden group">
        <Flame className="w-10 h-10 text-red-500 mb-6" />
        <h4 className="text-2xl font-bold text-white mb-4">La Consigna Histórica</h4>
        <div className="border-l-4 border-red-500 pl-6 my-6">
          <p className="text-2xl font-black text-white italic leading-tight">
            "Ocho horas para trabajar, ocho horas para descansar, ocho horas para la casa y lo que queramos."
          </p>
        </div>
        <p className="text-slate-400 text-sm font-medium">— Proclamación del movimiento obrero</p>
      </div>
    </div>
    
    <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-8 md:p-12 text-center">
      <Shield className="w-12 h-12 text-slate-500 mx-auto mb-6" />
      <h4 className="text-xl font-bold text-white mb-4">El Legado de Haymarket</h4>
      <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
        Tras los incidentes en la plaza Haymarket y el posterior juicio irregular que condenó a muerte a cinco dirigentes sindicales (Spies, Parsons, Engel, Fischer y Lingg), el Congreso Obrero Socialista de la Segunda Internacional celebrado en París en 1889 instituyó el 1 de Mayo como jornada de lucha y homenaje mundial.
      </p>
    </div>
  </motion.section>
);

const TimelineCard = ({ year, title, desc, region }) => (
  <motion.div 
    whileHover={{ x: 10, backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
    className="relative pl-12 pb-12 border-l-2 border-red-900/30 group transition-all"
  >
    <div className="absolute left-[-11px] top-1 w-5 h-5 bg-slate-950 border-4 border-red-700 rounded-full group-hover:border-red-500 transition-colors shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
    <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm transition-all group-hover:border-red-900/50 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-start mb-4 border-b border-slate-800/50 pb-4">
        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-900/20">{year}</span>
        <span className="px-4 py-1.5 bg-red-950/50 border border-red-900/30 rounded-full text-[10px] font-bold text-red-400 uppercase tracking-[0.2em]">{region}</span>
      </div>
      <h4 className="text-white font-bold text-2xl mb-3">{title}</h4>
      <p className="text-slate-400 text-base leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const HistoryChile = () => (
  <motion.section 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="max-w-4xl mx-auto px-6 py-20"
  >
    <div className="mb-20 text-center">
      <h3 className="text-4xl md:text-5xl font-black text-white mb-6">LA EXPERIENCIA CHILENA</h3>
      <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
        Desde las áridas pampas salitreras hasta los valles y puertos, el movimiento obrero chileno ha forjado con sudor y sangre las bases de la institucionalidad social de nuestra nación.
      </p>
    </div>

    <div className="space-y-4 ml-4 md:ml-0">
      <TimelineCard 
        year="1907" 
        region="IQUIQUE, NORTE GRANDE"
        title="Matanza de la Escuela Santa María" 
        desc="El evento más trágico de la historia obrera chilena. Miles de trabajadores del salitre y sus familias son masacrados tras reclamar el fin de las fichas salitreras y medidas básicas de seguridad. Su sacrificio despertó la conciencia social en todo el país."
      />
      <TimelineCard 
        year="1924" 
        region="SANTIAGO, CHILE"
        title="Promulgación de Leyes Sociales" 
        desc="Tras el 'ruido de sables' en el Congreso, el Estado chileno finalmente reconoce las demandas históricas aprobando el contrato de trabajo, el seguro obligatorio, la jornada de 8 horas y la creación de tribunales de conciliación."
      />
      <TimelineCard 
        year="1953" 
        region="TERRITORIO NACIONAL"
        title="Fundación de la CUT" 
        desc="Bajo el liderazgo de figuras históricas como Clotario Blest, nace la Central Única de Trabajadores, logrando la ansiada unidad del movimiento sindical para enfrentar los desafíos de la industrialización y los derechos laborales modernos."
      />
    </div>
  </motion.section>
);

const HistoryGlobal = () => (
  <motion.section 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="max-w-7xl mx-auto px-6 py-20"
  >
    <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-800 rounded-[3rem] p-10 md:p-16 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-red-600 to-yellow-500"></div>
      
      <h3 className="text-3xl md:text-5xl font-black text-white mb-4 text-center tracking-tight">PERSPECTIVA GLOBAL</h3>
      <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">El Día del Trabajador trasciende fronteras, uniendo bajo una misma conmemoración las realidades laborales de los cinco continentes.</p>
      
      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {[
          { 
            title: "América", 
            desc: "Mientras EE.UU. y Canadá celebran el 'Labor Day' en septiembre para desvincularlo de los Mártires de Chicago, el resto del continente mantuvo el 1 de Mayo como símbolo irrenunciable de justicia social.",
            icon: <Globe className="w-10 h-10 text-blue-400" />,
            color: "border-blue-900/30 hover:border-blue-500/50",
            glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          },
          { 
            title: "Europa & Euroasia", 
            desc: "Desde la cuna de la Revolución Industrial inglesa hasta el consolidado Estado de Bienestar nórdico. Durante el siglo XX, la Unión Soviética lo transformó en la máxima festividad del Estado.",
            icon: <Shield className="w-10 h-10 text-red-500" />,
            color: "border-red-900/30 hover:border-red-500/50",
            glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
          },
          { 
            title: "Asia & Oceanía", 
            desc: "De los vertiginosos milagros económicos asiáticos a las históricas conquistas sindicales de los esquiladores en Nueva Zelanda, el mundo oriental adapta esta fecha a sus propias transformaciones industriales.",
            icon: <Users className="w-10 h-10 text-yellow-500" />,
            color: "border-yellow-900/30 hover:border-yellow-500/50",
            glow: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]"
          }
        ].map((item, i) => (
          <div key={i} className={`bg-slate-950/80 p-8 rounded-3xl border transition-all duration-500 group ${item.color} ${item.glow}`}>
            <div className="mb-8 p-4 bg-slate-900 rounded-2xl inline-block border border-slate-800">{item.icon}</div>
            <h4 className="text-white font-bold text-2xl mb-4">{item.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.section>
);

const AudioPlayer = ({ title, author, duration, fakeUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Simulación simple de reproductor para UI
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 0.5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-xl flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center shadow-lg">
          <Music className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h5 className="text-white font-bold text-lg">{title}</h5>
          <p className="text-slate-400 text-sm">{author}</p>
        </div>
      </div>
      
      {/* Controles y Barra */}
      <div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-red-500 rounded-full transition-all duration-500 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center px-2">
          <span className="text-xs text-slate-500 font-mono">
            {Math.floor((progress/100 * duration) / 60)}:{(Math.floor((progress/100 * duration) % 60)).toString().padStart(2, '0')}
          </span>
          
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
          
          <span className="text-xs text-slate-500 font-mono">
            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <p className="text-[10px] text-center text-slate-600 italic mt-2">* Pista en preparación (Requiere subir el archivo correspondiente)</p>
    </div>
  );
};

const SectionFamilia = () => (
  <motion.section 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="max-w-6xl mx-auto px-6 py-20"
  >
    <div className="text-center mb-16">
      <Heart className="w-16 h-16 text-red-500 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
      <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">EL CORAZÓN DEL TRABAJO</h3>
      <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
        Detrás de cada jornada extenuante, hay un hogar que espera y un futuro que se construye paso a paso. 
        Dedicamos este espacio multimedia a la resiliencia invaluable de la familia trabajadora.
      </p>
    </div>

    <div className="grid lg:grid-cols-12 gap-8">
      {/* Columna Reproductores */}
      <div className="lg:col-span-5 space-y-6">
        <h4 className="text-white font-bold text-2xl flex items-center gap-3 mb-6">
          <Mic2 className="text-red-500" /> Archivo Sonoro
        </h4>
        <AudioPlayer 
          title="Himno a la Resiliencia Obrero" 
          author="Coro Histórico Regional" 
          duration={215} 
          fakeUrl="/audios/track1_pendiente.mp3" 
        />
        <AudioPlayer 
          title="Testimonio de Pampa y Salitre" 
          author="Voces del Norte" 
          duration={184} 
          fakeUrl="/audios/track2_pendiente.mp3" 
        />
      </div>

      {/* Columna Galería Visual y Textos */}
      <div className="lg:col-span-7">
        <h4 className="text-white font-bold text-2xl flex items-center gap-3 mb-6">
          <BookOpen className="text-red-500" /> Memoria Viva
        </h4>
        <div className="grid sm:grid-cols-2 gap-6 h-full">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 bg-red-500 h-full"></div>
            <div>
              <p className="text-slate-300 italic text-lg leading-relaxed mb-6">
                "Las manos callosas del padre y el desvelo constante de la madre son los verdaderos pilares sobre los cuales se ha levantado nuestra ciudad."
              </p>
            </div>
            <div className="mt-auto">
              <span className="inline-block px-3 py-1 bg-slate-950 rounded-lg text-xs font-bold text-slate-400 uppercase">Homenaje</span>
            </div>
          </div>

          <div className="bg-red-950/30 border border-red-900/50 rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/1demayo/dia_trabajador_v2.png')] bg-cover bg-center opacity-10 grayscale mix-blend-overlay"></div>
            <div className="relative z-10">
              <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h5 className="text-white font-bold text-xl mb-2">Comunidad y Esfuerzo</h5>
              <p className="text-slate-400 text-sm">Espacio destinado a futuras exhibiciones fotográficas de sindicatos y gremios locales.</p>
              <button className="mt-6 px-6 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-full transition-colors uppercase tracking-widest">
                Próximamente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

// --- COMPONENTE PRINCIPAL ---

export default function DiaDelTrabajador() {
  const [activeTab, setActiveTab] = useState('LA SERENA');

  useEffect(() => {
    // Scroll al inicio al cargar
    window.scrollTo(0, 0);
    // Cambiar título de la página
    document.title = "1 de Mayo - Día Internacional del Trabajador | Vecinos La Serena";
  }, []);

  return (
    <div className="bg-slate-950 text-slate-200 font-sans selection:bg-red-500 selection:text-white min-h-screen">
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <SectionHero />

      <main className="pb-32 bg-slate-950 relative">
        {/* Separador Visual */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-950/0 to-slate-950 -translate-y-full pointer-events-none"></div>
        
        <AnimatePresence mode="wait">
          {activeTab === 'LA SERENA' && <SectionLaSerena key="laserena" />}
          {activeTab === 'HISTORIA' && <HistoryChicago key="hist" />}
          {activeTab === 'CHILE' && <HistoryChile key="chile" />}
          {activeTab === 'MUNDO' && <HistoryGlobal key="mundo" />}
          {activeTab === 'FAMILIA' && <SectionFamilia key="fam" />}
        </AnimatePresence>
      </main>

      {/* Footer Local Blindado y Temático */}
      <footer className="bg-black border-t border-red-900/30 pt-20 pb-10 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-white tracking-widest mb-2">1 DE MAYO</h2>
            <p className="text-red-500 font-bold tracking-[0.2em] text-xs uppercase mb-4">Especial Multimedia Autónomo</p>
            <p className="text-slate-500 text-sm">Un reconocimiento institucional a la fuerza laboral de nuestra comuna y el país.</p>
          </div>
          
          <div className="text-center md:text-right">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl">
              <Shield className="w-5 h-5 text-slate-500" />
              <div className="text-left">
                <p className="text-white text-xs font-bold uppercase">Memoria Histórica</p>
                <p className="text-slate-500 text-[10px] tracking-widest">PLATAFORMA VLS 2026</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
