import React from 'react';
import './style.scss';
import FastMenu  from './FastMenu';
import AssociatedMenu  from './AssociatedMenu';
import CopyRight from './CopyRight';

import LOGO_WHITE from '../../atoms/logo_white.svg'

const Footer = () => {
    return (
        <div className='footer'>
            <img alt='' src={ LOGO_WHITE } />
            <div className='slogan'>Distribuindo soluções em tecnologia</div>

            {/* <FastMenu /> */}
            <AssociatedMenu />
            <CopyRight />

        </div>
    )
}


export default Footer;