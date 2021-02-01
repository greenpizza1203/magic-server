import axios from "axios";

async function axiosSearch({url, ...params}) {
    return axios(url, {params})
}

async function fetchFromSerp(query: string) {
    let response = await axiosSearch({
        url: 'https://serpapi.com/search',
        q: `site:quizlet.com ${query}`,
        api_key: "fe68d706a01dcb6804e5081d28982113d18c7e208b78c681fa66a699c884c06a",
        engine: "google"
    });
    return response.data.organic_results
}

async function fetchFromGoogle(query: string, api_key: string = "fe68d706a01dcb6804e5081d28982113d18c7e208b78c681fa66a699c884c06a", engine: string = "google") {
    let response = await axiosSearch({
        url: 'https://www.googleapis.com/customsearch/v1',
        q: `site:quizlet.com ${query}`,
        key: "AIzaSyA7oSy_8zgG_0BKynGyH4Sh4WOhCTPdziQ",
        cx: "d4b9b1bcef3e6d85b"
    });
    return response.data.items
}


export default function searchQuizlet(query: string): Promise<{ link: string }[]> {

    return fetchFromGoogle(query)
}
// fetchFromGoogle("coffee").then(console.log)
