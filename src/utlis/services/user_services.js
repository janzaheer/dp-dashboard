import axios from "axios";
import { API_VERSION, USER_LIST_ENDPOINT } from "../apiUrls";
let BASE_URL = process.env.REACT_APP_BASE_URL
export async function GetUserData(id,headers){
    let finalUel = `${BASE_URL}${API_VERSION()}${USER_LIST_ENDPOINT()}${id}/`;
    let resp = await axios.get(finalUel, {headers:headers});
    return resp.data;
}

export async function userUpdate(payload,headers){
    let finalUel = `${BASE_URL}${API_VERSION()}user/update_user_details/`;
    let resp = await axios.post(finalUel,payload, {headers:headers});
    return resp.data;
}