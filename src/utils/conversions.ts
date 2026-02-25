import type { BagsConversion, DosePerHole } from "../../types";

const BAG_WEIGHT_KG = 25;
const SPOON_SIZE_GRAMS = 10;

export const convertKgToBags = (kg: number): BagsConversion => {
  const bagsExact = kg / BAG_WEIGHT_KG;

  return {
    bagWeightKg: BAG_WEIGHT_KG,
    bagsExact,
    bagsRounded: Math.ceil(bagsExact),
  };
};

export const calculateDosePerHole = (
  kgPerHa: number,
  spacing: { rowSpacingM: number; plantSpacingM: number },
): DosePerHole => {
  const plantDensityPerHa =
    10000 / (spacing.rowSpacingM * spacing.plantSpacingM);
  const gramsPerHole = (kgPerHa * 1000) / plantDensityPerHa;
  const spoonsPerHole = Math.round((gramsPerHole / SPOON_SIZE_GRAMS) * 2) / 2;

  return {
    gramsPerHole: Math.round(gramsPerHole * 10) / 10,
    spoonsPerHole,
    spoonSizeGrams: SPOON_SIZE_GRAMS,
    plantDensityPerHa: Math.round(plantDensityPerHa),
  };
};
