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
import { uploadImageToGallery } from '../../../controllers/gallery_controller';

const UploadImage = ({ show, onHide }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false); // Add the loading state

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const { Formik } = formik;
  const schema = yup.object().shape({
  });



  const handleSubmit = (values) => {
    setLoading(true); // Set loading state to true
    const data = {
      file: file
    };
    uploadImageToGallery(data)
      .then((response) => {
        if (response === true) {
          setFile(null)
          setImagePreview("")
          onHide();
        }
      })
      .finally(() => {
        setLoading(false); // Set loading state back to false
      });
  };

  return (
    <Modal show={show} className='' size='md' onHide={onHide}>
      <Container>
        <Modal.Header>
          <Heading text={'Upload image'} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>

        <Modal.Body>
          <Formik initialValues={{ file:"" }} onSubmit={handleSubmit} validationSchema={schema}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={12} className='text-center'>
                    <Card>
                      <Card.Body>
                        <Form.Group className='mt-2'>
                          {imagePreview === '' ? (
                            <div className='btn p-5' style={{}}>
                              <AiOutlineFileImage
                                className='text-center'
                                onClick={() => document.getElementById('image').click()}
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
                            id='image'
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <CustomButton className={"mt-3"} loading={loading} text={"Upload image"}/>
               
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default UploadImage;
