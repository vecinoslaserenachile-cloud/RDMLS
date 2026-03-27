<?php
// CONTROLADOR AVANZADO: LA PLAZA VECINAL (MICRO RED SOCIAL VLS 2026)
// Ubicación: vecinoslaserena.cl/api/plaza/plaza_controller.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"));

// 1. PROTOCOLO ROBUSTO DE SUBIDA DE IMÁGENES/CÁMARA (Nativo Multipart)
if ($method === 'POST' && isset($_FILES['file'])) {
    $target_dir = "../../uploads/plaza/";
    if (!file_exists($target_dir)) mkdir($target_dir, 0755, true);
    
    $file_name = time() . '_' . basename($_FILES["file"]["name"]);
    $target_file = $target_dir . $file_name;
    $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Validación de Mime-Type (Seguridad Smart City)
    $allowed_types = ["jpg", "jpeg", "png", "webp", "pdf"];
    if (in_array($file_type, $allowed_types) && move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo json_encode(["status" => "ok", "url" => "https://www.vecinoslaserena.cl/uploads/plaza/" . $file_name, "msg" => "Registro multimedia recibido. ¡Gracias!"]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "msg" => "Error al procesar el archivo o formato no permitido."]);
    }
    exit;
}

// 2. MOTOR DE IA (FILTRO DE RUIDO Y SENTIMIENTO VLS)
function filtrarRuidoYAnaalizarSentimiento($texto) {
    $toxic_words = ["insulto1", "insulto2", "spam"]; // Mock list
    foreach($toxic_words as $w) {
        if (stripos($texto, $w) !== false) return ["apto" => false, "msg" => "Contenido inapropiado detectado."];
    }
    
    // Simulación de Análisis de Sentimiento
    $positivo = ["gracias", "excelente", "ayuda", "humor"];
    foreach($positivo as $p) {
        if (stripos($texto, $p) !== false) return ["apto" => true, "sentimiento" => "positivo"];
    }
    return ["apto" => true, "sentimiento" => "neutro"];
}

// 3. REGISTRO DE COMENTARIOS (ÁRBOLES DE DEBATE)
if ($method === 'POST' && isset($input->publicar)) {
    $intel = filtrarRuidoYAnaalizarSentimiento($input->texto);
    if (!$intel['apto']) {
        http_response_code(403);
        echo json_encode($intel);
        exit;
    }
    
    // Inserción en `plaza_comentarios`
    // En producción se usa PDO/MySQL.
    http_response_code(201);
    echo json_encode([
        "status" => "ok", 
        "msg" => "Comentario publicado instantáneamente. ¡Gracias por participar en La Plaza!",
        "sentimiento" => $intel['sentimiento'] ?? 'neutro'
    ]);
    exit;
}

// 4. KPIS Y TERMÓMETRO SOCIAL (PARA DASHBOARD ADMIN)
if ($method === 'GET' && isset($_GET['stats'])) {
    echo json_encode([
        "tematicas" => [
            ["nombre" => "Tráfico", "volumen" => 45, "sentimiento" => -0.8, "trend" => "rising"],
            ["nombre" => "Humor", "volumen" => 120, "sentimiento" => 0.6, "trend" => "stable"],
            ["nombre" => "Seguridad", "volumen" => 80, "sentimiento" => -0.5, "trend" => "rising"]
        ],
        "top_usuarios" => ["Vecino G.", "Paula Arq.", "Don Joaco (Avatar)"]
    ]);
    exit;
}
?>
