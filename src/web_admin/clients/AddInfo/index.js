import React , { useState } from 'react'
import { createClient } from '../../../web_config/actions/clientActions'
import { connect } from 'react-redux'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const AddClient = ( props ) => {

    const click = props.click
    const [ formData, getForm ] = useState({
        name: '',
        email: '',
        telephone: '',
        msg: '',
        returnType: null,
        client_subject: 'Registrado pelo Admin',
    })


    const handleSubmit = (e) => {       
        e.preventDefault()        
        props.createClient(formData)
        props.click()
    }

    return (
        <div className='add-info'>

                <div className='title'>Registrar Cliente <div className='btn-close' onClick={click}><FontAwesomeIcon icon={faTimes} /></div> </div>

                <form className='contact-form-group' onSubmit={(e) => handleSubmit(e)}>
                        
                        <input placeholder='Nome e Sobrenome' required onChange={(e) => getForm({...formData, name: e.target.value , client_subject: 'Registrado pelo Admin'})} ></input>
                        <input placeholder='Telefone' required onChange={(e) => getForm({...formData, telephone: e.target.value})}></input>
                        <input placeholder='Email' required onChange={(e) => getForm({...formData, email: e.target.value})}></input>                      
                        
                        <div className='group-3-title'>  Preferência de contato: </div>
                        <div className='group-3'>
                            <div className='radio-group'>
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
                        </div>

                        
                        <button className='btn-orange-square' type='submit'>Registrar Cliente</button>
                    </form>



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

export default connect(mapStateToProps, mapDispatchToProps)(AddClient)