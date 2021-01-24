import Fuse from "fuse.js";


export type card = { word: string, definition: string, id: string }
export type set = card[]


export const options: Fuse.IFuseOptions<card> = {
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


export class Fuzzy {
    fuse: Fuse<{}>
    db = {}

    cards: { [key: string]: card } = {}

    addSets(sets: { [key: string]: set }) {
        for (const setId in sets) {
            if (!this.db[setId]) {
                for (const card of sets[setId]) this.cards[card.id] ??= card;
                (this.db)[setId] = true;
            }
        }
        // console.log(Object.keys(this.cards))
        let targets = Object.values(this.cards)
        this.fuse = new Fuse<card>(targets, options)
    }

    search(target): Fuse.FuseResult<card>[] {
        return this.fuse?.search(target, {limit: 3})
    }
}
