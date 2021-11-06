import React from 'react';
import PRODUCT_BAR from '../../organism/Products'
import PRODUCT_DETAILS from '../../pages/products_details'

import './style.scss'

const Products = () => {
    return (
            
            <div className='products-details'>
                <PRODUCT_BAR />
                <div className='products-content'>
                    <div className='products-area'>
                        <PRODUCT_DETAILS />               
                    </div>
                </div>
            </div>
    ) 
}

export default Products;