import React from "react";
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import BUTTON_ORANGE from '../../../atoms/BUTTON_ORANGE'
import './style.scss'

const Budget = (props) => {
    const COMPANY_PT = props.company && props.company[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    const initial_text = 'Então não se contente com menos, faça o seu cadastro conosco na página de cadastro ' +
    'para fazer parte do grupo de clientes parceiros da JMTELL, e conte com as melhores ' +
    'formas de pagamento e a garantia da qualidade dos nossos produtos.'

    return ( 
        <div className='budget'>
            <div className='desc'>
                { COMPANY_PT ? COMPANY_PT[9] : initial_text }
                    <EditorContent  HAS_VALUE={COMPANY_PT && COMPANY_PT[9]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                        CHANGE_INPUT={(e) => props.updateField({...TEXT , 9: e.target.value})}/>
            </div>

            <BUTTON_ORANGE
                TEXT={ COMPANY_PT ? COMPANY_PT[10] : 'FAÇA O ORÇAMENTO AGORA MESMO!' }
                WIDTH='600px'
                HEIGHT='70px'
                FONT_SIZE='28px'
                BTN_TYPE={2}
                TO='/contato' />

            <EditorContent  HAS_VALUE={COMPANY_PT && COMPANY_PT[10]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                        CHANGE_INPUT={(e) => props.updateField({...TEXT , 10: e.target.value})}/>
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
)(Budget);