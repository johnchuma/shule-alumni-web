import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import GridView from '../../general_widgets/grid_view'
import NewsView from '../../general_widgets/news_view'
import CreateSchoolEventModal from '../../widgets/school_events/create_school_event_modal'
import SchoolEventList from '../../general_widgets/school_event_list'
import { getUser } from '../../utils/local_storage'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
const EventPage = () => {
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    const user = getUser()
    const {uuid} = useParams()
    const navigate = useNavigate()

    return (
        <div>
            <CreateSchoolEventModal show={showCreateEventModal} onHide={()=>setShowCreateEventModal(false)}/>
        <Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
        <Stack direction='horizontal'>
        {uuid && <div onClick={()=>navigate(`/dashboard/school/${uuid}`)} className='btn border-0 px-0'>
                        <AiOutlineArrowLeft   className='me-3' size={20} />
                        </div>  }
          <Heading className={"me-auto"} text={`School events`}/>
        </Stack>
            
       
          {user.role == "Moderator" && <div>
          <CustomButton onClick={()=>setShowCreateEventModal(true)} text={"New event"}/>
            </div>}
       </Stack>
       <br/>
       <SchoolEventList uuid={uuid} refresh={showCreateEventModal}/>
      </div>
    )
}

export default EventPage
