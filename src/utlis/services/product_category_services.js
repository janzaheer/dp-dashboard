import axios from "axios";
import { API_VERSION,END_POINT,CATEGORY_ENDPOINT,SELLER_ITEMS_ENDPOINT,FAV_ENDPOINT,ADD_PRODUCT_ENDPOINT } from "../apiUrls";
let BASE_URL = process.env.REACT_APP_BASE_URL

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

export async function ProductsSearch(search_name, headers){
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

export async function SingleProductDetail(id){
    let finalUrl = BASE_URL + API_VERSION() + END_POINT() + id + `/detail_item/`
    const resp = await axios.get( finalUrl)
    return resp.data
}

export async function AddProductsFav(payload,headers){
    let finalUrl = BASE_URL + API_VERSION() + FAV_ENDPOINT()
    const resp = await axios.post( finalUrl,payload, { headers: headers })
    return resp
}

export async function AddSellerProduct(payload,headers){
    let finalUrl = BASE_URL + API_VERSION() + END_POINT() + ADD_PRODUCT_ENDPOINT()
    const resp = await axios.post( finalUrl,payload, {headers: headers})
    return resp
}