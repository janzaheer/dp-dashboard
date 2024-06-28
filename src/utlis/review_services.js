import axios from "axios";
// import { BASE_URL } from "./apiUrls";

let BASE_URL = process.env.REACT_APP_BASE_URL

export async function CreateReview(id,payload,headers){
    const response = await axios.post(`${BASE_URL}api/v1/items/${id}/add_comment_rating/`,payload, {headers:headers});
    return response.data
}