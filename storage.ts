import redis from "redis";

const client = redis.createClient();
const {promisify} = require("util");
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
export const storage = {
    save: (set) => {
        const [key, value] = Object.entries(set)[0]
        client.set(key, JSON.stringify(value))
    },

    retrieve: async (ids: string[]): Promise<any> => {
        let sets = {}
        for (const id of ids) {
            const set = await getAsync(id)
            if (set) sets[id] = set;
        }

        // console.log(Object.keys(sets))
        return sets
    },

}
