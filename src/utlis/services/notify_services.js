import axios from "axios";
import { BASE_URL,API_VERSION } from "../apiUrls";

export async function Notify () {
    let final = BASE_URL + API_VERSION() + `notification/`;
    const res = await axios.get(final)
    return res
}