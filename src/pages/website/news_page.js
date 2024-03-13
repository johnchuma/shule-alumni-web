import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Paragraph from "../../general_widgets/paragraph";
import AlumniCarousel from "../../general_widgets/carousel";
import "../../App.css"
import Heading from "../../general_widgets/heading";
import { timeAgo } from "../../utils/tile_ago";
import { useEffect, useState } from "react";
import { getGeneralNews } from "../../controllers/general_news_controller";
import { mutedBlack } from "../../utils/colors";
import SubHeading from "../../general_widgets/subheading";
const NewzPage = () => {
    const [generalNews, setGeneralNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    useEffect(() => {
       getGeneralNews().then((data)=>{
        setGeneralNews(data)
        setSelectedNews(data[0])
       })
    }, []);
    const  heroItems = [{
        image:"https://arc-anglerfish-arc2-prod-gmg.s3.amazonaws.com/public/SWCVZ3V6G5ADJBOQH2YOFOQQUM.png",
        title:"News & events"
    }];
    return ( <div>
        <AlumniCarousel objectArray={heroItems}/>
        
      
            <Container >
            <Row>
                <Col className="text-center" md={{ span:8,offset:2 }}>
                  
                    <Paragraph className={"my-5"} text={"Welcome to our Alumni System page! Here, you'll find everything you need to stay connected with our esteemed alumni network. Discover updates on their achievements, career milestones, and upcoming events. Leverage this platform to network, mentor, and collaborate with fellow alumni. Our Alumni System page is your gateway to fostering meaningful connections and accessing valuable resources. Join us in celebrating the successes of our alumni community and unlock new opportunities for personal and professional growth. Stay connected, stay inspired!"}/>
                 
                </Col>
              
              
            </Row>
                <Row className="mb-5">
                        <Col className="mb-5" md={8}>
                        {
                        selectedNews &&<div>
                        <Image className="" fluid src={selectedNews.image}/>
                        <Heading style={{  }} className={"mt-3"} text={selectedNews.title}/>
                        <Paragraph color={mutedBlack} style={{  }} text={timeAgo(selectedNews.createdAt)}/>
                        <Paragraph className={"mt-3"} text={selectedNews.description}/>
                        </div>
                        }
                        </Col>
                        <Col  md={4} >
                            <Heading className={"mb-3"} text={"Other news"}/>
                        {generalNews.filter((item)=>item.uuid !== selectedNews.uuid).map((item)=>{
                        return <Card onClick={()=>setSelectedNews(item)} className="mb-3 rounded-0 ">
                            <Card.Body>
                            <Image style={{ height:180,objectFit:"cover" }} className="w-100 " fluid src={item.image}/>
                        <SubHeading className={"mt-3"} text={item.title}/>
                        <Paragraph color={mutedBlack} text={timeAgo(item.createdAt)}/>
                            </Card.Body>
                        
                        </Card>
                        })}
                        </Col>
                        </Row>
                </Container>
    </div> );
}
 
export default NewzPage;