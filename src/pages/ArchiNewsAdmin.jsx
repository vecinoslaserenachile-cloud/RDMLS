import React, { useState, useEffect } from 'react';
import { db, storage } from '../utils/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Trash2, Image as ImageIcon, Send, Loader2, Link } from 'lucide-react';
import imageCompression from 'browser-image-compression';

const ArchiNewsAdmin = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeTab, setActiveTab] = useState('news'); // 'news' or 'supporters'
  const [supporters, setSupporters] = useState([]);
  const [loadingSupporters, setLoadingSupporters] = useState(false);

  useEffect(() => {
    // Forzar título y favicon de la campaña ARCHI
    document.title = "ARCHI Nueva Energía - Admin";
    try {
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.type = 'image/png';
      link.rel = 'icon';
      link.href = '/archi-media/audio/Solange.png'; 
    } catch(e) {}

    fetchNews();
    fetchSupporters();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/archi-news?token=archi2026admin');
      const data = await res.json();
      if (data.success) {
        setNews(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchSupporters = async () => {
    setLoadingSupporters(true);
    try {
      const res = await fetch('/api/archi-register?token=archi2026admin');
      const data = await res.json();
      if (data.success) {
        setSupporters(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching supporters:', error);
    }
    setLoadingSupporters(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1024, useWebWorker: true };
        const compressedFile = await imageCompression(file, options);
        setImageFile(compressedFile);
        setImageUrl(''); // Clear manual URL if file is selected
      } catch (error) {
        console.error("Error compressing image:", error);
        alert("Error al procesar la imagen");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Por favor completa título y contenido');
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = imageUrl;

      // Upload image to Firebase Storage if file is selected (we keep Storage for images since D1 only stores text/URLs)
      if (imageFile) {
        const storageRef = ref(storage, `archi_news/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      // Save to D1
      const res = await fetch('/api/archi-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: 'archi2026admin',
          title,
          content,
          image_url: finalImageUrl,
          category: 'Campaña'
        })
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setTitle('');
      setContent('');
      setImageFile(null);
      setImageUrl('');
      const fileInput = document.getElementById('imageUpload');
      if (fileInput) fileInput.value = '';

      alert('Noticia publicada exitosamente');
      fetchNews(); // Refresh list
    } catch (error) {
      console.error('Error publishing news:', error);
      alert('Hubo un error al publicar la noticia. Verifique que la base de datos esté enlazada.');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta noticia? Esta acción no se puede deshacer.')) {
      try {
        const res = await fetch(`/api/archi-news?id=${id}&token=archi2026admin`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        fetchNews(); // Refresh list
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Error al eliminar la noticia");
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#070f20', color: 'white', fontFamily: '"Outfit", sans-serif', padding: isMobile ? '20px' : '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ color: '#fbbf24', fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>
          ARCHI - Panel de Control
        </h1>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '15px' }}>
          <button 
            onClick={() => setActiveTab('news')}
            style={{ flex: 1, padding: '15px', borderRadius: '10px', background: activeTab === 'news' ? 'rgba(251,191,36,0.15)' : 'transparent', color: activeTab === 'news' ? '#fbbf24' : '#94a3b8', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            📰 Noticias (Web)
          </button>
          <button 
            onClick={() => setActiveTab('supporters')}
            style={{ flex: 1, padding: '15px', borderRadius: '10px', background: activeTab === 'supporters' ? 'rgba(251,191,36,0.15)' : 'transparent', color: activeTab === 'supporters' ? '#fbbf24' : '#94a3b8', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            👥 Padrón de Socios ({supporters.length})
          </button>
        </div>

        {activeTab === 'news' && (
          <>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(251,191,36,0.3)', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Send size={20} color="#fbbf24" /> Publicar Nueva Noticia
              </h2>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  type="text" 
                  placeholder="Título de la noticia" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ padding: '15px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
                  required
                />
                
                <textarea 
                  placeholder="Contenido de la noticia (soporta párrafos)" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  style={{ padding: '15px', borderRadius: '10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', resize: 'vertical' }}
                  required
                />

                <div style={{ display: 'flex', gap: '15px', flexDirection: isMobile ? 'column' : 'row' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <label htmlFor="imageUpload" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', borderRadius: '10px', cursor: 'pointer', border: '1px dashed #3b82f6', justifyContent: 'center', fontWeight: 'bold' }}>
                      <ImageIcon size={20} />
                      {imageFile ? imageFile.name : 'Subir Foto desde Equipo/Celular'}
                    </label>
                    <input 
                      id="imageUpload"
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                    <Link size={20} color="#94a3b8" />
                    <input 
                      type="text" 
                      placeholder="O pegar URL de imagen..." 
                      value={imageUrl}
                      onChange={(e) => { setImageUrl(e.target.value); setImageFile(null); }}
                      style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%' }}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ background: '#fbbf24', color: '#0f172a', padding: '15px', borderRadius: '10px', fontWeight: 900, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.1rem' }}
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  {loading ? 'Publicando...' : 'Publicar Noticia'}
                </button>
              </form>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Noticias Publicadas</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {news.length === 0 && (
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '15px', textAlign: 'center' }}>
                    <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>No hay noticias publicadas aún.</p>
                </div>
              )}
              {news.map((item) => (
                <div key={item.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '20px', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center' }}>
                  {item.image_url && (
                    <img src={item.image_url} alt={item.title} style={{ width: isMobile ? '100%' : '150px', height: '100px', objectFit: 'cover', borderRadius: '10px' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{item.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 10px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.content}
                    </p>
                    <div style={{ fontSize: '0.8rem', color: '#fbbf24' }}>
                      {item.created_at ? new Date(item.created_at).toLocaleString() : 'Publicando...'}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', padding: '10px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'supporters' && (
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#fbbf24' }}>Padrones y Adhesiones ({supporters.length})</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '5px 0 0' }}>Simbatizantes que se han registrado a través de la web radiovecinos.cl</p>
            </div>
            
            {loadingSupporters ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                <Loader2 className="animate-spin" size={30} style={{ margin: '0 auto 1rem' }} />
                Cargando padrón...
              </div>
            ) : supporters.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                No hay adhesiones registradas todavía.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
                      <th style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>Fecha</th>
                      <th style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>Nombre</th>
                      <th style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>Radio</th>
                      <th style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>Contacto</th>
                      <th style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>Comentarios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supporters.map((s, idx) => (
                      <tr key={s.id || idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                        <td style={{ padding: '15px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '15px', fontWeight: 'bold' }}>{s.name}</td>
                        <td style={{ padding: '15px', color: '#fbbf24' }}>{s.radio_station || '-'}</td>
                        <td style={{ padding: '15px' }}>
                          <div style={{ marginBottom: '4px' }}>{s.email}</div>
                          {s.phone && (
                            <a href={s.waContact} target="_blank" rel="noreferrer" style={{ color: '#25D366', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', background: 'rgba(37, 211, 102, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                              <MessageCircle size={12} /> {s.phone}
                            </a>
                          )}
                        </td>
                        <td style={{ padding: '15px', color: '#94a3b8', maxWidth: '300px' }}>
                          {s.ideas || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchiNewsAdmin;
