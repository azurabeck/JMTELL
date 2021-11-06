import React from 'react'
import './style.scss';

import EFFECT from '../../../atoms/SVG/effect.svg'


const Header = () => {

    return (
        <div className='about' style={{background: `url(${EFFECT})`}}>
            <div className='bg-img'></div>
            <div className='title'>QUEM SOMOS?</div>
            <div className='desc'>Somos uma empresa distribuidora dos mais avançados sistemas de telefonia, 
            segurança, interfonia, redes, No breaks, automação de portões e outras inovações tecnológicas.</div>
            <div className='line'></div>
        </div>
    )
}

export default Header