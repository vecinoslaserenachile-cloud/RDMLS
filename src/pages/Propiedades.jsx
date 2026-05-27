import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Home, Search, MapPin, DollarSign, Filter, 
    ArrowLeft, Star, Camera, CheckCircle2, 
    TrendingUp, ShieldCheck, Key, Ruler,
    ChevronRight, Info, Heart, Plus, Zap, AlertTriangle, MessageSquare, Send, Tag, Building2, Upload,
    Trash2, X, Image as ImageIcon, Video, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';

const INITIAL_PROPERTIES = [
    {
        id: 1, title: 'Loft Premium Casco Histórico', price: '$145.000.000', location: 'Centro, La Serena',
        beds: 2, baths: 2, size: '85m²', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        featured: true, tag: 'INVERSIÓN', type: 'Venta'
    },
    {
        id: 2, title: 'Residencia Borde Costero', price: '$210.000.000', location: 'Av. Del Mar, La Serena',
        beds: 3, baths: 3, size: '120m²', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
        featured: false, tag: 'EXCLUSIVO', type: 'Venta'
    },
    {
        id: 3, title: 'Parcela Ecológica Pan de Azúcar', price: '$120.000.000', location: 'Pan de Azúcar',
        beds: 0, baths: 0, size: '5.000m²', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        featured: true, tag: 'CAMPESTRE', type: 'Venta'
    }
];

