import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { filterCategorie } from '../../../web_config/actions/productActions'

import './style.scss'

const Combo_box = (props) => {

    const { TEXT , categories } = props
    const [ boxStatus, handleBox ] = useState(false)
    

    const handleFilterDispatch = (filter) => {
        props.filterCategorie({filterByCat: 1, filterCategorie: filter})
    }

  
    return (
        <div className='combo-box' onMouseEnter={() => handleBox(true)} onMouseLeave={() => handleBox(false)}>  
                { TEXT }
                { boxStatus && <div className='box-transparent'>
                    <div className='box'>
                        { categories && categories.map((item, index) => (
                            <Link to='/produtos' className='button' key={index} onClick={() => handleFilterDispatch(item.name)} > {item.name} </Link>
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