import React from "react";
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'

const Header = (props) => {
    
    const COMPANY_PT = props.company && props.company[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    return ( 
        <div className='header'>
            <div className='bg-img'/>
            <div className='title'>
                { COMPANY_PT ? COMPANY_PT[0] : 'TELECOMUNICAÇÕES E SEGURANÇA DE FORMA RÁPIDA E OBJETIVA' }
                <EditorContent  HAS_VALUE={COMPANY_PT && COMPANY_PT[0]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                   CHANGE_INPUT={(e) => props.updateField({...TEXT , 0: e.target.value})}/>
            </div>
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
        createText: (text) => dispatch(createText(text)),
        updateField: (text) => dispatch(updateField(text))
    }
}


 export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([
        { collection: 'company_pt' }               
    ])
)(Header)