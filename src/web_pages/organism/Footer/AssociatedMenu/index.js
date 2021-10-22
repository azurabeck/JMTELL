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
                            <Link to=''>    Intelbraz > acesse o site   </Link>
                            <Link to=''>    Linear HSV > acesse o site  </Link>
                            <Link to=''>    Prysmian > acesse o site    </Link>
                            <Link to=''>    Peccinin > acesse o site    </Link>
                        </div>
                    </div>
                </div>   

                <div className='group'>                    
                        <div className='title'>Endereço e Contatos</div>
                        <div className='group-columns'>
                            <div className='column'>
                            <div className='desc'> R. Barão de Melgaço, 880, Cordovil, Rio de Janeiro – RJ 21250-320
                                <a href='#'> contato@jmtell.com.br </a> - (21) 3351-1211 </div>
                            </div>
                            <div className='column row'>  
                                <EMAIL />
                                <WHATSAPP />
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