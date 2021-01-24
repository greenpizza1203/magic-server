"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const storage_1 = require("./storage");
const quizlet_1 = require("./quizlet");
const fuse_1 = require("./fuse");
function connection(ws) {
    let fuzzy = new fuse_1.Fuzzy();
    ws.on('message', (message) => {
        (message.startsWith("{") || message.startsWith("[")) ? onJSON(JSON.parse(message)) : fuzzySearch(message);
    });
    async function onJSON(json) {
        if (json['search']) {
            let sets = await search(json['search']);
            fuzzy.addSets(sets);
            fuzzySearch(json['search']);
        }
        else if (json['cards']) {
            sendCards(json['cards']);
        }
        else {
            storage_1.storage.save(json);
            fuzzy.addSets(json);
            fuzzySearch();
        }
    }
    function sendCards(cardIds) {
        let cards = cardIds.map(cardId => fuzzy.cards[cardId]);
        ws.send(JSON.stringify({ cards }));
    }
    let lastRequest;
    function fuzzySearch(target = lastRequest) {
        if (!target)
            return;
        lastRequest = target;
        let results = fuzzy.search(target);
        if (!results)
            return;
        let ids = JSON.stringify(results.map(card => card.item.id));
        ws.send(ids);
    }
    async function search(target) {
        let ids = await quizlet_1.getIds(target);
        const sets = await storage_1.storage.retrieve(ids);
        const firstNew = ids.find(id => !sets.hasOwnProperty(id));
        if (firstNew)
            requestSet(firstNew);
        return sets;
    }
    function requestSet(setId) {
        ws.send(JSON.stringify({ setId }));
    }
}
exports.connection = connection;
//# sourceMappingURL=connection.js.map