import axios from "axios";
import { BASE_URL, API_VERSION, USER_LIST_ENDPOINT } from "../apiUrls";

export async function GetUserData(id,headers){
    let finalUel = `${BASE_URL}${API_VERSION()}${USER_LIST_ENDPOINT()}${id}/`;
    let resp = await axios.get(finalUel, {headers:headers});
    return resp.data;
}