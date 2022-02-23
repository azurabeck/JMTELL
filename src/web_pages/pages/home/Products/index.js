import React , { useEffect , useState } from 'react'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss';
import Swipe from './SwipeToSlide'


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
            updateProducts( PRODUCTS_SPOTLIGHT && PRODUCTS_SPOTLIGHT); 
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
                <Swipe data={SPOTLIGHT}/>
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