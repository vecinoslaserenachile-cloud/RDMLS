import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ExternalLink, Share2, Download, Radio, Map, Cloud, Newspaper, Users, Music, Info, X, Play, Pause, ChevronRight } from 'lucide-react';

const VLS_DATA = {
    radioStream: "https://az11.yesstreaming.net:8630/radio.mp3",
    favicon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22black%22/><text y=%22.9em%22 font-size=%2280%22 font-family=%22Arial%22 font-weight=%22900%22 fill=%22white%22>v</text><text x=%2245%22 y=%22.9em%22 font-size=%2280%22 font-family=%22Arial%22 font-weight=%22900%22 fill=%22white%22>LS</text></svg>',
    landmarks: [
        { n: "FARO MONUMENTAL", q: "Faro Monumental de La Serena", z: 15 },
        { n: "PLAZA DE ARMAS", q: "Plaza de Armas La Serena", z: 16 },
        { n: "JARDÍN JAPONÉS", q: "Jardin Japones La Serena", z: 18 },
        { n: "LAS COMPAÑÍAS", q: "Las Compañías La Serena", z: 14 },
        { n: "AVENIDA DEL MAR", q: "Avenida del Mar 3000, La Serena", z: 15 },
        { n: "ESTADIO LA PORTADA", q: "Estadio La Portada", z: 16 },
        { n: "CERRO GRANDE AL MAR", q: "Cerro Grande La Serena", z: 14 }
    ],
    items: [
        { 
            id: "e4AYdzIF6OQ", type: "MÚSICA", cat: "PATRIMONIO", title: "Los Vikings 5", 
            titular: "Los Vikings 5: La Epopeya de la Cumbia Eléctrica en el Puerto", 
            bajada: "Más de medio siglo de historia: Cómo una familia de carpinteros de Coquimbo transformó la música tropical chilena para siempre.", 
            body: "La historia de Los Vikings 5 no es solo una biografía musical, es el relato antropológico de Coquimbo. Todo comenzó en 1969, en el sector de El Llano, cuando Juan Núñez decidió que la cumbia no tenía por qué ser interpretada solo con orquestas de viento.\n\nCapítulo 1: El Sonido del Chinchinero Eléctrico. La guitarra de los Vikings imita la alegría y la urgencia del puerto. No busca la perfección académica, busca el baile. Temas como 'El Minero' o 'De Coquimbo soy' se convirtieron en himnos que trascienden clases sociales.\n\nCapítulo 2: La Dinastía Núñez. Tras la partida de los fundadores, la segunda y tercera generación, liderada hoy por Ángel Núñez, ha mantenido el buque a flote. La autogestión ha sido su bandera: grabar, producir y distribuir desde la región, sin depender de Santiago.\n\nCapítulo 3: Patrimonio Vivo. Hoy, los Vikings 5 son considerados Tesoro Humano Vivo de facto. Su presencia en la Pampilla es un rito anual obligatorio, y su capacidad de reinventarse sin perder la esencia los mantiene vigentes en los escenarios más grandes de Chile.",
            mensaje: "La cumbia porteña es nuestra identidad más profunda.", contacto: "Instagram: @losvikings5oficial", cita: "Sin los Vikings, Chile no tiene fiesta." 
        },
        { 
            id: "R-hC2QuUdE8", type: "MÚSICA", cat: "ROCK", title: "Grupo Colapso", 
            titular: "Colapso: El Grito Visceral del Rock en el Valle del Elqui", 
            bajada: "Una propuesta de rock alternativo que canaliza la aridez del paisaje y la crítica social en un sonido demoledor.", 
            body: "El Grupo Colapso irrumpe en la escena regional con una propuesta que se aleja del folclore tradicional para abrazar la distorsión. Su álbum debut es un manifiesto sónico sobre la vida en el semiárido, donde la belleza del valle contrasta con la dureza de la supervivencia.\n\nCapítulo 1: La Estética de la Sequía. Sus letras no hablan de valles verdes idealizados, sino de la tierra quebrada, la falta de agua y la expansión inmobiliaria que devora los cerros. Es rock con denominación de origen, pero sin postales turísticas.\n\nCapítulo 2: Autogestión como Trinchera. Grabado íntegramente en estudios locales, Colapso demuestra que se puede lograr un sonido de alta fidelidad sin salir de la región. Cada riff es un ladrillo en la construcción de una escena rockera elquina que pide a gritos ser escuchada.\n\nCapítulo 3: En Vivo. La banda se caracteriza por una puesta en escena energética, donde la conexión con el público se basa en la catarsis colectiva frente a las injusticias cotidianas.",
            mensaje: "El rock regional está vivo; apóyenlo.", contacto: "Spotify: Grupo Colapso", cita: "Nuestro rock nace de la grieta en la tierra seca." 
        },
        { 
            id: "wzNKbSUFHQk", type: "MÚSICA", cat: "TROVA", title: "Fernando Figueroa", 
            titular: "Fernando Figueroa: Crónicas Cantadas de Montegrande", 
            bajada: "Una sesión íntima donde la guitarra se convierte en pincel para retratar la memoria del agua y la poesía del valle.", 
            body: "Fernando Figueroa es un cronista con guitarra. En esta sesión de 'Influencias', nos invita a un viaje sensorial hacia el interior del Valle del Elqui, específicamente a la tierra de Gabriela Mistral. Su estilo fusiona la nueva trova con ritmos andinos sutiles, creando una atmósfera de contemplación.\n\nCapítulo 1: La Raíz Folclórica. Figueroa no canta por cantar; canta para recordar. Sus temas rescatan historias de abuelos, mitos locales y la vida sencilla de los pueblos que a menudo son olvidados por la modernidad.\n\nCapítulo 2: El Agua Sagrada. Un tema recurrente en su obra es el agua como elemento vital y espiritual, amenazado por la agroindustria y el cambio climático. Su voz se alza como defensa de los ríos libres.\n\nCapítulo 3: Identidad. Escuchar a Figueroa es oler la tierra mojada y sentir el sol de Paihuano. Es música que no solo se escucha, se habita.",
            mensaje: "Cuidemos nuestra memoria oral y nuestros ríos.", contacto: "@ferfigueroa_musica", cita: "Mi música brota del agua clara de la cordillera." 
        },
        { 
            id: "ZAJpC9o-Mok", type: "MÚSICA", cat: "FUSIÓN", title: "Jorge Campos", 
            titular: "Jorge Campos: La Arquitectura del Bajo Eléctrico", 
            bajada: "El virtuoso ex bajista de Congreso y Fulano ofrece una clase magistral sobre técnica, fusión y libertad creativa.", 
            body: "Jorge Campos no toca el bajo; lo esculpe. Reconocido mundialmente por su trabajo con Congreso y Fulano, Campos llega a VLS para deconstruir su instrumento. En esta sesión, el bajo deja de ser un acompañamiento para convertirse en una orquesta solista.\n\nCapítulo 1: El Bajo de 6 Cuerdas. Campos explora el rango extendido de su instrumento, ejecutando acordes, melodías y líneas de bajo simultáneas, desafiando la física de la ejecución tradicional.\n\nCapítulo 2: Tecnología y Loops. Utilizando pedales de loop en tiempo real, construye capas sonoras complejas que van desde el folklore imaginario hasta el jazz fusión más agresivo.\n\nCapítulo 3: La Filosofía del Sonido. Más allá de la técnica, Campos habla de la 'honestidad sonora': la necesidad de que el músico se vacíe en cada nota, buscando una voz propia lejos de las modas comerciales.",
            mensaje: "La música es libertad absoluta o no es nada.", contacto: "Web: jorgecampos.cl", cita: "El bajo es el corazón que conecta la tierra con el cielo." 
        },
        { 
            id: "EoIE7lVYWIw?start=1977", type: "ENTREVISTA", cat: "ADOBE", title: "Solange Miranda", 
            titular: "Adobe Vivo: El Renacimiento de la Arquitectura de Tierra", 
            bajada: "Solange Miranda, arquitecta experta en patrimonio, desmantela los prejuicios contra el adobe y revela su potencial bioclimático futuro.", 
            body: "En una región sísmica, el adobe ha sido injustamente demonizado. Solange Miranda ha dedicado su carrera a demostrar lo contrario. A través de su trabajo en la restauración de la Ruta Mistraliana, ha probado que la tierra es el material del futuro.\n\nHito 1: La Inercia Térmica. Miranda explica científicamente cómo los muros anchos de adobe regulan la temperatura: absorben el calor del día y lo liberan en la noche, manteniendo un interior fresco en verano y cálido en invierno sin gastar energía.\n\nHito 2: El Mito de la Fragilidad. Un adobe bien mantenido, con las proporciones correctas de arcilla y paja, posee una flexibilidad estructural que el cemento rígido no tiene. El problema no es el material, es el abandono.\n\nHito 3: Bioconstrucción Contemporánea. Solange no solo restaura; innova. Incorpora técnicas mixtas y terminaciones finas que demuestran que una casa de tierra puede ser moderna, estética y, sobre todo, sana para sus habitantes.",
            mensaje: "Volver a la tierra es un acto de inteligencia climática.", contacto: "@mastierra_arquitectura", cita: "El cemento nos aísla; el adobe nos permite respirar con el entorno." 
        },
        { 
            id: "EoIE7lVYWIw?start=1174", type: "ENTREVISTA", cat: "AMBIENTE", title: "Javiera Campos", 
            titular: "Alerta en la Desembocadura: La Misión de Javiera Campos", 
            bajada: "La protección del Pilpilén y el humedal del Río Elqui frente a la invasión de vehículos motorizados.", 
            body: "El humedal de la desembocadura del Río Elqui es el último refugio verde antes del mar en La Serena. Javiera Campos, educadora ambiental, lidera una cruzada contra la ignorancia y la negligencia que amenazan este ecosistema vital.\n\nHito 1: El Drama del Pilpilén. Esta ave emblemática anida directamente en la arena, lo que hace que sus huevos sean vulnerables y casi invisibles para el caminante desprevenido.\n\nHito 2: La Amenaza de los 4x4. Denuncia abierta contra el ingreso ilegal de vehículos motorizados que destruyen nidos y rompen la cadena trófica del humedal.\n\nHito 3: Barrera Natural. El humedal actúa como una esponja protectora ante marejadas y tsunamis, siendo la defensa primaria de la ciudad frente al avance del océano.",
            mensaje: "No entres con autos a la playa; estás matando vida que no ves.", contacto: "Depto. Medio Ambiente LS", cita: "Si el humedal muere, la ciudad queda desprotegida." 
        },
        { 
            id: "EoIE7lVYWIw?start=54", type: "ENTREVISTA", cat: "HISTORIA", title: "Margarita Ángel", 
            titular: "Las Ruinas de Lambert: El Grito de Auxilio del Patrimonio Industrial", 
            bajada: "Margarita Ángel encabeza la resistencia vecinal para salvar los hornos de 1840 en Las Compañías, hoy convertidos en basural.", 
            body: "Pocos saben que en Las Compañías se inició la revolución industrial de la minería chilena. Margarita Ángel, dirigenta patrimonial, nos lleva a las ruinas de la fundición de Charles Lambert, un sitio de importancia mundial que hoy agoniza.\n\nHito 1: La Revolución del Reverbero. En 1840, Lambert introdujo hornos que permitían fundir sulfuros de cobre antes descartados. Este avance técnico financió gran parte del desarrollo temprano de la república.\n\nHito 2: El Abandono Estatal. A pesar de su declaratoria como Monumento, el sitio está cercado por la basura y el olvido. Margarita denuncia la desidia de las autoridades que permiten que la historia se desmorone piedra a piedra.\n\nHito 3: El Sueño del Parque. La agrupación busca transformar este pasivo ambiental en un parque museo interactivo, utilizando tecnología BIM para reconstruir virtualmente lo que el tiempo se llevó, devolviendo el orgullo al sector norte de la ciudad.",
            mensaje: "Un pueblo que olvida su historia está condenado a la pobreza cultural.", contacto: "Agrupación Patrimonio Las Compañías", cita: "No son piedras viejas; son los cimientos de nuestra identidad minera." 
        }
    ],
    destinos: [
        {n:"Santiago", d:472}, {n:"Arica", d:1610}, {n:"Concepción", d:960}, {n:"Puerto Montt", d:1500}, 
        {n:"Mendoza", d:680}, {n:"Buenos Aires", d:1490}, {n:"Vicuña", d:62}, {n:"Ovalle", d:86}
    ]
};

