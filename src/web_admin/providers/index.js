import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deleteProvider } from '../../web_config/actions/providerActions'
import './style.scss'
import ADD_CLIENT from './AddInfo'
import  FastBar  from '../organism/fastBar/fastBar'
import { faTrash , faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom'

const Providers = (props) => {

    const PROVIDER_DB = props.provider
    const [ registerDialog , handleRegister ] = useState({open: false , editing: false})
    
    const { auth } = props
    if(!auth.uid){ 
        return <Redirect to='/admin' />
    }


    return (
        <div className='providers'>      

            { registerDialog.open && <ADD_CLIENT isEditing={registerDialog.editing} click={() => handleRegister({open:  !registerDialog.open})}/> }
            <FastBar />           
            <div className='title'> Distribuidores
                                    <div className='button-orange'  onClick={() => handleRegister({ open:  !registerDialog.open, editing: false})} > REGISTRAR NOVO DISTRIBUIDOR </div> 
            </div>

            <div className='provider-group'>

                {
                    PROVIDER_DB && PROVIDER_DB.map((item, index) => {

                        return (

                            <div className='provider-block' key={index}>   
                                <div className='provider-block-title '>{item.name}
                                    <div className='svg-group'>
                                        <FontAwesomeIcon icon={faTrash}  onClick={() => props.deleteProvider(item)}/> 
                                        <a href={item.link} target='_blank' alt='company site' rel="noreferrer">
                                            <FontAwesomeIcon icon={faExternalLinkAlt}/>
                                        </a>
                                    </div>
                                </div>           
                                <div className='img-block' style={{background: `url(${item.img})` }}/>   
                            </div>
                    )})
                }
                
            </div>

        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
        provider: state.firestore.ordered.providers
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        deleteProvider: (provider) => dispatch(deleteProvider(provider))
    }
}


export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([ { collection: 'providers' } ])
)(Providers)