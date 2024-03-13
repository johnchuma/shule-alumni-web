import React from 'react'
import { blackColor } from '../utils/colors'

const Small = ({text,color,fontWeight,fontSize,maxLines,className,style, onClick}) => {
    return (
        <div>
        <div onClick={onclick} className={className + " d-none d-md-block"} style={{ color: color??blackColor,fontWeight:fontWeight??400,fontSize:fontSize??"1vw",maxLines:maxLines??3,...style }} dangerouslySetInnerHTML={{ __html:text }}></div>
        <div onClick={onclick} className={className + " d-block d-md-none"} style={{ color: color??blackColor,fontWeight:fontWeight??400,fontSize:fontSize??"2.3vw",maxLines:maxLines??3,...style }} dangerouslySetInnerHTML={{ __html:text }}></div>

        </div>
    )
}

export default Small