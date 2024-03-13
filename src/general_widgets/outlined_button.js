import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { primaryColor } from '../utils/colors'

const OutlinedButton = ({text,color,textColor, className,onClick,loading=false}) => {
    return (
        <Button  onClick={onClick} className={className}
         style={{borderColor:color??primaryColor,backgroundColor:"transparent",borderWidth:2,color:textColor??primaryColor}} >
             {text}</Button>
        
    )
}

export default OutlinedButton
