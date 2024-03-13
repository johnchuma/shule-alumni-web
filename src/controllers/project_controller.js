
import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser } from "../utils/local_storage";


export const createProject = async(data) =>{
    try {
      const formData = new FormData();
      formData.append('file', data.file); 
      delete data.file;
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
        const user = getUser()
        const response = await axios.post(`${server_url}/project/${user.School.uuid}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
       return response.data.status
      } catch (error) {
        console.log(error);
      }
}
export const updateProject = async(data,uuid) =>{
  try {
    const formData = new FormData();
    formData.append('file', data.file); 
    delete data.file;
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
      const user = getUser()
      const response = await axios.patch(`${server_url}/project/${uuid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
     return response.data.status
    } catch (error) {
      console.log(error);
    }
}
export const getAllProject = async(uuid)=>{
    try {
    const user = getUser()
     const response = await axios.get(`${server_url}/project/all/${uuid??user.School.uuid}`)
     console.log(response.data.body)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 export const totalSchoolProject = async()=>{
  try {
  const user = getUser()
   const response = await axios.get(`${server_url}/project/count/${user.School.uuid}`)
   console.log(response.data.body)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}
 export const getProject = async(uuid)=>{
    try {
     const response = await axios.get(`${server_url}/project/${uuid}`)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 export const deleteProject = async(uuid)=>{
    try {
     const response = await axios.delete(`${server_url}/project/${uuid}`)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
