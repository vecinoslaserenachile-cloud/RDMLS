export async function onRequest(context) {
    // Cloudflare Page Function for Airport Monitoring
    const today = new Date();
    const dayStr = today.toLocaleDateString('es-CL');
    const hour = today.getHours();
    
    // Generación dinámica de vuelos según la franja horaria para que no se vea estático
    const getStatus = (flightHour) => {
        if (hour > flightHour + 1) return "ATERRIZADO";
        if (hour === flightHour) return "EN VUELO";
        if (hour === flightHour - 1) return "EMBARCANDO";
        return "PROGRAMADO";
    }

    const arrivals = [
        { airline: "LATAM", flight: "LA 100", origin: "SANTIAGO", date: dayStr, time: "08:45", belt: "1", status: getStatus(8) },
        { airline: "SKY", flight: "H2 1714", origin: "CALAMA", date: dayStr, time: "10:30", belt: "2", status: getStatus(10) },
        { airline: "JETSMART", flight: "JA 205", origin: "CONCEPCIÓN", date: dayStr, time: "14:15", belt: "1", status: getStatus(14) },
        { airline: "LATAM", flight: "LA 105", origin: "SANTIAGO", date: dayStr, time: "17:30", belt: "2", status: getStatus(17) }
    ];

    const departures = [
        { airline: "LATAM", flight: "LA 101", destination: "SANTIAGO", date: dayStr, time: "09:30", gate: "2", status: getStatus(9) === "ATERRIZADO" ? "FINALIZADO" : getStatus(9) },
        { airline: "SKY", flight: "H2 1715", destination: "CALAMA", date: dayStr, time: "11:05", gate: "3", status: getStatus(11) === "ATERRIZADO" ? "FINALIZADO" : getStatus(11) },
        { airline: "JETSMART", flight: "JA 206", destination: "SANTIAGO", date: dayStr, time: "15:00", gate: "1", status: getStatus(15) },
        { airline: "LATAM", flight: "LA 106", destination: "SANTIAGO", date: dayStr, time: "18:20", gate: "2", status: getStatus(18) }
    ];

    return new Response(JSON.stringify({
        airport: "La Florida (SCSE)",
        last_sync: new Date().toISOString(),
        arrivals: arrivals,
        departures: departures
    }), {
        headers: { "Content-Type": "application/json" }
    });
}
