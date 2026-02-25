import type {
  FastifyInstance,
  FastifyError,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { AppError } from "../../errors/app-error";

export async function errorMiddleware(app: FastifyInstance) {
  app.setErrorHandler(
    (
      error: FastifyError | AppError,
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
          statusCode: error.statusCode,
          message: error.message,
        });
      }

      return reply.status(500).send({
        statusCode: 500,
        message: "Internal server error",
      });
    },
  );
}
