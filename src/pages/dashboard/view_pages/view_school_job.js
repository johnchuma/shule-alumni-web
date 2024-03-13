import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Stack, Tab, Tabs } from 'react-bootstrap'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { greenColor, mutedBlack } from '../../../utils/colors'
import Paragraph from '../../../general_widgets/paragraph'
import Heading from '../../../general_widgets/heading'
import CustomButton from '../../../general_widgets/button'

import { getUser } from '../../../utils/local_storage'
import { deleteSchoolJob, getSchoolJob } from '../../../controllers/job_controller'
import DeleteConfirmation from '../../../general_widgets/delete_confirmation'
import { timeAgo } from '../../../utils/tile_ago'
import UpdateJobModal from '../update_models/update_job_oppoturnity'



const ViewSchoolJob = () => {
const [activeTab, setActiveTab] = useState(0);
const navigate = useNavigate()
const {uuid} = useParams()
const [showSchoolJobModal, setShowSchoolJobModal] = useState(false);
const [deleteConfirmation, setDeleteConfirmation] = useState(false);
const [SchoolJob, setSchoolJob] = useState(null);
useEffect(() => {
    if(showSchoolJobModal == false){
        getSchoolJob(uuid).then((data)=>setSchoolJob(data))
    }
}, [showSchoolJobModal]);
const user = getUser()

    return (
        <div>
            <UpdateJobModal news={SchoolJob} show={showSchoolJobModal} onHide={()=>setShowSchoolJobModal(false)} />
           {/* <UpdateSchoolJobModal event={SchoolJob} show={showSchoolJobModal} onHide={()=>setShowSchoolJobModal(false)}/> */}
           <DeleteConfirmation deleteFunction={()=>{
            deleteSchoolJob(SchoolJob.uuid).then(()=>{
                navigate('/dashboard/school-job')
            })
           }} show={deleteConfirmation } onHide={()=>setDeleteConfirmation(false)}/>

           <Stack direction='horizontal' className='d-flex  mt-4'>
          <Stack direction='horizontal' className='me-auto'>
            <div onClick={()=>navigate(-1)} className='btn border-0 px-0'>
            <AiOutlineArrowLeft  className='me-3' size={20} color={mutedBlack}/>
            </div>
            <Heading text={`Job oppotunity`}/>

          </Stack>
          {
            ["Moderator","Alumni"].includes(user.role) && <Stack direction='horizontal'>
                  <CustomButton color={greenColor} onClick={()=>setShowSchoolJobModal(true)} className={`ms-auto me-3`} text={"Edit"}/>
<CustomButton onClick={()=>setDeleteConfirmation(true)} text={"Delete"}/>
            </Stack>
          }
       </Stack>
    {
        SchoolJob !== null &&
        <div className='bg-white p-4 mt-5'>
            <Heading text={SchoolJob.title}/>
        <Paragraph color={mutedBlack} text={"Published: "+timeAgo(SchoolJob.createdAt)}/>
            <Row className='mt-3'>
            <Col md={7}>
        <Paragraph   text={SchoolJob.description}/>
        <CustomButton href={SchoolJob.link} className={"mt-5"} text={"Apply now"}/>
            </Col>
            <Col md={5}>
                <Image className='rounded' fluid src={SchoolJob.image}/>
            </Col>
        </Row>
        
        
       </div>
    }
        </div>
       
    )
}

export default ViewSchoolJob
