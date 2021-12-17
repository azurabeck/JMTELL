import React , { useState , useEffect } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { updateProcuct , deleteProcuct } from '../../../web_config/actions/productActions'
import './style.scss'

const Details = (props) => {

    const { PRODUCT , CLICK } = props
    const [ spotlightState , addSpotlight ] = useState(PRODUCT.spotlight)
    const subCats = []

    

    const category = PRODUCT.category
    const details = PRODUCT.details
    const aditional = PRODUCT.aditional
    const id = PRODUCT.id
    
    const handleSubmit = (e , spotlight) => {
        e.preventDefault()
        addSpotlight(spotlight)
        props.updateProcuct({...PRODUCT, spotlight})
    }
     
    const handleDelete = (e) => {
        e.preventDefault()
        props.deleteProcuct(id)
        CLICK()
    }

    Object.keys(PRODUCT).forEach(key => {
        if (PRODUCT[key] === true) {
            if(key !== 'spotlight') subCats.push(key)
        }
    });

    return (
        <div className='product-details'>
            <div className='title'> Detalhes do Produto <div className='btn-close' onClick={CLICK}><FontAwesomeIcon icon={faTimes} /></div> </div>
            <div className='image'> <img alt='' src={PRODUCT.img} /> </div>
            <strong className='center-text' > {PRODUCT.name} </strong>
            <div className='left-text'> {PRODUCT.description} </div>

            <div className='tag-group'>
                { category && category.map((item , index) => (
                    <div className='tag' key={index}>{item.cat_desc}</div>
                )) }
            </div>

            <div className='details-group'>
                <div className='group'>
                    <div className='group-title'>Modelo</div>
                    <div className='group-desc'> {PRODUCT.model} </div>
                </div>

                { details && details.map((item , index) => (
                    <div className='group' key={index}>
                        <div className='group-title'> {item.detail_name} </div>
                        <div className='group-desc'> {item.detail_desc} </div>
                    </div>                    
                )) }

            </div>

            <strong className='left-text'> Informações Adicionais: </strong>
            <ul>
                {
                    aditional && aditional.map((item, index) => (
                        <li key={index}> {item.info_desc} </li>
                    ))
                }
            </ul>          

            { spotlightState && <div className='spotlight' onClick={(e) => handleSubmit(e , !spotlightState)}>Em Destaque</div> }
            { spotlightState === false && <div className='spotlight-off' onClick={(e) => handleSubmit(e, !spotlightState)}>Destacar</div> }

            <strong className='left-text'> Categoria: {PRODUCT.categorie} </strong>
            <ul>
                { subCats && subCats.map(item => (
                    <li>{item}</li>
                ))}
            </ul>

            <div className='remove-btn' onClick={(e) => handleDelete(e)}>Deletar Produto</div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        PRODUCT_SENT: state.product.PRODUCT_SENT,
    }
}


const mapDispatchToProps = (dispatch) => {
return {
    updateProcuct: (product) => dispatch(updateProcuct(product)),
    deleteProcuct: (product) => dispatch(deleteProcuct(product))
}
}

export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([ { collection: 'categories' } ])
)(Details)