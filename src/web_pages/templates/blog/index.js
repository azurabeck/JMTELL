import React , {useState} from 'react';
import BLOG_BAR from '../../organism/Blog'
import './style.scss'
import SPOTLIGHT from '../../pages/blog/spotlight'
import POST_LIST from '../../pages/blog/post'

import WHATSAPP from '../../atoms/WHATSAPP';
import { EditorAction } from '../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { createText } from '../../../web_config/actions/textActions'


const Blog = (props) => {
    const IS_EDITING = props.isEditing
    const TEXT_EDITION = props.text

    const [openEditor, handleEditor] = useState(false)

    const handleSubmitText = (e) => {       
        e.preventDefault()        
        props.createText({ collection: IS_EDITING , ...TEXT_EDITION })
        handleEditor(false)
    }


    return (      
        
        <div className='blog'>
            {!IS_EDITING && <BLOG_BAR />}
            <EditorAction IS_EDITING={IS_EDITING} CLICK_EDIT={() => handleEditor(!openEditor)} CLICK_SAVE={(e) => handleSubmitText(e)} /> 
            <div className='blog-content'>
                <SPOTLIGHT IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/>
                <POST_LIST IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/>
            </div>           
        </div>
    ) 
}


const mapStateToProps = (state) => {
    return {
        blog: state.firestore.ordered.blog_pt,
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
        { collection: 'blog_pt' }               
    ])
)(Blog)