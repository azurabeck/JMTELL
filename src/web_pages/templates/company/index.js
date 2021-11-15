import React , { useState } from 'react';
import { EditorAction } from '../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { createText } from '../../../web_config/actions/textActions'


import WHATSAPP from '../../atoms/WHATSAPP';
import HEADER from '../../pages/company/Header'
import BUDGET from '../../pages/company/Budget'
import CLIENTS from '../../pages/company/Clients'
import TEAM from '../../pages/company/Team'
import WHO_WE_ARE from '../../pages/company/WhoWeAre'



const Company = (props) => {

    const IS_EDITING = props.isEditing
    const TEXT_EDITION = props.text

    const [openEditor, handleEditor] = useState(false)

    const handleSubmitText = (e) => {       
        e.preventDefault()        
        props.createText({ collection: IS_EDITING , ...TEXT_EDITION , id: 'hrgGDMLNopwHstKsXFhG'})
        handleEditor(false)
    }

    return (
        <div className='company'>
            <EditorAction IS_EDITING={IS_EDITING} CLICK_EDIT={() => handleEditor(!openEditor)} CLICK_SAVE={(e) => handleSubmitText(e)} /> 

            <HEADER IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor} />
            <WHO_WE_ARE IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/>
            <TEAM IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/>
            <CLIENTS IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/>
            <BUDGET IS_EDITING={IS_EDITING ? IS_EDITING : null} OPEN_EDITOR={openEditor}/>
            <WHATSAPP />
        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
        company: state.firestore.ordered.company_pt,
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
        { collection: 'company_pt' }               
    ])
)(Company)