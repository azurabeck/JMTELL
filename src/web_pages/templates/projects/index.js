import React , {useState} from 'react';
import './style.scss'
import { EditorAction } from '../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { createText } from '../../../web_config/actions/textActions'

import FORM from '../../pages/projects/Form'

const Contact = (props) => {

    const IS_EDITING = props.isEditing
    const TEXT_EDITION = props.text

    const [openEditor, handleEditor] = useState(false)
    
    const handleSubmitText = (e) => {       
        e.preventDefault()        
        props.createText({ collection: IS_EDITING , ...TEXT_EDITION , id: 'NPQsZGYwRmzwukV74Usl'})
        handleEditor(false)
    }



    return (
            
            <div className='project'>             
                <EditorAction IS_EDITING={IS_EDITING} CLICK_EDIT={() => handleEditor(!openEditor)} CLICK_SAVE={(e) => handleSubmitText(e)} />    

                <div className='project-content'>
                    <FORM IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor} />
                </div>
            </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
        contact: state.firestore.ordered.contact_pt,
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
        { collection: 'posts' , orderBy: ["date", "desc"] } ,
        { collection: 'contact_pt' }               
    ])
)(Contact)