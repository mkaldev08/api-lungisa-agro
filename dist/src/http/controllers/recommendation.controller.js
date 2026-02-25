"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendationController = getRecommendationController;
const zod_1 = require("zod");
const prisma_soil_repository_1 = require("../../repositories/prisma/prisma-soil.repository");
const get_soil_use_case_1 = require("../../use-cases/soil/get-soil.use-case");
const ruleEngine_1 = require("../../rules/ruleEngine");
const soilAnswerSchema = zod_1.z.object({
    questionId: zod_1.z.string(),
    optionId: zod_1.z.string(),
});
const requestSchema = zod_1.z.object({
    crop: zod_1.z.enum(["maize", "tomato", "cabbage", "coffee"]),
    lat: zod_1.z.number(),
    lon: zod_1.z.number(),
    areaHa: zod_1.z.number().positive(),
    answers: zod_1.z.array(soilAnswerSchema),
    provinceId: zod_1.z.string().optional(),
});
async function getRecommendationController(request, reply) {
    const data = requestSchema.parse(request.body);
    // Get soil data from coordinates
    const soilRepository = new prisma_soil_repository_1.PrismaSoilRepository();
    const getSoilUseCase = new get_soil_use_case_1.GetSoilUseCase(soilRepository);
    const soilData = await getSoilUseCase.execute(data.lat, data.lon);
    if (!soilData) {
        return reply.status(404).send({
            statusCode: 404,
            message: "Soil data not found for the given coordinates",
        });
    }
    // Build recommendation
    const recommendation = (0, ruleEngine_1.buildRecommendation)({
        crop: data.crop,
        provinceId: data.provinceId,
        answers: data.answers,
        areaHa: data.areaHa,
    });
    // Combine soil data with recommendation
    const response = {
        soil: soilData,
        recommendation,
    };
    return reply.send(response);
}
