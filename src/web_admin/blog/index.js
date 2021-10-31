import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { faCaretRight, faMailBulk, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'redux'

import './style.scss'
import ADD_POST from './AddPost'

const Blog = (props) => {

    const PRODUCTS_DB = props.products
    const [ registerDialog , handleRegister ] = useState(false)

    return (
        <div className='blog'>      

            { registerDialog && <ADD_POST click={() => handleRegister(!registerDialog)}/> }

            <div className='fast-bar'> Clientes: 10  <FontAwesomeIcon icon={faMailBulk} /> </div>    
            <div className='title'> Blog  <Link to='/admin/blog/post' className='button-orange' > CRIAR NOVO POST </Link> </div>

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
                    
                        return (

                            <div className='table-row' key={index}> 
                                <div className='COL_SIZE_LARGE'> {item.name} </div>
                                <div className='COL_SIZE_LARGE'> {item.spotlight ? 'Em detaque' : ''} </div>
                                <div className='COL_SIZE_LARGE'> Exibir detalhes <FontAwesomeIcon icon={faCaretRight} /> </div>      
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
        { collection: 'posts' }
    ])
)(Blog)