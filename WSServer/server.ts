import http from "http";
import app from "./App.js";

const port = process.env.PORT || 6553;

const server = http.createServer(app);

server.listen(port);

