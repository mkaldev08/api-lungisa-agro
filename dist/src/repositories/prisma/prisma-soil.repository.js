"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSoilRepository = void 0;
const axios_1 = require("../../lib/axios");
class PrismaSoilRepository {
    async getSoilByCoordinates(lat, lon) {
        try {
            const response = await axios_1.httpClient.get("https://rest.isric.org/soilgrids/v2.0/properties/query", {
                params: {
                    lat,
                    lon,
                    property: ["sand", "clay", "silt", "phh2o", "soc"],
                    depth: "0-5cm",
                    value: "mean",
                },
            });
            const layers = response.data.properties.layers;
            // Extract values from the API response
            const sand = layers.find((l) => l.name === "sand")?.depths[0]?.values?.mean || 0;
            const clay = layers.find((l) => l.name === "clay")?.depths[0]?.values?.mean || 0;
            const silt = layers.find((l) => l.name === "silt")?.depths[0]?.values?.mean || 0;
            const ph = layers.find((l) => l.name === "phh2o")?.depths[0]?.values?.mean || 70; // pH * 10
            const soc = layers.find((l) => l.name === "soc")?.depths[0]?.values?.mean || 0; // dg/kg
            return {
                id: `${lat}_${lon}`,
                latitude: lat,
                longitude: lon,
                sand: sand / 10, // Convert from g/kg to percentage
                clay: clay / 10,
                silt: silt / 10,
                ph: ph / 10, // Convert pH back to normal scale
                organic_carbon: soc / 10, // Convert from dg/kg to g/100g (percentage)
            };
        }
        catch (error) {
            console.error("Error fetching soil data from ISRIC API:", error);
            // Return mock data if external API fails
            return {
                id: `${lat}_${lon}`,
                latitude: lat,
                longitude: lon,
                sand: 45, // Example values
                clay: 30,
                silt: 25,
                ph: 6.5,
                organic_carbon: 1.5,
            };
        }
    }
}
exports.PrismaSoilRepository = PrismaSoilRepository;
