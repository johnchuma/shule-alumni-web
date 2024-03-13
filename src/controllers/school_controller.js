import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser } from "../utils/local_storage";

export const addSchool = async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file); 
      delete data.file;
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const response = await axios.post(`${server_url}/school/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
     return response.data.status
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateSchool = async (data,uuid) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file); 
      delete data.file;
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const response = await axios.patch(`${server_url}/school/${uuid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
     return response.data.status
    } catch (error) {
      console.log(error);
    }
  };
  export const totalSchools = async()=>{
    try {
     const response = await axios.get(`${server_url}/school/count`)
     console.log("response",response)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
  }
  export const totalSchoolPosts = async(data)=>{
    try {
      const user = getUser()
     const response = await axios.get(`${server_url}/school/resources/${user.School.uuid}`)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
  }
  export const deleteSchool = async(uuid)=>{
    try {
     const response = await axios.delete(`${server_url}/school/${uuid}`)
      return response.data.status
    } catch (error) {
     console.log(error)
    }
 }
 export const getSchools = async()=>{
    try {
     const response = await axios.get(`${server_url}/school/`)
     console.log(response.data.body)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 export const getSchool = async(uuid)=>{
  try {
   const response = await axios.get(`${server_url}/school/${uuid}`)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}