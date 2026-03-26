import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Link as LinkIcon, QrCode, X, Instagram } from 'lucide-react';
import { auth, db } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { QRCodeSVG } from 'qrcode.react';

export default function SmartShare({ renderAsHiddenObserver = false, isFloating = false }) {
    const [showOptions, setShowOptions] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [isMinimized, setIsMinimized] = useState(true);
    const [customShareData, setCustomShareData] = useState(null);

    useEffect(() => {
        const handleOpen = (e) => { 
            if(e.detail) {
                setCustomShareData(e.detail);
            } else {
                setCustomShareData(null);
            }
            setShowOptions(true); 
            setIsMinimized(false); 
        };
        const handleOpenQR = () => { setShowQR(true); setIsMinimized(false); };

        if (renderAsHiddenObserver) {
            window.addEventListener('open-smart-share', handleOpen);
            window.addEventListener('open-smart-share-qr', handleOpenQR);
        }

        return () => {
            if (renderAsHiddenObserver) {
                window.removeEventListener('open-smart-share', handleOpen);
                window.removeEventListener('open-smart-share-qr', handleOpenQR);
            }
        };
    }, [renderAsHiddenObserver]);

    const handleShare = async (platform) => {
        const shareUrl = customShareData?.url || "https://www.vecinoslaserena.cl";
        const shareText = customShareData?.text || `¡Hola a todos! 🚀 

Como muchos saben, desde vecinoslaserena.cl seguimos trabajando a pulso en la evolución digital de nuestra querida *La Serena*. Tras el éxito de nuestra versión anterior (¡7.000 visitas en un mes sin ninguna promoción!), hoy queremos dar un paso más y compartir la *Fase Beta* de nuestra nueva plataforma:

🌐 https://www.vecinoslaserena.cl

Es un ecosistema diseñado por y para nosotros. Aunque es un proyecto "hecho en casa", cuenta con tecnología escalable de última generación. 

🔹 *Para el Vecino:* Reportes, Radio Digital y Seguridad.
🔹 *Gestión Interna:* Herramientas para optimizar nuestra ciudad.

Estamos en fase de mapeo participativo: tus reportes nos ayudan a visualizar lo que pasa en la comuna para expandirnos paso a paso. ¡Tu ayuda es clave para este futuro regional! 🇨🇱🏙️`;
        const shareTitle = customShareData?.title || "La Serena Smart City 2026";

        switch (platform) {
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
                break;
            case 'instagram':
                window.open(`https://www.instagram.com/vecinoslaserena2`, '_blank');
                break;
            case 'qr':
                setShowQR(true);
                break;
            case 'native':
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: shareTitle,
                            text: shareText,
                            url: shareUrl
                        });
                    } catch (err) {
                        console.log("Error compartiendo vía nativa:", err);
                    }
                } else {
                    navigator.clipboard.writeText(shareUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }
                break;
            case 'copy':
                navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                break;
            default:
                break;
        }

        if (platform !== 'qr') {
            setShowOptions(false);
            setIsMinimized(true);
            
            // REWARD LOGIC: 2 tokens for sharing the platform (adjusted for economy)
            const rewardPlatforms = ['whatsapp', 'facebook', 'twitter', 'linkedin'];
            if (rewardPlatforms.includes(platform)) {
                // TOKEN REWARD LOGIC
                const currentTokens = parseInt(localStorage.getItem('vls_tokens') || '0');
                const newTokens = currentTokens + 2;
                localStorage.setItem('vls_tokens', newTokens.toString());
                
                // Dispatch event for UI updates
                window.dispatchEvent(new CustomEvent('tokens-updated', { detail: newTokens }));
                
                // Show floating alert if available in App.jsx (via event)
                window.dispatchEvent(new CustomEvent('vls-show-alert', { 
                    detail: { 
                        title: 'DIFUSIÓN RECOMPENSADA', 
                        message: '¡Gracias por compartir! Has ganado 2 Fichas VLS.',
                        type: 'info',
                        icon: 'Share2'
                    } 
                }));
            }
        }
    };

    const shareUrl = window.location.href;

    if (isFloating) {
        return (
            <motion.div 
                drag
                dragMomentum={false}
                style={{ 
                    position: 'fixed', 
                    bottom: '90px', 
                    right: '25px', 
                    zIndex: 99999, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-end',
                    gap: '10px'
                }}>
                {!isMinimized && (
                    <div className="glass-panel animate-scale-in" style={{
                        background: 'rgba(15, 23, 42, 0.95)',
                        padding: '1rem',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        border: '2px solid #ec4899',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        marginBottom: '10px',
                        minWidth: '200px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: '900', color: '#ec4899' }}>DIFUSIÓN VECINAL</span>
                            <button onClick={() => setIsMinimized(true)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={14}/></button>
                        </div>
                        <button onClick={() => handleShare('whatsapp')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', fontSize: '0.8rem', justifyContent: 'flex-start', color: '#10b981' }}><MessageCircle size={14}/> WhatsApp</button>
                        <button onClick={() => handleShare('qr')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', fontSize: '0.8rem', justifyContent: 'flex-start', color: '#38bdf8' }}><QrCode size={14}/> Código QR</button>
                        <button onClick={() => handleShare('copy')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', fontSize: '0.8rem', justifyContent: 'flex-start', color: '#fff' }}><LinkIcon size={14}/> {copied ? '¡Copiado!' : 'Copiar URL'}</button>
                    </div>
                )}

                <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="pulse"
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 5px 15px rgba(236, 72, 153, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    {isMinimized ? <Share2 size={24} /> : <X size={24} />}
                </button>

                {showQR && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 100001, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setShowQR(false)}>
                        <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', background: 'white', padding: '2rem', borderRadius: '24px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                            <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>S.M.A.R.T. SHARE</h3>
                            <QRCodeSVG value={shareUrl} size={250} level="H" includeMargin={true} />
                            <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '1rem' }}>Escanea para difundir la plataforma oficial 2026 de La Serena.</p>
                            <button onClick={() => setShowQR(false)} className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', background: '#ec4899', border: 'none' }}>CERRAR</button>
                        </div>
                    </div>
                )}
            </motion.div>
        );
    }

    return (
        <div style={{ position: renderAsHiddenObserver ? 'static' : 'relative', display: renderAsHiddenObserver ? 'none' : 'inline-block', width: '100%', maxWidth: '300px' }}>
            {!renderAsHiddenObserver && (
                <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="btn btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', border: 'none' }}
                >
                    <Share2 size={18} />
                    <span>Difundir App Vecinal</span>
                </button>
            )}

            {showOptions && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 99999, background: renderAsHiddenObserver ? 'rgba(0,0,0,0.7)' : 'transparent',
                    display: 'flex', alignItems: renderAsHiddenObserver ? 'center' : 'flex-end', justifyContent: 'center',
                    paddingBottom: renderAsHiddenObserver ? '0' : '60px'
                }} onClick={() => setShowOptions(false)}>
                    <div className="glass-panel animate-slide-up" style={{
                        background: 'var(--bg-secondary)',
                        padding: '1.5rem',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.6rem',
                        minWidth: '280px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                        border: '1px solid rgba(236, 72, 153, 0.5)',
                        position: 'relative'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                            <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'white', fontWeight: '900' }}>Difundir Plataforma</h4>
                            <button onClick={() => setShowOptions(false)} className="btn-glass" style={{ padding: '0.3rem', borderRadius: '50%', border: 'none', color: '#cbd5e1' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <button onClick={() => handleShare('native')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', justifyContent: 'flex-start', color: 'var(--serena-gold)', border: '1px solid rgba(255, 215, 0, 0.3)', fontWeight: 'bold' }}>
                            <Share2 size={20} /> Compartir directo
                        </button>
                        <button onClick={() => handleShare('whatsapp')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', justifyContent: 'flex-start', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: 'bold' }}>
                            <MessageCircle size={20} /> WhatsApp
                        </button>
                        <button onClick={() => handleShare('instagram')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', justifyContent: 'flex-start', color: '#ff0055', border: '1px solid rgba(255, 0, 85, 0.3)', fontWeight: 'bold' }}>
                            <Instagram size={20} /> Perfil Oficial
                        </button>
                        <button onClick={() => handleShare('qr')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', justifyContent: 'flex-start', color: '#ff007f', border: '1px solid rgba(255, 0, 127, 0.3)', fontWeight: 'bold' }}>
                            <QrCode size={20} /> Entregar Tarjeta/QR
                        </button>
                        <button onClick={() => handleShare('copy')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', justifyContent: 'flex-start', color: '#cbd5e1', fontWeight: 'bold' }}>
                            <LinkIcon size={20} /> {copied ? '¡Enlace Copiado!' : 'Copiar link manual'}
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL QR Y TARJETA DIGITAL */}
            {showQR && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(0,0,0,0.85)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
                    backdropFilter: 'blur(5px)'
                }}>
                    <div className="glass-panel animate-scale-in" style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '450px',
                        background: 'linear-gradient(135deg, rgba(16, 25, 60, 0.95) 0%, rgba(5, 11, 20, 0.98) 100%)',
                        border: '1px solid var(--brand-primary)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 50px rgba(0, 229, 255, 0.2)'
                    }}>
                        <button
                            onClick={() => { setShowQR(false); setShowOptions(false); }}
                            style={{
                                position: 'absolute', top: '15px', right: '15px', zIndex: 10,
                                background: 'rgba(239, 68, 68, 0.8)', color: 'white', border: 'none',
                                borderRadius: '50%', width: '36px', height: '36px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                            }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{
                            height: '160px',
                            background: 'url(/mapa.jpg) center/cover',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(to bottom, transparent 0%, rgba(5, 11, 20, 1) 100%)'
                            }}></div>
                            <img src="/serenito_v3.png" alt="Serenito" style={{
                                position: 'absolute', bottom: '-10px', left: '20px', height: '120px',
                                filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.5))', zIndex: 2
                            }} />
                            <img src="/escudo.png" alt="IMLS" style={{
                                position: 'absolute', top: '15px', left: '20px', height: '50px',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
                            }} />
                        </div>

                        <div style={{ padding: '0 2rem 2rem 2rem', textAlign: 'center', position: 'relative', zIndex: 3 }}>
                            <h2 style={{ fontSize: '1.6rem', color: 'white', margin: '0 0 0.5rem 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                La Serena Smart City
                            </h2>
                            <p style={{ color: 'var(--brand-primary)', margin: '0 0 1.5rem 0', fontWeight: 'bold' }}>
                                Escanea para unirte a la red vecinal
                            </p>
                            <div style={{
                                background: 'white', padding: '15px', borderRadius: '16px', display: 'inline-block',
                                boxShadow: '0 10px 30px rgba(255,255,255,0.1)', marginTop: '0.5rem'
                            }}>
                                <QRCodeSVG value={shareUrl} size={260} level="H" includeMargin={true} />
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1.5rem', lineHeight: '1.5' }}>
                                Muestra este código a otra persona para invitarla a la nueva plataforma de innovación y seguridad ciudadana directamente desde su celular.
                            </p>
                            <button onClick={() => { setShowQR(false); setShowOptions(false); }} className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                                CERRAR
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
