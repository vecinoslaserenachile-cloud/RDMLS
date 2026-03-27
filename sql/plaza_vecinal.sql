-- MIGRACIÓN DE BASE DE DATOS: LA PLAZA VECINAL (MICRO RED SOCIAL VLS)
-- Autor: Antigravity AI
-- Destino: vecinoslaserena.cl

-- 1. Tabla de Publicaciones / Hilos Maetros
CREATE TABLE IF NOT EXISTS `plaza_hilos` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `usuario_id` INT NOT NULL,
    `contenido` TEXT NOT NULL,
    `tematica` ENUM('trafico', 'humor', 'avisos', 'seguridad', 'clima', 'solidaridad') DEFAULT 'avisos',
    `imagen_url` VARCHAR(255),
    `volumen_interaccion` INT DEFAULT 0,
    `reacciones_json` JSON, -- { "corazon": 10, "risa": 5, "apoyo": 3 }
    `lat` DECIMAL(10, 8),
    `lng` DECIMAL(11, 8),
    `creado_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_plaza_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tabla de Comentarios (Árboles de Debate)
CREATE TABLE IF NOT EXISTS `plaza_comentarios` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `hilo_id` INT NOT NULL,
    `padre_id` INT DEFAULT NULL, -- Relación recursiva para árboles
    `usuario_id` INT NOT NULL,
    `texto` TEXT NOT NULL,
    `votos_positivos` INT DEFAULT 0,
    `sentimiento` ENUM('positivo', 'neutro', 'negativo') DEFAULT 'neutro',
    `creado_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_com_hilo` FOREIGN KEY (`hilo_id`) REFERENCES `plaza_hilos`(`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_com_padre` FOREIGN KEY (`padre_id`) REFERENCES `plaza_comentarios`(`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_com_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Gamificación y Medallas Ciudadanas
CREATE TABLE IF NOT EXISTS `plaza_medallas` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `usuario_id` INT NOT NULL,
    `tipo_medalla` VARCHAR(50), -- 'Modo Palomitas', 'Rey de la Picardia', 'Informante'
    `otorgado_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_medalla_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Métricas de Retención y Termómetro
CREATE TABLE IF NOT EXISTS `plaza_metricas` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tematica` VARCHAR(50),
    `nivel_enojo` FLOAT DEFAULT 0,
    `nivel_alegria` FLOAT DEFAULT 0,
    `nivel_preocupacion` FLOAT DEFAULT 0,
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Índices para el Mapa de Burbujas
CREATE INDEX `idx_tematica_interaccion` ON `plaza_hilos` (`tematica`, `volumen_interaccion`);
