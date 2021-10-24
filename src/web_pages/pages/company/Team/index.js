import React from "react";
import './style.scss'
import TEAM_IMG from '../../../atoms/TEAM_IMG.png'

const Team = () => {
    return ( 
        <div className='team'>
            <div className='team-img'>                
                <img className='team-img' src={TEAM_IMG} alt='' />
            </div>
            <div className='team-text'>
                <div className='group'>
                    <div className='title'>NOSSO TIME</div>
                    <div className='desc'>
                            Contando com uma equipe altamente qualificada a JMTELL fornece 
                            respostas às suas solicitações de forma rápida e objetiva, seja através 
                            do nosso atendimento por telefone, seja em nossa loja com nossos atendentes 
                            qualificados ou na entrega expressa para todo o município do Rio de Janeiro*, 
                            a JMTELL está do seu lado para respostas em telecomunicação e segurança.
                    </div>
                </div>

            </div>
        </div> 
    )
}

export default Team;