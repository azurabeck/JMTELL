import { faCheck, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { updateCarrossel } from '../../web_config/actions/carrosselActions'
import './style.scss'

import HOME_HEADER from '../../web_pages/pages/home/Header'

const Carrossel = (props) => {

    const CARROSSEL_DB = props.carrossel

    const [ carrossel , setCarrossel ] = useState({
        img_0: CARROSSEL_DB && CARROSSEL_DB[0] && CARROSSEL_DB[0].image,
        img_1: CARROSSEL_DB && CARROSSEL_DB[1] && CARROSSEL_DB[1].image,
        img_2: CARROSSEL_DB && CARROSSEL_DB[2] && CARROSSEL_DB[2].image,
    })

    const [ success, changeToIcon ] = useState('')

    const handleSave = (e, id, link) => {
        e.preventDefault()
        props.updateCarrossel({id: id, image: link})
        changeToIcon(id)
        setTimeout(() => changeToIcon(''), 1000);
    }


    return (
        <div className='carrossel-admin'>   
            <div className='fast-bar'> Clientes: 10  <FontAwesomeIcon icon={faMailBulk} /> </div>       
            
            <div className='text-title'> Edição do carrossel </div>
            <div className='text-desc'> Adicione url de imagens para adiciornar nova imagens ao carrossel </div>


               <div className='edtion-area'>

                    <div className='input-group'>
                            
                        <input className='input-carrossel' 
                            onChange={(e) => setCarrossel({...carrossel, img_0: e.target.value})} 
                            name='img_0' 
                            value={carrossel && carrossel.img_0 }
                            placeholder='Insira a URL da primeira imagem'
                        /> 
                        {
                            success === 'Ds7sJj9M6YsVHDIYZ4vt' ?    <div className='save-image'>  <FontAwesomeIcon icon={faCheck}/> </div>
                                    :  <div className='save-image' onClick={(e) => handleSave(e, 'Ds7sJj9M6YsVHDIYZ4vt', carrossel.img_0)}>save</div>
                        }
                       
                    </div>

                    <div className='input-group'>
                            
                            <input className='input-carrossel' 
                                onChange={(e) => setCarrossel({...carrossel, img_1: e.target.value})} 
                                name='img_0' 
                                value={carrossel && carrossel.img_1 }
                                placeholder='Insira a URL da primeira imagem'
                            /> 
                            {
                                success === 'J7dVNuOkrBgzAlELS6xA' ?  <div className='save-image'>  <FontAwesomeIcon icon={faCheck}/> </div>
                                        : <div className='save-image' onClick={(e) => handleSave(e, 'J7dVNuOkrBgzAlELS6xA', carrossel.img_1)}>save</div>
                            }
                    </div>

                    <div className='input-group'>
                        
                        <input className='input-carrossel' 
                            onChange={(e) => setCarrossel({...carrossel, img_2: e.target.value})} 
                            value={carrossel && carrossel.img_2 }
                            name='img_0' 
                            placeholder='Insira a URL da primeira imagem'
                        /> 
                        {
                            success === 'mkgdPYwSAvhcU1kFj3rf' ? <div className='save-image'>  <FontAwesomeIcon icon={faCheck}/> </div>
                                        :   <div className='save-image' onClick={(e) => handleSave(e, 'mkgdPYwSAvhcU1kFj3rf', carrossel.img_2)}>save</div>
                        }
                       
                    </div>

                    
                     <HOME_HEADER hide_button={true} /> 

                </div>


        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
        carrossel: state.firestore.ordered.carrossel
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        updateCarrossel: (item) => dispatch(updateCarrossel(item))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'carrossel' }
    ])
)(Carrossel)