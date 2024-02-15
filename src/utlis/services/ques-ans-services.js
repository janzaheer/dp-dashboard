import axios from "axios";
import { BASE_URL, API_VERSION } from "../apiUrls";

export async function GetPublicQuestionListings(){
    let finalUel = `${BASE_URL}${API_VERSION()}questions/`;
    let resp = await axios.get(finalUel,);
    return resp.data;
}

export async function GetPublicQuestionListingsSearch(value){
    let finalUel = `${BASE_URL}${API_VERSION()}questions/?search=${value}`;
    let resp = await axios.get(finalUel,);
    return resp.data;
}

export async function GetPersonalQuestionListings(headers){
    let finalUel = `${BASE_URL}${API_VERSION()}questions/my_questions/`;
    let resp = await axios.get(finalUel,{headers:headers});
    return resp.data;
}
export async function SubmitUserQuestion(payload,headers){
    let finalUel = `${BASE_URL}${API_VERSION()}questions/post_question/`;
    let resp = await axios.post(finalUel,payload,{headers:headers});
    return resp;
}