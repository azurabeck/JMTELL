import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss';

const ProductList = (props) => {

    
    const PRODUCTS_DATA = props.products
    
    return (
        <div className='products-list-area'>
            Lista de Produtos

            <div className='product-list'>

                { PRODUCTS_DATA && PRODUCTS_DATA.map((item, index) => {

                    console.log(item)

                    return (
                        <div class="product">
                            <img class="product-img" alt="" src={item.img} />
                            <div class="product-title">{item.name ? item.name : '-' }</div>
                            <div class="product-desc">{item.model ? item.model : '-' }</div>
                            <div class="btn-products-screen"><a class="btn-stroke" href="/products"> Saiba mais </a></div>
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
        products: state.firestore.ordered.products
    }
  }
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products' }
        
    ])
)(ProductList)