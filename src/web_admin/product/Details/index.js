import React , { useState , useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { updateProcuct } from '../../../web_config/actions/productActions'
import { connect } from 'react-redux'
import './style.scss'

const Details = (props) => {

    const { PRODUCT , CLICK } = props
    const [ spotlightState , addSpotlight ] = useState(PRODUCT.spotlight)
    

    const category = PRODUCT.category
    const details = PRODUCT.details
    const aditional = PRODUCT.aditional

    const handleSubmit = (e , spotlight) => {
        e.preventDefault()
        props.updateProcuct({...PRODUCT, spotlight})
    }
     
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
           


        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        PRODUCT_SENT: state.product.PRODUCT_SENT
    }
}


const mapDispatchToProps = (dispatch) => {
return {
    updateProcuct: (product) => dispatch(updateProcuct(product))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)