import axios from "axios";
import { API_VERSION } from "../apiUrls";

let BASE_URL = process.env.REACT_APP_BASE_URL

export async function Notify () {
    let final = BASE_URL + API_VERSION() + `notification/`;
    const res = await axios.get(final)
    return res
}