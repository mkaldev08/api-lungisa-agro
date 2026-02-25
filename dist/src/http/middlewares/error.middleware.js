"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const app_error_1 = require("../../errors/app-error");
async function errorMiddleware(app) {
    app.setErrorHandler((error, request, reply) => {
        if (error instanceof app_error_1.AppError) {
            return reply.status(error.statusCode).send({
                statusCode: error.statusCode,
                message: error.message,
            });
        }
        return reply.status(500).send({
            statusCode: 500,
            message: "Internal server error",
        });
    });
}
