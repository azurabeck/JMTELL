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
                        <div className='post-header' key={index}
                             style={{ backgroundImage: `linear-gradient( rgba(75, 147, 190, 0.56),  rgba(75, 147, 190, 0.56) ),  url(${item.url})` }} >
                            <div className='post-title'> {item.cover_title} </div>
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