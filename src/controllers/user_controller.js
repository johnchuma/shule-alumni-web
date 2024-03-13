import axios from "axios"
import { server_url } from "../utils/endpoint"
import { getUser, storeUser } from "../utils/local_storage";

export const register = async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file); 
      delete data.file;
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const response = await axios.post(`${server_url}/user/register`, formData, {
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
  export const updateUser = async (data,uuid) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file); 
      delete data.file;
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const response = await axios.patch(`${server_url}/user/${uuid}`, formData, {
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

  export const deleteUser = async (uuid) => {
    try {
      const response = await axios.delete(`${server_url}/user/${uuid}`);
     return response.data.status
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

export const login = async(data)=>{
    try {
     const response = await axios.post(`${server_url}/user/login`,data)
     storeUser(response.data.response)
     return response.data
    } catch (error) {
      return error.response.data;
    }
 }
 export const resetPassword = async(data)=>{
  try {
   const response = await axios.post(`${server_url}/user/reset-password`,data)
   return response.data
  } catch (error) {
    return error.response.data;
  }
}
export const newPassword = async(data,uuid)=>{
  try {
   const response = await axios.patch(`${server_url}/user/password/${uuid}`,data)
   console.log(response.data.response)
   return response.data
  } catch (error) {
    return error.response.data;
  }
}
 export const getUsers = async(data)=>{
    try {
     const response = await axios.get(`${server_url}/user/`)
     console.log(response.data.body)
      return response.data.body
    } catch (error) {
     console.log(error)
    }
 }
 export const getUserInfo = async(uuid)=>{
  try {
   const response = await axios.get(`${server_url}/user/${uuid}`)
   console.log(response.data.body)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}
 export const getAllUsers = async(data)=>{
  try {
   const response = await axios.get(`${server_url}/user/all`)
   console.log(response.data.body)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}
 export const getAllAlumni = async()=>{
  try {
    const response = await axios.get(`${server_url}/user/alumni`)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}
 export const totalUsers = async()=>{
  try {
   const response = await axios.get(`${server_url}/user/count`)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
} 
export const totalSchoolUsers = async()=>{
  try {
    const user = getUser()
   const response = await axios.get(`${server_url}/user/count/${user.School.uuid}`)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}

export const totalResources = async()=>{
  try {
   const response = await axios.get(`${server_url}/user/resources`)
  console.log(response.data.body)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}
 export const getHeadmasters = async(data)=>{
  try {
   const response = await axios.get(`${server_url}/user/headmasters`)
   console.log(response.data.body)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}
 export const getSchoolAlumni = async(uuid)=>{
  try {
    const user = getUser()
    let response;
       response = await axios.get(`${server_url}/user/alumni/${uuid??user.School.uuid}`)
       console.log(response)
    return response.data.body
  } catch (error) {
   console.log(error)
  }
}
 