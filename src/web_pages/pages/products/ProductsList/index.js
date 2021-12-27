/* eslint-disable jsx-a11y/alt-text */
import React , { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import './style.scss';
import DEFAULT from '../../../../static/imagem-default.svg'

const ProductList = (props) => {

    
    const PRODUCTS_DATA = props.products
    const CATALOG_DATA = props.catalog
    const FILTER = props.filter
    
    const PRODUCT_PT = props.product && props.product[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text
    const TAG = FILTER.filterCategorie
    const FILTER_TYPE = FILTER.filterByCat
    let PRODUCT_FILTERED


    switch(FILTER_TYPE) {
        case 0: 
            // SUBCAT
            const filterProd = PRODUCTS_DATA && PRODUCTS_DATA.filter(item => item.subCategories) 
            const check = filterProd.map(item => item.subCategories.map(checkTag => checkTag.tag.includes(TAG)))
            let showProduct = check.includes(true) ? true : false
        
            PRODUCT_FILTERED = PRODUCTS_DATA && PRODUCTS_DATA.filter(item => item.subCategories && showProduct ? item : item[TAG] )
            break;
        case 1:
            // CATEGORIE
            PRODUCT_FILTERED =  PRODUCTS_DATA && PRODUCTS_DATA.filter( 
                item => item.categorie.includes(TAG.replace(' ', '')) ? item.categorie.includes(TAG.replace(' ', '')) : item.categorie.includes(TAG)                
            )
            break;
        case 2:
            // SPOTLIGHT
            PRODUCT_FILTERED =  PRODUCTS_DATA && PRODUCTS_DATA.filter(item => item.spotlight )
            break;
        case 3:
            // SEARCH
            PRODUCT_FILTERED = TAG && PRODUCTS_DATA && PRODUCTS_DATA.filter(item => item.name === TAG)
            break;
        case 4:
            // TODOS
            PRODUCT_FILTERED = TAG && TAG !== 'todos' && PRODUCTS_DATA && PRODUCTS_DATA.filter(item => item[TAG] )
            break;
        default: 
    }


    let DATA = PRODUCT_FILTERED ? PRODUCT_FILTERED : PRODUCTS_DATA
    const [catalogList , showCatalogList] = useState(false)
    const [ pagination, handlePag ] = useState({
        current: 1,
        ipp: 24, //itens per page
        ti: DATA && DATA.length, //total itens 
        tp:  DATA && Math.ceil( DATA.length / 24 ),
        sifv: 0, //slice initial first value
        sisv: 24 //slice initial second value
    })

    const handleCurrent = (e, current) => {
        const mult = current + 1
        handlePag({ ...pagination , sifv: current * pagination.ipp , sisv: pagination.ipp * mult , current: mult})
    }

    useEffect(() => {
        DATA && handlePag({
            ...pagination,
            ti: DATA && DATA.length, //total itens 
            tp:  DATA && Math.ceil( DATA.length / 24 ),
        })
    }, [DATA, pagination])
    
    return (
        <>
            <div className='products-list-area'>
                
                { PRODUCT_PT ? PRODUCT_PT[0] : 'Lista de Produtos' }
                <EditorContent  HAS_VALUE={PRODUCT_PT && PRODUCT_PT[0]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                    CHANGE_INPUT={(e) => props.updateField({...TEXT , 0: e.target.value})}/>
                <div className='product-list'>

                    { DATA && DATA.slice(pagination.sifv , pagination.sisv).map((item, index) => {

                        return (
                            <div className="product" key={index}>
                                <img className="product-img" src={item.img ? item.img : DEFAULT}/>
                                <div className="product-title">{item.name ? item.name : '-' }</div>
                                <div className="product-desc">{item.model ? item.model : '-' }</div>
                                <Link to={'/produtos/' + item.id} className="btn-products-screen"><a className="btn-stroke" href="/products">
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
            <div className='pagination'>
                <div className='pagination-group'>
                    {/* <div className='prev-btn'><FontAwesomeIcon icon={faLongArrowAltLeft} /> Anterior</div> */}
                    { pagination.tp > 1 &&
                        Array.apply(null, { length: pagination.tp }).map((e, i) => (
                            <div className={`pag-btn ${pagination.current === i + 1 ? 'active' : null}`} onClick={(e) => handleCurrent(e, i)}> {i + 1} </div>
                        ))
                    }
                </div>    
            </div>
            <div className='catalog'>
                <div className='catalog-text' onClick={() => showCatalogList(!catalogList)}>
                        Faça o download do nosso catálogo 
                        <span className='link-style'> clicando aqui</span> , 
                        ou entre em contato conosco para maiores informações
                </div> 
                <Link to='/contato' className='btn-orange'>Entrar em contato</Link>                  
            </div>
            { catalogList && <div className='catalog-list' onClick={() => showCatalogList(!catalogList)}>
                {
                    CATALOG_DATA && CATALOG_DATA.map((item, i) => (
                        <a href={item.link} target='_blank' key={i} rel="noreferrer">
                            {item.name}
                            <FontAwesomeIcon icon={faDownload} />    
                        </a>
                    ))
                }
            </div> }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.firestore.ordered.products,   
        catalog: state.firestore.ordered.catalog,     
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
        { collection: 'product_pt' },
        { collection: 'catalog' },
    ])
)(ProductList)