import * as http from "http";
import config from "./config/config";

import "es6-shim";
import "reflect-metadata";
import {useExpressServer} from "routing-controllers";
import * as path from "path";
//import "./controllers/UserController.ts";


//let express = require("express"); // or you can import it if you have installed typings
//let app = express(); // your created express server
// app.use() // maybe you configure it the way you want


const app = require("./config/express").default();
const controllerDir = path.join(__dirname, "/controllers/");
useExpressServer(app, {
    controllers: [controllerDir + "*.ts"]
}).listen(3002);
console.log("Server is running on port: ", 3002);


// Init the express application
/*
const app = require("./config/express").default();

const server: http.Server = http.createServer(app);

server.listen(config.port);

server.on("error", (e : Error) => {
  console.log("Error starting server" + e);
});

server.on("listening", () => {
  console.log("Server started on port " + config.port);
});*/

/*import { Server } from "./config/server";
const s = new Server();*/
