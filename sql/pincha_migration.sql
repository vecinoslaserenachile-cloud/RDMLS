-- MIGRACIÓN DE BASE DE DATOS: ECOSISTEMA PINCHA (DATING PREMIUM VLS)
-- Autor: Antigravity AI
-- Destino: vecinoslaserena.cl / vecinosmart.cl

-- 1. Tabla de Perfiles (Extensión de Usuarios)
CREATE TABLE IF NOT EXISTS `pincha_perfiles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `usuario_id` INT NOT NULL,
    `biografia` TEXT,
    `intereses` JSON,
    `nivel_suscripcion` ENUM('basico', 'premium') DEFAULT 'basico',
    `estado_verificacion` BOOLEAN DEFAULT FALSE,
    `foto_url` VARCHAR(255),
    `puntos_xp` INT DEFAULT 0,
    `ultima_conexion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(`usuario_id`),
    CONSTRAINT `fk_pincha_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabla de Matches (Conexiones)
CREATE TABLE IF NOT EXISTS `pincha_matches` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `usuario_a_id` INT NOT NULL,
    `usuario_b_id` INT NOT NULL,
    `estado` ENUM('pendiente', 'conectado', 'bloqueado') DEFAULT 'pendiente',
    `creado_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `actualizado_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_match` (`usuario_a_id`, `usuario_b_id`),
    CONSTRAINT `fk_match_a` FOREIGN KEY (`usuario_a_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_match_b` FOREIGN KEY (`usuario_b_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabla de Mensajes (Chat Encriptado)
CREATE TABLE IF NOT EXISTS `pincha_mensajes` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `match_id` INT NOT NULL,
    `remitente_id` INT NOT NULL,
    `contenido_encriptado` LONGTEXT NOT NULL,
    `leido` BOOLEAN DEFAULT FALSE,
    `enviado_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_mensaje_match` FOREIGN KEY (`match_id`) REFERENCES `pincha_matches`(`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_mensaje_remitente` FOREIGN KEY (`remitente_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Índice de Búsqueda Local (Geolocalización simulada por comuna)
ALTER TABLE `pincha_perfiles` ADD INDEX (`nivel_suscripcion`, `ultimo_login`);
