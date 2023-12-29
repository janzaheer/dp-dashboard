import axios from "axios";

export async function CreateReview(id,payload,headers){
    const response = await axios.post(`http://ec2-43-206-254-199.ap-northeast-1.compute.amazonaws.com/api/v1/items/${id}/add_comment_rating/`,payload, {headers:headers});
    return response.data
}