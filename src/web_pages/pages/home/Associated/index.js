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
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <FontAwesomeIcon icon={faCaretRight} className='arrow' />
            </div>

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