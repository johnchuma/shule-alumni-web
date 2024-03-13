import React, { useState } from 'react';
import { Card, Form, Button, Col, Row, Stack, Image, ToastContainer, Toast } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import CustomButton from '../../general_widgets/button';
import Heading from '../../general_widgets/heading';
import { mutedBlack, primaryColor } from '../../utils/colors';
import { login, newPassword } from '../../controllers/user_controller';
import { useNavigate, useParams } from 'react-router-dom';
import Paragraph from '../../general_widgets/paragraph';
import { AiOutlineClose } from 'react-icons/ai';

const NewPassword = () => {

    const validationSchema = yup.object().shape({
        password_confirmation: yup
          .string()
          .required('Confirm password')
          .oneOf([yup.ref('password'), null], 'Passwords must match'), // Validate against 'password' field
        password: yup.string().required('Password is required'),
      });
  const [waiting, setwaiting] = useState(false);
  const [showError, setshowError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const {uuid} = useParams()

const navigate = useNavigate()
  const handleSubmit = (values) => {
    const data = {password:values.password};
        setwaiting(true)
    newPassword(data,uuid).then((response)=>{
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
                    
            <Heading className={"text-center py-3"} text={"Create new password"}/>
            
        
          <Formik
            initialValues={{ password_confirmation: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId='email'>
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                   type='password'
                   name='password'
                   value={values.password}
                   onChange={handleChange}
                   isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mt-4' controlId='password'>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password_confirmation'
                    value={values.password_confirmation}
                    onChange={handleChange}
                    isInvalid={touched.password_confirmation && !!errors.password_confirmation}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.password_confirmation}</Form.Control.Feedback>
                </Form.Group>
                <CustomButton loading={waiting} className={"w-100 mt-4"} text={'Confirm password'}/>
              
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

export default NewPassword;
