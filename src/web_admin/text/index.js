import { faCaretRight, faMailBulk, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'
import  FastBar  from '../organism/fastBar/fastBar'
import HOME from '../../web_pages/templates/home'
import PRODUCT from '../../web_pages/templates/products'
import COMPANY from '../../web_pages/templates/company'
import CONTACT from '../../web_pages/templates/contact'
import BLOG from '../../web_pages/templates/blog'

const Text = () => {

    const [textEdition , handleTextEdtion] = useState()

    return (
        <div className='text-admin'>   
            <FastBar/>>
            
            <div className='text-title'> Edição dos textos </div>
            <div className='text-desc'> Selecione a página que gostaria de alterar o texto </div>

            <div className='text-group'>

                <div className='btn-text' onClick={() => handleTextEdtion('home_pt')}>Home - PT</div>
                <div className='btn-text' onClick={() => handleTextEdtion('home_en')}>Home - EN</div>
                <div className='btn-text' onClick={() => handleTextEdtion('company_pt')}>Empresa - PT</div>
                <div className='btn-text' onClick={() => handleTextEdtion('company_en')}>Empresa - EN</div>
                <div className='btn-text' onClick={() => handleTextEdtion('product_pt')}>Produtos - PT</div>
                <div className='btn-text' onClick={() => handleTextEdtion('product_en')}>Produtos - EN</div>
                <div className='btn-text' onClick={() => handleTextEdtion('contact_pt')}>Contato - PT</div>
                <div className='btn-text' onClick={() => handleTextEdtion('contact_en')}>Contato - EN</div>
                <div className='btn-text' onClick={() => handleTextEdtion('blog_pt')}>Blog - PT</div>
                <div className='btn-text' onClick={() => handleTextEdtion('blog_en')}>Blog - EN</div>
               
            </div>

            { textEdition &&
                <div className='edtion-area'>
                    
                    { textEdition && textEdition === 'home_pt' && <HOME isEditing='home_pt'/> }
                    { textEdition && textEdition === 'home_en' && <HOME isEditing='home_pt'/> }
                    { textEdition && textEdition === 'product_pt' && <PRODUCT isEditing='product_pt'/> }
                    { textEdition && textEdition === 'product_en' && <PRODUCT isEditing='product_en'/> }
                    { textEdition && textEdition === 'company_pt' && <COMPANY isEditing='company_pt'/> }
                    { textEdition && textEdition === 'company_en' && <COMPANY isEditing='company_en'/> }
                    { textEdition && textEdition === 'contact_pt' && <CONTACT isEditing='contact_pt'/> }
                    { textEdition && textEdition === 'contact_en' && <CONTACT isEditing='contact_en'/> }
                    { textEdition && textEdition === 'blog_pt' && <BLOG isEditing='blog_pt'/> }
                    { textEdition && textEdition === 'blog_en' && <BLOG isEditing='blog_en'/> }

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