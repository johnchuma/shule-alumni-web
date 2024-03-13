import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image } from 'react-bootstrap';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { BsCloudUpload, BsImageAlt } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import Heading from '../../../general_widgets/heading';
import { mutedBlack, primaryColor } from '../../../utils/colors';
import SubHeading from '../../../general_widgets/subheading';
import { createSchoolJob } from '../../../controllers/job_controller';
import { createSchoolMemorium } from '../../../controllers/memorium_controller';
import CustomButton from '../../../general_widgets/button';


const CreateMemoriumModal = ({ show, onHide }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup.string().required()

  });

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = (values) => {
    setLoading(true)
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    const htmlContent = draftToHtml(convertToRaw(contentState));
    const data = {name:values.name,description:htmlContent,file}
    console.log(data)
      createSchoolMemorium(data).then((response)=>{
      if(response === true){
        setLoading(false)
        onHide()
      }
     })
  
  };

  return (
    <Modal show={show} className='' size='xl' onHide={onHide}>
      <Container>
        <Modal.Header>
          <Heading text={'New memorium'} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>

        <Modal.Body>
          <Formik initialValues={{ name: '',link:'',type:'' }} onSubmit={handleSubmit} validationSchema={schema}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={4} className='text-center'>
                  <Card>
                            <Card.Header>
                                <SubHeading text={"Cover image"}/>
                            </Card.Header>
                            <Card.Body>
                            <Form.Group className='mt-2'>
                        
                        {imagePreview === '' ? (
                          <div className='btn p-5' style={{ }}>
                           <AiOutlineFileImage
                            className='text-center'
                            onClick={() => document.getElementById('file').click()}
                            color={mutedBlack}
                            size={80}
                          />
                          </div>
                          
                        ) : (
                        
                          <Image src={imagePreview} style={{ objectFit:'cover', }}  onClick={() => document.getElementById('file').click()} fluid />
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
                    <Form.Group>
                      <Form.Label>Name of alumni</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='name'
                        value={values.name}
                        isInvalid={!!errors.name && touched.name}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                   
                    
                    <Form.Group className='mt-2'>
                      <Form.Label>Description</Form.Label>
                      <Card className='p-3'>
                        <Editor
                          editorState={editorState}
                          onEditorStateChange={handleEditorStateChange}
                          // Adjust the height as needed
                        />
                      </Card>
                    </Form.Group>
                  </Col>
                </Row>
                <Stack direction='horizontal'>
                  <CustomButton className={"mt-3"} loading={loading} text={"Add memorium"}/>
                </Stack>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default CreateMemoriumModal;
