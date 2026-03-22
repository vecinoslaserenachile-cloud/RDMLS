import React, { useState } from 'react';
import { BookOpen, Search, X, ArrowLeft, Download, Bookmark, Eye, Book, Headphones, Sparkles } from 'lucide-react';

const CATALOGO_LIBROS = [
    { 
        id: 1, 
        titulo: "La Araucana", 
        autor: "Alonso de Ercilla", 
        categoria: "Poesía / Épica", 
        desc: "El gran poema épico de la fundación de Chile.", 
        url: "https://www.bibliotecanacionaldigital.gob.cl/v3/viewer/visualizador-html/html/index.html?id=12345",
        cover: "https://www.bibliotecanacionaldigital.gob.cl/v2/descarga/archivo/12345/portada.jpg"
    },
    { 
        id: 2, 
        titulo: "Cuentos de Amor de Locura y de Muerte", 
        autor: "Horacio Quiroga", 
        categoria: "Cuentos", 
        desc: "Relatos magistrales que exploran la naturaleza humana y el misterio.", 
        url: "https://www.gutenberg.org/files/33714/33714-h/33714-h.htm",
        cover: "https://www.gutenberg.org/cache/epub/33714/pg33714.cover.medium.jpg"
    },
    { 
        id: 3, 
        titulo: "Sub Terra", 
        autor: "Baldomero Lillo", 
        categoria: "Realismo Social", 
        desc: "Crónicas descarnadas de la vida en las minas de Lota.", 
        url: "https://www.bibliotecanacionaldigital.gob.cl/v3/viewer/visualizador-html/html/index.html?id=54321",
        cover: "https://www.bibliotecanacionaldigital.gob.cl/v2/descarga/archivo/54321/portada.jpg"
    },
    { 
        id: 4, 
        titulo: "El Quijote de la Mancha", 
        autor: "Miguel de Cervantes", 
        categoria: "Novela", 
        desc: "La obra cumbre de la literatura en español.", 
        url: "https://www.gutenberg.org/files/2000/2000-h/2000-h.htm",
        cover: "https://www.gutenberg.org/cache/epub/2000/pg2000.cover.medium.jpg"
    },
    { 
        id: 5, 
        titulo: "Poesías de Gabriela Mistral", 
        autor: "Gabriela Mistral", 
        categoria: "Poesía", 
        desc: "Nuestra Nobel elquina. Su obra es patrimonio de La Serena y el mundo.", 
        url: "https://www.bibliotecanacionaldigital.gob.cl/v3/viewer/visualizador-html/html/index.html?id=999",
        cover: "https://www.bibliotecanacionaldigital.gob.cl/v2/descarga/archivo/999/portada.jpg"
    },
    { 
        id: 6, 
        titulo: "La televisión subliminal", 
        autor: "Joan Ferrés", 
        categoria: "Comunicación / Psicología", 
        desc: "Obra fundamental sobre el poder de la imagen y la seducción racional e irracional en los medios masivos.", 
        url: "https://archive.org/details/la-television-subliminal", 
        cover: "https://images-na.ssl-images-amazon.com/images/I/41K%2BaB5oZlL._SX331_BO1,204,203,200_.jpg"
    }
];

