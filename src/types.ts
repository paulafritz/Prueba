export type FireClassType = 'A' | 'B' | 'C' | 'K';

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fireClass: FireClassType;
  fireName: string;
  recommendedExtinguisher: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  bgPattern: string; // Tailwind class or shape representation for background
  details: string[];
  commonMistake: string;
  industry: string;
  smokeLevel: 'Bajo' | 'Medio' | 'Alto';
  safetyProtocol: string[];
}

export interface Extinguisher {
  id: string;
  name: string;
  type: 'PQS' | 'CO2' | 'Agua' | 'ClaseK';
  badgeColor: string;
  effectiveFor: FireClassType[];
  description: string;
  colorClass: string;
  instructions: string[];
  safetyWarning: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface GameState {
  scenarioId: string;
  extinguisherId: string;
  step: 'intro' | 'inspect' | 'pasa' | 'attack' | 'success' | 'failure';
  pasaSteps: {
    pinPulled: boolean;   // Pull the pin
    aimedBase: boolean;   // Aim at the base of the fire
    squeezedLever: boolean; // Squeeze the handle
    sweptSide: boolean;   // Sweep from side to side
  };
  hasInspectedExtinguisher: boolean;
  fireIntensity: number; // 0 to 100
  secondsLeft: number;
  score: number;
  feedbackMessage: string;
}
