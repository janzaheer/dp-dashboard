import axios from "axios";
import { BASE_URL } from "./apiUrls";

export async function CreateReview(id,payload,headers){
    const response = await axios.post(`${BASE_URL}api/v1/items/${id}/add_comment_rating/`,payload, {headers:headers});
    return response.data
}