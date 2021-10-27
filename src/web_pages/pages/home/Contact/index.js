import React , { useState } from 'react'
import { connect } from 'react-redux'
import BUSSINESS_MAN from '../../../atoms/BUSSINESS_MAN.png';
import { createClient } from '../../../../web_config/actions/clientActions'

import './style.scss';


const Contact = (props) => {

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
            <div className='title'>Faça seu orçamento</div>
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
                        <button className='btn-orange-square' type='submit'>Faça seu orçamento</button>
                    </div>
                </form>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contact)