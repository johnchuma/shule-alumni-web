import React, { useState } from 'react';
import { Card, Form, Button, Col, Row, Stack, Image, ToastContainer, Toast } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../../general_widgets/button';
import Heading from '../../general_widgets/heading';
import { mutedBlack, primaryColor } from '../../utils/colors';
import { login, resetPassword } from '../../controllers/user_controller';
import { useNavigate } from 'react-router-dom';
import Paragraph from '../../general_widgets/paragraph';
import { AiOutlineClose } from 'react-icons/ai';

const ResetPassword = () => {
  // Define the validation schema using Yup
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  });
  const [waiting, setwaiting] = useState(false);
  const [showError, setshowError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState(false);

const navigate = useNavigate()
  // Handle form submission
  const handleSubmit = (values) => {
    const data = {...values};
        setwaiting(true)
    resetPassword(data).then((response)=>{
        setwaiting(false)
        if(response){
          if(response.status === true){
            setsuccessMessage(true)
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
          <Toast.Header style={{ color:primaryColor }}><div className='me-auto' style={{ fontWeight:600 }}>Failed</div> </Toast.Header>
          
          <Toast.Body>
            {errorMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer className='px-3 py-3' position='top-end' >
        <Toast show={successMessage} autohide  onClose={()=>setsuccessMessage(false)} >
          <Toast.Header style={{ color:successMessage }}><div className='me-auto' style={{ fontWeight:600 }}>Check your email</div> </Toast.Header>
          
          <Toast.Body>
            We have sent you a link to create a new password
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
                    
            <Heading className={"text-center py-2"} text={"Reset password"}/>
            
        
          <Formik
            initialValues={{ email: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className='mt-3' controlId='email'>
                  <Form.Label>Enter your email</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <CustomButton loading={waiting} className={"w-100 mt-4"} text={'Send request'}/>
               
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

export default ResetPassword;
