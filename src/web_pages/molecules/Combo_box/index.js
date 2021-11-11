import React, { useState , useEffect } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { filterCategorie } from '../../../web_config/actions/productActions'

import './style.scss'

const Combo_box = (props) => {

    const { TEXT , categories } = props
    const [ boxStatus, handleBox ] = useState(false)

    const handleFilterDispatch = (e , filter) => {
        e.preventDefault()
        props.filterCategorie({filterByCat: true, filterCategorie: filter})
    }

  
    return (
        <div className='combo-box' onMouseEnter={() => handleBox(true)} onMouseLeave={() => handleBox(false)}>  
                { TEXT }
                { boxStatus && <div className='box-transparent'>
                    <div className='box'>
                        { categories && categories.map((item, index) => (
                            <div className='button' key={index} onClick={(e) => handleFilterDispatch(e , item.name)} > {item.name} </div>
                        )) }
                    </div>
                </div>
                }
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
)(Combo_box)