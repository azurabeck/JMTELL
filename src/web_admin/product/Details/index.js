import React , { useState , useEffect } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ReactQuill from 'react-quill'
import parse from 'html-react-parser'
import 'react-quill/dist/quill.snow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faEdit, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { updateProcuct , deleteProcuct } from '../../../web_config/actions/productActions'
import './style.scss'
import ComboBoxCat from '../ComboBoxCat'

const Details = (props) => {

    //#region EDIT FUNCTIONS
    const [ formValue , handleForm ] = useState({ ...props.PRODUCT })
    const [ edit, handleEdit ] = useState('')
    const [ showImage, handleImagePv ] = useState(0)     


    const handleSave = () => {
        props.updateProcuct(formValue , props.PRODUCT_CATEGORIE)
        handleEdit('')
    }


    //#endregion

    //#region DETAILS FUNCTION

    const { PRODUCT , CLICK } = props
    const [ spotlightState , addSpotlight ] = useState(PRODUCT.spotlight)
    // const subCats = []

    // const category = PRODUCT.category
    // const details = PRODUCT.details
    const aditional = formValue.aditional ? formValue.aditional : PRODUCT.aditional
    const id = PRODUCT.id
    
    const handleSubmit = (e , spotlight) => {
        e.preventDefault()
        addSpotlight(spotlight)
        props.updateProcuct({...PRODUCT, spotlight})
    }
     
    const handleDelete = (e) => {
        e.preventDefault()
        props.deleteProcuct(id)
        CLICK()
    }

    // Object.keys(PRODUCT).forEach(key => {
    //     if (PRODUCT[key] === true) {
    //         if(key !== 'spotlight') subCats.push(key)
    //     }
    // });

    //#endregion


    return (
        <div className='product-details'>
            <div className='title'> Detalhes do Produto <div className='btn-close' onClick={CLICK}><FontAwesomeIcon icon={faTimes} /></div> </div>
           
            <div className='image'> 
                {
                    edit === 'image_0' &&
                    <>
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
                        
                        <div className='save-image'> 
                                    ATENÇÃO: Quando for fazer o upload da imagem, apague o link primeiro 
                                    <FontAwesomeIcon icon={faSave} onClick={(e) => handleSave(e)}/></div> 
                    </>                        
                }  

                {
                    edit === 'image_1' &&
                    <>
                        <ReactQuill 
                        className='materialize-text-area' 
                        modules={imageModule}
                        formats={imageModule}
                        id='content' 
                        onChange={(e) => handleForm({
                            ...formValue, 
                            img_1: e.replace('<p>','')
                                    .replace('</p>', '')                                     
                        })} 
                        value={formValue && formValue.img_1}/>  
                        
                        <div className='save-image'> 
                                    ATENÇÃO: Quando for fazer o upload da imagem, apague o link primeiro 
                                    <FontAwesomeIcon icon={faSave} onClick={(e) => handleSave(e)}/></div> 
                    </>                        
                } 

                {
                    edit === 'image_2' &&
                    <>
                        <ReactQuill 
                        className='materialize-text-area' 
                        modules={imageModule}
                        formats={imageModule}
                        id='content' 
                        onChange={(e) => handleForm({
                            ...formValue, 
                            img_2: e.replace('<p>','')
                                    .replace('</p>', '')                                     
                        })} 
                        value={formValue && formValue.img_2}/>  
                        
                        <div className='save-image'> 
                                    ATENÇÃO: Quando for fazer o upload da imagem, apague o link primeiro 
                                    <FontAwesomeIcon icon={faSave} onClick={(e) => handleSave(e)}/></div> 
                    </>                        
                } 

                
                {
                    edit === 'image_3' &&
                    <>
                        <ReactQuill 
                        className='materialize-text-area' 
                        modules={imageModule}
                        formats={imageModule}
                        id='content' 
                        onChange={(e) => handleForm({
                            ...formValue, 
                            img_3: e.replace('<p>','')
                                    .replace('</p>', '')                                     
                        })} 
                        value={formValue && formValue.img_3}/>  
                        
                        <div className='save-image'> 
                                    ATENÇÃO: Quando for fazer o upload da imagem, apague o link primeiro 
                                    <FontAwesomeIcon icon={faSave} onClick={(e) => handleSave(e)}/></div> 
                    </>                        
                }   

                { edit === '' && showImage === 0 && formValue.img 
                    ? formValue.img.includes('<img src') ? parse( formValue.img ) : <img src={ formValue.img } alt=''/> 
                    : null           
                }
                { edit === '' && showImage === 1 && formValue.img_1 
                    ? formValue.img_1.includes('<img src') ? parse( formValue.img_1 ) : <img src={ formValue.img_1 } alt=''/> 
                    : null           
                }
                { edit === '' && showImage === 2 && formValue.img_2
                    ? formValue.img_2.includes('<img src') ? parse( formValue.img_2 ) : <img src={ formValue.img_2 } alt=''/> 
                    : null           
                }
                { edit === '' && showImage === 3 && formValue.img_3 
                    ? formValue.img_3.includes('<img src') ? parse( formValue.img_3 ) : <img src={ formValue.img_3 } alt=''/> 
                    : null           
                }


                <div className='button-edit-group'>
                    Visualizando: imagem {showImage + 1} 
                    <FontAwesomeIcon icon={faChevronRight} onClick={() => handleImagePv(showImage === 3 ? 0 : showImage + 1)} />
                </div>
                <div className='button-edit-group'> Editar:  
                    <div onClick={() => handleEdit('image_0')}>Imagem: 1</div>
                    <div onClick={() => handleEdit('image_1')}>Imagem: 2</div>
                    <div onClick={() => handleEdit('image_2')}>Imagem: 3</div>
                    <div onClick={() => handleEdit('image_3')}>Imagem: 4</div>
                </div> 
            </div>           

            <div className='product-name'>
                { edit === 'name' ?
                    <div className='input-group'> 
                        <input alt='' value={formValue.name} onChange={(e) => handleForm({...formValue, name: e.target.value})} />
                    </div> : <strong> {formValue.name} </strong>
                }
                { edit === 'name' ? <FontAwesomeIcon icon={faSave} onClick={(e) => handleSave(e)}/> 
                                    : <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit('name')}/>  }
            </div>
            
            <div className='left-text'>                 

                 { edit === 'description' ? 
                        <ReactQuill 
                            className='materialize-text-area' 
                            modules={Details.modules}
                            formats={Details.modules}
                            id='content' 
                            onChange={(e) => handleForm({...formValue, description: e})} 
                            value={formValue.description}/>   
                        : parse(formValue.description )  
                    }   
                    { edit === 'description' ? <FontAwesomeIcon icon={faSave} onClick={(e) => handleSave(e)}/> 
                                        : <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit('description')}/>  }      
                 
            </div>

            {/* ADTIONAL INFO */}
                <strong className='left-text'> 
                    Informações de destaque: 
                    <FontAwesomeIcon icon={faPlus} onClick={() => handleForm({...formValue, aditional: [...aditional, {info_desc: ''}]  })}/>  
                </strong>
                <ul>
                    {
                        aditional && aditional.map((item, index) => {
                            return (
                                <li key={index}> 
                                    { edit === `aditional_${index}` 
                                        ?  <input alt='' value={formValue && formValue.info_desc} 
                                                onChange={(e) => handleForm({...formValue, aditional: {...aditional, [index]:{info_desc: e.target.value}}  })} /> 
                                        :  item.info_desc
                                    }
                                    { edit === `aditional_${index}` 
                                        ? <FontAwesomeIcon icon={faSave} onClick={(e) => handleSave(e)}/> 
                                        : <>
                                            <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(`aditional_${index}`)}/>  
                                            {/* <FontAwesomeIcon icon={faTrash} onClick={(e) => handleDeleteAditional(e, index)}/>   */}
                                        </>
                                    }  
                                </li>
                            )
                        })
                    }
                </ul>   
            {/* ADITIONAL INFO END */}

            {/* SPOTLIGH */}
            { spotlightState && <div className='spotlight' onClick={(e) => handleSubmit(e , !spotlightState)}>Em Destaque</div> }
            { spotlightState === false && <div className='spotlight-off' onClick={(e) => handleSubmit(e, !spotlightState)}>Destacar</div> }
            {/* SPOTLIGHT END */}

            <ComboBoxCat onClick={(e) => handleSave(e)} initialCat={props.PRODUCT.categorie} initialSub={props.PRODUCT.subCategories} />

            <div className='remove-btn' onClick={(e) => handleDelete(e)}>Deletar Produto</div>
            
        </div>
    )
}

Details.modules = {
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
  
  Details.formats = [
    'header', 'font', 'size' , 
    'bold' , 'italic' , 'underline' , 'strike' , 'blockquote' ,
    'list' , 'bullet' ,
    'link' , 'image' , 'video' , 'code-block'
  ]


export const imageModule = Details.modules = {
    toolbar: [    
      ['image']  ,
    ]
}


const mapStateToProps = (state) => {
    return {
        PRODUCT_SENT: state.product.PRODUCT_SENT,
        PRODUCT_CATEGORIE: state.product.productCategorie
    }
}


const mapDispatchToProps = (dispatch) => {
return {
    updateProcuct: (product , categorie) => dispatch(updateProcuct(product , categorie)),
    deleteProcuct: (product) => dispatch(deleteProcuct(product))
}
}

export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([ { collection: 'categories' } ])
)(Details)