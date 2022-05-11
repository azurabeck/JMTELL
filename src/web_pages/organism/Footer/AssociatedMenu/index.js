/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './style.scss';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import { EMAIL , WHATSAPP } from '../../../atoms/SVG/_index'
import BUTTON_STROKE from '../../../atoms/BUTTON_STROKE'

const AssociatedMenu = (props) => {

    const CATALOG = props.catalog

    return (
        
        <div className='associated-menu'>

             <div className='link-group'>                
                <div className='group'>                        
                    <div className='title'>Catálago dos produtos</div>
                    <div className='group-columns'>
                        <div className='column'>
                            {
                                CATALOG && CATALOG.map((item, i) => (
                                    <a key={i} href={item.link} target='_blank' rel="noreferrer">   {item.name} </a>
                                ))
                            }
                        </div>
                    </div>
                </div>   

                <div className='group'>                    
                        <div className='title'>Endereço e Contatos</div>
                        <div className='group-columns'>
                            <div className='column'>
                            <div className='desc'> R. Barão de Melgaço, 880, Cordovil, Rio de Janeiro – RJ 21250-320
                                <a href="mailto:sac@jmtell.com.br"> sac@jmtell.com.br </a> - (21) 3351-1211 - (21) 3351-8297 </div>
                            </div>
                            <div className='column row'>  
                                <a href="mailto:contato@jmtell.com.br"> <EMAIL /> </a>
                                <a href='https://api.whatsapp.com/send?l=pt_br&phone=55213351-1211' target='_blank' rel="noreferrer" >
                                    <WHATSAPP />
                                </a>
                                <BUTTON_STROKE
                                        TEXT='ACESSE O BLOG'
                                        WIDTH='125px'
                                        HEIGHT='40PX'
                                        FONT_SIZE='12px'
                                        BTN_TYPE={3}
                                        TO='/blog'                                
                                />
                            </div>
                        </div>                      
                </div>
             </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {      
        catalog: state.firestore.ordered.catalog
    }
  }
  
export default compose(
    connect(mapStateToProps, null),
    firestoreConnect([
        { collection: 'catalog' }
    ])
)(AssociatedMenu)