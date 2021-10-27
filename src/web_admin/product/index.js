import { faCaretRight, faMailBulk, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './style.scss'

const Product = () => {
    return (
        <div className='products'>
            <div className='fast-bar'> Clientes: 10  <FontAwesomeIcon icon={faMailBulk} /> </div>    
        
            <div className='title'> Produtos </div>

            <div className='table'>
                <div className='table-title'> 
                
                    <div className='search-round'>
                        <input placeholder='Procure por email ou nome' />
                        <div className='button-search'><FontAwesomeIcon icon={faSearch} /></div> 
                    </div>
                </div>
                <div className='table-header'>
                    <div className='COL_SIZE_LARGE'> Nome </div>
                    <div className='COL_SIZE_LARGE'> Email </div>
                    <div className='COL_SIZE_LARGE'> Telefone </div>
                    <div className='COL_SIZE_LARGE'> Mais detalhes </div>                
                </div>
                <div className='table-body'> 
                    <div className='COL_SIZE_LARGE'> Rebecca Souza </div>
                    <div className='COL_SIZE_LARGE'> rebeccagsouza@gmail.com </div>
                    <div className='COL_SIZE_LARGE'> (21) 99758-03541 </div>
                    <div className='COL_SIZE_LARGE'> <FontAwesomeIcon icon={faCaretRight} /> </div>
                
                </div>




            </div>


        </div>
    ) 
}

export default Product;