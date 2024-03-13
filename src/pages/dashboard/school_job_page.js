import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import GridView from '../../general_widgets/grid_view'
import NewsView from '../../general_widgets/news_view'

import { getUser } from '../../utils/local_storage'
import CreateJobModal from './create_models/create_job_modal'
import JobList from './list_pages/job_list'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import SubHeading from '../../general_widgets/subheading'
const SchoolJob = () => {
    const [showCreateJobModal, setShowCreateJobModal] = useState(false);
    const user = getUser()
    const {uuid} = useParams()
    const navigate = useNavigate()

    return (
       <div>
        <CreateJobModal show={showCreateJobModal} onHide={()=>setShowCreateJobModal(false)} />
        <div className='d-none d-md-block'>
        <Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
<Stack direction='horizontal'>

{uuid && <div onClick={()=>navigate(`/dashboard/school/${uuid}`)} className='btn border-0 px-0'>
                        <AiOutlineArrowLeft   className='me-3' size={20} />
                        </div>  }
          <Heading text={`Job apportunities`}/>
</Stack>

          {
            ["Moderator","Alumni"].includes(user.role)&&<CustomButton onClick={()=>setShowCreateJobModal(true)} text={"New job"}/>
          }
       </Stack>
        </div>
        <div className='d-block d-md-none'>
        <Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
<Stack direction='horizontal'>

{uuid && <div onClick={()=>navigate(`/dashboard/school/${uuid}`)} className='btn border-0 px-0'>
                        <AiOutlineArrowLeft   className='me-3' size={20} />
                        </div>  }
          <SubHeading text={`Job apportunities`}/>
</Stack>

          {
            ["Moderator","Alumni"].includes(user.role)&&<CustomButton className={"btn-sm"} onClick={()=>setShowCreateJobModal(true)} text={"New job"}/>
          }
       </Stack>
        </div>

      
       
       <br/>
       <JobList uuid={uuid} refresh={showCreateJobModal}/>
      </div>
    )
}

export default SchoolJob
