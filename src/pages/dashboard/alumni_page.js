import React, { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import CreateUserModal from '../../widgets/create_users/create_user_modal'
import UsersList from '../../general_widgets/users_list'
import CreateAlumniModal from '../../widgets/alumni/create_alumni_modal'
import AlumniList from '../../general_widgets/alumni_list'
import { getUser } from '../../utils/local_storage'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const AlumniPage = () => {
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const {uuid} = useParams()
    const user = getUser()
    const navigate = useNavigate()
    return (
        <div>
            <CreateAlumniModal show={showCreateUserModal} onHide={()=>setShowCreateUserModal(false)}/>

<Stack direction='horizontal' className=' mt-4 d-flex justify-content-between'>
<Stack direction='horizontal'>
{uuid && <div onClick={()=>navigate(`/dashboard/school/${uuid}`)} className='btn border-0 me-auto'>
                        <AiOutlineArrowLeft   className='me-3' size={20} />
                        </div>  }
                        <Heading className={"text-start me-auto"} text={`Alumni`}/>
</Stack>

   
          {
          user.role == "Moderator" &&
          <CustomButton className={"ms-auto"} onClick={()=>setShowCreateUserModal(true)} text={"Add new alumni"}/>
          }
       </Stack>
       <br/>
       <AlumniList uuid={uuid} refresh={showCreateUserModal}/>
        </div>
    )
}

export default AlumniPage
