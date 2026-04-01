import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Clock, Share2, ArrowDown, Globe, BookOpen, Quote,
  ChevronDown, ChevronRight, MapPin, Music, Heart, Church,
  Twitter, Facebook, Linkedin, Layers, Star, Brain, Flame, Fish, Coffee, Map
} from 'lucide-react';
import CommentSection from './CommentSection';

/* ─── DATA COMPLETA EXTENDIDA ─────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'origen', emoji: '✡️', color: '#6366f1',
    title: 'El Origen: Un evento que partió la historia en dos',
    content: `Históricamente, la Semana Santa conmemora la Pasión, Muerte y Resurrección de Jesús de Nazaret. Sus raíces se hunden en la festividad judía de la Pascua (Pésaj), que celebra la liberación del pueblo hebreo de la esclavitud en Egipto.\n\nFue en el Concilio de Nicea (año 325 d.C.) donde la Iglesia, ya consolidada en el Imperio Romano, estableció la fecha de esta conmemoración: el primer domingo después de la primera luna llena de la primavera en el hemisferio norte. Por esto, la Semana Santa cambia de fecha cada año.\n\nLa estructura de los días tiene un significado preciso: el Domingo de Ramos recuerda la entrada triunfal de Jesús a Jerusalén; el Jueves Santo la Última Cena y la institución de la Eucaristía; el Viernes Santo la crucifixión y muerte en el Gólgota; el Sábado Santo la espera en el sepulcro; y el Domingo de Resurrección —la Pascua cristiana— el acontecimiento central de la fe.`,
    dato: 'La palabra "Pascua" viene del hebreo Pésaj, que significa "paso" o "salto", aludiendo al paso del ángel exterminador sobre los hogares hebreos marcados con sangre de cordero.'
  },
  {
    id: 'mundo', emoji: '🌍', color: '#10b981',
    title: 'Una conmemoración a escala global',
    content: `Con la expansión del cristianismo, la forma de recordar estos días adquirió matices únicos en cada continente. En España, especialmente en Andalucía, las procesiones con cofradías, capirotes y pasos monumentales son un espectáculo de devoción y arte barroco. En Roma, el epicentro católico, el Vía Crucis en el Coliseo liderado por el Papa es el evento central.\n\nEn Filipinas, el país con más católicos de Asia, la devoción llega a extremos físicos, con representaciones hiperrealistas que incluyen crucifixiones y flagelaciones voluntarias. En África, comunidades coptas en Egipto y ortodoxos viven la celebración con liturgias antiquísimas cantadas en arameo o copto, centradas profundamente en el ayuno estricto y la vigilia.\n\nEn los países nórdicos, la Semana Santa es asociada al inicio de la primavera y tradiciones paganas pre-cristianas conviven con el rito litúrgico. En Etiopía, la Iglesia Ortodoxa Tewahedo celebra Fasika (Pascua) con un calendario copto propio, siempre con gran ayuno previo.\n\nEn Rusia y Grecia, las iglesias ortodoxas celebran la Pascua con la procesión del fuego sagrado, traído según la tradición directamente desde Jerusalén, encendiendo velas en cadena en medio de la oscuridad.`,
    dato: 'Más de 2.000 millones de personas celebran la Semana Santa en el mundo, convirtiéndola en una de las festividades religiosas más masivas de la humanidad.'
  },
  {
    id: 'latam', emoji: '🌎', color: '#f59e0b',
    title: 'Sincretismo en Latinoamérica: Color, Sangre y Tierra',
    content: `Cuando los españoles llegaron a América, trajeron consigo la cruz y la espada. La catequización de los pueblos originarios utilizó la teatralidad de la Semana Santa europea para enseñar la historia de Jesús. Sin embargo, América Latina no fue un receptor pasivo.\n\nSe produjo un fascinante sincretismo religioso. Las deidades indígenas, los ciclos agrícolas y las tradiciones africanas traídas por los esclavos se fundieron con la liturgia católica. En México, la representación de Iztapalapa congrega a millones. En Perú y Bolivia, las procesiones andinas visten a Cristo y la Virgen con mantos de telares locales, mientras bandas de bronces mezclan el luto católico con la melancolía del altiplano.\n\nEn Guatemala, la Semana Santa de Antigua es declarada Patrimonio Cultural Inmaterial. Las "alfombras" de aserrín teñido, flores y frutas que se trazan en las calles para ser pisadas por las procesiones son una de las expresiones artísticas más impresionantes del continente.\n\nEn Brasil, el sincretismo afrobrasileño convive profundamente con las celebraciones en ciudades como São Paulo y Salvador de Bahía, donde los cabildos y las ceremonias umbanda tienen su propio calendario sagrado que coincide con la Pascua cristiana.`,
    dato: 'La procesión de Iztapalapa en Ciudad de México congrega más de 2 millones de personas cada año, siendo considerada la representación de la Pasión más grande del mundo.'
  },
  {
    id: 'chile', emoji: '🇨🇱', color: '#ef4444',
    title: 'La Semana Santa en Chile: De la Colonia a nuestra mesa',
    content: `En nuestro país, la Semana Santa tiene un carácter que oscila entre el recogimiento heredado de la austeridad colonial y tradiciones muy propias de nuestra geografía y folclore.\n\nLa prohibición católica de comer carnes rojas se transformó en un festín de los productos de nuestra costa. La empanada de mariscos, el pescado frito, el caldillo de congrio o las machas a la parmesana pasaron de ser un "sacrificio" a una de las tradiciones culinarias familiares más esperadas del año.\n\nDurante la Colonia, el país vivía la Semana Santa con total paralización: los reos eran liberados temporalmente, los teatros cerraban, el comercio se suspendía. Hoy, los supermercados abren pero conservamos el espíritu de celebración comunitaria y familiar.\n\nEl papel de la Iglesia en la historia social chilena es inseparable de la Semana Santa. Desde las misiones jesuitas del siglo XVII hasta las comunidades carismáticas del siglo XXI, la piedad popular chilena mantiene expresiones únicas como la procesión del Silencio, el Vía Crucis comunitario en las poblaciones, y los retiros espirituales.`,
    dato: 'El caldillo de congrio fue inmortalizado por Pablo Neruda en su "Oda al Caldillo de Congrio", convirtiéndose en uno de los platos más emblemáticos de la cultura chilena.'
  },
  {
    id: 'coquimbo', emoji: '✝️', color: '#FFD700',
    title: 'La Cruz del Tercer Milenio: Coquimbo ante el mundo',
    content: `En el corazón de la Región de Coquimbo, en el cerro El Vigía que domina la bahía de Coquimbo, se alza la Cruz del Tercer Milenio: la cruz religiosa más alta del mundo, con 93 metros de altura y una envergadura de 40 metros en sus brazos. Fue construida para conmemorar el Jubileo del año 2000, coronando el encuentro del Papa Juan Pablo II con América Latina.\n\nSu arquitectura es resultado de la visión del ingeniero Ramón Andrade y el arquitecto Gastón Ewert. No es solo una estructura religiosa, es un símbolo de la identidad regional que trasciende las fronteras de la fe. En su interior alberga un museo y en su base, el Cerro del Vigía ofrece una de las vistas panorámicas más impresionantes del Pacífico chileno.\n\nDurante Semana Santa, la Cruz del Tercer Milenio se convierte en el punto de peregrinación más importante de la región. Miles de fieles suben el cerro en procesión nocturna, especialmente el Viernes Santo, transformando las laderas en un manto de luces y oraciones. La imagen iluminada en dorado sobre el cielo nocturno coquimbano es uno de los espectáculos más poderosos del norte chico.\n\nLa cruz representa además el puente cultural entre el pasado colonial minero de la región y su vocación moderna: tecnológica, astronómica y turística. Es el símbolo más fotografiado de la bahía de Coquimbo-La Serena desde el mar.`,
    dato: 'La Cruz del Tercer Milenio de Coquimbo tiene 93 metros de altura, siendo la cruz religiosa más alta del mundo. Fue inaugurada en la visita papal de Juan Pablo II al norte de Chile en el año 2000.'
  },
  {
    id: 'mapuche', emoji: '🌿', color: '#059669',
    title: 'La Semana Santa mapuche: Fe, tierra y We Tripantu',
    content: `Para el pueblo mapuche, la convivencia con el catolicismo fue compleja. La evangelización colonial impuso el calendario litúrgico sobre los ciclos ceremoniales propios del pueblo, especialmente el We Tripantu (Año Nuevo mapuche, en junio) y los grandes nguillatun (rogativas a la tierra y ancestros).\n\nSin embargo, con el tiempo se produjo un sincretismo profundo: el Cristo mapuche adopta rasgos del héroe cultural Ngünechen; la Virgen se asimila a figuras femeninas protectoras como la Nuke Mapu (Madre Tierra). Las comunidades mapuche del sur de Chile realizan durante Semana Santa ceremonias que mezclan el rito católico con la espiritualidad de la machi.\n\nEn la provincia de Arauco y en la Araucanía, es común ver procesiones donde las mujeres llevan kultrún (el tambor sagrado mapuche) y se entonan canciones en mapudüngun dedicadas a Cristo y la Virgen. Esta fusión es considerada por algunos teólogos como una de las expresiones más ricas del catolicismo latinoamericano.\n\nHoy, el debate sobre la identidad mapuche y la fe cristiana es también político: las comunidades más ligadas a su tradición ancestral rechazan la Semana Santa como una imposición; otras la viven profundamente integrada a su espiritualidad. Ambas posturas son parte legítima de la diversidad del pueblo mapuche.`,
    dato: 'La coexistencia del We Tripantu (año nuevo mapuche en junio) y la Semana Santa representa uno de los sincretismos religiosos más complejos y ricos de Chile. En algunos ritos mapuche, el Cristo es identificado con el dios solar Ngünechen.'
  },
  {
    id: 'musica', emoji: '🎶', color: '#8b5cf6',
    title: 'Música Sacra: El sonido del silencio y la fe',
    content: `La música sacra de Semana Santa es uno de los patrimonios culturales más ricos de Occidente. El Stabat Mater, himno del siglo XIII que narra el dolor de la Virgen al pie de la cruz, fue puesto en música por Pergolesi (1736), Vivaldi, Haydn, Schubert, Rossini y Verdi entre otros. Cada versión es un universo emocional diferente.\n\nEl Réquiem de Mozart, compuesto en su lecho de muerte en 1791, es otra de las piezas más interpretadas durante estos días. La Pasión según San Mateo de Bach (BWV 244, 1727) es considerada por muchos musicólogos como la obra religiosa más monumental jamás compuesta. Su estreno moderno por Mendelssohn en 1829 fue uno de los eventos musicales más importantes del siglo XIX.\n\nEn Chile, la tradición de música sacra colonial se conserva en archivos históricos. Las Misiones Jesuitas del siglo XVII dejaron partituras únicas de música litúrgica interpretada por comunidades indígenas convertidas. El Archivo Musical de la Catedral de Santiago guarda piezas inéditas de compositores chilenos de los siglos XVIII y XIX.\n\nEn Semana Santa, la vida nocturna y la música profana se suspenden culturalmente —o se reducen—. La radio y la televisión transmiten conciertos, misas y documentales. En las calles, las marchas fúnebres de las bandas de pueblo en las procesiones son el sonido característico de estos días en los barrios históricos de todo Chile.`,
    dato: 'La Pasión según San Mateo de Johann Sebastian Bach dura aproximadamente 3 horas y tiene más de 78 movimientos musicales. Es considerada la mayor obra de música sacra de la historia de Occidente.'
  },
  {
    id: 'gastronomia', emoji: '🐟', color: '#0ea5e9',
    title: 'Gastronomía de Cuaresma: El festín del mar',
    content: `La prohibición eclesiástica de consumir carne rojiza durante la Cuaresma y la Semana Santa transformó la gastronomía costera de Chile en una expresión cultural única. Lo que debía ser abstinencia se convirtió en celebración culinaria.\n\nEl caldillo de congrio es el rey absoluto de la mesa. El congrio colorado o negro, cocinado con papas, zanahoria, cilantro, crema y un toque de limón, es el plato que define la Semana Santa en los hogares chilenos. Neruda lo inmortalizó: "Lleva a la cocina el congrio... En el caldillo de congrio, que llegue a tu mesa, glorificado el sabor del mar encontrado a fuego lento de olivo".\n\nLas empanadas de mariscos son la segunda tradición indiscutida: rellenas con jaiba, camarón, ostiones o un mix de frutos del mar, horneadas en las panaderías y en los hogares desde el Jueves Santo.\n\nEn el norte chico —La Serena, Coquimbo, Ovalle— la tradición incluye el charquicán de mariscos, la corvina a la plancha con ensalada de porotos o el guiso de machas. Los picoteos de piures, erizos y ostras en las caletas de Tongoy y Punta de Choros son la versión más auténtica del festín costero de Semana Santa.\n\nEl chupe de mariscos, el arroz con leche y el mote con huesillo son los acompañantes obligatorios. En zonas del interior, como el Valle de Elqui, el mote de maíz con especias es la variante local.`,
    dato: 'Durante Semana Santa, los supermercados chilenos reportan un aumento de entre 300% y 400% en la venta de pescado y mariscos frescos respecto a cualquier otra semana del año.'
  },
  {
    id: 'economía', emoji: '📊', color: '#f97316',
    title: 'Impacto económico: La Semana Santa vale millones',
    content: `Más allá de su dimensión espiritual y cultural, la Semana Santa tiene un peso económico enorme. En Chile, el turismo interno en estos días genera una movilización de más de 3 millones de personas. Las ciudades costeras como La Serena, Coquimbo, Viña del Mar y Puerto Montt se convierten en focos del turismo familiar.\n\nEn La Serena, la ocupación hotelera durante Semana Santa supera el 90% históricamente. Los restaurantes del borde costero y del casco histórico reportan jornadas récord. El comercio de artesanía, gastronomía callejera y servicios turísticos explota durante estos cuatro días festivos.\n\nA nivel regional, la Semana Santa activa circuitos turísticos clave: el Valle del Elqui (ecoturismo y astroturismo), Punta de Choros (avistamiento de pingüinos y delfines), el Parque Nacional Fray Jorge y las playas de Tongoy y Guanaqueros. El turismo en La Región de Coquimbo en estos días genera ingresos estimados en decenas de millones de pesos.\n\nA nivel global, la Semana Santa es el período turístico más importante de muchos países europeos. Sevilla recibe más de 1 millón de visitantes; Roma llega al colapso logístico con peregrinos de todo el mundo. Jerusalem, donde ocurrieron los hechos históricos, recibe a más de 200.000 peregrinos solo en estos días.`,
    dato: 'La Semana Santa es considerada el segundo período de mayor movilidad turística en Chile después del Año Nuevo. El turismo interno genera más de 500.000 millones de pesos en la economía nacional durante estos días.'
  },
  {
    id: 'ciencia', emoji: '🔬', color: '#06b6d4',
    title: 'Ciencia y Fe: El debate eterno de la Sábana Santa',
    content: `Pocos objetos religiosos han generado más controversia científica que la Sábana Santa de Turín: un lienzo de lino de 4,4 metros que muestra la imagen de un hombre crucificado con heridas coincidentes con la descripción de la Pasión de Jesús.\n\nEn 1988, tres laboratorios independientes (Oxford, Zurich y Tucson) realizaron pruebas de carbono 14 y dataron la tela entre los años 1260 y 1390 d.C., sugiriendo una falsificación medieval. Sin embargo, estudios posteriores cuestionaron estos resultados argumentando contaminación de las muestras durante el incendio de 1532.\n\nEn 2013, el equipo del Dr. Giulio Fanti de la Universidad de Padua publicó tres nuevas pruebas —espectrometría infrarroja, espectrometría Raman y pruebas mecánicas— que dataron el lino entre el 300 a.C. y el 400 d.C., un rango que incluiría el período de Jesús. La controversia científica continúa abierta.\n\nLo que sí ha confirmado la ciencia moderna es que la imagen de la Sábana NO fue producida por pintura ni por ninguna técnica conocida de la época medieval. La tridimensionalidad de la imagen y la presencia de manchas de sangre con plasma separado del glóbulo rojo (solo visible en sangre real, no artificial) son datos objetivos que desafían explicaciones simples.\n\nPara la fe cristiana, el debate científico es secundario. Para la ciencia, la Sábana Santa sigue siendo uno de los enigmas más fascinantes de la historia.`,
    dato: 'La imagen de la Sábana Santa de Turín contiene información tridimensional que no puede generarse con técnicas pictóricas convencionales. La NASA la analizó con tecnología de imagen VP-8 usada para cartografía lunar y encontró que tiene propiedades únicas nunca vistas en ninguna obra de arte.'
  }
];

const TRADITIONS_CHILE = [
  {
    icon: '🔥', title: 'Quema de Judas',
    desc: 'Tradición colonial, hoy menos común pero aún viva en ciertos cerros de Valparaíso y barrios antiguos. Se confecciona un muñeco que se quema el Domingo de Resurrección, simbolizando la purificación y el castigo a la traición.',
    color: '#ef4444'
  },
  {
    icon: '🐟', title: 'Menú de Resguardo',
    desc: 'Chile abrazado por el mar convirtió la abstinencia de carnes rojas en un festín costero. Empanadas de mariscos, pescado frito, caldillo de congrio y machas a la parmesana son las estrellas inevitables de las mesas familiares.',
    color: '#3b82f6'
  },
  {
    icon: '🐴', title: 'Cuasimodo',
    desc: 'Quizás la tradición más exclusivamente chilena. Nace en la Colonia cuando los sacerdotes llevaban la comunión a enfermos. Como los caminos eran peligrosos, los huasos escoltaban al cura a caballo. Hoy, miles de cuasimodistas cabalgan escoltando la eucaristía por los campos y poblaciones rurales.',
    color: '#10b981'
  },
  {
    icon: '🕯️', title: 'Procesión del Silencio',
    desc: 'En muchas ciudades chilenas, el Viernes Santo se realiza la Procesión del Silencio donde miles marchan con velas en completo mutismo. En La Serena, esta procesión recorre el centro histórico desde la Catedral hasta la Recova.',
    color: '#7c3aed'
  },
  {
    icon: '✝️', title: 'Vía Crucis Popular',
    desc: 'En las poblaciones y barrios periféricos de las ciudades chilenas, el Vía Crucis es representado con actores locales que encarnan a Cristo, la Virgen, los apóstoles y los soldados. Es teatro comunitario y rito sagrado al mismo tiempo.',
    color: '#f59e0b'
  },
  {
    icon: '🌊', title: 'Bendición de las Aguas',
    desc: 'En las caletas de pescadores del norte chico —Punta de Choros, Caleta San Pedro, Tongoy, Guanaqueros— la Semana Santa incluye bendición de embarcaciones y redes. Los pescadores piden protección para la temporada de mar.',
    color: '#0ea5e9'
  },
];

const WORLD_MAP = [
  { region: 'España (Sevilla)', icon: '🕯️', custom: 'Procesiones con cofradías, capirotes y pasos monumentales barrocos', bg: '#7f1d1d' },
  { region: 'Filipinas', icon: '✝️', custom: 'Representaciones con crucifixiones voluntarias reales en Pampanga', bg: '#1e3a5f' },
  { region: 'México (Iztapalapa)', icon: '🎭', custom: '2 millones de espectadores en el drama comunitario más grande del mundo', bg: '#14532d' },
  { region: 'Egipto (Coptos)', icon: '📜', custom: 'Liturgias en copto y arameo con ayuno de 55 días previo a la Pascua', bg: '#92400e' },
  { region: 'Guatemala (Antigua)', icon: '🌸', custom: 'Alfombras de aserrín teñido y flores Patrimonio Cultural Inmaterial', bg: '#4a1d96' },
  { region: 'Bolivia / Perú', icon: '🎺', custom: 'Bandas de bronce fusionando luto católico y melancolía andina del Tawantinsuyu', bg: '#312e81' },
  { region: 'Etiopía (Fasika)', icon: '⭐', custom: 'Celebración ortodoxa tewahedo con calendario copto y ayuno de 55 días', bg: '#064e3b' },
  { region: 'Chile (Norte Chico)', icon: '🐎', custom: 'Cuasimodo: caballería escoltando la eucaristía en procesión a caballo', bg: '#7f1d1d' },
  { region: 'Rusia / Grecia', icon: '🔥', custom: 'Procesión del Fuego Sagrado traído desde Jerusalén para encender velas', bg: '#1e3a8a' },
];

const QUIZ = [
  { q: '¿En qué año el Concilio de Nicea estableció la fecha de la Semana Santa?', opts: ['325 d.C.', '451 d.C.', '787 d.C.', '100 d.C.'], ans: 0 },
  { q: '¿Qué conmemora la festividad judía Pésaj que inspiró la Semana Santa?', opts: ['La creación del mundo', 'La liberación del pueblo hebreo de Egipto', 'El diluvio universal', 'La llegada a la Tierra Prometida'], ans: 1 },
  { q: '¿Cuál es la tradición más exclusivamente chilena de Semana Santa?', opts: ['La Quema de Judas', 'La empanada de mariscos', 'El Cuasimodo', 'El Vía Crucis'], ans: 2 },
  { q: '¿En qué país asiático se realizan crucifixiones reales durante Semana Santa?', opts: ['India', 'Japón', 'Tailandia', 'Filipinas'], ans: 3 },
  { q: '¿Cuántos metros de alto tiene la Cruz del Tercer Milenio de Coquimbo?', opts: ['45 metros', '67 metros', '93 metros', '120 metros'], ans: 2 },
  { q: '¿Qué composición de Bach es considerada la mayor obra de música sacra occidental?', opts: ['El Mesías', 'La Pasión según San Mateo', 'Stabat Mater', 'Réquiem'], ans: 1 },
  { q: '¿Qué ciudad chilena tiene la mayor afluencia turística en Semana Santa?', opts: ['Santiago', 'Valparaíso', 'La Serena', 'Puerto Montt'], ans: 2 },
];

/* ─── COMPONENTE ANIMACIÓN CRUZ ─────────────────────────────────────────── */
function CruzTercerMilenio({ width = 320, height = 500, opacity = 0.65 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity }}>
      <svg viewBox="0 0 200 340" width={width} height={height}
        style={{ filter: 'drop-shadow(0 0 28px rgba(255,190,0,0.65)) drop-shadow(0 0 70px rgba(255,130,0,0.3))' }}>
        <defs>
          <linearGradient id="hcg1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff7c0"/>
            <stop offset="30%" stopColor="#FFD700"/>
            <stop offset="70%" stopColor="#FFA500"/>
            <stop offset="100%" stopColor="#cc6600"/>
          </linearGradient>
          <linearGradient id="hcg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cc6600"/>
            <stop offset="40%" stopColor="#FFA500"/>
            <stop offset="60%" stopColor="#FFD700"/>
            <stop offset="100%" stopColor="#cc6600"/>
          </linearGradient>
          <style>{`
            .hcv1{stroke-dasharray:420;stroke-dashoffset:420;animation:hdL 2.5s ease-out 0.2s forwards;}
            .hcv2{stroke-dasharray:420;stroke-dashoffset:420;animation:hdL 2.5s ease-out 0.5s forwards;}
            .hcv3{stroke-dasharray:420;stroke-dashoffset:420;animation:hdL 2.5s ease-out 0.8s forwards;}
            .hch1{stroke-dasharray:200;stroke-dashoffset:200;animation:hdL 1.8s ease-out 1.8s forwards;}
            .hch2{stroke-dasharray:200;stroke-dashoffset:200;animation:hdL 1.8s ease-out 2.1s forwards;}
            .hcb{stroke-dasharray:300;stroke-dashoffset:300;animation:hdL 1.5s ease-out 2.5s forwards;}
            .hcpulse{animation:hgP 3s ease-in-out 3.5s infinite;}
            @keyframes hdL{to{stroke-dashoffset:0;}}
            @keyframes hgP{0%,100%{opacity:.75;} 50%{opacity:1;filter:drop-shadow(0 0 20px #FFD700) drop-shadow(0 0 45px #FFA500);}}
          `}</style>
        </defs>
        <g className="hcpulse">
          <line className="hcv1" x1="88" y1="12" x2="88" y2="252" stroke="url(#hcg1)" strokeWidth="9" strokeLinecap="round"/>
          <line className="hcv2" x1="100" y1="5"  x2="100" y2="255" stroke="url(#hcg1)" strokeWidth="14" strokeLinecap="round"/>
          <line className="hcv3" x1="112" y1="12" x2="112" y2="252" stroke="url(#hcg1)" strokeWidth="9" strokeLinecap="round"/>
          <line className="hch1" x1="15" y1="95"  x2="185" y2="95"  stroke="url(#hcg2)" strokeWidth="9" strokeLinecap="round"/>
          <line className="hch2" x1="15" y1="113" x2="185" y2="113" stroke="url(#hcg2)" strokeWidth="9" strokeLinecap="round"/>
          <line className="hcb" x1="68"  y1="253" x2="100" y2="290" stroke="url(#hcg1)" strokeWidth="7" strokeLinecap="round"/>
          <line className="hcb" x1="132" y1="253" x2="100" y2="290" stroke="url(#hcg1)" strokeWidth="7" strokeLinecap="round"/>
          <line className="hcb" x1="55"  y1="290" x2="145" y2="290" stroke="url(#hcg2)" strokeWidth="6" strokeLinecap="round"/>
          <line className="hcb" x1="55"  y1="290" x2="40"  y2="320" stroke="url(#hcg1)" strokeWidth="5" strokeLinecap="round"/>
          <line className="hcb" x1="145" y1="290" x2="160" y2="320" stroke="url(#hcg1)" strokeWidth="5" strokeLinecap="round"/>
          <line className="hcb" x1="35"  y1="320" x2="165" y2="320" stroke="url(#hcg2)" strokeWidth="5" strokeLinecap="round"/>
          <circle cx="15" cy="104" r="5" fill="#FFD700">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="185" cy="104" r="5" fill="#FFD700">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="100" cy="5" r="6" fill="#fff7c0">
            <animate attributeName="r" values="4;9;4" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>
    </div>
  );
}

