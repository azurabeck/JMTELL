import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss';


const ButtonOrange = ({ TEXT , WIDTH , HEIGHT , FONT_SIZE , BTN_TYPE , TO}) => {

    /*
        BTN_TYPE ====     
            1 = DIV
            2 = A
            3 = LINK
    */


    const CUSTOM_STYLE = {
        width: WIDTH,
        height: HEIGHT,
        fontSize: FONT_SIZE
    }

    return (
        <>
            { BTN_TYPE === 1 && <div onClic={TO} className='btn-orange-square' style={CUSTOM_STYLE}> {TEXT} </div> }
            { BTN_TYPE === 2 && <a href={TO} className='btn-orange-square' style={CUSTOM_STYLE}> {TEXT} </a> }
            { BTN_TYPE === 3 && <Link to={TO} className='btn-orange-square' style={CUSTOM_STYLE}> {TEXT} </Link> }
        </>
    )
}

export default ButtonOrange