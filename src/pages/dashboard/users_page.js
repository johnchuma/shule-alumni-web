import React, { useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import CreateUserModal from '../../widgets/create_users/create_user_modal'
import UsersList from '../../general_widgets/users_list'

const UsersPage = () => {
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);

    return (
        <div>
            <CreateUserModal show={showCreateUserModal} onHide={()=>setShowCreateUserModal(false)}/>

<Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
          <Heading text={`Users`}/>
          <CustomButton onClick={()=>setShowCreateUserModal(true)} text={"Add new user"}/>
       </Stack>
       <br/>
       <UsersList refresh={showCreateUserModal}/>
        </div>
        
       

    )
}

export default UsersPage
