import axios from "axios";
import { getUser } from "../utils/local_storage";
import { server_url } from "../utils/endpoint";

export const uploadImageToGallery = async(data) =>{
    try {
        const formData = new FormData();
        formData.append('file', data.file); 
        delete data.file;
        const user = getUser()
        const response = await axios.post(`${server_url}/user/gallery/${user.uuid}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
       return response.data.status
      } catch (error) {
        console.log(error);
      }
}
export const deleteImage = async(uuid)=>{
    try {
       const response = await axios.delete(`${server_url}/user/gallery/${uuid}`)
       return response
    } catch (error) {
        console.log(error)
    }
}