export default function BibliotecaDigital({ onClose }) {
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'reader'

    const filteredBooks = CATALOGO_LIBROS.filter(b => 
        b.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.autor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const EInkReader = ({ book }) => (
        <div className="animate-fade-in" style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 100002, 
            background: '#f4f4f4', // Papel e-ink
            display: 'flex', 
            flexDirection: 'column' 
        }}>
            <header style={{ 
                padding: '1rem 2rem', 
                background: 'white', 
                borderBottom: '2px solid #ddd', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => setViewMode('grid')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                        <ArrowLeft size={20} /> Salir del Lector
                    </button>
                    <div style={{ height: '24px', width: '1px', background: '#ddd' }}></div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#111', fontWeight: '900' }}>{book.titulo} / <small style={{color: '#666'}}>{book.autor}</small></h3>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-ink" title="Marcar página"><Bookmark size={20} /></button>
                    <button className="btn-ink" title="Descargar Offline"><Download size={20} /></button>
                    <button onClick={() => setViewMode('grid')} style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', background: '#eee', cursor: 'pointer' }}><X size={24} /></button>
                </div>
            </header>

            <div style={{ flex: 1, background: '#e5e5e5', display: 'flex', justifyContent: 'center', overflowY: 'hidden', padding: '1rem' }}>
                <div style={{ 
                    width: '100%', 
                    maxWidth: '850px', 
                    height: '100%', 
                    background: 'white', 
                    borderRadius: '4px', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                    position: 'relative',
                    border: '1px solid #ccc'
                }}>
                    <iframe 
                        src={book.url} 
                        style={{ width: '100%', height: '100%', border: 'none' }} 
                        title={book.titulo}
                    />
                </div>
            </div>

            <footer style={{ padding: '0.8rem', textAlign: 'center', fontSize: '0.8rem', color: '#888', background: 'white', borderTop: '1px solid #eee' }}>
                Simulación E-Ink VLS • Fuente: Biblioteca Nacional Digital / Project Gutenberg
            </footer>

            <style>{`
                .btn-ink {
                    background: white;
                    border: 1px solid #ccc;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.2s;
                }
                .btn-ink:hover { background: #f0f0f0; border-color: #999; }
            `}</style>
        </div>
    );

    return (
        <div style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 100001, 
            background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {viewMode === 'reader' && selectedBook ? (
                <EInkReader book={selectedBook} />
            ) : (
                <>
                    <header style={{ 
                        padding: '1.5rem 3rem', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        background: 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ background: 'white', padding: '0.8rem', borderRadius: '14px', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                                <BookOpen size={32} color="#0f172a" />
                            </div>
                            <div>
                                <h2 style={{ margin: 0, color: 'white', fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1px' }}> BIBLIOTECA VLS</h2>
                                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Cultura libre y universal para el vecino serenense</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input 
                                    type="text" 
                                    placeholder="Buscar por título o autor..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ 
                                        padding: '0.7rem 1.2rem 0.7rem 3rem', 
                                        borderRadius: '50px', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        background: 'rgba(0,0,0,0.3)', 
                                        color: 'white',
                                        width: '300px'
                                    }} 
                                />
                            </div>
                            <button onClick={onClose} style={{ background: '#ef4444', border: 'none', color: 'white', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <X size={24} />
                            </button>
                        </div>
                    </header>

                    <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', background: 'url("https://www.transparenttextures.com/patterns/black-paper.png")' }}>
                        
                        {/* Advisor: Alpino */}
                        <div style={{ maxWidth: '1200px', margin: '0 auto 3rem auto', display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'rgba(56, 189, 248, 0.1)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                            <img src="/avatars/alpino.png" alt="Alpino" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #38bdf8' }} />
                            <div>
                                <h4 style={{ color: '#38bdf8', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}> <Sparkles size={18} /> Tatarabuelo Alpino te recomienda:</h4>
                                <p style={{ color: 'white', margin: 0, fontSize: '1.1rem', fontStyle: 'italic' }}>
                                    "No hay mejor viaje que el que se hace en las páginas de un buen libro. Aquí he reunido lo más selecto de nuestra tierra y del mundo. ¿Gusta de un cuento o prefiere poesía?"
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                            {filteredBooks.map(book => (
                                <div 
                                    key={book.id} 
                                    className="book-card"
                                    style={{ 
                                        background: 'rgba(255,255,255,0.03)', 
                                        borderRadius: '20px', 
                                        padding: '1.5rem', 
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setSelectedBook(book)}
                                >
                                    <div style={{ 
                                        height: '240px', 
                                        background: '#334155', 
                                        borderRadius: '12px', 
                                        overflow: 'hidden',
                                        position: 'relative',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                                    }}>
                                        <img src={book.cover} alt={book.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
                                            <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{book.categoria}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 style={{ color: 'white', margin: '0 0 0.4rem 0', fontSize: '1.2rem' }}>{book.titulo}</h3>
                                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 1rem 0' }}>{book.autor}</p>
                                        <p style={{ color: '#475569', fontSize: '0.8rem', lineHeight: '1.5' }}>{book.desc}</p>
                                    </div>
                                    <button 
                                        className="btn-read"
                                        style={{ 
                                            marginTop: 'auto',
                                            padding: '0.8rem',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, #38bdf8 0%, #1e40af 100%)',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Eye size={18} /> LEER EN E-INK
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            <style>{`
                .book-card:hover { 
                    transform: translateY(-10px); 
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(56, 189, 248, 0.3);
                }
                .btn-read:hover { filter: brightness(1.2); }
                .animate-fade-in { animation: fadeIn 0.3s ease-out; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
}
