import React , { useState } from 'react'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import BUSSINESS_MAN from '../../../atoms/BUSSINESS_MAN.png';
import { createClient } from '../../../../web_config/actions/clientActions'

import './style.scss';


const Contact = (props) => {

    const HOME_PT = props.home && props.home[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    const [ formData, getForm ] = useState({
        name: '',
        email: '',
        telephone: '',
        msg: '',
        returnType: 0,
        client_subject: 'ORÇAMENTO',
        msg: ''
    })


    const handleSubmit = (e) => {       
        e.preventDefault()       
        if (formData) {
            props.createClient(formData)
        }
        getForm({
            name: '',
            email: '',
            telephone: '',
            msg: '',
            returnType: 0,
            client_subject: 'ORÇAMENTO',
        })
    }

    
    return (
        <div className='contact'>
            <div className='title'>
                { HOME_PT ? HOME_PT[8] : 'Faça seu orçamento' }
                        <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[8]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                    CHANGE_INPUT={(e) => props.updateField({...TEXT , 8: e.target.value})}/></div>
            <div className='line'></div>

            <div className='form-area' onSubmit={(e) => handleSubmit(e)} >
                <img className='bussiness-man-img' alt='' src={BUSSINESS_MAN}/>
                <form>
                    <div className='form-horizontal-row'>
                        <input placeholder='Nome e Sobrenome' required value={formData.name && formData.name}  
                               onChange={(e) => getForm({...formData, name: e.target.value})} ></input>
                        <input placeholder='Telefone' required value={formData.telephone && formData.telephone}   
                               onChange={(e) => getForm({...formData, telephone: e.target.value})}></input>
                    </div>
                        <input placeholder='Email' className='home-form-email' required value={formData.email && formData.email}  
                               onChange={(e) => getForm({...formData, email: e.target.value})}></input> 
                    <div className='text-btn-area'>
                        <textarea className='home-form-msg' maxlength='650' placeholder='Deixe sua mensagem' required 
                                  value={formData.msg && formData.msg}  
                                  onChange={(e) => getForm({...formData, msg: e.target.value})}></textarea> 
                        <button className='btn-orange-square' type='submit'>
                            { HOME_PT ? HOME_PT[9] : 'Faça seu orçamento' }
                        </button>

                        
                        <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[9]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                    CHANGE_INPUT={(e) => props.updateField({...TEXT , 9: e.target.value})}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        MSG_SENT: state.client.MSG_SENT,
        home: state.firestore.ordered.home_pt,
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
        { collection: 'home_pt' }               
    ])
)(Contact)