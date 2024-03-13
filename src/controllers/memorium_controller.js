
import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser } from "../utils/local_storage";


export const createSchoolMemorium = async(data) =>{
    try {
        const formData = new FormData();
        formData.append('file', data.file); 
        delete data.file;
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
        const user = getUser()
        const response = await axios.post(`${server_url}/memorium/${user.School.uuid}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
       return response.data.status
      } catch (error) {
        console.log(error);
      }
}
export const updateSchoolMemorium = async(data,uuid) =>{
  try {
      const formData = new FormData();
      formData.append('file', data.file); 
      delete data.file;
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const response = await axios.patch(`${server_url}/memorium/${uuid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      console.log("response",response)
     return response.data.status
    } catch (error) {
      console.log(error);
    }
}
export const getAllSchoolMemorium = async(uuid)=>{
    try {
    const user = getUser()
     const response = await axios.get(`${server_url}/memorium/all/${uuid??user.School.uuid}`)
     console.log(response.data.body)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 export const getSchoolMemorium = async(uuid)=>{
    try {
     const response = await axios.get(`${server_url}/memorium/${uuid}`)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 export const deleteSchoolMemorium = async(uuid)=>{
    try {
     const response = await axios.delete(`${server_url}/memorium/${uuid}`)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
