import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { sampleData } from "../utils/arrays";
import Heading from "./heading";

export const DataTable = () => {
 
  
    return (
        <div className=" p-3" style={{ backgroundColor:"white" }}>
            <Heading text={"School alumni"}/>
        <Stack  className="d-flex justify-content-end">
            <Row>
                <Col md={{ span:4,offset:8}}>
                 <Form.Control placeholder="Search here..." type="text"></Form.Control>

                </Col>
                
            </Row>
        </Stack>
 <Table>
        
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {sampleData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td><Button style={{  }} className="bg-danger border-0 btn btn-sm py-1">Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
        </div>
     
    );
  };
  
  export default DataTable