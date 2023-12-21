import axios from "axios";
import { BASE_URL,API_VERSION,ORDER_ENDPOINT, ORDER_CANCEL } from "../apiUrls";

export async function SellerOrderList(headers){
    let finalURL = BASE_URL + API_VERSION() + ORDER_ENDPOINT()
    const resp = await axios.get(finalURL, { headers: headers })
    return resp.data
}

export async function OrderCancel(id,headers){
    let finalURL = BASE_URL + API_VERSION() + ORDER_ENDPOINT() + `${id}/canceled_order/`
    const resp = await axios.post(finalURL,{}, { headers: headers })
    return resp.data
}