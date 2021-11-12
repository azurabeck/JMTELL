import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import COMBO_BOX from '../../molecules/Combo_box'
import SEARCH from '../../molecules/Search'
import { filterCategorie } from '../../../web_config/actions/productActions'

import './style.scss'

const Product_bar = (props) => {

    const SIDEBAR_DATA = props.categories


    return (
        <div className='product-bar'> 
                <div className='title'> Product <FontAwesomeIcon icon={faArrowRight} /> </div>
                <div className='button-area'>
                    <div className='bar-button'>
                        <COMBO_BOX TEXT='CATEGORIAS' SIDEBAR_DATA={SIDEBAR_DATA} SCREEN='produtos' />
                    </div> 
                    <div className='bar-button'><div className='button' onClick={() => props.filterCategorie({filterByCat: 2, filterCategorie: ''})}>DESTAQUES</div></div>      
                </div>
                <SEARCH />
        
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