import React , { useState } from 'react'
import { createProcuct } from '../../../web_config/actions/productActions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const AddClient = ( props ) => {

    const CATEGORIES = props.categorie
    const click = props.click
    const [ formData, getForm ] = useState({
        name: '',
        description: '',
        details: [{ detail_name: "", detail_info : ""}],
        aditional: [{ info_desc: "" }],       
        model: '',
        img: '',
        spotlight: true,
    })
    const [formValues, setFormValues] = useState([{detail_name: "", detail_desc: ""}])
    const [formInfoValues, setInfoFormValues] = useState([{ info_desc: ""}])
    const [formCatValues, setCatFormValues] = useState([])

    let handleDetailsChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        getForm({...formData, details: formValues })
     }
     let handleInfoChange = (i, e) => {
        let newFormValues = [...formInfoValues];
        newFormValues[i][e.target.name] = e.target.value;
        setInfoFormValues(newFormValues);
        getForm({...formData, aditional: formInfoValues })
     }
     let handleCatChange = (i, e) => {
        getForm({...formData, [e.target.value]: true })
     }

        
    let addDetailsFormFields = () => {
        setFormValues([...formValues,{detail_name: "", detail_desc: "" }])
     }
     let addInfoFormFields = () => {
        setInfoFormValues([...formInfoValues, { info_desc: "" }])
     }
     let addCatFormFields = () => {
        setCatFormValues([...formCatValues , {} ])
     }


     let removeDetailsFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    let removeInfoFormFields = (i) => {
        let newFormValues = [...formInfoValues];
        newFormValues.splice(i, 1);
        setInfoFormValues(newFormValues)
    }
    let removeCatFormFields = (i) => {
        let newFormValues = [...formCatValues];
        newFormValues.splice(i, 1);
        setCatFormValues(newFormValues)
    }


    const handleSubmit = (e) => {       
        e.preventDefault()        
        props.createProcuct(formData)
        props.click()
    }

    return (
        <div className='add-info'>

                <div className='title'>Registrar Produto <div className='btn-close' onClick={click}><FontAwesomeIcon icon={faTimes} /></div> </div>

                <form className='contact-form-group' onSubmit={(e) => handleSubmit(e)}>
                        
                        <input placeholder='Nome' required onChange={(e) => getForm({...formData, name: e.target.value })} ></input>
                        <textarea placeholder='Descrição do produto' required onChange={(e) => getForm({...formData, description: e.target.value})}></textarea>
                        <input placeholder='Modelo / Marca' required onChange={(e) => getForm({...formData, model: e.target.value})}></input>
                        <input placeholder='Link da imagem' required onChange={(e) => getForm({...formData, img: e.target.value })} ></input>

                        <div className='checkbox-group'>
                            <input type="checkbox" checked={formData.spotlight}  onChange={e => getForm({...formData, spotlight: !formData.spotlight })} />
                            <label>Destacar Produto</label>
                        </div>

                        <div className='details-group'>
                            <div className='title'> Detalhes Tecnicos  <div className='add-details'  onClick={() => addDetailsFormFields()}>Adicionar</div> </div>   
                            {formValues.map((element, index) => (
                                    <div className='details-field'>
                                        <input className='detail_name' name='detail_name' placeholder='Nome'onChange={e => handleDetailsChange(index , e)} />
                                        <input className='detail_desc' name='detail_desc' placeholder='Descrição'  onChange={e => handleDetailsChange(index, e)} />


                                        {
                                            index ? 
                                            <button type="button"  className="button remove" onClick={() => removeDetailsFormFields(index)}>x</button> 
                                            : null
                                        }
                                    </div>
                                ))
                            }
                        </div>                
                        

                        <div className='details-group'>
                            <div className='title'> Informações Adicionais  <div className='add-details'  onClick={() => addInfoFormFields()}>Adicionar</div> </div>   
                            {formInfoValues.map((element, index) => (
                                    <div className='details-field'>
                                        <input className='cat_desc' name='info_desc' placeholder='Descrição'  onChange={e => handleInfoChange(index, e)} />


                                        {
                                            index ? 
                                            <button type="button"  className="button remove" onClick={() => removeInfoFormFields(index)}>x</button> 
                                            : null
                                        }
                                    </div>
                                ))
                            }
                        </div>

                            <div className='details-group'>
                            <div className='title'> Categorias <div className='add-details'  onClick={() => addCatFormFields()}>Adicionar</div> </div>   
                            {formCatValues.map((element, index) => (
                                    <div className='details-field'>                                        
                                            <select name='cat_desc' placeholder='Nome' onChange={e => handleCatChange(index,  e)}>
                                                {
                                                    CATEGORIES && CATEGORIES.map((item, index) => {
                                                        console.log(item)
                                                        return (
                                                            <>
                                                            <option selected disabled key={index}>{item.name}</option>
                                                            {
                                                                item.subcategorie && item.subcategorie.map((subcat, index) => (                                                                    
                                                                    <option value={subcat.tag} key={index}>{subcat.sub_name}</option>
                                                                ))

                                                            }
                                                            </>
                                                        )
                                                    })
                                                }
                                            </select>

                                        {
                                            index ? 
                                            <button type="button"  className="button remove" onClick={() => removeCatFormFields(index)}>x</button> 
                                            : null
                                        }
                                    </div>
                                ))
                            }
                        </div>                 

                        <div className='btn-area'> <button className='btn-orange-square' type='submit'>Registrar Produto</button> </div>
                        
                    </form>



        </div>
    )
}

const mapStateToProps = (state) => {
    return {        
        categorie: state.firestore.ordered.categories,
        PRODUCT_SENT: state.product.PRODUCT_SENT
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