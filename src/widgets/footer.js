import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import { primaryColor } from "../utils/colors";
import Heading from "../general_widgets/heading";
import Paragraph from "../general_widgets/paragraph";
import Small from "../general_widgets/small";
import SubHeading from "../general_widgets/subheading";
import { navbaritems } from "../utils/arrays";
import { FaFacebook, FaInstagram, FaMailBulk, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
 <div  style={{ backgroundColor:primaryColor }} className="py-4">
     <Container>
        <Row>
            <Col md="6">
                <Stack direction="horizontal">
                <Image src="/logo.svg" className="pe-2 bg-white" style={{ height:60,width:60,objectFit:"fit" }}/>
            <div className="ms-3">
                <SubHeading text={"Shule alumni"} color={"white"}/>
                <Small color={"white"} style={{ fontStyle:"italic" }} className={"text-italic small"} text={"Empower The Community To Improve The Standards Of Tanzania Education"}/>
           
            </div>
                </Stack>
        <Paragraph color={"white"} className={"mt-3"} text={"Join our community generous donors, and know that you are helping to provide scholarships, advance faculty research, enrich student life, and build a beautiful campus."}/>
            
            </Col>
            <Col md="3">
               {navbaritems.map((item)=><div>
                <Paragraph className={"mb-3"} color={"white"} text={item.name}/>
               </div>)}
            </Col>
            <Col md="3">
                <Paragraph color={"white"} text={"Connect"}/>
                <Stack className="d-flex justify-content-between mt-3" direction="horizontal">
                   <FaTwitter color="white" size={30}/>
                   <FaFacebook color="white" size={30}/>
                   <FaInstagram color="white" size={30}/>
                   <FaMailBulk color="white" size={30}/>

                   

                </Stack>
            </Col>
            
        </Row>

     </Container>
    </div>
    <div className="bg-dark text-center py-4">
        <Paragraph color={"white"} text={"© 2023 Shule Alumni. All rights reserved."}/>
    </div>
        </div>
        );
}
 
export default Footer;