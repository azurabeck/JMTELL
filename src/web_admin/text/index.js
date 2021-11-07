import { faCaretRight, faMailBulk, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'

import HOME from '../../web_pages/templates/home'
import PRODUCT from '../../web_pages/templates/products'
import COMPANY from '../../web_pages/templates/company'
import CONTACT from '../../web_pages/templates/contact'
import BLOG from '../../web_pages/templates/blog'

const Text = (props) => {

    const [textEdition , handleTextEdtion] = useState()

    return (
        <div className='text-admin'>   
            <div className='fast-bar'> Clientes: 10  <FontAwesomeIcon icon={faMailBulk} /> </div>       
            
            <div className='text-title'> Edição dos textos </div>
            <div className='text-desc'> Selecione a página que gostaria de alterar o texto </div>

            <div className='text-group'>

                <div className='btn-text' onClick={() => handleTextEdtion('home-pt')}>Home - PT</div>
                <div className='btn-text' onClick={() => handleTextEdtion('home-en')}>Home - EN</div>
                <div className='btn-text' onClick={() => handleTextEdtion('company-pt')}>Empresa - PT</div>
                <div className='btn-text' onClick={() => handleTextEdtion('company-en')}>Empresa - EN</div>
                <div className='btn-text' onClick={() => handleTextEdtion('product-pt')}>Produtos - PT</div>
                <div className='btn-text' onClick={() => handleTextEdtion('product-en')}>Produtos - EN</div>
                <div className='btn-text' onClick={() => handleTextEdtion('contact-pt')}>Contato - PT</div>
                <div className='btn-text' onClick={() => handleTextEdtion('contact-en')}>Contato - EN</div>
                <div className='btn-text' onClick={() => handleTextEdtion('blog-pt')}>Blog - PT</div>
                <div className='btn-text' onClick={() => handleTextEdtion('blog-en')}>Blog - EN</div>
               
            </div>

            { textEdition &&
                <div className='edtion-area'>
                    
                    { textEdition && textEdition === 'home-pt' && <HOME isEditing='home'/> }
                    { textEdition && textEdition === 'home-en' && <HOME isEditing='home'/> }
                    { textEdition && textEdition === 'product-pt' && <PRODUCT isEditing='product-pt'/> }
                    { textEdition && textEdition === 'product-en' && <PRODUCT isEditing='product-en'/> }
                    { textEdition && textEdition === 'company-pt' && <COMPANY isEditing='company-pt'/> }
                    { textEdition && textEdition === 'company-en' && <COMPANY isEditing='company-en'/> }
                    { textEdition && textEdition === 'contact-pt' && <CONTACT isEditing='contact-pt'/> }
                    { textEdition && textEdition === 'contact-en' && <CONTACT isEditing='contact-en'/> }
                    { textEdition && textEdition === 'blog-pt' && <BLOG isEditing='blog-pt'/> }
                    { textEdition && textEdition === 'blog-en' && <BLOG isEditing='blog-en'/> }

                </div>
            }


        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
       products: state.firestore.ordered.products
    }
  }
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products' }
    ])
)(Text)