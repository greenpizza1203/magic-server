"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = exports.getIds = void 0;
const serp_1 = __importDefault(require("./serp"));
async function getIds(query) {
    const results = await serp_1.default(`site:quizlet.com ${query}`);
    return results.map(result => getId(result.link)).filter(it => it);
}
exports.getIds = getIds;
function getId(url) {
    let parts = new URL(url).pathname.split('/');
    let id = parts.find(part => (+part).toString() == part);
    if (!id)
        console.warn("unable to process quizlet url" + url);
    return id;
}
exports.getId = getId;
// export async function getSets(ids: string[], scrapeNew = true) {
//     return await storage.retrieve(ids);
//
// }
//# sourceMappingURL=quizlet.js.map