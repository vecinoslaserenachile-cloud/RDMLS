import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Play, Pause, Map, Sun, Radio, Newspaper, Video, Users, Home, Share2
} from 'lucide-react';

const VLS_DATA = {
    radioStream: "https://az11.yesstreaming.net:8630/radio.mp3",
    logo: "/vls_logo_3d_premium_1773521409747.png",
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
            body: "La historia de Los Vikings 5 no es solo una biografía musical, es el relato antropológico de Coquimbo. Todo comenzó en 1969, en el sector de El Llano, cuando Juan Núñez decidió que la cumbia no tenía por qué ser interpretada solo con orquestas de viento. Inspirados por el rock and roll que llegaba al puerto, tomaron la decisión radical de incorporar la guitarra eléctrica como voz principal.\n\nCapítulo 1: El Sonido del Chinchinero Eléctrico. La guitarra de los Vikings imita la alegría y la urgencia del puerto. No busca la perfección académica, busca el baile. Temas como 'El Minero' o 'De Coquimbo soy' se convirtieron en himnos que trascienden clases sociales.\n\nCapítulo 2: La Dinastía Núñez. Tras la partida de los fundadores, la segunda y tercera generación, liderada hoy por Ángel Núñez, ha mantenido el buque a flote. La autogestión ha sido su bandera: grabar, producir y distribuir desde la región, sin depender de Santiago.\n\nCapítulo 3: Patrimonio Vivo. Hoy, los Vikings 5 son considerados Tesoro Humano Vivo de facto. Su presencia en la Pampilla es un rito anual obligatorio, y su capacidad de reinventarse sin perder la esencia los mantiene vigentes en los escenarios más grandes de Chile.",
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
        },
        { 
            id: "IPeBSr9Tuq4", type: "ENTREVISTA", cat: "OFICIOS", title: "Mónica Sierra", 
            titular: "Batik en el Elqui: Los Colores de Indonesia en el Desierto", 
            bajada: "Mónica Sierra ha creado un puente cultural único, pintando sedas con cera de abeja y pigmentos inspirados en el valle.", 
            body: "En Pisco Elqui, el arte textil tiene un nombre: Batik. Mónica Sierra ha dedicado décadas a perfeccionar esta técnica milenaria indonesia, adaptándola a la paleta cromática del norte de Chile.\n\nCapítulo 1: La Técnica de la Reserva. El Batik consiste en dibujar con cera caliente sobre tela para reservar zonas que no se teñirán. Es un proceso de capas, paciencia y temperatura, donde el error no existe, solo el aprendizaje.\n\nCapítulo 2: Embajadora Cultural. Su maestría es tal que ha sido reconocida por la Embajada de Indonesia, convirtiéndose en un vínculo vivo entre el sudeste asiático y el Valle del Elqui.\n\nCapítulo 3: Arte Terapéutico. Para Mónica, el Batik es meditación en acción. Los talleres que imparte no solo enseñan a teñir, sino a observar los colores del cerro, a respetar los tiempos de secado y a encontrar silencio interior en el proceso creativo.",
            mensaje: "El arte manual es una medicina para el alma moderna.", contacto: "@elqui_colores_batik", cita: "La cera guarda el secreto de la luz y el color." 
        },
        { 
            id: "lgjba4j0Afo", type: "ENTREVISTA", cat: "URBANISMO", title: "Paulina Godoy", 
            titular: "El Renacer del Culebrón: Un Plan Maestro para Coquimbo", 
            bajada: "La arquitecta Paulina Godoy presenta una visión audaz: transformar el humedal degradado en el gran parque urbano de la región.", 
            body: "El Culebrón ha sido históricamente el patio trasero de Coquimbo. Paulina Godoy propone dar vuelta la ciudad para mirar de frente a su humedal. Su Plan Maestro es una hoja de ruta hacia la sostenibilidad urbana.\n\nHito 1: Infraestructura Verde. En lugar de muros de contención de hormigón, Godoy diseña parques inundables y bordes blandos que absorben la energía de las marejadas, protegiendo la ciudad de forma inteligente.\n\nHito 2: Justicia Territorial. Coquimbo carece de áreas verdes de calidad. Este proyecto busca democratizar el acceso a la naturaleza, entregando un espacio digno para el deporte y la recreación familiar en el corazón de la comuna.\n\nHito 3: Conectividad Biológica y Social. El parque no solo une ecosistemas; une barrios. Es una costura urbana que pretende sanar la cicatriz que hoy separa a la ciudad de su patrimonio natural.",
            mensaje: "El espacio público de calidad es un derecho, no un lujo.", contacto: "paulinagodoy.arq", cita: "El Culebrón es el pulmón que Coquimbo necesita para respirar futuro." 
        },
        { 
            id: "hdVC1pCSeJ4", type: "ENTREVISTA", cat: "DEPORTE", title: "Antonia Rodríguez", 
            titular: "Antonia Rodríguez: Pasión XCO entre la Gloria y el Abandono", 
            bajada: "Tiene 17 años y es potencia sudamericana, pero debe entrenar esquivando basura en los cerros de La Serena.", 
            body: "La historia de Antonia Rodríguez es la de muchos deportistas regionales: talento de sobra, apoyo a cuentagotas. Especialista en Mountain Bike Cross Country (XCO), lleva la bandera de la región a podios internacionales.\n\nCapítulo 1: El Peso de la Bicicleta. Antonia relata el sacrificio familiar que implica competir en alto rendimiento. Sin un apoyo estatal robusto, cada viaje y cada repuesto sale del bolsillo de sus padres.\n\nCapítulo 2: Entrenar en un Basural. Es la paradoja más dolorosa: una atleta de élite que debe trazar rutas entre escombros y vertederos ilegales en los cerros de La Serena, ante la falta de espacios habilitados.\n\nCapítulo 3: El Sueño del Bike Park. Su demanda es clara y urgente: La Serena necesita un Bike Park público. No solo para ella, sino para las cientos de niñas y niños que ven en el ciclismo una salida y una pasión. Su voz es un llamado de atención a las autoridades.",
            mensaje: "No queremos más medallas si no hay dignidad para entrenar.", contacto: "@antonia_xco", cita: "La pasión me mueve, pero la basura en los cerros me frena." 
        },
        { 
            id: "y2cUZXfk46E", type: "ENTREVISTA", cat: "CIENCIA", title: "Andrea Torrejón", 
            titular: "Cosechando Nubes: La Ciencia de los Atrapanieblas ULS", 
            bajada: "Andrea Torrejón, física de la ULS, lidera la innovación en mallas para capturar el 'río aéreo' de la camanchaca.", 
            body: "En una región asediada por la sequía, mirar al cielo es una necesidad. Andrea Torrejón y su equipo en la Universidad de La Serena han perfeccionado la tecnología para 'ordeñar' las nubes costeras.\n\nCapítulo 1: El Río Aéreo. Torrejón explica que sobre nuestras cabezas pasan millones de litros de agua en forma de niebla. El desafío no es encontrar el agua, es atraparla eficientemente.\n\nCapítulo 2: Ingeniería Textil. Las nuevas mallas desarrolladas por la ULS aumentan exponencialmente la superficie de contacto, logrando capturar mucha más agua por metro cuadrado que los diseños antiguos.\n\nCapítulo 3: Impacto Social. No es ciencia de laboratorio; es ciencia humanitaria. Esta agua abastece a comunidades rurales del secano costero, huertos familiares y proyectos de reforestación, devolviendo la esperanza a zonas donde los pozos se secaron hace años.",
            mensaje: "La ciencia regional debe resolver los dolores del territorio.", contacto: "Facultad de Ciencias ULS", cita: "El agua está ahí, en el aire; solo debemos aprender a pedirla." 
        },
        { 
            id: "B3xxKc6Y3eo", type: "ENTREVISTA", cat: "VIVIENDA", title: "Daniela Olmos", 
            titular: "Casas que Respiran: La Revolución de la Lana de Oveja", 
            bajada: "Daniela Olmos está cambiando la cara de la vivienda social usando aislamiento natural y diseño bioclimático.", 
            body: "Para Daniela Olmos, la pobreza energética es un problema de diseño, no de recursos. Su propuesta arquitectónica busca dignificar la vivienda social utilizando lo que el valle nos da.\n\nCapítulo 1: El Abrigo de la Oveja. Olmos utiliza lana de oveja local, lavada y tratada, como aislante en los muros. Es un material ignífugo, regulador de humedad y con una capacidad térmica superior a la fibra de vidrio sintética.\n\nCapítulo 2: Diseño Pasivo. No se trata solo de materiales, sino de orientación. Ventanas al norte, aleros calculados y ventilación cruzada permiten que las casas se calienten solas en invierno y se enfríen en verano.\n\nCapítulo 3: Derecho Derecho al Confort. Su mensaje es político: vivir sin frío y sin hongos no debería ser un lujo de ricos. La arquitectura bioclimática es una herramienta de justicia social que mejora la salud y la economía de las familias más vulnerables.",
            mensaje: "Una casa digna es una casa que cuida a quien la habita.", contacto: "@danielaolmos.arq", cita: "La tecnología más avanzada es volver a mirar la naturaleza." 
        },
        { 
            id: "Y2KW_QhGj5I", type: "ENTREVISTA", cat: "SALUD", title: "Loreto Narbona", 
            titular: "Volver a la Feria: Nutrición, Economía y Comunidad", 
            bajada: "La nutricionista Loreto Narbona nos invita a recuperar la soberanía alimentaria comprando en el barrio.", 
            body: "En tiempos de alimentos ultraprocesados, Loreto Narbona levanta la bandera de la comida real. Su enfoque conecta la salud del cuerpo con la salud del territorio.\n\nCapítulo 1: La Huella Hídrica. Comer una palta local gasta menos agua y energía que una importada. Narbona nos enseña a comer con conciencia ecológica, eligiendo productos de temporada que no han viajado miles de kilómetros.\n\nCapítulo 2: La Feria como Farmacia. Frutas, verduras y legumbres son la verdadera medicina preventiva. Loreto desmitifica que comer sano sea caro; lo caro es el supermercado, la feria es economía y calidad.\n\nCapítulo 3: Batch Cooking. Ante la falta de tiempo, propone técnicas de cocina por lotes. Cocinar un día para toda la semana, recuperando la mesa familiar y alejándonos de la comida rápida que enferma a la región.",
            mensaje: "Tu tenedor es un voto por el mundo que quieres construir.", contacto: "@lorenutri", cita: "La salud empieza en el canasto de la feria, no en la farmacia." 
        },
        { 
            id: "IUPiyBw6eSQ", type: "ENTREVISTA", cat: "CIENCIA", title: "Camila Beltrand", 
            titular: "La Cruzada por la Noche: Defendiendo el Derecho a las Estrellas", 
            bajada: "Camila Beltrand lidera la lucha contra la contaminación lumínica para salvar nuestros cielos y nuestra salud.", 
            body: "Somos la 'Región Estrella', pero estamos apagando el universo. Camila Beltrand, desde la Oficina de Protección de la Calidad del Cielo (OPCC), nos alerta sobre una amenaza invisible: la luz artificial descontrolada.\n\nCapítulo 1: La Amenaza LED. La proliferación de luces blancas frías en las ciudades está creando un halo de brillo que ciega a los observatorios científicos internacionales instalados en nuestros cerros.\n\nCapítulo 2: Más allá de la Astronomía. No es solo ciencia; es biología. La luz intrusiva altera el sueño humano, afecta la polinización de insectos y desorienta a las aves migratorias. Perder la noche es perder salud.\n\nCapítulo 3: La Nueva Norma. Beltrand explica los esfuerzos por fiscalizar y cambiar las luminarias públicas hacia tonos cálidos y dirigidos al suelo. Proteger el cielo es un deber patrimonial de todos los habitantes de Coquimbo.",
            mensaje: "Apaga la luz innecesaria y enciende las estrellas.", contacto: "Oficina OPCC", cita: "El cielo oscuro es un patrimonio en peligro de extinción." 
        },
        { 
            id: "jWmaGafzEuk", type: "ENTREVISTA", cat: "SOCIEDAD", title: "Camila Sabando", 
            titular: "Mujeres del Campo: La Columna Vertebral Invisible del Valle", 
            bajada: "Camila Sabando visibiliza la doble jornada y la precariedad de las trabajadoras rurales en el Elqui.", 
            body: "El Valle del Elqui es verde gracias a manos de mujer. Camila Sabando, Seremi de la Mujer, pone en cifras y palabras la realidad de las temporeras y cuidadoras rurales.\n\nCapítulo 1: La Doble Jornada. La mujer rural se levanta antes del alba para dejar el hogar listo, trabaja bajo el sol en la cosecha y vuelve a iniciar un second turno de cuidados domésticos no remunerados.\n\nCapítulo 2: Estacionalidad y Precariedad. El trabajo de temporada genera lagunas previsionales y desprotección de salud. Sabando aborda los desafíos de formalizar y dignificar esta labor esencial para la economía exportadora.\n\nCapítulo 3: Liderazgo Silencioso. A pesar de las barreras, las mujeres son las principales dirigentes vecinales y de agua potable rural. El futuro del valle depende de empoderar a quienes sostienen la vida en el territorio.",
            mensaje: "Sin las mujeres, el campo se detiene.", contacto: "Seremi de la Mujer y EG", cita: "La economía rural tiene rostro de mujer y manos curtidas." 
        },
        // HEMEROTECA DIGITAL (vecinoslaserena.digitalpress.blog)
        { 
            id: "CHAGO_CHEF_VLS", type: "CRÓNICA", cat: "SOCIAL", title: "Chago de Santiago", 
            titular: "Crónicas del Puré de El Billete: ¡Grande Chago!", 
            bajada: "El primo Chago nos cuenta por videollamada los secretos de la cocina presidencial y el misterioso gusto a mariscos.", 
            body: "En una videollamada que sacudió los grupos de WhatsApp vecinales, Chago (el primo de Santiago que oficia de chef en el Palacio de El Billete) compartió las últimas 'papitas' del poder. \n\nCapítulo 1: El Chef Presidencial. Trabajando bajo la mirada de los nuevos jefes, nuestro vecino relata cómo la jefa misma decidió ponerse el delantal para cocinar ante todos. ¿El problema? La falta de protocolos básicos: ni guantes ni mascarilla, lo que motivó una denuncia inmediata a Contraloría por parte del diputado de Coquimbo (el de ojitos azules), siempre atento a la higiene republicana.\n\nCapítulo 2: El Misterio del Puré con Gusto a Mar. El momento más hilarante fue cuando los funcionarios se quejaron de que el puré con carne tenía un inconfundible sabor a pescados y mariscos. \n\nCapítulo 3: Jueves de Pololeo. Entre risas, Chago recordó que la noche anterior había sido 'Jueves de Pololeo' para los jefes, quienes a pesar de su perfil muy 'Opus Dei', parecen haber disfrutado de una cena marina que dejó huellas imborrables en los utensilios del palacio. Como bien dice Chago: 'el chiste se cuenta solo'.",
            mensaje: "Humor y política en la mesa de todos los chilenos.", contacto: "Videollamada Privada VLS (Chago)", cita: "El puré con carne no miente, los jefes sí." 
        },
        { 
            id: "Heme1", type: "PRENSA", cat: "COMUNIDAD", title: "Hemeroteca VLS", 
            titular: "Positivo balance tras las lluvias en La Serena: no hubo afectaciones graves", 
            bajada: "Autoridades y equipos de emergencia evalúan el impacto del sistema frontal en la comuna.", 
            body: "Tras el paso del sistema frontal que afectó a la zona centro-norte del país, la ciudad de La Serena presenta un balance positivo. Gracias a los trabajos preventivos de limpieza de sumideros y cauces, no se registraron inundaciones mayores en sectores críticos como la Avenida del Mar o el centro histórico.\n\nSin embargo, se reitera el llamado a los vecinos a mantener despejadas las bajadas de agua de sus techumbres y a evitar transitar por zonas de anegamiento temporal. El municipio continúa monitoreando los puntos sensibles para garantizar la conectividad de todos los barrios.",
            mensaje: "La prevención es tarea de todos los vecinos.", contacto: "Emergencias VLS", cita: "La ciudad resistió bien gracias a la preparación anticipada." 
        },
        { 
            id: "Heme2", type: "PRENSA", cat: "SEGURIDAD", title: "Hemeroteca VLS", 
            titular: "Gestión y seguridad en municipios: ¿Qué es el Sistema Nacional de Seguridad Municipal?", 
            bajada: "Una nueva herramienta para fortalecer la prevención del delito a nivel local.", 
            body: "El Sistema Nacional de Seguridad Municipal es una iniciativa que busca estandarizar y financiar proyectos de seguridad en las 345 comunas de Chile. Para La Serena, esto significa más recursos para luminarias, cámaras de televigilancia de última generación y patrullajes preventivos en sectores rurales y urbanos.\n\nEl objetivo es que los municipios dejen de competir por fondos concursables y cuenten con un financiamiento base para la prevención, permitiendo una planificación a largo plazo en conjunto con Carabineros y la PDI.",
            mensaje: "Más recursos para una ciudad más segura.", contacto: "Seguridad Ciudadana LS", cita: "La seguridad parte por el barrio y la gestión municipal." 
        },
        { 
            id: "Heme3", type: "PRENSA", cat: "CULTURA", title: "Hemeroteca VLS", 
            titular: "Municipio prepara versión 38 de feria del libro con temática en el patrimonio de La Serena", 
            bajada: "El evento literario más importante del norte de Chile vuelve a la Plaza de Armas.", 
            body: "La Feria del Libro de La Serena llega a su edición número 38 con un enfoque especial en el rescate del patrimonio arquitectónico y humano. Escritores locales y nacionales se darán cita para discutir la identidad serenense a través de las letras.\n\nEl evento contará con zonas de lectura para niños, talleres de encuadernación artesanal y una muestra especial de la hemeroteca histórica de la región, destacando el rol de los diarios tradicionales en la construcción de la memoria colectiva.",
            mensaje: "Leer es viajar por nuestra propia historia.", contacto: "Cultura La Serena", cita: "La plaza se llena de libros y memoria patrimonial." 
        },
        { 
            id: "Heme4", type: "PRENSA", cat: "BARRIO", title: "Hemeroteca VLS", 
            titular: "Vecinos felices con anuncio de pavimentación de Braulio Arenas y Rodolfo Wagenknecht", 
            bajada: "Un anhelado proyecto vial que mejora la conectividad en el sector alto de la ciudad.", 
            body: "En una concurrida reunión organizada por la JJVV Serena Oriente, se anunció el inicio de las obras de pavimentación para las calles Braulio Arenas, Alberto Arenas y Rodolfo Wagenknecht. La noticia fue recibida con alegría por los vecinos, quienes por años convivieron con el polvo y las dificultades de acceso.\n\nEste proyecto no solo mejora la estética del barrio, sino que aumenta la plusvalía de las viviendas y facilita el tránsito del transporte público y servicios de emergencia, integrando de mejor manera al sector alto con el resto de la conurbación.",
            mensaje: "La pavimentación es dignidad para nuestros barrios.", contacto: "JJVV Serena Oriente", cita: "Por fin diremos adiós al polvo en nuestras calles." 
        },
        { 
            id: "Heme5", type: "PRENSA", cat: "TRADICIÓN", title: "Hemeroteca VLS", 
            titular: "Vuelven las tertulias de tango a La Serena", 
            bajada: "El ritmo del 2x4 recupera su espacio en los salones patrimoniales de la ciudad.", 
            body: "La Serena tiene una larga tradición tanguera que se niega a desaparecer. Los amantes del tango vuelven a reunirse en tertulias que combinan música en vivo, baile y nostalgia en los tradicionales clubes del centro.\n\nEstas instancias buscan no solo la entretención, sino también transmitir la pasión por este género a las nuevas generaciones, manteniendo vivos los pasos y la elegancia que caracterizaron las noches serenenses de antaño.",
            mensaje: "El tango es un abrazo que une generaciones.", contacto: "Amigos del Tango LS", cita: "El 2x4 sigue latiendo en el corazón de La Serena." 
        }
    ],
    destinos: [
        {n:"Santiago", d:472}, {n:"Arica", d:1610}, {n:"Concepción", d:960}, {n:"Puerto Montt", d:1500}, 
        {n:"Mendoza", d:680}, {n:"Buenos Aires", d:1490}, {n:"Vicuña", d:62}, {n:"Ovalle", d:86}
    ]
};

