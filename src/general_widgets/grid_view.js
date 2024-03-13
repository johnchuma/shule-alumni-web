import React from 'react'
import { sampleData } from '../utils/arrays'
import { Card, Col, Row, Stack } from 'react-bootstrap'
import Heading from './heading'
import Paragraph from './paragraph'
import { BsPeople } from 'react-icons/bs'

const GridView = () => {
    return (
        <div className='bg-white p-3'>
            <Row>
            {sampleData.map((item)=>{
                return <Col md={4}>
                  <Card className='mb-4'>
                    <Card.Body>
                        <Card.Img className='mb-2' src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Hibbing_High_School_2014.jpg/1200px-Hibbing_High_School_2014.jpg'/>
                         <Heading fontSize={"1.4vw"} text={item.name}/>
                         <Paragraph text={item.email}/>
                         <Stack direction='horizontal'>
                         <BsPeople className='me-2'/>
                         <Paragraph  text={"200 Alumni"}/>
                         </Stack>

                    </Card.Body>
                </Card>
                </Col>
               
            })}
            </Row>
            

        </div>
    )
}

export default GridView
