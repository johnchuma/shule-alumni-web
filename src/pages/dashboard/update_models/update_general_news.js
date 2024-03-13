import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image } from 'react-bootstrap';
import { ContentState, EditorState, convertFromHTML, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { BsCloudUpload, BsImageAlt } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import Heading from '../../../general_widgets/heading';
import SubHeading from '../../../general_widgets/subheading';
import { mutedBlack, primaryColor } from '../../../utils/colors';
import { updateGeneralNews } from '../../../controllers/general_news_controller';


const UpdateGeneralNewsModal = ({ show, onHide, news }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    if (news !== null) {
      setImagePreview(news.image);
      const contentState = convertFromHTML(news.description);
      const editorContentState = ContentState.createFromBlockArray(contentState.contentBlocks, contentState.entityMap);
      setEditorState(EditorState.createWithContent(editorContentState));
    }
  }, [news]);
  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const { Formik } = formik;
  const schema = yup.object().shape({
    title: yup.string().required(),
  });

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSubmit = (values) => {
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));
    const htmlContent = draftToHtml(convertToRaw(contentState));
    const data = {title:values.title,image:news.image,description:htmlContent,file}; 
    console.log("hello there")
    updateGeneralNews(data,news.uuid).then((response)=>{
            onHide();
    });

};

  return (
    <Modal show={show} className='' size='xl' onHide={onHide}>
      <Container>
        <Modal.Header>
          <SubHeading text={'Update general news'} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>

        <Modal.Body>
          <Formik initialValues={{ title: news ===null?"": news.title }} onSubmit={handleSubmit} validationSchema={schema}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={4} className='text-center'>
                  <Card>
                            <Card.Header>
                                <SubHeading text={"News image"}/>
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
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='title'
                        value={values.title}
                        isInvalid={!!errors.title && touched.title}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.title}</Form.Control.Feedback>
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
                  <Button
                    style={{ backgroundColor: primaryColor }}
                    className='mt-5 px-5 py-2 border-0'
                    type='submit'
                  >
                    Update news
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default UpdateGeneralNewsModal;
