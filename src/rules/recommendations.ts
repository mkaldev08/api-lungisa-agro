import type { CropId, FertilizerRecommendation, SoilType } from "../../types";

type CropRules = Record<
  SoilType,
  Omit<FertilizerRecommendation, "crop" | "soilType">
>;

export const cropRecommendations: Record<CropId, CropRules> = {
  maize: {
    acidic: {
      fertilizer: "NPK 12-24-12",
      baseRateKgHa: 150,
      timing: "Aplicar no plantio; reforcar aos 30 dias.",
      notes: ["Solo acido tende a reduzir disponibilidade de fosforo."],
      limeSuggested: true,
    },
    sandy: {
      fertilizer: "NPK 15-15-15",
      baseRateKgHa: 120,
      timing: "Dividir em 2 aplicacoes: plantio e 30 dias.",
      notes: ["Solo arenoso perde nutrientes rapidamente."],
    },
    medium: {
      fertilizer: "NPK 20-10-10",
      baseRateKgHa: 140,
      timing: "Aplicar 60% no plantio e 40% aos 30 dias.",
      notes: ["Solo equilibrado permite boa resposta ao nitrogenio."],
    },
  },
  tomato: {
    acidic: {
      fertilizer: "NPK 12-24-12",
      baseRateKgHa: 200,
      timing: "Aplicar 50% no plantio e 50% no inicio da floracao.",
      notes: ["Tomate responde bem ao fosforo em solos acidos."],
      limeSuggested: true,
    },
    sandy: {
      fertilizer: "NPK 15-15-15",
      baseRateKgHa: 180,
      timing: "Dividir em 3 aplicacoes: plantio, 20 e 40 dias.",
      notes: ["Aplicacoes fracionadas reduzem perdas no solo arenoso."],
    },
    medium: {
      fertilizer: "NPK 20-10-10",
      baseRateKgHa: 190,
      timing: "Aplicar no plantio e reforcar aos 30 dias.",
      notes: ["Manter irrigacao regular melhora a absorcao."],
    },
  },
  cabbage: {
    acidic: {
      fertilizer: "NPK 12-24-12",
      baseRateKgHa: 220,
      timing: "Aplicar no transplante; cobertura aos 20-30 dias.",
      notes: ["Couve precisa de fosforo para bom enraizamento."],
      limeSuggested: true,
    },
    sandy: {
      fertilizer: "NPK 15-15-15",
      baseRateKgHa: 200,
      timing: "Dividir em 2-3 aplicacoes para reduzir perdas.",
      notes: ["Evitar aplicar antes de chuvas fortes."],
    },
    medium: {
      fertilizer: "NPK 20-10-10",
      baseRateKgHa: 210,
      timing: "Aplicar no transplante e reforcar aos 25 dias.",
      notes: ["Cobrir o fertilizante com terra para reduzir perdas."],
    },
  },
  coffee: {
    acidic: {
      fertilizer: "NPK 10-20-20",
      baseRateKgHa: 120,
      timing: "Aplicar no inicio das chuvas; repetir apos 60 dias.",
      notes: ["Cafe responde a potassio para enchimento dos frutos."],
      limeSuggested: true,
    },
    sandy: {
      fertilizer: "NPK 15-15-15",
      baseRateKgHa: 110,
      timing: "Aplicar no inicio das chuvas; cobertura apos 60 dias.",
      notes: ["Aplicar longe do tronco para evitar queimaduras."],
    },
    medium: {
      fertilizer: "NPK 20-10-10",
      baseRateKgHa: 130,
      timing: "Aplicar no inicio das chuvas; reforcar apos 60 dias.",
      notes: ["Manter cobertura morta ajuda a conservar humidade."],
    },
  },
};
