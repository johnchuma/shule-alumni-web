import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { primaryColor } from '../utils/colors'

const CustomButton = ({text,color,textColor,fontSize,ariaControls,ariaExpanded,className,onClick,loading=false,href}) => {
    return (
        <div>
  <a target='_blank' className='text-decoration-none' href={href}>
<Button aria-controls={ariaControls} aria-expanded={ariaExpanded} type="submit" onClick={onClick} className={"border-0 d-none d-md-block "+className}
         style={{backgroundColor:color??primaryColor,textColor:textColor??"white",fontSize:fontSize}} >
             {loading&&<Spinner size='sm'/>} {text}</Button>
        </a>
        <a target='_blank' className='text-decoration-none' href={href}>
<Button aria-controls={ariaControls} aria-expanded={ariaExpanded} type="submit" onClick={onClick} className={"border-0 d-block d-md-none btn-sm "+className}
         style={{backgroundColor:color??primaryColor,textColor:textColor??"white",fontSize:fontSize}} >
             {loading&&<Spinner size='sm'/>} {text}</Button>
        </a>
        </div>
      
        
        
    )
}

export default CustomButton
