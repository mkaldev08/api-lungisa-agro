"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetSoilUseCase = makeGetSoilUseCase;
const prisma_soil_repository_1 = require("../../repositories/prisma/prisma-soil.repository");
const get_soil_use_case_1 = require("../soil/get-soil.use-case");
function makeGetSoilUseCase() {
    const soilRepository = new prisma_soil_repository_1.PrismaSoilRepository();
    const useCase = new get_soil_use_case_1.GetSoilUseCase(soilRepository);
    return useCase;
}
