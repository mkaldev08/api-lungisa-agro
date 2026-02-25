import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaSoilRepository } from "../../repositories/prisma/prisma-soil.repository";
import { GetSoilUseCase } from "../../use-cases/soil/get-soil.use-case";
import { makeGetSoilUseCase } from "../../use-cases/factory/make-get-soil-use-case";

export async function getSoilController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    lat: z.string(),
    lon: z.string(),
  });

  const { lat, lon } = schema.parse(request.query);

  const getSoilUseCase = makeGetSoilUseCase();

  const result = await getSoilUseCase.execute(Number(lat), Number(lon));

  if (!result) {
    return reply.status(404).send({
      statusCode: 404,
      message: "Soil not found for the given coordinates",
    });
  }

  return reply.send(result);
}
