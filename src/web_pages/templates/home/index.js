import React , {useState} from 'react';
import { EditorAction } from '../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { createText } from '../../../web_config/actions/textActions'

import WHATSAPP from '../../atoms/WHATSAPP';
import HEADER from '../../pages/home/Header'
import ABOUT from '../../pages/home/About'
import PRODUCTS from '../../pages/home/Products'
import ASSOCIATED from '../../pages/home/Associated'
import CONTACT from '../../pages/home/Contact'



import './style.scss';

const Home = (props) => {
    const IS_EDITING = props.isEditing
    const TEXT_EDITION = props.text
    
    const [openEditor, handleEditor] = useState(false)
    
    const handleSubmitText = (e) => {       
        e.preventDefault()        
        props.createText({ collection: IS_EDITING , ...TEXT_EDITION , id: 'fPeEs9HayeEtpUkotgVT'})
        handleEditor(false)
    }
    return (
        <div className='home'>
                <EditorAction IS_EDITING={IS_EDITING} CLICK_EDIT={() => handleEditor(!openEditor)} CLICK_SAVE={(e) => handleSubmitText(e)} />
                <HEADER IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/> 
                <ABOUT IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/> 
                <PRODUCTS IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/> 
                <ASSOCIATED IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/> 
                <CONTACT IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/> 
                <WHATSAPP />
                
        </div>
    ) 
}


const mapStateToProps = (state) => {
    return {
        home: state.firestore.ordered.home_pt,
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
        { collection: 'home_pt' }               
    ])
)(Home);