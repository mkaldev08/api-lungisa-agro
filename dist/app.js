"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const routes_1 = require("./src/http/routes");
const crops = [
    { id: "maize", label: "Milho" },
    { id: "tomato", label: "Tomate" },
    { id: "cabbage", label: "Couve" },
    { id: "coffee", label: "Cafe" },
];
exports.app = (0, fastify_1.default)({ logger: true });
exports.app.register(cors_1.default, { origin: true });
exports.app.register(routes_1.registerRoutes);
