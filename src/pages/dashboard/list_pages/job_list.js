import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Stack } from 'react-bootstrap'


import { useNavigate } from 'react-router-dom'
import { getAllSchoolJob } from '../../../controllers/job_controller'
import Heading from '../../../general_widgets/heading'
import Paragraph from '../../../general_widgets/paragraph'
import CustomButton from '../../../general_widgets/button'
import moment from "moment"
import SubHeading from '../../../general_widgets/subheading'

const JobList = ({refresh,uuid}) => {
    const [jobs, setjobs] = useState([]);
    useEffect(() => {
          if(refresh === false){
            getAllSchoolJob(uuid).then((data)=>setjobs(data));
          }
        
    }, [refresh]);

const navigate = useNavigate()
    return (
        <div className='bg-white p-4'>
            <Row>
            {jobs.map((item)=>{
                return <Col md={4}>
                  <Card onClick={()=>navigate(`/dashboard/school-job/${item.uuid}`)} className='mb-4  text-start'>
                    <Card.Body>
                       
                            <Card.Img className='mb-2' src={item.image} style={{ height:150 }}/>
                      
                         <Heading fontSize={"1.4vw"} text={item.title}/>

                         <Paragraph  className={"cardText"} maxLines={3}  text={"Published: "+moment(item.createdAt).fromNow()}/>
                         <CustomButton className={"w-100 mt-3"} text={"Apply now"}/>
                    </Card.Body>
                </Card>
                </Col>
               
            })}
            </Row>
            

        </div>
    )
}

export default JobList
