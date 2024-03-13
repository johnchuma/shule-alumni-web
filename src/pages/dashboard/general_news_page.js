import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import GridView from '../../general_widgets/grid_view'
import NewsView from '../../general_widgets/news_view'
import CreateGeneralNewsModal from '../../widgets/general_news/create_general_news_modal'
import GeneralNewsList from '../../general_widgets/general_news_list'

const GeneralNewsPage = () => {
  const [showCreateNewsModal, setShowCreateNewsModal] = useState(false);
  
    return (
      <div>
        <CreateGeneralNewsModal show={showCreateNewsModal} onHide={()=>setShowCreateNewsModal(false)} />

        <Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
          <Heading text={`General news`}/>
          <CustomButton onClick={()=>setShowCreateNewsModal(true)} text={"New news"}/>
       </Stack>
       <br/>
       <GeneralNewsList refresh={showCreateNewsModal}  />
      </div>
    )
}

export default GeneralNewsPage
