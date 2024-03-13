import React, { useState } from 'react';
import { Col, Container, Form, Row, Toast, ToastContainer } from 'react-bootstrap';
import * as formik from 'formik';
import * as Yup from 'yup';

import CustomButton from '../../general_widgets/button';
import Heading from '../../general_widgets/heading';
import Paragraph from '../../general_widgets/paragraph';
import { communityMembers } from '../../utils/arrays';
import AlumniCarousel from '../../general_widgets/carousel';
import { sendInquiry, sendMessage } from '../../controllers/message_controller';
import { primaryColor } from '../../utils/colors';
const ContactPage = () => {
    const [loading, setLoading] = useState(false);
    const [showError, setshowError] = useState(false);
    const [errorMessage, seterrorMessage] = useState("");
    const heroItems = [
      {
        image:
          'https://plus.unsplash.com/premium_photo-1661763911173-f2f7becc70b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29udGFjdCUyMHVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
        title: 'Contact us',
      },
    ];
    const { Formik } = formik;
    const handleSubmit = (values,{resetForm}) => {
        setLoading(true)
       sendInquiry(values).then((response)=>{
           setLoading(false)
           setshowError(true)
           seterrorMessage("Message sent successfully")
           resetForm()
       })
      };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        message: Yup.string().required('Message is required'),
      });
    return (
      <div className="py-3">
         <ToastContainer className='px-3 py-3 fixed-top  w-100 d-flex justify-content-end' position='top-end' >
        <Toast show={showError} autohide  onClose={()=>setshowError(false)} >
          <Toast.Header style={{ color:"green" }}><div className='me-auto' style={{ fontWeight:500 }}>Successfully</div> </Toast.Header>
          
          <Toast.Body>
            {errorMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
        <AlumniCarousel objectArray={heroItems} />
        <Container className="mt-4">
          <Row>
            <Col className="text-center" md={{ span: 8, offset: 2 }}>
              <Paragraph
                className={'mt-3'}
                text={
                  'Thank you for your interest in contacting us. We would love to hear from you! For media inquiries, collaborations, or partnership opportunities, please contact us via !'
                }
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={{ span: 8, offset: 2 }}>
              <Formik
                initialValues={{ name: '', email: '', message: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            isInvalid={touched.name && !!errors.name}
                          />
                          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={touched.email && !!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <br />
                        <Form.Group>
                          <Form.Label>Message</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="message"
                            style={{resize: 'none'}}
                            rows={5}
                            value={values.message}
                            onChange={handleChange}
                            isInvalid={touched.message && !!errors.message}
                          />
                          <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-center">
                      <CustomButton loading={loading} className="mt-4 py-3 px-5" text="Get in touch" />
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  
  export default ContactPage;
  