import { SoilRepository } from "../../repositories/soil.repository";
import { classifySoilUSDA } from "../../services/soil-classifier.service";

export class GetSoilUseCase {
  constructor(private soilRepository: SoilRepository) {}

  async execute(lat: number, lon: number) {
    const soil = await this.soilRepository.getSoilByCoordinates(lat, lon);

    const classification = classifySoilUSDA(soil.sand, soil.silt, soil.clay);

    return {
      ...soil,
      classification,
    };
  }
}
