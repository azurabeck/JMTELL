import React , { useState } from 'react'
import BUTTON_ORANGE from '../../../atoms/BUTTON_ORANGE'
import { SUCCESS_MSG } from '../../../atoms/SVG/_index'

import './style.scss'

const Form = () => {

    const [ CLIENT_REQUEST_SUCCESS , sendData ] = useState(null) 
    const [ subject , getSubject ] = useState(null)
    const [ formData, getForm ] = useState({
        subject_type: '',
        name: '',
        phone: '',
        email: '',
        msg: '',
        return_type: null,
    })

    const handleSubmit = (formData) => {
        if(formData) { sendData('SUCCESS') }
        else { sendData('ERROR') }
    }

    return (
        <div className='form'>

            <div className='steps-group'>
                <div className='step active' />
                <div className={ subject ? 'step active' : 'step' } />
                <div className={ CLIENT_REQUEST_SUCCESS ? 'step active' : 'step' } />
            </div>

            { !subject && !CLIENT_REQUEST_SUCCESS &&
            
                <div className='buttons'>
                    <div className='buttons-title'>Para melhor atende-lo(a), selecione com o assunto para qual você precisa de ajuda, e deixe sua mensagem em seguida.</div>
                    <div className='button-group'>
                        <div className='button-blue' onClick={() => getSubject('FINANCEIRO')}>FINANCEIRO</div>
                        <div className='button-blue' onClick={() => getSubject('SUPORTE')}>SUPORTE</div>
                        <div className='button-blue' onClick={() => getSubject('ASSISTENCIA TECNICA')}>ASSISTENCIA TECNICA</div>
                        <div className='button-blue' onClick={() => getSubject('ORÇAMENTO')}>ORÇAMENTO</div>
                        <div className='button-blue' onClick={() => getSubject('COMPRAS')}>COMPRAS</div>
                        <div className='button-blue' onClick={() => getSubject('COMERCIAL')}>COMERCIAL</div>
                    </div>
                </div>                
            
            }

            { subject && !CLIENT_REQUEST_SUCCESS &&
            
                <div className='contact-form'>
                    <div className='contact-form-title'>
                        Preencha seus dados, e faça uma pequena descrição do que você deseja e logo entraremos em contato com você.
                        <span className='subject-display'> {subject} </span>
                    </div>

                    <form className='contact-form-group'>
                        <div className='group-1'>
                            <input placeholder='Nome e Sobrenome' required onChange={(e) => getForm({...formData, name: e.target.value , subject_type: subject})} ></input>
                            <input placeholder='Telefone' required onChange={(e) => getForm({...formData, phone: e.target.value})}></input>
                        </div>
                        <div className='group-2'>
                            <input placeholder='Email' required onChange={(e) => getForm({...formData, email: e.target.value})}></input> 
                            <textarea placeholder='Deixe sua mensagem' required onChange={(e) => getForm({...formData, msg: e.target.value})}></textarea> 
                        </div>
                        <div className='group-3'>
                            <div className='radio-group'>
                            Responder via: 
                            <div className='radio-btn'>
                                <input type="radio" id="phone" name="fav-resp" value="PHONE" onChange={(e) => getForm({...formData, return_type: 1})}/>
                                <label for="phone">Ligação</label>
                            </div>
                            <div className='radio-btn'>
                                <input type="radio" id="whatsapp" name="fav-resp" value="WHATSAPP" onChange={(e) => getForm({...formData, return_type: 2})}/>
                                <label for="whatsapp">Whatsapp</label>
                            </div>
                            <div className='radio-btn'>
                                <input type="radio" id="email" name="fav-resp" value="EMAIL" onChange={(e) => getForm({...formData, return_type: 3})}/>
                                <label for="email">Email</label>
                            </div>
                            </div>
                            <BUTTON_ORANGE  
                                TEXT='ENVIAR MENSAGEM'
                                WIDTH='233px'
                                HEIGHT='36px'
                                FONT_SIZE='14px'
                                BTN_TYPE={1}
                                TO={() => handleSubmit(formData)}
                            />

                        </div>
                    </form>

                </div>
            
            }


            {
                CLIENT_REQUEST_SUCCESS && <div className='feedback'>
                    <div className='feedback-title'> MENSAGEM ENVIADA </div>
                    <div className='feedback-desc'> AGORA É SÓ ESPERAR QUE NOSSA EQUIPE ENTRARÁ EM CONTATO COM VOCÊ NA PLATAFORMA ESCOLHIDA </div>
                    <SUCCESS_MSG />
                </div>
            }

            


        </div>
    )
}

export default Form