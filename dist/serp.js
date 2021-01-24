"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function fetchJSON(query, api_key = "fe68d706a01dcb6804e5081d28982113d18c7e208b78c681fa66a699c884c06a", engine = "google") {
    const response = await axios_1.default(`https://serpapi.com/search?api_key=${api_key}&q=${query}&engine=${engine}`);
    // console.log(response)
    return response.data;
}
async function serp(query) {
    const results = await fetchJSON(query);
    return results.organic_results;
}
exports.default = serp;
//# sourceMappingURL=serp.js.map