import React , {useEffect} from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import parse from 'html-react-parser'
import './style.scss';
import DEFAULT from '../../../static/imagem-default.svg'
import { filterCategorie } from '../../../web_config/actions/productActions'

const ProductList = (props) => {

    
    const PRODUCTS_DATA = props.products
    const ALL_PRODUCT_DB = props.allProducts
    const history = useHistory();
    useEffect(() => {
        window.scrollTo(0, 0)
    });
    
    const RELATED = ALL_PRODUCT_DB && ALL_PRODUCT_DB.filter( item => item.categorie.includes(PRODUCTS_DATA[0].categorie[0])  )
    
    const handleFilterDispatch = (e , filter) => {
        e.preventDefault()
        props.filterCategorie({filterByCat: 1, filterCategorie: PRODUCTS_DATA && PRODUCTS_DATA[0].categorie[0]})
        history.push('/produtos')
    }

    return (
        <>

                { PRODUCTS_DATA && PRODUCTS_DATA.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="product-main-details">
                                <div className='product-main-details-img'> <img className="product-img" alt="" src={item.img ? item.img : DEFAULT } /> </div>
                                <div className='product-main-details-desc'>
                                    <div className="pmd-name">{item.name ? item.name : '-' }</div>
                                    <div className="pmd-divisor"></div>
                                    <div className="pmd-title">Detalhes do produto</div>
                                    <div className="pmd-desc">{item.info_desc ?  parse(item.info_desc) : '-' }</div>
                                </div>
                            </div>  

                            <div className='product-extra-info'>
                                        
                                        <div className='pei-tec-details'>
                                            <div className="pei-title">Sobre o produto</div>
                                            <div className="pmd-desc">{item.description ?  parse(item.description) : '-' }</div>
                                         </div>
                            </div>  
                        </div>
                        )
                    })
                }
                <div className='related-area'>
                    Veja mais produtos { PRODUCTS_DATA.categorie && PRODUCTS_DATA[0].categorie[0]}:
                {
                    RELATED && RELATED.slice(1, 6).map((item ,  i) => {
                        return (          
                            
                                <div onClick={(e) => handleFilterDispatch(e)} className='related-prod' key={i}>
                                     <img src={item.img} alt='' style={{width: '100px', height: '100px'}}/>                            
                                </div>                               
                                                   
                        )
                    })
                }
                </div>
        </>
    )
}

const mapStateToProps = (state) => {    
    const id = window.location.pathname.split("/").pop()
    const products = state.firestore.ordered.products
    const product = products ? products.filter(post => post.id === id) : null          

    return {
        products: product,
        allProducts: products
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
        { collection: 'products' }        
    ])
)(ProductList)