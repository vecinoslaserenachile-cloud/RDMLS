export const STAGES = [
  {
    id: 1,
    name: "Historia de La Serena",
    description: "Los orígenes de la segunda ciudad más antigua de Chile.",
    questions: [
      {
        id: 1,
        text: "¿En qué año fue fundada la ciudad de La Serena?",
        options: ["1541", "1544", "1552", "1560"],
        correctIndex: 1,
        explanation: "La Serena fue fundada el 4 de septiembre de 1544 por Juan Bohón."
      },
      {
        id: 2,
        text: "¿Quién fue el fundador de La Serena?",
        options: ["Pedro de Valdivia", "Juan Bohón", "Francisco de Aguirre", "Diego de Almagro"],
        correctIndex: 1,
        explanation: "Juan Bohón fundó la ciudad por orden de Pedro de Valdivia para establecer una escala entre Santiago y Lima."
      },
      {
        id: 3,
        text: "¿Cuál es el nombre del plan urbanístico que transformó La Serena en los años 40?",
        options: ["Plan Serena", "Plan Regional", "Plan Aguirre", "Plan Moderno"],
        correctIndex: 0,
        explanation: "El Plan Serena, impulsado por Gabriel González Videla, dio a la ciudad su característico estilo neocolonial."
      },
      {
        id: 4,
        text: "¿Qué pirata atacó e incendió La Serena en 1680?",
        options: ["Francis Drake", "Bartholomew Sharp", "Edward Davis", "Henry Morgan"],
        correctIndex: 1,
        explanation: "Bartholomew Sharp atacó la ciudad en 1680, lo que llevó a la decision de amurallarla."
      },
      {
        id: 5,
        text: "¿Cómo se llamaba originalmente el sector donde se ubica el Faro Monumental?",
        options: ["Punta de Teatinos", "Playa Los Fuertes", "Punta de Tortuga", "Sector El Faro"],
        correctIndex: 1,
        explanation: "Se conoce como Playa Los Fuertes debido a las antiguas defensas contra piratas."
      },
      {
        id: 6,
        text: "¿Qué presidente chileno nació en La Serena?",
        options: ["Gabriel González Videla", "Jorge Alessandri", "Eduardo Frei Montalva", "Arturo Alessandri"],
        correctIndex: 0,
        explanation: "Gabriel González Videla nació en La Serena en 1898 y fue el principal impulsor del Plan Serena."
      },
      {
        id: 7,
        text: "¿En qué año fue la refundación de La Serena por Francisco de Aguirre?",
        options: ["1544", "1549", "1550", "1555"],
        correctIndex: 1,
        explanation: "Tras ser destruida por un levantamiento indígena, Francisco de Aguirre la refundó en 1549."
      },
      {
        id: 8,
        text: "¿Qué orden religiosa construyó la Iglesia de San Francisco?",
        options: ["Jesuitas", "Dominicos", "Franciscanos", "Mercedarios"],
        correctIndex: 2,
        explanation: "La Iglesia de San Francisco fue construida por los Franciscanos y es una de las más antiguas de piedra."
      },
      {
        id: 9,
        text: "¿Cuál era la principal actividad económica de La Serena en la colonia?",
        options: ["Pesca", "Minería de Cobre", "Agricultura", "Comercio Marítimo"],
        correctIndex: 1,
        explanation: "La minería de cobre y oro fue el motor económico de la zona durante gran parte de su historia."
      },
      {
        id: 10,
        text: "¿Qué nombre recibía la zona antes de la llegada de los españoles?",
        options: ["Valle de Elqui", "Valle de Coquimbo", "Pueblo de los Diaguitas", "Tierra de Estrellas"],
        correctIndex: 1,
        explanation: "El sector era conocido como el Valle de Coquimbo por las culturas locales."
      }
    ]
  }
];

export const PRIZES = [
  { level: "Nivel 1", title: "Turista Curioso", reward: "1 Ficha VLS" },
  { level: "Nivel 2", title: "Visitante Frecuente", reward: "2 Fichas VLS" },
  { level: "Nivel 3", title: "Explorador Regional", reward: "3 Fichas VLS" },
  { level: "Nivel 31", title: "Conquistador del Mundo", reward: "31 Fichas VLS Reales" }
];

export const QUESTION_PRIZES = [
  { level: 1, reward: "100 Puntos" },
  { level: 2, reward: "200 Puntos" },
  { level: 3, reward: "300 Puntos" },
  { level: 4, reward: "500 Puntos" },
  { level: 5, reward: "1.000 Puntos (SEGURO)" },
  { level: 6, reward: "2.000 Puntos" },
  { level: 7, reward: "4.000 Puntos" },
  { level: 8, reward: "8.000 Puntos" },
  { level: 9, reward: "16.000 Puntos" },
  { level: 10, reward: "32.000 Puntos (META)" }
];
