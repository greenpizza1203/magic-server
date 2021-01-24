"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const connection_1 = require("./connection");
const port = +process.env.PORT || 3000;
const wss = new ws_1.default.Server({ port });
console.log(`Listening on port ${port}`);
wss.on('connection', connection_1.connection);
//# sourceMappingURL=index.js.map