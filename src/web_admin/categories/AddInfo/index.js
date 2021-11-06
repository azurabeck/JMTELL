import React , { useState } from 'react'
import { createCategorie } from '../../../web_config/actions/categoriesAction'
import { connect } from 'react-redux'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const AddCategorie = ( props ) => {

    const click = props.click
    const IS_EDITING = props.isEditing

    console.log(IS_EDITING.subcategorie)

    const [ formData, getForm ] = useState({
        name: '',
        subcategorie: null
    })
    const [formValues, setFormValues] = useState([ IS_EDITING ?
        IS_EDITING.subcategorie.map(item => item)  : { sub_name: '' } ])

    let handleCategorieChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        getForm({...formData, subcategorie: formValues })
     }
        
    let addSubCategoriFormFields = () => {
        setFormValues([...formValues, {sub_name: ""}])
     }

     let removeDetailsFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const handleSubmit = (e) => {       
        e.preventDefault()        
        props.createCategorie(formData)
        props.click()
    }

    console.log(formValues)


    return (
        <div className='add-categorie'>

                <div className='title'>{IS_EDITING ? 'Editar' : 'Registrar'} Categoria <div className='btn-close' onClick={click}><FontAwesomeIcon icon={faTimes} /></div> </div>

                <form className='contact-form-group' onSubmit={(e) => handleSubmit(e)}>
                        
                        <input placeholder='Nome' value={IS_EDITING ? IS_EDITING.name : null} required onChange={(e) => getForm({...formData, name: e.target.value })} ></input>

                        <div className='subcategoria-group'>
                            <div className='title'> Subcategoria  <div className='add-subcategoria'  onClick={() => addSubCategoriFormFields()}>Adicionar</div> </div> 

                            {
                                formValues.map((element, index) => {

                                    return(
                                        <>
                                            {   !IS_EDITING &&
                                                    <div className='subcategoria-field'>                                                        
                                                        <input className='subcategoria_name' name='sub_name'
                                                                    placeholder='Nome' onChange={e => handleCategorieChange(index, e)} />       

                                                        {
                                                            index ? 
                                                            <button type="button"  className="button remove" onClick={() => removeDetailsFormFields(index)}>x</button> 
                                                            : null
                                                        }
                                                    </div>

                                            }

                                            { IS_EDITING && element.map((item, index) => (
                                                    <div className='subcategoria-field'>   
                                                        <input className='subcategoria_name' name='sub_name' value={item.sub_name}
                                                            placeholder='Nome' onChange={e => handleCategorieChange(index, e)} />    
                                                        {
                                                            index ? 
                                                            <button type="button"  className="button remove" onClick={() => removeDetailsFormFields(index)}>x</button> 
                                                            : null
                                                        }
                                                    </div> 
                                                ))
                                            }
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
        createCategorie: (categorie) => dispatch(createCategorie(categorie))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategorie)