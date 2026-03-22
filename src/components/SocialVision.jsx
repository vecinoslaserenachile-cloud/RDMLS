import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X as CloseIcon, 
  Facebook, 
  Instagram, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Smile, 
  Share2, 
  Navigation,
  ChevronDown,
  ChevronRight,
  Video,
  Search,
  MapPin
} from 'lucide-react';

/**
 * SocialVision: El "Radar Vecinal" de la Red VLS.
 */
const SocialVision = ({ onClose }) => {

    const [activePlatform, setActivePlatform] = useState('facebook');
    const [locality, setLocality] = useState('La Serena');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const localities = [
        'La Serena', 'Coquimbo', 'Vicuña', 'Andacollo', 'Paihuano', 
        'Ovalle', 'Punitaqui', 'Combarbalá', 'Monte Patria', 'Illapel', 
        'Salamanca', 'Los Vilos', 'Canela', 'La Higuera', 'Río Hurtado'
    ];

    // Mock de datos para demostración del "Árbol de Comentarios"
    const mockPosts = {
        facebook: [
            {
                id: 'fb1',
                author: `Red Vecinal - ${locality}`,
                text: searchQuery 
                    ? `Resultados para "${searchQuery}" en el radar de ${locality}...`
                    : `¡Alerta Vecinal! Reportan gran congestión en el acceso a ${locality}. Preferir rutas alternativas. 🚗⚠️ #RadarVecinal`,
                time: 'Hace 2 horas',
                likes: 452,
                comments: [
                    {
                        id: 'c1',
                        user: 'Vecino Vigilante',
                        text: 'Gracias por el reporte, por acá en el centro todo despejado.',
                        replies: [
                            { user: 'Carmen L.', text: 'En El Milagro también está tranquilo.' }
                        ]
                    }
                ]
            }
        ],
        twitter: [
            {
                id: 'x1',
                author: `@vecinos_${locality.toLowerCase().replace(' ', '')}`,
                text: `¿Alguien sabe qué pasó con el corte de luz en el sector alto de ${locality}? #VecinoInformado`,
                time: 'Hace 15 min',
                likes: 89,
                comments: []
            }
        ],
        instagram: [],
        tiktok: []
    };

    const renderCommentTree = (comments, depth = 0) => {
        return comments.map((comment) => (
            <div key={comment.id || comment.user} className={`ml-${depth * 4} mt-2`}>
                <div className="bg-white/5 p-3 rounded-lg border-l-2 border-red-500/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-[10px] font-bold">
                            {comment.user[0]}
                        </div>
                        <span className="text-xs font-bold text-red-200">{comment.user}</span>
                    </div>
                    <p className="text-sm text-gray-300 italic">"{comment.text}"</p>
                </div>
                {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-4 border-l border-white/10 pl-2">
                        {renderCommentTree(comment.replies, depth + 1)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a0c] text-white p-6 font-outfit relative overflow-hidden">
            {/* Fondo Decorativo */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -ml-48 -mb-48" />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 relative z-10">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent italic tracking-tighter">
                        RADAR VECINAL
                    </h2>
                    <p className="text-gray-400 flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                        <TrendingUp size={14} className="text-red-500" /> Inteligencia Colectiva en Tiempo Real
                    </p>
                </div>
                
                {/* Selector de Localidad, Buscador y Cierre */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2 gap-2">
                        <MapPin size={14} className="text-red-500" />
                        <select 
                            value={locality}
                            onChange={(e) => setLocality(e.target.value)}
                            className="bg-transparent text-sm text-white outline-none cursor-pointer"
                        >
                            {localities.map(l => <option key={l} value={l} className="bg-[#0a0a0c]">{l}</option>)}
                        </select>
                    </div>

                    <div className="relative group flex-grow md:flex-grow-0">
                        <input 
                            type="text"
                            placeholder="Buscar en el radar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 pl-10 text-sm text-white outline-none focus:border-red-500/50 transition-all w-full md:w-48 xl:w-64"
                        />
                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                    </div>

                    <button 
                        onClick={onClose}
                        className="p-2 px-4 rounded-xl bg-white/5 hover:bg-red-600/20 text-gray-400 hover:text-red-500 border border-white/10 transition-all flex items-center gap-2 font-bold text-xs"
                    >
                        <CloseIcon size={16} /> CERRAR
                    </button>
                </div>
            </div>


            {/* Selector de Plataformas */}
            <div className="flex overflow-x-auto no-scrollbar bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md mb-6 relative z-10">
                <button 
                    onClick={() => setActivePlatform('facebook')}
                    className={`flex-shrink-0 p-3 px-6 rounded-xl transition-all flex items-center gap-2 font-bold text-sm ${activePlatform === 'facebook' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    <Facebook size={18} /> Facebook
                </button>
                <button 
                    onClick={() => setActivePlatform('twitter')}
                    className={`flex-shrink-0 p-3 px-6 rounded-xl transition-all flex items-center gap-2 font-bold text-sm ${activePlatform === 'twitter' ? 'bg-black text-white border border-white/20' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    <Navigation size={18} /> X
                </button>
                <button 
                    onClick={() => setActivePlatform('instagram')}
                    className={`flex-shrink-0 p-3 px-6 rounded-xl transition-all flex items-center gap-2 font-bold text-sm ${activePlatform === 'instagram' ? 'bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    <Instagram size={18} /> Instagram
                </button>
                <button 
                    onClick={() => setActivePlatform('tiktok')}
                    className={`flex-shrink-0 p-3 px-6 rounded-xl transition-all flex items-center gap-2 font-bold text-sm ${activePlatform === 'tiktok' ? 'bg-gradient-to-r from-cyan-400 to-pink-500 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                >
                    <Video size={18} /> TikTok
                </button>
            </div>

            {/* Contenido Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow overflow-hidden relative z-10">
                
                {/* Listado de Posts */}
                <div className="lg:col-span-12 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                    {mockPosts[activePlatform].length > 0 ? (
                        mockPosts[activePlatform].map((post) => (
                            <motion.div 
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-lg">
                                            {post.author[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{post.author}</h4>
                                            <span className="text-xs text-gray-500">{post.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <Smile size={16} className="text-red-500" />
                                            <span className="text-sm font-bold">{post.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <MessageCircle size={16} className="text-blue-500" />
                                            <span className="text-sm font-bold">{post.comments.length}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-200 mb-6 leading-relaxed">
                                    {post.text}
                                </p>

                                {/* Sección de Comentarios Sabrosos (Árbol) */}
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <h5 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4 flex items-center gap-2">
                                        <MessageCircle size={12} /> Comentarios de los Vecinos
                                    </h5>
                                    <div className="space-y-4">
                                        {renderCommentTree(post.comments)}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center text-gray-500 gap-4">
                           <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center grayscale opacity-50">
                                <Video size={32} />
                           </div>
                           <p className="italic font-bold tracking-widest text-sm uppercase">Cargando material municipal...</p>
                        </div>
                    )}
                </div>

                {/* Personaje 3D Lateral (Próximamente animado) */}
                <div className="hidden xl:flex xl:col-span-3 flex-col justify-end items-center pointer-events-none">
                     {/* Aquí iría el renderizado de Serenito */}
                </div>
            </div>

            {/* Footer Stats */}
            <div className="mt-8 flex gap-6 overflow-x-auto pb-2 border-t border-white/10 pt-4">
                <div className="flex-shrink-0 bg-white/5 p-4 rounded-xl border border-white/10 min-w-[200px]">
                    <div className="text-gray-400 text-xs uppercase mb-1">Alcance Total VLS</div>
                    <div className="text-2xl font-bold text-red-500">24.5k +</div>
                </div>
                <div className="flex-shrink-0 bg-white/5 p-4 rounded-xl border border-white/10 min-w-[200px]">
                    <div className="text-gray-400 text-xs uppercase mb-1">Sentimiento Comunal</div>
                    <div className="text-2xl font-bold text-green-500">92% Positivo</div>
                </div>
                <div className="flex-shrink-0 bg-white/5 p-4 rounded-xl border border-white/10 min-w-[200px]">
                    <div className="text-gray-400 text-xs uppercase mb-1">Conversaciones Activas</div>
                    <div className="text-2xl font-bold text-blue-500">128 Hilos</div>
                </div>
            </div>
        </div>
    );
};

export default SocialVision;
