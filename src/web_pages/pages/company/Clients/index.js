import React from "react";
import './style.scss'

import { CLIENTS , SUPPORT } from '../../../atoms/SVG/_index'

const Clients = () => {
    return ( 
        <div className='clients'>
            <div className='title'>RELAÇÃO COM NOSSOS CLIENTES</div>
            <div className='group'>
                <CLIENTS />
                <div className='desc'>
                        A JMTELL disponibiliza a todos os clientes em nossa sede, diversos cursos de 
                        aperfeiçoamento em parceria direta com as fabricantes dos produtos, garantindo 
                        assim que você e sua empresa irão usufruir ao máximo dos nossos produtos. 
                        Acompanhe nossa newsletter para saber sobre as datas e os cursos que serão ministrados.
                </div>
            </div>
            <div className='group'>
                <div className='desc'>
                        Nossos funcionários de apoio técnico dão suporte exclusivo 
                        seja por telefone ou por e-mail, 
                        tanto para instalação de equipamentos como em dúvidas para a melhor escolha de 
                        acordo com as suas necessidades.</div>
                <SUPPORT />
            </div>
        </div> 
    )
}

export default Clients;