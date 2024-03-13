import React, { useEffect, useState } from 'react'
import { newsData, sampleData } from '../utils/arrays'
import { Card, Col, Row, Stack } from 'react-bootstrap'
import Heading from './heading'
import Paragraph from './paragraph'
import { BsPeople } from 'react-icons/bs'
import { getGeneralNews } from '../controllers/general_news_controller'
import { useNavigate } from 'react-router-dom'

const GeneralNewsList = ({refresh}) => {
    const [news, setNews] = useState([]);
    useEffect(() => {
       getGeneralNews().then((data)=>setNews(data))
    }, [refresh]);
    const navigate = useNavigate()
    return (
        <div className='bg-white p-4'>
            <Row>
            {news.map((item)=>{
                return <Col md={6}>
                  <Card onClick={()=>navigate(`${item.uuid}`)} className='mb-4'>
                    <Card.Body>
                        <Row>
                            <Col md={8}>
                            <Card.Img style={{ height:200,objectFit:"cover" }} className='mb-2' src={item.image}/>

                            </Col>
                        </Row>
                         <Heading fontSize={"1.4vw"} text={item.title}/>
                         <div className='line-clamp'  dangerouslySetInnerHTML={{ __html: item.description}} >{}</div>
                        
                    </Card.Body>
                </Card>
                </Col>
               
            })}
            </Row>
            

        </div>
    )
}

export default GeneralNewsList
