import React , { useState } from 'react'
import { SUCCESS_MSG } from '../../../atoms/SVG/_index'
import { createClient } from '../../../../web_config/actions/clientActions'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'


import './style.scss'

const Form = (props) => {

    // FORMS
    const [ subject , getSubject ] = useState(null)
    const [ formData, getForm ] = useState({
        name: '',
        email: '',
        telephone: '',
        msg: '',
        returnType: null,
        client_subject: subject,
    })

    const handleSubmit = (e) => {       
        e.preventDefault()        
        props.createClient(formData)
    }

    const MSG_SENT = props.MSG_SENT


    // TEXT EDITOR
    const CONTACT_PT = props.contact && props.contact[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    return (
        <div className='form'>
 
	
            <div className='steps-group'>
                <div className='step active' />
                <div className={ subject && !MSG_SENT ? 'step active' : 'step' } />
                <div className={ MSG_SENT ? 'step active' : 'step' } />
            </div>

            { !subject && !MSG_SENT &&
            
                <div className='buttons'>
                    <div className='buttons-title'>
                    { CONTACT_PT ? CONTACT_PT[0] : 'Para melhor atende-lo(a), selecione com o assunto para qual você precisa de ajuda, e deixe sua mensagem em seguida.' }
                    <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[0]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 0: e.target.value})}/>
                    
                    </div>
                    <div className='button-group'>
                        
                        <>
                        <div className='button-blue' onClick={() => getSubject('FINANCEIRO')}>
                            { CONTACT_PT ? CONTACT_PT[4] : 'FINANCEIRO' }                       
                        </div>
                        <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[4]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 4: e.target.value})}/>     
                        </>

                        <>
                        <div className='button-blue' onClick={() => getSubject('SUPORTE')}>
                            { CONTACT_PT ? CONTACT_PT[5] : 'SUPORTE' } 
                        </div>
                        <EditorContent  HAS_VALUE={CONTACT_PT && CONTACT_PT[5]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 5: e.target.value})}/>
                        </>
                        
                        <>
                        <div className='button-blue' onClick={() => getSubject('ASSISTENCIA TECNICA')}>
                            { CONTACT_PT ? CONTACT_PT[6] : 'ASSISTENCIA TECNICA' } 
                        </div>
                        <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[6]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 6: e.target.value})}/>
                        </>
                        
                        <>
                        <div className='button-blue' onClick={() => getSubject('ORÇAMENTO')}>
                            { CONTACT_PT ? CONTACT_PT[7] : 'ORÇAMENTO' } 
                        </div>
                        <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[7]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 7: e.target.value})}/>
                        </>
                        
                        <>
                        <div className='button-blue' onClick={() => getSubject('COMPRAS')}>
                            { CONTACT_PT ? CONTACT_PT[8] : 'COMPRAS' } 
                        </div>
                        <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[8]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 8: e.target.value})}/>
                        </>

                        <>
                        <div className='button-blue' onClick={() => getSubject('COMERCIAL')}>
                            { CONTACT_PT ? CONTACT_PT[9] : 'COMERCIAL' } 
                        </div>
                        <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[9]}com IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 9: e.target.value})}/>
                        </>
                  
                    </div>
                </div>                
            
            }

            { subject && !MSG_SENT &&
            
                <div className='contact-form'>

                    <div className='contact-form-title'>                        
                          { CONTACT_PT ? CONTACT_PT[10] : 'Preencha seus dados, e faça uma pequena descrição do que você deseja e logo entraremos em contato com você.' }                         
                        <span className='subject-display'> {subject} </span>
                        <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[10]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 10: e.target.value})}/>
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
                                
                            { CONTACT_PT ? CONTACT_PT[11] : 'Responder via:' }    
                            <div className='radio-btn'>
                                <input type="radio" id="phone" name="fav-resp" value="PHONE" onChange={(e) => getForm({...formData, returnType: 1})}/>
                                <label for="phone">
                                    { CONTACT_PT ? CONTACT_PT[12] : 'Ligação' } 
                                </label>
                            </div>
                            <div className='radio-btn'>
                                <input type="radio" id="whatsapp" name="fav-resp" value="WHATSAPP" onChange={(e) => getForm({...formData, returnType: 2})}/>
                                <label for="whatsapp"> { CONTACT_PT ? CONTACT_PT[13] : 'Whatsapp' }   </label>
                            </div>
                            <div className='radio-btn'>
                                <input type="radio" id="email" name="fav-resp" value="EMAIL" onChange={(e) => getForm({...formData, returnType: 3})}/>
                                <label for="email">
                                { CONTACT_PT ? CONTACT_PT[14] : 'Email' }  </label>
                            </div>
                            </div>
                            <button className='btn-orange-square' type='submit'>
                            { CONTACT_PT ? CONTACT_PT[15] : 'Enviar' } </button>
                        </div>

                        <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[11]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 11: e.target.value})}/>
                        <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[12]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 12: e.target.value})}/>    
                        <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[13]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 13: e.target.value})}/>
                        <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[14]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 14: e.target.value})}/>
                        <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[15]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 15: e.target.value})}/>
                                       
                    </form>

                </div>
            
            }


            {
                MSG_SENT && <div className='feedback'>
                    <div className='feedback-title'>
                    <EditorContent HAS_VALUE={CONTACT_PT[16] && CONTACT_PT[16]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 16: e.target.value})}/>
                    { CONTACT_PT ? CONTACT_PT[16] : 'MENSAGEM ENVIADA' } 
                    </div>
                    <div className='feedback-desc'>
                    <EditorContent HAS_VALUE={CONTACT_PT[17] && CONTACT_PT[17]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} CHANGE_INPUT={(e) => props.updateField({...TEXT , 17: e.target.value})}/>
                    { CONTACT_PT ? CONTACT_PT[17] : 'AGORA É SÓ ESPERAR QUE NOSSA EQUIPE ENTRARÁ EM CONTATO COM VOCÊ NA PLATAFORMA ESCOLHIDA' } 
                        </div>
                    <SUCCESS_MSG />
                </div>
            }

            


        </div>
    )
}

    const mapStateToProps = (state) => {
        return {
            MSG_SENT: state.client.MSG_SENT,
            contact: state.firestore.ordered.contact_pt,
            text: state.text.textCollection
        }
    }


  const mapDispatchToProps = (dispatch) => {
    return {
        createClient: (client) => dispatch(createClient(client)),
        createText: (text) => dispatch(createText(text)),
        updateField: (text) => dispatch(updateField(text))
    }
  }
  
  export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts' , orderBy: ["date", "desc"] } ,
        { collection: 'contact_pt' }               
    ])
)(Form)