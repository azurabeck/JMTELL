import React from "react";
import './style.scss'
import LINE from '../../../atoms/LINE'
import { NETWORK , SECURITY } from '../../../atoms/SVG/_index'

const WhoWeAre = () => {
    return ( 
        <div className='who-we-are'>
                    
                    <div className='title'>A JMTELL é uma empresa distribuidora dos mais avançados sistemas de telefonia, 
                                           segurança, interfonia, redes, No breaks, automação de portões e outras inovações tecnológicas </div>
                    <LINE />

                    <div className='group'>
                        <div className='what-we-do'>
                            <NETWORK />
                            Redes internas e externas de telefonia
                        </div>
                        <div className='what-we-do'>
                            <SECURITY />
                            sistemas de seguranças em residências, indústrias e estabelecimentos comerciais.
                        </div>
                    </div>


        </div> 
    )
}

export default WhoWeAre;