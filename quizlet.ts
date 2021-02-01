import searchQuizlet from "./searchQuizlet";

export async function getIds(query: string): Promise<string[]> {
    const results = await searchQuizlet(query)
    return results.map(result => getId(result.link)).filter(it => it)
}

export function getId(url: string): string | undefined {
    let parts = new URL(url).pathname.split('/');
    let id = parts.find(part => (+part).toString() == part);
    if (!id) console.warn("unable to process quizlet url" + url)
    return id;
}


// export async function getSets(ids: string[], scrapeNew = true) {
//     return await storage.retrieve(ids);
//
// }


