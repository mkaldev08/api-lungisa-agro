import { app } from "./app";

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log(`Server is running at ${address}`);
});

app.setErrorHandler((error, request, reply) => {
  reply.status(500).send({
    error: "Internal Server Error",
    message: error.message,
  });
});
