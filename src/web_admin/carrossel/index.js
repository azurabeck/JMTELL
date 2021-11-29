import { faCaretRight, faMailBulk, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'

import HOME_HEADER from '../../web_pages/pages/home/Header'

const Carrossel = () => {

    const [ carrossel , setCarrossel ] = useState({
        img_0: '',
        img_1: '',
        img_2: '',
    })


    return (
        <div className='carrossel-admin'>   
            <div className='fast-bar'> Clientes: 10  <FontAwesomeIcon icon={faMailBulk} /> </div>       
            
            <div className='text-title'> Edição do carrossel </div>
            <div className='text-desc'> Adicione url de imagens para adiciornar nova imagens ao carrossel </div>


               <div className='edtion-area'>

                    <input className='input-carrossel' 
                           onChange={(e) => setCarrossel({...carrossel, img_0: e.target.value})} 
                           name='img_0' 
                           placeholder='Insira a URL da primeira imagem'
                    />
                    <input className='input-carrossel' 
                           onChange={(e) => setCarrossel({...carrossel, img_1: e.target.value})} 
                           name='img_1' 
                           placeholder='Insira a URL da segunda imagem'
                    />
                    <input className='input-carrossel' 
                           onChange={(e) => setCarrossel({...carrossel, img_2: e.target.value})} 
                           name='img_2' 
                           placeholder='Insira a URL da terceira imagem'
                    />

                    
                     <HOME_HEADER hide_button={true} /> 

                </div>


        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
       products: state.firestore.ordered.products
    }
  }
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products' }
    ])
)(Carrossel)