import { faCaretRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link , Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'
import  FastBar  from '../organism/fastBar/fastBar'

const Blog = (props) => {

    const POSTS_DB = props.posts

    const { auth } = props
    if(!auth.uid){ 
        return <Redirect to='/admin' />
    }


    return (
        <div className='blog'>      


            <FastBar />               
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
                    <div className='COL_SIZE_LARGE'> Título da matéroa </div>
                    <div className='COL_SIZE_LARGE center'> Data de Publicação </div>         
                    <div className='COL_SIZE_LARGE'>  </div>              

                </div>

                <div className='table-body'>
                {
                    POSTS_DB && POSTS_DB.map((item, index) => {
                    
                        return (
                            <Link className='table-row' to={'/admin/blog/edit-post/' + item.id} key={item.id} >
                                <div className='COL_SIZE_LARGE'> {item.cover_title} </div>
                                <div className='COL_SIZE_LARGE center'> </div>
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
        authError: state.auth.authError,
        auth: state.firebase.auth,
        posts: state.firestore.ordered.posts
    }
  }
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts' }
    ])
)(Blog)