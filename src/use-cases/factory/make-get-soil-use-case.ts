import { PrismaSoilRepository } from "../../repositories/prisma/prisma-soil.repository";
import { GetSoilUseCase } from "../soil/get-soil.use-case";

export function makeGetSoilUseCase() {
  const soilRepository = new PrismaSoilRepository();
  const useCase = new GetSoilUseCase(soilRepository);

  return useCase;
}
