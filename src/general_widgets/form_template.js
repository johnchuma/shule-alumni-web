import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap'
import * as formik from 'formik'
import * as yup from 'yup'
function App() {
const {Formik} = formik;
 const schema = yup.object().shape({
  name: yup.string().required(),
  email:yup.string().email().required(),
  phone:yup.number("It must be number type").required()
 })
  return (
    <Container>
        
          <Row>
            <Col  md={{offset:3,span:6 }}>
            <Card className='mt-5 py-3'>
              <Card.Header>
              <h5 className='mb-3'>Join the community</h5>

              </Card.Header>
              <Card.Body>
              <Formik initialValues={{ 
              name:"",
              email:"",
              phone:""
              }}  
             onSubmit={()=>console.log("It is done")}
             validationSchema={schema}
             >{({handleSubmit,handleChange,values,touched,errors})=>
            
             (<Form noValidate onSubmit={handleSubmit}  >
             <Form.Group>
               <Form.Label>Name</Form.Label>
               <Form.Control 
               onChange={handleChange}
               name='name'
               value={values.name}
               isInvalid={!!errors.name && touched.name}
               ></Form.Control>
               <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
             </Form.Group>
             <Form.Group>
               <Form.Label>Email</Form.Label>
               <Form.Control 
               name='email'
               onChange={handleChange}
               value={values.email}
               isInvalid={!!errors.email && touched.email}
               ></Form.Control>
               <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
             </Form.Group>
             <Form.Group>
               <Form.Label>Phone</Form.Label>
               <Form.Control 
               name='phone'
               onChange={handleChange}
               value={values.phone}
               isInvalid={!!errors.phone && touched.phone}
               ></Form.Control>
               <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
             </Form.Group>
             <Button  className="mt-5 w-100" type='submit'>Register</Button>
           </Form>
             
             )}
             
             </Formik>
              </Card.Body>
            
            </Card>
            </Col>
          </Row>
    </Container>
  );
}

export default App;
