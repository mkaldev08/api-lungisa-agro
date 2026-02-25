"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRecommendation = void 0;
const questions_1 = require("../data/questions");
const recommendations_1 = require("./recommendations");
const soilEstimator_1 = require("./soilEstimator");
const conversions_1 = require("../utils/conversions");
const DEFAULT_AREA_HA = 1;
const DEFAULT_MAIZE_SPACING = { rowSpacingM: 0.75, plantSpacingM: 0.25 };
const soilLabels = {
    acidic: "Solo acido",
    sandy: "Solo arenoso",
    medium: "Fertilidade media",
};
const buildRecommendation = (input) => {
    const { crop, provinceId, answers } = input;
    const areaHa = input.areaHa && input.areaHa > 0 ? input.areaHa : DEFAULT_AREA_HA;
    const maizeSpacing = input.maizeSpacing ?? DEFAULT_MAIZE_SPACING;
    const assumptions = [];
    if (!input.areaHa || input.areaHa <= 0) {
        assumptions.push("Area assumida como 1 hectare.");
    }
    const { soilType, reasoning } = (0, soilEstimator_1.estimateSoilType)(questions_1.soilQuestions, answers);
    const rule = recommendations_1.cropRecommendations[crop][soilType];
    const totalKg = Math.round(rule.baseRateKgHa * areaHa * 10) / 10;
    if (crop === "maize") {
        assumptions.push(`Espacamento do milho assumido como ${maizeSpacing.rowSpacingM}m x ${maizeSpacing.plantSpacingM}m.`);
    }
    const notes = [soilLabels[soilType], ...rule.notes];
    if (rule.limeSuggested) {
        notes.push("Sugerir calcario para elevar o pH do solo.");
    }
    const result = {
        crop,
        provinceId,
        soilType,
        fertilizer: rule.fertilizer,
        baseRateKgHa: rule.baseRateKgHa,
        totalKg,
        bags25kg: (0, conversions_1.convertKgToBags)(totalKg),
        timing: rule.timing,
        notes,
        reasoning,
        assumptions,
    };
    if (crop === "maize") {
        result.perHoleDose = (0, conversions_1.calculateDosePerHole)(rule.baseRateKgHa, maizeSpacing);
    }
    return result;
};
exports.buildRecommendation = buildRecommendation;
