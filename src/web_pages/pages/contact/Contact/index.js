import React from 'react'
import './style.scss'
import { WHATSAPP , PHONE } from '../../../atoms/SVG/_index'


const Contact = () => {
    return (
        <div className='contact-area'>

            <div className='title'>
                ENTRE EM CONTATO A QUALQUER MOMENTO PELOS NOSSO TELEFONE, OU WHATSAPP
            </div>

            <a href='https://wa.me/5521982065889' className='whatsapp-group'>
                <WHATSAPP /> Clique aqui para enviar mensagem no whatsapp
            </a>

            <div className='phone-group'>
                <div className='phone-title'>É possível iniciar a ligação clicando no número desejado abaixo</div> 
                <div className='phone-numbers'>
                    <PHONE />  
                    <div className='phone-number-group'>
                        <a href='tel:+5521-3351-1211'><span className='bullet'/>  (21) 3351-1211</a>
                        <a href='tel:+5521-3013-4444'><span className='bullet'/>  (21) 3013-4444</a>
                        <a href='tel:+5521-3013-4444'><span className='bullet'/>  (21) 3013-4444</a>
                    </div>
                    <div className='division'/>
                    <div className='phone-number-group'>
                        <a href='tel:+5521-3351-1406'><span className='bullet'/>  (21) 3351-1406</a>
                        <a href='tel:+5521-3351-4784'><span className='bullet'/>  (21) 3351-4784</a>
                        <a href='tel:+5521-3351-6439'><span className='bullet'/>  (21) 3351-6439</a>
                    </div>
                    <div className='division'/>
                    <div className='phone-number-group'>
                        <a href='tel:+5521-3013-4447'><span className='bullet'/>  (21) 3013-4447 </a>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Contact