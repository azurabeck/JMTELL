import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'

const PostList = (props) => {

    const POST = props.posts

    return (
        <div className='post-list-group'>

            <div className='post-list'>
                {
                    POST && POST.map((item , index) => {
                        return (
                                <div className='post-item'>
                                    <div className='post-item-img' style={{ backgroundImage: `url(${item.url})` }} key={index}></div>
                                    <div className='post-item-details'>
                                        <div className='post-item-title'>{item.cover_title}</div>
                                        <div className='post-item-author'>{item.author} - 23 de outubro 2021 <span className='divisor'></span> </div>
                                        <div className='post-item-desc'>{item.content}</div>
                                        <div className='btn-stroke'>... CONTINUAR LENDO</div>
                                    </div>
                                </div>
                            )                   
                    })
                }
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
        { collection: 'posts' , orderBy: ["date", "desc"] }
        
    ])
)(PostList)