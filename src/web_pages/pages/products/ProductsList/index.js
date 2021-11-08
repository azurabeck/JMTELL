import React , { useState , useEffect} from 'react'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import './style.scss';

const ProductList = (props) => {

    
    const PRODUCTS_DATA = props.products
    const FILTER = props.filter
   

    const PRODUCT_PT = props.product && props.product[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text
    const TAG = FILTER.filterCategorie
    
    const PRODUCT_FILTERED = TAG && TAG !== 'todos' && PRODUCTS_DATA && PRODUCTS_DATA.filter(item => item[TAG] )
    let DATA = PRODUCT_FILTERED ? PRODUCT_FILTERED : PRODUCTS_DATA


    return (
        <div className='products-list-area'>
            
            { PRODUCT_PT ? PRODUCT_PT[0] : 'Lista de Produtos' }
            <EditorContent  HAS_VALUE={PRODUCT_PT && PRODUCT_PT[0]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                   CHANGE_INPUT={(e) => props.updateField({...TEXT , 0: e.target.value})}/>
            <div className='product-list'>

                { DATA && DATA.map((item, index) => {

                    return (
                        <div class="product" key={index}>
                            <img class="product-img" alt="" src={item.img} />
                            <div class="product-title">{item.name ? item.name : '-' }</div>
                            <div class="product-desc">{item.model ? item.model : '-' }</div>
                            <Link to={'/produtos/' + item.id} class="btn-products-screen"><a class="btn-stroke" href="/products">
                            { PRODUCT_PT ? PRODUCT_PT[1] : 'Saiba mais' } </a></Link>      
                            { index === 0 && 
                                            <EditorContent  HAS_VALUE={PRODUCT_PT && PRODUCT_PT[1]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                                                CHANGE_INPUT={(e) => props.updateField({...TEXT , 1: e.target.value})}/>
                            }                      
                        </div>  
                        )
                     })            
                }

                


            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.firestore.ordered.products,        
        filter: state.product.filterCategorie,
        product: state.firestore.ordered.product_pt,
        text: state.text.textCollection
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        createText: (text) => dispatch(createText(text)),
        updateField: (text) => dispatch(updateField(text))
    }
}

export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([
        { collection: 'products' },
        { collection: 'product_pt' }
        
    ])
)(ProductList)