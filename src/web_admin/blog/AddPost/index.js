import React , { useState , useEffect } from 'react'
import { createPost , editPost , deletePost} from '../../../web_config/actions/postActions'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const AddPost = (props) => {

    const IS_EDITING = props.match.url.indexOf('edit-post') !== -1;
    const POST_DB = props.posts[0]

    const { CREATE_SUCESS , DELETE_SUCESS , UPDATE_SUCESS } = props
    const [ updateField , handleUpdate ] = useState( {
        id: IS_EDITING ? false : true, 
        url: IS_EDITING ? false : true, 
        cover_title: IS_EDITING ? false : true,
        author: IS_EDITING ? false : true, 
        content: IS_EDITING ? false : true, 
    } )
    const [ coverShow , hideCover ] = useState(true)
    const [ postShow , hidePost ] = useState(true)
    const [ actionDone , handleRedirect ] = useState(false)

    const [ post , handlePostEdition] = useState({
        id: IS_EDITING && POST_DB ? POST_DB.id : '',
        url: IS_EDITING && POST_DB ? POST_DB.url : '',
        cover_title: IS_EDITING && POST_DB ? POST_DB.cover_title : '',
        author: IS_EDITING && POST_DB ? POST_DB.author : '',
        content: IS_EDITING && POST_DB ? POST_DB.content : '',            
    })

    const handleSave = (e , name) => {

        let targetName = name

        handlePostEdition({...post, [e.target.name]: e.target.value })
        handleUpdate({...updateField, [targetName]: false})
    }

    const handleUpdateField = (e) => {
        handlePostEdition({...post, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {       
        e.preventDefault()       
        props.createPost(post)
        handleRedirect(true)
    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        props.editPost(post)
        handleRedirect(true)
    }

    const handleDelete = (e) => {
        props.deletePost(post)
    }


    return (
        <div className='blog'>
            
            { !actionDone && <>                
                <div className='title'>
                    {IS_EDITING && POST_DB.id ? `Editando Post: ${POST_DB.id}` : 'Criar Post'}
                </div>

                <form  onSubmit={ IS_EDITING ? (e) => handleSubmitUpdate(e) : (e) => handleSubmit(e)}>          

                    <div className='cover'>

                        <div className='block-title' onClick={() => hideCover(!coverShow)} > Edição da Capa  <FontAwesomeIcon icon={coverShow ? faChevronUp : faChevronDown} />  </div>

                        { coverShow &&
                    
                            <div className='group-cover'>
                                <div className='cover-img'>
                                        { updateField.url                                 
                                            && <div className='cover-img-form'> <input placeholder='Link da imagem' 
                                                    name='url'
                                                    value={post.url && post.url} 
                                                    onChange={(e) => handleUpdateField(e)} />  
                                                { IS_EDITING &&   <div className='btn-update' onClick={(e) => handleSave(e , 'url')}>Salvar alteração</div>  }                             
                                            </div>
                                        }
                                        { post.url && !updateField.url &&
                                            <div className='cover-img-preview'> 
                                                <img src={post.url} alt=''/> 
                                                <FontAwesomeIcon icon={faPen} onClick={() => handleUpdate({...updateField , url: true})} /> 
                                            </div>
                                        }
                                </div>
                                <div className='cover-data'>

                                    { updateField.cover_title &&
                                        <div className='cover-form'> 
                                            <input placeholder='Título da notícia' 
                                                    name='cover_title'
                                                    value={post.cover_title && post.cover_title} 
                                                    onChange={(e) => handleUpdateField(e)} />  
                                            {IS_EDITING && <div className='btn-update' onClick={(e) => handleSave(e, 'cover_title')}>Salvar alteração</div>  }                           
                                        </div> 
                                    }                                        
                                    { post.cover_title && !updateField.cover_title &&   
                                        <div className='cover-preview-title'> 
                                            { post.cover_title }
                                            <FontAwesomeIcon icon={faPen} onClick={() => handleUpdate({...updateField , cover_title: true})} /> 
                                        </div>
                                    }
                                    

                                    { updateField.author &&                               
                                        <div className='cover-form'>
                                                    <input placeholder='Autor da notícia' 
                                                        name='author'
                                                        value={post.author && post.author} 
                                                        onChange={(e) => handleUpdateField(e)} />  
                                                    {IS_EDITING &&   <div className='btn-update'onClick={(e) => handleSave(e, 'author')}>Salvar alteração</div>  }                                 
                                        </div>
                                    } 
                                    { post.author && !updateField.author &&     
                                        <div className='cover-preview-author'> 
                                                { post.author } <span className='divisor'></span>
                                                <FontAwesomeIcon icon={faPen} onClick={() => handleUpdate({...updateField , author: true})} /> 
                                        </div>
                                    }

                            </div>
                        
                                                       
                            </div>

                        }

                    </div>

                    <div className='post'>

                        <div className='block-title' onClick={() => hidePost(!postShow)} > Edição do Post  <FontAwesomeIcon icon={postShow ? faChevronUp : faChevronDown} />  </div>
                        
                        { postShow &&
                    
                            <div className='group-post'>     

                                <div className='post-img' style={{ backgroundImage: `linear-gradient( rgba(75, 147, 190, 0.56),  rgba(75, 147, 190, 0.56) ),  url(${post.url})` }}>
                                    <div className='post-title'> {post.cover_title} </div>
                                </div>
                                <div className='post-author'>
                                    <div className='networks'>0</div>
                                    <div className='author'> Criado por: {post.author} - No dia: {post.date ? post.date : 'definido automáticamente na criação do post'} </div>
                                </div>

                                {/* START RICH TEXT */}
                                <ReactQuill 
                                        className='materialize-text-area' 
                                        modules={AddPost.modules}
                                        formats={AddPost.modules}
                                        id='content' 
                                        onChange={(e) => handlePostEdition({...post, content: e})} 
                                        value={post.content}/> 

                            </div>                        
                        }

                    </div>

                    <div className='btn-area'>
                        <button className='btn-orange-square' type='submit'>{IS_EDITING ? 'Salvar alterações' : 'Criar Post'}</button>
                        { IS_EDITING && <button className='btn-red-square' onClick={(e) => handleDelete(e)}>Deletar post</button>}
                    </div>
                </form>
            </> }

            { actionDone && <>
                <div className='success-msg'>
                    { CREATE_SUCESS | UPDATE_SUCESS | DELETE_SUCESS && <div className='title'>Ação realizada com sucesso!</div> }
                    { !CREATE_SUCESS && !UPDATE_SUCESS && !DELETE_SUCESS && <div className='title'>Aconteceu um problema com sua requisição</div> }
                    <Link className='btn-orange-square' to='/admin/blog'>Voltar para posts</Link>
                </div>
            </>}   

        </div>
    )
}

AddPost.modules = {
    toolbar: [    
      [{'header' : '1'}, {'header' : '2'}, {'font' : []}]  ,
      [{'size' : []}]  ,
      ['bold' , 'italic' , 'underline' , 'strike' , 'bloquote']  ,
      [{'list' : 'ordered'} , {'list' : 'bullet'}]  ,
      ['link', 'image', 'video']  ,
      ['clean'] ,
      ['code-block']
    ]
  }
  
  AddPost.formats = [
    'header', 'font', 'size' , 
    'bold' , 'italic' , 'underline' , 'strike' , 'blockquote' ,
    'list' , 'bullet' ,
    'link' , 'image' , 'video' , 'code-block'
  ]

  const mapStateToProps = (state, ownProps) => {      
    const id = ownProps.match.params.id;
    const posts = state.firestore.ordered.posts
    const post = posts ? posts.filter(post => post.id === id) : null

    return {
        posts: post,
        auth: state.firebase.auth,        
        CREATE_SUCESS: state.post.CREATE_SUCESS,
        UPDATE_SUCESS: state.post.UPDATE_SUCESS,
        DELETE_SUCESS: state.post.DELETE_SUCESS,
    }
  }
  

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post)),
        editPost: (post) => dispatch(editPost(post)),
        deletePost: (post) => dispatch(deletePost(post)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts' }
    ])
)(AddPost)