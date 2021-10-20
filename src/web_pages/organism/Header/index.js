import React from 'react'
import './style.scss';
import LOGO_WHITE  from '../../atoms/logo_white.svg'
import ButtonOrange from '../../atoms/BUTTON_ORANGE' 


const Header = () => {

    return (
        <div className='header'>
            <div className='bg-img'></div>
            <img src={LOGO_WHITE} alt=''/>
            <div className='title'>GERANDO SOLUÇÕES PARA O DIA A DIA DA SUA EMPRESA</div>
            <ButtonOrange 
                TEXT='FAÇA O SEU ORÇAMENTO'
                FONT_SIZE='20px'
                WIDTH='430px'
                HEIGHT='60px'
                BTN_TYPE={2}
                TO='#contato' />
        </div>
    )
}

export default Header