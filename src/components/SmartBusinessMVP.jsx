import React, { useState } from 'react';
import { 
  X as CloseIcon, Smartphone, Upload, Music, CreditCard, ExternalLink, 
  ShoppingBag, ShieldCheck, Globe, Star, Zap, Image as ImageIcon, Save
} from 'lucide-react';

export default function SmartBusinessMVP({ onClose }) {
  const [activeTab, setActiveTab] = useState('design');
  
  // Estado para la previsualización en vivo (El "Mini Sitio")
  const [siteData, setSiteData] = useState({
    name: 'Mi Negocio Vecinal',
    description: 'Ofrecemos los mejores productos de la región con entrega directa.',
    logoInfo: null,
    themeColor: '#38bdf8',
    showRadio: true,
    products: [
      { id: 1, name: 'Producto Estrella', price: '15000', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' }
    ]
  });

  const [paymentConnected, setPaymentConnected] = useState(false);

  const handleUpdate = (field, value) => {
    setSiteData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => handleUpdate('logoInfo', e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addTestProduct = () => {
    const newProd = {
      id: Date.now(),
      name: 'Nuevo Servicio/Prod',
      price: '5000',
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop'
    };
    handleUpdate('products', [...siteData.products, newProd]);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 110000, background: 'rgba(2, 6, 23, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(20px)' }}>
      <div className="animate-scale-in" style={{ width: '100%', maxWidth: '1200px', height: '90vh', background: '#0f172a', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        {/* PANEL IZQUIERDO: CONTROLES */}
        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Header */}
          <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, color: 'white', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag color="#38bdf8" /> Creador de Comercios
              </h2>
              <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>Solución "Llave en Mano" para PYMEs y Emprendedores locales.</p>
            </div>
            <button onClick={onClose} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }}><CloseIcon size={20} /></button>
          </div>

          {/* Navegación de Tabs */}
          <div style={{ display: 'flex', padding: '1rem', gap: '0.5rem', background: '#020617' }}>
            {[
              { id: 'design', icon: ImageIcon, label: 'Diseño' },
              { id: 'catalog', icon: ShoppingBag, label: 'Catálogo' },
              { id: 'payments', icon: CreditCard, label: 'Cobros' },
              { id: 'premium', icon: Star, label: 'Premium' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, padding: '0.8rem', borderRadius: '12px', border: 'none', cursor: 'pointer',
                  background: activeTab === tab.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  color: activeTab === tab.id ? '#38bdf8' : '#94a3b8',
                  fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
                  transition: 'all 0.2s'
                }}
              >
                <tab.icon size={20} />
                <span style={{ fontSize: '0.7rem' }}>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Área de Edición */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {activeTab === 'design' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Nombre del Negocio</label>
                  <input type="text" value={siteData.name} onChange={(e) => handleUpdate('name', e.target.value)} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', padding: '0.8rem', borderRadius: '8px', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Descripción Corta</label>
                  <textarea value={siteData.description} onChange={(e) => handleUpdate('description', e.target.value)} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', padding: '0.8rem', borderRadius: '8px', color: 'white', minHeight: '80px', resize: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Logotipo</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(56, 189, 248, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px dashed #38bdf8', cursor: 'pointer', color: '#38bdf8', justifyContent: 'center' }}>
                    <Upload size={20} /> Subir Imagen
                    <input type="file" hidden accept="image/*" onChange={handleLogoUpload} />
                  </label>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Color Principal</label>
                  <input type="color" value={siteData.themeColor} onChange={(e) => handleUpdate('themeColor', e.target.value)} style={{ width: '100%', height: '50px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1e293b', padding: '1rem', borderRadius: '8px' }}>
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Radio Interna</strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Música ambiental para clientes</span>
                  </div>
                  <input type="checkbox" checked={siteData.showRadio} onChange={(e) => handleUpdate('showRadio', e.target.checked)} style={{ transform: 'scale(1.5)', accentColor: '#38bdf8' }} />
                </div>
              </div>
            )}

            {activeTab === 'catalog' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ color: 'white', margin: 0 }}>Productos/Servicios</h3>
                  <button onClick={addTestProduct} className="btn-primary" style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem' }}>+ Añadir</button>
                </div>
                {siteData.products.map((prod, i) => (
                  <div key={prod.id} style={{ background: '#1e293b', padding: '1rem', borderRadius: '12px', border: '1px solid #334155', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src={prod.img} alt={prod.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <input type="text" value={prod.name} onChange={(e) => {
                        const newP = [...siteData.products]; newP[i].name = e.target.value; handleUpdate('products', newP);
                      }} style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', fontWeight: 'bold', marginBottom: '0.3rem', outline: 'none' }} />
                      <div style={{ display: 'flex', alignItems: 'center', color: '#10b981' }}>
                        $ <input type="text" value={prod.price} onChange={(e) => {
                          const newP = [...siteData.products]; newP[i].price = e.target.value; handleUpdate('products', newP);
                        }} style={{ width: '100px', background: 'transparent', border: 'none', color: '#10b981', outline: 'none' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
                  <CreditCard size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>Pasarela de Pagos</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Conecta tu cuenta para recibir pagos directos con tarjetas de crédito y débito mediante la infraestructura VLS.
                  </p>
                  {!paymentConnected ? (
                    <button onClick={() => setPaymentConnected(true)} className="btn hover-lift" style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 'bold' }}>
                      Conectar Transbank / MercadoPago
                    </button>
                  ) : (
                    <div style={{ color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <ShieldCheck size={20} /> ¡Conectado y Listo para Cobrar!
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'premium' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'linear-gradient(135deg, #d4af37, #b8860b)', padding: '2rem', borderRadius: '16px', color: 'white', textAlign: 'center', boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)' }}>
                  <Globe size={48} style={{ marginBottom: '1rem' }} />
                  <h2 style={{ margin: '0 0 0.5rem 0', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Plan VLS Dominio Propio</h2>
                  <p style={{ margin: '0 0 1.5rem 0', opacity: 0.9 }}>
                    Capa Gratuita: <strong>{siteData.name.toLowerCase().replace(/\s+/g, '-')}.vecinoslaserena.cl</strong>
                  </p>
                  <ul style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '1rem 1rem 1rem 2.5rem', borderRadius: '8px', margin: '0 0 1.5rem 0', fontSize: '0.9rem' }}>
                    <li><strong style={{color:'#fff'}}>Dominio .CL propio</strong> (ej: minegocio.cl)</li>
                    <li>Soporte y Analíticas Avanzadas SEO</li>
                    <li>Sin marca de agua de VLS</li>
                  </ul>
                  <button className="btn" style={{ background: 'white', color: '#b8860b', border: 'none', padding: '0.8rem 2rem', borderRadius: '30px', fontWeight: '900', width: '100%', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                    ACTUALIZAR A PREMIUM
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Botón Guardar Inferior */}
          <div style={{ padding: '1rem', background: '#020617', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <button className="btn-primary hover-lift" style={{ width: '100%', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 'bold' }}>
              <Save size={20} /> Publicar Mi Negocio
            </button>
          </div>
        </div>

        {/* PANEL DERECHO: PREVISUALIZACIÓN MÓVIL EN VIVO */}
        <div style={{ flex: 1, background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(5px)' }}>
            <Zap size={14} color="#fcd34d" /> Previsualización en Tiempo Real
          </div>

          {/* Marco del Teléfono */}
          <div style={{ width: '375px', height: '812px', background: '#fff', borderRadius: '40px', border: '12px solid #0f172a', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            
            {/* Notch del Teléfono */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '150px', height: '25px', background: '#0f172a', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', zIndex: 10 }}></div>

            {/* HEADER DEL SITIO GENERADO */}
            <div style={{ padding: '3rem 1.5rem 2rem 1.5rem', background: siteData.themeColor, color: 'white', textAlign: 'center', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', position: 'relative' }}>
               {siteData.logoInfo ? (
                 <img src={siteData.logoInfo} alt="Logo" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '50%', background: 'white', padding: '5px', margin: '0 auto 1rem auto', display: 'block', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} />
               ) : (
                 <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                   <ImageIcon size={40} />
                 </div>
               )}
               <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>{siteData.name}</h1>
               <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>{siteData.description}</p>
            </div>

            {/* CONTENIDO DEL SITIO MÓVIL */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', background: '#f8fafc' }}>
              
              {/* Radio Widget (Opcional) */}
              {siteData.showRadio && (
                <div style={{ background: '#1e293b', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
                    <div style={{ background: siteData.themeColor, padding: '8px', borderRadius: '50%' }}>
                      <Music size={16} color="white" />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.85rem' }}>Radio del Local</strong>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>En vivo 🔴</span>
                    </div>
                  </div>
                  <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer' }}>Play</button>
                </div>
              )}

              <h2 style={{ fontSize: '1.1rem', color: '#334155', marginBottom: '1rem' }}>Productos Recomendados</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {siteData.products.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center' }}>No hay productos.</p>}
                
                {siteData.products.map(prod => (
                  <div key={prod.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <img src={prod.img} alt={prod.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#0f172a' }}>{prod.name}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '1.2rem', color: siteData.themeColor }}>${Number(prod.price).toLocaleString('es-CL')}</strong>
                        <button style={{ background: paymentConnected ? siteData.themeColor : '#cbd5e1', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.8rem' }}>
                          {paymentConnected ? 'Comprar' : 'Ver más'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Footer Watermark */}
            <div style={{ padding: '0.8rem', textAlign: 'center', background: '#e2e8f0', fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              Creado con <Zap size={10} color="#38bdf8" /> <strong>Smart Comuna VLS</strong>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
