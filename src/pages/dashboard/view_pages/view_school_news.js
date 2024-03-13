import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Stack, Tab, Tabs } from 'react-bootstrap'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { greenColor, mutedBlack } from '../../../utils/colors'
import Paragraph from '../../../general_widgets/paragraph'
import Heading from '../../../general_widgets/heading'
import CustomButton from '../../../general_widgets/button'

import DeleteConfirmation from '../../../general_widgets/delete_confirmation'
import { deleteSchoolNews, getAllSchoolNews, getSchoolNews } from '../../../controllers/school_news.controller'
import UpdateSchoolNewsModal from '../update_models/update_school_news'
import { getUser } from '../../../utils/local_storage'
import { timeAgo } from '../../../utils/tile_ago'


const ViewSchoolNews = () => {
const [activeTab, setActiveTab] = useState(0);
const navigate = useNavigate();
const {uuid} = useParams();
const [showSchoolNewsModal, setShowSchoolNewsModal] = useState(false);
const [deleteConfirmation, setDeleteConfirmation] = useState(false);
const [SchoolNews, setSchoolNews] = useState(null);
useEffect(() => {
    if(showSchoolNewsModal == false){
        getSchoolNews(uuid).then((data)=>setSchoolNews(data))
    }
}, [showSchoolNewsModal]);
const user = getUser()
    return (
        <div>
           <UpdateSchoolNewsModal news={SchoolNews} show={showSchoolNewsModal} onHide={()=>setShowSchoolNewsModal(false)}/>
           <DeleteConfirmation deleteFunction={()=>{
            deleteSchoolNews(SchoolNews.uuid).then(()=>{
                navigate('/dashboard/news')
            })
           }} show={deleteConfirmation } onHide={()=>setDeleteConfirmation(false)}/>

           <Stack direction='horizontal' className='d-flex justify-content-between  mt-4'>
          <Stack direction='horizontal'>
            <div onClick={()=>navigate("/dashboard/news")} className='btn border-0 px-0'>
            <AiOutlineArrowLeft  className='me-3' size={20} color={mutedBlack}/>

            </div>
            <Heading text={`Read news`} className={"me-auto"}/>

          </Stack>
          {
            user.role == "Moderator" && <Stack direction='horizontal'>
                <CustomButton color={greenColor} onClick={()=>setShowSchoolNewsModal(true)} className={`ms-auto me-3`} text={"Edit"}/>

<CustomButton onClick={()=>setDeleteConfirmation(true)} text={"Delete"}/>
            </Stack>
          }
          
       </Stack>
    {
        SchoolNews !== null &&
        <div className='bg-white p-4 mt-5'>
            <Heading text={SchoolNews.title}/>
        <Paragraph color={mutedBlack} text={"Created: "+timeAgo(SchoolNews.createdAt) }/>
            <Row className='mt-3'>
            <Col md={7}>
        <Paragraph  text={SchoolNews.description}/>
            </Col>
            <Col md={5}>
                <Image className='rounded' fluid src={SchoolNews.image}/>
            </Col>
        </Row>
        
        
       </div>
    }
        </div>
       
    )
}

export default ViewSchoolNews
