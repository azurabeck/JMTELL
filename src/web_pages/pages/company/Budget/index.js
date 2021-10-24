import React from "react";
import BUTTON_ORANGE from '../../../atoms/BUTTON_ORANGE'
import './style.scss'

const Budget = () => {
    return ( 
        <div className='budget'>
            <div className='desc'>
                Então não se contente com menos, faça o seu cadastro conosco na página de cadastro 
                para fazer parte do grupo de clientes parceiros da JMTELL, e conte com as melhores 
                formas de pagamento e a garantia da qualidade dos nossos produtos.
            </div>

            <BUTTON_ORANGE
                TEXT='FAÇA O ORÇAMENTO AGORA MESMO!'
                WIDTH='600px'
                HEIGHT='70px'
                FONT_SIZE='28px'
                BTN_TYPE={2}
                TO='/contato' />
        </div> 
    )
}

export default Budget;