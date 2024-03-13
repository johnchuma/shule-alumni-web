import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { projectsData, sampleData } from "../utils/arrays";
import Heading from "./heading";
import { useNavigate } from "react-router-dom";
import { getAllProject } from "../controllers/project_controller";
import { useEffect, useState } from "react";
import UpdateProjectModal from "../pages/dashboard/update_models/update_project";
import DeleteConfirmation from "./delete_confirmation";
import { timeAgo } from "../utils/tile_ago";

export const ProjectList = ({refresh,uuid}) => {
 const navigate = useNavigate()
 const [projects, setProjects] = useState([]);
 const [showUpdateModal, setshowUpdateModal] = useState(false);
 const [selectedProject, setSelectedProject] = useState(null);
 const [showDeleteModal, setShowDeleteModal] = useState(false);
  useEffect(() => {
    getAllProject(uuid).then((data)=>setProjects(data));
  }, [refresh]);

    return (
        <div className=" p-3" style={{ backgroundColor:"white" }}>
         
            <Heading fontSize={"1.5vw"} text={"School projects"}/>
        <Stack  className="d-flex justify-content-end my-2">
            <Row>
                <Col md={{ span:4,offset:8}}>
                 <Form.Control placeholder="Search here..." type="text"></Form.Control>
                </Col>  
            </Row>
        </Stack>
        <div className="table-responsive-md">
        <Table>
        
        <thead>
          <tr>
            <th>Created</th>
            <th>Name</th>
            <th>Duration</th>
            <th></th>
            


          </tr>
        </thead>
        <tbody>
          {projects.map((item, index) => (
            <tr key={index}>
              <td>{timeAgo(item.createdAt)}</td>
              <td>{item.name}</td>
              <td>{item.duration}</td>
              <td><Button onClick={()=>navigate(`/dashboard/projects/details/${item.uuid}`)} style={{  }} className="bg-success border-0 btn btn-sm py-1">View </Button></td>

            </tr>
          ))}
        </tbody>
      </Table>
        </div>
 
        </div>
     
    );
  };
  
  export default ProjectList