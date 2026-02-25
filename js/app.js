// ACTIVACIÓN GENERAL
function activarPlataforma() {
    alert("Plataforma RDMLS Activada 🚀");
}

// JUEGO CIUDADANO
function iniciarJuego() {
    alert("Juego ciudadano iniciado 🎮");
}

// CRM
function abrirCRM() {
    alert("Acceso al CRM Municipal 📊");
}

// ===============================
// IA CIUDADANA
// ===============================

function responderIA() {

    const input = document.getElementById("pregunta");
    const respuesta = document.getElementById("respuesta");

    if (!input || !respuesta) return;

    const pregunta = input.value.trim();

    if (pregunta === "") {
        respuesta.innerHTML = "Por favor escribe una pregunta.";
        return;
    }

    respuesta.innerHTML = "Procesando consulta... ⏳";

    // Simulación básica de respuesta inteligente
    setTimeout(() => {

        let textoRespuesta = "";

        if (pregunta.toLowerCase().includes("horario")) {
            textoRespuesta = "El horario municipal es de lunes a viernes de 08:30 a 14:00 hrs.";
        }
        else if (pregunta.toLowerCase().includes("permiso")) {
            textoRespuesta = "Puedes solicitar permisos municipales en la sección de Trámites del sitio oficial.";
        }
        else if (pregunta.toLowerCase().includes("contacto")) {
            textoRespuesta = "Puedes contactar a la municipalidad al +56 51 2206500.";
        }
        else {
            textoRespuesta = "Gracias por tu consulta. Un equipo municipal revisará esta información.";
        }

        respuesta.innerHTML = "🤖 " + textoRespuesta;

    }, 1000);

}
