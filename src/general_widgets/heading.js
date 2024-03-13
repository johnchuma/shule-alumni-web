import React from 'react'
import { blackColor } from '../utils/colors'

const Heading = ({text,color,fontWeight,fontSize,style,className}) => {
    return (
        <div>
        <div className={className+" d-none d-md-block"} style={{lineHeight:1.1, color: color??blackColor,fontWeight:fontWeight??600,fontSize:fontSize??"1.9vw",...style}} dangerouslySetInnerHTML={{ __html:text }} ></div>
        <div className={className+" d-block d-md-none"} style={{lineHeight:1.1, color: color??blackColor,fontWeight:fontWeight??600,fontSize:"5.5vw",...style}} dangerouslySetInnerHTML={{ __html:text }} ></div>

        </div>
    )
}

export default Heading
