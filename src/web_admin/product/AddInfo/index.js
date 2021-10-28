import React , { useState } from 'react'
import { createProcuct } from '../../../web_config/actions/productActions'
import { connect } from 'react-redux'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const AddClient = ( props ) => {

    const click = props.click
    const [ formData, getForm ] = useState({
        name: '',
        description: '',
        details: [{ detail_name: "", detail_info : ""}],
        aditional: '',
        model: '',
    })
    const [formValues, setFormValues] = useState([{detail_name: "", detail_desc: ""}])
    const [formInfoValues, setInfoFormValues] = useState([{info_name: "", info_desc: ""}])


    let handleDetailsChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        getForm({...formData, details: formValues})
     }
     let handleInfoChange = (i, e) => {
        let newFormValues = [...formInfoValues];
        newFormValues[i][e.target.name] = e.target.value;
        setInfoFormValues(newFormValues);
        getForm({...formData, aditional: formInfoValues})
     }

        
    let addDetailsFormFields = () => {
        setFormValues([...formValues,{detail_name: "", detail_desc: "" }])
     }
     let addInfoFormFields = () => {
        setInfoFormValues([...formInfoValues,{info_name: "", info_desc: "" }])
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

    const handleSubmit = (e) => {       
        e.preventDefault()        
        props.createProcuct(formData)
        props.click()
    }


    console.log(formData)

    return (
        <div className='add-info'>

                <div className='title'>Registrar Produto <div className='btn-close' onClick={click}><FontAwesomeIcon icon={faTimes} /></div> </div>

                <form className='contact-form-group' onSubmit={(e) => handleSubmit(e)}>
                        
                        <input placeholder='Nome' required onChange={(e) => getForm({...formData, name: e.target.value })} ></input>
                        <textarea placeholder='Descrição do produto' required onChange={(e) => getForm({...formData, description: e.target.value})}></textarea>
                        <input placeholder='Modelo / Marca' required onChange={(e) => getForm({...formData, model: e.target.value})}></input>

                        <div className='details-group'>
                            <div className='title'> Detalhes Tecnicos  <div className='add-details'  onClick={() => addDetailsFormFields()}>Adionar</div> </div>   
                            {formValues.map((element, index) => (
                                    <div className='details-field'>
                                        <input className='detail_name' name='detail_name' placeholder='Nome'onChange={e => handleDetailsChange(index, e)} />
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
                            <div className='title'> Informações Adicionais  <div className='add-details'  onClick={() => addInfoFormFields()}>Adionar</div> </div>   
                            {formInfoValues.map((element, index) => (
                                    <div className='details-field'>
                                        <input className='detail_name' name='detail_name' placeholder='Nome'onChange={e => handleInfoChange(index, e)} />
                                        <input className='detail_desc' name='detail_desc' placeholder='Descrição'  onChange={e => handleInfoChange(index, e)} />


                                        {
                                            index ? 
                                            <button type="button"  className="button remove" onClick={() => removeInfoFormFields(index)}>x</button> 
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
        PRODUCT_SENT: state.product.PRODUCT_SENT
    }
}


const mapDispatchToProps = (dispatch) => {
return {
    createProcuct: (product) => dispatch(createProcuct(product))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient)