import React from "react";
import { Link } from "react-router-dom";
import './style.scss';

const FastMenu = () => {
    return (
        <div className='fast-menu'>

        <div className='title'>Acesso Rápido</div>

        <div className='link-group'>                
           <div className='group'>
               <div className='column'>
                   <Link to=''>  Acessórios  </Link>
                   <Link to=''>  Antenas de Tv e Conversores  </Link>
                   <Link to=''>  Cabeamentos  </Link>
                   <Link to=''>  Controle de Acesso  </Link>
               </div>
               <div className='column'>
                       <Link to=''>  Detecção de Incêndio  </Link>
                       <Link to=''>  Energia  </Link>
                       <Link to=''>  Fontes  </Link>
                       <Link to=''>  Nobreaks  </Link>
               </div>
           </div>   

           <div className='group'>
               <div className='column'>
                   <Link to=''>  Protetores Eletrônicos  </Link>
                   <Link to=''>  Sensores de presença <br/> para iluminação  </Link>
                   <Link to=''>  GSM  </Link>
               </div>
               <div className='column'>
                       <Link to=''>  Iluminação de Emergência  </Link>
                       <Link to=''>  Interfônia  </Link>
                       <Link to=''>  Monitoramento Residencial  </Link>
               </div>
           </div>   
        </div>
    </div>
    )
}

export default FastMenu