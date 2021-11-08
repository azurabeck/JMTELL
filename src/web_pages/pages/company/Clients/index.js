import React from "react";
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'

import { CLIENTS , SUPPORT } from '../../../atoms/SVG/_index'

const Clients = (props) => {

    const COMPANY_PT = props.company && props.company[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    const initial_text1 =   'A JMTELL disponibiliza a todos os clientes em nossa sede, diversos cursos de ' +
    'aperfeiçoamento em parceria direta com as fabricantes dos produtos, garantindo ' +
    'assim que você e sua empresa irão usufruir ao máximo dos nossos produtos. ' +
    'Acompanhe nossa newsletter para saber sobre as datas e os cursos que serão ministrados.'

    const initial_text2 = 'Nossos funcionários de apoio técnico dão suporte exclusivo ' +
    'seja por telefone ou por e-mail, ' +
    'tanto para instalação de equipamentos como em dúvidas para a melhor escolha de ' +
    'acordo com as suas necessidades.' 

    return ( 
        <div className='clients'>
            <div className='title'>
                { COMPANY_PT ? COMPANY_PT[6] : 'RELAÇÃO COM NOSSOS CLIENTES' }
                <EditorContent  HAS_VALUE={COMPANY_PT && COMPANY_PT[6]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                     CHANGE_INPUT={(e) => props.updateField({...TEXT , 6: e.target.value})}/>
            </div>
            <div className='group'>
                <CLIENTS />
                <div className='desc'>
                    { COMPANY_PT ? COMPANY_PT[7] : initial_text1 }
                    <EditorContent  HAS_VALUE={COMPANY_PT && COMPANY_PT[7]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                       CHANGE_INPUT={(e) => props.updateField({...TEXT , 7: e.target.value})}/>

                </div>
            </div>
            <div className='group'>
                <div className='desc'>
                    { COMPANY_PT ? COMPANY_PT[8] : initial_text2 }
                    <EditorContent  HAS_VALUE={COMPANY_PT && COMPANY_PT[8]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                         CHANGE_INPUT={(e) => props.updateField({...TEXT , 8: e.target.value})}/>
                </div>
                <SUPPORT />
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
)(Clients);