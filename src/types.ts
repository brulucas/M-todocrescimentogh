export interface QuizAnswers {
  // Bloco 1: Gancho e Dados
  ageBracket: string;
  age: number;
  gender: 'menino' | 'menina';
  currentHeight: number; // cm
  currentWeight: number; // kg
  motherHeight: number; // cm
  fatherHeight: number; // cm

  // Bloco 2: Consciência e Dor
  pickyLevel: string;
  ultraprocessedFreq: string;
  sleepQuality: string;
  fearBullying: string;
  motherGuilt: string;

  // Bloco 3 & 4
  scratchedDone: boolean;
}

export interface ProductConfig {
  productName: string;
  checkoutUrl: string;
  offerPrice: string;
  anchorPrice: string;
  expertName: string;
  expertTitle: string;
  expertCrm: string;
  expertBio: string;
}
