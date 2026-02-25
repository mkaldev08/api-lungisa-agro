import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaSoilRepository } from "../../repositories/prisma/prisma-soil.repository";
import { GetSoilUseCase } from "../../use-cases/soil/get-soil.use-case";
import { buildRecommendation } from "../../rules/ruleEngine";
import type { CropId, SoilAnswer } from "../../../types";

const soilAnswerSchema = z.object({
  questionId: z.string(),
  optionId: z.string(),
});

const requestSchema = z.object({
  crop: z.enum(["maize", "tomato", "cabbage", "coffee"]),
  lat: z.number(),
  lon: z.number(),
  areaHa: z.number().positive(),
  answers: z.array(soilAnswerSchema),
  provinceId: z.string().optional(),
});

export async function getRecommendationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = requestSchema.parse(request.body);

  // Get soil data from coordinates
  const soilRepository = new PrismaSoilRepository();
  const getSoilUseCase = new GetSoilUseCase(soilRepository);
  const soilData = await getSoilUseCase.execute(data.lat, data.lon);

  if (!soilData) {
    return reply.status(404).send({
      statusCode: 404,
      message: "Soil data not found for the given coordinates",
    });
  }

  // Build recommendation
  const recommendation = buildRecommendation({
    crop: data.crop as CropId,
    provinceId: data.provinceId,
    answers: data.answers as SoilAnswer[],
    areaHa: data.areaHa,
  });

  // Combine soil data with recommendation
  const response = {
    soil: soilData,
    recommendation,
  };

  return reply.send(response);
}
