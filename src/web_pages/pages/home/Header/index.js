/* eslint-disable jsx-a11y/alt-text */
import React ,  {useState, useEffect} from 'react'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss';
import LOGO_WHITE  from '../../../atoms/logo_white.svg'
import ButtonOrange from '../../../atoms/BUTTON_ORANGE'


const Header = (props) => {

    const hide_button = props.hide_button
    const CARROSSEL = props.carrossel
    const HOME_PT = props.home && props.home[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    const [ ANIMATION_STATE , updateAnimation ] = useState( {  fv: 0,  sv: 1 })
    const DELAY = 5;

    const handleNext = () => {
        updateAnimation({
            fv: ANIMATION_STATE.fv + 1,
            sv: ANIMATION_STATE.sv + 1
        })

        if(ANIMATION_STATE.sv >= 3) {
            updateAnimation({ fv:  0,  sv:   1 })
        }

    }

    useEffect(
        () => {
          let timer1 = setTimeout(() => handleNext(), DELAY * 1000);
          return () => {
            clearTimeout(timer1);
          };
        },
      );

    return (
        <div className='header'>            
            
            {
                CARROSSEL && CARROSSEL.slice(ANIMATION_STATE.fv,ANIMATION_STATE.sv).map((item, index) => {

                    return (
                        <>
                            <img className='bg-img' key={index} src={item.image} />
 
                            <div className='bullet-group'>
                                <div className={`bullet ${ANIMATION_STATE.fv === 0 ? 'active' : ''}`}
                                      onClick={() => updateAnimation({fv: 0, sv: 1})}></div>
                                <div className={`bullet ${ANIMATION_STATE.fv === 1 ? 'active' : ''}`}
                                     onClick={() => updateAnimation({fv: 1, sv: 2})}></div>
                                <div className={`bullet ${ANIMATION_STATE.fv === 2 ? 'active' : ''}`}
                                     onClick={() => updateAnimation({fv: 2, sv: 3})}></div>
                            </div>
                        </>
                    )
                })
            }

            <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[10]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                            CHANGE_INPUT={(e) => props.updateField({...TEXT , 10: e.target.value})}/>
            <img src={LOGO_WHITE} alt=''/>
            <div className='title'>
                { HOME_PT ? HOME_PT[0] : 'GERANDO SOLUÇÕES PARA O DIA A DIA DA SUA EMPRESA' }
                        <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[0]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                    CHANGE_INPUT={(e) => props.updateField({...TEXT , 0: e.target.value})}/>
                
            </div>
            {
                hide_button ? '' :  <ButtonOrange 
                                            TEXT={ HOME_PT ? HOME_PT[1] : 'FAÇA O SEU ORÇAMENTO' }
                                            FONT_SIZE='20px'
                                            WIDTH='430px'
                                            HEIGHT='60px'
                                            BTN_TYPE={2}
                                            TO='#contato' />
            }

                
                
                <EditorContent  HAS_VALUE={HOME_PT && HOME_PT[1]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                            CHANGE_INPUT={(e) => props.updateField({...TEXT , 1: e.target.value})}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        home: state.firestore.ordered.home_pt,
        carrossel: state.firestore.ordered.carrossel,
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
        { collection: 'home_pt' },
        { collection: 'carrossel' }               
    ])
)(Header)