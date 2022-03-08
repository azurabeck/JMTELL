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
    const [ formData, getForm ] = useState({
        name: '',
        email: '',
        telephone: '',
        msg: '',
        returnType: null,
        client_subject: 'Solicitação de projeto',
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

            {
                !MSG_SENT &&
                <div className='form-title'>
                    <div className='title'> Transforme seus projetos projetos em realidade! </div>
                    <div className='desc'> Fale com um profissional para saber mais sobre o registro de projetos. </div>
                </div>
            }
           

            { !MSG_SENT ?
            
                <div className='project-form'>

                    <form className='project-form-group' onSubmit={(e) => handleSubmit(e)}>
                        <div className='group-1'>
                            <input placeholder='Nome e Sobrenome' required onChange={(e) => getForm({...formData, name: e.target.value })} ></input>
                            <input placeholder='Telefone' required onChange={(e) => getForm({...formData, telephone: e.target.value})}></input>
                        </div>
                        <div className='group-1'>
                            <input placeholder='Email' required onChange={(e) => getForm({...formData, email: e.target.value})}></input> 
                            <input placeholder='CNPJ' required onChange={(e) => getForm({...formData, cnpj: e.target.value})}></input> 
                        </div>
                        <div className='group-1'>
                            <input placeholder='Estado' required onChange={(e) => getForm({...formData, state: e.target.value})}></input> 
                            <input placeholder='Cidade' required onChange={(e) => getForm({...formData, city: e.target.value})}></input> 
                        </div>
                        <div className='group-2'>
                            <input placeholder='Qual o tipo de projeto? (EXEMPLOS: CONDOMINIO, INDUSTRIAL, HOSPITAL, ESCOLAR, LOJAS, SHOPING E OUTROS)' required onChange={(e) => getForm({...formData, projectType: e.target.value})}></input> 
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

            : <div className='feedback'>
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