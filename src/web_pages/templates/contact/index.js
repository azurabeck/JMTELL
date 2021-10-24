import React from 'react';
import PRODUCT_BAR from '../../organism/Products'
import './style.scss'

import FORM from '../../pages/contact/Form'
import CONTACT from '../../pages/contact/Contact'

const Contact = () => {
    return (
            
            <div className='contact'>
                <PRODUCT_BAR />
                <div className='contact-content'>
                    <FORM />
                    <CONTACT />
                </div>
            </div>
    ) 
}

export default Contact;