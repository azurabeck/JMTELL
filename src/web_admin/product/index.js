import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { faMailBulk, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteProcuct } from '../../web_config/actions/productActions'
import './style.scss'
import ADD_CLIENT from './AddInfo'
import DETAILS from './Details'

const Products = (props) => {

    const PRODUCTS_DB = props.products
    const [ registerDialog , handleRegister ] = useState(false)
    const [ openDetails , showDetails ] = useState(false)
    const [ itemDetails , handleItems ] = useState(null)

    const handleDetails = (item) => {
        handleItems(item)    
        showDetails(!openDetails)
    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        props.deleteProcuct(id)
    }


    
    return (
        <div className='products-admin'>      

            { openDetails && <DETAILS PRODUCT={itemDetails} CLICK={() => showDetails(false)} /> }    
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
                    <div className='COL_SIZE_LARGE'> Nome do Produto </div>
                    <div className='COL_SIZE_LARGE'> Produto em Destaque </div>      
                    <div className='COL_SIZE_LARGE'>  </div>              

                </div>

                <div className='table-body'>
                {
                    PRODUCTS_DB && PRODUCTS_DB.map((item, index) => {

                        const id = item.id
                    
                        return (

                            <div className='table-row' key={index} > 
                                <div className='COL_SIZE_LARGE' onClick={() => handleDetails(item)}> {item.name} </div>
                                <div className='COL_SIZE_LARGE' onClick={() => handleDetails(item)}> {item.spotlight ? 'Em detaque' : ''} </div>
                                <div className='COL_SIZE_LARGE'> <div className='btn-red' onClick={(e) => handleDelete(e , id)}>deletar <FontAwesomeIcon icon={faTrash} /> </div> </div>
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

  const mapDispatchToProps = (dispatch) => {
    return {
        deleteProcuct: (product) => dispatch(deleteProcuct(product))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'products' , orderBy: ['time' , 'desc']}
    ])
)(Products)