import { faEdit, faMailBulk, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { updateNetwork } from '../../web_config/actions/networkActions'
import { FACE_SQUARE , INSTA_SQUARE, LINK_SQUARE, PINT_SQUARE, TWIIT_SQUARE, YOU_SQUARE } from '../../web_pages/atoms/SVG/_index'
import './style.scss'
import  FastBar  from '../organism/fastBar/fastBar'
const Networks = (props) => {


    const NETWORK = props.network
    const [ editUrl , handleUrl ] = useState('')
    const [ formUrl , handleChange ] = useState()
    
    const openInput = (e , item) => {
        e.preventDefault()    
        const open = item
        handleUrl(open)
    }

    const handleEdition = (e) => {
        e.preventDefault()
        handleUrl('')
        props.updateNetwork(formUrl)
    }

    const changeVisible = (e , value) => {
        e.preventDefault()
        handleUrl('')
        props.updateNetwork(value)
    }


    return (
        <div className='network-admin'>   
            <FastBar/>  
        
            <div className='text-title'> Redes Sociais </div>
            <div className='text-desc'> Altere os links das redes sociais, e decida quando elas devem ser exibidas no site </div>

            <div className='network-area'>
                {
                    NETWORK && NETWORK.map((item) => {

                        let image
                        let name = item.name
                        
                        if(item.name === 'Facebook') {
                            image = <FACE_SQUARE />;
                        } else if (item.name === 'Instagram') {
                            image = <INSTA_SQUARE />;
                        } else if (item.name === 'LinkedIn') {
                            image = <LINK_SQUARE />;
                        } else if (item.name === 'Pinterest') {
                            image = <PINT_SQUARE />;
                        } else if (item.name === 'Twitter') {
                            image = <TWIIT_SQUARE />;
                        } else if (item.name === 'YouTube') {
                            image = <YOU_SQUARE />;
                        }
                          
                        return (
                            <div className='network'>
                                
                                <div className='net-name'>{image} {item.name}</div>
                                <div className='net-input'>
                                     
                                    { editUrl === item.name ? <>
                                            <input value={formUrl ? formUrl.url : item.url} onChange={(e) => handleChange({...item, url: e.target.value})} /> 
                                            <div className='btn-save' onClick={(e) => handleEdition(e, item)}> Salvar </div>
                                        </> :
                                        <>{item.url} <FontAwesomeIcon icon={faEdit} onClick={(e) => openInput(e, name)}/></>
                                    }
                                </div>
                                <div className='net-visible'>
                                    Você deseja exibir esta rede na sua página?
                                    <div className='radio'> 
                                        <span className={item.isVisible && 'active'} 
                                              onClick={(e) => changeVisible(e, {...item, isVisible: true})}/> Sim</div>
                                    <div className='radio'> 
                                        <span className={!item.isVisible && 'active'} 
                                              onClick={(e) => changeVisible(e, {...item, isVisible: false})}/> Não</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>



        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
        network: state.firestore.ordered.network
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        updateNetwork: (network) => dispatch(updateNetwork(network))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'network' }
    ])
)(Networks)