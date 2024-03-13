import axios from "axios";
import { server_url } from "../utils/endpoint";
import { getUser } from "../utils/local_storage";

export const getLink = async(pledge_uuid)=>{
    try {
        const user = getUser()
        const response = await axios.post(`${server_url}/transaction/request-link/${pledge_uuid}`,{
            user_uuid:user.uuid
        })
        const link = response.data.body.data.link;
        window.open(link,"_blank")
    } catch (error) {
        console.error(error)
    }
}

export const getGeneralTransactions = async()=>{
    try {
        const response = await axios.get(`${server_url}/transaction`)
        return response.data.body
    } catch (error) {
        console.error(error)
    }
}
export const getTotalAlumniDonations = async()=>{
    try {
        const response = await axios.get(`${server_url}/transaction/total`)
        console.log(response.data.body)
        return response.data.body
    } catch (error) {
        console.error(error)
    }
}
export const getTotalSchoolDonations = async()=>{
    try {
        const user = getUser()
        const response = await axios.get(`${server_url}/transaction/total/${user.School.uuid}`)
        return response.data.body
    } catch (error) {
        console.error(error)
    }
}
export const getProjectTransactions = async(uuid)=>{
    try {
        const response = await axios.get(`${server_url}/transaction/project/${uuid}`,{})
        return response.data.body
    } catch (error) {
        console.error(error)
    }
}