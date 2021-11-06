import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import './style.scss';

const ProductList = (props) => {

    
    const PRODUCTS_DATA = props.products
    console.log(PRODUCTS_DATA)
    
    return (
        <>

                { PRODUCTS_DATA && PRODUCTS_DATA.map((item, index) => {

                    return (
                        <div key={index}>
                            <div class="product-main-details">
                                <div className='product-main-details-img'> <img class="product-img" alt="" src={item.img} /> </div>
                                <div className='product-main-details-desc'>
                                    <div class="pmd-name">{item.name ? item.name : '-' }</div>
                                    <div class="pmd-model">{item.model ? item.model : '-' }</div>
                                    <div class="pmd-divisor"></div>
                                    <div class="pmd-title">Sobre o Produto</div>
                                    <div class="pmd-desc">{item.description ? item.description : '-' }</div>
                                </div>
                            </div>  

                            <div class='product-extra-info'>
                                        
                                        <div className='pei-tec-details'>
                                            <div class="pei-title">DETALHES TECNICOS</div>
                                            {
                                                item.details && item.details.map((details, index) => (
                                                    <div className='pei-tec-details-row' key={index}>
                                                        <div className='pei-column-left'>{details.detail_name}</div>
                                                        <div className='pei-column-right'>{details.detail_desc}</div>
                                                    </div>                                                                                                
                                                ))
                                            }
                                         </div>

                                        <div className='pei-extra-details'>
                                            <div class="pei-title">INFORMAÇÕES ADICIONAIS</div>
                                            <ul>
                                                { 
                                                    item.aditional && item.aditional.map((extra, index) => (
                                                        <li>{extra.info_desc}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                            </div>  




                        </div>
                    )
                })
            
                }

        </>
    )
}

const mapStateToProps = (state) => {    
    const id = window.location.pathname.split("/").pop()
    const products = state.firestore.ordered.products
    const product = products ? products.filter(post => post.id === id) : null
    return {
        products: product
    }
  }
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products' }
        
    ])
)(ProductList)