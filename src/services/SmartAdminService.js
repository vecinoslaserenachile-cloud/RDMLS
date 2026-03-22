/**
 * SmartAdminService: Gestión de E-learning, Diplomas y Firma Digital para Honorarios VLS
 * Atiende al Pilar #2 de Smart Administration.
 */

class SmartAdminService {
    constructor() {
        this.storageKey = 'vls_admin_data';
    }

    getReportHistory(userId) {
        try {
            const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
            return data[userId]?.reports || [];
        } catch (e) { return []; }
    }

    submitReport(userId, reportData) {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        if (!data[userId]) data[userId] = { reports: [], courses: [] };
        
        const newReport = {
            id: `REP-${Date.now()}`,
            date: new Date().toISOString(),
            content: reportData.content,
            photos: reportData.photos || [],
            signature: reportData.signature || 'Firma Digital Validada',
            status: 'ENVIADO'
        };
        
        data[userId].reports.push(newReport);
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        return newReport;
    }

    getCertificates(userId) {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        return data[userId]?.courses?.filter(c => c.completed) || [];
    }

    completeCourse(userId, courseId) {
        const data = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        if (!data[userId]) data[userId] = { reports: [], courses: [] };
        
        const course = {
            id: courseId,
            name: courseId === 'induccion' ? 'Inducción al Teletrabajo Municipal' : 'Gestión Smart City VLS',
            date: new Date().toISOString(),
            completed: true,
            diplomaHash: `DIPLOMA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        };
        
        data[userId].courses.push(course);
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        return course;
    }
}

export default new SmartAdminService();
