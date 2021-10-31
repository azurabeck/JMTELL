import { faCaretRight, faMailBulk, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'

const Blog = (props) => {

    const POSTS_DB = props.posts

    return (
        <div className='blog'>      


            <div className='fast-bar'> Clientes: 10  <FontAwesomeIcon icon={faMailBulk} /> </div>            
            <div className='title'> Blog  <Link className='button-orange' 
                                                to={'/admin/blog/create-post'}> CRIAR NOVO POST </Link> 
            </div>

            <div className='table'>
                <div className='table-title'> 
                
                    <div className='search-round'>
                        <input placeholder='Procure por email ou nome' />
                        <div className='button-search'><FontAwesomeIcon icon={faSearch} /></div> 
                    </div>
                </div>
                <div className='table-header'>
                    <div className='COL_SIZE_FULL'> Título da matéroa </div>
                    <div className='COL_SIZE_LARGE'> Data de Publicação </div>         
                    <div className='COL_SIZE_LARGE'>  </div>              

                </div>

                <div className='table-body'>
                {
                    POSTS_DB && POSTS_DB.map((item, index) => {
                    
                        return (
                            <Link className='table-row' to={'/admin/blog/edit-post/' + item.id} key={item.id} >
                                <div className='COL_SIZE_FULL'> {item.cover_title} </div>
                                <div className='COL_SIZE_LARGE'> {item.date} </div>
                                <div className='COL_SIZE_LARGE'> Exibir detalhes <FontAwesomeIcon icon={faCaretRight} /> </div>      
                            </Link>
                        )
                    })
                }
                
                </div>
            </div>
        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
        posts: state.firestore.ordered.posts
    }
  }
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts' }
    ])
)(Blog)