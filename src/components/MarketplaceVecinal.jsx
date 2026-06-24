import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingCart, X, Tag, MapPin, Building2, Store, Home, Bed, Bath, Maximize, Camera, Image as ImageIcon, Trash2, CheckCircle, Car, Package, PlusCircle, Search, Filter, Eye, Phone, ArrowLeft, Play, ExternalLink } from 'lucide-react';
import { supabase } from '../utils/supabase';
import imageCompression from 'browser-image-compression';

export default function MarketplaceVecinal({ onClose }) {
    const [activeTab, setActiveTab] = useState('explorar'); // explorar, mis-publicaciones, maestro
    const [categoryFilter, setCategoryFilter] = useState('todos');
    const [isPublishing, setIsPublishing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Auth modes
    const [showUserAuthModal, setShowUserAuthModal] = useState(false);
    const [showMasterAuthModal, setShowMasterAuthModal] = useState(false);
    const [sellerEmail, setSellerEmail] = useState(localStorage.getItem('vls_market_user_email') || '');
    const [sellerName, setSellerName] = useState(localStorage.getItem('vls_market_seller') || '');
    const [masterPinInput, setMasterPinInput] = useState('');
    const [masterPinError, setMasterPinError] = useState('');
    const [isMasterMode, setIsMasterMode] = useState(false);
    const [userEmailInput, setUserEmailInput] = useState('');
    const [userPasswordInput, setUserPasswordInput] = useState('');
    const [userAuthError, setUserAuthError] = useState('');
    const [masterFilter, setMasterFilter] = useState('todos');
    const [masterSearch, setMasterSearch] = useState('');

    // State for listings
    const [listings, setListings] = useState([]);
    const [userHistory, setUserHistory] = useState({ score: 0, discounts: [] });

    // Form State
    const [formData, setFormData] = useState({
        tipo_publicacion: 'vehiculo',
        titulo: '',
        precio: '',
        moneda: 'CLP',
        descripcion: '',
        ubicacion: 'La Serena',
        marca: '', modelo: '', anio: '', tipo_vehiculo: 'Automóvil', kilometraje: '',
        tipo_propiedad: 'Casa', operacion: 'Venta', habitaciones: '', banos: '', superficie: '', estacionamientos: '',
        condicion: 'Nuevo',
        contacto: '',
        video_link: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef(null);

    const MASTER_PIN = 'VLS2025';
    const handleOpenMisPublicaciones = () => {
        if (sellerEmail) {
            setActiveTab('mis-publicaciones');
        } else {
            setUserEmailInput('');
            setUserPasswordInput('');
            setUserAuthError('');
            setShowUserAuthModal(true);
        }
    };

    const handleConfirmUserAuth = () => {
        const email = userEmailInput.trim().toLowerCase();
        if (!email.includes('@') || userPasswordInput.length < 4) {
            setUserAuthError('Ingresa un correo válido y una clave de al menos 4 caracteres.');
            return;
        }
        const storedPass = localStorage.getItem(`vls_pwd_${email}`);
        if (storedPass && storedPass !== userPasswordInput) {
            setUserAuthError('Contraseña incorrecta para este correo.');
            return;
        }
        if (!storedPass) {
            localStorage.setItem(`vls_pwd_${email}`, userPasswordInput);
        }
        localStorage.setItem('vls_market_user_email', email);
        setSellerEmail(email);
        const namePart = email.split('@')[0];
        localStorage.setItem('vls_market_seller', namePart);
        setSellerName(namePart);
        setShowUserAuthModal(false);
        setActiveTab('mis-publicaciones');
    };

    const handleOpenMasterAdmin = () => {
        setMasterPinInput('');
        setMasterPinError('');
        setShowMasterAuthModal(true);
    };

    const handleConfirmMasterPin = () => {
        if (masterPinInput === MASTER_PIN) {
            setIsMasterMode(true);
            setShowMasterAuthModal(false);
            setActiveTab('maestro');
        } else {
            setMasterPinError('⚠️ PIN incorrecto. Inténtalo nuevamente.');
        }
    };

    const handleExitMaster = () => {
        setIsMasterMode(false);
        setActiveTab('explorar');
    };

    const handleExitUserAdmin = () => {
        setActiveTab('explorar');
    };

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('smart_history') || '{"score": 0, "discounts": []}');
        setUserHistory(history);
        loadListings();
    }, []);

    const loadListings = () => {
        const initial = [
            { id: '4', seller: 'Rodrigo Godoy', date: Date.now() - 1000, status: 'active', tipo_publicacion: 'propiedad', titulo: 'Excelente Casa en Avenida Gabriela Mistral', precio: '6500', moneda: 'UF', descripcion: 'Excelente propiedad ubicada en sector San Joaquín, Avenida Gabriela Mistral. Cuenta con amplios espacios, gran patio trasero, cocina equipada y excelente iluminación natural. Ideal para proyecto familiar.', ubicacion: 'San Joaquín, La Serena', tipo_propiedad: 'Casa', operacion: 'Venta', habitaciones: '4', banos: '3', superficie: '240', estacionamientos: '4', fotos: ['/images/gabriela-mistral/nuevas/IMG_20260207_203329.jpg', '/images/gabriela-mistral/nuevas/MVIMG_20260203_074330_1.jpg', '/images/gabriela-mistral/nuevas/Captura de pantalla 2026-06-23 095754.png', '/images/gabriela-mistral/nuevas/Captura de pantalla 2026-06-23 095815.png', '/images/gabriela-mistral/Gemini_Generated_Image_4811e64811e64811.png', '/images/gabriela-mistral/Gemini_Generated_Image_a62t40a62t40a62t.png', '/images/gabriela-mistral/Gemini_Generated_Image_atzwqpatzwqpatzw.png', '/images/gabriela-mistral/Gemini_Generated_Image_cyxgldcyxgldcyxg.png', '/images/gabriela-mistral/Gemini_Generated_Image_ikclq3ikclq3ikcl.png', '/images/gabriela-mistral/Gemini_Generated_Image_lqclxilqclxilqcl.png', '/images/gabriela-mistral/Gemini_Generated_Image_p6xe87p6xe87p6xe.png'], views: 342 },
            { id: '1', seller: 'Vecino Smart', date: Date.now() - 10000, status: 'active', tipo_publicacion: 'vehiculo', titulo: 'Toyota Yaris 2018 Impecable', precio: '7500000', descripcion: 'Excelente estado, único dueño, mantenciones al día. Se vende por renovación.', ubicacion: 'La Serena', marca: 'Toyota', modelo: 'Yaris', anio: '2018', tipo_vehiculo: 'Automóvil', kilometraje: '65000', fotos: ['https://images.unsplash.com/photo-1550422216-1f6b86ce888b?auto=format&fit=crop&w=800&q=80'], views: 14 },
            { id: '2', seller: 'Vecino Smart', date: Date.now() - 50000, status: 'active', tipo_publicacion: 'propiedad', titulo: 'Casa Esquina San Joaquín', precio: '4500', moneda: 'UF', descripcion: 'Amplia casa en barrio residencial. Ideal para familia grande.', ubicacion: 'San Joaquín', tipo_propiedad: 'Casa', operacion: 'Venta', habitaciones: '4', banos: '3', superficie: '180', estacionamientos: '1', fotos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'], views: 56 },
            { id: '3', seller: 'Emporio Diaguita', date: Date.now() - 100000, status: 'active', tipo_publicacion: 'producto', titulo: 'Bicicleta Trek Marlin 5', precio: '350000', descripcion: 'Aro 29, frenos hidráulicos, mantención recién hecha.', ubicacion: 'Coquimbo', condicion: 'Usado', fotos: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'], views: 89 }
        ];

        const saved = JSON.parse(localStorage.getItem('vls_marketplace_listings_v2') || '[]');
        if (saved.length === 0) {
            setListings(initial);
            localStorage.setItem('vls_marketplace_listings_v2', JSON.stringify(initial));
        } else {
            // Force update property 4 to use the new photos and seller info
            const updated = saved.map(item => item.id === '4' ? initial[0] : item);
            setListings(updated);
            localStorage.setItem('vls_marketplace_listings_v2', JSON.stringify(updated));
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + photos.length > 5) {
            alert("Máximo 5 fotos permitidas.");
            return;
        }
        setPhotos([...photos, ...files]);
    };

    const removePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            const uploadedUrls = [];
            for (const file of photos) {
                // Compresión severa para evitar cuota de LocalStorage
                const options = {
                    maxSizeMB: 0.04, // 40 KB máximo
                    maxWidthOrHeight: 500,
                    useWebWorker: true
                };
                
                try {
                    const compressedFile = await imageCompression(file, options);
                    const base64Str = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(compressedFile);
                    });
                    uploadedUrls.push(base64Str);
                } catch (err) {
                    console.error("Error al comprimir:", err);
                }
            }
            if (editingId) {
                const existingIndex = listings.findIndex(l => l.id === editingId);
                if (existingIndex !== -1) {
                    const existingItem = listings[existingIndex];
                    const updatedItem = {
                        ...existingItem,
                        ...formData,
                        seller: formData.seller || sellerName || 'Vecino Smart',
                        email: sellerEmail || existingItem.email || '',
                        fotos: uploadedUrls.length > 0 ? [...uploadedUrls] : existingItem.fotos
                    };
                    const updatedListings = [...listings];
                    updatedListings[existingIndex] = updatedItem;
                    setListings(updatedListings);
                    localStorage.setItem('vls_marketplace_listings_v2', JSON.stringify(updatedListings));
                    alert("¡Publicación editada con éxito!");
                }
            } else {
                const newListing = {
                    id: Date.now().toString(),
                    date: Date.now(),
                    status: 'active',
                    views: 0,
                    fotos: uploadedUrls,
                    ...formData,
                    seller: formData.seller || sellerName || 'Vecino Smart',
                    email: sellerEmail || '',
                };
                const updated = [newListing, ...listings];
                setListings(updated);
                localStorage.setItem('vls_marketplace_listings_v2', JSON.stringify(updated));
                
                // Gamification
                const history = { ...userHistory, score: userHistory.score + 50 };
                setUserHistory(history);
                localStorage.setItem('smart_history', JSON.stringify(history));

                alert("¡Publicación creada con éxito! +50 XP");
            }

            setIsPublishing(false);
            setEditingId(null);
            setPhotos([]);
        } catch (error) {
            alert("Error al publicar: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const markAsSold = (id) => {
        if(!confirm("¿Marcar este artículo como vendido?")) return;
        const updated = listings.map(l => l.id === id ? { ...l, status: 'sold' } : l);
        setListings(updated);
        localStorage.setItem('vls_marketplace_listings_v2', JSON.stringify(updated));
    };

    const deleteListing = (id) => {
        if(!confirm("¿Eliminar esta publicación de forma permanente?")) return;
        const updated = listings.filter(l => l.id !== id);
        setListings(updated);
        localStorage.setItem('vls_marketplace_listings_v2', JSON.stringify(updated));
        if(selectedItem && selectedItem.id === id) setSelectedItem(null);
    };

    const openEdit = (item) => {
        setFormData({
            tipo_publicacion: item.tipo_publicacion || 'vehiculo',
            titulo: item.titulo || '',
            precio: item.precio || '',
            moneda: item.moneda || 'CLP',
            descripcion: item.descripcion || '',
            ubicacion: item.ubicacion || 'La Serena',
            marca: item.marca || '', modelo: item.modelo || '', anio: item.anio || '', tipo_vehiculo: item.tipo_vehiculo || 'Automóvil', kilometraje: item.kilometraje || '',
            tipo_propiedad: item.tipo_propiedad || 'Casa', operacion: item.operacion || 'Venta', habitaciones: item.habitaciones || '', banos: item.banos || '', superficie: item.superficie || '', estacionamientos: item.estacionamientos || '',
            condicion: item.condicion || 'Nuevo',
            contacto: item.contacto || '',
            seller: item.seller || sellerName || '',
            telefono: item.telefono || item.contacto || '',
            email: item.email || ''
        });
        setEditingId(item.id);
        setIsPublishing(true);
    };

    const formatPrice = (price, isProp = false, currency = 'CLP') => {
        if (!price) return 'Consultar';
        if (isProp && currency === 'UF') return `UF ${Number(price).toLocaleString('es-CL')}`;
        return `$${Number(price).toLocaleString('es-CL')}`;
    };

    const filteredListings = listings.filter(l => l.status === 'active' && (categoryFilter === 'todos' || l.tipo_publicacion === categoryFilter));
    const myListings = sellerEmail
        ? listings.filter(l => l.email && l.email.toLowerCase() === sellerEmail.toLowerCase())
        : [];
    const masterListings = listings.filter(l => {
        const matchCat = masterFilter === 'todos' || l.tipo_publicacion === masterFilter;
        const matchSearch = !masterSearch || l.titulo?.toLowerCase().includes(masterSearch.toLowerCase()) || l.seller?.toLowerCase().includes(masterSearch.toLowerCase());
        return matchCat && matchSearch;
    });

    // Render Detail View (Cinematic Style)
    if (selectedItem) {
        return createPortal(
            <div style={{ position: 'fixed', inset: 0, zIndex: 2147483647, background: 'rgba(5, 10, 25, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(15px)', overflowY: 'auto' }}>
                <div className="animate-scale-in tw-detail-modal" style={{ width: '100%', maxWidth: '1200px', height: '95vh', maxHeight: '1000px', position: 'relative', display: 'flex', flexDirection: 'column', background: '#F8FAFC', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                    
                    {/* Header Toolbar */}
                    <div style={{ padding: '12px 16px', background: 'white', borderBottom: '2px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, position: 'sticky', top: 0 }}>
                        <button onClick={() => setSelectedItem(null)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: 'bold', fontSize: '0.95rem', padding: '10px 18px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(16,185,129,0.4)', transition: 'all 0.2s', flexShrink: 0 }}>
                            <ArrowLeft size={18} /> <span className="tw-hide-mobile">Volver al Marketplace</span>
                        </button>
                        <div className="tw-hide-mobile" style={{ color: '#64748b', fontWeight: 'bold', fontSize: '0.9rem' }}>Vista Detallada</div>
                        <button onClick={() => setSelectedItem(null)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', cursor: 'pointer', padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontWeight: 'bold', fontSize: '0.9rem', flexShrink: 0 }}>
                            <X size={18} /> Cerrar
                        </button>
                    </div>

                    <style>{`
                        @media (max-width: 600px) {
                            .tw-hide-mobile { display: none !important; }
                            .tw-detail-modal { height: 100% !important; max-height: calc(100vh - 80px) !important; }
                        }
                    `}</style>

                    <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '4rem' }}>
                        
                        {/* Title and Badge */}
                        <div style={{ maxWidth: '1200px', margin: '30px auto 20px', padding: '0 32px' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                                <span style={{ padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: '#0073C2', color: 'white', textTransform: 'uppercase' }}>
                                    {selectedItem.tipo_publicacion}
                                </span>
                                {selectedItem.tipo_publicacion === 'propiedad' && (
                                    <span style={{ padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: '#10B981', color: 'white' }}>
                                        {selectedItem.operacion}
                                    </span>
                                )}
                            </div>
                            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '800', color: '#111827', margin: '0 0 10px 0', lineHeight: 1.2 }}>
                                {selectedItem.titulo}
                            </h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4B5563', fontSize: '16px', fontWeight: '500' }}>
                                <MapPin size={18} /> {selectedItem.ubicacion}
                            </div>
                        </div>

                        {/* Cinematic Gallery */}
                        <div className="vls-detail-gallery-container" style={{ padding: '0 32px', marginBottom: '30px' }}>
                            {selectedItem.fotos && selectedItem.fotos.length > 0 ? (
                                <>
                                    {/* Desktop Gallery Grid */}
                                    <div className="vls-desktop-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
                                        <div style={{ gridColumn: selectedItem.fotos.length >= 4 ? 'span 4' : 'span 6', gridRow: 'span 2', position: 'relative' }}>
                                            <img src={selectedItem.fotos[0]} alt="Principal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        {selectedItem.fotos.length >= 2 && (
                                            <div style={{ gridColumn: 'span 2' }}>
                                                <img src={selectedItem.fotos[1]} alt="Foto 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        )}
                                        {selectedItem.fotos.length >= 3 && (
                                            <div style={{ gridColumn: 'span 2' }}>
                                                <img src={selectedItem.fotos[2]} alt="Foto 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Mobile Swipeable Gallery */}
                                    <div className="vls-mobile-gallery" style={{ display: 'none', gap: '0', overflowX: 'auto', scrollSnapType: 'x mandatory', width: '100%', height: '280px', borderRadius: '16px', background: '#000' }}>
                                        {selectedItem.fotos.map((foto, index) => (
                                            <div key={index} style={{ minWidth: '100%', width: '100%', height: '100%', scrollSnapAlign: 'start', position: 'relative', flexShrink: 0 }}>
                                                <img src={foto} alt={`Foto ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div style={{ height: '300px', background: '#E2E8F0', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ImageIcon size={64} color="#94A3B8" />
                                </div>
                            )}
                        </div>

                        {/* Detail Layout */}
                        <div className="vls-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '40px', padding: '0 32px', maxWidth: '1200px', margin: '0 auto' }}>
                            
                            {/* LEFT COLUMN */}
                            <div>
                                {/* SPECS */}
                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '30px' }}>
                                    
                                    {selectedItem.tipo_publicacion === 'propiedad' && (
                                        <>
                                            {selectedItem.habitaciones && (
                                                <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                                                    <Bed size={24} color="#64748B" />
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{selectedItem.habitaciones}</span>
                                                        <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Dormitorios</span>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedItem.banos && (
                                                <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                                                    <Bath size={24} color="#64748B" />
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{selectedItem.banos}</span>
                                                        <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Baños</span>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedItem.superficie && (
                                                <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                                                    <Maximize size={24} color="#64748B" />
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{selectedItem.superficie} m²</span>
                                                        <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Superficie</span>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedItem.estacionamientos && (
                                                <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                                                    <Car size={24} color="#64748B" />
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{selectedItem.estacionamientos}</span>
                                                        <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Estacionamientos</span>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {selectedItem.tipo_publicacion === 'vehiculo' && (
                                        <>
                                            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <Car size={24} color="#64748B" />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{selectedItem.anio}</span>
                                                    <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Año</span>
                                                </div>
                                            </div>
                                            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <Store size={24} color="#64748B" />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{selectedItem.kilometraje}</span>
                                                    <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Kilometraje</span>
                                                </div>
                                            </div>
                                            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <Tag size={24} color="#64748B" />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{selectedItem.marca} {selectedItem.modelo}</span>
                                                    <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Marca/Modelo</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* DESCRIPTION */}
                                <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', marginBottom: '28px' }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 12px 0' }}>Descripción</h3>
                                    <p style={{ color: '#4B5563', fontSize: '15px', lineHeight: '1.7', whiteSpace: 'pre-wrap', margin: 0 }}>
                                        {selectedItem.descripcion}
                                    </p>
                                    
                                    {selectedItem.video_link && (
                                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
                                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Play size={18} color="#0073C2" /> Video de la Propiedad
                                            </h3>
                                            <a href={selectedItem.video_link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(0, 115, 194, 0.1)', color: '#0073C2', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', transition: 'background 0.2s' }}>
                                                Ver Video Externo <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT COLUMN - CONTACT CARD */}
                            <div className="vls-detail-contact-card">
                                <div className="vls-detail-contact-wrapper" style={{ position: 'sticky', top: '20px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <div style={{ fontSize: '32px', fontWeight: '900', color: '#0073C2', marginBottom: '4px' }}>
                                        {formatPrice(selectedItem.precio, selectedItem.tipo_publicacion==='propiedad', selectedItem.moneda)}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '24px' }}>
                                        {selectedItem.tipo_publicacion === 'propiedad' && selectedItem.moneda === 'UF' ? 'Precio en UF' : 'Pesos Chilenos'}
                                    </div>
                                    
                                    <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '20px 0' }} />
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F1F5F9', border: '2px solid rgba(0,115,194,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                                            👤
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>{selectedItem.seller}</div>
                                            <div style={{ fontSize: '13px', color: '#0073C2', fontWeight: 'bold' }}>{selectedItem.telefono || selectedItem.contacto || 'Teléfono no especificado'}</div>
                                            {selectedItem.email && <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>{selectedItem.email}</div>}
                                            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Usuario Verificado</div>
                                        </div>
                                    </div>

                                    {selectedItem.telefono || selectedItem.contacto ? (
                                        <button onClick={() => {
                                            const contactInfo = selectedItem.telefono || selectedItem.contacto || '56958051637';
                                            const cleanedPhone = contactInfo.replace(/\D/g, '');
                                            const finalPhone = cleanedPhone.length <= 9 ? '56' + cleanedPhone : cleanedPhone;
                                            window.open(`https://wa.me/${finalPhone}?text=Hola,%20me%20interesa%20la%20publicación:%20${selectedItem.titulo}`, '_blank');
                                        }} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'linear-gradient(135deg, #25d366, #1da851)', border: 'none', color: 'white', fontSize: '15px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                            WhatsApp
                                        </button>
                                    ) : null}

                                    {selectedItem.email && (
                                        <button onClick={() => {
                                            window.open(`mailto:${selectedItem.email}?subject=Consulta sobre publicación: ${selectedItem.titulo}`);
                                        }} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'white', border: '2px solid #E2E8F0', color: '#475569', fontSize: '15px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.2s' }}>
                                            ✉️ Enviar Correo
                                        </button>
                                    )}

                                    <div style={{ textAlign: 'center', fontSize: '11px', color: '#94A3B8', marginTop: '14px' }}>
                                        Seguridad Vecinal Smart La Serena
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    return (
        <div className="vls-market-overlay" style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '2rem 1rem', boxSizing: 'border-box', alignItems: 'center' }}>
            <style>{`
                /* Custom mobile responsive styles for Marketplace Vecinal */
                .vls-market-overlay {
                    position: fixed !important;
                    inset: 0 !important;
                    z-index: 9999 !important;
                    background: rgba(15, 23, 42, 0.85) !important;
                    backdrop-filter: blur(10px) !important;
                    display: flex !important;
                    flex-direction: column !important;
                    overflow-y: auto !important;
                    padding: 2rem 1rem !important;
                    box-sizing: border-box !important;
                    align-items: center !important;
                }
                @media (max-width: 768px) {
                    /* Main container full screen adjustments */
                    .vls-market-overlay {
                        padding: 0 !important;
                        background: #0f172a !important;
                        backdrop-filter: none !important;
                    }
                    .picasso-fractal {
                        height: calc(100vh - 60px) !important;
                        min-height: calc(100vh - 60px) !important;
                        border-radius: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                        margin: 0 !important;
                        max-width: 100% !important;
                    }
                    
                    /* Top Header */
                    .vls-market-header {
                        padding: 0.75rem 1rem !important;
                    }
                    .vls-market-header-nav {
                        display: none !important;
                    }
                    .vls-market-header-actions button:not(:last-child) {
                        display: none !important;
                    }
                    .vls-market-header-brand p {
                        display: none !important;
                    }
                    .vls-market-header-brand h2 {
                        font-size: 1.2rem !important;
                    }
                    
                    /* Form grids */
                    .vls-publish-container {
                        padding: 1rem 0.5rem !important;
                    }
                    .vls-publish-inner {
                        padding: 1rem !important;
                    }
                    .vls-publish-actions {
                        flex-direction: column !important;
                        gap: 0.5rem !important;
                    }
                    .vls-publish-actions button {
                        width: 100% !important;
                    }
                    .vls-form-grid-2 {
                        grid-template-columns: 1fr !important;
                        gap: 1rem !important;
                    }
                    .vls-form-grid-3 {
                        grid-template-columns: 1fr !important;
                        gap: 0.75rem !important;
                    }
                    
                    /* Sidebar hide */
                    .vls-market-sidebar {
                        display: none !important;
                    }
                    
                    /* Horizontal categories menu */
                    .vls-market-mobile-categories {
                        display: flex !important;
                    }
                    
                    /* Grid structure (2 columns on mobile) */
                    .vls-market-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 0.75rem !important;
                    }
                    .vls-market-grid-container {
                        padding: 0.75rem !important;
                    }
                    
                    /* Card layouts */
                    .vls-card-img-container {
                        height: 120px !important;
                    }
                    .vls-card-body {
                        padding: 0.75rem !important;
                    }
                    .vls-card-body h3 {
                        font-size: 0.9rem !important;
                        margin-bottom: 0.25rem !important;
                    }
                    .vls-card-body span {
                        font-size: 1.1rem !important;
                        margin-bottom: 0.5rem !important;
                    }
                    .vls-card-footer {
                        padding-top: 0.5rem !important;
                    }
                    .vls-card-btn {
                        display: none !important;
                    }
                    
                    /* Bottom Navigation mobile styling */
                    .vls-market-bottom-nav {
                        display: flex !important;
                    }
                    
                    /* Detail modal mobile adaptations */
                    .tw-detail-modal {
                        height: 100% !important;
                        max-height: 100vh !important;
                        border-radius: 0 !important;
                    }
                    .vls-desktop-gallery {
                        display: none !important;
                    }
                    .vls-mobile-gallery {
                        display: flex !important;
                    }
                    .vls-detail-grid {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                        padding: 0 12px 80px !important; /* Extra padding for bottom contact bar */
                    }
                    .vls-detail-contact-wrapper {
                        position: fixed !important;
                        bottom: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        background: white !important;
                        border-top: 1px solid #E2E8F0 !important;
                        padding: 12px 16px !important;
                        z-index: 100 !important;
                        box-shadow: 0 -10px 20px rgba(0,0,0,0.05) !important;
                        display: flex !important;
                        gap: 10px !important;
                    }
                    .vls-detail-contact-wrapper button {
                        margin-bottom: 0 !important;
                        padding: 12px !important;
                        font-size: 14px !important;
                        flex: 1 !important;
                    }
                    .tw-hide-mobile {
                        display: none !important;
                    }
                    
                    /* Mis Publicaciones mobile styling */
                    .vls-my-listings-container {
                        padding: 1rem !important;
                    }
                    .vls-my-listing-card {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        gap: 1rem !important;
                    }
                    .vls-my-listing-card > div:first-child {
                        width: 100% !important;
                        height: 160px !important;
                    }
                    .vls-my-listing-actions {
                        width: 100% !important;
                        flex-direction: row !important;
                        flex-wrap: wrap !important;
                    }
                    .vls-my-listing-actions button {
                        flex: 1 !important;
                        min-width: 120px !important;
                        padding: 8px !important;
                        font-size: 0.8rem !important;
                    }

                    /* Control Maestro mobile styling */
                    .vls-master-header {
                        padding: 1rem !important;
                        flex-direction: column !important;
                        gap: 0.75rem !important;
                        align-items: flex-start !important;
                    }
                    .vls-master-filters {
                        padding: 0.75rem 1rem !important;
                        gap: 0.5rem !important;
                    }
                    .vls-master-filters input {
                        width: 100% !important;
                    }
                    .vls-master-listings-list {
                        padding: 1rem !important;
                    }
                    .vls-master-listing-card {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        gap: 1rem !important;
                    }
                    .vls-master-listing-card > div:first-child {
                        width: 100% !important;
                        height: 140px !important;
                    }
                    .vls-master-listing-actions {
                        width: 100% !important;
                        flex-direction: row !important;
                        flex-wrap: wrap !important;
                    }
                    .vls-master-listing-actions button {
                        flex: 1 !important;
                        min-width: 100px !important;
                        padding: 8px !important;
                        font-size: 0.8rem !important;
                    }
                }
            `}</style>
            <div className="picasso-fractal animate-scale-in" style={{ width: '100%', maxWidth: '1300px', margin: '0 auto', minHeight: '85vh', padding: '0', position: 'relative', display: 'flex', flexDirection: 'column', background: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>

                {/* Header Superior */}
                <div className="vls-market-header" style={{ padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="vls-market-header-brand" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #38bdf8, #2563eb)', padding: '0.8rem', borderRadius: '12px' }}>
                            <Store size={24} color="white" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'white', fontWeight: '800' }}>
                                Marketplace Smart
                            </h2>
                            <p style={{ margin: '0', color: '#38bdf8', fontSize: '0.85rem' }}>El gran comercio circular de La Serena</p>
                        </div>
                    </div>

                    <div className="vls-market-header-nav" style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '30px' }}>
                        <button onClick={() => { setActiveTab('explorar'); setIsPublishing(false); }} style={{ padding: '8px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer', background: activeTab === 'explorar' && !isPublishing ? '#38bdf8' : 'transparent', color: activeTab === 'explorar' && !isPublishing ? '#0f172a' : 'white', fontWeight: 'bold', transition: 'all 0.2s', fontSize: '0.9rem' }}>
                            <Search size={14} style={{ verticalAlign: '-2px', marginRight: '5px' }} /> Explorar
                        </button>
                        <button onClick={() => { setIsPublishing(false); handleOpenMisPublicaciones(); }} style={{ padding: '8px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer', background: activeTab === 'mis-publicaciones' && !isPublishing ? '#38bdf8' : 'transparent', color: activeTab === 'mis-publicaciones' && !isPublishing ? '#0f172a' : 'white', fontWeight: 'bold', transition: 'all 0.2s', fontSize: '0.9rem' }}>
                            <Tag size={14} style={{ verticalAlign: '-2px', marginRight: '5px' }} /> {sellerName ? `Mis Publicaciones (${sellerName})` : 'Mis Publicaciones'}
                        </button>
                        <button onClick={() => { setIsPublishing(false); if (isMasterMode) { setActiveTab('maestro'); } else { handleOpenMasterAdmin(); } }} style={{ padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', background: activeTab === 'maestro' && !isPublishing ? '#f59e0b' : 'transparent', color: activeTab === 'maestro' && !isPublishing ? '#0f172a' : '#f59e0b', fontWeight: 'bold', transition: 'all 0.2s', fontSize: '0.9rem', border: activeTab === 'maestro' && !isPublishing ? 'none' : '1px solid rgba(245, 158, 11, 0.3)' }}>
                            🔐 Control Maestro
                        </button>
                    </div>

                    <div className="vls-market-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={() => setIsPublishing(true)} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}>
                            <PlusCircle size={18} /> Vender Algo
                        </button>
                        <button onClick={() => onClose ? onClose() : window.location.href = '/'} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '5px' }}>
                            <X size={28} color="#94a3b8" />
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                    {isPublishing ? (
                        <div className="vls-publish-container" style={{ flex: 1, overflowY: 'auto', padding: '2rem 4rem', background: 'rgba(255,255,255,0.02)' }}>
                            <div className="vls-publish-inner" style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h2 style={{ color: 'white', marginTop: 0, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <PlusCircle color="#10b981" /> Crear Nueva Publicación
                                </h2>

                                <form onSubmit={handlePublish}>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '10px' }}>¿Qué vas a publicar?</label>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            {['vehiculo', 'propiedad', 'producto'].map(t => (
                                                <div key={t} onClick={() => setFormData({...formData, tipo_publicacion: t})} style={{ flex: 1, padding: '1rem', textAlign: 'center', background: formData.tipo_publicacion === t ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.05)', border: `2px solid ${formData.tipo_publicacion === t ? '#38bdf8' : 'transparent'}`, borderRadius: '12px', cursor: 'pointer', color: 'white', fontWeight: 'bold', textTransform: 'capitalize' }}>
                                                    {t === 'vehiculo' && <Car size={32} style={{ margin: '0 auto 10px', color: formData.tipo_publicacion === t ? '#38bdf8' : '#64748b' }} />}
                                                    {t === 'propiedad' && <Home size={32} style={{ margin: '0 auto 10px', color: formData.tipo_publicacion === t ? '#38bdf8' : '#64748b' }} />}
                                                    {t === 'producto' && <Package size={32} style={{ margin: '0 auto 10px', color: formData.tipo_publicacion === t ? '#38bdf8' : '#64748b' }} />}
                                                    {t}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Información General */}
                                    <div className="vls-form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Título descriptivo</label>
                                            <input required type="text" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} placeholder="Ej. Toyota Yaris 2020, Casa en Avenida del Mar..." style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Precio</label>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <input required type="number" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} placeholder="Ej. 5000000" style={{ flex: 1, width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '1rem', minWidth: '0' }} />
                                                <select value={formData.moneda || 'CLP'} onChange={e => setFormData({...formData, moneda: e.target.value})} style={{ width: 'auto', minWidth: '80px', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '1rem', cursor: 'pointer', flexShrink: 0 }}>
                                                    <option value="CLP">CLP</option>
                                                    <option value="UF">UF</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Ubicación</label>
                                            <input required type="text" value={formData.ubicacion} onChange={e => setFormData({...formData, ubicacion: e.target.value})} placeholder="Ej. La Serena, Peñuelas" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                                        </div>
                                    </div>

                                    {/* Categoría Específica: Vehículo */}
                                    {formData.tipo_publicacion === 'vehiculo' && (
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <h4 style={{ color: 'white', marginTop: 0, marginBottom: '1rem' }}>Detalles del Vehículo</h4>
                                            <div className="vls-form-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                                <div>
                                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Tipo</label>
                                                    <select value={formData.tipo_vehiculo} onChange={e => setFormData({...formData, tipo_vehiculo: e.target.value})} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                                                        <option>Automóvil</option><option>Camioneta</option><option>Jeep/SUV</option><option>Camión</option><option>Motocicleta</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Marca</label>
                                                    <input required type="text" value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} placeholder="Ej. Chevrolet" style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Modelo</label>
                                                    <input required type="text" value={formData.modelo} onChange={e => setFormData({...formData, modelo: e.target.value})} placeholder="Ej. Spark" style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Año</label>
                                                    <input required type="number" value={formData.anio} onChange={e => setFormData({...formData, anio: e.target.value})} placeholder="Ej. 2022" style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Kilometraje</label>
                                                    <input required type="number" value={formData.kilometraje} onChange={e => setFormData({...formData, kilometraje: e.target.value})} placeholder="Ej. 45000" style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Categoría Específica: Propiedad */}
                                    {formData.tipo_publicacion === 'propiedad' && (
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <h4 style={{ color: 'white', marginTop: 0, marginBottom: '1rem' }}>Detalles de la Propiedad</h4>
                                            <div className="vls-form-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                                <div>
                                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Operación</label>
                                                    <select value={formData.operacion} onChange={e => setFormData({...formData, operacion: e.target.value})} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                                                        <option>Venta</option><option>Arriendo</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Tipo de Inmueble</label>
                                                    <select value={formData.tipo_propiedad} onChange={e => setFormData({...formData, tipo_propiedad: e.target.value})} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                                                        <option>Casa</option><option>Departamento</option><option>Terreno</option><option>Local Comercial</option><option>Oficina</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Habitaciones</label>
                                                    <input type="number" value={formData.habitaciones} onChange={e => setFormData({...formData, habitaciones: e.target.value})} placeholder="Ej. 3" style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Baños</label>
                                                    <input type="number" value={formData.banos} onChange={e => setFormData({...formData, banos: e.target.value})} placeholder="Ej. 2" style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Superficie (m²)</label>
                                                    <input required type="number" value={formData.superficie} onChange={e => setFormData({...formData, superficie: e.target.value})} placeholder="Ej. 120" style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Estacionamientos</label>
                                                    <input required type="number" value={formData.estacionamientos} onChange={e => setFormData({...formData, estacionamientos: e.target.value})} placeholder="Ej. 2" style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Categoría Específica: Producto */}
                                    {formData.tipo_publicacion === 'producto' && (
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <h4 style={{ color: 'white', marginTop: 0, marginBottom: '1rem' }}>Detalles del Artículo</h4>
                                            <div>
                                                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.85rem' }}>Condición</label>
                                                <select value={formData.condicion} onChange={e => setFormData({...formData, condicion: e.target.value})} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                                                    <option>Nuevo</option><option>Usado - Como Nuevo</option><option>Usado - Buen Estado</option><option>Usado - Aceptable</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    <div className="vls-form-grid-3" style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Tu Nombre / Empresa</label>
                                            <input required type="text" value={formData.seller} onChange={e => setFormData({...formData, seller: e.target.value})} placeholder="Ej. Juan Pérez" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Teléfono (WhatsApp)</label>
                                            <input required type="text" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} placeholder="Ej. +56912345678" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Correo (Opcional)</label>
                                            <input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Ej. correo@ejemplo.com" style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Descripción</label>
                                        <textarea required value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} rows={4} placeholder="Describe los detalles importantes, condiciones, métodos de pago, etc." style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '1rem', resize: 'vertical' }}></textarea>
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Link a Video (YouTube, Vimeo, etc) - Opcional</label>
                                        <input type="url" value={formData.video_link || ''} onChange={e => setFormData({...formData, video_link: e.target.value})} placeholder="Ej. https://www.youtube.com/watch?v=..." style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                                    </div>

                                    {/* Subida de Fotos */}
                                    <div style={{ marginBottom: '2rem' }}>
                                        <label style={{ display: 'block', color: '#94a3b8', marginBottom: '8px' }}>Fotografías ({photos.length}/5)</label>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            {photos.map((file, i) => (
                                                <div key={i} style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.2)' }}>
                                                    <img src={URL.createObjectURL(file)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    <button type="button" onClick={() => removePhoto(i)} style={{ position: 'absolute', top: 5, right: 5, background: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            {photos.length < 5 && (
                                                <div onClick={() => fileInputRef.current?.click()} style={{ width: '100px', height: '100px', borderRadius: '12px', border: '2px dashed rgba(56, 189, 248, 0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(56, 189, 248, 0.05)', color: '#38bdf8' }}>
                                                    <Camera size={24} style={{ marginBottom: '5px' }} />
                                                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Añadir Foto</span>
                                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple style={{ display: 'none' }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="vls-publish-actions" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                        <button type="button" onClick={() => { setIsPublishing(false); setEditingId(null); }} style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                            Cancelar
                                        </button>
                                        <button type="submit" disabled={uploading} style={{ background: editingId ? '#10b981' : '#38bdf8', color: '#0f172a', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', opacity: uploading ? 0.7 : 1 }}>
                                            {uploading ? 'Guardando...' : editingId ? 'Guardar Cambios' : 'Publicar Ahora'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : activeTab === 'explorar' ? (
                        <>
                            {/* Sidebar Filters */}
                            <div className="vls-market-sidebar" style={{ width: '250px', borderRight: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                                <h4 style={{ color: 'white', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Filter size={18} color="#38bdf8" /> Categorías
                                </h4>
                                
                                <button onClick={() => setCategoryFilter('todos')} style={{ textAlign: 'left', padding: '12px 15px', borderRadius: '8px', background: categoryFilter === 'todos' ? 'rgba(56, 189, 248, 0.15)' : 'transparent', color: categoryFilter === 'todos' ? '#38bdf8' : 'white', border: 'none', cursor: 'pointer', marginBottom: '8px', fontWeight: categoryFilter === 'todos' ? 'bold' : 'normal', transition: 'all 0.2s' }}>
                                    📦 Todas las ofertas
                                </button>
                                <button onClick={() => setCategoryFilter('vehiculo')} style={{ textAlign: 'left', padding: '12px 15px', borderRadius: '8px', background: categoryFilter === 'vehiculo' ? 'rgba(56, 189, 248, 0.15)' : 'transparent', color: categoryFilter === 'vehiculo' ? '#38bdf8' : 'white', border: 'none', cursor: 'pointer', marginBottom: '8px', fontWeight: categoryFilter === 'vehiculo' ? 'bold' : 'normal', transition: 'all 0.2s' }}>
                                    🚗 Vehículos Motorizados
                                </button>
                                <button onClick={() => setCategoryFilter('propiedad')} style={{ textAlign: 'left', padding: '12px 15px', borderRadius: '8px', background: categoryFilter === 'propiedad' ? 'rgba(56, 189, 248, 0.15)' : 'transparent', color: categoryFilter === 'propiedad' ? '#38bdf8' : 'white', border: 'none', cursor: 'pointer', marginBottom: '8px', fontWeight: categoryFilter === 'propiedad' ? 'bold' : 'normal', transition: 'all 0.2s' }}>
                                    🏠 Propiedades
                                </button>
                                <button onClick={() => setCategoryFilter('producto')} style={{ textAlign: 'left', padding: '12px 15px', borderRadius: '8px', background: categoryFilter === 'producto' ? 'rgba(56, 189, 248, 0.15)' : 'transparent', color: categoryFilter === 'producto' ? '#38bdf8' : 'white', border: 'none', cursor: 'pointer', marginBottom: '8px', fontWeight: categoryFilter === 'producto' ? 'bold' : 'normal', transition: 'all 0.2s' }}>
                                    🛍️ Artículos Generales
                                </button>
                            </div>

                            {/* Grid de Publicaciones */}
                            <div className="vls-market-grid-container" style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: 'rgba(255,255,255,0.01)' }}>
                                
                                {/* Mobile Categories horizontal scroll */}
                                <div className="vls-market-mobile-categories" style={{ display: 'none', gap: '0.5rem', padding: '0.5rem 0 1rem', overflowX: 'auto', whiteSpace: 'nowrap', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }}>
                                    <button onClick={() => setCategoryFilter('todos')} style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: 'none', background: categoryFilter === 'todos' ? '#38bdf8' : 'rgba(255,255,255,0.1)', color: categoryFilter === 'todos' ? '#0f172a' : 'white', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>📦 Todos</button>
                                    <button onClick={() => setCategoryFilter('vehiculo')} style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: 'none', background: categoryFilter === 'vehiculo' ? '#38bdf8' : 'rgba(255,255,255,0.1)', color: categoryFilter === 'vehiculo' ? '#0f172a' : 'white', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>🚗 Vehículos</button>
                                    <button onClick={() => setCategoryFilter('propiedad')} style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: 'none', background: categoryFilter === 'propiedad' ? '#38bdf8' : 'rgba(255,255,255,0.1)', color: categoryFilter === 'propiedad' ? '#0f172a' : 'white', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>🏠 Propiedades</button>
                                    <button onClick={() => setCategoryFilter('producto')} style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: 'none', background: categoryFilter === 'producto' ? '#38bdf8' : 'rgba(255,255,255,0.1)', color: categoryFilter === 'producto' ? '#0f172a' : 'white', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>🛍️ Artículos</button>
                                </div>

                                <div className="vls-market-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                                    {filteredListings.length > 0 ? filteredListings.map(item => (
                                        <div key={item.id} onClick={() => setSelectedItem(item)} className="animate-fade-in" style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                            <div className="vls-card-img-container" style={{ height: '180px', background: '#000', position: 'relative' }}>
                                                {item.fotos && item.fotos[0] ? (
                                                    <img src={item.fotos[0]} alt={item.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <ImageIcon size={48} color="rgba(255,255,255,0.2)" />
                                                    </div>
                                                )}
                                                <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)' }}>
                                                    {item.tipo_publicacion}
                                                </div>
                                            </div>

                                            <div className="vls-card-body" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.1rem', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.titulo}</h3>
                                                <span style={{ color: '#38bdf8', fontSize: '1.4rem', fontWeight: '900', display: 'block', marginBottom: '1rem' }}>
                                                    {formatPrice(item.precio, item.tipo_publicacion==='propiedad', item.moneda)}
                                                </span>
                                                
                                                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <MapPin size={14} /> {item.ubicacion}
                                                </div>

                                                <div className="vls-card-footer" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{new Date(item.date).toLocaleDateString()}</span>
                                                    <button className="vls-card-btn" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                                        Ver Detalles
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
                                            <Search size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                                            <h3>No hay publicaciones en esta categoría</h3>
                                            <p>Sé el primero en vender algo aquí.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : activeTab === 'mis-publicaciones' ? (
                        /* Mis Publicaciones — Modo Usuario */
                        <div className="vls-my-listings-container" style={{ flex: 1, padding: '2rem 4rem', overflowY: 'auto', background: 'rgba(0,0,0,0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <div>
                                    <h2 style={{ color: 'white', margin: '0 0 4px 0' }}>Mis Publicaciones</h2>
                                    <span style={{ color: '#38bdf8', fontSize: '0.9rem' }}>Vendedor: <b>{sellerName}</b></span>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <span style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>{myListings.length} en total</span>
                                    <button onClick={() => { localStorage.removeItem('vls_market_seller'); setSellerName(''); handleExitUserAdmin(); }} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>Salir</button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {myListings.length > 0 ? myListings.map(item => (
                                    <div key={item.id} className="vls-my-listing-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center', opacity: item.status === 'sold' ? 0.6 : 1 }}>
                                        <div onClick={() => setSelectedItem(item)} style={{ cursor: 'pointer', width: '120px', height: '120px', borderRadius: '8px', overflow: 'hidden', background: '#000', flexShrink: 0, position: 'relative' }}>
                                            {item.fotos && item.fotos[0] ? <img src={item.fotos[0]} alt={item.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={32} style={{ margin: '40px auto', display: 'block', color: '#64748b' }} />}
                                            {item.status === 'sold' && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontWeight: '900', fontSize: '1.2rem', transform: 'rotate(-15deg)' }}>VENDIDO</div>}
                                        </div>
                                        <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => setSelectedItem(item)}>
                                            <div style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>{item.tipo_publicacion}</div>
                                            <h3 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.2rem' }}>{item.titulo}</h3>
                                            <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>{formatPrice(item.precio, item.tipo_publicacion==='propiedad', item.moneda)}</div>
                                            <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Eye size={16} /> {item.views} visualizaciones</span>
                                                <span>•</span>
                                                <span>Publicado el {new Date(item.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="vls-my-listing-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '200px', flexShrink: 0 }}>
                                            {item.status === 'active' && (
                                                <button onClick={() => markAsSold(item.id)} style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                                    <CheckCircle size={18} /> Marcar como Vendido
                                                </button>
                                            )}
                                            {item.status === 'active' && (
                                                <button onClick={() => openEdit(item)} style={{ background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.3)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                                    <PlusCircle size={18} /> Editar
                                                </button>
                                            )}
                                            <button onClick={() => deleteListing(item.id)} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                                <Trash2 size={18} /> Eliminar
                                            </button>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
                                        <Tag size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                        <h3>No hay publicaciones de <b style={{color:'white'}}>{sellerName}</b></h3>
                                        <p>Publica algo usando el botón "Vender Algo" y aparecerá aquí.</p>
                                        <button onClick={() => setIsPublishing(true)} style={{ marginTop: '1rem', background: '#38bdf8', color: '#0f172a', border: 'none', padding: '0.8rem 2rem', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>Crear Publicación</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : activeTab === 'maestro' ? (
                        /* CONTROL MAESTRO — Admin Global */
                        <div className="vls-master-container" style={{ flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.3)' }}>
                            {/* Master Header */}
                            <div className="vls-master-header" style={{ padding: '1.5rem 3rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.1))', borderBottom: '1px solid rgba(245,158,11,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '10px', borderRadius: '12px' }}>🔐</div>
                                    <div>
                                        <h2 style={{ color: '#f59e0b', margin: 0, fontSize: '1.4rem' }}>Control Maestro</h2>
                                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>vecinoslaserena.cl — Gestión global de publicaciones</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <span style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>{masterListings.length} resultados</span>
                                    <button onClick={handleExitMaster} style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.4)', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Cerrar Sesión Maestra</button>
                                </div>
                            </div>

                            {/* Filtros Maestros */}
                            <div className="vls-master-filters" style={{ padding: '1rem 3rem', display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
                                <input value={masterSearch} onChange={e => setMasterSearch(e.target.value)} placeholder="🔍 Buscar por título o vendedor..." style={{ flex: 1, minWidth: '200px', padding: '10px 16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: 'white', fontSize: '0.95rem' }} />
                                {['todos','vehiculo','propiedad','producto'].map(f => (
                                    <button key={f} onClick={() => setMasterFilter(f)} style={{ padding: '8px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer', background: masterFilter === f ? '#f59e0b' : 'rgba(255,255,255,0.07)', color: masterFilter === f ? '#0f172a' : 'white', fontWeight: 'bold', textTransform: 'capitalize', fontSize: '0.85rem' }}>{f === 'todos' ? '📦 Todas' : f === 'vehiculo' ? '🚗 Vehículos' : f === 'propiedad' ? '🏠 Propiedades' : '🛍️ Artículos'}</button>
                                ))}
                            </div>

                            {/* Lista Maestra */}
                            <div className="vls-master-listings-list" style={{ padding: '2rem 3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {masterListings.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                                        <h3>No hay publicaciones que coincidan.</h3>
                                    </div>
                                ) : masterListings.map(item => (
                                    <div key={item.id} className="vls-master-listing-card" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${item.status === 'sold' ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ width: '90px', height: '90px', borderRadius: '8px', overflow: 'hidden', background: '#000', flexShrink: 0, position: 'relative' }}>
                                            {item.fotos && item.fotos[0] ? <img src={item.fotos[0]} alt={item.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={28} style={{ margin: '31px auto', display: 'block', color: '#64748b' }} />}
                                            {item.status === 'sold' && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontWeight: '900', fontSize: '0.9rem', transform: 'rotate(-15deg)' }}>VENDIDO</div>}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                                                <span style={{ background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '2px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.tipo_publicacion}</span>
                                                <span style={{ background: item.status === 'sold' ? 'rgba(16,185,129,0.15)' : 'rgba(34,197,94,0.15)', color: item.status === 'sold' ? '#10b981' : '#22c55e', padding: '2px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold' }}>{item.status === 'sold' ? 'Vendido' : 'Activo'}</span>
                                            </div>
                                            <h3 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '1.05rem' }}>{item.titulo}</h3>
                                            <div style={{ display: 'flex', gap: '1.5rem', color: '#94a3b8', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                                                <span>👤 <b style={{color:'white'}}>{item.seller}</b></span>
                                                <span>💰 {formatPrice(item.precio, item.tipo_publicacion==='propiedad', item.moneda)}</span>
                                                <span>📍 {item.ubicacion}</span>
                                                <span>👁️ {item.views} views</span>
                                                <span>📅 {new Date(item.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="vls-master-listing-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '160px', flexShrink: 0 }}>
                                            {item.status === 'active' && (
                                                <button onClick={() => markAsSold(item.id)} style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                                    <CheckCircle size={16} /> Marcar Vendido
                                                </button>
                                            )}
                                            {item.status === 'active' && (
                                                <button onClick={() => openEdit(item)} style={{ background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.3)', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                                    <PlusCircle size={16} /> Editar
                                                </button>
                                            )}
                                            <button onClick={() => { if(window.confirm(`¿Eliminar "${item.titulo}" de ${item.seller}?`)) deleteListing(item.id); }} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                                <Trash2 size={16} /> Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}

                </div>
            </div>

            {/* MODAL: Autenticación de Usuario */}
            {showUserAuthModal && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 20000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                    <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '20px', padding: '2.5rem', width: '400px', maxWidth: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔐</div>
                            <h2 style={{ color: 'white', margin: '0 0 8px 0' }}>Seguridad del Minisitio</h2>
                            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Ingresa tu correo y contraseña para gestionar tus publicaciones.</p>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Correo Electrónico</label>
                            <input
                                type="email"
                                value={userEmailInput}
                                onChange={e => {setUserEmailInput(e.target.value); setUserAuthError('');}}
                                placeholder="tu@correo.com"
                                autoFocus
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(56,189,248,0.4)', borderRadius: '12px', color: 'white', fontSize: '1rem', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Contraseña</label>
                            <input
                                type="password"
                                value={userPasswordInput}
                                onChange={e => {setUserPasswordInput(e.target.value); setUserAuthError('');}}
                                onKeyDown={e => e.key === 'Enter' && handleConfirmUserAuth()}
                                placeholder="Minimo 4 caracteres"
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(56,189,248,0.4)', borderRadius: '12px', color: 'white', fontSize: '1rem', boxSizing: 'border-box' }}
                            />
                            {userAuthError && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '6px' }}>{userAuthError}</p>}
                            <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '6px' }}>Si es primera vez, se creará una cuenta automáticamente con la contraseña que ingreses.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={() => setShowUserAuthModal(false)} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
                            <button onClick={handleConfirmUserAuth} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #38bdf8, #2563eb)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Entrar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Control Maestro PIN */}
            {showMasterAuthModal && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 20000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)' }}>
                    <div style={{ background: 'linear-gradient(135deg, #0f172a, #1a0a00)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '20px', padding: '2.5rem', width: '400px', maxWidth: '90vw', boxShadow: '0 20px 60px rgba(245,158,11,0.15)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔐</div>
                            <h2 style={{ color: '#f59e0b', margin: '0 0 8px 0' }}>Control Maestro</h2>
                            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Acceso exclusivo para administradores de <b style={{color:'#f59e0b'}}>vecinoslaserena.cl</b></p>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>PIN de Administrador</label>
                            <input
                                type="password"
                                value={masterPinInput}
                                onChange={e => { setMasterPinInput(e.target.value); setMasterPinError(''); }}
                                onKeyDown={e => e.key === 'Enter' && handleConfirmMasterPin()}
                                placeholder="Ingresa el PIN maestro"
                                autoFocus
                                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.06)', border: `1px solid ${masterPinError ? '#ef4444' : 'rgba(245,158,11,0.4)'}`, borderRadius: '12px', color: 'white', fontSize: '1.1rem', letterSpacing: '0.3em', textAlign: 'center', boxSizing: 'border-box' }}
                            />
                            {masterPinError && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '6px', textAlign: 'center' }}>{masterPinError}</p>}
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={() => setShowMasterAuthModal(false)} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
                            <button onClick={handleConfirmMasterPin} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Acceder</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Navigation for Mobile */}
            <div className="vls-market-bottom-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '60px', background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.1)', zIndex: 1000, justifyContent: 'space-around', alignItems: 'center', boxShadow: '0 -5px 15px rgba(0,0,0,0.3)' }}>
                <button onClick={() => { setActiveTab('explorar'); setIsPublishing(false); }} style={{ background: 'transparent', border: 'none', color: activeTab === 'explorar' && !isPublishing ? '#38bdf8' : '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    <Search size={20} />
                    <span>Explorar</span>
                </button>
                <button onClick={() => { setIsPublishing(true); }} style={{ background: 'transparent', border: 'none', color: isPublishing ? '#38bdf8' : '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    <PlusCircle size={20} />
                    <span>Vender</span>
                </button>
                <button onClick={() => { setIsPublishing(false); handleOpenMisPublicaciones(); }} style={{ background: 'transparent', border: 'none', color: activeTab === 'mis-publicaciones' && !isPublishing ? '#38bdf8' : '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    <Tag size={20} />
                    <span>Mis Ventas</span>
                </button>
                <button onClick={() => { setIsPublishing(false); if (isMasterMode) { setActiveTab('maestro'); } else { handleOpenMasterAdmin(); } }} style={{ background: 'transparent', border: 'none', color: activeTab === 'maestro' && !isPublishing ? '#f59e0b' : '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    <span style={{ fontSize: '20px', height: '20px', lineHeight: '20px' }}>🔑</span>
                    <span>Maestro</span>
                </button>
            </div>
        </div>
    );
}
