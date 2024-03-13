import React from 'react'
import { blackColor } from '../utils/colors'

const Paragraph = ({text,color,fontWeight,fontSize,maxLines,className, onClick,style}) => {
    return (
        <div>
        <div onClick={onClick} className={className+" d-none d-md-block"} style={{ color: color??blackColor,fontWeight:fontWeight??400,fontSize:fontSize??"1.2vw",maxLines:maxLines??3,...style }} dangerouslySetInnerHTML={{ __html:text }}></div>
        <div onClick={onClick} className={className+ " d-block d-md-none"} style={{ color: color??blackColor,fontWeight:fontWeight??400,fontSize:"4vw",maxLines:maxLines??3,...style }} dangerouslySetInnerHTML={{ __html:text }}></div>

        </div>
    )
}

export default Paragraph