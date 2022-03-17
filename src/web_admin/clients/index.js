import { faCaretRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import './style.scss'
import ADD_CLIENT from './AddInfo'
import DETAILS from './Details'
import { updateClient } from '../../web_config/actions/clientActions';
import  FastBar  from '../organism/fastBar/fastBar'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import _ from 'lodash'

const Clients = (props) => {

    const CLIENTS_DB = props.clients
    const CLIENTS_BY_DATA = _.orderBy(CLIENTS_DB, 'createdAt' , 'desc')
    const [ registerDialog , handleRegister ] = useState(false)
    const [ openDetails , openDetailsFunc ] = useState(false)
    const [ clientDetails , clientDetailsFun ] = useState()
    const handleDetails = (item) => {
        openDetailsFunc(!openDetails)
        clientDetailsFun(item)
        props.updateClient(item)
    }
 

    const { auth } = props
    if(!auth.uid){ 
        return <Redirect to='/admin' />
    }

    const handleCopy = () => {
            const email = [...new Set(CLIENTS_DB && CLIENTS_DB.map(item => ' ' + item.email + ' '))];
            var textField = document.createElement('textarea')
            textField.innerText = email
            document.body.appendChild(textField)
            textField.select()
            document.execCommand('copy')
            textField.remove()          
    }
   
    return (
        <div className='clients'>


            { registerDialog && <ADD_CLIENT click={() => handleRegister(!registerDialog)}/> }
            { openDetails && <DETAILS item={clientDetails} click={() => openDetailsFunc(!openDetails)}/> }


            <FastBar />   
        
            <div className='title'> Clientes  <div className='button-orange' 
                                                    onClick={() => handleRegister(!registerDialog)}> REGISTRAR NOVO CLIENT </div> 
                                               <div className='button-orange' 
                                                    onClick={() => handleCopy()}> COPIE TODOS OS EMAILS</div> 
            </div>

            <div className='table'>
                <div className='table-title'> 
                
                    <div className='search-round'>
                        <input placeholder='Procure por email ou nome' />
                        <div className='button-search'><FontAwesomeIcon icon={faSearch} /></div> 
                    </div>
                </div>
                <div className='table-header'>
                    <div className='COL_SIZE_LARGE'> Nome </div>
                    <div className='COL_SIZE_LARGE'> Email </div>
                    <div className='COL_SIZE_MEDIUM'> Telefone </div>
                    <div className='COL_SIZE_MEDIUM'> Data </div>
                    <div className='COL_SIZE_LARGE'> Cadastro através de: </div>
                    <div className='COL_SIZE_SMALL'> Outros </div>                
                </div>

                <div className='table-body'>
                {
                    CLIENTS_BY_DATA && CLIENTS_BY_DATA.map((item, index) => {
                        return (

                            <div className={`table-row ${item.read ? '' : 'bold'}`} key={index} onClick={() => handleDetails(item)}> 
                                <div className='COL_SIZE_LARGE'> {item.name} </div>
                                <div className='COL_SIZE_LARGE'> {item.email} </div>
                                <div className='COL_SIZE_MEDIUM'> {item.telephone} </div>
                                <div className='COL_SIZE_MEDIUM'> {moment(item.createdAt.toDate().toDateString()).format('DD/MM/YYYY')} </div>
                                <div className='COL_SIZE_LARGE'> {item.subject === 'Projeto' ? 'PROJETO' : item.msg.subject} </div>
                                <div className='COL_SIZE_SMALL'> <FontAwesomeIcon icon={faCaretRight} /> </div>                
                            </div>
                            
                        )
                    })
                }
                
                </div>



            </div>
        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
      authError: state.auth.authError,
      auth: state.firebase.auth,
      clients: state.firestore.ordered.clients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateClient: (client) => dispatch(updateClient(client))
    }
}
  
export default compose(
    connect(mapStateToProps , mapDispatchToProps)
)(Clients)