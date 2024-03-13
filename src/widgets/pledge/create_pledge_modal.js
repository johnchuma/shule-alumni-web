import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image } from 'react-bootstrap';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { AiOutlineClose } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup';
import Heading from '../../general_widgets/heading';
import { primaryColor } from '../../utils/colors';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import SubHeading from '../../general_widgets/subheading';
import { createPledge } from '../../controllers/pledge_controller';
import { getUser } from '../../utils/local_storage';
import CustomButton from '../../general_widgets/button';

const CreatePledgeModal = ({ show, onHide, uuid }) => {
  const [loading, setLoading] = useState(false); // Add the loading state

  const { Formik } = formik;
  const schema = yup.object().shape({
    amount: yup.string().required(),
  });

  const handleSubmit = (values) => {
    setLoading(true); // Set loading state to true

    const user = getUser();
    const data = { project_uuid: uuid, amount: values.amount, user_uuid: user.uuid };

    createPledge(data)
      .then((response) => {
        onHide();
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <Modal show={show} className='' size='md' onHide={onHide}>
      <Container>
        <Modal.Header>
          <Heading text={'Create pledge'} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>

        <Modal.Body>
          <Formik initialValues={{ amount: '' }} onSubmit={handleSubmit} validationSchema={schema}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Enter amount</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='amount'
                        value={values.amount}
                        isInvalid={!!errors.amount && touched.amount}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.amount}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <CustomButton className={"mt-3"} loading={loading} text={"Add pledge"}/>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default CreatePledgeModal;
