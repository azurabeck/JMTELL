import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import COMBO_BOX from '../../molecules/Combo_box'
import SEARCH from '../../molecules/Search'

import './style.scss'

const Product_bar = () => {
    return (
        <div className='product-bar'> 
                <div className='title'> Product <FontAwesomeIcon icon={faArrowRight} /> </div>
                <div className='button-area'>
                    <div className='bar-button'>
                        <COMBO_BOX TEXT='CATEGORIAS' />
                    </div> 
                    <div className='bar-button'><div className='button'>DESTAQUES</div></div>   
                    <div className='bar-button'><div className='button'>MAIS RECENTE</div></div>       
                </div>
                <SEARCH />
        
         </div>
    )
}

export default Product_bar