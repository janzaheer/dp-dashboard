import axios from "axios";

import { BASE_URL,API_VERSION,END_POINT,CATEGORY_ENDPOINT,CATEGORY_ITEMS_LIST_ENDPOINT,SELLER_ITEMS_ENDPOINT } from "../apiUrls";
import {useHeaders} from "./header_serviecs";

export async function ProductCategory(headers) {
    let finalUrl = BASE_URL + API_VERSION() + CATEGORY_ENDPOINT()
    const resp = await axios.get(finalUrl, { headers: headers })
    return resp.data
}

export async function ProductsFav(headers){
    let finalUrl = BASE_URL + API_VERSION() + `favourite/items/`
    const resp = await axios.get( finalUrl, { headers: headers })
    return resp.data
}

export async function ProductsSearch(headers, search_name){
    let finalUrl = BASE_URL + API_VERSION() + END_POINT() + `?search=${search_name}`
    const resp = await axios.get(finalUrl, { headers: headers })
    return resp.data
}

export async function SellerProductsList(headers){
    let finalUrl = BASE_URL + API_VERSION() + END_POINT() + SELLER_ITEMS_ENDPOINT()
    const resp = await axios.get( finalUrl, { headers: headers })
    return resp.data
}

export async function DeleteSellerProducts(id,headers){
    let finalUrl = BASE_URL + API_VERSION() + END_POINT() + id + `/`;
    const resp = await axios.delete( finalUrl,{ headers: headers })
    return resp.data
}

export async function ProductDetail(id,headers){
    let finalUrl = BASE_URL + API_VERSION() + END_POINT() + id + `/`
    const resp = await axios.get( finalUrl, { headers: headers })
    return resp.data
}