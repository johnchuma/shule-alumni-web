import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Heading from "../../general_widgets/heading";
import Paragraph from "../../general_widgets/paragraph";
import { opportunitiesArray, visionMissionValues, whatwedo } from "../../utils/arrays";
import AlumniCarousel from "../../general_widgets/carousel";
import { BsEye } from "react-icons/bs";
import { blackColor, lightPrimaryColor, primaryColor } from "../../utils/colors";

const AboutPage = () => {
    const  heroItems = [{
        image:"https://img.freepik.com/free-photo/group-five-african-college-students-spending-time-together-campus-university-yard-black-afro-friends-studying-bench-with-school-items-laptops-notebooks_627829-6042.jpg?w=2000",
        title:"Connecting graduates through a vibrant network, valuable resources and lifetime resources"
    }];
    return ( <div>
        <AlumniCarousel objectArray={heroItems}/>
  <Container>
  <Row>
                <Col className="text-center" md={{ span:8,offset:2 }}>
                    <Paragraph className={"my-5"}
                     text={"We take pride in organizing engaging events, reunions, and workshops that bring alumni together. These gatherings provide a platform for networking, knowledge sharing, and fostering lifelong friendships."}/>    
                </Col>  
            </Row>
            <Row className="d-flex align-items-center">
                <Col md="6" className="d-none d-md-block my-3">
                    <Image fluid src="https://img.freepik.com/premium-photo/three-african-students-female-posed-with-backpacks-school-items-yard-university-look-tablet_627829-13636.jpg" />
                </Col>
                <Col md="6" className="">
                <Heading className={"d-none d-md-block"} color={blackColor}  fontWeight={600} fontSize={"2.5vw"} text={"About us"}/>
                    <Heading className={"d-block d-md-none text-center"} color={primaryColor} style={{ textDecoration:"underline" }}  fontWeight={600} fontSize={"2.5vw"} text={"About us"}/>

                    
                    <Paragraph className={"mt-4 d-none d-md-block"} text={"Shule alumni is a network of graduates from different educational institutions, such as a university or schools, who stay connected with each other and with the institution they graduated from.The common goal of this system is to create a community of individuals who share common experiences and interests, and who can support each other both personally and professionally. Our systems play an important role in building a sense of community and fostering lifelong connections between graduates and their educational institutions. These include Networking: provide graduates with opportunities to connect with each other, share experiences, and develop professional relationships. This can lead to new job opportunities, mentorship, and business partnerships"}/>
                    <Paragraph className={"mt-4 d-block d-md-none text-center"} text={"Shule alumni is a network of graduates from different educational institutions, such as a university or schools, who stay connected with each other and with the institution they graduated from.The common goal of this system is to create a community of individuals who share common experiences and interests, and who can support each other both personally and professionally. Our systems play an important role in building a sense of community and fostering lifelong connections between graduates and their educational institutions. These include Networking: provide graduates with opportunities to connect with each other, share experiences, and develop professional relationships. This can lead to new job opportunities, mentorship, and business partnerships"}/>
                </Col>

            </Row>
            <Row className="my-5" >
                {visionMissionValues.map((item)=>{
                   return <Col md="4 d-flex align-item-stretch ">
                        <Card style={{ backgroundColor:item.color }} className="w-100  border-0 mb-2">
                            <Card.Body className="p-4 text-center">
                                {/* <BsEye color={primaryColor} size={35}/> */}
                                <Heading className={"my-2"} text={item.title}/>
                                <Paragraph text={item.description}/>
                            </Card.Body>
                        </Card>
                    </Col>
                })}
            </Row>
          
  </Container>
   
    <div style={{ }}>
    <Container>
    <Row className="d-flex align-items-center mt-5">
            <Col md="12" className="text-center py-5">
                    <Heading fontSize={"2.5vw"} text={"What we do ?"}/>
                    <Paragraph className={"mt-4"} text={"We implement a digital solution to provide a safe and transparent platform based on which alumni communities can connect, engage with former students and schools, create school improvement initiatives, agree on required contributions transparently track progress, engage school administration and other stakeholders from beginning to end of projects."}/>
                    <Paragraph fontWeight={600} className={"my-2 mt-5"} text={"We focus on doing the following:"}/>
                     <Row>
                        <Col md={{ offset:1,span:10 }}>
                        {whatwedo.map((item)=>{
                            return <Card style={{ backgroundColor:lightPrimaryColor }} className="shadow border-0 mb-2" >
                                <Card.Body>
                                <Paragraph text={item}/>
                                </Card.Body>
                            </Card>
                        })}
                        </Col>
                     </Row>
                       
                      
              
                </Col>
               
              

            </Row>
        </Container>
 
        
    </div>

<Container>
{/* <Row className="py-5 ">
                <Col md={{ span:4,offset:4 }}>
                    <Heading fontSize={"3vw"}>Get Involved In Our
Awesome Work</Heading>
                </Col>
            </Row>
            <Row >
                {opportunitiesArray.map((item)=>{
                   return <Col md="4 d-flex align-item-stretch mb-5">
                        <Card className="">
                            <Card.Body className="p-4 text-center">
                                <Heading text={item.title}/>
                                <Paragraph text={item.description}/>
                            </Card.Body>
                        </Card>
                    </Col>
                })}
            </Row> */}
</Container>
    </div> );
}
 
export default AboutPage;