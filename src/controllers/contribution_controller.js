
import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser } from "../utils/local_storage";


export const createContribution = async(data) =>{
    try {
        const project_uuid = data.project_uuid;
        delete data.project_uuid
        const response = await axios.post(`${server_url}/contribution/${project_uuid}`, data);
       return response.data.status
      } catch (error) {
        console.log(error);
      }
}
export const contributionAmount = async(data)=>{
  try {
   const response = await axios.get(`${server_url}/contibution/total`)
    return response.data.body??0
  } catch (error) {
   console.log(error)
  }
}
export const getAllContribution = async(uuid)=>{
    try {
     const response = await axios.get(`${server_url}/contribution/all/${uuid}`)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 export const getContribution = async(uuid)=>{
    try {
     const response = await axios.get(`${server_url}/contribution/${uuid}`)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 export const deleteContribution = async(uuid)=>{
    try {
     const response = await axios.delete(`${server_url}/contribution/${uuid}`)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
