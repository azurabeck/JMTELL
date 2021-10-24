import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SEARCH from '../../molecules/Search'
import{ WHATSAPP_CIRCLE , PHONE , FACEBOOK , INSTAGRAM } from '../../atoms/SVG/_index'

import './style.scss'

const Blog_bar = () => {
    return (
        <div className='blog-bar'> 
                <div className='title'> Blog <FontAwesomeIcon icon={faArrowRight} /> </div>
                <div className='button-area'>
                    <div className='network'> <WHATSAPP_CIRCLE /> </div>
                    <div className='network'> <PHONE /> </div>
                    <div className='network'> <FACEBOOK /> </div>
                    <div className='network' style={{marginRight: '40px'}}> <INSTAGRAM /> </div>
                    <SEARCH />  
                </div>        
         </div>
    )
}

export default Blog_bar