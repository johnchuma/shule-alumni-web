import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image, Spinner } from 'react-bootstrap';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { BsCloudUpload } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup';
import Heading from '../../general_widgets/heading';
import SubHeading from '../../general_widgets/subheading';
import { mutedBlack, primaryColor } from '../../utils/colors';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { cities } from '../../utils/arrays';
import { addSchool, deleteSchool, updateSchool } from '../../controllers/school_controller';
import { getHeadmasters } from '../../controllers/user_controller';
import CustomButton from '../../general_widgets/button';
import { useNavigate } from 'react-router-dom';

const EditSchoolModal = ({ show, onHide,data }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [headmasters, setHeadmasters] = useState([]);
  const [loading,setLoading] = useState(false);
  const [deleting,setDeleting] = useState(false);

useEffect(() => {
  getHeadmasters().then((data)=>setHeadmasters(data))
}, []);
  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const { Formik } = formik;
  const schema = yup.object().shape({
    headmaster: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    municipal: yup.string().required(),
    type: yup.string().required(),
    registration_no: yup.string().required(),
    registration_date: yup.string().required(),
  });

  const handleSubmit = (values) => {
    setLoading(true)
    const payload = { file,headmaster_uuid:values.headmaster,image:data.image, ...values  };
    delete values.headmaster
    updateSchool(payload,data.uuid).then((status) => {
      if (status === true) {
        onHide();
        setLoading(false)
      }
    });
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
 
    setImagePreview(data.image)
  }, [data]);
 const navigate = useNavigate()

  return (
    <Modal show={show} className='' size='xl' onHide={onHide}>
      <Container>
        <Modal.Header>
          <Heading text={'Edit School'} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>
        <Modal.Body>
            <Stack className='d-flex justify-content-end' direction='horizontal'>
                <CustomButton onClick={()=>{
                  setDeleting(true)
                  deleteSchool(data.uuid).then((response)=>{
                    setDeleting(false)
                    onHide()
                    navigate(-1)
                  })
                }} loading={deleting} text={"Delete"}/>
            </Stack>
          <Formik
            initialValues={{
              // headmaster: '',
              name: data?data.name:'',
              email:data?data.email: '',
              phone: data?data.phone:'',
              city: data?data.city:'',
              address:data?data.address: '',
              municipal: data?data.municipal:'',
              type:data?data.type: '',
              registration_no:data?data.registration_no: '',
              registration_date: data?data.registration_date:'',
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={4} className='text-center'>
                    <Card className='text-start mt-2'>
                      <Card.Header>
                        <SubHeading text={`School image`} />
                      </Card.Header>
                      <Card.Body className='text-center'>
                        <Form.Group className='mt-2'>
                          {imagePreview === '' ? (
                            <BsCloudUpload
                              className='text-center'
                              onClick={() => document.getElementById('file').click()}
                              color={mutedBlack}
                              size={100}
                            />
                          ) : (
                            <Image  src={imagePreview} className='rounded' onClick={() => document.getElementById('file').click()} fluid />
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

                    <Card className='text-start mt-2'>
                      <Card.Header>
                        <SubHeading text={`Headmaster`} />
                      </Card.Header>
                      <Card.Body>
                        <Form.Group>
                          <Form.Label>Headmaster</Form.Label>
                          <Form.Select
                            onChange={handleChange}
                            name='headmaster'
                            value={values.headmaster}
                            isInvalid={!!errors.headmaster && touched.headmaster}
                          >
                            <option>Select an option</option>
                            {headmasters.map((item)=><option value={item.uuid}>{item.name}</option>)}
                        
                          </Form.Select>
                          <Form.Control.Feedback type='invalid'>{errors.headmaster}</Form.Control.Feedback>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={8}>
                    <Card className='text-start mt-2'>
                      <Card.Header>
                        <SubHeading text={`School Info`} />
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>School name</Form.Label>
                              <Form.Control
                                onChange={handleChange}
                                name='name'
                                value={values.name}
                                isInvalid={!!errors.name && touched.name}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>School email</Form.Label>
                              <Form.Control
                                onChange={handleChange}
                                name='email'
                                value={values.email}
                                isInvalid={!!errors.email && touched.email}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>School Phone</Form.Label>
                              <Form.Control
                                onChange={handleChange}
                                name='phone'
                                value={values.phone}
                                isInvalid={!!errors.phone && touched.phone}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>

                    <Card className='text-start mt-2'>
                      <Card.Header>
                        <SubHeading text={`School Location`} />
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                onChange={handleChange}
                                name='address'
                                value={values.address}
                                isInvalid={!!errors.address && touched.address}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.address}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>City</Form.Label>
                              <Form.Select
                                onChange={handleCityChange}
                                name='city'
                                value={selectedCity}
                                isInvalid={!!errors.city && touched.city}
                              >
                                <option>Select a city</option>
                                {cities.map((item, index) => (
                                  <option key={index} value={item.city}>
                                    {item.city}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type='invalid'>{errors.city}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Municipal</Form.Label>
                              <Form.Select
                                onChange={handleChange}
                                name='municipal'
                                value={values.municipal}
                                isInvalid={!!errors.municipal && touched.municipal}
                              >
                                <option>Select a municipal</option>
                                {selectedCity &&
                                  cities.find((item) => item.city === selectedCity)?.municipals.map((item, index) => (
                                    <option key={index}>{item}</option>
                                  ))}
                              </Form.Select>
                              <Form.Control.Feedback type='invalid'>{errors.municipal}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>

                    <Card className='text-start mt-2'>
                      <Card.Header>
                        <SubHeading text={`Registration info`} />
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Type</Form.Label>
                              <Form.Select
                                onChange={handleChange}
                                name='type'
                                value={values.type}
                                isInvalid={!!errors.type && touched.type}
                              >
                                <option>Select an option</option>
                                <option>Private</option>
                                <option>Government</option>
                              </Form.Select>
                              <Form.Control.Feedback type='invalid'>{errors.type}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Registration number</Form.Label>
                              <Form.Control
                                onChange={handleChange}
                                name='registration_no'
                                value={values.registration_no}
                                isInvalid={!!errors.registration_no && touched.registration_no}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.registration_no}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Registered at</Form.Label>
                              <Form.Control
                                onChange={handleChange}
                                name='registration_date'
                                type='date'
                                value={values.registration_date}
                                isInvalid={!!errors.registration_date && touched.registration_date}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.registration_date}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Stack direction='horizontal'>
                  <CustomButton loading={loading} text={"Edit School"}/>
                </Stack>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default EditSchoolModal;
