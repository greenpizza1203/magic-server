"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
client.flushall();
client.on("error", function (error) {
    console.error(error);
});
// client.set("key", "value", redis.print);
// client.get("key", redis.print);
// const cache = {}
// export const storage = {
//     save: (set) => {
//         const [key, value] = Object.entries(set)[0]
//         client.set(key, JSON.stringify(value))
//         cache[key] = value
//     },
//
//     retrieve: async (ids: string[]): Promise<any> => {
//         let sets = {}
//         for (const id of ids) {
//             cache[id] ??= JSON.parse(await getAsync(id));
//             if (cache[id]) (sets[id] = cache[id]);
//         }
//         // console.log(Object.keys(sets))
//         return sets
//     },
//
// }
exports.storage = {
    save: (set) => {
        const [key, value] = Object.entries(set)[0];
        client.set(key, JSON.stringify(value));
    },
    retrieve: async (ids) => {
        let sets = {};
        for (const id of ids) {
            const set = await getAsync(id);
            if (set)
                sets[id] = set;
        }
        // console.log(Object.keys(sets))
        return sets;
    },
};
//# sourceMappingURL=storage.js.map