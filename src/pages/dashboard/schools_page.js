import React, { useState } from 'react'
import Table from '../../general_widgets/datatable'
import DataTable from '../../general_widgets/datatable'
import GridView from '../../general_widgets/grid_view'
import { Stack } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import CreateSchoolModal from '../../widgets/schools/create_school_modal'
import SchoolList from '../../general_widgets/school_list'
import { getUser } from '../../utils/local_storage'

const SchoolsPage = () => {
    const [showCreateSchoolModal, setShowCreateSchoolModal] = useState(false);
    const user = getUser()

    return (
        <div>
            <CreateSchoolModal show={showCreateSchoolModal} onHide={()=>setShowCreateSchoolModal(false)}/>
           < Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
          <Heading  text={`Schools`}/>
          {
            user.role == "Admin"&& 
          <CustomButton onClick={()=>setShowCreateSchoolModal(true)} text={"Create school"}/>
          }
       </Stack>
       <br/>
           <SchoolList refresh={showCreateSchoolModal}/>
        </div>
    )
}

export default SchoolsPage
