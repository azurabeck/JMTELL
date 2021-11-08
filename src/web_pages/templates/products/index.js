import React , {useState} from 'react';
import { EditorAction } from '../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { createText } from '../../../web_config/actions/textActions'
import PRODUCT_BAR from '../../organism/Products'
import PRODUCT_SIDEBAR from '../../pages/products/Sidebar'
import PRODUCT_LIST from '../../pages/products/ProductsList'
import PRODUCT_SPOTLIGHT from '../../pages/products/Spotlight'

import './style.scss'

const Products = (props) => {    
    const IS_EDITING = props.isEditing
    const TEXT_EDITION = props.text
    
    const [openEditor, handleEditor] = useState(false)    
    const handleSubmitText = (e) => {       
        e.preventDefault()        
        props.createText({ collection: IS_EDITING , ...TEXT_EDITION })
        handleEditor(false)
    }

    return (
            <div className='products'>
                <EditorAction IS_EDITING={IS_EDITING} CLICK_EDIT={() => handleEditor(!openEditor)} CLICK_SAVE={(e) => handleSubmitText(e)} /> 
                {!IS_EDITING && <PRODUCT_BAR />}
                <div className='products-content'>
                    <PRODUCT_SIDEBAR />
                    <div className='products-area'>
                        <PRODUCT_SPOTLIGHT IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/>             
                        <PRODUCT_LIST IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/>                        
                    </div>
                </div>
            </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
        product: state.firestore.ordered.products_pt,
        text: state.text.textCollection
    }
}

  
const mapDispatchToProps = (dispatch) => {
    return {
        createText: (text) => dispatch(createText(text))
    }
}


 export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([
        { collection: 'products_pt' }               
    ])
)(Products)