import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Stack, Tab, Tabs } from 'react-bootstrap'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { greenColor, mutedBlack } from '../../../utils/colors'
import Paragraph from '../../../general_widgets/paragraph'
import Heading from '../../../general_widgets/heading'
import CustomButton from '../../../general_widgets/button'

import DeleteConfirmation from '../../../general_widgets/delete_confirmation'

import { deleteSchoolEvent, getSchoolEvent } from '../../../controllers/school_event_controller'
import UpdateSchoolEventModal from '../update_models/update_school_event'
import { getUser } from '../../../utils/local_storage'
import { timeAgo } from '../../../utils/tile_ago'


const ViewSchoolEvent = () => {
const [activeTab, setActiveTab] = useState(0);
const navigate = useNavigate()
const {uuid} = useParams()
const [showSchoolEventModal, setShowSchoolEventModal] = useState(false);
const [deleteConfirmation, setDeleteConfirmation] = useState(false);
const [SchoolEvent, setSchoolEvent] = useState(null);
useEffect(() => {
    if(showSchoolEventModal == false){
        getSchoolEvent(uuid).then((data)=>setSchoolEvent(data))
    }
}, [showSchoolEventModal]);
const user = getUser()

    return (
        <div>
           <UpdateSchoolEventModal event={SchoolEvent} show={showSchoolEventModal} onHide={()=>setShowSchoolEventModal(false)}/>
           <DeleteConfirmation deleteFunction={()=>{
            deleteSchoolEvent(SchoolEvent.uuid).then(()=>{
                navigate('/dashboard/events')
            })
           }} show={deleteConfirmation } onHide={()=>setDeleteConfirmation(false)}/>

           <Stack direction='horizontal' className='d-flex  mt-4'>
          <Stack direction='horizontal' className='me-auto'>
            <div onClick={()=>navigate(-1)} className='btn border-0 px-0'>
            <AiOutlineArrowLeft  className='me-3' size={20} color={mutedBlack}/>
            </div>
            <Heading text={`Read event`}/>

          </Stack>
          {
            user.role =="Moderator" && <Stack direction='horizontal'>
                  <CustomButton color={greenColor} onClick={()=>setShowSchoolEventModal(true)} className={`ms-auto me-3`} text={"Edit"}/>
<CustomButton onClick={()=>setDeleteConfirmation(true)} text={"Delete"}/>
            </Stack>
          }
        
       </Stack>
    {
        SchoolEvent !== null &&
        <div className='bg-white p-4 mt-5'>
            <Heading text={SchoolEvent.title}/>
        <Paragraph color={mutedBlack} text={"Created: "+timeAgo(SchoolEvent.createdAt)}/>
            <Row className='mt-3'>
            <Col md={7}>
        <Paragraph  text={SchoolEvent.description}/>
            </Col>
            <Col md={5}>
                <Image className='rounded' fluid src={SchoolEvent.image}/>
            </Col>
        </Row>
        
        
       </div>
    }
        </div>
       
    )
}

export default ViewSchoolEvent
