export interface Decision {
  id: string;
  title: string;
  description: string;
  year: number;
  historicalImpact: string;
  impacts: {
    co2: number;
    biodiversity: number;
    seaLevel: number;
    temperature: number;
  };
  module: string; // NEW FIELD!
}

export interface Epoch {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  description: string;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  specialization: string;
}

export interface GameState {
  currentEpoch: Epoch;
  co2Level: number;
  biodiversity: number;
  seaLevel: number;
  temperature: number;
  year: number;
  career: Career | null;
  lastDecision: Decision | null;
} 