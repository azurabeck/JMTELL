import React from 'react'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import './style.scss'

const Spotlight = (props) => {

    const POST = props.posts
    const BLOG_PT = props.blog && props.blog[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text



    return (
        <div className='spotlight'>
            {
               POST && POST.slice(0,3).map((item , index) => {

                   return (
                     <div className={`div${index}`} 
                          style={{ backgroundImage: `url(${item.url})` }} key={index}> 
                          <div className='spotlight-title'>{item.cover_title}</div>
                     
                          { index === 2 && <div className='spotlight-tag'> {  BLOG_PT && BLOG_PT[0] }
                          <EditorContent  HAS_VALUE={BLOG_PT && BLOG_PT[0]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                   CHANGE_INPUT={(e) => props.updateField({...TEXT , 0: e.target.value})}/>
                          
                          </div> }                       
                      </div>
                    )                   
                })
            }

        </div>
    )
}



const mapStateToProps = (state) => {
    return {
        posts: state.firestore.ordered.posts,
        blog: state.firestore.ordered.blog_pt,
        text: state.text.textCollection
    }
}

  
const mapDispatchToProps = (dispatch) => {
    return {
        createText: (text) => dispatch(createText(text)),
        updateField: (text) => dispatch(updateField(text))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts' } ,
        { collection: 'blog_pt' }        
    ])
)(Spotlight)