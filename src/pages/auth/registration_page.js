import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Col, Row, Stack, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Heading from '../../general_widgets/heading';
import CustomButton from '../../general_widgets/button';
import { blackColor, mutedBlack, primaryColor } from '../../utils/colors';
import { AiOutlineUser } from 'react-icons/ai';
import { register } from '../../controllers/user_controller';
import { getSchools } from '../../controllers/school_controller';
import { useNavigate } from 'react-router-dom';
import Paragraph from '../../general_widgets/paragraph';


const RegisterPage = () => {
    const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
 const [schools, setSchools] = useState([]);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };
  // Define the validation schema using Yup
  const validationSchema = yup.object().shape({
    image:yup.string().required(),
    name: yup.string().required('Name is required'),
    school_uuid: yup.string().required('School is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    graduation_year: yup.string().required('Graduation year is required'),
    password: yup.string().required('Password is required'),
  });
 const navigate =  useNavigate();
  // Handle form submission
  const [waiting, setwaiting] = useState(false);
  const handleSubmit = (values) => {
    const data = {file,...values}
    console.log(data)
    setwaiting(true)
  register(data).then((status)=>{

    if(status === true ){
     navigate("/dashboard/dashboard")
     setwaiting(false)
    }

  })
    console.log(values);
  };
 useEffect(() => {
 getSchools().then((data)=>{
    setSchools(data)
 })
 }, []);
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100%' }}>
     
           
     
      <Row className='w-100'>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className='shadow-lg w-100'>

            <Card.Body className='py-4 px-4'>
                
                    <Stack direction='horizontal' className='d-flex justify-content-center' >
                <div>
                <Image className='me-2' style={{ width:50,height:50 }} src='/logo.svg' fluid/>

                </div>
                <div>
                   <Heading text={"Shule alumni"} color={primaryColor}/>

                </div>
        </Stack>
                   
              
                  <Heading className={"text-center py-2 mb-3"} color={blackColor} text={'Register as alumni'}  />
                
              <Formik
                initialValues={{
                  name: '',
                  image:'',
                  email: '',
                  phone: '',
                  school_uuid:"",
                  graduation_year: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Stack direction='horizontal' className={"d-flex justify-content-center"}>
                    <Form.Group className='mt-1'>
                          {imagePreview === '' ? (
                            <div
                              className='btn rounded-circle p-2'
                              style={{ borderColor: mutedBlack }}
                            >
                              <AiOutlineUser
                                className='text-center'
                                onClick={() => document.getElementById('file').click()}
                                color={"#00000040"}
                                size={60}
                              />
                            </div>
                          ) : (
                            <Image
                              src={imagePreview}
                              roundedCircle
                              style={{ height: 80, width: 80, objectFit: 'cover' }}
                              onClick={() => document.getElementById('file').click()}
                              fluid
                            />
                          )}
                         <Form.Control
                            name='image'
                            type='file'
                            id='file'
                            onChange={(event) => {
                              handleChange(event);
                              handleFileInputChange(event)
                            }}
                            style={{ display: 'none' }}
                            isInvalid={!!errors.image && touched.image}
                          />
                          <Form.Control.Feedback type='invalid'>{errors.image}</Form.Control.Feedback>
                        </Form.Group>
           </Stack>
                        
                    <Row className='mt-3' >
                        <Col md={6}>
                        <Form.Group  controlId='name'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type='text'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={touched.name && !!errors.name}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                        <Col md={6}>
                        <Form.Group controlId='phone'>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type='text'
                        name='phone'
                        value={values.phone}
                        onChange={handleChange}
                        isInvalid={touched.phone && !!errors.phone}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                    </Row>
                   <Row>
                    <Col md={6}>
                    <Form.Group controlId='graduation_year'>
                      <Form.Label>Graduation Year</Form.Label>
                      <Form.Control
                        type='text'
                        name='graduation_year'
                        value={values.graduation_year}
                        onChange={handleChange}
                        isInvalid={touched.graduation_year && !!errors.graduation_year}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.graduation_year}</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    <Col md={6}>
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
                        </Col>
                   </Row>
                   
                   <Row>
                    <Col md="6">
                    <Form.Group controlId='school_uuid'>
                      <Form.Label>School</Form.Label>
                      <Form.Select
                        type=''
                        name='school_uuid'
                        value={values.school_uuid}
                        onChange={handleChange}
                        isInvalid={touched.school_uuid && !!errors.school_uuid}
                      >
                        <option>Select your chool</option>
                        {schools.map((school)=>{
                            return <option value={school.uuid}>{school.name}</option>
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.school_uuid}</Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group controlId='password'>
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
                    </Col>
                   </Row>
                   
                   
                    <CustomButton loading={waiting} className='w-100 mt-4' text='Register' />

                    <Stack />
                    <Stack direction='horizontal' className='d-flex justify-content-center mt-3'>
                  <div className=''><Paragraph  text={"Already registered ?"}/></div>
                  <div className='btn border-0 px-1' onClick={()=>navigate("/login")}><Paragraph  fontWeight={700} color={primaryColor} text={"Login"}/></div>

                </Stack>
                  </Form>
                )} 
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
    </div>
  );
};

export default RegisterPage;
