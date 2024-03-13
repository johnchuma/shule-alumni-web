
import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser } from "../utils/local_storage";


export const createSchoolJob = async(data) =>{
    try {
        const formData = new FormData();
        formData.append('file', data.file); 
        delete data.file;
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
        const user = getUser()
        const response = await axios.post(`${server_url}/job/${user.School.uuid}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
       return response.data.status
      } catch (error) {
        console.log(error);
      }
}
export const updateSchoolJob = async(data,uuid) =>{
  try {
      const formData = new FormData();
      formData.append('file', data.file); 
      delete data.file;
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const response = await axios.patch(`${server_url}/job/${uuid}`, formData, {
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
export const getAllSchoolJob = async(uuid)=>{
    try {
    const user = getUser()
     const response = await axios.get(`${server_url}/job/all/${uuid??user.School.uuid}`)
     console.log(response.data.body)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 export const getSchoolJob = async(uuid)=>{
    try {
     const response = await axios.get(`${server_url}/job/${uuid}`)
  
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 export const sendSMS = async()=>{
  try {
    var data = JSON.stringify({
      "from": "N-SMS",
      "to":"255627707434",
      "text": "mambo"
    });
    const response = await axios.post('https://messaging-service.co.tz/api/sms/v1/test/text/single',data)
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}
 export const deleteSchoolJob = async(uuid)=>{
    try {
     const response = await axios.delete(`${server_url}/job/${uuid}`)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
