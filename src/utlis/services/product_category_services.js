import axios from "axios";

import { BASE_URL,API_VERSION,END_POINT,CATEGORY_ENDPOINT,CATEGORY_ITEMS_LIST_ENDPOINT } from "../apiUrls";

export async function AgentList() {
    let finalUrl = BASE_URL + API_VERSION()
    const resp = await axios.get(finalUrl)
    return resp.data
}