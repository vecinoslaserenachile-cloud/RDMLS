// API Maestro PRENDES: Backend de Educación Inteligente

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // Configuración de CORS para permitir peticiones desde prendes.cl y local
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        // Manejo de peticiones de pre-vuelo (CORS)
        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            // 1. REGISTRO DE USUARIOS (Alumnos/Docentes)
            if (url.pathname === "/register" && request.method === "POST") {
                const { id, email, name, role } = await request.json();
                await env.DB.prepare(
                    "INSERT OR IGNORE INTO users (id, email, name, role) VALUES (?, ?, ?, ?)"
                )
                .bind(id, email, name, role)
                .run();
                return new Response(JSON.stringify({ success: true, message: "Usuario registrado" }), { 
                    headers: { ...corsHeaders, "Content-Type": "application/json" } 
                });
            }

            // 2. OBTENER CURSOS DISPONIBLES
            if (url.pathname === "/courses" && request.method === "GET") {
                const { results } = await env.DB.prepare("SELECT * FROM courses").all();
                return new Response(JSON.stringify(results), { 
                    headers: { ...corsHeaders, "Content-Type": "application/json" } 
                });
            }

            // 3. CONSULTAR PROGRESO DEL ALUMNO
            if (url.pathname === "/progress" && request.method === "GET") {
                const userId = url.searchParams.get("user_id");
                const { results } = await env.DB.prepare("SELECT * FROM progress WHERE user_id = ?").bind(userId).all();
                return new Response(JSON.stringify(results), { 
                    headers: { ...corsHeaders, "Content-Type": "application/json" } 
                });
            }

            // 4. ACTUALIZAR AVANCE Y NOTAS
            if (url.pathname === "/progress" && request.method === "POST") {
                const { user_id, course_id, status, percentage } = await request.json();
                await env.DB.prepare(
                    "INSERT OR REPLACE INTO progress (user_id, course_id, status, percentage, last_updated) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)"
                )
                .bind(user_id, course_id, status, percentage)
                .run();
                return new Response(JSON.stringify({ success: true }), { 
                    headers: { ...corsHeaders, "Content-Type": "application/json" } 
                });
            }

            // 5. GUARDAR APUNTES (Smart Notes)
            if (url.pathname === "/notes" && request.method === "POST") {
                const { user_id, content } = await request.json();
                await env.DB.prepare("INSERT INTO notes (user_id, content) VALUES (?, ?)")
                .bind(user_id, content)
                .run();
                return new Response(JSON.stringify({ success: true }), { 
                    headers: { ...corsHeaders, "Content-Type": "application/json" } 
                });
            }

            return new Response(JSON.stringify({ error: "Endpoint no encontrado" }), { 
                status: 404, 
                headers: corsHeaders 
            });

        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), { 
                status: 500, 
                headers: corsHeaders 
            });
        }
    },
};
