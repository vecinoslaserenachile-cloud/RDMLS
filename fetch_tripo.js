const API_KEY = 'tsk_-wUFlddhuVfCFSpXcR69kGfpRVKBQPlO9-xMLTmHxoH';

async function fetchTask(taskId) {
    console.log(`Buscando taskId: ${taskId}...`);
    try {
        const res = await fetch(`https://api.tripo3d.ai/v2/openapi/task/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        const data = await res.json();
        console.log(`\n=== RESPUESTA para ${taskId} ===`);
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(`Error con ${taskId}:`, e);
    }
}

async function run() {
    await fetchTask('f13bc6ad-5d70-4aec-8268-ae16a47e2141'); // Faro 3D
    await fetchTask('9a8ea9cc-75a3-47cb-9668-dbae50f5bcc1'); // Serenito
    await fetchTask('47f3a48d-8ae8-47fc-b259-dfccb6922ce1'); // Fariño
}

run();
