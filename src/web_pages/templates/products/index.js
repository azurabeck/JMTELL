import React from 'react';
import PRODUCT_BAR from '../../organism/Products'
import PRODUCT_SIDEBAR from '../../pages/products/Sidebar'
import PRODUCT_LIST from '../../pages/products/ProductsList'
import PRODUCT_SPOTLIGHT from '../../pages/products/Spotlight'

import './style.scss'

const Products = (props) => {    
    const IS_EDITING = props.isEditing
    return (
            
            <div className='products'>
                {!IS_EDITING && <PRODUCT_BAR />}
                <div className='products-content'>
                    <PRODUCT_SIDEBAR />
                    <div className='products-area'>
                        <PRODUCT_SPOTLIGHT/>              
                        <PRODUCT_LIST/>                        
                    </div>
                </div>
            </div>
    ) 
}

export default Products;