export default function Propiedades() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProp, setSelectedProp] = useState(null);
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [properties, setProperties] = useState(INITIAL_PROPERTIES);
    const [tokens, setTokens] = useState(() => parseInt(localStorage.getItem('vls_tokens') || '0'));
    
    // Form State
    const [formData, setFormData] = useState({
        title: '', price: '', location: '', beds: '', baths: '', size: '', type: 'Venta', desc: ''
    });

    // Media State
    const [mediaFiles, setMediaFiles] = useState([]);
    const [featuredId, setFeaturedId] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer ? e.dataTransfer.files : e.target.files);
        processFiles(files);
    };

    const processFiles = (files) => {
        const imageCount = mediaFiles.filter(m => m.type.startsWith('image/')).length;
        const videoCount = mediaFiles.filter(m => m.type.startsWith('video/')).length;
        
        let newMedia = [];
        let newImageCount = imageCount;
        let newVideoCount = videoCount;

        for (const file of files) {
            if (file.size > 5 * 1024 * 1024 && file.type.startsWith('image/')) {
                alert(`La imagen ${file.name} supera los 5MB.`);
                continue;
            }
            if (file.size > 30 * 1024 * 1024 && file.type.startsWith('video/')) {
                alert(`El video ${file.name} supera los 30MB.`);
                continue;
            }

            if (file.type.startsWith('image/')) {
                if (newImageCount >= 10) {
                    alert("Máximo 10 imágenes permitidas.");
                    continue;
                }
                newImageCount++;
            } else if (file.type.startsWith('video/')) {
                if (newVideoCount >= 1) {
                    alert("Solo se permite 1 video promocional.");
                    continue;
                }
                newVideoCount++;
            } else {
                continue; // Not an image or video
            }

            const id = Math.random().toString(36).substr(2, 9);
            const preview = URL.createObjectURL(file);
            newMedia.push({ file, preview, type: file.type, id });
            
            if (!featuredId && file.type.startsWith('image/')) {
                setFeaturedId(id);
            }
        }

        if (newMedia.length > 0) {
            setMediaFiles(prev => [...prev, ...newMedia]);
            if (!featuredId) {
                const firstImg = newMedia.find(m => m.type.startsWith('image/'));
                if (firstImg) setFeaturedId(firstImg.id);
            }
        }
    };

    const removeMedia = (id) => {
        setMediaFiles(prev => prev.filter(m => m.id !== id));
        if (featuredId === id) {
            const remainingImages = mediaFiles.filter(m => m.id !== id && m.type.startsWith('image/'));
            setFeaturedId(remainingImages.length > 0 ? remainingImages[0].id : null);
        }
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        
        const hasPublishedBefore = localStorage.getItem('vls_has_published_prop') === 'true';
        if (hasPublishedBefore && tokens < 1) {
            return alert("Insuficiente saldo de Fichas VLS. Recarga en el Hub para continuar publicando.");
        }

        if (mediaFiles.length === 0) {
            return alert("Debes subir al menos una foto de la propiedad.");
        }

        setIsUploading(true);
        setUploadProgress(10);

        try {
            const uploadedUrls = [];
            let coverImgUrl = '';
            
            const totalFiles = mediaFiles.length;
            let uploadedCount = 0;

            for (const media of mediaFiles) {
                const fileExt = media.file.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
                const filePath = `propiedades/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('propiedades')
                    .upload(filePath, media.file);

                if (uploadError) {
                    console.error("Error subiendo archivo:", uploadError);
                } else {
                    const { data } = supabase.storage.from('propiedades').getPublicUrl(filePath);
                    const url = data.publicUrl;
                    uploadedUrls.push({ url, type: media.type });
                    
                    if (media.id === featuredId) {
                        coverImgUrl = url;
                    }
                }
                
                uploadedCount++;
                setUploadProgress(10 + Math.floor((uploadedCount / totalFiles) * 80));
            }

            if (!coverImgUrl && uploadedUrls.length > 0) {
                const firstImg = uploadedUrls.find(u => u.type.startsWith('image/'));
                if (firstImg) coverImgUrl = firstImg.url;
                else coverImgUrl = uploadedUrls[0].url;
            }

            const newProp = {
                id: Date.now(),
                ...formData,
                img: coverImgUrl || 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80',
                media: uploadedUrls,
                featured: false,
                tag: formData.type === 'Venta' ? 'PARTICULAR' : 'ARRIENDO'
            };

            setProperties([newProp, ...properties]);
            
            if (hasPublishedBefore) {
                const newBalance = tokens - 1;
                setTokens(newBalance);
                localStorage.setItem('vls_tokens', newBalance.toString());
                window.dispatchEvent(new CustomEvent('tokens-updated', { detail: newBalance }));
            } else {
                localStorage.setItem('vls_has_published_prop', 'true');
            }

            setUploadProgress(100);
            setTimeout(() => {
                setShowPublishModal(false);
                setFormData({ title: '', price: '', location: '', beds: '', baths: '', size: '', type: 'Venta', desc: '' });
                setMediaFiles([]);
                setFeaturedId(null);
                setIsUploading(false);
                
                setTimeout(() => {
                    alert(`¡SISTEMA MATCH VLS!: Hemos detectado 3 vecinos interesados en tu publicación de "${formData.title}". Revisa tu mensajería interna.`);
                }, 3000);
            }, 500);

        } catch (err) {
            console.error(err);
            alert("Error general durante la publicación.");
            setIsUploading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: 'white', padding: '2rem', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* Background Effects */}
            <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '10%', right: '10%', width: '500px', height: '500px', background: 'rgba(56, 189, 248, 0.05)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
            </div>

            {/* Header */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button 
                        onClick={() => navigate('/hub')}
                        className="btn-glass hover-lift"
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
                    >
                        <ArrowLeft size={18} /> Volver al Hub
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(56, 189, 248, 0.1)', padding: '0.6rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                        <Zap size={18} color="#38bdf8" fill="#38bdf8" />
                        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>{tokens} FICHAS VLS</span>
                    </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '950', letterSpacing: '-1px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Building2 size={32} color="#38bdf8" /> VLS PROPERTIES
                    </h1>
                    <span style={{ fontSize: '0.8rem', color: '#38bdf8', letterSpacing: '4px', fontWeight: 'bold' }}>CORRETAJE SMART & EXCLUSIVO</span>
                </div>
            </div>

            {/* Hero / Search */}
            <div style={{ maxWidth: '1200px', margin: '0 auto 4rem auto', position: 'relative', zIndex: 10 }}>
                <div className="glass-panel" style={{ padding: '4rem 3rem', borderRadius: '40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 58, 138, 0.3) 100%)', border: '1px solid rgba(56, 189, 248, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: 900, lineHeight: 1.1 }}>Encuentra tu lugar en la <span style={{ color: '#38bdf8' }}>Smart City</span>.</h2>
                    <p style={{ color: '#94a3b8', marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>Buscador inmobiliario hiperlocal con trazabilidad y seguridad VLS. Haz match directo con otros vecinos.</p>
                    
                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={24} />
                            <input 
                                type="text"
                                placeholder="Buscar departamentos, parcelas o casas en La Serena..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '1.5rem 1.5rem 1.5rem 4rem', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.2)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '1.1rem', outline: 'none', transition: '0.3s' }}
                            />
                        </div>
                        <button 
                            onClick={() => setShowPublishModal(true)}
                            className="btn-primary hover-lift"
                            style={{ background: '#38bdf8', color: '#0f172a', padding: '0 2.5rem', borderRadius: '20px', border: 'none', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem' }}
                        >
                            <Plus size={24} /> PUBLICAR PROPIEDAD
                        </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#10b981" /> 1ra Publicación Gratis</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={16} color="#fbbf24" /> 1 Ficha / Publicación</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} color="#38bdf8" /> Trazabilidad VLS</div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem', position: 'relative', zIndex: 10 }}>
                {properties.map(prop => (
                    <motion.div 
                        key={prop.id}
                        layout
                        whileHover={{ y: -10 }}
                        className="glass-panel"
                        style={{ borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(15, 23, 42, 0.4)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                    >
                        <div style={{ height: '260px', position: 'relative' }}>
                            <img src={prop.img} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '8px' }}>
                                <span style={{ background: '#38bdf8', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>{prop.tag}</span>
                                {prop.featured && <span style={{ background: '#f59e0b', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '950', display: 'flex', alignItems: 'center', gap: '5px' }}><Star size={12} fill="currentColor" /> DESTACADO</span>}
                            </div>
                            <button style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '50%', color: 'white', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <Heart size={20} />
                            </button>
                        </div>
                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: '900', color: 'white' }}>{prop.title}</h3>
                                    <span style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                                        <MapPin size={16} color="#38bdf8" /> {prop.location}
                                    </span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ color: '#38bdf8', fontSize: '1.4rem', fontWeight: '950', letterSpacing: '-0.5px' }}>{prop.price}</span>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold' }}>{prop.type.toUpperCase()}</div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', color: '#cbd5e1', fontSize: '0.9rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Key size={18} color="#38bdf8" /> <strong>{prop.beds}</strong> Dorm.</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={18} color="#38bdf8" /> <strong>{prop.baths}</strong> Baños</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Ruler size={18} color="#38bdf8" /> <strong>{prop.size}</strong></div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button 
                                    onClick={() => setSelectedProp(prop)}
                                    style={{ flex: 1, padding: '1.2rem', borderRadius: '18px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', color: '#38bdf8', fontWeight: '950', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem' }}
                                >
                                    VER DETALLES
                                </button>
                                <button 
                                    className="hover-lift"
                                    style={{ padding: '1.2rem', borderRadius: '18px', background: '#10b981', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <MessageSquare size={22} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modals section */}
            <AnimatePresence>
                {showPublishModal && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(20px)' }}>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 50 }} 
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="glass-panel" 
                            style={{ maxWidth: '900px', width: '100%', background: '#0f172a', borderRadius: '40px', border: '1px solid rgba(56, 189, 248, 0.3)', overflow: 'hidden' }}
                        >
                            <div style={{ padding: '2rem 3rem', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Tag color="#38bdf8" /> PUBLICAR PROPIEDAD
                                    </h2>
                                    <p style={{ margin: '5px 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>Tu aviso llegará directamente a los vecinos verificados.</p>
                                </div>
                                <button onClick={() => setShowPublishModal(false)} className="btn-glass" style={{ padding: '10px', borderRadius: '50%', color: 'white', border: 'none', background: 'rgba(239, 68, 68, 0.1)' }}>
                                    <Plus style={{ transform: 'rotate(45deg)' }} />
                                </button>
                            </div>

                            <form onSubmit={handlePublish} style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Título del Aviso</label>
                                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ej: Departamento Penthouse en Av. del Mar" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.2rem', borderRadius: '15px', color: 'white', fontSize: '1rem' }} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Precio (CLP / UF)</label>
                                    <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="$ 140.000.000" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.2rem', borderRadius: '15px', color: 'white', fontSize: '1rem' }} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Ubicación / Sector</label>
                                    <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Sector La Pampa, La Serena" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.2rem', borderRadius: '15px', color: 'white', fontSize: '1rem' }} />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', gridColumn: 'span 2' }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Dormitorios</label>
                                        <input type="number" value={formData.beds} onChange={e => setFormData({...formData, beds: e.target.value})} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '0.8rem', borderRadius: '12px', color: 'white' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Baños</label>
                                        <input type="number" value={formData.baths} onChange={e => setFormData({...formData, baths: e.target.value})} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '0.8rem', borderRadius: '12px', color: 'white' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>m² / Superificie</label>
                                        <input type="text" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} placeholder="120m²" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '0.8rem', borderRadius: '12px', color: 'white' }} />
                                    </div>
                                </div>

                                {/* Multimedia Drag & Drop Zone */}
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Multimedia ({mediaFiles.length}/11)</label>
                                    
                                    <div 
                                        onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#10b981'; }}
                                        onDragLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)'; }}
                                        onDrop={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)'; handleFileDrop(e); }}
                                        style={{ 
                                            background: 'rgba(15, 23, 42, 0.5)', 
                                            border: '2px dashed rgba(56, 189, 248, 0.5)', 
                                            padding: '2rem', 
                                            borderRadius: '20px', 
                                            textAlign: 'center', 
                                            transition: '0.3s',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minHeight: '150px'
                                        }}
                                    >
                                        <input 
                                            type="file" 
                                            id="media-upload" 
                                            multiple 
                                            accept="image/*,video/*" 
                                            onChange={handleFileDrop} 
                                            style={{ display: 'none' }} 
                                        />
                                        <label htmlFor="media-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                            <div style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
                                                <ImageIcon size={32} color="#38bdf8" />
                                                <Video size={32} color="#10b981" />
                                            </div>
                                            <div style={{ fontWeight: 'bold', color: 'white', fontSize: '1.1rem' }}>Arrastra tus fotos o video aquí</div>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '5px' }}>o haz clic para explorar en tu dispositivo</div>
                                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '10px' }}>Hasta 10 fotos (5MB c/u) y 1 video (30MB)</div>
                                        </label>
                                    </div>

                                    {/* Preview Grid */}
                                    {mediaFiles.length > 0 && (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                                            <AnimatePresence>
                                                {mediaFiles.map((media) => (
                                                    <motion.div 
                                                        key={media.id}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        style={{ 
                                                            position: 'relative', 
                                                            aspectRatio: '1', 
                                                            borderRadius: '12px', 
                                                            overflow: 'hidden',
                                                            border: featuredId === media.id ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)'
                                                        }}
                                                    >
                                                        {media.type.startsWith('image/') ? (
                                                            <img src={media.preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
                                                        ) : (
                                                            <div style={{ width: '100%', height: '100%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Video size={32} color="#94a3b8" />
                                                            </div>
                                                        )}
                                                        
                                                        <button 
                                                            type="button"
                                                            onClick={() => removeMedia(media.id)}
                                                            style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(239, 68, 68, 0.8)', color: 'white', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer', zIndex: 10 }}
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>

                                                        {media.type.startsWith('image/') && (
                                                            <button 
                                                                type="button"
                                                                onClick={() => setFeaturedId(media.id)}
                                                                style={{ position: 'absolute', bottom: '5px', left: '5px', background: featuredId === media.id ? '#f59e0b' : 'rgba(0,0,0,0.5)', color: featuredId === media.id ? '#0f172a' : 'white', border: 'none', borderRadius: '8px', padding: '4px 8px', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', backdropFilter: 'blur(4px)' }}
                                                            >
                                                                <Star size={12} fill={featuredId === media.id ? '#0f172a' : 'none'} /> 
                                                                {featuredId === media.id ? 'PORTADA' : 'Elegir'}
                                                            </button>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </div>

                                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '2rem', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: 0, color: '#10b981' }}>Publicación Certificada VLS</h4>
                                        <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Al publicar aquí, los vecinos saben que es un trato directo y seguro.</p>
                                        {isUploading && (
                                            <div style={{ marginTop: '10px', height: '6px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', background: '#10b981', width: `${uploadProgress}%`, transition: 'width 0.3s' }}></div>
                                            </div>
                                        )}
                                    </div>
                                    <button disabled={isUploading} type="submit" className="btn-primary-vls hover-lift" style={{ padding: '1rem 3rem', background: isUploading ? '#064e3b' : '#10b981', color: 'white', borderRadius: '14px', border: 'none', fontWeight: '900', fontSize: '1rem', boxShadow: isUploading ? 'none' : '0 10px 30px rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '10px', cursor: isUploading ? 'not-allowed' : 'pointer' }}>
                                        {isUploading ? <><Loader2 size={20} className="animate-spin" /> SUBIENDO...</> : 'PUBLICAR AHORA'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Trust Badges */}
            <div style={{ maxWidth: '1200px', margin: '6rem auto 0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '1.5rem', borderRadius: '25px', marginBottom: '1.5rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                        <TrendingUp size={40} color="#38bdf8" />
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.5rem' }}>Plusvalía Smart</h4>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>Análisis predictivo de crecimiento urbano sectorial mediante IA Faro.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '25px', marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        <ShieldCheck size={40} color="#10b981" />
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.5rem' }}>Trazabilidad Total</h4>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>Operaciones verificadas y seguras. Sin intermediarios abusivos.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1.5rem', borderRadius: '25px', marginBottom: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                        <MessageSquare size={40} color="#f59e0b" />
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.5rem' }}>Match Directo</h4>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>Conexión inmediata entre oferentes y demandantes del mismo sector.</p>
                </div>
            </div>

            <div style={{ height: '5rem' }}></div>
        </div>
    );
}
