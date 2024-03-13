import React, { useEffect, useState } from 'react'
import { sampleData } from '../utils/arrays'
import { Card, Col, Row, Stack } from 'react-bootstrap'
import Heading from './heading'
import Paragraph from './paragraph'
import { BsPeople } from 'react-icons/bs'
import { getSchools } from '../controllers/school_controller'
import EditSchoolModal from '../widgets/schools/edit_school_modal'
import { useNavigate } from 'react-router-dom'

const SchoolList = ({refresh}) => {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        if(refresh===false){
            getSchools().then((data)=>setSchools(data))
        }
        
    }, [refresh]);
    const navigate = useNavigate()
    const [school, setSchool] = useState(null);
    return (
        <div className='bg-white p-3'>
           
            <Row>
            {schools.map((item)=>{
                return  <Col md={4}>
                <div onClick={()=>navigate(`/dashboard/school/${item.uuid}`)} className='btn border-0 text-start'>
            <Card className='mb-4'>
              <Card.Body>
                  <Card.Img style={{ height:170,width:"100", objectFit:"cover" }} className='mb-2' src={item.image}/>
                   <Heading fontSize={"1.4vw"} text={item.name}/>
                   <Paragraph text={item.email}/>
                   <Stack direction='horizontal'>
                   <BsPeople color='gray' className='me-2'/>
                   <Paragraph  text={`${item.alumniCount} Alumni`}/>
                   </Stack>
            </Card.Body>
          </Card>
          </div>
          </Col>
                
              
                
                
            })}
            </Row>
            

        </div>
    )
}

export default SchoolList
