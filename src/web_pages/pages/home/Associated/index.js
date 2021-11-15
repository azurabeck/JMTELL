import React from 'react'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight , faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import './style.scss';


const Header = (props) => {

    const HOME_PT = props.home && props.home[0]
    const PROVIDERS = props.providers && props.providers

    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    return (
        <div className='associated'>
            <div className='bg-img'></div>
            <div className='title'>
                { HOME_PT ? HOME_PT[7] : 'Distribuidores associados' }
                        <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[7]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                    CHANGE_INPUT={(e) => props.updateField({...TEXT , 7: e.target.value})}/>
                
            </div>
            <div className='line'></div>

            <div className='associated-preview'>
                <FontAwesomeIcon icon={faCaretLeft} className='arrow' />

                {
                    PROVIDERS && PROVIDERS.map((item, index) => {
                        return (
                            <a href={item.link} className='associated' key={index}>
                                <img className='associated-img' alt='' src={item.img}/>
                                <div className='item-name'>{item.name}</div>
                            </a>
                        )
                    })
                }
                <FontAwesomeIcon icon={faCaretRight} className='arrow' />
            </div>

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        home: state.firestore.ordered.home_pt,
        providers: state.firestore.ordered.providers,
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
        { collection: 'home_pt' }    ,
        { collection: 'providers' }    ,    
    ])
)(Header)