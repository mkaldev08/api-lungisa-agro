"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifySoilUSDA = classifySoilUSDA;
function classifySoilUSDA(sand, silt, clay) {
    const total = sand + silt + clay;
    if (total <= 0)
        return "Indefinido";
    const sandPct = (sand / total) * 100;
    const siltPct = (silt / total) * 100;
    const clayPct = (clay / total) * 100;
    // Prioridade das classes mais restritivas
    if (clayPct >= 40 && sandPct <= 45 && siltPct <= 40)
        return "Argiloso";
    if (clayPct >= 40 && siltPct >= 40)
        return "Argilo-silte";
    if (clayPct >= 27 &&
        clayPct < 40 &&
        sandPct >= 20 &&
        sandPct <= 45 &&
        siltPct >= 27 &&
        siltPct <= 40)
        return "Franco-argiloso";
    if (clayPct >= 7 &&
        clayPct < 27 &&
        sandPct >= 23 &&
        sandPct <= 52 &&
        siltPct >= 28 &&
        siltPct <= 50)
        return "Franco";
    // Ajuste da faixa Franco-arenoso / Sandy Loam
    if (clayPct < 27 && sandPct >= 43 && sandPct <= 85)
        return "Franco-arenoso";
    if (clayPct < 20 && sandPct > 85 && siltPct < 15)
        return "Arenoso";
    if (clayPct < 12 && sandPct < 52 && siltPct > 50)
        return "Silte";
    if (clayPct < 20 && sandPct >= 52 && sandPct <= 80 && siltPct > 50)
        return "Silte-arenoso";
    return "Indefinido";
}
