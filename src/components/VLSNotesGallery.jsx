import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Play, BookOpen, User, Calendar, ExternalLink, X, MessageSquare, Share2, Quote, Music, Video, Newspaper, Users, Award, Heart, Globe, Mic, Image as ImageIcon, Bird, Waves, ShieldCheck, Home, Thermometer, Sparkles, Building2, Landmark, Palette, Mountain, CloudRain, Wind, Beef, Apple, Moon, Stars, Baby, Briefcase, Shovel, Hammer, Sprout, FileSearch, Scale, Zap, Volume2, Activity, LayoutGrid, Droplets, Eye, Brain, Clock, Box } from 'lucide-react';

const LEGACY_NOTES = [
    { 
        id: "e4AYdzIF6OQ", type: "MÚSICA", cat: "Sesiones Musicales", title: "Los Vikings 5", 
        titular: "Los Vikings 5: La Epopeya de la Cumbia Eléctrica en el Puerto", 
        bajada: "Más de medio siglo de historia: Cómo una familia de carpinteros de Coquimbo transformó la música tropical chilena.", 
        body: "La historia de Los Vikings 5 no es solo una biografía musical, es el relato antropológico de Coquimbo. Inspirados por el rock and roll, incorporaron la guitarra eléctrica como voz principal, creando un sonido único que hoy es Patrimonio Vivo de la Región. Desde sus inicios en el sector de Guayacán, los hermanos Núñez junto a 'Tuto' Valenzuela forjaron una identidad sonora que cruzó fronteras. Su música no solo suena en estadios y festivales, sino que es el alma del Puerto. En esta sesión capturamos la esencia de su ritmo 'chicha' y la calidez de su gente.",
        contacto: "Instagram: @losvikings5oficial", cita: "Sin los Vikings, Chile no tiene fiesta.",
        color: "#f59e0b",
        tacticalIcons: [
            { icon: Music, label: 'Cumbia 4.0', color: '#f59e0b', desc: 'Identidad Portuaria' },
            { icon: Zap, label: 'Energía Eléctrica', color: '#38bdf8', desc: 'Sonido Inmortal' },
            { icon: Users, label: 'Legado Familiar', color: '#ef4444', desc: 'Coquimbo Presente' }
        ]
    },
    { 
        id: "R-hC2QuUdE8", type: "MÚSICA", cat: "Sesiones Musicales", title: "Grupo Colapso", 
        titular: "Colapso: El Grito Visceral del Rock en el Valle del Elqui", 
        bajada: "Una propuesta de rock alternativo que canaliza la aridez del paisaje y la crítica social en un sonido demoledor.", 
        body: "Colapso irrumpe con una propuesta que abraza la distorsión para hablar de la tierra quebrada y la supervivencia en el semiárido, demostrando que el rock regional tiene una potencia inigualable. Sus letras exploran la resiliencia de la flora nativa frente a la desertificación y el costo humano de la gran industria. En el estudio, el sonido de los bajos saturados y las baterías crudas crean un muro sónico que no deja indiferente a nadie.",
        contacto: "TVLSAudio: Grupo Colapso", cita: "Nuestro rock nace de la grieta en la tierra seca.",
        color: "#ef4444",
        tacticalIcons: [
            { icon: Volume2, label: 'Decibeles Críticos', color: '#ef4444', desc: 'Rock del Semiárido' },
            { icon: Mountain, label: 'Territorio Vivo', color: '#92400e', desc: 'Voz de la Tierra' },
            { icon: Activity, label: 'Potencia Elquina', color: '#ffffff', desc: 'Resistencia Sonora' }
        ]
    },
    { 
        id: "wzNKbSUFHQk", type: "MÚSICA", cat: "Sesiones Musicales", title: "Fernando Figueroa", 
        titular: "Fernando Figueroa: Crónicas Cantadas de Montegrande", 
        bajada: "Una sesión íntima donde la guitarra se convierte en pincel para retratar la memoria del agua y la poesía del valle.", 
        body: "Fernando es un cronista con guitarra que rescata historias de abuelos y mitos locales, fusionando la nueva trova con ritmos andinos en una defensa apasionada de los ríos libres. Su voz, serena pero firme, nos transporta a las quebradas del Elqui, denunciando el desvío de cauces y celebrando la fertilidad de la tierra. Este registro es un viaje sensorial por el folklore imaginario de Chile.",
        contacto: "@ferfigueroa_musica", cita: "Mi música brota del agua clara de la cordillera.",
        color: "#10b981",
        tacticalIcons: [
            { icon: Sprout, label: 'Semilla Trova', color: '#10b981', desc: 'Poesía Campesina' },
            { icon: Waves, label: 'Ríos Libres', color: '#0284c7', desc: 'Defensa Hídrica' },
            { icon: User, label: 'Cronista Local', color: '#8b5cf6', desc: 'Memoria Cantada' }
        ]
    },
    { 
        id: "ZAJpC9o-Mok", type: "MÚSICA", cat: "Sesiones Musicales", title: "Jorge Campos", 
        titular: "Jorge Campos: La Arquitectura y el Arte de Girar", 
        bajada: "El virtuoso bajista de Congreso y Fulano reflexiona sobre el bajo como cimiento arquitectónico y la gira como escuela de vida.", 
        body: "Jorge Campos deconstruye su instrumento, no solo como músico, sino como un arquitecto del sonido. Para él, el bajo eléctrico es el cimiento y la columna vertebral que sostiene toda la estructura musical de una obra.\n\nClave 1: La Gira como Escuela. Campos relata con pasión sus años 'girando' por Europa con Santiago del Nuevo Extremo en los 80. Define el acto de viajar y tocar cada noche como la verdadera formación de un músico, una experiencia humana que forja el carácter y la técnica lejos de las comodidades del estudio.\n\nClave 2: Cimientos Sonoros. Explica que el bajo es el plano que evita que la armonía se derrumbe. En sus sesiones, demuestra cómo el instrumento puede ser melódico y percusivo, pero siempre manteniendo el pulso vital que conecta a la banda.\n\nClave 3: Dualidad Creativa. Entre la disciplina rítmica de Congreso y la libertad experimental de Fulano, Campos ha navegado por la vanguardia chilena, destacando interpretaciones memorables como su versión de 'Luchín', donde el bajo se convierte en un acto de memoria política y social.",
        contacto: "Web: jorgecampos.cl", cita: "Girar es la única forma de que el músico entienda su lugar en el mundo.",
        color: "#3b82f6",
        tacticalIcons: [
            { icon: LayoutGrid, label: 'Arquitectura Jazz', color: '#3b82f6', desc: 'Cimiento Rítmico' },
            { icon: Globe, label: 'Gira Europea', color: '#10b981', desc: 'Escuela de Vida' },
            { icon: ShieldCheck, label: 'Memoria Sonora', color: '#ffffff', desc: 'Legado Master' }
        ]
    },
    { 
        id: "EoIE7lVYWIw?start=0", type: "ENTREVISTA", cat: "EntreVecinas", title: "Manifiesto Entrevecinas", 
        titular: "Manifiesto: La Voz de las Mujeres en la Nueva Serena", 
        bajada: "Un recorrido por la visión ciudadana femenina que está transformando la identidad de la capital regional.", 
        body: "El 'Manifiesto Entrevecinas' es la piedra angular de este portal. En esta sección inicial, se exploran las motivaciones y el espíritu de colaboración que une a las mujeres líderes, profesionales y vecinas de La Serena. Es una declaración de principios sobre la soberanía comunicacional y el derecho a narrar nuestras propias historias, lejos de los sesgos tradicionales. Aquí se sientan las bases de una red de apoyo mutuo que busca visibilizar el impacto real del trabajo femenino en la arquitectura, la ciencia, el deporte y la cultura local.",
        contacto: "Redacción entrevecinas.cl", cita: "Nuestra historia no es un relato; es un manifiesto de acción.",
        color: "#ec4899",
        tacticalIcons: [
            { icon: Heart, label: 'Sororidad', color: '#ec4899', desc: 'Red de Apoyo' },
            { icon: Globe, label: 'Territorio', color: '#38bdf8', desc: 'Soberanía Vecinal' },
            { icon: Sparkles, label: 'Identidad', color: '#ffffff', desc: 'Voz Propia' }
        ]
    },
    { 
        id: "EoIE7lVYWIw?start=1977", type: "ENTREVISTA", cat: "EntreVecinas", title: "Solange Miranda", 
        titular: "Adobe Vivo: Tecnología Ancestral para el Siglo XXI", 
        bajada: "Solange Miranda, arquitecta experta en tierra, propone al adobe como una solución de vanguardia frente a la crisis climática y energética.", 
        body: "Solange Miranda no ve el adobe como un material del pasado, sino como una tecnología de frontera. Como líder del movimiento 'Adobe Vivo', su misión en la Región de Coquimbo es legitimar la arquitectura de tierra bajo estándares científicos modernos.\n\nClave 1: Inercia Térmica Natural. El adobe posee la capacidad única de regular la temperatura interior de forma pasiva, absorbiendo el sol del día en el valle para liberarlo en la noche, reduciendo drásticamente el consumo energético.\n\nClave 2: Sismicidad y Refuerzo. Desmiente el mito de la fragilidad del barro. Mediante el uso de geomallas y técnicas de refuerzo estructural contemporáneo, demuestra que el adobe es un material flexible y seguro ante grandes sismos.\n\nClave 3: Patrimonio y Salud. Para Solange, una casa de adobe es un filtro natural que gestiona la humedad y la toxicidad del aire, creando ambientes sanos que los polímeros industriales no pueden replicar.",
        contacto: "@mastierra_arquitectura", cita: "El adobe no es historia vieja; es la respuesta térmica del futuro.",
        color: "#8b5cf6",
        tacticalIcons: [
            { icon: Home, label: 'Inercia Térmica', color: '#92400e', desc: 'Confort Pasivo' },
            { icon: ShieldCheck, label: 'Refuerzo Sísmico', color: '#d97706', desc: 'Normativa 2.0' },
            { icon: Sparkles, label: 'Patrimonio Vivo', color: '#ffffff', desc: 'Adobe Master' }
        ]
    },
    { 
        id: "EoIE7lVYWIw?start=1174", type: "ENTREVISTA", cat: "EntreVecinas", title: "Javiera Campos", 
        titular: "La Guardiana del Borde: Humedales Urbanos y Resiliencia", 
        bajada: "Javiera Campos, experta del Proyecto GEF, explica por qué el humedal no termina en el agua y cómo la Ley 21.202 es nuestra mejor defensa.", 
        body: "Javiera Campos revoluciona la visión conservacionista al introducir el concepto del **'Borde Vivo'**. Para ella, la protección del humedal del Río Elqui es una misión de seguridad civil y biodiversidad compartida.\n\nClave 1: El Borde de Transición. Explica que el humedal es un ecosistema estratégico que no termina donde empieza el agua. Es la zona de amortiguación la que protege a La Serena de desastres naturales y sostiene la mayor cantidad de vida.\n\nClave 2: Ley de Humedales Urbanos (21.202). Esta ley es un escudo legal que permite al municipio proteger polígonos específicos frente al avance inmobiliario. Javiera destaca que proteger el río es asegurar el futuro hídrico de la ciudad.\n\nClave 3: Ciudadanía y Vigilancia. Ante amenazas como el vertido de residuos y animales asilvestrados, el vecino es la primera línea de defensa. Identificar nidos de aves migratorias como el Pilpilén es vital para la salud de las más de 100 especies del estuario.",
        contacto: "Depto. Medio Ambiente LS", cita: "El humedal es la esponja biológica que nos protege; si el borde muere, la ciudad queda expuesta.",
        color: "#14b8a6",
        tacticalIcons: [
            { icon: Waves, label: 'Borde Vivo', color: '#14b8a6', desc: 'Zona amortiguación' },
            { icon: ShieldCheck, label: 'Ley 21.202', color: '#0ea5e9', desc: 'Protección Legal' },
            { icon: Bird, label: 'Bio-Santuario', color: '#ffffff', desc: 'Garza Cuca' },
            { icon: Eye, label: 'Vigía Vecinal', color: '#facc15', desc: 'Monitoreo Elqui' }
        ]
    },
    { 
        id: "lgjba4j0Afo", type: "ENTREVISTA", cat: "EntreVecinas", title: "Paulina Godoy", 
        titular: "Urbanismo de Borde: Recuperando el Pulmón de Coquimbo", 
        bajada: "La arquitecta Paulina Godoy presenta el Plan Maestro de El Culebrón, transformando un pasivo ambiental en infraestructura verde resiliente.", 
        body: "Paulina Godoy propone un cambio radical de mirada: que la ciudad de Coquimbo deje de darle la espalda a sus humedales para integrarlos como corazones biológicos urbanos.\n\nClave 1: Parques Inundables. En lugar de muros de hormigón contra marejadas, Godoy diseña bordes blandos y parques que absorben la energía del mar, mitigando riesgos de forma natural y estética.\n\nClave 2: Infraestructura Verde. El humedal del Culebrón es el principal filtro biológico de la conurbación. Su proyecto contempla muelles de avistamiento y senderos elevados que protegen la biodiversidad sin afectar el suelo.\n\nClave 3: Reparación Social. El rescate del ecosistema busca devolverle el orgullo al habitante del puerto, transformando antiguos microbasurales en espacios de recreación de clase mundial y alta resiliencia climática.",
        contacto: "Instagram: @paulinagodoy.arq", cita: "El Culebrón es el pulmón que Coquimbo necesita para respirar futuro.",
        color: "#ec4899",
        tacticalIcons: [
            { icon: Building2, label: 'Urbanismo Borde', color: '#ec4899', desc: 'Parque Resiliente' },
            { icon: Waves, label: 'Filtro Biológico', color: '#0ea5e9', desc: 'Misión Culebrón' },
            { icon: Sprout, label: 'Infraestructura', color: '#ffffff', desc: 'Verde Urbano' }
        ]
    },
    { 
        id: "EoIE7lVYWIw", type: "ENTREVISTA", cat: "EntreVecinas", title: "Margarita Ángel", 
        titular: "Las Ruinas de Lambert: El Grito de Auxilio del Patrimonio Industrial", 
        bajada: "Margarita Ángel encabeza la resistencia vecinal para salvar los hornos de 1840 en Las Compañías.", 
        body: "Pocos saben que en Las Compañías se inició la revolución industrial de la minería chilena. Margarita Ángel nos lleva a las ruinas de la fundición de Charles Lambert, un sitio de importancia mundial que hoy agoniza entre la basura y el olvido estatal. Estos hornos de reverbero transformaron la economía del siglo XIX, trayendo a La Serena la vanguardia técnica de Gales. Margarita explica cómo la comunidad se ha organizado para evitar que el lugar sea loteado por inmobiliarias. 'Luchamos contra el tiempo y la desidia administrativa', confiesa. Su objetivo es convertir el sector en un Museo de Sitio que cuente la historia de los trabajadores que forjaron el norte. El especial detalla los hallazgos arqueológicos superficiales y el valor arquitectónico de la piedra campanil utilizada en la construcción.",
        contacto: "Agrupación Patrimonio Las Compañías", cita: "No son piedras viejas; son los cimientos de nuestra identidad.",
        color: "#f59e0b",
        tacticalIcons: [
            { icon: Hammer, label: 'Forja de Lambert', color: '#f59e0b', desc: 'Hornos 1840' },
            { icon: Landmark, label: 'Museo de Sitio', color: '#8b5cf6', desc: 'Rescate Compañías' },
            { icon: Shovel, label: 'Arqueología', color: '#92400e', desc: 'Raíces Industriales' }
        ]
    },
    { 
        id: "IPeBSr9Tuq4", type: "ENTREVISTA", cat: "EntreVecinas", title: "Mónica Sierra", 
        titular: "Batik en el Elqui: Los Colores de Indonesia en el Desierto", 
        bajada: "Mónica Sierra ha creado un puente cultural único, pintando sedas con cera de abeja y pigmentos inspirados en el valle.", 
        body: "En Pisco Elqui, el arte textil tiene un nombre: Batik. Mónica Sierra ha dedicado décadas a perfeccionar esta técnica milenaria indonesia, adaptándola a la paleta cromática del norte de Chile. Su proceso es una meditación activa: capa tras capa de cera, baños de color y el sol del Elqui que fija los pigmentos de forma vibrante. Mónica no solo crea prendas extraordinarias, sino que transmite una filosofía de paciencia y respeto por los materiales naturales. 'Cada diseño es irrepetible, como cada rincón del valle', menciona mientras muestra sus sedas que parecen capturar el atardecer entre los cerros. Este reportaje explora su taller, un espacio donde el tiempo se detiene para dejar que la seda hable.",
        contacto: "@elqui_colores_batik", cita: "La cera guarda el secreto de la luz y el color.",
        color: "#8b5cf6",
        tacticalIcons: [
            { icon: Palette, label: 'Seda y Sol', color: '#8b5cf6', desc: 'Batik Original' },
            { icon: Globe, label: 'Puente Cultural', color: '#38bdf8', desc: 'Indo-Chile' },
            { icon: Sparkles, label: 'Pigmentos Vivos', color: '#ef4444', desc: 'Arte del Valle' }
        ]
    },
    { 
        id: "hdVC1pCSeJ4", type: "ENTREVISTA", cat: "EntreVecinas", title: "Antonia Rodríguez", 
        titular: "Antonia Rodríguez: Pasión XCO entre la Gloria y el Abandono", 
        bajada: "Tiene 17 años y es potencia sudamericana, pero debe entrenar esquivando basura en los cerros de La Serena.", 
        body: "La historia de Antonia Rodríguez es la de muchos deportistas regionales: talento de sobra, apoyo a cuentagotas. Especialista en Mountain Bike Cross Country (XCO), lleva la bandera de la región a podios internacionales a pesar de la falta de espacios habilitados. Durante la entrevista, Antonia relata cómo debe esquivar escombros y jaurías de perros abandonados en circuitos que ella misma ayuda a limpiar. 'Entrenar en el Cerro Grande es un reto no solo físico, sino emocional por el estado de abandono del entorno', denuncia. A pesar de todo, su rendimiento sigue en ascenso, posicionándose como la gran promesa nacional para los próximos juegos panamericanos. El especial destaca su riguroso entrenamiento diario y la urgente necesidad de un Bike Park institucional en la conurbación.",
        contacto: "@antonia_xco", cita: "La pasión me mueve, pero la basura en los cerros me frena.",
        color: "#ef4444",
        tacticalIcons: [
            { icon: Activity, label: 'Elite XCO', color: '#ef4444', desc: 'Potencia Atacama' },
            { icon: Mountain, label: 'Cerro Grande', color: '#92400e', desc: 'Misión Limpieza' },
            { icon: Award, label: 'Podio Regional', color: '#fbbf24', desc: 'Orgullo VLS' }
        ]
    },
    { 
        id: "y2cUZXfk46E", type: "ENTREVISTA", cat: "EntreVecinas", title: "Andrea Torrejón", 
        titular: "Cosechando Nubes: La Ciencia de los Atrapanieblas ULS", 
        bajada: "Andrea Torrejón, física de la ULS, lidera la innovación en mallas para capturar el 'río aéreo' de la camanchaca.", 
        body: "En una región asediada por la sequía, mirar al cielo es una necesidad. Andrea Torrejón y su equipo en la Universidad de La Serena han perfeccionado la tecnología para 'ordeñar' las nubes costeras y abastecer comunidades rurales. Los atrapanieblas de nueva generación utilizan mallas de polímeros avanzados que maximizan la condensación incluso en días de baja humedad. Andrea explica que 'el río aéreo es una fuente de agua soberana que no depende de las lluvias estacionales'. Su investigación en Cerro Tololo y zonas costeras de Coquimbo demuestra que es posible recolectar miles de litros diarios para riego agrícola y consumo animal, mitigando el impacto del cambio climático en los pequeños crianceros de la zona.",
        contacto: "Facultad de Ciencias ULS", cita: "El agua está ahí, en el aire; solo debemos aprender a pedirla.",
        color: "#3b82f6",
        tacticalIcons: [
            { icon: CloudRain, label: 'Río Aéreo', color: '#3b82f6', desc: 'Física ULS' },
            { icon: Droplets, label: 'Condensación', color: '#0ea5e9', desc: 'Agua Soberana' },
            { icon: Wind, label: 'Camanchaca', color: '#94a3b8', desc: 'Ciencia de Borde' }
        ]
    },
    { 
        id: "B3xxKc6Y3eo", type: "ENTREVISTA", cat: "EntreVecinas", title: "Daniela Olmos", 
        titular: "El Metabolismo de la Vivienda Sustentable", 
        bajada: "Daniela Olmos, evaluadora energética de elite, propone un cambio de paradigma: entender la vivienda como un organismo que respira y cierra ciclos de recursos.", 
        body: "Daniela Olmos no solo diseña casas; gestiona el metabolismo de la habitabilidad. Como Evaluadora Energética certificada en sellos CES, CEV y CVS, su trabajo se centra en erradicar la 'Pobreza Energética' en la Región de Coquimbo. Su visión técnica trasciende el simple aislamiento térmico.\n\nClave 1: El Derecho a la Dignidad Térmica. Daniela sostiene que una vivienda que enferma a sus habitantes por frío o moho es un fallo de diseño. El acceso a una temperatura confortable es un derecho humano. Su propuesta incluye el uso de materiales higroscópicos, como la lana de oveja, para regular la humedad crítica de la conurbación de forma pasiva.\n\nClave 2: Cierre de Ciclos. Su filosofía arquitectónica exige que la vivienda gestione sus propios residuos, agua y energía, dejando de ser un consumidor lineal para transformarse en un ente metabólico eficiente que interactúa con su entorno.\n\nClave 3: Orientación y Geometría. Critica frontalmente la 'tiranía de la fachada' en el mercado inmobiliario, enfatizando que la orientación norte y el diseño bioclimático inteligente son herramientas de justicia social que reducen el gasto familiar en más de un 60%.",
        contacto: "@danielaolmos.arq", cita: "La vivienda debe ser un ente metabólico que cuide a quien la habita.",
        color: "#10b981",
        tacticalIcons: [
            { icon: Building2, label: 'Evaluación Operativa', color: '#10b981', desc: 'CES / CEV / CVS' },
            { icon: Thermometer, label: 'Dignidad Térmica', color: '#0ea5e9', desc: 'Soberanía en Confort' },
            { icon: Zap, label: 'Pobreza Energética', color: '#f59e0b', desc: 'Justicia en el Diseño' }
        ]
    },
    { 
        id: "Y2KW_QhGj5I", type: "ENTREVISTA", cat: "EntreVecinas", title: "Loreto Narbona", 
        titular: "Volver a la Feria: Nutrición, Economía y Comunidad", 
        bajada: "La nutricionista Loreto Narbona nos invita a recuperar la soberanía alimentaria comprando en el barrio.", 
        body: "En tiempos de alimentos ultraprocesados, Loreto Narbona levanta la bandera de la comida real. Su enfoque conecta la salud del cuerpo con la salud del territorio comprando en la feria local. Narbona explica que la feria no es solo un mercado, es un centro de inteligencia nutricional donde el producto es fresco, estacional y libre de empaques plásticos. 'Al comprar al productor local, no solo nutrimos nuestras células, sino que alimentamos la economía circular de nuestra comuna'. Durante la charla, ofrece tips prácticos para organizar la compra semanal, reducir el desperdicio de vegetales y entender por qué comer según la estación es el acto más revolucionario que podemos hacer por nuestra salud.",
        contacto: "@lorenutri", cita: "La salud empieza en el canasto de la feria, no en la farmacia.",
        color: "#f472b6",
        tacticalIcons: [
            { icon: Apple, label: 'Comida Real', color: '#f472b6', desc: 'Poder Nutricional' },
            { icon: Sprout, label: 'Feria Libre', color: '#22c55e', desc: 'Soberanía Alimentaria' },
            { icon: Users, label: 'Comunidad', color: '#8b5cf6', desc: 'Economía Circular' }
        ]
    },
    { 
        id: "IUPiyBw6eSQ", type: "ENTREVISTA", cat: "EntreVecinas", title: "Camila Beltrand", 
        titular: "La Cruzada por la Noche: Defendiendo el Derecho a las Estrellas", 
        bajada: "Camila Beltrand lidera la lucha contra la contaminación lumínica para salvar nuestros cielos y nuestra salud.", 
        body: "Somos la 'Región Estrella', pero estamos apagando el universo. Camila Beltrand nos alerta sobre una amenaza invisible: la luz artificial descontrolada que ciega a los observatorios y altera nuestra salud. Como directora de la OPCC, trabaja fiscalizando luminarias LED de luz blanca que, además de dificultar la astronomía, dañan el ciclo circadiano de humanos y animales. 'El cielo oscuro es un requisito para la vida, no un lujo para científicos', afirma. La entrevista detalla los nuevos decretos de protección de cielos y cómo cada vecino puede aportar cambiando sus bombillas por luz cálida enfocada hacia el suelo, recuperando la visión de la Vía Láctea desde nuestros propios patios.",
        contacto: "Oficina OPCC", cita: "El cielo oscuro es un patrimonio en peligro de extinción.",
        color: "#6366f1",
        tacticalIcons: [
            { icon: Moon, label: 'Cielos Oscuros', color: '#6366f1', desc: 'Misión OPCC' },
            { icon: Stars, label: 'Vía Láctea', color: '#fbbf24', desc: 'Nuestra Identidad' },
            { icon: ShieldCheck, label: 'Salud Circadiana', color: '#38bdf8', desc: 'Derecho a la Noche' }
        ]
    },
    { 
        id: "jWmaGafzEuk", type: "ENTREVISTA", cat: "EntreVecinas", title: "Camila Sabando", 
        titular: "Mujeres del Campo: La Columna Vertebral Invisible del Valle", 
        bajada: "Camila Sabando visibiliza la doble jornada y la precariedad de las trabajadoras rurales en el Elqui.", 
        body: "El Valle del Elqui es verde gracias a manos de mujer. Camila Sabando pone en cifras y palabras la realidad de las temporeras y cuidadoras rurales que sostienen la vida en el territorio. Su investigación revela que las mujeres rurales enfrentan barreras sistémicas: falta de previsión social, escasez de centros de cuidado y una carga de trabajo doméstico que se suma a la labor agrícola. 'Son ellas quienes mantienen vivas las tradiciones y la seguridad alimentaria, pero son las últimas en recibir apoyo institucional', denuncia. Camila propone políticas públicas descentralizadas que reconozcan el trabajo de cuidados como un motor económico real, dignificando el rol de la mujer campesina en el Chile del siglo XXI.",
        contacto: "Seremi de la Mujer y EG", cita: "La economía rural tiene rostro de mujer y manos curtidas.",
        color: "#f43f5e",
        tacticalIcons: [
            { icon: Baby, label: 'Red de Cuidados', color: '#f43f5e', desc: 'Voz del Campo' },
            { icon: Briefcase, label: 'Dignidad Laboral', color: '#8b5cf6', desc: 'Temporeras VLS' },
            { icon: Landmark, label: 'Política Rural', color: '#38bdf8', desc: 'Identidad Elqui' }
        ]
    },
];

