import React, { useRef, useState } from 'react'
import { Button, Col, Container, Dropdown, Image, Navbar, Offcanvas, Overlay, Row, Stack } from 'react-bootstrap'
import { menuItems } from '../utils/arrays'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { lightPrimaryColor, primaryColor } from '../utils/colors';
import Heading from '../general_widgets/heading';
import { getUser, logout } from '../utils/local_storage';
import Paragraph from '../general_widgets/paragraph';
import SubHeading from '../general_widgets/subheading';
import Small from '../general_widgets/small';
import { AiOutlineMenu } from 'react-icons/ai';

const DashboardLayout = () => {
    const [currentItem, setcurrentItem] = useState("dashboard");
    const navigate = useNavigate()
    const user =getUser()
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div style={{ height:"100vh",position:"relative",backgroundColor:lightPrimaryColor }}>
              <Overlay target={target.current} show={show} placement="bottom">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'relative',
              backgroundColor: primaryColor,
              padding: '10px 12px',
              marginTop:"23px",
              marginRight:"10px",
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
            onClick={()=>{
                logout();
                navigate("/login")
            }}
          >
            <Heading  className={"btn border-0 text-white p-0 "} fontSize={"1.2vw"} text={"Logout"}/>
          </div>
        )}
      </Overlay>
        <Navbar fixed='top' style={{ backgroundColor:"white" }}>
            <Container fluid>

            <Navbar.Brand onClick={()=>navigate("/")} className='me-auto btn border-0' style={{ color:primaryColor,fontWeight:600 }}>
                <Stack direction='horizontal' className='me-auto'>
                <Image  className='me-2' style={{ width:50,height:50 }} src='/logo.svg' fluid/>
                <div>
                   <Heading text={"Shule alumni"} color={primaryColor}/>
                </div>
                </Stack>
               
            </Navbar.Brand>
          
            <SubHeading className={"ms-auto me-4 d-flex d-none d-md-block"} text={user.School && user.School.name}/>
        
      <div ref={target} className='ms-4'  onClick={()=>setShow(!show)}><Image  style={{ height:35,width:35,objectFit:"cover" }}  className='me-3 d-none d-md-block' roundedCircle src={user.image}></Image></div>
      <Offcanvas  show={showMenu} onHide={()=>setShowMenu(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="px-4">
         {menuItems.map((item)=>item.authorized.includes(user.role)&&<SubHeading className={"mb-2"} onClick={()=>{
            navigate(item.path)
            setShowMenu(false)
         }} text={item.name}/>)}
         <hr/>
         <SubHeading onClick={()=>{
           logout();
           navigate("/login")
         }} color={primaryColor} className={" border-0 mb-2"}  text={"Logout"}/>
          
        </Offcanvas.Body>
      </Offcanvas>
      <div onClick={()=>setShowMenu(true)} className="ms-auto btn d-block d-md-none">
       <AiOutlineMenu size={20} className=""/>
            </div>
     
            
            </Container>
           
        </Navbar>
        <div  style={{ backgroundColor:lightPrimaryColor,marginTop:60 }}>
            
        <Row >
            <Col md={3} className='d-none d-md-block' style={{ backgroundColor:primaryColor,height:"100vh", position:"fixed", overflowY:"scroll" }}>
                <Container className='mt-5'>
                {menuItems.map((item)=>{
                    return item.authorized.includes(user.role)&&(
                    <Stack>
                    <Button  onClick={()=>
                        {
                            setcurrentItem(item.path);
                            navigate(item.path)
                        }
                        } style={{ backgroundColor: location.pathname.includes(`dashboard/${item.path}`) ===true ?"#EF4444":"transparent" }} className='mb-1 border-0'>
                        <Stack direction='horizontal'>
                    {item.icon}
                    <div className='ms-3'>
                    {item.name}
                    </div>
                        </Stack>
                        </Button>
                    </Stack>
                    )
                    })}
                    <div className='mt-auto fixed-bottom mb-4 ms-3 btn border-0 text-start' onClick={()=>navigate(`/dashboard/profile/${user.uuid}`)}>
                      <Stack direction='horizontal' className='mt-3' >
                        <Image roundedCircle style={{ height:32,width:32,objectFit:"cover" }} className='me-3' src={user.image}/>
                        <div>
                        <SubHeading color={"white"} text={user.name}/>
                        <Small color={"white"} text={user.email}/>
                        </div>
                      </Stack>
                    </div>
                </Container> 
            </Col>
            <Col md={9}   style={{ backgroundColor:"#FDF3F3",position:"absolute",right:0, }}>
               <Container>
                <br/>
               <Outlet/>

               </Container>

                    

            </Col>

        </Row>
        </div>
        
        </div>
    
    )
}

export default DashboardLayout
