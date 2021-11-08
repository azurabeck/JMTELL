import React from "react";
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'
import TEAM_IMG from '../../../atoms/TEAM_IMG.png'

const Team = (props) => {
    const COMPANY_PT = props.company && props.company[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    const initial_text = 'Contando com uma equipe altamente qualificada a JMTELL fornece respostas às suas solicitações de forma ' +
    'rápida e objetiva, seja através do nosso atendimento por telefone, seja em nossa loja com nossos atendentes qualificados ou ' +
    'na entrega expressa para todo o município do Rio de Janeiro*, a JMTELL está do seu lado para respostas em telecomunicação e segurança.'

    return ( 
        <div className='team'>
            <div className='team-img'>                
                <img className='team-img' src={TEAM_IMG} alt='' />
            </div>
            <div className='team-text'>
                <div className='group'>
                    <div className='title'>
                        { COMPANY_PT ? COMPANY_PT[4] : 'NOSSO TIME' }
                            <EditorContent  HAS_VALUE={COMPANY_PT && COMPANY_PT[4]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                   CHANGE_INPUT={(e) => props.updateField({...TEXT , 4: e.target.value})}/>
                    </div>
                    <div className='desc'>
                        { COMPANY_PT ? COMPANY_PT[5] : initial_text }
                                <EditorContent  HAS_VALUE={COMPANY_PT && COMPANY_PT[5]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                   CHANGE_INPUT={(e) => props.updateField({...TEXT , 5: e.target.value})}/>
                            
                    </div>
                </div>

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
)(Team);