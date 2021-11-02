import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'

const Header = (props) => {

    const POST = props.post

    return (
        <>
            {
                POST && POST.map((item, index) => {
                    return (
                        <div className='post-author' key={index} >                                    
                            <div className='networks'>0</div>
                            <div className='author'> Criado por: {item.author} - No dia: {item.date ? item.date : 'definido automáticamente na criação do post'} </div>
                        </div>
                    )
                })
            }

        </>
    )
}


const mapStateToProps = (state) => {    
    
    const id = window.location.pathname.split("/").pop()
    const posts = state.firestore.ordered.posts
    const post = posts ? posts.filter(post => post.id === id) : null

    return {
        post: post,
        auth: state.firebase.auth,        
    }
}
  

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect([
        { collection: 'posts' }
    ])
)(Header)