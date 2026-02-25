import type { FastifyInstance } from "fastify";
import { getSoilController } from "./controllers/soil.controller";
import { getRecommendationController } from "./controllers/recommendation.controller";

export async function registerRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({ status: "ok" }));
  app.get("/soil", getSoilController);
  app.post("/recommendation", getRecommendationController);
}
