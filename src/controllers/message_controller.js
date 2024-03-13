import axios from "axios";
import { server_url } from "../utils/endpoint";

export const replyMessage = async(data,uuid) =>{
    try {
        const response = await axios.post(`${server_url}/message/reply/${uuid}`, data);
       return response.data.body
      } catch (error) {
        console.log(error);
      }
}
export const sendMessage = async(data) =>{
  try {
      const response = await axios.post(`${server_url}/user/message/`, data);
     return response.data.body
    } catch (error) {
      console.log(error);
    }
}
export const sendInquiry = async(data) =>{
  try {
      const response = await axios.post(`${server_url}/message/`, data);
     return response.data.body
    } catch (error) {
      console.log(error);
    }
}
export const getMessage = async() =>{
    try {
        const response = await axios.get(`${server_url}/message/`);
       return response.data.body
      } catch (error) {
        console.log(error);
      }
}