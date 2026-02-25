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

// Enhanced CORS configuration for mobile apps
app.register(cors, {
  origin: true, // Allow all origins (including React Native apps)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  exposedHeaders: ["Content-Length", "Date"],
});

app.register(registerRoutes);
