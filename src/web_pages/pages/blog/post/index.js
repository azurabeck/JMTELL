import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
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
                                        <div className='post-item-author'>{item.author} - {item.date} <span className='divisor'></span> </div>
                                        <div className='post-item-desc'>{parse(item.content)}</div>
                                        <Link to={'/blog/' + item.id} className='btn-stroke'>... CONTINUAR LENDO</Link>
                                    </div>
                                </div>
                            )                   
                    })
                }
            </div>

            <div className='blog-menu'>

                <div className='most-read-group'>
                    <div className='most-read'> <span>Mais Lidas</span> </div>

                    {
                        POST && POST.slice(0,3).map((item, index) => {
                            return (
                                <div className='most-read-item'> 
                                    <div className='mr-item-title'>{item.cover_title}</div>
                                    <div className='mr-item-group'>
                                    <div className='mr-item-tag'> segurança </div> 
                                    <div className='mr-item-author'>{item.author} - {item.date} <span className='divisor'></span></div>   
                                    </div>                              
                                </div>
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
        { collection: 'posts' , orderBy: ["date", "desc"] }
        
    ])
)(PostList)