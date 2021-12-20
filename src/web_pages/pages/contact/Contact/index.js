import React , {useState} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import './style.scss'
import { WHATSAPP , PHONE } from '../../../atoms/SVG/_index'


const Contact = (props) => {

    const EMPLOYEES = props.employees 
    const CONTACT_PT = props.contact && props.contact[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    return (
        <div className='contact-area'> 

            <div className='title'>                    
                    { CONTACT_PT ? CONTACT_PT[1] : 'ENTRE EM CONTATO A QUALQUER MOMENTO PELOS NOSSO TELEFONE, OU WHATSAPP' }
                    <EditorContent  HAS_VALUE={CONTACT_PT && CONTACT_PT[1]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                   CHANGE_INPUT={(e) => props.updateField({...TEXT , 1: e.target.value})}/>

            </div>
            
            <div className='phone-group'>
                
                <div className='phone-title'>{ CONTACT_PT ? CONTACT_PT[2] : 'Entre em contato com os nossos vendedores diretamente pelo whatsapp' }</div>                
                <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[2]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                    CHANGE_INPUT={(e) => props.updateField({...TEXT , 2: e.target.value})}/>
                
                <div className='phone-numbers' id='whatsapp'>
                    <WHATSAPP />  
                    <div className='phone-number-group'>
                    {
                        EMPLOYEES && EMPLOYEES.map((emp, index) => {

                            const phone = emp.phone.replace(/[\(\)\-\s]+/g, '')

                            return (                                
                                <a  key={index} target='_blank' href={`https://api.whatsapp.com/send?l=pt_br&phone=55${phone}`} rel="noreferrer">
                                    <span className='bullet'/> {emp.name} - {emp.phone}
                                </a>
                            )
                        })
                    }
                    </div>
                </div>

            </div>



            <div className='phone-group'>
                <div className='phone-title'>{ CONTACT_PT ? CONTACT_PT[3] : 'É possível iniciar a ligação clicando no número' }                    
            </div> 
             <EditorContent HAS_VALUE={CONTACT_PT && CONTACT_PT[3]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                   CHANGE_INPUT={(e) => props.updateField({...TEXT , 3: e.target.value})}/>
                
                <div className='phone-numbers'>
                    <PHONE />  
                    <div className='phone-number-group'>
                        <a href='tel:+5521-3351-1211'><span className='bullet'/>  (21) 3351-1211</a>                     
                    </div>
                </div>

            </div>


        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.firestore.ordered.posts,
        contact: state.firestore.ordered.contact_pt,
        employees: state.firestore.ordered.employees,
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
        { collection: 'posts' , orderBy: ["date", "desc"] } ,
        { collection: 'contact_pt' }  ,
        { collection: 'employees' }             
    ])
)(Contact)