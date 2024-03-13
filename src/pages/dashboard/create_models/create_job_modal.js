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
import CustomButton from '../../../general_widgets/button';

const CreateJobModal = ({ show, onHide }) => {
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
    title: yup.string().required(),
    link: yup.string().required(),
    type: yup.string().required(),
  });

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSubmit = (values) => {
    setLoading(true); // Set loading state to true

    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));

    const data = {
      title: values.title,
      type: values.type,
      link: values.link,
      description: htmlContent,
      file: file,
    };

    createSchoolJob(data)
      .then((response) => {
        if (response === true) {
          onHide();
        }
      })
      .finally(() => {
        setLoading(false); // Set loading state back to false
      });
  };

  return (
    <Modal show={show} className='' size='xl' onHide={onHide}>
      <Container>
        <Modal.Header>
          <Heading text={'Post new job'} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>

        <Modal.Body>
          <Formik initialValues={{ title: '', link: '', type: '' }} onSubmit={handleSubmit} validationSchema={schema}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={4} className='text-center'>
                    <Card>
                      <Card.Header>
                        <SubHeading text={'Cover image'} />
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className='mt-2'>
                          {imagePreview === '' ? (
                            <div className='btn p-5' style={{}}>
                              <AiOutlineFileImage
                                className='text-center'
                                onClick={() => document.getElementById('file').click()}
                                color={mutedBlack}
                                size={80}
                              />
                            </div>
                          ) : (
                            <Image src={imagePreview} style={{ objectFit: 'cover' }} onClick={() => document.getElementById('file').click()} fluid />
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
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='title'
                        value={values.title}
                        isInvalid={!!errors.title && touched.title}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.title}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Link</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='link'
                        value={values.link}
                        isInvalid={!!errors.link && touched.link}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.link}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Job type</Form.Label>
                      <Form.Select
                        onChange={handleChange}
                        name='type'
                        value={values.type}
                        isInvalid={!!errors.type && touched.type}
                      >
                        <option>Select job type</option>
                        <option value={'Part Time'}>Part Time</option>
                        <option value={'Full Time'}>Full Time</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.type}</Form.Control.Feedback>
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
                <CustomButton loading={loading} text={"Post a job"}/>
               
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default CreateJobModal;
