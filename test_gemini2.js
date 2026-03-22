const GEMINI_KEY = "AIzaSyBK4-Rf1QLNBKwhJ3BtpxRsn25e7Zlq3Rs";

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_KEY}`)
    .then(res => res.json())
    .then(data => {
        const validModels = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent')).map(m => m.name);
        console.log(validModels.join('\n'));
    })
    .catch(err => console.error(err));
