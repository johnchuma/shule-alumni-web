import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image } from 'react-bootstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup';
import Heading from '../../general_widgets/heading';
import { mutedBlack, primaryColor } from '../../utils/colors';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import SubHeading from '../../general_widgets/subheading';
import { register } from '../../controllers/user_controller';
import { getUser } from '../../utils/local_storage';
import CustomButton from '../../general_widgets/button';

const CreateAlumniModal = ({ show, onHide }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false); // Add the loading state

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    graduation_year: yup.string().required(),
    password: yup.string().required(),
  });

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSubmit = (values) => {
    setLoading(true); // Set loading state to true

    const user = getUser();
    const data = { file, ...values, school_uuid: user.School.uuid };

    register(data)
      .then((status) => {
        if (status === true) {
          onHide();
        }
      })
      .finally(() => {
        setLoading(false); // Set loading state back to false
      });
  };

  return (
    <Modal show={show} className='' size='lg' onHide={onHide}>
      <Container>
        <Modal.Header>
          <Heading text={'Create new alumni'} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              graduation_year: '',
              password: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={4} className='text-center'>
                    <Card>
                      <Card.Header>
                        <SubHeading text={'User image'} />
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className='mt-2'>
                          {imagePreview === '' ? (
                            <div
                              className='btn rounded-circle p-5'
                              style={{ borderColor: mutedBlack }}
                            >
                              <AiOutlineUser
                                className='text-center'
                                onClick={() => document.getElementById('file').click()}
                                color={mutedBlack}
                                size={40}
                              />
                            </div>
                          ) : (
                            <Image
                              src={imagePreview}
                              roundedCircle
                              style={{ height: 135, width: 135, objectFit: 'cover' }}
                              onClick={() => document.getElementById('file').click()}
                              fluid
                            />
                          )}
                          <Form.Control
                            name='image'
                            type='file'
                            id='file'
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={8}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className='mb-2'>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name='name'
                            value={values.name}
                            isInvalid={!!errors.name && touched.name}
                          />
                          <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className='mb-2'>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name='email'
                            type='email'
                            value={values.email}
                            isInvalid={!!errors.email && touched.email}
                          />
                          <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className='mb-2'>
                          <Form.Label>Phone number</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name='phone'
                            value={values.phone}
                            isInvalid={!!errors.phone && touched.phone}
                          />
                          <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className='mb-2'>
                          <Form.Label>Graduation year</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name='graduation_year'
                            value={values.graduation_year}
                            isInvalid={!!errors.graduation_year && touched.graduation_year}
                          />
                          <Form.Control.Feedback type='invalid'>{errors.graduation_year}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className='mb-2'>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name='password'
                            type='password'
                            value={values.password}
                            isInvalid={!!errors.password && touched.password}
                          />
                          <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <CustomButton className={"mt-3"} loading={loading} text={"Create Alumni"}/>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default CreateAlumniModal;
