import { Card, Col, Row, Spinner, Stack } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../general_widgets/button";
import { greenColor, mutedBlack, primaryColor } from "../../../utils/colors";
import Heading from "../../../general_widgets/heading";
import EditSchoolModal from "../../../widgets/schools/edit_school_modal";
import { useEffect, useState } from "react";
import { getSchool } from "../../../controllers/school_controller";
import SchoolList from "../../../general_widgets/school_list";
import SubHeading from "../../../general_widgets/subheading";
import Paragraph from "../../../general_widgets/paragraph";

const ViewSchool = () => {
const {uuid} = useParams()
const [school, setSchool] = useState(null);
const [updateSchoolModal, setUpdateSchoolModal] = useState(false);

useEffect(() => {
   getSchool(uuid).then((data)=>setSchool(data))
}, []);
const navigate = useNavigate()
    return ( 
        <div>
        
        {
                school&&
               <EditSchoolModal show={updateSchoolModal} onHide={()=>setUpdateSchoolModal(false)} data={school.schoolInfo} />
            }
                    <Stack direction='horizontal' className='d-flex  mt-4'>
                        <Stack direction='horizontal' className='me-auto'>
                        <div onClick={()=>navigate("/dashboard/schools")} className='btn border-0 px-0'>
                        <AiOutlineArrowLeft   className='me-3' size={20} />
                        </div>
                        <Heading  text={school&&school.schoolInfo.name}/>

                        </Stack>
                        {
                        <div>
                        <CustomButton color={"green"} onClick={()=>{
                            setUpdateSchoolModal(true)
                        }} className={`ms-auto me-3`} text={"Edit"}/>

                        </div>
                        }
                        </Stack>

        <Card className="mt-5">
            <Card.Header>
             <Heading text={"School details"}/>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center align-items-center">
                {
                    school == null? <Spinner style={{ color:primaryColor }} className="text-center my-5" />:
                    <Row>
                    {
                    [
                    {name:"Total alumni",value:school&&school.alumniCount,link:`/dashboard/alumni/${school&&school.schoolInfo.uuid}`},
                    {name:"Total projects",value:school&&school.projectCount,link:`/dashboard/projects/${school&&school.schoolInfo.uuid}`},
                    {name:"Total job oppotunities posts",value:school&&school.jobCount,link:`/dashboard/school-jobs/${school&&school.schoolInfo.uuid}`},
                    {name:"Total  in memorium",value:school&&school.memoriumCount,link:`/dashboard/school-memoriums/${school&&school.schoolInfo.uuid}`},
                    {name:"Total news ",value:school&&school.newsCount,link:`/dashboard/news/${school&&school.schoolInfo.uuid}`},
                    {name:"Total events ",value:school&&school.eventCount,link:`/dashboard/events/${school&&school.schoolInfo.uuid}`}
                ].map((item)=>{
                        return <Col className="d-flex align-stretch-items align-item-center" md="4">
                            
                            <Card onClick={()=>navigate(item.link)} className="w-100 mb-3 btn p-0 text-start"> 
                                <Card.Body>
                                    <Stack direction="horizontal" className="d-flex align-items-center">
                                    <div className="d-flex justify-content-center align-items-center rounded me-3 " 
                                         style={{ backgroundColor:primaryColor,height:50,width:50 }}>
                                    <Heading color={"white"} text={item.value}/>
                                    </div>
                                    <Paragraph className={""} text={item.name}/>
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </Col>
                    })
                    }
                     
                   </Row>
                }
           
            </Card.Body>
        </Card>
      
     </div>
    );
}
 
export default ViewSchool;