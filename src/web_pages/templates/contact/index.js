import React from 'react';
import PRODUCT_BAR from '../../organism/Products'
import './style.scss'

import FORM from '../../pages/contact/Form'
import CONTACT from '../../pages/contact/Contact'

const Contact = (props) => {

    const IS_EDITING = props.isEditing
    
    return (
            
            <div className='contact'>
                { !IS_EDITING && <PRODUCT_BAR /> }
                <div className='contact-content'>
                    <FORM />
                    <CONTACT />
                </div>
            </div>
    ) 
}

export default Contact;