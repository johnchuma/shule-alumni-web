import React, { useEffect, useState } from 'react'
import Heading from '../../general_widgets/heading'
import { Col, Row, Stack } from 'react-bootstrap'
import CustomButton from '../../general_widgets/button'
import DataTable from '../../general_widgets/datatable'
import DashboardCard from '../../general_widgets/dashboard_card'
import { BsPeople } from 'react-icons/bs'
import { mutedBlack, primaryColor } from '../../utils/colors'
import { FaBookOpen, FaFileArchive, FaMoneyBill, FaUser } from 'react-icons/fa'
import UsersList from '../../general_widgets/users_list'
import { totalResources, totalSchoolUsers, totalUsers } from '../../controllers/user_controller'
import { contributionAmount } from '../../controllers/contribution_controller'
import { totalSchoolPosts, totalSchools } from '../../controllers/school_controller'
import AlumniList from '../../general_widgets/alumni_list'
import { totalSchoolProject } from '../../controllers/project_controller'
import { getTotalSchoolDonations } from '../../controllers/transaction_controller'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../utils/local_storage'
import FormatMoney from '../../utils/format_money'

const SchoolDashboard = () => {
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [totalProjects, settotalProjects] = useState(0);
    const [totalAlumni, settotalAlumni] = useState(0);
    const [totalDonation, settotalDonation] = useState(0);
    const [totalResource, settotalResource] = useState(0);
    useEffect(() => {
        totalSchoolUsers().then((data)=>settotalAlumni(data))
        totalSchoolProject().then((data)=>settotalProjects(data))
        totalSchoolPosts().then((data)=>settotalResource(data))
        getTotalSchoolDonations().then((data)=>settotalDonation(data))

    }, []);
    const user = getUser()
const navigate = useNavigate();
    return (
       <div>
           <Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
          <Heading text={`Dashboard`}/>
       </Stack>
       <Row className='mb-4 mt-2'>
       
        <Col md={3}>
            <DashboardCard onClick={()=>navigate("/dashboard/alumni")} className={"btn border-0 text-start p-0"} icon={<FaUser size={20} style={{ color:primaryColor }}/>} title={totalAlumni} subtitle={"Total alumni"}/>
        </Col>
        <Col md={3}>
            <DashboardCard onClick={()=>navigate("/dashboard/projects")} className={"btn border-0 text-start p-0"} icon={<FaBookOpen size={20} style={{ color:primaryColor }}/>} title={totalProjects} subtitle={"School projects"}/>
        </Col>
        <Col md={3}>
            <DashboardCard onClick={()=>navigate("/dashboard/projects")} className={"btn border-0 text-start p-0"} icon={<FaMoneyBill size={20} style={{ color:primaryColor }}/>} title={`${FormatMoney(totalDonation)}TZS`} subtitle={"Total donations"}/>
        </Col>
        <Col md={3}>
            <DashboardCard onClick={()=>navigate("/dashboard/school-job")} className={"btn border-0 text-start p-0"} icon={<FaFileArchive size={20} style={{ color:primaryColor }}/>} title={totalResource} subtitle={"Total posts"}/>
        </Col>
       </Row>

       <AlumniList refresh={showCreateUserModal}/>
       </div>
    )
}

export default SchoolDashboard
