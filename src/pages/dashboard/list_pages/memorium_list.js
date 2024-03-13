import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Stack } from 'react-bootstrap'


import { useNavigate } from 'react-router-dom'

import Heading from '../../../general_widgets/heading'
import Paragraph from '../../../general_widgets/paragraph'
import { getAllSchoolMemorium } from '../../../controllers/memorium_controller'

const MemoriumList = ({refresh,uuid}) => {
    const [jobs, setjobs] = useState([]);
    useEffect(() => {
          if(refresh === false){
            getAllSchoolMemorium(uuid).then((data)=>setjobs(data));
          }
        
    }, [refresh]);
const navigate = useNavigate()
    return (
        <div className='bg-white p-4'>
            <Row>
            {jobs.map((item)=>{
                return <Col md={4}>
                  <Card onClick={()=>navigate(`/dashboard/school-memorium/${item.uuid}`)} className='mb-4  text-center border-0'>
                    <Card.Body>         
                         <Card.Img  className='mb-2 rounded-circle' src={item.image} style={{ height:150,width:150,objectFit:"cover" }}/>
                         <Heading  text={item.name}/>
                         <Paragraph maxLines={3}  text={"Rest in peace"}/>
                    </Card.Body>
                </Card>
                </Col>
               
            })}
            </Row>
            

        </div>
    )
}

export default MemoriumList
