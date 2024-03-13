import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import GridView from '../../general_widgets/grid_view'
import NewsView from '../../general_widgets/news_view'
import CreateSchoolNewsModal from '../../widgets/school_news/create_school_news_model'
import { getUser } from '../../utils/local_storage'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
const NewsPage = () => {
    const [showCreateNewsModal, setShowCreateNewsModal] = useState(false);
    const user = getUser()
    const {uuid} =  useParams()
    const navigate = useNavigate()
    return (
       <div>
        <CreateSchoolNewsModal show={showCreateNewsModal} onHide={()=>setShowCreateNewsModal(false)} />
        <Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
        <Stack direction='horizontal'>
        {uuid && <div onClick={()=>navigate(`/dashboard/school/${uuid}`)} className='btn border-0 px-0'>
                        <AiOutlineArrowLeft   className='me-3' size={20} />
                        </div>  }
          <Heading className={"me-auto"} text={`School news`}/>
        </Stack>

    
          {
            user.role=="Moderator"&&<CustomButton onClick={()=>setShowCreateNewsModal(true)} text={"New news"}/>
          }
          
       </Stack>
       <br/>
       <NewsView uuid={uuid} refresh={showCreateNewsModal}/>
      </div>
    )
}

export default NewsPage
