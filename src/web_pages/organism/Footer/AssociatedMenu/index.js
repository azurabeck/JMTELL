/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import './style.scss';

import { EMAIL , WHATSAPP } from '../../../atoms/SVG/_index'
import BUTTON_STROKE from '../../../atoms/BUTTON_STROKE'

const AssociatedMenu = () => {
    return (
        
        <div className='associated-menu'>

             <div className='link-group'>                
                <div className='group'>                        
                    <div className='title'>Distribuídores autorizados</div>
                    <div className='group-columns'>
                        <div className='column'>
                            <a href='https://intelbras.com/pt-br/' target='_blank' rel="noreferrer">    Intelbras > acesse o site   </a>
                            <a href='https://www.linear-hcs.com.br/' target='_blank' rel="noreferrer">     Linear HCS > acesse o site  </a>
                            <a href='https://br.prysmiangroup.com/pt/company/the-group-hishrefry/local-history' target='_blank' rel="noreferrer">     Prysmian > acesse o site    </a>
                            <a href='https://nice.com.br/peccinin/' target='_blank' rel="noreferrer">     Peccinin > acesse o site    </a>
                        </div>
                    </div>
                </div>   

                <div className='group'>                    
                        <div className='title'>Endereço e Contatos</div>
                        <div className='group-columns'>
                            <div className='column'>
                            <div className='desc'> R. Barão de Melgaço, 880, Cordovil, Rio de Janeiro – RJ 21250-320
                                <a href="mailto:contato@jmtell.com.br"> contato@jmtell.com.br </a> - (21) 3351-1211 </div>
                            </div>
                            <div className='column row'>  
                                <a href="mailto:contato@jmtell.com.br"> <EMAIL /> </a>
                                <a href='https://api.whatsapp.com/send?l=pt_br&phone=55213351-1211' target='_blank' rel="noreferrer">
                                    <WHATSAPP />
                                </a>
                                <BUTTON_STROKE
                                        TEXT='ACESSE O BLOCK'
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

export default AssociatedMenu