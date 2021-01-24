import {storage} from "./storage";
import {getIds} from "./quizlet";
import {Fuzzy} from "./fuse";
import WebSocket from "ws";

export function connection(ws: WebSocket) {
    let fuzzy = new Fuzzy();
    ws.on('message', (message: string) => {
        (message.startsWith("{") || message.startsWith("[")) ? onJSON(JSON.parse(message)) : fuzzySearch(message)
    });

    async function onJSON(json) {
        if (json['search']) {
            let sets = await search(json['search']);
            fuzzy.addSets(sets)
            fuzzySearch(json['search'])
        } else if (json['cards']) {
            sendCards(json['cards'])
        } else {
            storage.save(json)
            fuzzy.addSets(json)
            fuzzySearch()

        }
    }

    function sendCards(cardIds: string[]) {
        let cards = cardIds.map(cardId => fuzzy.cards[cardId]);
        ws.send(JSON.stringify({cards}));
    }

    let lastRequest: string

    function fuzzySearch(target = lastRequest) {
        if (!target) return;
        lastRequest = target;
        let results = fuzzy.search(target);
        if (!results) return;
        let ids = JSON.stringify(results.map(card => card.item.id));
        ws.send(ids);
    }

    async function search(target: any) {
        let ids = await getIds(target);
        const sets = await storage.retrieve(ids)
        const firstNew = ids.find(id => !sets.hasOwnProperty(id))
        if (firstNew) requestSet(firstNew)
        return sets;
    }


    function requestSet(setId) {
        ws.send(JSON.stringify({setId}))
    }

}