export default function BroadcastMaster() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('news');
    const [selectedItem, setSelectedItem] = useState(VLS_DATA.items[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [weather, setWeather] = useState({ temp: '19°C', desc: 'Despejado', icon: '☀️' });
    const [pharma, setPharma] = useState('Farmacia Turno: Cruz Verde (Balmaceda 450)');
    const [clock, setClock] = useState(new Date().toLocaleTimeString('es-CL', { hour12: false }));
    const [landmarkIdx, setLandmarkIdx] = useState(0);
    const [tickerIdx, setTickerIdx] = useState(0);
    const audioRef = useRef(new Audio(VLS_DATA.radioStream));
    const ytRef = useRef(null);

    // Reloj y rotación
    useEffect(() => {
        const timer = setInterval(() => {
            setClock(new Date().toLocaleTimeString('es-CL', { hour12: false }));
        }, 1000);

        const satelliteTimer = setInterval(() => {
            if (activeTab === 'radio') {
                setLandmarkIdx(prev => (prev + 1) % VLS_DATA.landmarks.length);
            }
        }, 10000);

        return () => {
            clearInterval(timer);
            clearInterval(satelliteTimer);
        };
    }, [activeTab]);

    // Clima real
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2519&current_weather=true&timezone=auto');
                const data = await res.json();
                const w = data.current_weather;
                let icon = "☀️"; let desc = "Despejado";
                if(w.weathercode > 0 && w.weathercode <= 3) { icon = "☁️"; desc = "Nublado"; }
                else if(w.weathercode >= 45 && w.weathercode <= 48) { icon = "🌫️"; desc = "Niebla"; }
                else if(w.weathercode >= 51) { icon = "🌧️"; desc = "Lluvia"; }
                setWeather({ temp: `${Math.round(w.temperature)}°C`, desc, icon });
            } catch(e) {}
        };
        fetchWeather();
        const weatherInt = setInterval(fetchWeather, 300000);
        return () => clearInterval(weatherInt);
    }, []);

    const toggleRadio = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const playVideo = (item) => {
        setSelectedItem(item);
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
        setActiveTab('video');
    };

    const currentLandmark = VLS_DATA.landmarks[landmarkIdx];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '320px 1fr 370px',
            gridTemplateRows: window.innerWidth < 1024 ? 'auto auto 1fr auto' : '85px 1fr 95px',
            height: '100vh', width: '100vw', background: '#000', color: 'white', gap: '15px', padding: '15px', boxSizing: 'border-box', overflow: 'hidden'
        }}>
            {/* BACKGROUND LAYER */}
            <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at top right, #aa0000 0%, #220000 60%, #000 100%)', zIndex: -1 }}></div>

            {/* HEADER */}
            <header style={{
                gridColumn: '1 / -1', background: 'rgba(10, 10, 10, 0.98)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifySpaceBetween: 'space-between', padding: '0 30px', zIndex: 100, gap: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                        <Home size={30} />
                    </button>
                    <h1 style={{ color: '#ffcc00', margin: 0, fontWeight: 900, fontSize: '1.5rem', letterSpacing: '4px' }}>VECINOS VLS</h1>
                </div>
                
                <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ background: '#000', border: '2px solid #333', padding: '10px 30px', borderRadius: '4px', fontFamily: 'monospace', color: '#0f0', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>
                        BROADCAST V28.2: {weather.temp} {weather.icon} | RADIO VLS: PLATAFORMA VECINAL INDEPENDIENTE
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, lineHeight: 1 }}>{clock}</div>
                        <div style={{ color: '#ffcc00', fontSize: '0.7rem', fontWeight: 'bold' }}>LA SERENA SECTOR CENTRO</div>
                    </div>
                </div>
            </header>

            {/* SIDEBAR LEFT */}
            <aside style={{
                background: 'rgba(10, 10, 10, 0.98)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px',
                padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto'
            }}>
                <div style={{ color: '#ff0000', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '10px' }}>PANEL DE CONTROL</div>
                
                <button 
                    onClick={() => setActiveTab('news')}
                    style={{ 
                        padding: '16px', color: 'white', cursor: 'pointer', borderRadius: '12px', transition: '0.3s',
                        background: activeTab === 'news' ? '#ff0000' : 'linear-gradient(to bottom, #880000, #330000)',
                        border: '2.5px solid #ff4d4d', fontWeight: 900, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px'
                    }}>
                    <Newspaper size={20} /> CONTENIDOS 📰
                </button>

                <button 
                    onClick={() => setActiveTab('sessions')}
                    style={{ 
                        padding: '16px', color: 'white', cursor: 'pointer', borderRadius: '12px', transition: '0.3s',
                        background: activeTab === 'sessions' ? '#ff0000' : 'linear-gradient(to bottom, #880000, #330000)',
                        border: '2.5px solid #ff4d4d', fontWeight: 900, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px'
                    }}>
                    <Music size={20} /> SESIONES 🎵
                </button>
                {activeTab === 'sessions' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', paddingLeft: '15px', marginTop: '5px' }}>
                        {VLS_DATA.items.filter(i => i.type === 'MÚSICA').map(item => (
                            <div key={item.id} onClick={() => playVideo(item)} style={{ padding: '10px', color: '#ccc', cursor: 'pointer', fontSize: '0.8rem', borderLeft: '2px solid transparent', hover: { color: 'white' } }}>
                                {item.title.toUpperCase()}
                            </div>
                        ))}
                    </div>
                )}

                <button 
                    onClick={() => setActiveTab('interviews')}
                    style={{ 
                        padding: '16px', color: 'white', cursor: 'pointer', borderRadius: '12px', transition: '0.3s',
                        background: activeTab === 'interviews' ? '#ff0000' : 'linear-gradient(to bottom, #880000, #330000)',
                        border: '2.5px solid #ff4d4d', fontWeight: 900, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px'
                    }}>
                    <Users size={20} /> VECINAS 🏡
                </button>
                {activeTab === 'interviews' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', paddingLeft: '15px', marginTop: '5px' }}>
                        {VLS_DATA.items.filter(i => i.type === 'ENTREVISTA').map(item => (
                            <div key={item.id} onClick={() => playVideo(item)} style={{ padding: '10px', color: '#ccc', cursor: 'pointer', fontSize: '0.8rem', borderLeft: '2px solid transparent' }}>
                                {item.title.toUpperCase()}
                            </div>
                        ))}
                    </div>
                )}

                <button 
                    onClick={() => setActiveTab('radio')}
                    style={{ 
                        padding: '16px', color: 'white', cursor: 'pointer', borderRadius: '12px', transition: '0.3s',
                        background: activeTab === 'radio' ? '#ff0000' : 'linear-gradient(to bottom, #880000, #330000)',
                        border: '2.5px solid #ff4d4d', fontWeight: 900, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px'
                    }}>
                    <Radio size={20} /> RADIO VLS 📻
                </button>

                <button 
                    onClick={() => setActiveTab('maps')}
                    style={{ 
                        padding: '16px', color: 'white', cursor: 'pointer', borderRadius: '12px', transition: '0.3s',
                        background: activeTab === 'maps' ? '#ff0000' : 'linear-gradient(to bottom, #880000, #330000)',
                        border: '2.5px solid #ff4d4d', fontWeight: 900, textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px'
                    }}>
                    <Map size={20} /> RUTAS 🗺️
                </button>
            </aside>

            {/* MAIN STAGE */}
            <main style={{
                background: '#000', border: '3px solid rgba(255,255,255,0.25)', borderRadius: '20px',
                position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column'
            }}>
                {activeTab === 'video' ? (
                    <iframe 
                        src={`https://www.youtube.com/embed/${selectedItem.id.split('?')[0]}?autoplay=1&controls=1&modestbranding=1&rel=0&vq=hd1080${selectedItem.id.includes('start=') ? `&start=${selectedItem.id.split('start=')[1]}` : ''}`}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        allow="autoplay; encrypted-media"
                        title="VLS Video Player"
                    />
                ) : activeTab === 'radio' ? (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <iframe 
                            src={`https://maps.google.com/maps?saddr=La+Serena&daddr=${encodeURIComponent(currentLandmark.q)}&t=k&z=${currentLandmark.z}&output=embed`}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title="Sentinel Map"
                        />
                        <div style={{ position: 'absolute', bottom: '40px', left: '40px', background: 'rgba(0,0,0,0.85)', padding: '20px', borderLeft: '8px solid #ff0000', zIndex: 10 }}>
                            <div style={{ fontSize: '0.8rem', color: '#ffcc00', fontWeight: 'bold', textTransform: 'uppercase' }}>Vigilancia Sentinel</div>
                            <div style={{ fontSize: '2rem', fontWeight: 900 }}>{currentLandmark.n}</div>
                        </div>
                    </div>
                ) : activeTab === 'maps' ? (
                     <iframe 
                        src="https://maps.google.com/maps?q=La+Serena+destinos&t=k&z=10&output=embed"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="VLS Routes"
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', padding: '40px', overflowY: 'auto', background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                         <div style={{ textAlign: 'center' }}>
                            <img src="/logo-smartls-v3.png" alt="VLS" style={{ height: '120px', marginBottom: '30px' }} />
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>CENTRO DE BROADCAST VLS</h2>
                            <p style={{ fontSize: '1.2rem', color: '#ffcc00', maxWidth: '700px', margin: '0 auto 20px auto', fontWeight: 'bold' }}>
                                INICIATIVA CIUDADANA INDEPENDIENTE
                            </p>
                            <p style={{ fontSize: '1.1rem', color: '#ccc', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
                                Un puente directo para organizar a los vecinos, vincular sus requerimientos, denuncias y dudas con las autoridades, empresas e instituciones. Selecciona un contenido para comenzar.
                            </p>
                         </div>
                    </div>
                )}
            </main>

            {/* SIDEBAR RIGHT - FICHA TÉCNICA / NOTA DE PRENSA */}
            <aside style={{
                background: 'rgba(10, 10, 10, 0.98)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px',
                padding: '25px', display: 'flex', flexDirection: 'column', overflowY: 'auto'
            }}>
                {selectedItem ? (
                    <div style={{ animation: 'fadeIn 0.5s forwards' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <span style={{ fontSize: '0.7rem', color: '#ff0000', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid #ff0000', padding: '2px 8px' }}>
                                {selectedItem.type} | {selectedItem.cat}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: '#888' }}>CENTRO PRENSA VLS</span>
                        </div>
                        
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'serif', lineHeight: 1.1, marginBottom: '20px' }}>
                            {selectedItem.titular}
                        </h2>

                        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white', lineHeight: 1.4, marginBottom: '25px', borderLeft: '4px solid #ffcc00', paddingLeft: '15px' }}>
                            {selectedItem.bajada}
                        </p>

                        <div style={{ fontSize: '1.05rem', lineHeight: 1.7, fontFamily: 'serif', color: '#ccc', whiteSpace: 'pre-line', marginBottom: '30px' }}>
                            {selectedItem.body}
                        </div>

                        <div style={{ fontStyle: 'italic', color: '#ffcc00', borderLeft: '3px solid #ffcc00', paddingLeft: '20px', margin: '30px 0', fontSize: '1.2rem' }}>
                            "{selectedItem.cita}"
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ color: '#ff0000', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '1px', marginBottom: '5px' }}>INFO CLIENTE / CONTACTO</div>
                            <div style={{ fontSize: '0.9rem' }}>{selectedItem.contacto}</div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5 }}>
                        <Info size={40} />
                        <p style={{ marginTop: '15px', textAlign: 'center' }}>Selecciona un contenido para ver su ficha técnica</p>
                    </div>
                )}
            </aside>

            {/* FOOTER - TICKER & RADIO CONTROLS */}
            <footer style={{
                gridColumn: '1 / -1', background: '#000', borderTop: '4px solid #ff0000',
                display: 'flex', alignItems: 'center', padding: '0 30px', zIndex: 1000, overflow: 'hidden'
            }}>
                <button 
                    onClick={toggleRadio}
                    style={{
                        width: '65px', height: '65px', borderRadius: '50%', background: '#fff', color: '#ff0000',
                        border: '4px solid #ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(255,255,255,0.4)', transition: '0.3s', flexShrink: 0, marginRight: '20px'
                    }}>
                    {isPlaying ? <Pause fill="#ff0000" size={32} /> : <Play fill="#ff0000" size={32} />}
                </button>

                <div style={{ flexGrow: 1, whiteSpace: 'nowrap', position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', animation: 'marquee 40s linear infinite' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 900, marginRight: '50px' }}>
                           <span style={{ background: '#ff0000', padding: '2px 8px', borderRadius: '4px', marginRight: '10px' }}>RADIO VLS</span>
                           EN VIVO 320 KBPS /// EL TIEMPO EN LA SERENA: {weather.temp} {weather.desc} /// {pharma}
                        </span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 900, marginRight: '50px' }}>
                           <span style={{ background: '#ff0000', padding: '2px 8px', borderRadius: '4px', marginRight: '10px' }}>COMUNA SMART</span>
                           SESIÓN MUSICAL: {VLS_DATA.items[0].title} /// ENTREVISTA: {VLS_DATA.items[4].title} /// CONÉCTATE CON TU CIUDAD
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginLeft: '20px' }}>
                     <button className="btn-glass" style={{ padding: '10px 20px', borderRadius: '20px', background: 'rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                         <Share2 size={16} /> COMPARTIR
                     </button>
                </div>
            </footer>

            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .btn-glass:hover {
                    background: rgba(255,255,255,0.2) !important;
                }
            `}</style>
        </div>
    );
}
