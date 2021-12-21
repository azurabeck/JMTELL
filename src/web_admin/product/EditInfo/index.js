import React, { useState } from 'react'
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill'
import parse from 'html-react-parser'
import 'react-quill/dist/quill.snow.css'
import './style.scss'

const Edit = (props) => {

    const [ formValue , handleForm ] = useState(props.EDIT)
    const [ edit, handleEdit ] = useState('')
    
    console.log(formValue)

    const handleSave = () => {
        console.log(formValue)
        handleEdit('')
    }

    return (
        <form className='product-edit'>
             <div className='title-edit'>Edição de Produto <div className='btn-close' onClick={props.close}><FontAwesomeIcon icon={faTimes} /></div> </div>
             <div className='form-area'>

                <div className='first-group'>

                    {/* HANDLE IMAGE AREA    */}
                    <div className='image'> 

                        <div className='image-group'>
                            <div className='item'>
                                <img alt='' src={formValue && formValue.img} />
                            </div>                  
                        </div>
                        <div className='image-main'>
                            {
                                edit === 'image' ?
                                    <ReactQuill 
                                    className='materialize-text-area' 
                                    modules={imageModule}
                                    formats={imageModule}
                                    id='content' 
                                    onChange={(e) => handleForm({
                                        ...formValue, 
                                        img: e.replace('<p>','')
                                              .replace('</p>', '')                                     
                                    })} 
                                    value={formValue && formValue.img}/>   
                                :  ( formValue.img.includes('<img src') ? parse(formValue.img) : <img src={formValue.img} alt=''/> )
                            } 
                            { edit === 'image' ? <FontAwesomeIcon icon={faSave} onClick={(e) => handleSave(e)}/> 
                                               : <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit('image')}/>  }        
                        </div>         
                    
                    </div>
                    {/* HANDLE IMAGE AREA END   */}

                    <div className='item-info'>

                        {/* HANDLE TITLE */}
                        <div className='item-title'>
                            { edit === 'name' ?
                                <div className='input-group'> 
                                    <input alt='' value={formValue.name} onChange={(e) => handleForm({...formValue, name: e.target.value})} />
                                </div> : formValue.name
                            }
                            { edit === 'name' ? <FontAwesomeIcon icon={faSave} onClick={(e) => handleSave(e)}/> 
                                              : <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit('name')}/>  }
                        </div>

                        {/* HANDLE MODEL */}
                        <div className='item-model'>Principais caracteristicas</div>
                        <ul>
                            <li>                                
                                { edit === 'model' ?
                                    <div className='input-group'> 
                                        <input alt='' value={formValue.model} onChange={(e) => handleForm({...formValue, model: e.target.value})} />
                                    </div> : <div style={{display: 'flex', alignItems: 'center'}}><label className='bullet'></label> {formValue.model}</div> 
                                }
                                { edit === 'model' ? <FontAwesomeIcon icon={faSave} onClick={(e) => handleSave(e)}/> 
                                                : <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit('model')}/>  }
                                                
                            </li>
                            {
                                formValue.details.map(item => (
                                    <li><div style={{display: 'flex', alignItems: 'center'}}><label className='bullet'></label> {item.detail_name}</div></li>
                                ))
                            }
                        </ul>
                        
                    </div>

                </div>
                
                {/* HANDLE DESC */}
                <div className='item-desc-title'>Sobre o produto</div>
                <div className='item-desc'>

                    { edit === 'description' ? 
                        <ReactQuill 
                            className='materialize-text-area' 
                            modules={Edit.modules}
                            formats={Edit.modules}
                            id='content' 
                            onChange={(e) => handleForm({...formValue, description: e})} 
                            value={formValue.description}/>   
                        : parse(formValue.description )  
                    }   
                    { edit === 'description' ? <FontAwesomeIcon icon={faSave} onClick={(e) => handleSave(e)}/> 
                                        : <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit('description')}/>  }               
                
                </div>
                {/* HANDLE DESC END */}

                {/* HANDLE CAT */}
                <div className='categorie'>
                    {formValue.categorie} : 
                </div>
                {/* HANDLE CAT END */}


             </div>
             <div className='footer-edit'>
                <button className='btn-orange-square' type='submit'>Registrar Produto</button>
            </div>  
        </form>
    )
}

export const imageModule = Edit.modules = {
    toolbar: [    
      ['image']  ,
    ]
}

Edit.modules = {
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
  
  Edit.formats = [
    'header', 'font', 'size' , 
    'bold' , 'italic' , 'underline' , 'strike' , 'blockquote' ,
    'list' , 'bullet' ,
    'link' , 'image' , 'video' , 'code-block'
  ]


export default Edit