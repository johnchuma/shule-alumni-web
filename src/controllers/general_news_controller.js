import axios from "axios"
import { server_url } from "../utils/endpoint"


export const createGeneralNews = async(data) =>{
    try {
        const formData = new FormData();
        formData.append('file', data.file); 
        delete data.file;
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
        const response = await axios.post(`${server_url}/generalNews/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
       return response.data.status
      } catch (error) {
        console.log(error);
      }
}

export const updateGeneralNews = async(data,uuid) =>{
  try {
      const formData = new FormData();
      formData.append('file', data.file); 
      delete data.file;
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      console.log("uuid",uuid)
      console.log("formData",formData)

      const response = await axios.patch(`${server_url}/generalNews/${uuid}`, formData, {
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
export const getGeneralNews = async()=>{
    try {
     const response = await axios.get(`${server_url}/generalNews/`)
     console.log(response.data.body)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }

 export const getSingleGeneralNews = async(uuid)=>{
  try {
   const response = await axios.get(`${server_url}/generalNews/${uuid}`)
   console.log(response.data.body)
   return response.data.body
  } catch (error) {
   console.log(error)
  }
}

export const deleteGeneralNews = async(uuid)=>{
  try {
   const response = await axios.delete(`${server_url}/generalNews/${uuid}`)
   return response.data.body
  } catch (error) {
   console.log(error)
  }
}