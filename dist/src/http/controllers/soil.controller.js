"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSoilController = getSoilController;
const zod_1 = require("zod");
const make_get_soil_use_case_1 = require("../../use-cases/factory/make-get-soil-use-case");
async function getSoilController(request, reply) {
    const schema = zod_1.z.object({
        lat: zod_1.z.string(),
        lon: zod_1.z.string(),
    });
    const { lat, lon } = schema.parse(request.query);
    const getSoilUseCase = (0, make_get_soil_use_case_1.makeGetSoilUseCase)();
    const result = await getSoilUseCase.execute(Number(lat), Number(lon));
    if (!result) {
        return reply.status(404).send({
            statusCode: 404,
            message: "Soil not found for the given coordinates",
        });
    }
    return reply.send(result);
}
