import React from "react";
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import './style.scss'
import LINE from '../../../atoms/LINE'
import { NETWORK , SECURITY } from '../../../atoms/SVG/_index'

const WhoWeAre = (props) => {
    const COMPANY_PT = props.company && props.company[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    return ( 
        <div className='who-we-are'>
                    
                    <div className='title'>
                        { COMPANY_PT ? COMPANY_PT[1] : ' A JMTELL é uma empresa distribuidora dos mais avançados sistemas de telefonia, segurança, interfonia, redes, No breaks, automação de portões e outras inovações tecnológicas ' }
                        <EditorContent  HAS_VALUE={COMPANY_PT && COMPANY_PT[1]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                   CHANGE_INPUT={(e) => props.updateField({...TEXT , 1: e.target.value})}/>
                       </div>
                    <LINE />

                    <div className='group'>
                        <div className='what-we-do'>
                            <NETWORK />
                            { COMPANY_PT ? COMPANY_PT[2] : 'Redes internas e externas de telefonia' }
                            <EditorContent  HAS_VALUE={COMPANY_PT && COMPANY_PT[2]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                   CHANGE_INPUT={(e) => props.updateField({...TEXT , 2: e.target.value})}/>
                            
                        </div>
                        <div className='what-we-do'>
                            <SECURITY />                            
                            { COMPANY_PT ? COMPANY_PT[3] : 'sistemas de seguranças em residências, indústrias e estabelecimentos comerciais.' }
                            <EditorContent  HAS_VALUE={COMPANY_PT && COMPANY_PT[3]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                   CHANGE_INPUT={(e) => props.updateField({...TEXT , 3: e.target.value})}/>
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
)(WhoWeAre)