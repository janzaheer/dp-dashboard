import axios from "axios";
import { API_VERSION,ORDER_ENDPOINT,ORDER_PLACED_ENDPOINT } from "../apiUrls";
let BASE_URL = process.env.REACT_APP_BASE_URL
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

export async function OrderDetail(id, headers){
    let finalURL = BASE_URL + API_VERSION() + ORDER_ENDPOINT() + `${id}/`
    const resp = await axios.get(finalURL, { headers: headers })
    return resp.data
}

export async function OrderAdd(placeOrder,headers){
    let finalURL = BASE_URL + API_VERSION() + ORDER_ENDPOINT() + ORDER_PLACED_ENDPOINT()
    const resp = await axios.post(finalURL,placeOrder,{ headers: headers })
    return resp.data
}