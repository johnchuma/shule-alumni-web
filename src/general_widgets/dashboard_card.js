import React from 'react'
import { Card } from 'react-bootstrap'
import Paragraph from './paragraph'
import Heading from './heading'
import { primaryColor } from '../utils/colors'

const DashboardCard = ({icon,title,subtitle,onClick,className}) => {
    return (
        <Card style={{ }} onClick={onClick} className={`bg-white border-0 shadow-sm mb-2 ${className}`}> 
            <Card.Body>
                {icon}
                <Heading className={"my-3"} text={title}/>
                <Paragraph text={subtitle}/>
            </Card.Body>
        </Card>
    )
}

export default DashboardCard
