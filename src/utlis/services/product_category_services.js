import axios from "axios";

import { BASE_URL,API_VERSION,END_POINT,CATEGORY_ENDPOINT,CATEGORY_ITEMS_LIST_ENDPOINT,SELLER_ITEMS_ENDPOINT } from "../apiUrls";
import useHeaders from "./header_serviecs";




export async function ProductCategory() {
    let finalUrl = BASE_URL + API_VERSION() + CATEGORY_ENDPOINT()
    const resp = await axios.get(finalUrl, {
        headers: useHeaders
    })
    return resp.data
}

export async function ProductsCategoryList(name){
    let finalUrl = BASE_URL + API_VERSION() + END_POINT() + CATEGORY_ITEMS_LIST_ENDPOINT() + name
    const resp = await axios.get( finalUrl,{
        headers: useHeaders
    })
    return resp
}

export async function SellerProductsList(){
    let finalUrl = BASE_URL + API_VERSION() + END_POINT() + SELLER_ITEMS_ENDPOINT()
    const resp = await axios.get( finalUrl,{
        headers: useHeaders
    })
    return resp
}