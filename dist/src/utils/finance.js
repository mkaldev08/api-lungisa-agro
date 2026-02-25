"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateFinancialLoss = void 0;
const estimateFinancialLoss = (overApplicationKg) => {
    const estimatedUsdPerKg = 0.6;
    return Math.round(overApplicationKg * estimatedUsdPerKg * 100) / 100;
};
exports.estimateFinancialLoss = estimateFinancialLoss;
