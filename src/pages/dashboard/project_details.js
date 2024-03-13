import React, { useEffect, useState } from 'react'
import { Image, Stack, Tab, Tabs } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import { greenColor, lightPrimaryColor, mutedBlack, primaryColor } from '../../utils/colors'
import ProjectList from '../../general_widgets/project_list'
import { projectsData } from '../../utils/arrays'
import Paragraph from '../../general_widgets/paragraph'
import { FaBackward } from 'react-icons/fa'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import PledgeList from '../../general_widgets/pledge_list'
import ContributionList from '../../general_widgets/contribution_list'
import CreatePledgeModal from '../../widgets/pledge/create_pledge_modal'
import { getProject } from '../../controllers/project_controller'
import UpdateProjectModal from './update_models/update_project'
import { getUser } from '../../utils/local_storage'
import DonateModal from './create_models/donate_modal'
import SubHeading from '../../general_widgets/subheading'

const ProjectDetails = () => {
const [activeTab, setActiveTab] = useState(0);
const navigate = useNavigate()
const {uuid} = useParams()
const [showCreatePledgeModal, setShowCreatePledgeModal] = useState(false);
const [project, setProject] = useState(null);
const [showUpdateModal, setshowUpdateModal] = useState(false);
const [showDonateModal, setshowDonateModal] = useState(false);

useEffect(() => {
  if(showUpdateModal === false){
    getProject(uuid).then((data)=>setProject(data))
  }
}, [showUpdateModal]);
const user = getUser()
    return (
        <div>
          <DonateModal uuid={uuid} show={showDonateModal} onHide={()=>setshowDonateModal(false)} />
        <CreatePledgeModal uuid={uuid} show={showCreatePledgeModal} onHide={()=>setShowCreatePledgeModal(false)} />
        <UpdateProjectModal show={showUpdateModal} onHide={()=>setshowUpdateModal(false)} project={project}/>
           <Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
          <Stack direction='horizontal'>
            <div onClick={()=>navigate(-1)} className='btn border-0 px-0'>
            <AiOutlineArrowLeft  className='me-3' size={20} color={mutedBlack}/>
            </div>
            <Heading text={`Project details`}/>
          </Stack>
          {
            user.role == "Moderator"&&<CustomButton  onClick={()=>setshowUpdateModal(true)} text={"update"}/>
          }
         
       </Stack>
       <Stack  className='d-none d-md-block py-4' direction='horizontal'>
        
        <div   onClick={()=>setActiveTab(0)} id='details' className='btn me-3 border-0 px-4 py-2 px-2 rounded-pill small' 
        style={{ color:activeTab==0?"white":"black",borderWidth:3,backgroundColor:activeTab==0?"green":"white" }}>
        <Paragraph  text={`VIEW DETAILS`}/>
        </div> 
        <div    onClick={()=>setActiveTab(1)} className='btn rounded-0 border-0 px-4 py-2 me-3 rounded-pill small' 
        style={{ color:activeTab==1?"white":"black",borderWidth:3,backgroundColor:activeTab==1?"green":"white"  }}>
        <Paragraph text={`VIEW PLEDGES`}/>
        </div>
        <div    onClick={()=>setActiveTab(2)} className='btn rounded-0 border-0 px-4 py-2 rounded-pill small' 
        style={{ color:activeTab==2?"white":"black",borderWidth:3,backgroundColor:activeTab==2?"green":"white"  }}>
        <Paragraph text={`VIEW CONTRIBUTION`}/>
        </div>
       </Stack>
       <Stack  className='d-block d-md-none py-4' direction='horizontal'>
        
        <div   onClick={()=>setActiveTab(0)} id='details' className='btn w-100 me-3 border-0 px-4 py-2 mb-2 px-2 rounded-pill small' 
        style={{ color:activeTab==0?"white":"black",borderWidth:3,backgroundColor:activeTab==0?"green":"white" }}>
        <div style={{ fontSize:"3vw" }} >{`VIEW DETAILS`}</div>
        </div> 
        <div    onClick={()=>setActiveTab(1)} className='btn w-100  rounded-0 border-0 px-4 py-2 me-3 mb-2  rounded-pill small' 
        style={{ color:activeTab==1?"white":"black",borderWidth:3,backgroundColor:activeTab==1?"green":"white"  }}>
        <div style={{ fontSize:"3vw" }} >{`VIEW PLEDGES`}</div>
        </div>
        <div    onClick={()=>setActiveTab(2)} className='btn w-100  rounded-0 border-0 px-4 py-2 mb-2 rounded-pill small' 
        style={{ color:activeTab==2?"white":"black",borderWidth:3,backgroundColor:activeTab==2?"green":"white"  }}>
        <div style={{ fontSize:"3vw" }} >{`VIEW CONTRIBUTION`}</div>
        </div>
       </Stack>

       {activeTab==0 && project != null&&<div className='bg-white  p-4'>
        <Heading text={project.name}/>
        <Paragraph color={mutedBlack} text={"Duration: "+project.duration}/>
        <br/>
        <Image src={project.image} style={{ height:300,width:1000,objectFit:"cover" }} className='mb-4' fluid/>
        <Paragraph text={project.description}/>
         <Stack direction='horizontal' className='mt-5'>
          {user.role == "Alumni" && <Stack direction='horizontal'>
          <CustomButton onClick={()=>setshowDonateModal(true)}  className={"me-3"} text={"Donate"}/>
            <CustomButton onClick={()=>setShowCreatePledgeModal(true)} color={greenColor} text={"Pledge now"}/>

            </Stack>}
            
         </Stack>
         
       </div>}
       {activeTab==1&&<div className='bg-white p-4'>
       <PledgeList uuid={uuid}/>
         
       </div>}

       {activeTab==2&&<div className='bg-white p-4'>
       <ContributionList uuid={uuid}/>
         
       </div>}

        </div>
    )
}

export default ProjectDetails
