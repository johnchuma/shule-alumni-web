import React, { useState } from 'react'
import DataTable from '../../general_widgets/datatable'
import { Stack } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import ProjectList from '../../general_widgets/project_list'
import CreateProjectModal from '../../widgets/project/create_project_modal'
import { getUser } from '../../utils/local_storage'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'


const ProjectPage = () => {
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
    const user = getUser()
    const {uuid} = useParams()
    const navigate = useNavigate()
    return (
       <div>
        <CreateProjectModal show={showCreateProjectModal} onHide={()=>setShowCreateProjectModal(false)} />
        
            <Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
             <Stack direction='horizontal'>
             {uuid && <div onClick={()=>navigate(`/dashboard/school/${uuid}`)} className='btn border-0 px-0'>
                        <AiOutlineArrowLeft   className='me-3' size={20} />
                        </div>  }
          <Heading className={"me-auto "} text={`Projects`}/>
             </Stack>
        
          {
            user.role == "Moderator"&&<CustomButton onClick={()=>setShowCreateProjectModal(true)} text={"Create project"}/>
          }
          
       </Stack>
       <br/>
       <ProjectList uuid={uuid} refresh={showCreateProjectModal} />
        </div>
    )
}

export default ProjectPage
