import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Stack, Tab, Tabs } from 'react-bootstrap'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteGeneralNews, getGeneralNews, getSingleGeneralNews } from '../../../controllers/general_news_controller'
import { greenColor, mutedBlack } from '../../../utils/colors'
import Paragraph from '../../../general_widgets/paragraph'
import Heading from '../../../general_widgets/heading'
import CustomButton from '../../../general_widgets/button'
import UpdateGeneralNewsModal from '../update_models/update_general_news'
import DeleteConfirmation from '../../../general_widgets/delete_confirmation'
import { timeAgo } from '../../../utils/tile_ago'


const ViewGeneralNews = () => {
const [activeTab, setActiveTab] = useState(0);
const navigate = useNavigate()
const {uuid} = useParams()
const [showGeneralNewsModal, setShowGeneralNewsModal] = useState(false);
const [deleteConfirmation, setDeleteConfirmation] = useState(false);
const [generalNews, setGeneralNews] = useState(null);
useEffect(() => {
    if(showGeneralNewsModal == false){
        getSingleGeneralNews(uuid).then((data)=>setGeneralNews(data))

    }
}, [showGeneralNewsModal]);
    return (
        <div>
           <UpdateGeneralNewsModal news={generalNews} show={showGeneralNewsModal} onHide={()=>setShowGeneralNewsModal(false)}/>
           <DeleteConfirmation deleteFunction={()=>{
            deleteGeneralNews(generalNews.uuid).then(()=>{
                navigate('/dashboard/general-news')
            })
           }} show={deleteConfirmation } onHide={()=>setDeleteConfirmation(false)}/>

           <Stack direction='horizontal' className='d-flex  mt-4'>
          <Stack direction='horizontal' className='me-auto'>
            <div onClick={()=>navigate("/dashboard/general-news")} className='btn border-0 px-0'>
            <AiOutlineArrowLeft  className='me-3' size={20} color={mutedBlack}/>

            </div>
            <Heading text={`Read news`} className={"me-auto"}/>

          </Stack>
          <CustomButton color={greenColor} onClick={()=>setShowGeneralNewsModal(true)} className={`ms-auto me-3`} text={"Edit"}/>

          <CustomButton onClick={()=>setDeleteConfirmation(true)} text={"Delete"}/>
       </Stack>
    {
        generalNews !== null &&
        <div className='bg-white p-4 mt-5'>
            <Heading text={generalNews.title}/>
        <Paragraph color={mutedBlack} text={"Created: "+timeAgo(generalNews.createdAt) }/>
            <Row className='mt-3'>
            <Col md={7}>
        <Paragraph  text={generalNews.description}/>
            </Col>
            <Col md={5}>
                <Image className='rounded' fluid src={generalNews.image}/>
            </Col>
        </Row>
        
        
       </div>
    }
        </div>
       
    )
}

export default ViewGeneralNews
