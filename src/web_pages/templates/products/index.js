import React from 'react';
import PRODUCT_BAR from '../../organism/Products'
import './style.scss'

const Products = () => {
    return (
            
            <div className='products'>
                <PRODUCT_BAR />
                <div className='products-content'>
                    Products
                </div>
            </div>
    ) 
}

export default Products;