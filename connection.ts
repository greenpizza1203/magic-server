import {storage} from "./storage";
import {getIds} from "./quizlet";
import {Fuzzy} from "./fuse";
import WebSocket from "ws";

export function connection(ws: WebSocket) {
    let fuzzy = new Fuzzy();
    ws.on('message', (message: string) => handleMessage(JSON.parse(message)));

    async function handleMessage(json) {
        // console.log(typeof json, json)
        if (typeof json == "string") {
            fuzzySearch(json)
        } else if (json['search']) {
            let sets = await search(json['search']);
            fuzzy.addSets(sets)
            fuzzySearch(json['search'])
        } else if (json['cards']) {
            sendCards(json['cards'])
        } else {
            storage.save(json)
            //todo: try 7276291
            try {
                fuzzy.addSets(json)
            } catch (e) {
                console.error(json)
            }
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
        // console.trace('attempt to search', target)

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
        // setId=7276291;
        ws.send(JSON.stringify({setId}))
    }

}
