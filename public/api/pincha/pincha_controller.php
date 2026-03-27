<?php
// CONTROLADOR MAESTRO: ECOSISTEMA PINCHA (DATING VLS 2026)
// Ubicación: vecinoslaserena.cl/api/pincha/pincha_controller.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Origin: *");

$input = json_decode(file_get_contents("php://input"));

// Simulación de Sesión y Usuario SSO (Cruce de Ecosistemas)
$headers = getallheaders();
$current_user_id = isset($headers['X-VLS-User-ID']) ? (int)$headers['X-VLS-User-ID'] : null;

if (!$current_user_id) {
    http_response_code(401);
    echo json_encode(["error" => "Autenticación requerida para acceder a Pincha."]);
    exit;
}

// LÓGICA DE SUSCRIPCIÓN (FREEMIUM)
function obtenerNivelSuscripcion($user_id) {
    // Logic: Consulta SQL a `pincha_perfiles`
    return 'premium'; // Simulación para desarrollo
}

// 1. GESTIÓN DE PERFILES (LECTURA/ESCRITURA)
if ($method === 'GET' && isset($_GET['perfil'])) {
    $nivel = obtenerNivelSuscripcion($current_user_id);
    
    if ($nivel === 'basico') {
        // Modo Vitrina: Solo datos públicos
        echo json_encode(["status" => "vitrina", "data" => "Perfil Público A-123"]);
    } else {
        // Modo Premium: Datos completos e intereses avanzados
        echo json_encode(["status" => "premium", "data" => "Perfil Completo A-123", "intereses" => ["Musica", "Humedales"]]);
    }
}

// 2. SISTEMA DE REPORTES (TOLERANCIA CERO)
if ($method === 'POST' && isset($input->reportar_id)) {
    $agresor_id = (int)$input->reportar_id;
    
    // El "Botón de Seguridad" invoca el Kill Switch Global del ecosistema
    deshabilitarAccesoGlobal($agresor_id, $current_user_id);
    
    echo json_encode(["status" => "sec_ok", "mensaje" => "Usuario bloqueado y reportado para auditoría global."]);
}

// 3. MENSAJERÍA ENCRIPTADA (MODO PREMIUM)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($input->enviar_mensaje)) {
    $nivel = obtenerNivelSuscripcion($current_user_id);
    if ($nivel === 'premium') {
        echo json_encode(["status" => "msg_ok", "mensaje" => "Mensaje enviado con cifrado VLS."]);
    } else {
        http_response_code(403);
        echo json_encode(["error" => "Requiere suscripción Premium para chatear."]);
    }
}
?>
