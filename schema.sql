-- Esquema Maestro PRENDES: Aprendes • Comprendes • Emprendes

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'student', -- student, teacher, admin
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS progress (
    user_id TEXT,
    course_id TEXT,
    status TEXT DEFAULT 'not_started', -- started, completed
    percentage INTEGER DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS diplomas (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    course_id TEXT,
    issued_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Carga inicial de Cursos Académicos
INSERT OR IGNORE INTO courses (id, title, description) VALUES ('vls-smart-01', 'Cultura Smart City', 'Fundamentos del ecosistema digital.');
INSERT OR IGNORE INTO courses (id, title, description) VALUES ('vls-smart-02', 'Cuidado Ambiental', 'Protección de humedales y playas.');
INSERT OR IGNORE INTO courses (id, title, description) VALUES ('vls-smart-03', 'Seguridad Vecinal', 'Tecnología aplicada a la prevención.');
