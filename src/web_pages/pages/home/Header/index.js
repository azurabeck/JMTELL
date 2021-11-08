import React from 'react'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss';
import LOGO_WHITE  from '../../../atoms/logo_white.svg'
import ButtonOrange from '../../../atoms/BUTTON_ORANGE'


const Header = (props) => {

    const HOME_PT = props.home && props.home[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text


    return (
        <div className='header'>
            <div className='bg-img'></div>
            <img src={LOGO_WHITE} alt=''/>
            <div className='title'>
                { HOME_PT ? HOME_PT[0] : 'GERANDO SOLUÇÕES PARA O DIA A DIA DA SUA EMPRESA' }
                        <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[0]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                    CHANGE_INPUT={(e) => props.updateField({...TEXT , 0: e.target.value})}/>
                
            </div>
            <ButtonOrange 
                TEXT={ HOME_PT ? HOME_PT[1] : 'FAÇA O SEU ORÇAMENTO' }
                FONT_SIZE='20px'
                WIDTH='430px'
                HEIGHT='60px'
                BTN_TYPE={2}
                TO='#contato' />
                
                
                <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[1]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                            CHANGE_INPUT={(e) => props.updateField({...TEXT , 1: e.target.value})}/>
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