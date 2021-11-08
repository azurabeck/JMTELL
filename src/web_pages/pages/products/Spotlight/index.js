import React , { useEffect , useState } from 'react'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import BG from '../../../atoms/SVG/spotlight_bg.svg'
import './style.scss';


const Spotlight = (props) => {

    const PRODUCTS_DATA = props.products
    const PRODUCT_PT = props.product && props.product[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    const [ SPOTLIGHT , updateProducts] = useState() 

    useEffect(() => {
        async function anyNameFunction() {
            const PRODUCTS_SPOTLIGHT = await PRODUCTS_DATA && PRODUCTS_DATA.filter(item => item.spotlight === true)
            updateProducts( PRODUCTS_SPOTLIGHT && PRODUCTS_SPOTLIGHT)
        }
        anyNameFunction();
    }, [PRODUCTS_DATA]);
        
    return (

        <>
            {
                SPOTLIGHT &&  <div className='products-spotlight-area'>
                    { PRODUCT_PT ? PRODUCT_PT[2] : 'Produtos em Destaque' }
                    <EditorContent  HAS_VALUE={PRODUCT_PT && PRODUCT_PT[2]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                   CHANGE_INPUT={(e) => props.updateField({...TEXT , 2: e.target.value})}/>
                    

                    {
                        SPOTLIGHT && SPOTLIGHT.slice(0,1).map((item, index) => {
                            return (
                                <div className='products-spotlight'>  
                                        <div className='ps-title'> {item.model} <br/> <span>{item.name}</span> </div>     
                                        <div className='ps-img' style={{background: `url(${BG})`}}> 
                                            <img src={item.img} alt=''/>
                                        </div>     
                                </div>
                            )
                        })
                    }


                </div> 
            }
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        products: state.firestore.ordered.products,
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
)(Spotlight)