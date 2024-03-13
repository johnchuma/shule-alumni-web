import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import GridView from '../../general_widgets/grid_view'
import NewsView from '../../general_widgets/news_view'
import CreateSchoolMemoriumModal from '../../widgets/school_news/create_school_news_model'
import { getUser } from '../../utils/local_storage'
import MemoriumList from './list_pages/memorium_list'
import CreateMemoriumModal from './create_models/create_memorium_modal'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import SubHeading from '../../general_widgets/subheading'
const SchoolMemorium = () => {
    const [showCreateMemoriumModal, setShowCreateMemoriumModal] = useState(false);
    const user = getUser()
    const {uuid} = useParams()
    const navigate = useNavigate()
    return (
       <div>
        <CreateMemoriumModal show={showCreateMemoriumModal} onHide={()=>setShowCreateMemoriumModal(false)} />
        <div className='d-none d-md-block'>
        <Stack direction='horizontal' className='d-flex justify-content-between mt-4 '>
        <Stack direction='horizontal'>
        {uuid && <div onClick={()=>navigate(`/dashboard/school/${uuid}`)} className='btn border-0 px-0'>
                        <AiOutlineArrowLeft   className='me-3' size={20} />
                        </div>  }
          <Heading className={"me-auto "} text={`School memorium`}/>
        </Stack>
       
          {
            ["Moderator","Alumni"].includes(user.role)&&<CustomButton className={""}  onClick={()=>setShowCreateMemoriumModal(true)} text={"New memorium"}/>
          }
            
       </Stack>
        </div>
       
       <Stack direction='horizontal' className='d-flex justify-content-between d-block d-md-none mt-4'>
        <Stack direction='horizontal'>
        {uuid && <div onClick={()=>navigate(`/dashboard/school/${uuid}`)} className='btn border-0 px-0'>
                        <AiOutlineArrowLeft   className='me-3' size={20} />
                        </div>  }
 
          <SubHeading className={"me-auto d-block d-md-none"} text={`School memorium`}/>

        </Stack>
       
          {
            ["Moderator","Alumni"].includes(user.role)&&<CustomButton className={"btn-sm"}  onClick={()=>setShowCreateMemoriumModal(true)} text={"New memorium"}/>
          }
            
       </Stack>
       <br/>
       <MemoriumList uuid={uuid} refresh={showCreateMemoriumModal}/>
      </div>
    )
}

export default SchoolMemorium
