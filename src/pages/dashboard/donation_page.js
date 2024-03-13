import React, { useState } from 'react'
import DataTable from '../../general_widgets/datatable'
import { Stack } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import ProjectList from '../../general_widgets/project_list'
import CreateProjectModal from '../../widgets/project/create_project_modal'
import { getUser } from '../../utils/local_storage'
import DonationList from './list_pages/donations_list'


const DonationPage = () => {
   
    return (
       <div>
     
            <Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
          <Heading text={`Shule alumni donations`}/>
        
          
       </Stack>
       <br/>
       <DonationList/>
       {/* <ProjectList refresh={showCreateProjectModal} /> */}
        </div>
    )
}

export default DonationPage
