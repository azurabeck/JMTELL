import React , { useState } from 'react'
import { createCategorie , updateCategorie } from '../../../web_config/actions/categoriesAction'
import { connect } from 'react-redux'
import  { camelCase } from 'lodash'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const AddCategorie = ( props ) => {

    const click = props.click
    const IS_EDITING = props.isEditing

    const [ formData, getForm ] = useState({
        id: IS_EDITING ? IS_EDITING.id : null,
        name: IS_EDITING ? IS_EDITING.name : '',
        subcategorie: IS_EDITING ? IS_EDITING.subcategorie : {}
    })
    const [formValues, setFormValues] = useState([ IS_EDITING ? IS_EDITING.subcategorie  : { sub_name: '' , categorie: formData.name && formData.name , tag: ''} ])

    // let handleFieldUpdate = ( i , newValue ) => {
    //     const formNewValue = { 
    //                            categorie: formData.name && formData.name.toLowerCase(),
    //                            sub_name: newValue,
    //                            tag: newValue.trim(),
    //                          }                                  
    //     const data = { ...formData.subcategorie , 
    //                    [i]: formNewValue }           
    //     getForm({...formData , subcategorie: data })
    // }


    let handleCategorieChange = (i, e) => {          
        let camelCaseForm = [...formValues];  
        let newFormValues = [...formValues];
        
        newFormValues[i]['sub_name'] = e.target.value;  
        camelCaseForm[i]['tag'] = camelCase(e.target.value.trim())  

        setFormValues(newFormValues , camelCaseForm);
        getForm({...formData, subcategorie: formValues , categorie: formData.name })
     }
        
    let addSubCategoriFormFields = () => {
        setFormValues([...formValues, {sub_name: "" , tag: '', categorie: formData.name && formData.name}])
     }

     let removeDetailsFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const handleSubmit = (e) => {       
        e.preventDefault()        
        if( IS_EDITING ) { props.updateCategorie(formData) }
        else { props.createCategorie(formData) }
        props.click()
    }

    return (
        <div className='add-categorie'>

                <div className='title'>{IS_EDITING ? 'Editar' : 'Registrar'} Categoria <div className='btn-close' onClick={click}><FontAwesomeIcon icon={faTimes} /></div> </div>

                <form className='contact-form-group' onSubmit={(e) => handleSubmit(e)}>
                        
                        <input placeholder='Nome' value={IS_EDITING ? IS_EDITING.name : null} required onChange={(e) => getForm({...formData, name: e.target.value })} ></input>

                        <div className='subcategoria-group'>
                            <div className='title'> Subcategoria  <div className='add-subcategoria'  onClick={() => addSubCategoriFormFields()}>Adicionar</div> </div> 

                            {
                                formValues && formValues.map((element, index) => {

                                    return(
                                        <>
                                            {   !IS_EDITING &&
                                                    <div className='subcategoria-field'>                                                        
                                                        <input className='subcategoria_name' name='sub_name'
                                                                    placeholder='Nome' onChange={ e => handleCategorieChange(index, e) } />       

                                                        {
                                                            index ? 
                                                            <button type="button"  className="button remove" onClick={() => removeDetailsFormFields(index)}>x</button> 
                                                            : null
                                                        }
                                                    </div>

                                            }

                                            {/* { IS_EDITING && element && element.map((item, index) => (
                                                    <div className='subcategoria-field'>   
                                                        <input className='subcategoria_name' name='sub_name' value={formData.subcategorie[index].sub_name}
                                                            placeholder='Nome' onChange={ e => handleFieldUpdate(index , e.target.value) } />    
                                                        {
                                                            index ? 
                                                            <button type="button"  className="button remove" onClick={() => removeDetailsFormFields(index)}>x</button> 
                                                            : null
                                                        }
                                                    </div> 
                                                ))
                                            } */}
                                        </>

                                )})
                            }




                        </div>                
             

                        <div className='btn-area'> <button className='btn-orange-square' type='submit'>{IS_EDITING ? 'Salvar Edição' : 'Registrar Categoria'}</button> </div>
                        
                    </form>



        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        CATEOGORIE_SENT: state.categorie.CATEOGORIE_SENT
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateCategorie: (categorie) => dispatch(updateCategorie(categorie)),
        createCategorie: (categorie) => dispatch(createCategorie(categorie))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategorie)