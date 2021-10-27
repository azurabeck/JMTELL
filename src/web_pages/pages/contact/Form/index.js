import React , { useState } from 'react'
import { SUCCESS_MSG } from '../../../atoms/SVG/_index'
import { createClient } from '../../../../web_config/actions/clientActions'
import { connect } from 'react-redux'

import './style.scss'

const Form = (props) => {

    const [ subject , getSubject ] = useState(null)
    const [ formData, getForm ] = useState({
        name: '',
        email: '',
        telephone: '',
        msg: '',
        returnType: null,
        client_subject: subject,
        msg: ''
    })


    const handleSubmit = (e) => {       
        e.preventDefault()        
        props.createClient(formData)
    }

    const MSG_SENT = props.MSG_SENT

    return (
        <div className='form'>

            <div className='steps-group'>
                <div className='step active' />
                <div className={ subject ? 'step active' : 'step' } />
                <div className={ MSG_SENT ? 'step active' : 'step' } />
            </div>

            { !subject && !MSG_SENT &&
            
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

            { subject && !MSG_SENT &&
            
                <div className='contact-form'>
                    <div className='contact-form-title'>
                        Preencha seus dados, e faça uma pequena descrição do que você deseja e logo entraremos em contato com você.
                        <span className='subject-display'> {subject} </span>
                    </div>

                    <form className='contact-form-group' onSubmit={(e) => handleSubmit(e)}>
                        <div className='group-1'>
                            <input placeholder='Nome e Sobrenome' required onChange={(e) => getForm({...formData, name: e.target.value , client_subject: subject})} ></input>
                            <input placeholder='Telefone' required onChange={(e) => getForm({...formData, telephone: e.target.value})}></input>
                        </div>
                        <div className='group-2'>
                            <input placeholder='Email' required onChange={(e) => getForm({...formData, email: e.target.value})}></input> 
                            <textarea placeholder='Deixe sua mensagem' required onChange={(e) => getForm({...formData, msg: e.target.value})}></textarea> 
                        </div>
                        <div className='group-3'>
                            <div className='radio-group'>
                            Responder via: 
                            <div className='radio-btn'>
                                <input type="radio" id="phone" name="fav-resp" value="PHONE" onChange={(e) => getForm({...formData, returnType: 1})}/>
                                <label for="phone">Ligação</label>
                            </div>
                            <div className='radio-btn'>
                                <input type="radio" id="whatsapp" name="fav-resp" value="WHATSAPP" onChange={(e) => getForm({...formData, returnType: 2})}/>
                                <label for="whatsapp">Whatsapp</label>
                            </div>
                            <div className='radio-btn'>
                                <input type="radio" id="email" name="fav-resp" value="EMAIL" onChange={(e) => getForm({...formData, returnType: 3})}/>
                                <label for="email">Email</label>
                            </div>
                            </div>
                            <button className='btn-orange-square' type='submit'>Enviar</button>
                        </div>
                    </form>

                </div>
            
            }


            {
                MSG_SENT && <div className='feedback'>
                    <div className='feedback-title'> MENSAGEM ENVIADA </div>
                    <div className='feedback-desc'> AGORA É SÓ ESPERAR QUE NOSSA EQUIPE ENTRARÁ EM CONTATO COM VOCÊ NA PLATAFORMA ESCOLHIDA </div>
                    <SUCCESS_MSG />
                </div>
            }

            


        </div>
    )
}

    const mapStateToProps = (state) => {
        return {
            MSG_SENT: state.client.MSG_SENT
        }
    }


  const mapDispatchToProps = (dispatch) => {
    return {
        createClient: (client) => dispatch(createClient(client))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Form)