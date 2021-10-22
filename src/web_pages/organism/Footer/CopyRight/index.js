import React from "react";
import './style.scss';
import { FACEBOOK , INSTAGRAM } from '../../../atoms/SVG/_index'

const CopyRight = () => {
    return (
        <div className='copy-right'>

                <div className='social-networks'>
                    <FACEBOOK /> <INSTAGRAM />
                </div>
                Copyright © 2021 - Todos os Direitos Reservados - JMTELL  
        </div>
    )
}

export default CopyRight