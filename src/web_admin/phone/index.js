import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { addPhone , updatePhone, deletePhone } from '../../web_config/actions/employeesActions'
import './style.scss'
import  FastBar  from '../organism/fastBar/fastBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom'

const Phone = (props) => {


    const history = useHistory()
    const { auth } = props
    if(!auth.uid){ 
        history.push('/admin')
        window.location.reload()
    }


    const PHONE = props.phone
    const [ isEditing, handleEdit ] = useState('')
    const [ formValue , handleChange ] = useState({
        name: '',
        phone: ''
    })
    

    const handleAdd = (e) => {
        e.preventDefault()
        props.addPhone(formValue)
        handleChange({
            name: '',
            phone: ''
        })
    }

    const handleUpdate = (e, id) => {
        e.preventDefault()
        props.updatePhone({...isEditing})
        handleEdit('')
    }


    return (
        <div className='employees-admin'>   
            <FastBar/>  
        
            <div className='text-title'> Telefone Fixo </div>
            <div className='text-desc'> Altere , remova ou delete os telefones que devem aparece na lista de contato do site. </div>

            <form className='employees'>

                <div className='employees-add-group'>
                    <input name='name' value={formValue.name && formValue.name} placeholder='Nome do setor' onChange={(e) => handleChange({...formValue, name: e.target.value})}></input>
                    <input name='phone' value={formValue.phone && formValue.phone} placeholder='Telefone' onChange={(e) => handleChange({...formValue, phone: e.target.value})}></input>
                    <div className='employees-action-group'>
                        <FontAwesomeIcon icon={faSave} onClick={(e) => handleAdd(e)} />
                    </div>
                </div>

                <div className='employees-list-header'>
                    <div>Nome</div>
                    <div>Telefone</div>
                    <div>Ações</div>
                </div>

                {
                    PHONE && PHONE.map((phone, index) => {

                        return (
                            <div className='employees-list-group' key={index}>   

                                { isEditing.id === phone.id  ?
                                    <>
                                        <input name='name' value={isEditing.name} 
                                               placeholder='Nome do funcionário' onChange={(e) => handleEdit({...isEditing, name: e.target.value})}></input>
                                        <input name='phone' value={isEditing.phone } 
                                               placeholder='Telefone' onChange={(e) => handleEdit({...isEditing, phone: e.target.value})}></input>
                                    </> : <>
                                        <div className='name'>{phone.name}</div>
                                        <div className='phone'>{phone.phone}</div>
                                    </>
                                }
                                <div className='employees-action-group'>
                                    { isEditing.id === phone.id && <FontAwesomeIcon icon={faSave} onClick={(e) => handleUpdate(e, phone.id)} /> }
                                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(phone)} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => props.deletePhone(phone.id) }/> 
                                </div>
                            </div>
                        )
                    })
                }
                        


            </form>


        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
        phone: state.firestore.ordered.phone
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        addPhone: (phone) => dispatch(addPhone(phone)),
        updatePhone: (phone) => dispatch(updatePhone(phone)),
        deletePhone: (phone) => dispatch(deletePhone(phone))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'phone' }
    ])
)(Phone)