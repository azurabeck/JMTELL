import React from 'react'
import ButtonOrangeSquare from '../../../atoms/BUTTON_ORANGE_SQUARE';
import './style.scss';


const Header = () => {

    return (
        <div className='contact'>
            <div className='bg-img'></div>
            <div className='title'>Faça seu orçamento</div>
            <div className='line'></div>
            <div className='form-area'>

                <form>
                    <div className='form-horizontal-row'>
                        <input placeholder='Nome Completo' name='name' id='name' className='home-form-name' />
                        <input placeholder='Telefone' name='phone' id='phone' className='home-form-phone' />
                    </div>
                    <input placeholder='Email' name='email' id='email' className='home-form-email' />
                    <div className='text-btn-area'>
                        <textarea placeholder='Deixe sua mensagem aqui.' maxlength='650' name='msg' id='msg' className='home-form-msg' />
                        <ButtonOrangeSquare 
                                WIDTH='250px'
                                HEIGHT='95px'
                                TEXT='Faça seu orçamento'
                                FONT_SIZE='22px'
                                BTN_TYPE={1}
                                TO=''/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Header