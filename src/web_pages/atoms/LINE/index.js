import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss';


const Line = ({ WIDTH , HEIGHT }) => {

    const CUSTOM_STYLE = {
        width: WIDTH,
        height: HEIGHT
    }

    return (
        
        <div className='line' style={CUSTOM_STYLE} />
        
    )
}

export default Line