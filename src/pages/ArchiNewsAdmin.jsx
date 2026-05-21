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

  useEffect(() => {
    const q = query(collection(db, 'archi_news'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsData = [];
      snapshot.forEach((doc) => {
        newsData.push({ id: doc.id, ...doc.data() });
      });
      setNews(newsData);
    });
    return () => unsubscribe();
  }, []);

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

      // Upload image if file is selected
      if (imageFile) {
        const storageRef = ref(storage, `archi_news/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'archi_news'), {
        title,
        content,
        imageUrl: finalImageUrl,
        timestamp: serverTimestamp(),
        author: 'Equipo Nueva Energía'
      });

      setTitle('');
      setContent('');
      setImageFile(null);
      setImageUrl('');
      // Reset file input
      const fileInput = document.getElementById('imageUpload');
      if (fileInput) fileInput.value = '';

      alert('Noticia publicada exitosamente');
    } catch (error) {
      console.error('Error publishing news:', error);
      alert('Hubo un error al publicar la noticia');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta noticia? Esta acción no se puede deshacer.')) {
      try {
        await deleteDoc(doc(db, 'archi_news', id));
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Error al eliminar la noticia");
      }
    }
  };

  const handleSeed = async () => {
    setLoading(true);
    try {
      const seedData = [
        {
          title: "Soberanía Digital y Código Abierto",
          content: "Fin a la dependencia. Entregaremos a las emisoras locales herramientas multiplataforma de código abierto (open source) para streaming y publicidad autoadministrable, sin pagar licencias abusivas. Con este paso, garantizamos la independencia técnica de nuestras radios.",
          imageUrl: "/archi-media/3d/pillar1.png"
        },
        {
          title: "Observatorio de Inversión Pública (OIPP)",
          content: "Exigiremos al Estado el cumplimiento del artículo 4° de la Ley 19.733 (Ley de Prensa), asegurando que el 40% del avisaje estatal se destine mayoritariamente a medios regionales, garantizando una verdadera integración nacional. Basta de centralismo en la asignación de recursos.",
          imageUrl: "/archi-media/3d/pillar2.png"
        },
        {
          title: "La Radio: Motor Económico de las Regiones",
          content: "Efecto Multiplicador y Drive-to-Store. La radio es la inversión transaccional más rentable del retail local, liquidando inventarios y movilizando la 'Economía Naranja' con una agilidad que el algoritmo digital no posee. Demostraremos nuestro valor con datos concretos.",
          imageUrl: "/archi-media/3d/pillar3.png"
        }
      ];

      for (const item of seedData) {
        await addDoc(collection(db, 'archi_news'), {
          ...item,
          timestamp: serverTimestamp(),
          author: 'Mesa Directiva Archi'
        });
      }
      alert('Noticias base cargadas exitosamente');
    } catch (error) {
      console.error('Error seeding news:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#070f20', color: 'white', fontFamily: '"Outfit", sans-serif', padding: isMobile ? '20px' : '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#fbbf24', fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>
          ARCHI - Panel de Noticias
        </h1>

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
                <button 
                  onClick={handleSeed}
                  disabled={loading}
                  style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '1px solid #3b82f6', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {loading ? 'Cargando...' : 'Cargar Noticias de Campaña (Seed)'}
                </button>
            </div>
          )}
          {news.map((item) => (
            <div key={item.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '20px', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center' }}>
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} style={{ width: isMobile ? '100%' : '150px', height: '100px', objectFit: 'cover', borderRadius: '10px' }} />
              )}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 10px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {item.content}
                </p>
                <div style={{ fontSize: '0.8rem', color: '#fbbf24' }}>
                  {item.timestamp ? new Date(item.timestamp.toDate()).toLocaleString() : 'Publicando...'}
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

      </div>
    </div>
  );
};

export default ArchiNewsAdmin;
