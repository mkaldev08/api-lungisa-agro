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
}): RecommendationResult => {
  const { crop, provinceId, answers } = input;
  const areaHa =
    input.areaHa && input.areaHa > 0 ? input.areaHa : DEFAULT_AREA_HA;
  const maizeSpacing = input.maizeSpacing ?? DEFAULT_MAIZE_SPACING;
  const assumptions: string[] = [];

  if (!input.areaHa || input.areaHa <= 0) {
    assumptions.push("Area assumida como 1 hectare.");
  }

  const { soilType, reasoning } = estimateSoilType(soilQuestions, answers);
  const rule = cropRecommendations[crop][soilType];
  const totalKg = Math.round(rule.baseRateKgHa * areaHa * 10) / 10;

  if (crop === "maize") {
    assumptions.push(
      `Espacamento do milho assumido como ${maizeSpacing.rowSpacingM}m x ${maizeSpacing.plantSpacingM}m.`,
    );
  }

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

  if (crop === "maize") {
    result.perHoleDose = calculateDosePerHole(rule.baseRateKgHa, maizeSpacing);
  }

  return result;
};
