export type CropId = 'maize' | 'tomato' | 'cabbage' | 'coffee';

export type SoilType = 'acidic' | 'sandy' | 'medium';

export type Score = Record<SoilType, number>;

export interface Province {
  id: string;
  name: string;
}

export interface SoilOption {
  id: string;
  label: string;
  score: Score;
}

export interface SoilQuestion {
  id: string;
  text: string;
  options: SoilOption[];
}

export interface SoilAnswer {
  questionId: string;
  optionId: string;
}

export interface FertilizerRecommendation {
  crop: CropId;
  soilType: SoilType;
  fertilizer: string;
  baseRateKgHa: number;
  timing: string;
  notes: string[];
  limeSuggested?: boolean;
}

export interface DosePerHole {
  gramsPerHole: number;
  spoonsPerHole: number;
  spoonSizeGrams: number;
  plantDensityPerHa: number;
}

export interface BagsConversion {
  bagWeightKg: number;
  bagsExact: number;
  bagsRounded: number;
}

export interface RecommendationResult {
  crop: CropId;
  provinceId?: string;
  soilType: SoilType;
  fertilizer: string;
  baseRateKgHa: number;
  totalKg: number;
  bags25kg: BagsConversion;
  perHoleDose?: DosePerHole;
  timing: string;
  notes: string[];
  reasoning: string[];
  assumptions: string[];
}
