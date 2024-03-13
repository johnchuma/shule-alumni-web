import React from 'react'
import { blackColor } from '../utils/colors'

const SubHeading = ({text,color,fontWeight,fontSize,style,className,onClick}) => {
    return (
        <div>
        <div onClick={onClick} className={className+ " d-none d-md-block"} style={{ color: color??blackColor,fontWeight:fontWeight??600,fontSize:fontSize??"1.4vw",...style}}>{text}</div>
        <div onClick={onClick} className={className+ " d-block d-md-none"} style={{ color: color??blackColor,fontWeight:fontWeight??600,fontSize:fontSize??"5vw",...style}}>{text}</div>
        </div>
    )
}

export default SubHeading
