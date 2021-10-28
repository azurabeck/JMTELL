import { faCaretRight, faMailBulk, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'
import ADD_CLIENT from './AddInfo'

const Products = (props) => {

    const PRODUCTS_DB = props.products
    const [ registerDialog , handleRegister ] = useState(false)

    return (
        <div className='products'>


            { registerDialog && <ADD_CLIENT click={() => handleRegister(!registerDialog)}/> }


            <div className='fast-bar'> Clientes: 10  <FontAwesomeIcon icon={faMailBulk} /> </div>    
        
            <div className='title'> Produto  <div className='button-orange' 
                                                    onClick={() => handleRegister(!registerDialog)}> REGISTRAR NOVO PRODUTO </div> 
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
                    PRODUCTS_DB && PRODUCTS_DB.map((item, index) => {
                        return (

                            <div className='table-row' key={index}> 
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
       products: state.firestore.ordered.products
    }
  }
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products' }
    ])
)(Products)