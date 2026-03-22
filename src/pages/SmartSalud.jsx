import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SmartSalud() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('especialistas');
    const [regStep, setRegStep] = useState(1);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success

    const specialists = [
        { id: 1, name: "Dra. Elena Ramos", specialty: "Medicina General", location: "La Serena Oriente", rating: 4.8, image: "https://i.pravatar.cc/150?u=elena", status: "Disponible Hoy", price: "$25.000", tags: ["Adultos", "Telemedicina"], verified: true },
        { id: 2, name: "Manuel Pino", specialty: "Enfermería / Curaciones", location: "Algarrobito", rating: 4.9, image: "https://i.pravatar.cc/150?u=manuel", status: "A domicilio", price: "$15.000", tags: ["Inyectables", "Curaciones"], verified: true },
        { id: 3, name: "Carla Soto", specialty: "Kinesiología Motora", location: "Avenida del Mar", rating: 5.0, image: "https://i.pravatar.cc/150?u=carla", status: "Citas Lunes a Viernes", price: "$20.000", tags: ["Post-operatorio", "Masajes"], verified: true },
        { id: 4, name: "Andrés Silva", specialty: "Terapia Ocupacional", location: "El Milagro", rating: 4.7, image: "https://i.pravatar.cc/150?u=andres", status: "Disponible", price: "$22.000", tags: ["Niños", "TEA"], verified: true },
    ];

    const requests = [
        { id: 1, patient: "Sra. Marta", need: "Inyección mensual B12", location: "Las Compañías", time: "Urgente", budget: "$10.000", date: "Hoy" },
        { id: 2, patient: "Jorge L.", need: "Curación herida post-cirugía", location: "Centro", time: "Mañana 10:00 AM", budget: "$15.000", date: "Mañana" },
    ];

    const handleUpload = () => {
        setUploadStatus('uploading');
        setTimeout(() => setUploadStatus('success'), 2000);
    };

    return (
        <div className="page-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: 'white', position: 'relative' }}>
            
            {/* Botón Home Flotante */}
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '20px',
                    zIndex: 2000,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '10px 20px',
                    borderRadius: '50px',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}
            >
                <HeartPulse size={18} color="#10b981" />
                <span style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>VOLVER AL PORTAL</span>
            </button>

            {/* Cabecera Comunitaria */}
            <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '30px', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(2, 132, 199, 0.3) 100%)', border: '1px solid rgba(16, 185, 129, 0.4)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, transparent 70%)', borderRadius: '50%' }}></div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                    <div style={{ background: 'linear-gradient(45deg, #10b981, #3b82f6)', padding: '1rem', borderRadius: '20px', display: 'flex', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.5)' }}>
                        <HeartPulse size={50} color="white" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, minWidth: '300px' }}>
                        <img src="/characters/milagros.png" alt="Milagros Salud" style={{ height: '180px', filter: 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.6))', animation: 'float-slow 6s infinite' }} />
                        <div>
                            <h1 style={{ margin: 0, fontSize: '3rem', fontWeight: '900', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                Hub de Salud Vecinal
                            </h1>
                            <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.3rem', color: '#6ee7b7', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Sparkles size={20} /> Milagros: "Encuentra el especialista que necesitas cerca de ti"
                            </p>
                            <p style={{ margin: '1rem 0 0 0', fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: '1.6' }}>
                                El punto de encuentro oficial de La Serena entre vecinos que buscan atención de salud y profesionales certificados que ofrecen sus servicios.
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
                    <button 
                        onClick={() => setActiveTab('registro')}
                        className="btn-glass hover-scale" style={{ padding: '1.5rem', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(16, 185, 129, 0.5)' }}>
                        <PlusCircle size={30} color="#10b981" />
                        <div style={{ textAlign: 'left' }}>
                            <strong style={{ display: 'block', fontSize: '1.1rem' }}>Ofrecer mis Servicios</strong>
                            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Sube tu Certificado de Título y regístrate</span>
                        </div>
                    </button>
                    <button 
                        onClick={() => setActiveTab('pedidos')}
                        className="btn-glass hover-scale" style={{ padding: '1.5rem', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(59, 130, 246, 0.5)' }}>
                        <Search size={30} color="#3b82f6" />
                        <div style={{ textAlign: 'left' }}>
                            <strong style={{ display: 'block', fontSize: '1.1rem' }}>Solicitar Atención</strong>
                            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>¿Necesitas una curación o inyectable?</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Navegación Modular */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                    onClick={() => setActiveTab('especialistas')}
                    className={`btn ${activeTab === 'especialistas' ? 'btn-primary' : 'btn-glass'}`}
                    style={{ padding: '1rem 2.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <Stethoscope size={22} /> Especialistas
                </button>
                <button
                    onClick={() => setActiveTab('pedidos')}
                    className={`btn ${activeTab === 'pedidos' ? 'btn-primary' : 'btn-glass'}`}
                    style={{ padding: '1rem 2.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem', background: activeTab === 'pedidos' ? '#f59e0b' : '', borderColor: activeTab === 'pedidos' ? '#f59e0b' : '' }}>
                    <Users size={22} /> Muro de Vecinos
                </button>
                <button
                    onClick={() => setActiveTab('servicios')}
                    className={`btn ${activeTab === 'servicios' ? 'btn-primary' : 'btn-glass'}`}
                    style={{ padding: '1rem 2.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem', background: activeTab === 'servicios' ? '#ec4899' : '', borderColor: activeTab === 'servicios' ? '#ec4899' : '' }}>
                    <Syringe size={22} /> Inyectables
                </button>
                <button
                    onClick={() => setActiveTab('registro')}
                    className={`btn ${activeTab === 'registro' ? 'btn-primary' : 'btn-glass'}`}
                    style={{ padding: '1rem 2.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem', background: activeTab === 'registro' ? '#10b981' : '', borderColor: activeTab === 'registro' ? '#10b981' : '' }}>
                    <FileCheck size={22} /> Validar Mi Título
                </button>
            </div>

            {/* Contenidos */}
            <div className="tab-content animate-fade-in">

                {activeTab === 'especialistas' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {specialists.map(sp => (
                            <div key={sp.id} className="glass-panel hover-lift" style={{ padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    {sp.verified && <div style={{ background: '#10b981', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.65rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle2 size={12}/> VERIFICADO</div>}
                                    <div style={{ background: sp.status === "A domicilio" ? '#3b82f6' : '#10b981', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                        {sp.status}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: sp.verified ? '4px solid #10b981' : '4px solid #3b82f6', overflow: 'hidden', marginBottom: '1rem', boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}>
                                        <img src={sp.image} alt={sp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{sp.name}</h3>
                                    <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem' }}>{sp.specialty}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.5rem', color: '#facc15' }}>
                                        <Star size={16} fill="#facc15" /> {sp.rating}
                                    </div>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                        <MapPin size={18} color="#3b82f6" /> {sp.location}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                        <Clock size={18} color="#10b981" /> Promedio {sp.price} / sesión
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                                        {sp.tags.map(tag => (
                                            <span key={tag} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '10px' }}>#{tag}</span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
                                        <button className="btn-glass" style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3b82f6' }}><MessageSquare size={18} /></button>
                                        <button className="btn-primary" style={{ background: '#3b82f6' }}>Contactar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'registro' && (
                    <div className="glass-panel animate-slide-up" style={{ padding: '3rem', borderRadius: '30px', maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(0,0,0,0.8))', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <div style={{ background: '#10b981', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)' }}>
                                <FileCheck size={40} color="white" />
                            </div>
                            <h2 style={{ fontSize: '2.2rem', margin: 0 }}>Validador de Títulos Profesionales</h2>
                            <p style={{ color: '#6ee7b7', fontWeight: 'bold', marginTop: '0.5rem' }}>Únete a la Red de Salud Vecinal VLS</p>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Para proteger a nuestra comunidad, todos los especialistas deben subir su certificado de la Superintendencia de Salud.</p>
                        </div>

                        {uploadStatus === 'idle' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6ee7b7', fontSize: '0.9rem' }}>RUT del Profesional</label>
                                        <input type="text" placeholder="12.345.678-9" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '12px', color: 'white' }} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6ee7b7', fontSize: '0.9rem' }}>N° Registro SIS (Superintendencia)</label>
                                        <input type="text" placeholder="Ej: 458921" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '12px', color: 'white' }} />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#6ee7b7', fontSize: '0.9rem' }}>Especialidad / Título</label>
                                        <select style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '12px', color: 'white' }}>
                                            <option>Enfermero(a) Universitario</option>
                                            <option>Médico General</option>
                                            <option>Kinesiólogo(a)</option>
                                            <option>Técnico en Enfermería (TENS)</option>
                                            <option>Terapéuta Ocupacional</option>
                                        </select>
                                    </div>
                                </div>

                                <div 
                                    onClick={handleUpload}
                                    style={{ border: '2px dashed rgba(16, 185, 129, 0.4)', borderRadius: '20px', padding: '3rem', textAlign: 'center', cursor: 'pointer', background: 'rgba(16, 185, 129, 0.05)', transition: 'all 0.3s' }}>
                                    <Upload size={50} color="#10b981" style={{ marginBottom: '1rem' }} />
                                    <h4 style={{ margin: 0 }}>Sube tu Certificado de Título (PDF/JPG)</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>O arrastra el archivo aquí para comenzar el proceso de validación</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '15px', borderLeft: '5px solid #3b82f6' }}>
                                    <AlertCircle size={24} color="#3b82f6" />
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#93c5fd' }}>
                                        Tu información será revisada por nuestro equipo de moderación comunitaria en un plazo máximo de 24 horas.
                                    </p>
                                </div>
                            </div>
                        )}

                        {uploadStatus === 'uploading' && (
                            <div style={{ textAlign: 'center', padding: '4rem' }}>
                                <div className="spinner" style={{ border: '4px solid rgba(16, 185, 129, 0.1)', borderTop: '4px solid #10b981', borderRadius: '50%', width: '60px', height: '60px', animation: 'spin 1s linear infinite', margin: '0 auto 2rem auto' }}></div>
                                <h3 style={{ color: '#10b981' }}>Subiendo Documentación...</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Estamos preparando tu perfil para la revisión oficial.</p>
                            </div>
                        )}

                        {uploadStatus === 'success' && (
                            <div style={{ textAlign: 'center', padding: '4rem' }}>
                                <div style={{ background: '#10b981', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                                    <CheckCircle2 size={50} color="white" />
                                </div>
                                <h2 style={{ color: '#10b981' }}>¡Solicitud Enviada con Éxito!</h2>
                                <p style={{ fontSize: '1.2rem', color: 'white', marginTop: '1rem' }}>Gracias por unirte a la Red VLS.</p>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Recibirás una notificación en cuanto tu sello de <strong>"VERIFICADO"</strong> esté activo.</p>
                                <button 
                                    onClick={() => { setUploadStatus('idle'); setActiveTab('especialistas'); }}
                                    className="btn-primary" style={{ marginTop: '2rem', padding: '1rem 3rem', borderRadius: '30px' }}>Volver al Hub</button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'pedidos' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ margin: 0, color: '#f59e0b', fontSize: '1.5rem' }}>Muro de Solicitudes Vecinales</h3>
                                    <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>Especialistas: revisen requerimientos urgentes de la comunidad.</p>
                                </div>
                                <button className="btn-primary" style={{ background: '#f59e0b', borderRadius: '30px' }}>Publicar mi Requerimiento</button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                            {requests.map(rq => (
                                <div key={rq.id} className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ background: 'rgba(245, 158, 11, 0.2)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                                        <UserCheck size={30} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{rq.patient}</h4>
                                            <span style={{ fontSize: '0.8rem', background: '#ef4444', padding: '0.1rem 0.5rem', borderRadius: '5px', fontWeight: 'bold' }}>{rq.time}</span>
                                        </div>
                                        <p style={{ margin: '0 0 0.5rem 0', color: 'white', fontWeight: 'bold' }}>{rq.need}</p>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {rq.location}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Activity size={14} /> Presupuesto: {rq.budget}</span>
                                        </div>
                                    </div>
                                    <button className="btn-glass" style={{ color: '#f59e0b', borderColor: '#f59e0b' }}>Tomar Pedido</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'servicios' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(0, 0, 0, 0.6))', border: '1px solid rgba(236, 72, 153, 0.4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: '#ec4899', padding: '0.8rem', borderRadius: '15px' }}>
                                    <Syringe size={30} color="white" />
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Centro de Inyectables</h3>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Accede a profesionales autorizados para la administración de medicamentos intramusculares y endovenosos.</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%' }}></div> Vitaminas B12 / Neurobionta</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%' }}></div> Antibióticos Prescritos</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%' }}></div> Vacunas Particulares</li>
                            </ul>
                            <button className="btn-primary" style={{ width: '100%', background: '#ec4899' }}>Ver Enfermeros Disponibles</button>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(0, 0, 0, 0.6))', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: '#10b981', padding: '0.8rem', borderRadius: '15px' }}>
                                    <Activity size={30} color="white" />
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Curaciones Especializadas</h3>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Tratamiento de heridas quirúrgicas, úlceras y quemaduras a domicilio o en box regional.</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div> Heridas Post-Operatorias</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div> Manejo de Ostomías</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div> Pie Diabético (Control Vecinal)</li>
                            </ul>
                            <button className="btn-primary" style={{ width: '100%', background: '#10b981' }}>Pedir Especialista en Curaciones</button>
                        </div>
                    </div>
                )}
            </div>
            
            <footer style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Hub de Salud Vecinal VLS - Plataforma de Nexo Comunitario. 
                    <br />Los profesionales son independientes y responsables de su propia certificación.
                </p>
            </footer>

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .animate-slide-up { animation: slideUp 0.5s ease-out; }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .hover-scale { transition: transform 0.2s; }
                .hover-scale:hover { transform: scale(1.02); }
                .hover-lift { transition: transform 0.3s, box-shadow 0.3s; }
                .hover-lift:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
            `}</style>
        </div>
    );
}
