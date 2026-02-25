import fastify from "fastify";
import cors from "@fastify/cors";
import type { CropId } from "./types";
import { registerRoutes } from "./src/http/routes";

const crops: Array<{ id: CropId; label: string }> = [
  { id: "maize", label: "Milho" },
  { id: "tomato", label: "Tomate" },
  { id: "cabbage", label: "Couve" },
  { id: "coffee", label: "Cafe" },
];
export const app = fastify({ logger: true });

app.register(cors, { origin: true });

app.register(registerRoutes);
