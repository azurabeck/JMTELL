import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { faMailBulk, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteProcuct  } from '../../web_config/actions/productActions'
import './style.scss'
import  FastBar  from '../organism/fastBar/fastBar'
import { useHistory } from 'react-router-dom'

const OldProducts = (props) => {

    const history = useHistory()
    const { auth } = props
    if(!auth.uid){ 
        history.push('/admin')
        window.location.reload()
    }


    const PRODUCTS_DB = props.products
    const [ filterValue , handleFilter ] = useState('')

    const handleDelete = (e, id) => {
        e.preventDefault()
        props.deleteOldProcuct(id)
    }

    const UPDATE_LIST = PRODUCTS_DB && PRODUCTS_DB.filter((item) =>  item.name.toLowerCase().includes(filterValue.toLowerCase()) );
    const PRODUCT_LIST = filterValue ? UPDATE_LIST : PRODUCTS_DB
    
    return (
        <div className='products-admin'>      

            <FastBar />
        
            <div className='title'> Produtos Antigos   </div>

            <div className='table'>
                <div className='table-title'> 
                
                    <div className='search-round'>
                        <input value={filterValue} placeholder='Procure pelo nome do produto' onChange={(e) => handleFilter(e.target.value)} />
                        <div className='button-search'><FontAwesomeIcon icon={faSearch} /></div> 
                    </div>
                </div>
                <div className='table-header'>
                    <div className='COL_SIZE_LARGE'> Imagem </div>  
                    <div className='COL_SIZE_LARGE'> Nome do Produto </div>    
                    <div className='COL_SIZE_LARGE'>  </div>              

                </div>

                <div className='table-body'>
                {
                    PRODUCT_LIST && PRODUCT_LIST.map((item, index) => {

                        const id = item.id
                        return (

                            <div className='table-row' key={index} > 
                                <div className='COL_SIZE_LARGE' >
                                    <img src= {item.img ? item.img : ''} alt='' />    
                                </div>
                                <div className='COL_SIZE_LARGE' > {item.name} </div>
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
       authError: state.auth.authError,
       auth: state.firebase.auth,
       products: state.firestore.ordered.oldProducts
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        deleteProcuct: (product) => dispatch(deleteProcuct(product)),
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'oldProducts' , orderBy: ['time' , 'desc']}
    ])
)(OldProducts)