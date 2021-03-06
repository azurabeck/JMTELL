import React from 'react';
import PRODUCT_BAR from '../../organism/Products'
import PRODUCT_DETAILS from '../../pages/products_details'

import './style.scss'
import WHATSAPP from '../../atoms/WHATSAPP';

const Products = (props) => {
    
    const IS_EDITING = props.isEditing
    return (
            
            <div className='products-details'>
                {!IS_EDITING && <PRODUCT_BAR />}
                <div className='products-content'>
                    <div className='products-area'>
                        <PRODUCT_DETAILS />               
                    </div>
                </div>
                <WHATSAPP />
            </div>
    ) 
}

export default Products;