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
import MessageList from './list_pages/message_list'
import ComposeMessage from './create_models/compose_message'

const InquiryPage = () => {

    const {uuid} = useParams()
    const user = getUser()
    const navigate = useNavigate()
    const [showComposeMessageModal, setShowComposeMessageModal] = useState(false);
    return (
        <div>
      

<Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
    <Heading className={"me-auto"} text={`Inquiries`}/>
 
       </Stack>
       <br/>
       <MessageList />
        </div>
    )
}

export default InquiryPage