/* ─── COMPONENTE PRINCIPAL ──────────────────────────────────────────────── */
export default function VLSNewsSemanaSanta({ onClose }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandSection, setExpandSection]   = useState(null);
  const [quizIdx, setQuizIdx]               = useState(0);
  const [quizAnswered, setQuizAnswered]     = useState(false);
  const [quizSelected, setQuizSelected]     = useState(null);
  const [quizScore, setQuizScore]           = useState(0);
  const [quizDone, setQuizDone]             = useState(false);
  const [shared, setShared]                 = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    let lastProgress = 0;
    const handleScroll = () => {
      const el = document.getElementById('ss-scroll');
      if (el) {
        const progress = Math.round((el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100);
        if (Math.abs(progress - lastProgress) >= 1) { lastProgress = progress; setScrollProgress(progress); }
      }
    };
    const el = document.getElementById('ss-scroll');
    if (el) el.addEventListener('scroll', handleScroll, { passive: true });
    return () => { el && el.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', handleResize); };
  }, []);

  const handleQuiz = (idx) => {
    if (quizAnswered) return;
    setQuizSelected(idx);
    setQuizAnswered(true);
    if (idx === QUIZ[quizIdx].ans) setQuizScore(s => s + 1);
  };

  const nextQuiz = () => {
    if (quizIdx < QUIZ.length - 1) { setQuizIdx(i => i + 1); setQuizAnswered(false); setQuizSelected(null); }
    else setQuizDone(true);
  };

  return typeof document !== 'undefined' ? createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#ffffff', zIndex: 2147483647, display: 'flex', flexDirection: 'column', color: '#111827', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Barra de progreso */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: `${scrollProgress}%`, height: '4px', background: 'linear-gradient(90deg,#7c3aed,#ef4444,#FFD700)', zIndex: 9999, transition: 'width 0.2s' }} />

      {/* HEADER */}
      <header style={{ padding: isMobile ? '0.8rem 1rem' : '1rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', zIndex: 500 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '12px' }}>
          <div style={{ background: '#1a1a1a', color: 'white', padding: '4px 10px', fontWeight: '900', fontSize: isMobile ? '1rem' : '1.1rem', letterSpacing: '-1px' }}>VLS</div>
          {!isMobile && <span style={{ fontWeight: '700', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>INVESTIGACIÓN ESPECIAL · SEMANA SANTA</span>}
        </div>
        <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '15px', alignItems: 'center' }}>
          <button
            onClick={() => { const u = `${window.location.origin}${window.location.pathname}?news=semanasanta`; window.open(`https://wa.me/?text=${encodeURIComponent('Hemeroteca VLS: Semana Santa 2026. Lee aquí: ' + u)}`, '_blank'); }}
            style={{ background: '#25D366', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Compartir en WhatsApp"
          ><Share2 size={16} /></button>
          <button onClick={onClose} style={{ background: '#7c3aed', border: 'none', color: 'white', padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.4rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
            {isMobile ? 'X' : 'CERRAR'} <X size={isMobile ? 14 : 18} />
          </button>
        </div>
      </header>

      {/* SCROLL CONTAINER */}
      <div id="ss-scroll" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>

        {/* ── HERO con Cruz del Tercer Milenio ── */}
        <section style={{ minHeight: '85vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: isMobile ? '2.5rem 1.5rem' : '4rem 6rem', background: '#07030f', color: 'white', overflow: 'hidden' }}>
          <CruzTercerMilenio width={isMobile ? 240 : 400} height={isMobile ? 380 : 610} opacity={0.65} />
          {/* Gradiente para legibilidad del texto */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #07030f 25%, rgba(7,3,15,0.65) 60%, rgba(7,3,15,0.15) 100%)' }} />

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#7c3aed', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>REPORTAJE ESPECIAL</span>
              <span style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700' }}>SEMANA SANTA 2026</span>
              <span style={{ background: 'rgba(255,215,0,0.15)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.3)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700' }}>✝ REGIÓN DE COQUIMBO</span>
              <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}><Clock size={13} /> 18 min lectura</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-0.03em', marginBottom: '1.5rem', fontFamily: "'Georgia', serif" }}>
              Más allá de la Fe: Historia, Cultura y Tradición de la{' '}
              <span style={{ background: 'linear-gradient(135deg,#a78bfa,#f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Semana Santa
              </span>
              {' '}en Chile y el Mundo
            </h1>
            <p style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', color: '#d1d5db', maxWidth: '800px', lineHeight: 1.6, fontWeight: '300' }}>
              ¿Qué celebramos realmente estos días? Un viaje histórico que entrelaza Jerusalén, Roma, la Cruz del Tercer Milenio de Coquimbo y las tradiciones más profundas de nuestro territorio.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.9rem' }}>VLS</div>
              <div>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '0.9rem' }}>Unidad de Investigación VLS · RDMLS Heritage</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>26 DE MARZO, 2026 · EDICIÓN EXTENDIDA</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── INTRO ── */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '3rem 1.5rem' : '5rem 2rem' }}>
          <p style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', lineHeight: 1.8, color: '#111827', fontFamily: "'Georgia',serif" }}>
            Cada año, el calendario marca una pausa. Para millones de personas en todo el mundo, estos días representan la cumbre de su fe; para otros, un momento de reflexión histórica y cultural. Esta investigación es un viaje por 2.000 años de historia, desde Jerusalén hasta el Cerro El Vigía de Coquimbo, desde las procesiones barrocas de Sevilla hasta los caldillos de congrio en las caletas del norte chico.
          </p>
          <div style={{ marginTop: '2rem', padding: '2rem', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '20px', borderLeft: '6px solid #FFD700' }}>
            <p style={{ margin: 0, fontSize: '1.05rem', fontStyle: 'italic', color: '#92400e', fontFamily: "'Georgia',serif", lineHeight: 1.8 }}>
              "En el cerro El Vigía de Coquimbo, a 93 metros sobre el nivel de la ciudad, la Cruz del Tercer Milenio ilumina el Pacífico en dorado. Es el símbolo más poderoso de que la fe y la identidad regional son inseparables."
            </p>
            <p style={{ margin: '1rem 0 0', fontSize: '0.8rem', color: '#b45309', fontWeight: '700' }}>— RDMLS HERITAGE · SEMANA SANTA 2026</p>
          </div>
        </section>

        {/* ── TIMELINE EXTENDIDA ── */}
        <section style={{ background: '#f8fafc', padding: isMobile ? '3rem 1.5rem' : '5rem 2rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: isMobile ? '1.5rem' : '2.5rem', fontWeight: '900', marginBottom: '0.5rem' }}>2.000 años de historia</h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem', fontSize: '1rem' }}>Haz clic en cada capítulo para desplegar la investigación completa</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {SECTIONS.map((s) => (
                <div key={s.id}>
                  <div
                    onClick={() => setExpandSection(expandSection === s.id ? null : s.id)}
                    style={{ background: 'white', borderRadius: '16px', padding: '1.4rem 1.6rem', cursor: 'pointer', border: `2px solid ${expandSection === s.id ? s.color : '#e5e7eb'}`, display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between', boxShadow: expandSection === s.id ? `0 4px 20px ${s.color}30` : 'none', transition: 'all 0.25s' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1.8rem' }}>{s.emoji}</span>
                      <h3 style={{ margin: 0, fontWeight: '800', fontSize: '1rem' }}>{s.title}</h3>
                    </div>
                    <ChevronDown size={18} style={{ transform: expandSection === s.id ? 'rotate(180deg)' : 'none', transition: '0.3s', flexShrink: 0 }} />
                  </div>
                  {expandSection === s.id && (
                    <div style={{ background: 'white', borderRadius: '0 0 16px 16px', padding: '1.5rem 2rem', borderLeft: `5px solid ${s.color}`, marginTop: '-4px', boxShadow: '0 8px 25px rgba(0,0,0,0.07)' }}>
                      {s.content.split('\n\n').map((p, pi) => (
                        <p key={pi} style={{ color: '#374151', lineHeight: 1.9, marginBottom: '1.2rem', fontSize: '1rem' }}>{p}</p>
                      ))}
                      {s.dato && (
                        <div style={{ marginTop: '1.5rem', padding: '1.2rem 1.5rem', background: `${s.color}15`, borderRadius: '12px', borderLeft: `4px solid ${s.color}` }}>
                          <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic', color: '#374151', lineHeight: 1.7 }}>
                            <strong style={{ color: s.color }}>💡 Dato clave:</strong> {s.dato}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAPA MUNDIAL ── */}
        <section style={{ padding: isMobile ? '3rem 1.5rem' : '5rem 2rem', background: '#111827', color: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>🌍 Semana Santa alrededor del mundo</h2>
            <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '3rem' }}>9 tradiciones y expresiones únicas en 5 continentes</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {WORLD_MAP.map((w, i) => (
                <div key={i} style={{ background: w.bg, borderRadius: '16px', padding: '1.3rem', border: '1px solid rgba(255,255,255,0.1)', transition: '0.2s' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{w.icon}</div>
                  <h3 style={{ fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.5rem', color: 'white' }}>{w.region}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>{w.custom}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRADICIONES CHILE EXTENDIDAS ── */}
        <section style={{ padding: isMobile ? '3rem 1.5rem' : '5rem 2rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>🇨🇱 Tradiciones Chilenas</h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem' }}>Seis expresiones únicas de nuestra Semana Santa</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {TRADITIONS_CHILE.map((tradition, i) => (
                <div key={i} style={{ background: 'white', borderTop: `4px solid ${tradition.color}`, borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', transition: '0.2s' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{tradition.icon}</div>
                  <h3 style={{ fontWeight: '800', marginBottom: '0.8rem', color: '#111827' }}>{tradition.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{tradition.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRIVIA / QUIZ ── */}
        <section style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: isMobile ? '3rem 1.5rem' : '5rem 2rem', color: 'white' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>🧠 ¿Cuánto sabes de Semana Santa?</h2>
            <p style={{ textAlign: 'center', color: '#a78bfa', marginBottom: '2.5rem', fontSize: '0.9rem' }}>{QUIZ.length} preguntas · Investigación extendida VLS</p>
            {!quizDone ? (
              <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(167,139,250,0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{ color: '#a78bfa', fontSize: '0.8rem', fontWeight: '700' }}>PREGUNTA {quizIdx + 1} DE {QUIZ.length}</span>
                  <span style={{ color: '#a78bfa', fontSize: '0.8rem' }}>✓ {quizScore} correctas</span>
                </div>
                <p style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', lineHeight: 1.5 }}>{QUIZ[quizIdx].q}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {QUIZ[quizIdx].opts.map((opt, i) => (
                    <button key={i} onClick={() => handleQuiz(i)}
                      style={{
                        padding: '1rem 1.2rem', borderRadius: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.95rem', cursor: quizAnswered ? 'default' : 'pointer', border: 'none',
                        background: !quizAnswered ? 'rgba(255,255,255,0.1)' : i === QUIZ[quizIdx].ans ? '#10b981' : i === quizSelected ? '#ef4444' : 'rgba(255,255,255,0.07)',
                        color: !quizAnswered ? 'white' : i === QUIZ[quizIdx].ans ? 'white' : i === quizSelected ? 'white' : 'rgba(255,255,255,0.5)',
                        transition: '0.2s'
                      }}
                    >{opt}</button>
                  ))}
                </div>
                {quizAnswered && (
                  <button onClick={nextQuiz} style={{ marginTop: '1.5rem', width: '100%', padding: '1rem', borderRadius: '12px', background: '#7c3aed', color: 'white', border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '1rem' }}>
                    {quizIdx < QUIZ.length - 1 ? 'SIGUIENTE PREGUNTA →' : 'VER RESULTADO FINAL'}
                  </button>
                )}
              </div>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '24px', padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(167,139,250,0.3)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{quizScore >= 6 ? '🏆' : quizScore >= 4 ? '🎓' : '📚'}</div>
                <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>{quizScore}/{QUIZ.length}</h3>
                <p style={{ color: '#a78bfa', marginBottom: '1.5rem' }}>{quizScore >= 6 ? '¡Experto en Semana Santa! Dominas la historia.' : quizScore >= 4 ? 'Muy bien. Sigue leyendo la investigación completa.' : 'Buen intento. Lee cada sección para profundizar.'}</p>
                <button onClick={() => { setQuizIdx(0); setQuizScore(0); setQuizAnswered(false); setQuizSelected(null); setQuizDone(false); }}
                  style={{ padding: '0.8rem 2rem', borderRadius: '12px', background: '#7c3aed', color: 'white', border: 'none', fontWeight: '900', cursor: 'pointer' }}>
                  VOLVER A INTENTAR
                </button>
              </div>
            )}
          </div>
        </section>

        <CommentSection themeColor="#7c3aed" reportTitle="Semana Santa 2026 · VLS" />

        <footer style={{ background: '#000', color: 'white', padding: isMobile ? '3rem 1.5rem' : '4rem 6rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: '#FFD700', fontSize: '1.5rem' }}>✝</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>VLS Investigative Unit · RDMLS Heritage · Soberanía Cultural de la Región de Coquimbo</p>
          <p style={{ fontSize: '0.75rem', color: '#374151', marginTop: '0.5rem' }}>Cruz del Tercer Milenio · Coquimbo, Chile · 93 metros de altura</p>
        </footer>
      </div>
    </div>,
    document.body
  ) : null;
}
