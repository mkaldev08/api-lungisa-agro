export interface SoilRepository {
  getSoilByCoordinates(
    lat: number,
    lon: number,
  ): Promise<{
    id: string;
    latitude: number;
    longitude: number;
    sand: number;
    clay: number;
    silt: number;
    ph: number;
    organic_carbon: number;
  }>;
}
