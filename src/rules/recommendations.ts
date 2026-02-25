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
      timing:
        "Aplicar metade no plantio e metade quando o milho tiver 30 dias.",
      notes: [
        "O seu solo é ácido. O adubo ajuda a melhorar a qualidade.",
        "Considere adicionar calcário para corrigir o pH do solo.",
      ],
      limeSuggested: true,
    },
    sandy: {
      fertilizer: "NPK 15-15-15",
      baseRateKgHa: 120,
      timing:
        "Dividir o adubo em dois: uma parte no plantio e outra aos 30 dias.",
      notes: [
        "O solo arenoso perde os nutrientes rápido com as chuvas.",
        "Não aplicar tudo de uma vez para evitar desperdício.",
      ],
    },
    medium: {
      fertilizer: "NPK 20-10-10",
      baseRateKgHa: 140,
      timing: "Aplicar 60% no plantio e 40% quando o milho tiver 30 dias.",
      notes: [
        "O seu solo tem boa fertilidade.",
        "O nitrogênio é muito importante para o crescimento do milho.",
      ],
    },
  },
  tomato: {
    acidic: {
      fertilizer: "NPK 12-24-12",
      baseRateKgHa: 200,
      timing: "Metade no plantio, metade quando começar a florescer.",
      notes: [
        "O tomate precisa de muito fósforo em solo ácido.",
        "O calcário ajuda a melhorar o pH.",
      ],
      limeSuggested: true,
    },
    sandy: {
      fertilizer: "NPK 15-15-15",
      baseRateKgHa: 180,
      timing: "Dividir em três aplicações: plantio, aos 20 dias e aos 40 dias.",
      notes: [
        "O solo arenoso não retém os nutrientes. Repartir o adubo reduz perdas.",
        "Use gotejamento ou rega regular para melhor resultado.",
      ],
    },
    medium: {
      fertilizer: "NPK 20-10-10",
      baseRateKgHa: 190,
      timing: "Aplicar no plantio e reforçar aos 30 dias.",
      notes: [
        "O tomate prefere solo com boa humidade.",
        "Regar regularmente melhora a absorção do adubo.",
      ],
    },
  },
  cabbage: {
    acidic: {
      fertilizer: "NPK 12-24-12",
      baseRateKgHa: 220,
      timing: "Aplicar no transplante e fazer cobertura aos 20-30 dias.",
      notes: [
        "A couve precisa de muito fósforo para desenvolver boas raízes.",
        "Solo ácido precisa de calcário.",
      ],
      limeSuggested: true,
    },
    sandy: {
      fertilizer: "NPK 15-15-15",
      baseRateKgHa: 200,
      timing:
        "Dividir o adubo em 2 ou 3 aplicações para não perder nutrientes.",
      notes: [
        "Evite aplicar logo antes de chuva forte, pois o adubo sai do solo.",
        "Sempre cobrir o adubo com terra.",
      ],
    },
    medium: {
      fertilizer: "NPK 20-10-10",
      baseRateKgHa: 210,
      timing: "Aplicar no transplante e reforçar aos 25 dias.",
      notes: [
        "Cobrir o adubo com terra reduz perdas.",
        "Manter o solo sempre húmido melhora o resultado.",
      ],
    },
  },
  coffee: {
    acidic: {
      fertilizer: "NPK 10-20-20",
      baseRateKgHa: 120,
      timing: "Aplicar no início das chuvas e repetir após 60 dias.",
      notes: [
        "O café prefere potássio para encher bem os frutos.",
        "Solo ácido precisa de calcário.",
      ],
      limeSuggested: true,
    },
    sandy: {
      fertilizer: "NPK 15-15-15",
      baseRateKgHa: 110,
      timing: "Aplicar no início das chuvas e outra dose após 60 dias.",
      notes: [
        "Nunca aplicar adubo perto do tronco, pode queimar a planta.",
        "Espalhá longe das raízes principais.",
      ],
    },
    medium: {
      fertilizer: "NPK 20-10-10",
      baseRateKgHa: 130,
      timing: "Aplicar no início das chuvas e reforçar após 60 dias.",
      notes: [
        "Manter cobertura morta (folhas, ramos) ajuda a conservar água.",
        "Rega nos períodos secos melhora muito a colheita.",
      ],
    },
  },
};
