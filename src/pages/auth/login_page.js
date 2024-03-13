import React, { useState } from 'react';
import { Card, Form, Button, Col, Row, Stack, Image, ToastContainer, Toast } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../../general_widgets/button';
import Heading from '../../general_widgets/heading';
import { mutedBlack, primaryColor } from '../../utils/colors';
import { login } from '../../controllers/user_controller';
import { useNavigate } from 'react-router-dom';
import Paragraph from '../../general_widgets/paragraph';
import { AiOutlineClose } from 'react-icons/ai';

const LoginPage = () => {
  // Define the validation schema using Yup
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const [waiting, setwaiting] = useState(false);
  const [showError, setshowError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");


const navigate = useNavigate()
  // Handle form submission
  const handleSubmit = (values) => {
    const data = {...values};
        setwaiting(true)
    login(data).then((response)=>{
        setwaiting(false)
        if(response){
          if(response.status === true){
            navigate("/dashboard/dashboard")
        }
          else{
          setshowError(true)
          seterrorMessage(response.message)
          }
        }
        else{
          setshowError(true)
          seterrorMessage("Internal server error")
        }
        

  })


  };

  return (
    <div>
      <ToastContainer className='px-3 py-3' position='top-end' >
        <Toast show={showError} autohide  onClose={()=>setshowError(false)} >
          <Toast.Header style={{ color:primaryColor }}><div className='me-auto' style={{ fontWeight:600 }}>Failed to login</div> </Toast.Header>
          
          <Toast.Body>
            {errorMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100%' }}>
      
      
      <Row className='w-100'>
        <Col md={{ span:4,offset:4 }}>
        <Card className='shadow-lg w-100'>
        <Card.Body className='py-4' >
       
                    <Stack direction='horizontal' onClick={()=>navigate("/")} className='d-flex justify-content-center'  >
                
                <Image className='me-2' style={{ width:50,height:50 }} src='/logo.svg' fluid/>
                <div>
                   <Heading text={"Shule alumni"} color={primaryColor}/>

                </div>
        </Stack>
                    
            <Heading className={"text-center py-2"} text={"Login"}/>
            
        
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mt-4' controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <CustomButton loading={waiting} className={"w-100 mt-4"} text={'Login'}/>
                <Stack direction='horizontal' onClick={()=>navigate("/reset-password")} className='d-flex justify-content-end mt-3'>
                  <div className='btn border-0 p-0'><Paragraph  text={"Forgot password ?"}/></div>
                
                </Stack>
                <Stack direction='horizontal' className='d-flex justify-content-center mt-3'>
                  <div className=''><Paragraph  text={"Don't have an account ?"}/></div>
                  <div className='btn border-0 px-1'   onClick={()=>navigate("/register")}><Paragraph  fontWeight={700} color={primaryColor} text={"Register"}/></div>

                </Stack>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
        </Col>
      </Row>
      
    </div>
    </div>
    
  );
};

export default LoginPage;
