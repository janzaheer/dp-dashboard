import axios from "axios";
import { USER_LIST_ENDPOINT,ADDRESS_ADD_ENDPOINT,API_VERSION,ADDRESS_REMOVE_ENDPOINT } from "../apiUrls";

let BASE_URL = process.env.REACT_APP_BASE_URL

export async function CreateAddress(payload,headers){
    let addAddressUrl =
    BASE_URL + API_VERSION() + USER_LIST_ENDPOINT() + ADDRESS_ADD_ENDPOINT();
    const response = await axios.post(addAddressUrl,payload, {headers: headers});
    return response.data
}

export async function DeleteAddress(payload,headers){
    let removeAddressUrl = BASE_URL + API_VERSION() + USER_LIST_ENDPOINT() + ADDRESS_REMOVE_ENDPOINT()
    const response = await axios.post(removeAddressUrl,payload, {headers: headers});
    return response.data
}