import axios from "axios";
import useHeaders from "./header_serviecs";
import { BASE_URL,API_VERSION,ORDER_ENDPOINT } from "../apiUrls";

export async function SellerOrderList(){
    let finalURL = BASE_URL + API_VERSION() + ORDER_ENDPOINT()
    const resp = await axios.get(finalURL, {
        headers: useHeaders
    })
    return resp
}