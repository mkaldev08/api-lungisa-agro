"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app_1.app.log.error(err);
        process.exit(1);
    }
    console.log(`Server is running at ${address}`);
});
app_1.app.setErrorHandler((error, request, reply) => {
    reply.status(500).send({
        error: "Internal Server Error",
        message: error.message,
    });
});
