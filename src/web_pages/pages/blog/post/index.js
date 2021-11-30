import React , {useState} from 'react'
import { createText , updateField } from '../../../../web_config/actions/textActions'
import { EditorContent } from '../../../../web_config/helpers/editText'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import './style.scss'

const PostList = (props) => {

    const POST = props.posts
    const BLOG_PT = props.blog && props.blog[0]
    const IS_EDITING = props.IS_EDITING
    const OPEN_EDITOR = props.OPEN_EDITOR
    const TEXT = props.text

    return (
        <div className='post-list-group'>

            <div className='post-list'>
                {
                    POST && POST.map((item , index) => {
                        return (
                                <div className='post-item'>
                                    <div className='post-item-img' style={{ backgroundImage: `url(${item.url})` }} key={index}></div>
                                    <div className='post-item-details' style={{position: 'relative'}}>
                                        <div className='post-item-title'>{item.cover_title}</div>
                                        <div className='post-item-author'>{item.author} - {item.date} <span className='divisor'></span> </div>
                                        <div className='post-item-desc'>
import parse from 'html-react-parser'</div>

                                       
                                        <Link to={'/blog/' + item.id} className='btn-stroke'> { BLOG_PT ? BLOG_PT[1] : '... CONTINUAR LENDO' }  </Link>
                                        <EditorContent  HAS_VALUE={BLOG_PT && BLOG_PT[1]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                                        CHANGE_INPUT={(e) => props.updateField({...TEXT , 1: e.target.value})}/>
                                        
                                    </div>
                                </div>
                            )                   
                    })
                }
            </div>

            <div className='blog-menu'>

                <div className='most-read-group'>
                    <div className='most-read'> <span>{ BLOG_PT ? BLOG_PT[2] : 'Mais Lidas' }  </span>
                    <EditorContent  HAS_VALUE={BLOG_PT && BLOG_PT[2]} IS_EDITING={IS_EDITING} OPEN_EDITOR={OPEN_EDITOR} 
                                                        CHANGE_INPUT={(e) => props.updateField({...TEXT , 2: e.target.value})}/>

                     </div>



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
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts' , orderBy: ["date", "desc"] } ,
        { collection: 'blog_pt' }               
    ])
)(PostList)