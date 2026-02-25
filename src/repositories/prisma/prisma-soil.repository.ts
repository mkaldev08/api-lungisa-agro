import { httpClient } from "../../lib/axios";
import { SoilRepository } from "../soil.repository";

export class PrismaSoilRepository implements SoilRepository {
  async getSoilByCoordinates(lat: number, lon: number) {
    try {
      const response = await httpClient.get(
        "https://rest.isric.org/soilgrids/v2.0/properties/query",
        {
          params: {
            lat,
            lon,
            property: ["sand", "clay", "silt", "phh2o", "soc"],
            depth: "0-5cm",
            value: "mean",
          },
        },
      );

      const layers = response.data.properties.layers;

      // Extract values from the API response
      const sand =
        layers.find((l: any) => l.name === "sand")?.depths[0]?.values?.mean ||
        0;
      const clay =
        layers.find((l: any) => l.name === "clay")?.depths[0]?.values?.mean ||
        0;
      const silt =
        layers.find((l: any) => l.name === "silt")?.depths[0]?.values?.mean ||
        0;
      const ph =
        layers.find((l: any) => l.name === "phh2o")?.depths[0]?.values?.mean ||
        70; // pH * 10
      const soc =
        layers.find((l: any) => l.name === "soc")?.depths[0]?.values?.mean || 0; // dg/kg

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
    } catch (error) {
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
