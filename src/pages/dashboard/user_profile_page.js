import React, { useEffect, useState } from 'react'
import { Card, Carousel, Col, Image, Modal, Row, Spinner, Stack, Tab, Tabs } from 'react-bootstrap'

import { greenColor, lightPrimaryColor, mutedBlack, primaryColor } from '../../utils/colors'
import { FaBackward, FaParagraph } from 'react-icons/fa'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserInfo } from '../../controllers/user_controller'
import Heading from '../../general_widgets/heading'
import Paragraph from '../../general_widgets/paragraph'
import SubHeading from '../../general_widgets/subheading'
import Loader from '../../utils/loader'
const UserProfilePage = () => {
const [activeTab, setActiveTab] = useState(0);
const navigate = useNavigate()
const {uuid} = useParams()
const [user, setUser] = useState(null);
useEffect(() => {
   getUserInfo(uuid).then((data)=>setUser(data))
}, []);
const [selectedImage, setSelectedImage] = useState(null);
const [showGalleryModal, setShowGalleryModal] = useState(false);

    return (
       
       user?<div>
        <Modal size='lg' centered show={showGalleryModal} onHide={()=>setShowGalleryModal(false)}>
            <Modal.Body className='bg-dark p-0  rounded'>
                <Carousel defaultActiveIndex={selectedImage} indicators={false}>
                    {user.Galleries.map((item)=>
                     <Carousel.Item onChange={()=>setSelectedImage(item)} >
                         <Image fluid className='w-100 rounded' style={{ objectFit:"cover" }} src={item.image}/>
                     </Carousel.Item>
                        )}
                  
                </Carousel>
            </Modal.Body>
        </Modal>
          
           <Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
          <Stack direction='horizontal'>
            <div onClick={()=>navigate(-1)} className='btn border-0 px-0'>
            <AiOutlineArrowLeft  className='me-3' size={20} color={mutedBlack}/>
            </div>
            <Heading text={user&&`${user&&user.name}'s profile`}/>
          </Stack>
       
         
       </Stack>
     
       <Row className='mt-4'>
       <Col md={{ span:4, order:2 }}>
                <Card className='border-0 mb-4'>
                    <Card.Body className='text-center'>
                    <Image src={user.image} className='rounded-circle' style={{ height:100,width:100,objectFit:"cover" }}/>
                      <SubHeading text={user.name}/>
                      <Paragraph text={`Graduated: ${user.graduation_year}`}/>
                      <hr className='my-4'/>
                      <SubHeading text={"Contact info"}/>
                       <Paragraph text={`${user.email}`}/>
                       <Paragraph text={`${user.phone}`}/>
                      <hr className='my-4'/>

                       <SubHeading text={"Work"}/>
                       <Paragraph text={`Working at: ${user.company}`}/>
                       <Paragraph text={`Position: ${user.position}`}/>
                       <hr className='my-4'/>
                       <SubHeading text={"Address"}/>
                       <Paragraph text={`${user.address}`}/>
                       <hr className='my-4'/>
                       <SubHeading text={"Birthday"}/>
                       <Paragraph text={`${user.birth_date}`}/>

                       
                    </Card.Body>
                </Card>
            </Col>
            <Col  md={{ span:8,order:1 }}>
                <Card className='border-0'>
                <Card.Header className='border-0' style={{ backgroundColor:"#D9D1D2" }}>
                        <SubHeading text={"My Bio"}/>

                        </Card.Header>
                    <Card.Body>
                       
                        <Paragraph className={"mt-3"} text={`${user.bio === null?"No Bio":user.bio}`}/>
                     
                       

                    </Card.Body>
                </Card>
                <Card className='border-0 mt-3 '>
                <Card.Header className='border-0'  style={{ backgroundColor:"#D9D1D2" }}>
                        <SubHeading text={"Achievements"}/>

                        </Card.Header>
                    <Card.Body>
                       
                    <Paragraph className={"mt-3"} text={`${user.achievement === null?"No achievements":user.achievement}`}/>

                     
                       

                    </Card.Body>
                </Card>
                <Card className='border-0 my-3 '>
                <Card.Header className='border-0'  style={{ backgroundColor:"#D9D1D2" }}>
                        <SubHeading text={"Gallery"}/>

                        </Card.Header>
                    <Card.Body>
                  
                    <Row>
                        {user.Galleries.map((item,index)=><Col md={4}>
                            <Image fluid className='rounded mb-3 btn border-0' onClick={()=>{
                             setSelectedImage(index)
                            setShowGalleryModal(true)
                            }} src={item.image}/>
                        </Col>)}
                    </Row>

                     
                       

                    </Card.Body>
                </Card>
            </Col>
           
        </Row>
        </div>:<Loader/>
    )
}

export default UserProfilePage
