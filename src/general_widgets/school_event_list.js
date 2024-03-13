import React, { useEffect, useState } from 'react'
import { EventData, sampleData } from '../utils/arrays'
import { Card, Col, Row, Stack } from 'react-bootstrap'
import Heading from './heading'
import Paragraph from './paragraph'
import { BsPeople } from 'react-icons/bs'
import { getAllSchoolEvent } from '../controllers/school_event_controller'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../utils/local_storage'


const SchoolEventList = ({refresh,uuid}) => {
    const [Event, setEvent] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
       
            getAllSchoolEvent(uuid).then((data)=>setEvent(data));
        
    }, [refresh]);
    return (
        <div className='bg-white p-4'>
            <Row>
            {Event.map((item)=>{
                return <Col md={6}>
                    <div className='btn text-start border-0' onClick={()=>navigate(`/dashboard/school-event/${item.uuid}`)}>
                    <Card  className='mb-4'>
                    <Card.Body>
                        <Row>
                            <Col md={12}>
                            <Card.Img className='mb-2' style={{ height:180,objectFit:"cover" }} src={item.image}/>
                            </Col>
                        </Row>
                         <Heading fontSize={"1.4vw"} text={item.title}/>
                         <div className='line-clamp'  dangerouslySetInnerHTML={{ __html: item.description}} >{}</div>
                    </Card.Body>
                </Card>
                        </div>
                  
                </Col>
               
            })}
            </Row>
            

        </div>
    )
}

export default SchoolEventList
