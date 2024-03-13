

import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image, Spinner } from 'react-bootstrap';
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import { useParams } from 'react-router-dom';
import { getUserInfo, updateUser } from '../../controllers/user_controller';
import CustomButton from '../../general_widgets/button';
import { mutedBlack, primaryColor } from '../../utils/colors';
import SubHeading from '../../general_widgets/subheading';
import Heading from '../../general_widgets/heading';
import Paragraph from '../../general_widgets/paragraph';
import Loader from '../../utils/loader';
import UploadImage from './create_models/upload_image';
import { FaTrash } from 'react-icons/fa';
import { deleteImage } from '../../controllers/gallery_controller';


const MyProfile = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [bioEditorState, setBioEditorState] = useState(EditorState.createEmpty());
  const [achievementsEditorState, setAchievementsEditorState] = useState(EditorState.createEmpty());
  const { uuid } = useParams();
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const convertFromHtml=(value)=>{
    const contentState = convertFromHTML(value);
      const editorContentState = ContentState.createFromBlockArray(contentState.contentBlocks, contentState.entityMap);
       return EditorState.createWithContent(editorContentState)
    }
  useEffect(() => {
    if(uploadImage === false || deletingImage === false){
      
      getUserInfo(uuid).then((data) => {
        setUser(data)
        setImagePreview(data.image)
        if(data.bio !== null){
          setBioEditorState(convertFromHtml(data.bio))
  
        }
        if(data.achievement !== null){
          setAchievementsEditorState(convertFromHtml(data.achievement))
        }
      });
    }
   
  }, [uploadImage,deletingImage]);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    if (user) {
      setImagePreview(user.image);
    }
  }, [show]);

  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup.string().required(),
    phone: yup.string().required(),
    company: yup.string().required(),
    position: yup.string().required(),
    address: yup.string().required(),
    birth_date: yup.string().required(),
    phone: yup.string().required(),


    graduation_year: yup.string().required(),

  });

  const handleBioEditorStateChange = (editorState) => {
    setBioEditorState(editorState);
  };

  const handleAchievementsEditorStateChange = (editorState) => {
    setAchievementsEditorState(editorState);
  };

  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (values) => {
    const data = {
      file,
      ...values,
      image: user.image,
      bio: draftToHtml(convertToRaw(bioEditorState.getCurrentContent())),
      achievement: draftToHtml(convertToRaw(achievementsEditorState.getCurrentContent())),
    };

    setLoading(true);
    updateUser(data, user.uuid).then((status) => {
      if (status === true) {
        setLoading(false);
      }
    });
  };
  const [selectedImage, setSelectedImage] = useState(null);
  return (
   !user?<Loader/>: <Container>
    <UploadImage show={uploadImage} onHide={()=>setUploadImage(false)}/>
      <Formik
        initialValues={{
          name: user ? user.name : '',
          phone: user ? user.phone : '',
          graduation_year: user ? user.graduation_year : '',
          birth_date: user ? user.birth_date : '',
          company: user ? user.company : '',
          position: user ? user.position : '',
          address: user ? user.address : '',
          // Initialize other fields as needed
        }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack className='d-flex justify-content-between mb-3 mt-4 p-0' direction='horizontal'>
              <Heading text={'My profile'} />
              <CustomButton loading={loading} className={'mt-0'} text={'Save changes'} />
            </Stack>
            <Row className='mt-2'>
            <Col md={{ span:4,order:2 }}>
                    <Card className='bg-white border-0 '>
                 <Card.Body>
                 <Stack direction='horizontal' className='d-flex justify-content-center  text-center'>
            
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
                            size={35}
                          />
                        </div>
                      ) : (
                        <Image
                          src={imagePreview}
                          roundedCircle
                          style={{ height: 130, width: 130, objectFit: 'cover' }}
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
                      <div className='text-center mt-3'><Heading text={user&&user.name}/>
                       <Paragraph text={user&&user.email}/>
                  </div>
                    </Form.Group>
                  
          
            </Stack>
                 <Row className='mt-3'>
                  
                  <Col md={12}>
                    <Row>
                      <Col md={12}>
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
                      <Col md={12}>
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
                      <Col md={12}>
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
                      <Col md={12}>
                        <Form.Group className='mb-2'>
                          <Form.Label>Current address</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name='address'
                            value={values.address}
                            isInvalid={!!errors.address && touched.address}
                          />
                          <Form.Control.Feedback type='invalid'>{errors.address}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col className='mb-4' md={12}>
                        <Form.Group className='mb-2'>
                          <Form.Label>Birth date</Form.Label>
                          <Form.Control type='date'
                            onChange={handleChange}
                            name='birth_date'
                            value={values.birth_date}
                            isInvalid={!!errors.birth_date && touched.birth_date}
                          />
                          <Form.Control.Feedback type='invalid'>{errors.birth_date}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <br/>
                      <hr/>
                      

                      <SubHeading className={"mt-3"} text={"About work"}/>
                      <Col md={12}>
                        <Form.Group className='mb-2'>
                          <Form.Label>Company</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name='company'
                            value={values.company}
                            isInvalid={!!errors.company && touched.company}
                          />
                          <Form.Control.Feedback type='invalid'>{errors.company}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group className='mb-2'>
                          <Form.Label>Position</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name='position'
                            value={values.position}
                            isInvalid={!!errors.position && touched.position}
                          />
                          <Form.Control.Feedback type='invalid'>{errors.position}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                     
                    </Row>
                  </Col>
                </Row>
                 </Card.Body>
                </Card>
                    </Col>
              <Col md={{ span:8,order:1 }}>
                <Card className='bg-white border-0'>
                  <Card.Body>
                    <SubHeading text={'Descriptions'} />
                    <Form.Group className='mt-4'>
                      <Form.Label>My Bio</Form.Label>
                      <Card className='p-3'>
                        <Editor
                          editorState={bioEditorState}
                          onEditorStateChange={handleBioEditorStateChange}
                          // Adjust the height as needed
                        />
                      </Card>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                      <Form.Label>My Achievements</Form.Label>
                      <Card className='p-3'>
                        <Editor
                          editorState={achievementsEditorState}
                          onEditorStateChange={handleAchievementsEditorStateChange}
                          // Adjust the height as needed
                        />
                      </Card>
                    </Form.Group>
                    {/* Add more form fields here */}
                  </Card.Body>
                </Card>
                <Stack direction='horizontal' className='d-flex justify-content-between mt-5'>
                  <Heading text={"Gallery"}/>
             <Button style={{ backgroundColor:primaryColor }}  className='border-0' onClick={()=>setUploadImage(true)}>Add image</Button>
                </Stack>
                <Card className='mt-3 border-0'>
                  <Card.Body>
                  <Row>
                  {user.Galleries.map((item)=><Col md={3}>
                    <Stack  >
                    <Image fluid src={item.image}/>
                   {deletingImage ? selectedImage.uuid === item.uuid &&<Spinner style={{ color:primaryColor }} size='sm'/>:<FaTrash style={{ color:primaryColor }} className='mt-3' onClick={async ()=>{
                    setSelectedImage(item)
                    setDeletingImage(true)
                    await deleteImage(item.uuid)
                    setDeletingImage(false)
                   }}/>} 
                    </Stack>
                  </Col>)}
                </Row>
                  </Card.Body>
                </Card>
                
              </Col>
            
              {/* ... (Remaining form fields) */}
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default MyProfile;
