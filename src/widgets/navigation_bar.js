import { Container, Image, Offcanvas, Stack } from "react-bootstrap";
import Heading from "../general_widgets/heading";
import { primaryColor } from "../utils/colors";
import Paragraph from "../general_widgets/paragraph";
import CustomButton from "../general_widgets/button";
import { navbaritems } from "../utils/arrays";
import { useLocation, useNavigate } from "react-router-dom";
import Small from "../general_widgets/small";
import { BsMenuApp } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import SubHeading from "../general_widgets/subheading";

const NavigationBar = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    return (  <div>
        <Container className="my-3">
        <Offcanvas  show={show} onHide={()=>setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="px-4">
         {navbaritems.map((item)=><SubHeading className={"mb-2"} onClick={()=>{
            navigate(item.path)
            setShow(false)
         }} text={item.name}/>)}
         <hr/>
         <SubHeading onClick={()=>navigate("/login")} color={primaryColor} className={" border-0 mb-2"}  text={"Login"}/>
            <SubHeading onClick={()=>navigate("/register")}  color={primaryColor} className={" border-0"} text={"Register"}/>
          
        </Offcanvas.Body>
      </Offcanvas>
        <Stack  direction="horizontal" >
        <Image onClick={()=>navigate("/")}  src="/logo.svg" className="me-2 btn d-none d-md-block border-0 p-0" style={{ height:80,width:80,objectFit:"fit" }}/>

            <Image onClick={()=>navigate("/")}  src="/logo.svg" className="me-2 d-block d-md-none btn border-0 p-0" style={{ height:50,width:50,objectFit:"fit" }}/>
            <div className="ms-2 me-auto">
                <SubHeading text={"Shule alumni"} color={primaryColor}/>
                <Small text={"Reconnect with your classmates"}/>
            </div>
            <Paragraph onClick={()=>navigate("/login")} className={"ms-auto d-none d-md-block btn border-0"}  text={"Login"}/>
            <Paragraph onClick={()=>navigate("/register")} className={"ms-4 d-none d-md-block  btn border-0"} text={"Register"}/>
            <div onClick={()=>setShow(true)} className="ms-auto btn d-block d-md-none">
                <AiOutlineMenu size={30} className=""/>
            </div>
        </Stack>
        <Stack direction="horizontal" className="d-flex justify-content-between mt-4 ms-2 ">
           
            {navbaritems  .map((item)=><div onClick={()=>navigate(item.path)}>
               <Paragraph className={"btn border-0 d-none d-md-block"}  onClick={()=>navigate(item.path)} text={item.name}/>
            </div>
            )}
           <CustomButton className={"d-none d-md-block"} onClick={()=>{
            window.open("https://flutterwave.com/pay/shulealumni","_blank")
           }} text={"Donate"}/>
        </Stack>
        </Container>
        
    </div>);
}
 
export default NavigationBar;