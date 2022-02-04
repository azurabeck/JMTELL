import React from 'react'
import { createClient } from '../../../web_config/actions/clientActions'
import { connect } from 'react-redux'
import './style.scss'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const ClientDetails = ( props ) => {

    const click = props.click
    const item = props.item

    let returnType

    switch(item.returnType) {
        case 1: 
            returnType = 'Ligação'
            break
        case 2: 
            returnType = 'Whatsapp'
            break
        case 3: 
            returnType = 'Email'
            break
        default: 
            returnType = 'Whatsapp'
            break
    }

    return (
        <div className='client-details'>

                <div className='title'>Informações do Cliente<div className='btn-close' onClick={click}><FontAwesomeIcon icon={faTimes} /></div> </div>
               
               
                <div className='group'> 
                    <div className='left'> Nome </div>
                    <div className='right'>{item.name}</div>
                 </div>

                 <div className='group'> 
                    <div className='left'> Email </div>
                    <div className='right'>{item.email}</div>
                 </div>

                 <div className='group'> 
                    <div className='left'> Telephone </div>
                    <div className='right'>{item.telephone}</div>
                 </div>

                 <div className='group'> 
                    <div className='left'> Tipo de retorno </div>
                    <div className='right'>{returnType}</div>
                 </div>

                <div className='msg'>
                    <div className='title'>MENSAGEM DO CLIENTE</div>
                    <div className='sub'>{item.msg.subject}</div>
                    <div className='msg-text'>
                        {item.msg.text ? item.msg.text : 'Cliente não enviou mensagem, ou foi gerado pelo admin'}
                    </div>
                    <div className='msg-data'>
                       Enviado em: {moment(item.msg.time.toDate().toDateString()).format('DD/MM/YYYY')}</div>


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

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetails)