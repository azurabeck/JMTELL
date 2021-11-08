import React from 'react'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss';

import EFFECT from '../../../atoms/SVG/effect.svg'


const Header = (props) => {

    const HOME_PT = props.home && props.home[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    return (
        <div className='about' style={{background: `url(${EFFECT})`}}>
            <div className='bg-img'></div>
            <div className='title'>
            { HOME_PT ? HOME_PT[2] : 'QUEM SOMOS?' }
            <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[2]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                            CHANGE_INPUT={(e) => props.updateField({...TEXT , 2: e.target.value})}/>
            </div>
            <div className='desc'>
            { HOME_PT ? HOME_PT[3] : 'Somos uma empresa distribuidora dos mais avançados sistemas de telefonia, ' + 
                                      'segurança, interfonia, redes, No breaks, automação de portões e outras inovações tecnológicas.' }
            <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[3]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                            CHANGE_INPUT={(e) => props.updateField({...TEXT , 3: e.target.value})}/></div>
            <div className='line'></div>
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
        createText: (text) => dispatch(createText(text)),
        updateField: (text) => dispatch(updateField(text))
    }
}


 export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([
        { collection: 'home_pt' }               
    ])
)(Header)