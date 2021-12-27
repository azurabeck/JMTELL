import { faCaretRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'
import ADD_CLIENT from './AddInfo'
import DETAILS from './Details'
import { updateClient } from '../../web_config/actions/clientActions';
import  FastBar  from '../organism/fastBar/fastBar'
import { useHistory } from 'react-router-dom'

const Clients = (props) => {


    const history = useHistory()
    const { auth } = props
    if(!auth.uid){ 
        history.push('/admin')
        window.location.reload()
    }

    const CLIENTS_DB = props.clients
    const [ registerDialog , handleRegister ] = useState(false)
    const [ openDetails , openDetailsFunc ] = useState(false)
    const [ clientDetails , clientDetailsFun ] = useState()
    const handleDetails = (item) => {
        openDetailsFunc(!openDetails)
        clientDetailsFun(item)
        props.updateClient(item)
    }
 
    return (
        <div className='clients'>


            { registerDialog && <ADD_CLIENT click={() => handleRegister(!registerDialog)}/> }
            { openDetails && <DETAILS item={clientDetails} click={() => openDetailsFunc(!openDetails)}/> }



            <FastBar />   
        
            <div className='title'> Clientes  <div className='button-orange' 
                                                    onClick={() => handleRegister(!registerDialog)}> REGISTRAR NOVO CLIENT </div> 
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
                    <div className='COL_SIZE_LARGE'> Telefone </div>
                    <div className='COL_SIZE_LARGE'> Mais detalhes </div>                
                </div>

                <div className='table-body'>
                {
                    CLIENTS_DB && CLIENTS_DB.map((item, index) => {
                        return (

                            <div className={`table-row ${item.read ? '' : 'bold'}`} key={index} onClick={() => handleDetails(item)}> 
                                <div className='COL_SIZE_LARGE'> {item.name} </div>
                                <div className='COL_SIZE_LARGE'> {item.email} </div>
                                <div className='COL_SIZE_LARGE'> {item.telephone} </div>
                                <div className='COL_SIZE_LARGE'> <FontAwesomeIcon icon={faCaretRight} /> </div>                
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
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([
        { collection: 'clients' }
    ])
)(Clients)