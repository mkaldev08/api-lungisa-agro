"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const soil_controller_1 = require("./controllers/soil.controller");
const recommendation_controller_1 = require("./controllers/recommendation.controller");
async function registerRoutes(app) {
    app.get("/health", async () => ({ status: "ok" }));
    app.get("/soil", soil_controller_1.getSoilController);
    app.post("/recommendation", recommendation_controller_1.getRecommendationController);
}
