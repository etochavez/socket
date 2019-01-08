"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./classes/server");
const router_1 = require("./routes/router");
const server = new server_1.Server();
server.app.use("/", router_1.router);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
