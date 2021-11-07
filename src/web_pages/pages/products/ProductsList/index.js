import React , { useState , useEffect} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import './style.scss';

const ProductList = (props) => {

    
    const PRODUCTS_DATA = props.products
    const FILTER = useState(props.filter && props.filter)

    // const PRODUCT_FILTER = PRODUCTS_DATA ? PRODUCTS_DATA.filter(item => item.category.cat_desc === FILTER.filterCategorie) : null
    // console.log(PRODUCT_FILTER)

    useEffect(() => {
        console.log(FILTER)
    
    
    });
        
    return (
        <div className='products-list-area'>
            Lista de Produtos

            <div className='product-list'>

                { PRODUCTS_DATA && PRODUCTS_DATA.map((item, index) => {

                    return (
                        <div class="product" key={index}>
                            <img class="product-img" alt="" src={item.img} />
                            <div class="product-title">{item.name ? item.name : '-' }</div>
                            <div class="product-desc">{item.model ? item.model : '-' }</div>
                            <Link to={'/produtos/' + item.id} class="btn-products-screen"><a class="btn-stroke" href="/products"> Saiba mais </a></Link>
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
        filter: state.product.filterCategorie
    }
  }
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products' }
        
    ])
)(ProductList)