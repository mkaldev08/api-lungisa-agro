"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSoilUseCase = void 0;
const soil_classifier_service_1 = require("../../services/soil-classifier.service");
class GetSoilUseCase {
    constructor(soilRepository) {
        this.soilRepository = soilRepository;
    }
    async execute(lat, lon) {
        const soil = await this.soilRepository.getSoilByCoordinates(lat, lon);
        const classification = (0, soil_classifier_service_1.classifySoilUSDA)(soil.sand, soil.silt, soil.clay);
        return {
            ...soil,
            classification,
        };
    }
}
exports.GetSoilUseCase = GetSoilUseCase;
