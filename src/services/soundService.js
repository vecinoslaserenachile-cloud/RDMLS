/**
 * VLS Game Sound Service
 */
export const soundService = {
  playJump: () => {
    // Implementación básica o placeholder si no hay archivos
    console.log("SFX: Jump");
  },
  playAnthem: async () => {
    console.log("Music: Anthem Playing");
    return Promise.resolve();
  },
  playCorrect: () => {
    console.log("SFX: Correct");
  },
  playWrong: () => {
    console.log("SFX: Wrong");
  }
};
