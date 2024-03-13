
import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser } from "../utils/local_storage";


export const createPledge = async(data) =>{
    try {
        
        const project_uuid = data.project_uuid;
        console.log(project_uuid);
        delete data.project_uuid
        const response = await axios.post(`${server_url}/pledge/${project_uuid}`, data);

       return response.data;
      } catch (error) {
        console.log(error);
      }
}
export const updatePledge = async(data,uuid) =>{
  try {
      const response = await axios.patch(`${server_url}/pledge/amount/${uuid}`, data);
     return response.data;
    } catch (error) {
      console.log(error);
    }
}
export const getAllPledge = async(uuid)=>{
    try {
     const response = await axios.get(`${server_url}/pledge/all/${uuid}`)
     console.log(response.data.body)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 
 export const getPledge = async(uuid)=>{
    try {
     const response = await axios.get(`${server_url}/pledge/${uuid}`)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 export const deletePledge = async(uuid)=>{
    try {
      console.log("uuid",uuid)
     const response = await axios.delete(`${server_url}/pledge/${uuid}`)
      return response.data.status
    } catch (error) {
     console.log(error)
    }
 }
