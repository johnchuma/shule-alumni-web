import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image, Toast, ToastContainer } from 'react-bootstrap';

import { BsCloudUpload, BsImageAlt } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup';
import { Editor } from 'react-draft-wysiwyg';
import Heading from '../../../general_widgets/heading';
import { mutedBlack, primaryColor } from '../../../utils/colors';
import SubHeading from '../../../general_widgets/subheading';
import { createSchoolJob } from '../../../controllers/job_controller';
import { createSchoolMemorium } from '../../../controllers/memorium_controller';
import CustomButton from '../../../general_widgets/button';
import Paragraph from '../../../general_widgets/paragraph';
import { sendMessage } from '../../../controllers/message_controller';
import { getAllUsers } from '../../../controllers/user_controller';
import draftjsToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';


const ComposeMessage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
 const [users, setUsers] = useState([]);
 const [showResponse, setshowResponse] = useState(false);
 const [response, setresponse] = useState("");
  const [typeMail, setTypeMail] = useState(false);
useEffect(() => {
  getAllUsers().then((data)=>setUsers(data))
}, []);
  const { Formik } = formik;
  const schema = yup.object().shape({
    subject: yup.string().required(),
    type: yup.string().required(),
    recipient: yup.string().required()


  });

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const initialValues = { subject: '',type:"", recipient:"" };
 
  const [loading, setLoading] = useState(false);
  const handleSubmit = (values,helpers) => {
    setLoading(true)
    const contentState = editorState.getCurrentContent();
    const htmlContent = draftjsToHtml(convertToRaw(contentState));
    const data = {subject:values.subject,to:values.recipient,type:values.type,message:htmlContent}
      sendMessage(data).then((response)=>{
      if(response){
        setLoading(false)
        setshowResponse(true)
        setresponse("Message sent successfully")
        helpers.resetForm({
          values,
        });
      }
     })
  
  };
  const [typeEmail, setTypeEmail] = useState(false);
  return (
    
    <div>
        <ToastContainer className='px-3 py-3 fixed-top  w-100 d-flex justify-content-end' position='top-end' >
        <Toast show={showResponse} autohide  onClose={()=>setshowResponse(false)} >
          <Toast.Header style={{ color:"green" }} className='d-flex justify-content-between'><SubHeading className={"me-auto"} text={"Success"}/> </Toast.Header>
          
          <Toast.Body>
            {response}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Heading className={"mb-3 mt-4"} text={"Send notification"}/>
  <Card>
        
          <Card.Body>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                
                  <Col md={12}>
                  <Form.Group>
                  <Form.Label>Message type</Form.Label>

                <Form.Select
                    onChange={handleChange}
                    name='type'
                    value={values.type}
                    isInvalid={!!errors.type && touched.type}
                    >
                    <option>Select message type</option>
                    <option value="all">Both mail & SMS</option>
                    <option value="mail">Mail</option>
                    <option value="sms">SMS</option>
                    </Form.Select>
                      
                      <Form.Control.Feedback type='invalid'>{errors.type}</Form.Control.Feedback>
                    </Form.Group>
                 
                  <Form.Group className='mt-2'>
                    <Stack direction='horizontal' className='d-flex justify-content-center mb-2 w-100'>
                       <div>
                        Recipient
                       </div>
                        <div className='ms-auto'>
                      <Stack direction='horizontal'>
                          <Paragraph className={"me-3"} fontWeight={500} text={!typeMail?"Select User":"Type phone/email"}/>
                          <Form.Switch checked={typeMail}   onChange={(e)=>{
                              console.log(e.target.value)
                              setTypeMail(!typeMail)
                            }}>    
                          </Form.Switch>
                      </Stack>
                        </div>
                     
                          </Stack>

                      
                      <Row>
                        
                        <Col md={12}>
                     {
                      typeMail? <Form.Control  onChange={handleChange}
                      name='recipient'
                      value={values.recipient}
                      isInvalid={!!errors.recipient && touched.recipient}
                      >
                      </Form.Control>: <Form.Select
                        onChange={handleChange}
                        name='recipient'
                        value={values.recipient}
                        isInvalid={!!errors.recipient && touched.recipient}
                      >
                        <option>Choose recipient</option>
                        <option value="all">Send to everyone</option>
                        {users.map((item)=><option value={item.email}>{item.name}</option>)}
                      </Form.Select>
                     }   
                        </Col>
                      </Row>
                      <Form.Control.Feedback type='invalid'>{errors.recipient}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-2'>
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
          </Card.Body>
        </Card>
    </div>
      
          
      
  );
};

export default ComposeMessage;
