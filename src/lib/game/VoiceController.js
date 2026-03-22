export class VoiceController {
  constructor(onCommand) {
    this.onCommand = onCommand;
    this.isListening = false;
    this.recognition = null;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.lang = 'es-ES'; // Castellano Chileno
      this.recognition.interimResults = false;

      this.recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const targetCommand = event.results[last][0].transcript.trim().toLowerCase();
        
        console.log("Comando detectado:", targetCommand);
        
        // Simples aliases
        if (targetCommand.includes('salta') || targetCommand.includes('arriba')) {
          this.onCommand('salta');
        } else if (targetCommand.includes('corre') || targetCommand.includes('rápido')) {
          this.onCommand('corre');
        } else if (targetCommand.includes('agua') || targetCommand.includes('toma')) {
          this.onCommand('agua');
        } else {
            this.onCommand(targetCommand); // Para el log
        }
      };

      this.recognition.onerror = (event) => {
        console.error('Voice control error', event.error);
        if (event.error !== 'no-speech') {
           this.isListening = false;
        }
      };

      this.recognition.onend = () => {
         // Auto-restart if it was stopped by silence
         if (this.isListening) {
             this.recognition.start();
         }
      };

    } else {
      console.warn("Speech Recognition API not supported in this browser.");
    }
  }

  toggle() {
    if (!this.recognition) {
        alert("Tu navegador no soporta el motor de Voz Smart.");
        return false;
    }

    if (this.isListening) {
      this.stop();
    } else {
      this.start();
    }
    return this.isListening;
  }

  start() {
    this.isListening = true;
    try {
        this.recognition.start();
    } catch (e) {
        // Ya estaba iniciado
    }
  }

  stop() {
    this.isListening = false;
    this.recognition.stop();
  }
}
