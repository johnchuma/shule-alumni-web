import { Card, Col, Container, Row } from "react-bootstrap";
import Paragraph from "../../general_widgets/paragraph";
import { communityMembers } from "../../utils/arrays";
import Heading from "../../general_widgets/heading";
import SubHeading from "../../general_widgets/subheading";
import AlumniCarousel from "../../general_widgets/carousel";

const LeadershipPage = () => {
    const  heroItems = [{
        image:"https://myalumni.mcgill.ca/s/1762/images/gid2/editor/header_images/mbaa-alumsitehdr-700x350-v2.jpg",
        title:"Our Leadership"
    }];
    return ( <div>
        <AlumniCarousel objectArray={heroItems} />
            <Container className="py-5">

          <Row className="my-4">
                <Col className="text-center" md={{ span:8,offset:2 }}>
                    <Paragraph className={"my-3"}
                     text={"We are delighted to introduce the exceptional leaders who guide and inspire our organization towards success and progress. With their visionary thinking, unwavering dedication, and profound expertise, they have paved the way for our collective growth and prosperity"}/>    
                </Col>  
            </Row>
            <Row>
                {communityMembers.map((item)=>{
                    return <Col md="4 text-center">
                        <Card className="p-4 mb-4">
                            <Card.Img style={{ height:350,objectFit:"cover" }} src={item.image}/>
                            <Heading className={"my-2"} text={item.name}/>
                            <Paragraph text={"Project director"}/>

                        </Card>
                    </Col>
                })}
            </Row>
            </Container>
            
    </div> );
}
 
export default LeadershipPage;