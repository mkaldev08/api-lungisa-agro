import type {
  CropId,
  RecommendationResult,
  SoilAnswer,
  SoilType,
} from "../../types";
import { soilQuestions } from "../data/questions";
import { cropRecommendations } from "./recommendations";
import { estimateSoilType } from "./soilEstimator";
import { calculateDosePerHole, convertKgToBags } from "../utils/conversions";

const DEFAULT_AREA_HA = 1;
const DEFAULT_MAIZE_SPACING = { rowSpacingM: 0.75, plantSpacingM: 0.25 };
const DEFAULT_TOMATO_SPACING = { rowSpacingM: 1.0, plantSpacingM: 0.5 };
const DEFAULT_CABBAGE_SPACING = { rowSpacingM: 0.6, plantSpacingM: 0.5 };
const DEFAULT_COFFEE_SPACING = { rowSpacingM: 2.5, plantSpacingM: 1.0 };

const getCropSpacing = (
  crop: CropId,
  customSpacing?: { rowSpacingM: number; plantSpacingM: number },
): { rowSpacingM: number; plantSpacingM: number } => {
  if (customSpacing) return customSpacing;

  switch (crop) {
    case "maize":
      return DEFAULT_MAIZE_SPACING;
    case "tomato":
      return DEFAULT_TOMATO_SPACING;
    case "cabbage":
      return DEFAULT_CABBAGE_SPACING;
    case "coffee":
      return DEFAULT_COFFEE_SPACING;
  }
};

const soilLabels: Record<SoilType, string> = {
  acidic: "Solo acido",
  sandy: "Solo arenoso",
  medium: "Fertilidade media",
};

export const buildRecommendation = (input: {
  crop: CropId;
  provinceId?: string;
  answers: SoilAnswer[];
  areaHa?: number;
  maizeSpacing?: { rowSpacingM: number; plantSpacingM: number };
  spacing?: { rowSpacingM: number; plantSpacingM: number };
}): RecommendationResult => {
  const { crop, provinceId, answers } = input;
  const areaHa =
    input.areaHa && input.areaHa > 0 ? input.areaHa : DEFAULT_AREA_HA;
  const spacing = getCropSpacing(crop, input.spacing ?? input.maizeSpacing);
  const assumptions: string[] = [];

  if (!input.areaHa || input.areaHa <= 0) {
    assumptions.push("Area assumida como 1 hectare.");
  }

  const { soilType, reasoning } = estimateSoilType(soilQuestions, answers);
  const rule = cropRecommendations[crop][soilType];
  const totalKg = Math.round(rule.baseRateKgHa * areaHa * 10) / 10;

  const cropLabels: Record<CropId, string> = {
    maize: "milho",
    tomato: "tomate",
    cabbage: "repolho",
    coffee: "cafe",
  };

  assumptions.push(
    `Espacamento do ${cropLabels[crop]} assumido como ${spacing.rowSpacingM}m x ${spacing.plantSpacingM}m.`,
  );

  const notes = [soilLabels[soilType], ...rule.notes];
  if (rule.limeSuggested) {
    notes.push("Sugerir calcario para elevar o pH do solo.");
  }

  const result: RecommendationResult = {
    crop,
    provinceId,
    soilType,
    fertilizer: rule.fertilizer,
    baseRateKgHa: rule.baseRateKgHa,
    totalKg,
    bags25kg: convertKgToBags(totalKg),
    timing: rule.timing,
    notes,
    reasoning,
    assumptions,
  };

  // Calcular dosagem por cova/celula para todas as culturas
  result.perHoleDose = calculateDosePerHole(rule.baseRateKgHa, spacing);

  return result;
};
