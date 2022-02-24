import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import COMBO_BOX from '../../molecules/Combo_box'
import SEARCH from '../../molecules/Search'
import { filterCategorie } from '../../../web_config/actions/productActions'
import { Link } from 'react-router-dom'

import './style.scss'

const Product_bar = (props) => {
    const handleRedirect = () => {
       
        props.filterCategorie({filterByCat: 2, filterCategorie: ''})
    }

    const SIDEBAR_DATA = props.categories
    const hideSearch = props.hideSearch

        return (
        <div className='product-bar'> 
                <div className='product-buttons'>
                    <Link to='/produtos' className='title'> Produtos <FontAwesomeIcon icon={faArrowRight} /> </Link>
                    <div className='button-area'>
                        <div className='bar-button'>
                            <COMBO_BOX TEXT='CATEGORIAS' SIDEBAR_DATA={SIDEBAR_DATA} SCREEN='produtos' />
                        </div> 
                        <div className='bar-button'>
                            <Link to='/produtos' className='button' onClick={() => handleRedirect()}>DESTAQUES</Link>
                        </div>      
                    </div>
                </div>

                { hideSearch ? null :  <SEARCH /> }
               
        
         </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.firestore.ordered.categories        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterCategorie: (filter) => dispatch(filterCategorie(filter))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'categories' }        
    ])
)(Product_bar)