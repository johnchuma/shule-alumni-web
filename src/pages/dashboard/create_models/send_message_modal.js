import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image } from 'react-bootstrap';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { BsCloudUpload, BsImageAlt } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import Heading from '../../../general_widgets/heading';
import { mutedBlack, primaryColor } from '../../../utils/colors';
import SubHeading from '../../../general_widgets/subheading';
import { createSchoolJob } from '../../../controllers/job_controller';
import { createSchoolMemorium } from '../../../controllers/memorium_controller';
import CustomButton from '../../../general_widgets/button';
import Paragraph from '../../../general_widgets/paragraph';
import { replyMessage, sendMessage } from '../../../controllers/message_controller';


const SendMessageModal = ({ show, onHide,user }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

 

  const { Formik } = formik;
  const schema = yup.object().shape({
    subject: yup.string().required()

  });

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = (values) => {
    setLoading(true)
    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));
    const data = {subject:values.subject,message:htmlContent}
      replyMessage(data,user.uuid).then((response)=>{
      if(response){
        setLoading(false)
        onHide()
      }
     })
  
  };
  
  return (
    <Modal show={show} className='' size='lg' onHide={onHide}>
      <Container>
        <Modal.Header>
          <Heading text={`From: ${user&&user.name} `} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>
       
        <Modal.Body>
          <div className='py-2 px-2' style={{ backgroundColor:"#E7FFDC" }}>
            <Paragraph text={user&&user.message} />
          </div>
       <br/>

          <Formik initialValues={{ subject: '' }} onSubmit={handleSubmit} validationSchema={schema}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Write a subject</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='subject'
                        value={values.subject}
                        isInvalid={!!errors.subject && touched.subject}
                      >
                      </Form.Control>
                      <Form.Control.Feedback type='invalid'>{errors.subject}</Form.Control.Feedback>
                    </Form.Group>
                   
                    
                    <Form.Group className='mt-2'>
                      <Form.Label>Message</Form.Label>
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
                  <CustomButton className={"mt-3"} loading={loading} text={"Send reply"}/>
                </Stack>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default SendMessageModal;
