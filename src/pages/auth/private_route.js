import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { getUser } from '../../utils/local_storage'
import { primaryColor } from '../../utils/colors'

const PrivateRoute = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
           const user = getUser()  
           console.log("user value",user)
           setUser(user)
           setIsLoading(false)
      }, []);
    return isLoading?<div className='d-flex justify-content-center align-items-center'
     style={{height:"100vh",width:"100%"}}>
        <Spinner size='80' color={primaryColor}/></div>
        :user !== null? children: <Navigate to="/login" replace />
}

export default PrivateRoute
