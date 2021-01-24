// import WebSocket from "ws";
// import temp from "./temp.json"
import "./index"
// import {card} from "./fuse";
//
// const ws = new WebSocket("ws://localhost:8080");
// const cache: { [key: string]: card } = {}
// ws.on("message", async (raw: string) => {
//     const data = JSON.parse(raw)
//     if (Array.isArray(data)) {
//         requestCache(data)
//         render(data)
//     } else if (data['setId']) {
//         let id = data['setId'];
//         let set = await scrapeSet(id);
//         if (set) ws.send(JSON.stringify({[id]: set}))
//         setTimeout(() => ws.send("coffee"), 50)
//     } else {
//         cache[data.id] ??= data
//         render()
//     }
//
//
// })
// let targets;
//
// ws.on("open", () => {
//     ws.send(JSON.stringify({search: "coffee"}))
//
// })
//
//
// function requestCache(cards: string[]) {
//     let data = cards.filter(card => !cache[card]);
//     if (data.length) ws.send(JSON.stringify({cards: data}))
//
//
// }
//
// function render(data?) {
//     if (data) targets = data;
//     console.log(targets.filter(card => cache[card]))
// }
//
// export async function scrapeSet(id: string, actuallyScrape = false): Promise<any> {
//     console.log(`scraping quizlet set #${id}`)
//
//     let response
//     if (actuallyScrape) {
//         await fetch("https://quizlet.com/webapi/3.2/terms?%5BisPublished%5D=true&filters%5BsetId%5D=" + id)
//     } else {
//         // return;
//         response = {json: () => temp};
//     }
//     const json = await response.json()
//     const cards = json.responses[0].models.term
//     // noinspection ES6MissingAwait
//     // cache.set(id, simplified)
//     return cards.map(({word, definition, id}) => ({word, definition, id}))
//
// }
//
// //