const PRIVATE_NOTES = [
    { 
        id: "FBI_LIARS_VLS", type: "INTELIGENCIA", cat: "INTELIGENCIA", title: "Centinel Faro: Señales de Mentira", 
        titular: "12 Señales del FBI para detectar un mentiroso", 
        bajada: "Basado en el análisis de Mark Bouton, ex-agente del FBI. Cómo las micro-expresiones delatan el engaño.", 
        body: "Una guía técnica integrada en el motor de Smart Listening. El parpadeo rápido, la dirección de la mirada (arriba a la derecha en diestros indica invención) y la sudoración excesiva son indicadores clave de estrés cognitivo. Este conocimiento se integra como capa de análisis en nuestro Centinel Faro para la detección de veracidad en reportes críticos y gestión de crisis. La herramienta permite identificar inconsistencias en declaraciones públicas mediante el análisis de microgestos asimétricos y pausas verbales inusuales.",
        contacto: "Unidad Centinel Faro VLS", cita: "Los ojos nunca mienten si sabes qué buscar.",
        color: "#38bdf8",
        tacticalIcons: [
            { icon: Eye, label: 'Análisis Ocular', color: '#38bdf8', desc: 'Micro-expresiones' },
            { icon: Brain, label: 'Carga Cognitiva', color: '#8b5cf6', desc: 'Detección Estrés' },
            { icon: FileSearch, label: 'Veracidad VLS', color: '#ffffff', desc: 'Protocolo Elite' }
        ]
    },
    { 
        id: "MOVISTAR_CABLES_VLS", type: "TECNOLOGÍA", cat: "Hemeroteca", title: "Plan de Retiro Movistar", 
        titular: "El Fin del Cobre: El gran retiro de cables en La Serena", 
        bajada: "Actualización 2026: De la concesión española a la era de Onnet Fiber y KKR.", 
        body: "Lo que comenzó como un anuncio de retiro de cables de cobre hoy es una realidad de fibra total. Tras la venta del 60% de la infraestructura a KKR (Onnet Fiber), la ciudad ha visto una limpieza masiva de cables aéreos obsoletos, migrando hacia una infraestructura digital de alta velocidad. Chile lidera el retiro de cobre en el cono sur. El proceso ha permitido despejar el casco histórico de la conurbación, reduciendo el riesgo de incendios y mejorando la estética urbana bajo el Plan de Modernización VLS.",
        contacto: "Monitor de Infraestructura VLS", cita: "La fibra es el tejido de la nueva soberanía.",
        color: "#059669",
        tacticalIcons: [
            { icon: Zap, label: 'Fibra Óptica', color: '#059669', desc: 'Cero Latencia' },
            { icon: Building2, label: 'Despeje Urbano', color: '#10b981', desc: 'Adiós al Cobre' },
            { icon: ExternalLink, label: 'Conexión KKR', color: '#ffffff', desc: 'Red Onnet 2026' }
        ]
    },
];

