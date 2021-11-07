import React , {useState} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { createText } from '../../../../web_config/actions/textActions'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const PostList = (props) => {

    const POST = props.posts
    const BLOG_PT = props.blog && props.blog[0]

    const IS_EDITING = props.IS_EDITING
    const [openEditor, handleEditor] = useState(false)
    const [ textEdition, handleTextEdition ] = useState({
        collection: '',
        text: '',
        index: null,
    })
    
    const handleSubmit = (e) => {       
        e.preventDefault()        
        props.createText(textEdition)
        handleEditor(false)
    }

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
                                        <Link to={'/blog/' + item.id} className='btn-stroke'> { BLOG_PT ? BLOG_PT[1] : '... CONTINUAR LENDO' }  </Link>
                                        { IS_EDITING && <div className='editing-group'> 
                                            { openEditor && <div className='text-group'>
                                                <input onChange={(e) => handleTextEdition({collection: IS_EDITING, text: e.target.value , index: 1})} />
                                                <div className='btn-orange' onClick={(e) => handleSubmit(e)}>Salvar Seleção</div>
                                            </div> }                                
                                        
                                            <FontAwesomeIcon icon={faPen} onClick={() => handleEditor(!openEditor)} />
                                        </div> }
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
        posts: state.firestore.ordered.posts,
        blog: state.firestore.ordered.blog_pt
    }
}

  
const mapDispatchToProps = (dispatch) => {
    return {
        createText: (text) => dispatch(createText(text))
    }
}
  
  
export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts' , orderBy: ["date", "desc"] } ,
        { collection: 'blog_pt' }               
    ])
)(PostList)