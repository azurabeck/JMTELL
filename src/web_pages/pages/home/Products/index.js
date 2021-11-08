import React , { useEffect , useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight , faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import ButtonStroke from '../../../atoms/BUTTON_STROKE'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss';


const Header = (props) => {

    const HOME_PT = props.home && props.home[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    const PRODUCTS_DATA = props.products
    const [ SPOTLIGHT , updateProducts] = useState() 

    useEffect(() => {
        async function anyNameFunction() {
            const PRODUCTS_SPOTLIGHT = await PRODUCTS_DATA && PRODUCTS_DATA.filter(item => item.spotlight === true)
            updateProducts( PRODUCTS_SPOTLIGHT && PRODUCTS_SPOTLIGHT)
        }
        anyNameFunction();
    }, [PRODUCTS_DATA]);
        

    return (
        <div className='products'>
            <div className='title'>{ HOME_PT ? HOME_PT[4] : 'PRODUTOS' }
                <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[4]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                CHANGE_INPUT={(e) => props.updateField({...TEXT , 4: e.target.value})}/>
            </div>
            <div className='desc'>
                { HOME_PT ? HOME_PT[5] : 'Conheça alguns dos produtos em destaque' }
                <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[5]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                CHANGE_INPUT={(e) => props.updateField({...TEXT , 5: e.target.value})}/>
                </div>
            <div className='line'></div>

            <div className='products-spotlight'>
                <FontAwesomeIcon icon={faCaretLeft} className='arrow' />


                {
                    SPOTLIGHT && SPOTLIGHT.slice(0,5).map((item, index) => {
                        return (
                            <div className='product'>
                                <div className='product-img' > <img alt='' src={item.img}/> </div>
                                <div className='product-title'>{item.name}</div>
                                <div className='product-desc'>{item.model}</div>
                                <div className='btn'>
                                    <ButtonStroke 
                                        TEXT={ HOME_PT ? HOME_PT[6] : 'Saiba mais' }
                                        WIDTH='160px'
                                        HEIGHT='35px'
                                        BTN_TYPE={3}
                                        TO='/products'/>
                                </div>

                                { index === 0 &&
                                <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[6]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                CHANGE_INPUT={(e) => props.updateField({...TEXT , 6: e.target.value})}/> }
                            </div>
                        )
                    })
                }

               
               


                <FontAwesomeIcon icon={faCaretRight} className='arrow' />
            </div>
        </div>
    )
}


 const mapStateToProps = (state) => {
    return {
        products: state.firestore.ordered.products,
        home: state.firestore.ordered.home_pt,
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
        { collection: 'home_pt' }          
    ])
)(Header)