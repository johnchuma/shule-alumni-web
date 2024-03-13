import React, { useEffect, useState } from 'react'
import { newsData, sampleData } from '../utils/arrays'
import { Card, Col, Row, Stack } from 'react-bootstrap'
import Heading from './heading'
import Paragraph from './paragraph'
import { BsPeople } from 'react-icons/bs'
import { getAllSchoolNews } from '../controllers/school_news.controller'
import { useNavigate } from 'react-router-dom'
import "../App.css"

const NewsView = ({refresh,uuid}) => {
    const [news, setNews] = useState([]);
    useEffect(() => {
          if(refresh === false){
            getAllSchoolNews(uuid).then((data)=>setNews(data));
          }
        
    }, [refresh]);
const navigate = useNavigate()
    return (
        <div className='bg-white p-4'>
            <Row>
            {news.map((item)=>{
                return <Col md={6}>
                  <Card onClick={()=>navigate(`/dashboard/school-news/${item.uuid}`)} className='mb-4  text-start'>
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
                </Col>
               
            })}
            </Row>
            

        </div>
    )
}

export default NewsView
