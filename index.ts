import WebSocket from "ws";
import {connection} from "./connection";

const port = +process.env.PORT || 3000;

const wss = new WebSocket.Server({port});
console.log(`Listening on port ${port}`)
wss.on('connection', connection);