export default function VLSNotesGallery({ isOpen, onClose, initialFilter = 'ALL', hideFilters = false }) {
  const [filter, setFilter] = useState(initialFilter);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    const handleOpenExternal = (e) => {
      const noteId = e.detail;
      if (noteId) {
        const noteFound = LEGACY_NOTES.find(n => n.id === noteId);
        if (noteFound) {
            setSelectedNote(noteFound);
        }
      }
    };
    window.addEventListener('open-vls-note', handleOpenExternal);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('open-vls-note', handleOpenExternal);
    };
  }, [handleResize]);

  const categories = ['ALL', 'Sesiones Musicales', 'EntreVecinas', 'Hemeroteca', 'INTELIGENCIA', 'HUMOR'];

  const filteredNotes = LEGACY_NOTES.filter(n => {
    const matchesFilter = filter === 'ALL' || n.cat === filter;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.titular.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ padding: '2rem 0', width: '100%', boxSizing: 'border-box' }}>
      {!hideFilters && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '12px',
                  background: filter === cat ? 'var(--brand-primary, #3b82f6)' : 'rgba(255,255,255,0.05)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Buscar en el archivo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.8rem', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
            />
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '2rem', width: '100%', boxSizing: 'border-box' }}>
        <AnimatePresence>
          {filteredNotes.map((note) => (
            <motion.div
              layout={!isMobile}
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                if (note.id === 'CHAGO_CHEF_VLS') return;
                if (note.id === 'SEMANA_SANTA_VLS') {
                   window.dispatchEvent(new CustomEvent('open-vls-semanasanta'));
                   onClose && onClose();
                   return;
                }
                setSelectedNote(note);
              }}
              className="glass-panel hover-lift"
              style={{
                padding: '2rem',
                borderRadius: '24px',
                cursor: note.id === 'CHAGO_CHEF_VLS' ? 'not-allowed' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(15,23,42,0.6)',
                border: `1px solid ${note.color}40`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '280px'
              }}
            >
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.05, zIndex: 0 }}>
                {note.type === 'MÚSICA' ? <Music size={180} color={note.color} /> : <Users size={180} color={note.color} />}
              </div>

              <div style={{ position: 'relative', zIndex: 1, opacity: note.id === 'CHAGO_CHEF_VLS' ? 0.5 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '900', color: note.color, textTransform: 'uppercase', border: `1px solid ${note.color}`, padding: '2px 8px', borderRadius: '4px' }}>
                        {note.cat}
                    </span>
                    <button style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none' }}><Share2 size={16}/></button>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>{note.titular}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>{note.bajada}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', position: 'relative', zIndex: 1, opacity: note.id === 'CHAGO_CHEF_VLS' ? 0.5 : 1 }}>
                 <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: note.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={16} color="white" />
                 </div>
                 <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 'bold' }}>{note.title}</span>
              </div>
              
              {note.id === 'CHAGO_CHEF_VLS' && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#f43f5e' }}>
                    <div style={{ background: '#f43f5e', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <span style={{ fontWeight: '900', letterSpacing: '2px', color: 'white' }}>BLOQUEADO</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedNote && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNote(null)}
              style={{ 
                position: 'fixed', 
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.95)', 
                zIndex: 2147483647,
                display: 'flex', 
                alignItems: 'flex-start',
                justifyContent: 'center', 
                padding: isMobile ? '0.5rem' : '3rem',
                overflowY: 'auto' 
              }}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  background: '#ffffff', 
                  width: '100%', 
                  maxWidth: '1200px', 
                  minHeight: '80vh',
                  borderRadius: isMobile ? '25px' : '45px',
                  position: 'relative', 
                  overflow: 'hidden',
                  margin: isMobile ? '1rem 0' : '4rem 0',
                  boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8)',
                  color: '#000000',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <button 
                  onClick={() => setSelectedNote(null)}
                  style={{ position: 'absolute', top: '25px', right: '25px', background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, color: '#334155' }}
                >
                  <X size={24} />
                </button>

                <div style={{ position: 'absolute', top: '25px', right: '90px', display: 'flex', gap: '8px', zIndex: 10 }}>
                   <button 
                    onClick={() => {
                        const shareUrl = `${window.location.origin}${window.location.pathname}?note=${selectedNote.id}`;
                        window.open(`https://wa.me/?text=${encodeURIComponent('Hemeroteca VLS: ' + selectedNote.titular + '. Lee aquí: ' + shareUrl)}`, '_blank')
                    }}
                    style={{ background: '#25D366', color: 'white', border: 'none', borderRadius: '50px', padding: '0 1rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', height: '50px', fontWeight: '900' }}
                   >
                     <Share2 size={20} /> COMPARTIR
                   </button>
                </div>

                <div style={{ padding: isMobile ? '1.5rem' : '4rem', paddingBottom: '6rem' }}>
                  <span style={{ color: selectedNote.color, fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>{selectedNote.cat}</span>
                  <h1 style={{ fontSize: 'clamp(1.8rem, 10vw, 4rem)', fontWeight: '900', margin: '1rem 0 2rem 0', lineHeight: '1', color: '#000' }}>{selectedNote.titular}</h1>
                  
                  <div style={{ background: '#f8fafc', padding: isMobile ? '1.5rem' : '3rem', borderRadius: '30px', marginBottom: '3rem', borderLeft: `10px solid ${selectedNote.color}`, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                    <p style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', fontWeight: 'bold', margin: 0, color: '#334155', lineHeight: '1.4' }}>{selectedNote.bajada}</p>
                  </div>

                  {selectedNote.id && !selectedNote.id.includes('VLS') && !selectedNote.id.includes('ESTUDIOS') && (
                    <div style={{ borderRadius: '35px', overflow: 'hidden', aspectRatio: '16/9', background: '#000', marginBottom: '4rem', boxShadow: '0 40px 80px -15px rgba(0, 0, 0, 0.6)', border: `6px solid ${selectedNote.color}30` }}>
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${selectedNote.id}${selectedNote.id.includes('?') ? '&' : '?'}autoplay=1&rel=0`} 
                        title={selectedNote.titular} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: !isMobile ? '2fr 1fr' : '1fr', gap: '4rem' }}>
                    <div style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', lineHeight: '1.8', color: '#0f172a' }}>
                      <h4 style={{ color: selectedNote.color, fontWeight: '900', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <BookOpen size={24}/> DESARROLLO DE LA ENTREVISTA
                      </h4>
                      <p style={{ whiteSpace: 'pre-wrap', color: '#0f172a' }}>{selectedNote.body}</p>
                      
                      <div style={{ marginTop: '3rem', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <div style={{ background: '#f1f5f9', padding: '1rem 1.5rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 'bold', color: '#475569' }}>
                          <Video size={20} /> Entrevista Master (TVLS)
                        </div>
                        <div style={{ background: '#f1f5f9', padding: '1rem 1.5rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 'bold', color: '#475569' }}>
                          <Mic size={20} /> Registro Sonoro VLSRADIO
                        </div>
                      </div>

                      {selectedNote.tacticalIcons && (
                        <div style={{ marginTop: '4rem' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: '900', letterSpacing: '2px', color: '#64748b', marginBottom: '2rem', textTransform: 'uppercase' }}>ICONOGRAFÍA TÁCTICA</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {selectedNote.tacticalIcons.map((item, i) => (
                              <div key={i} style={{ padding: '2rem', background: `${item.color}10`, borderRadius: '25px', border: `1px solid ${item.color}20`, display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ background: item.color, padding: '15px', borderRadius: '15px', color: 'white' }}>
                                  <item.icon size={28} />
                                </div>
                                <div>
                                  <div style={{ fontWeight: '900', fontSize: '1.1rem', color: '#0f172a' }}>{item.label}</div>
                                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>{item.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                      <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', padding: '2.5rem', borderRadius: '35px', border: `1px solid ${selectedNote.color}30`, textAlign: 'center' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: selectedNote.color, margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 15px 30px ${selectedNote.color}40`, border: '8px solid white' }}>
                          <User size={60} color="white" />
                        </div>
                        <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: '900' }}>{selectedNote.title}</h3>
                        <p style={{ color: selectedNote.color, fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '10px' }}>
                          { (selectedNote.title.includes('Jorge') || selectedNote.title.includes('Fernando')) ? 'Invitado Estelar' : 
                            (selectedNote.title.includes('Grupo') || selectedNote.title.includes('Vikings')) ? 'Invitados Estelares' : 
                            'Invitada Estelar' }
                        </p>
                      </div>

                      <div style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '35px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-15px', left: '-15px', opacity: 0.1 }}>
                          <Quote size={120} color={selectedNote.color} />
                        </div>
                        <h4 style={{ color: selectedNote.color, fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1.5rem', position: 'relative' }}>TESTIMONIO VLS</h4>
                        <p style={{ fontSize: '1.4rem', fontWeight: '600', fontStyle: 'italic', margin: 0, position: 'relative', lineHeight: '1.5' }}>
                          "{selectedNote.cita}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
