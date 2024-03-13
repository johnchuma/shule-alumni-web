import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Stack, Tab, Tabs } from 'react-bootstrap'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { greenColor, mutedBlack } from '../../../utils/colors'
import Paragraph from '../../../general_widgets/paragraph'
import Heading from '../../../general_widgets/heading'
import CustomButton from '../../../general_widgets/button'


import { getUser } from '../../../utils/local_storage'
import { deleteSchoolMemorium, getSchoolMemorium } from '../../../controllers/memorium_controller'
import DeleteConfirmation from '../../../general_widgets/delete_confirmation'
import { timeAgo } from '../../../utils/tile_ago'
import UpdateMemoriumModal from '../update_models/update_memorium_modal'


const ViewSchoolMemorium = () => {
const [activeTab, setActiveTab] = useState(0);
const navigate = useNavigate()
const {uuid} = useParams()
const [showSchoolMemoriumModal, setShowSchoolMemoriumModal] = useState(false);
const [deleteConfirmation, setDeleteConfirmation] = useState(false);
const [SchoolMemorium, setSchoolMemorium] = useState(null);
useEffect(() => {
    if(showSchoolMemoriumModal == false){
        getSchoolMemorium(uuid).then((data)=>setSchoolMemorium(data))
    }
}, [showSchoolMemoriumModal]);
const user = getUser()

    return (
        <div>
            <UpdateMemoriumModal news={SchoolMemorium} show={showSchoolMemoriumModal} onHide={()=>setShowSchoolMemoriumModal(false)}/>
           {/* <UpdateSchoolMemoriumModal event={SchoolMemorium} show={showSchoolMemoriumModal} onHide={()=>setShowSchoolMemoriumModal(false)}/> */}
           <DeleteConfirmation deleteFunction={()=>{
            deleteSchoolMemorium(SchoolMemorium.uuid).then(()=>{
                navigate('/dashboard/school-memorium')
            })
           }} show={deleteConfirmation } onHide={()=>setDeleteConfirmation(false)}/>

           <Stack direction='horizontal' className='d-flex  mt-4'>
          <Stack direction='horizontal' className='me-auto'>
            <div onClick={()=>navigate(-1)} className='btn border-0 px-0'>
            <AiOutlineArrowLeft  className='me-3' size={20} color={mutedBlack}/>
            </div>
            <Heading text={`In memorium`}/>

          </Stack>
          {
            ["Moderator","Alumni"].includes(user.role) && <Stack direction='horizontal'>
                  <CustomButton  color={greenColor} onClick={()=>setShowSchoolMemoriumModal(true)} className={`ms-auto me-3`} text={"Edit"}/>
<CustomButton  onClick={()=>setDeleteConfirmation(true)} text={"Delete"}/>
            </Stack>
          }
        
       </Stack>
    {
        SchoolMemorium !== null &&
        <div className='bg-white p-4 mt-5 px-5'>
            <Row className='mt-3'>
            <Col md={12} className='text-center'>
            <Image className='rounded-circle' style={{ height:150,width:150,objectFit:"cover" }} fluid src={SchoolMemorium.image}/>
            <Heading text={SchoolMemorium.name}/>
            <Paragraph color={mutedBlack} text={"Rest in peace "}/>
            <br/>
        <Paragraph  text={SchoolMemorium.description}/>
            </Col>
        </Row>
        
        
       </div>
    }
        </div>
       
    )
}

export default ViewSchoolMemorium
