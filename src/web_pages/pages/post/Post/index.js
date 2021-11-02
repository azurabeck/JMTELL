import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import parse from 'html-react-parser'
import './style.scss'

const Post = (props) => {

    const POST = props.post

    return (
        <>
            {
                POST && POST.map((item, index) => {
                    return (
                        <div className='post-text' key={index} >

                            {parse(item.content)}
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
)(Post)