import React , { useState } from 'react'
import { createPost } from '../../../web_config/actions/postActions'
import { connect } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faPen } from '@fortawesome/free-solid-svg-icons'

const AddPost = () => {

    const [ updateField , handleUpdate ] = useState(false)
    const [ coverShow , hideCover ] = useState(true)
    const [ postShow , hidePost ] = useState(true)

    const [ post , handlePostEdition] = useState({
        id: '',
        url: '',
        cover_title: '',
        date: '',
        author: '',
        content: '',
            
    })

    const IS_EDITING = true

    const handleUpdateField = (e) => {
        handlePostEdition({...post, [e.target.name]: e.target.value })
    }


    return (
        <div className='blog'>
            
            <div className='title'>
                {IS_EDITING ? `Editando Post: ${post.id}` : 'Criar Post'}
            </div>

            <form>          

                <div className='cover'>

                    <div className='block-title' onClick={() => hideCover(!coverShow)} > Editando Capa  <FontAwesomeIcon icon={coverShow ? faChevronUp : faChevronDown} />  </div>

                    { coverShow &&
                   
                        <div className='group-cover'>
                            <div className='cover-img'>
                                    { !post.url || updateField.url                                 
                                        ? <div className='cover-img-form'> <input placeholder='Link da imagem' 
                                                name='url'
                                                value={post.url && post.url} 
                                                onChange={(e) => handleUpdateField(e)} />  
                                            { updateField.url && <div className='btn-update' 
                                                                    onClick={() => handleUpdate({ ...updateField, url: false})}>Salvar alteração</div> }                                  
                                        </div> 
                                        
                                        : <div className='cover-img-preview'> 
                                                <img src={post.url} alt=''/> 
                                                <FontAwesomeIcon icon={faPen} onClick={() => handleUpdate({...updateField , url: true})} /> 
                                        </div>
                                    }
                            </div>
                            <div className='cover-data'>
                                { !post.cover_title || updateField.cover_title                                 
                                    ? <div className='cover-form'> 
                                            <input placeholder='Título da notícia' 
                                                    name='cover_title'
                                                    value={post.cover_title && post.cover_title} 
                                                    onChange={(e) => handleUpdateField(e)} />  
                                            { updateField.cover_title && <div className='btn-update' 
                                                                            onClick={() => handleUpdate({ ...updateField, cover_title: false})}>Salvar alteração</div> }                                  
                                        </div> 
                                    
                                    : <div className='cover-preview-title'> 
                                            { post.cover_title }
                                            <FontAwesomeIcon icon={faPen} onClick={() => handleUpdate({...updateField , cover_title: true})} /> 
                                        </div>
                                }
                                { !post.author || updateField.author                                 
                                    ? <div className='cover-form'>
                                                <input placeholder='Autor da notícia' 
                                                    name='author'
                                                    value={post.author && post.author} 
                                                    onChange={(e) => handleUpdateField(e)} />  
                                            { updateField.author && <div className='btn-update' 
                                                                onClick={() => handleUpdate({ ...updateField, author: false})}>Salvar alteração</div> }                                  
                                        </div> 
                                    
                                    : <div className='cover-preview-author'> 
                                            { post.author } <span className='divisor'></span>
                                            <FontAwesomeIcon icon={faPen} onClick={() => handleUpdate({...updateField , author: true})} /> 
                                        </div>
                                }
                        </div>
                    
                                
                
                
                
                
                
                        </div>

                    }

                </div>

                <div className='post'>

                    <div className='block-title' onClick={() => hidePost(!postShow)} > Editando Post  <FontAwesomeIcon icon={postShow ? faChevronUp : faChevronDown} />  </div>
                    
                    { postShow &&
                   
                        <div className='group-post'>     

                            <div className='post-img' style={{ backgroundImage: `linear-gradient( rgba(75, 147, 190, 0.56),  rgba(75, 147, 190, 0.56) ),  url(${post.url})` }}>
                                <div className='post-title'> {post.cover_title} </div>
                            </div>
                            <div className='post-author'>
                                <div className='networks'>0</div>
                                <div className='author'> Criado por: {post.author} - No dia: definido automáticamente na criação do post </div>
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

                <button className='btn-orange-square' type='submit'>{IS_EDITING ? 'Salvar alterações' : 'Criar Post'}</button>
               
            </form>

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

const mapStateToProps = (state) => {
    return {
        POST_SENT: state.product.POST_SENT
    }
}


const mapDispatchToProps = (dispatch) => {
return {
    createPost: (post) => dispatch(createPost(post))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)