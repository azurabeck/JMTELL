import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'

const Spotlight = (props) => {

    const POST = props.posts

    console.log(POST)

    return (
        <div className='spotlight'>
            {
               POST && POST.slice(0,3).map((item , index) => {

                   return (
                     <div className={`div${index}`} 
                          style={{ backgroundImage: `url(${item.url})` }} key={index}> 
                          <div className='spotlight-title'>{item.cover_title}</div>
                     
                          { index === 2 && <div className='spotlight-tag'>Destaque</div> }                       
                      </div>
                    )                   
                })
            }

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
)(Spotlight)