import React , { useState } from 'react'
import { createProvider } from '../../../web_config/actions/providerActions'
import { connect } from 'react-redux'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const AddCategorie = ( props ) => {

    const click = props.click

    const [ formData, getForm ] = useState({
        id:    '',
        name: '',
        img: '',
        link: '',
    })

    const handleSubmit = (e) => {       
        e.preventDefault()        
        props.createProvider(formData)
        props.click()
    }

    return (
        <div className='add-provider'>

                <div className='title'>Novo distribuidor <div className='btn-close' onClick={click}><FontAwesomeIcon icon={faTimes} /></div> </div>

                <form className='contact-form-group' onSubmit={(e) => handleSubmit(e)}>

                        <div className='img-block' style={{background: `url(${formData.link})`}}> </div> 
                        <input placeholder='Imagem' required onChange={(e) => getForm({...formData, img: e.target.value })}/>       
                        <input placeholder='Nome' required onChange={(e) => getForm({...formData, name: e.target.value })} ></input>
                        <input placeholder='Site da empreaa' onChange={(e) => getForm({...formData, link: e.target.value })} ></input>
             

                        <div className='btn-area'> <button className='btn-orange-square' type='submit'>Registrar Distribuidor</button> </div>
                        
                </form>



        </div>
    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        createProvider: (provider) => dispatch(createProvider(provider))
    }
}

export default connect(null, mapDispatchToProps)(AddCategorie)