export default function LegacyVLSAppendix({ onClose }) {
    const navigate = useNavigate();
    const [mode, setMode] = useState('news');
    const [subMenus, setSubMenus] = useState({ music: false, vecinas: false });
    const [activeVideo, setActiveVideo] = useState(null);
    const [activePaperIdx, setActivePaperIdx] = useState(0);
    const [isPlayingRadio, setIsPlayingRadio] = useState(false);
    const [weather, setWeather] = useState({ temp: '--', icon: '☀️', desc: 'Despejado' });
    const [clock, setClock] = useState('');
    const [pharmacy, setPharmacy] = useState('CONSULTANDO...');
    const [routeTarget, setRouteTarget] = useState('Santiago');
    const audioRef = useRef(null);

    useEffect(() => {
        // Init Audio
        if (!audioRef.current) {
            audioRef.current = new Audio(VLS_DATA.radioStream);
        }
        
        // Clock
        const interval = setInterval(() => {
            setClock(new Date().toLocaleTimeString('es-CL', { hour12: false }));
        }, 1000);

        // Weather Setup
        fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.9027&longitude=-71.2519&current_weather=true&timezone=auto')
            .then(res => res.json())
            .then(data => {
                const w = data.current_weather;
                let ic = "☀️"; let de = "Despejado";
                if(w.weathercode > 0 && w.weathercode <= 3) { ic = "☁️"; de = "Nublado"; }
                else if(w.weathercode >= 45 && w.weathercode <= 48) { ic = "🌫️"; de = "Niebla"; }
                else if(w.weathercode >= 51) { ic = "🌧️"; de = "Lluvia"; }
                else if(w.is_day === 0) { ic = "🌙"; } 
                setWeather({ temp: Math.round(w.temperature), icon: ic, desc: de });
            })
            .catch(() => {});

        // Pharmacies Mock (Proxy might fail in browser)
        fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://farmanet.minsal.cl/maps/index.php/ws/getLocalesTurnos"))
            .then(res => res.json())
            .then(data => {
                const lista = JSON.parse(data.contents);
                const farmaciasLS = lista.filter(f => f.local_comuna_nombre.trim().toUpperCase() === "LA SERENA");
                if (farmaciasLS.length > 0) {
                    setPharmacy(`${farmaciasLS[0].local_nombre} (${farmaciasLS[0].local_direccion})`);
                }
            }).catch(() => setPharmacy("FARMACIA CRUZ VERDE (BAMA - 24HRS)"));

        // Default news init
        setActiveVideo(VLS_DATA.items[0]);

        return () => {
            clearInterval(interval);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeAttribute('src');
                audioRef.current.load();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleRadio = () => {
        if (!audioRef.current) return;
        if (isPlayingRadio) {
            audioRef.current.pause();
            setIsPlayingRadio(false);
        } else {
            audioRef.current.play();
            setIsPlayingRadio(true);
            setMode('radio');
        }
    };

    const handleSelectVideo = (item) => {
        if (isPlayingRadio) toggleRadio();
        setActiveVideo(item);
        setMode('video');
    };

    const handleSelectNews = (idx) => {
        if (isPlayingRadio) toggleRadio();
        setActivePaperIdx(idx);
        setActiveVideo(VLS_DATA.items[idx]);
        setMode('news');
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            background: 'radial-gradient(circle at top right, #aa0000 0%, #220000 60%, #000 100%)',
            color: 'white',
            fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1fr) 2fr minmax(350px, 1fr)',
            gridTemplateRows: '85px 1fr 90px',
            gap: '15px',
            padding: '15px',
            boxSizing: 'border-box'
        }} className="vls-dashboard">

            {/* HEADER */}
            <div style={{ gridColumn: '1 / -1', background: 'rgba(10, 10, 10, 0.98)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px' }}>
                <div style={{ height: '70px', display: 'flex', alignItems: 'center' }}>
                    <img src={VLS_DATA.logo} alt="Vecinos VLS Logo" style={{ height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }} />
                </div>
                
                <div style={{ flexGrow: 1, margin: '0 30px', height: '45px', background: '#000', border: '1px solid #333', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)' }}>
                    <span style={{ color: '#0f0', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1rem', letterSpacing: '2px' }} className="animate-pulse">
                        LA SERENA {weather.temp}°C {weather.icon} | {pharmacy}
                    </span>
                </div>

                <button 
                    onClick={() => {
                        if (onClose) onClose();
                        else {
                            localStorage.removeItem('smart_tenant');
                            navigate('/welcome');
                        }
                    }}
                    style={{ background: '#ff0000', color: 'white', border: '2px solid white', borderRadius: '8px', padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer', zIndex: 100 }}
                >
                    SALIR AL DASHBOARD
                </button>
            </div>

            {/* SIDEBAR LEFT (MENUS) */}
            <div style={{ background: 'rgba(10, 10, 10, 0.98)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px', padding: '20px', overflowY: 'auto' }}>
                
                <div 
                    onClick={() => setMode('news')} 
                    style={{ background: mode === 'news' ? '#ff0000' : 'linear-gradient(to bottom, #880000, #330000)', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', marginBottom: '10px', border: '2px solid', borderColor: mode === 'news' ? '#fff' : '#ff4d4d', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <Newspaper size={20} /> CONTENIDOS VLS
                </div>

                <div 
                    onClick={() => setSubMenus({...subMenus, music: !subMenus.music})} 
                    style={{ background: 'linear-gradient(to bottom, #880000, #330000)', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', marginBottom: '10px', border: '2px solid #ff4d4d', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <Video size={20} /> SESIONES MUSICALES
                </div>
                {subMenus.music && (
                    <div style={{ paddingLeft: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {VLS_DATA.items.filter(i => i.type === 'MÚSICA').map(v => (
                            <div key={v.id} onClick={() => handleSelectVideo(v)} style={{ color: activeVideo?.id === v.id ? '#ffcc00' : '#ccc', padding: '8px', fontSize: '0.85rem', cursor: 'pointer', borderRadius: '4px', background: activeVideo?.id === v.id ? 'rgba(255,204,0,0.1)' : 'transparent', borderLeft: activeVideo?.id === v.id ? '3px solid #ffcc00' : '3px solid transparent' }}>
                                {v.title}
                            </div>
                        ))}
                    </div>
                )}

                <div 
                    onClick={() => setSubMenus({...subMenus, vecinas: !subMenus.vecinas})} 
                    style={{ background: 'linear-gradient(to bottom, #880000, #330000)', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', marginBottom: '10px', border: '2px solid #ff4d4d', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <Users size={20} /> VOCES VECINALES
                </div>
                {subMenus.vecinas && (
                    <div style={{ paddingLeft: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {VLS_DATA.items.filter(i => i.type === 'ENTREVISTA').map(v => (
                            <div key={v.id} onClick={() => handleSelectVideo(v)} style={{ color: activeVideo?.id === v.id ? '#ffcc00' : '#ccc', padding: '8px', fontSize: '0.85rem', cursor: 'pointer', borderRadius: '4px', background: activeVideo?.id === v.id ? 'rgba(255,204,0,0.1)' : 'transparent', borderLeft: activeVideo?.id === v.id ? '3px solid #ffcc00' : '3px solid transparent' }}>
                                {v.title}
                            </div>
                        ))}
                    </div>
                )}

                <div 
                    onClick={() => { setMode('radio'); if(!isPlayingRadio) toggleRadio(); }} 
                    style={{ background: mode === 'radio' ? '#ff0000' : 'linear-gradient(to bottom, #880000, #330000)', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', marginBottom: '10px', border: '2px solid', borderColor: mode === 'radio' ? '#fff' : '#ff4d4d', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <Radio size={20} /> RADIO VLS EN VIVO
                </div>

                <div 
                    onClick={() => setMode('routes')} 
                    style={{ background: mode === 'routes' ? '#ff0000' : 'linear-gradient(to bottom, #880000, #330000)', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', marginBottom: '10px', border: '2px solid', borderColor: mode === 'routes' ? '#fff' : '#ff4d4d', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <Map size={20} /> RUTAS Y LOGÍSTICA
                </div>

                <div 
                    onClick={() => setMode('meteo')} 
                    style={{ background: mode === 'meteo' ? '#ff0000' : 'linear-gradient(to bottom, #880000, #330000)', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', marginBottom: '10px', border: '2px solid', borderColor: mode === 'meteo' ? '#fff' : '#ff4d4d', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    <Sun size={20} /> CLIMA Y MAR
                </div>

            </div>

            {/* MAIN STAGE */}
            <div style={{ background: '#000', border: '3px solid rgba(255,255,255,0.25)', borderRadius: '20px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                
                {mode === 'video' && activeVideo && (
                    <iframe 
                        src={`https://www.youtube.com/embed/${activeVideo.id.split('?')[0]}?autoplay=1&modestbranding=1&rel=0&controls=1`} 
                        style={{ position: 'absolute', width: '100%', height: '100%', border: 'none' }} 
                        allow="autoplay; encrypted-media" 
                        allowFullScreen 
                    />
                )}

                {mode === 'radio' && (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <iframe src={`https://maps.google.com/maps?saddr=La+Serena&daddr=${encodeURIComponent(VLS_DATA.landmarks[0].q)}&t=k&z=15&output=embed`} style={{ position: 'absolute', width: '100%', height: '100%', border: 'none' }} allow="autoplay"></iframe>
                        <div style={{ position: 'absolute', bottom: '40px', left: '40px', background: 'rgba(0,0,0,0.85)', padding: '20px', borderLeft: '8px solid #f00', borderRadius: '8px' }}>
                            <b style={{ fontSize: '0.9rem', color: '#ffcc00', textTransform: 'uppercase' }}>Vigilancia Sentinel (Cámara Simulada)</b>
                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white' }}>{VLS_DATA.landmarks[0].n}</div>
                        </div>
                    </div>
                )}

                {mode === 'news' && activeVideo && (
                    <div style={{ background: '#111', padding: '50px', height: '100%', overflowY: 'auto', borderLeft: '10px solid #f00', width: '100%', boxSizing: 'border-box' }}>
                        <span style={{ color: '#f00', fontWeight: '900', letterSpacing: '4px' }}>CONTENIDOS VLS</span>
                        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: '3rem', margin: '20px 0', color: 'white' }}>{activeVideo.titular}</h1>
                        <img src={`https://img.youtube.com/vi/${activeVideo.id.split('?')[0]}/maxresdefault.jpg`} style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', marginBottom: '40px', borderRadius: '8px', border: '1px solid #333' }} />
                        <div style={{ columnCount: 2, columnGap: '40px', fontFamily: "'Georgia', serif", fontSize: '1.2rem', lineHeight: 1.7, color: '#eee', whiteSpace: 'pre-line' }}>
                            {activeVideo.body}
                        </div>
                        <div style={{ borderLeft: '4px solid #ffcc00', paddingLeft: '20px', margin: '40px 0', fontSize: '1.5rem', fontStyle: 'italic', color: '#ffcc00', fontFamily: "'Georgia', serif" }}>
                            "{activeVideo.cita}"
                        </div>
                    </div>
                )}

                {mode === 'routes' && (
                    <iframe src={`https://maps.google.com/maps?saddr=La+Serena&daddr=${encodeURIComponent(routeTarget)}&t=m&output=embed`} style={{ position: 'absolute', width: '100%', height: '100%', border: 'none' }} />
                )}

                {mode === 'meteo' && (
                    <iframe src="https://www.heavens-above.com/AllSats.aspx?lat=-29.9064&lng=-71.246&loc=La_Serena&alt=0&tz=Chile" style={{ filter: 'invert(1) hue-rotate(110deg) brightness(0.7)', width: '100%', height: '100%', border: 'none' }} />
                )}

            </div>

            {/* SIDEBAR RIGHT (DYNAMIC INFO) */}
            <div style={{ background: 'rgba(10, 10, 10, 0.98)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '20px', background: '#151515', borderBottom: '2px solid #ff0000', textAlign: 'center' }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: '900', fontFamily: 'monospace', color: 'white' }}>{clock || '--:--:--'}</div>
                    <div style={{ color: '#ffcc00', fontWeight: 'bold' }}>LA SERENA</div>
                    <div style={{ fontSize: '1.2rem', color: 'white', marginTop: '5px' }}>{weather.icon} <b style={{ color: '#ffcc00' }}>{weather.temp}°C</b> {weather.desc}</div>
                </div>

                <div style={{ flexGrow: 1, padding: '25px', overflowY: 'auto' }}>
                    {mode === 'news' && (
                        <div>
                            <h3 style={{ color: '#f00', fontWeight: '900', borderBottom: '1px solid #333', paddingBottom: '10px', textTransform: 'uppercase' }}>Archivo Editorial</h3>
                            {VLS_DATA.items.map((it, idx) => (
                                <div key={idx} onClick={() => handleSelectNews(idx)} style={{ padding: '15px', borderBottom: '1px solid #333', cursor: 'pointer', background: activePaperIdx === idx ? 'rgba(255,0,0,0.1)' : 'transparent' }}>
                                    <div style={{ fontSize: '1rem', color: 'white', fontWeight: activePaperIdx === idx ? 'bold' : 'normal' }}>{it.titular}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {(mode === 'video' && activeVideo) && (
                        <div className="animate-fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ fontSize: '0.7rem', color: '#ff0000', fontWeight: '900', textTransform: 'uppercase', border: '1px solid #ff0000', padding: '2px 6px', borderRadius: '4px' }}>
                                    {activeVideo.type} | {activeVideo.cat}
                                </span>
                            </div>
                            <h2 style={{ fontSize: '1.8rem', margin: '0 0 15px 0', fontFamily: "'Georgia', serif", color: 'white' }}>{activeVideo.titular}</h2>
                            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', lineHeight: 1.5, color: '#ccc' }}>{activeVideo.bajada}</p>
                            
                            <div style={{ background: '#111', padding: '20px', border: '1px solid #222', borderRadius: '8px', marginTop: '30px' }}>
                                <b style={{ color: '#ff0000', fontSize: '0.8rem', letterSpacing: '1px', display: 'block', marginBottom: '5px' }}>CONTACTO OFICIAL</b>
                                <span style={{ fontSize: '0.9rem', color: 'white' }}>{activeVideo.contacto}</span>
                            </div>
                        </div>
                    )}

                    {mode === 'radio' && (
                        <div className="animate-fade-in">
                            <h2 style={{ color: '#ff0000', fontSize: '1.5rem', marginBottom: '15px' }}>RADIO VLS EN VIVO</h2>
                            <div style={{ background: '#111', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ffcc00', marginBottom: '20px' }}>
                                <b style={{ color: '#ffcc00', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Farmacia de Turno (Minsal)</b>
                                <p style={{ color: 'white', marginTop: '8px', fontSize: '0.9rem' }}>{pharmacy}</p>
                            </div>
                            <div style={{ background: '#111', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                                <b style={{ color: '#3b82f6', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Informe Marítimo (Directemar)</b>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', marginTop: '10px', fontSize: '0.9rem' }}>
                                    <span>Puerto Coquimbo:</span><span style={{ color: '#10b981', fontWeight: 'bold' }}>ABIERTO</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', marginTop: '5px', fontSize: '0.9rem' }}>
                                    <span>Marejadas:</span><span style={{ color: '#f59e0b', fontWeight: 'bold' }}>VIGENTE (SW)</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === 'routes' && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '15px' }}>NAVEGACIÓN LOGÍSTICA</h2>
                            <input 
                                type="text" 
                                value={routeTarget}
                                onChange={(e) => setRouteTarget(e.target.value)}
                                style={{ background: '#111', border: '1px solid #444', color: 'white', padding: '15px', width: '100%', borderRadius: '4px', marginBottom: '15px', boxSizing: 'border-box' }}
                            />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '15px' }}>
                                {VLS_DATA.destinos.map(d => (
                                    <button 
                                        key={d.n} 
                                        onClick={() => setRouteTarget(d.n)}
                                        style={{ background: '#1a1a1a', border: '1px solid #333', padding: '8px 12px', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                                    >
                                        {d.n}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {mode === 'meteo' && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '15px' }}>CENTRO METEOROLÓGICO</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div style={{ background: '#111', padding: '10px', borderRadius: '4px', textAlign: 'center', border: '1px solid #222' }}>
                                    <b style={{ color: '#ffcc00', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block' }}>Viento</b>
                                    <span style={{ color: 'white', fontSize: '0.9rem' }}>14 km/h SW</span>
                                </div>
                                <div style={{ background: '#111', padding: '10px', borderRadius: '4px', textAlign: 'center', border: '1px solid #222' }}>
                                    <b style={{ color: '#ffcc00', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block' }}>UV Playa</b>
                                    <span style={{ color: 'white', fontSize: '0.9rem' }}>11+ (Extremo)</span>
                                </div>
                                <div style={{ background: '#111', padding: '10px', borderRadius: '4px', textAlign: 'center', border: '1px solid #222' }}>
                                    <b style={{ color: '#ffcc00', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block' }}>Puesta Sol</b>
                                    <span style={{ color: 'white', fontSize: '0.9rem' }}>20:34 hrs</span>
                                </div>
                                <div style={{ background: '#111', padding: '10px', borderRadius: '4px', textAlign: 'center', border: '1px solid #222' }}>
                                    <b style={{ color: '#ffcc00', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block' }}>Mareas</b>
                                    <span style={{ color: 'white', fontSize: '0.9rem' }}>Baja 22:14</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* FOOTER TICKER */}
            <div style={{ gridColumn: '1 / -1', background: '#000', borderTop: '4px solid #ff0000', display: 'flex', alignItems: 'center', padding: '0 30px', overflow: 'hidden', borderRadius: '12px' }}>
                <button 
                    onClick={toggleRadio}
                    style={{ 
                        background: '#ff0000', 
                        color: 'white', 
                        border: '2px solid white', 
                        borderRadius: '50%', 
                        width: '50px', 
                        height: '50px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        marginRight: '20px',
                        flexShrink: 0,
                        boxShadow: '0 0 15px rgba(255,0,0,0.5)'
                    }}
                >
                    {isPlayingRadio ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: '4px' }} />}
                </button>
                
                <div style={{ whiteSpace: 'nowrap', display: 'flex', fontSize: '1.2rem', fontWeight: 'bold', color: 'white', letterSpacing: '1px' }}>
                    <marquee scrollamount="5">
                        <span style={{ color: '#ff0000', marginRight: '10px' }}>🎵</span> SESIÓN VLS: LOS VIKINGS 5 CELEBRAN MEDIO SIGLO DE HISTORIA 
                        <span style={{ color: '#ff0000', margin: '0 10px 0 30px' }}>🧱</span> ARQUITECTURA: SOLANGE MIRANDA DESMITIFICA LA FRAGILIDAD DEL ADOBE 
                        <span style={{ color: '#ff0000', margin: '0 10px 0 30px' }}>🌿</span> AMBIENTE: PROTEJA LOS NIDOS DEL PILPILÉN 
                        <span style={{ color: '#ff0000', margin: '0 10px 0 30px' }}>☀️</span> INFORMACIÓN EN TIEMPO REAL VECINOS LA SERENA
                    </marquee>
                </div>
            </div>

        </div>
    );
}
