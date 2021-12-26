import React , { useState } from 'react'
import { createProcuct } from '../../../web_config/actions/productActions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faTimes, faSave } from '@fortawesome/free-solid-svg-icons'
import parse from 'html-react-parser'
import ReactQuill from 'react-quill'
import ComboBoxCat from '../ComboBoxCat'

const AddClient = ( props ) => {

    const click = props.click
    const [ formData, getForm ] = useState({
        name: '',
        description: '',
        info_desc: '',
        img: '',
        img_1: '',
        img_2: '',
        img_3: '',
        spotlight: false,
        categorie: '',
        subCategories: '',
    })
    const [edit, handleEdit] = useState('image_0')


    const handleSubmit = (e) => {       
        e.preventDefault()        
        props.createProcuct(formData , props.PRODUCT_CATEGORIE)
        props.click()
    }

    return (
        <div className='add-info'>

                <div className='title'>Registrar Produto <div className='btn-close' onClick={click}><FontAwesomeIcon icon={faTimes} /></div> </div>

                <form className='contact-form-group' onSubmit={(e) => handleSubmit(e)}>
                        
                        <input placeholder='Nome' required onChange={(e) => getForm({...formData, name: e.target.value })} ></input>
                        <div className='checkbox-group'>
                            <input type="checkbox" checked={formData.spotlight}  onChange={e => getForm({...formData, spotlight: !formData.spotlight })} />
                            <label>Destacar Produto</label>
                        </div>


                        <div className='image'> 

                            <div className='button-edit-group'> Adicionar Imagem:  
                                <div className={edit === 'image_0' && 'active'} onClick={() => handleEdit('image_0')}> 1</div>
                                <div className={edit === 'image_1' && 'active'} onClick={() => handleEdit('image_1')}> 2</div>
                                <div className={edit === 'image_2' && 'active'} onClick={() => handleEdit('image_2')}> 3</div>
                                <div className={edit === 'image_3' && 'active'} onClick={() => handleEdit('image_3')}> 4</div>
                            </div>      

                            { edit === 'image_0' &&
                                <ReactQuill 
                                className='materialize-text-area' 
                                modules={imageModule}
                                formats={imageModule}
                                id='content' 
                                onChange={(e) => getForm({
                                    ...formData, 
                                    img: e.replace('<p>','')
                                            .replace('</p>', '')                                     
                                })} 
                                value={formData && formData.img}/>  
                            }

                            { edit === 'image_1' &&
                                <ReactQuill 
                                className='materialize-text-area' 
                                modules={imageModule}
                                formats={imageModule}
                                id='content' 
                                onChange={(e) => getForm({
                                    ...formData, 
                                    img_1: e.replace('<p>','')
                                            .replace('</p>', '')                                     
                                })} 
                                value={formData && formData.img_1}/>  
                            }
                            { edit === 'image_2' &&
                                <ReactQuill 
                                className='materialize-text-area' 
                                modules={imageModule}
                                formats={imageModule}
                                id='content' 
                                onChange={(e) => getForm({
                                    ...formData, 
                                    img_2: e.replace('<p>','')
                                            .replace('</p>', '')                                     
                                })} 
                                value={formData && formData.img_2}/>  
                            }
                            { edit === 'image_3' &&
                                <ReactQuill 
                                className='materialize-text-area' 
                                modules={imageModule}
                                formats={imageModule}
                                id='content' 
                                onChange={(e) => getForm({
                                    ...formData, 
                                    img_3: e.replace('<p>','')
                                            .replace('</p>', '')                                     
                                })} 
                                value={formData && formData.img_3}/>   
                            }

                            <div className='obs'>
                                Atenção, utilize o upload da imagem, ou o link. Nunca utilize os dois ao mesmo tempo. 
                            </div>

                        </div>           


                        <strong className='left-text'>  Informações de destaque:   </strong>
                         <div className='rich-text-area'>
                       
                                <ReactQuill 
                                    className='materialize-text-area' 
                                    modules={props.SPOT_INFO}
                                    formats={props.SPOT_INFO}
                                    id='content' 
                                    onChange={(e) => getForm({...formData, info_desc: e})} 
                                    value={formData.info_desc && formData.info_desc}/>   
                            

                        </div>   

                        
                        <strong className='left-text'> Detalhes do produto:</strong> 
                        <div className='rich-text-area'>       
                            <ReactQuill 
                                className='materialize-text-area' 
                                modules={props.moduleDefault}
                                formats={props.formatDefault}
                                id='content' 
                                onChange={(e) => getForm({...formData, description: e})} 
                                value={formData.description}/>  
                        </div> 
                        
                        <ComboBoxCat onClick={(e) => handleSubmit(e)} initialCat='Selecione a Categoria' initialSub={null} />


                        <div className='btn-area'> <button className='btn-orange-square' type='submit'>Registrar Produto</button> </div>
                        
                    </form>



        </div>
    )
}

export const SPOT_INFO = AddClient.modules = {
    toolbar: [    
        [{'header' : '1'}, {'header' : '2'}, {'font' : []}]  ,
        [{'size' : []}]  ,
        ['bold' , 'italic' , 'underline' , 'strike' , 'bloquote']  ,
        [{'list' : 'ordered'} , {'list' : 'bullet'}]  ,
        ['link']  ,
        ['clean'] ,
        ['code-block']
    ]
}

export const moduleDefault = AddClient.modules = {
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
  
  export const formatDefault =  AddClient.formats = [
    'header', 'font', 'size' , 
    'bold' , 'italic' , 'underline' , 'strike' , 'blockquote' ,
    'list' , 'bullet' ,
    'link' , 'image' , 'video' , 'code-block'
  ]


export const imageModule = AddClient.modules = {
    toolbar: [    
      ['image']  ,
    ]
}

const mapStateToProps = (state) => {
    return {        
        categorie: state.firestore.ordered.categories,
        PRODUCT_SENT: state.product.PRODUCT_SENT,
        PRODUCT_CATEGORIE: state.product.productCategorie
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createProcuct: (product) => dispatch(createProcuct(product))
    }
}

export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([ { collection: 'categories' } ])
)(AddClient)