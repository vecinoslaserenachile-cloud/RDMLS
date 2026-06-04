import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, MapPin, Users, Briefcase } from 'lucide-react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const REGIONS = [
  {
    name: "Lombardia", capital: "Milano", pop: "10M",
    desc_it: "Il cuore economico e della moda d'Italia.",
    desc_cl: "Acá se mueve toda la plata y la moda, es el motor económico de Italia.",
    prod: "Finanzas, Moda, Industria"
  },
  {
    name: "Lazio", capital: "Roma", pop: "5.7M",
    desc_it: "La culla dell'Impero Romano e capitale politica.",
    desc_cl: "La capital política, pura historia antigua. Aquí está el Coliseo y el Vaticano, un clásico.",
    prod: "Turismo, Servicios, Cine"
  },
  {
    name: "Campania", capital: "Napoli", pop: "5.6M",
    desc_it: "Patria della pizza, del Vesuvio e di paesaggi mozzafiato.",
    desc_cl: "Donde inventaron la pizza, compadre. Gente muy cálida y paisajes de película.",
    prod: "Agricultura, Turismo, Alimentaria"
  },
  {
    name: "Sicilia", capital: "Palermo", pop: "4.8M",
    desc_it: "L'isola più grande del Mediterraneo, ricca di storia e cultura.",
    desc_cl: "La tremenda isla del sur, harta playa, harta historia y comida para chuparse los dedos.",
    prod: "Agricultura, Pesca, Turismo"
  },
  {
    name: "Veneto", capital: "Venezia", pop: "4.8M",
    desc_it: "Regione di Venezia, del Prosecco e forte polo industriale.",
    desc_cl: "La zona de Venecia y del Prosecco. Secos para la industria y el turismo romántico.",
    prod: "Vino, Turismo, Manufactura"
  },
  {
    name: "Emilia-Romagna", capital: "Bologna", pop: "4.4M",
    desc_it: "La Food Valley e la Motor Valley d'Italia (Ferrari, Ducati).",
    desc_cl: "Acá hacen los medios autos como Ferrari y Ducati, además de la mejor comida italiana.",
    prod: "Automotriz, Agroalimentaria"
  },
  {
    name: "Piemonte", capital: "Torino", pop: "4.2M",
    desc_it: "Sede storica della Fiat e famosa per i tartufi e il vino Barolo.",
    desc_cl: "La casa de la marca Fiat y de la Juventus. Famosos por el vino y las trufas.",
    prod: "Automotriz, Vinos, Tecnología"
  },
  {
    name: "Puglia", capital: "Bari", pop: "3.9M",
    desc_it: "Il tacco d'Italia, celebre per gli ulivi e le spiagge stupende.",
    desc_cl: "El taco de la bota de Italia. Playas filetes y el mejor aceite de oliva del mundo.",
    prod: "Aceite de Oliva, Turismo, Agricultura"
  },
  {
    name: "Toscana", capital: "Firenze", pop: "3.6M",
    desc_it: "Il luogo di nascita del Rinascimento e della lingua italiana.",
    desc_cl: "Puro arte y cultura, aquí nació el Renacimiento. Cuna del idioma italiano.",
    prod: "Vino (Chianti), Moda, Turismo"
  },
  {
    name: "Calabria", capital: "Catanzaro", pop: "1.8M",
    desc_it: "La punta dello stivale, terra di mare e cibi piccanti.",
    desc_cl: "La punta de la bota. Hace caleta de calor, tienen playas hermosas y comida bien picante.",
    prod: "Agricultura, Turismo Balneario"
  },
  {
    name: "Sardegna", capital: "Cagliari", pop: "1.6M",
    desc_it: "Isola con un mare cristallino e tradizioni antichissime.",
    desc_cl: "Otra isla gigante pero más exclusiva. Playas caribeñas en pleno Mediterráneo.",
    prod: "Turismo de lujo, Pastoreo"
  },
  {
    name: "Liguria", capital: "Genova", pop: "1.5M",
    desc_it: "Regione costiera famosa per le Cinque Terre e il pesto.",
    desc_cl: "Pura costa y cerros. De aquí salieron muchos inmigrantes y también inventaron el pesto.",
    prod: "Puertos, Turismo, Pesto"
  },
  {
    name: "Marche", capital: "Ancona", pop: "1.5M",
    desc_it: "Colline e mare, famosa per la produzione di calzature.",
    desc_cl: "Una zona súper piola con cerros y mar. Son los capos haciendo zapatos finos.",
    prod: "Calzado, Agricultura, Pesca"
  },
  {
    name: "Abruzzo", capital: "L'Aquila", pop: "1.3M",
    desc_it: "Il polmone verde d'Italia, con parchi nazionali e montagne.",
    desc_cl: "El pulmón verde de Italia. Lleno de parques nacionales, osos y montañas bacanes.",
    prod: "Agricultura, Industria Ligera"
  },
  {
    name: "Friuli-Venezia Giulia", capital: "Trieste", pop: "1.2M",
    desc_it: "Terra di confine multiculturale e grandi vini bianchi.",
    desc_cl: "Están al límite con otros países, así que tienen mezcla de culturas. Muy buenos vinos blancos.",
    prod: "Vino, Puertos, Tecnología"
  },
  {
    name: "Trentino-Alto Adige", capital: "Trento", pop: "1.1M",
    desc_it: "Regione alpina autonoma, paradiso per gli sport invernali.",
    desc_cl: "Pura montaña y nieve. Hablan italiano y alemán. El paraíso para esquiar.",
    prod: "Turismo invernal, Manzanas"
  },
  {
    name: "Umbria", capital: "Perugia", pop: "0.8M",
    desc_it: "L'unica regione centrale senza sbocco sul mare, mistica e verde.",
    desc_cl: "La única zona del centro que no tiene mar. Súper verde, mística y tranquila.",
    prod: "Turismo religioso, Agricultura"
  },
  {
    name: "Basilicata", capital: "Potenza", pop: "0.5M",
    desc_it: "Famosa per i Sassi di Matera e una natura selvaggia.",
    desc_cl: "Una región más salvaje y menos poblada. Famosa por las cuevas de Matera, una joya.",
    prod: "Energía, Agricultura"
  },
  {
    name: "Molise", capital: "Campobasso", pop: "0.3M",
    desc_it: "Piccola e autentica, fuori dai grandi flussi turistici.",
    desc_cl: "Es tan chica que los mismos italianos bromean con que no existe. Muy tranquila.",
    prod: "Agricultura, Artesanía"
  },
  {
    name: "Valle d'Aosta", capital: "Aosta", pop: "0.1M",
    desc_it: "La regione più piccola, incastonata tra le vette più alte d'Europa.",
    desc_cl: "La región más enana de todas, escondida entre las montañas más altas de Europa.",
    prod: "Turismo alpino, Quesos"
  }
];

export const ItalyRegionsMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [speaking, setSpeaking] = useState(null);

  const speak = (text, lang) => {
    setSpeaking(lang);
    const tl = lang === 'es-CL' ? 'es-CL' : 'it'; 
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(text)}&tl=${tl}`;
    
    const audio = new Audio(url);
    audio.onended = () => setSpeaking(null);
    audio.onerror = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.onend = () => setSpeaking(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setSpeaking(null);
      }
    };
    audio.play().catch(e => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.onend = () => setSpeaking(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setSpeaking(null);
      }
    });
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #022c22, #0f172a)', borderRadius: '24px', padding: '2rem', color: 'white', overflowY: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 900, background: 'linear-gradient(to right, #10b981, #ffffff, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mappa d'Italia 2026</h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.5rem' }}>Explora las 20 regiones de Italia, su administración y cultura.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', flex: 1 }}>
        {/* Selector de Regiones */}
        <div style={{ flex: '1 1 300px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '500px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#10b981', padding: '0 0.5rem' }}>Seleziona una Regione</h3>
          {REGIONS.sort((a,b) => a.name.localeCompare(b.name)).map((region, idx) => (
            <button 
              key={idx}
              onClick={() => { setSelectedRegion(region); window.speechSynthesis.cancel(); setSpeaking(null); }}
              style={{
                background: selectedRegion.name === region.name ? 'rgba(16,185,129,0.2)' : 'transparent',
                border: selectedRegion.name === region.name ? '1px solid #10b981' : '1px solid transparent',
                color: 'white', padding: '0.8rem 1rem', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}
            >
              <span style={{ fontWeight: selectedRegion.name === region.name ? 'bold' : 'normal' }}>{region.name}</span>
              {selectedRegion.name === region.name && <MapPin size={16} color="#10b981" />}
            </button>
          ))}
        </div>

        {/* Mapa Visual */}
        <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
          <ComposableMap 
            projection="geoMercator" 
            projectionConfig={{ scale: 2000, center: [12.5, 42.5] }}
            style={{ width: '100%', height: '100%', maxHeight: '500px' }}
          >
            <Geographies geography="/media/tano/italy_regions.json">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoName = geo.properties.reg_name || geo.properties.NAME_1 || geo.properties.name || "";
                  const isSelected = selectedRegion && geoName.toLowerCase().includes(selectedRegion.name.toLowerCase().split('-')[0]);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isSelected ? "#10b981" : "rgba(255,255,255,0.1)"}
                      stroke="#ffffff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none", transition: "all 0.3s" },
                        hover: { fill: "#34d399", outline: "none", cursor: 'pointer' },
                        pressed: { fill: "#059669", outline: "none" }
                      }}
                      onClick={() => {
                        const matchedRegion = REGIONS.find(r => geoName.toLowerCase().includes(r.name.toLowerCase().split('-')[0]));
                        if (matchedRegion) {
                          setSelectedRegion(matchedRegion);
                          window.speechSynthesis.cancel(); 
                          setSpeaking(null);
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Panel de Detalles */}
        <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div 
            key={selectedRegion.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', flex: 1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: 900, color: 'white' }}>{selectedRegion.name}</h2>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fcd34d' }}>
                    <MapPin size={20} /> <span style={{ fontWeight: 'bold' }}>{selectedRegion.capital}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6ee7b7' }}>
                    <Users size={20} /> <span>{selectedRegion.pop} Hab.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                <Briefcase size={18} /> <span>Motores Productivos:</span>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#e2e8f0' }}>{selectedRegion.prod}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(16,185,129,0.1)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #10b981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#10b981', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>🇮🇹 Narración en Italiano</h4>
                    <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.5 }}>"{selectedRegion.desc_it}"</p>
                  </div>
                  <button onClick={() => speak(selectedRegion.desc_it, 'it-IT')} style={{ background: speaking === 'it-IT' ? '#10b981' : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all 0.3s' }}>
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>

              <div style={{ background: 'rgba(239,68,68,0.1)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #ef4444' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#ef4444', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>🇨🇱 Narración en Chileno</h4>
                    <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.5 }}>"{selectedRegion.desc_cl}"</p>
                  </div>
                  <button onClick={() => speak(selectedRegion.desc_cl, 'es-CL')} style={{ background: speaking === 'es-CL' ? '#ef4444' : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all 0.3s' }}>
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};
