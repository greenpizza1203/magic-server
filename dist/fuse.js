"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fuzzy = exports.options = void 0;
const fuse_js_1 = __importDefault(require("fuse.js"));
exports.options = {
    includeScore: true,
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    keys: [
        "word",
        "definition"
    ]
};
// export function updateFuse(sets: any) {
//
// }
// export async function fuzzy(question: string): Promise<FuseResult<card>[]> {
//     return fuse?.search(question, {limit: 3});
// }
class Fuzzy {
    constructor() {
        this.db = {};
        this.cards = {};
    }
    addSets(sets) {
        var _a;
        var _b, _c;
        for (const setId in sets) {
            if (!this.db[setId]) {
                for (const card of sets[setId])
                    (_a = (_b = this.cards)[_c = card.id]) !== null && _a !== void 0 ? _a : (_b[_c] = card);
                (this.db)[setId] = true;
            }
        }
        // console.log(Object.keys(this.cards))
        let targets = Object.values(this.cards);
        this.fuse = new fuse_js_1.default(targets, exports.options);
    }
    search(target) {
        var _a;
        return (_a = this.fuse) === null || _a === void 0 ? void 0 : _a.search(target, { limit: 3 });
    }
}
exports.Fuzzy = Fuzzy;
//# sourceMappingURL=fuse.js.map