import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { addEmployees , updateEmployees, deleteEmployees } from '../../web_config/actions/employeesActions'
import './style.scss'
import  FastBar  from '../organism/fastBar/fastBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

const Employees = (props) => {


    const EMPLOYEES = props.employees
    const [ isEditing, handleEdit ] = useState('')
    const [ formValue , handleChange ] = useState({
        name: '',
        phone: ''
    })
    

    const handleAdd = (e) => {
        e.preventDefault()
        props.addEmployees(formValue)
        handleChange({
            name: '',
            phone: ''
        })
    }

    const handleUpdate = (e, id) => {
        e.preventDefault()
        props.updateEmployees({...isEditing})
        handleEdit('')
    }


    return (
        <div className='employees-admin'>   
            <FastBar/>  
        
            <div className='text-title'> Funcionários </div>
            <div className='text-desc'> Altere , remova ou delete os funcionários que devem aparece na lista de contato do site. </div>

            <form className='employees'>

                <div className='employees-add-group'>
                    <input name='name' value={formValue.name && formValue.name} placeholder='Nome do funcionário' onChange={(e) => handleChange({...formValue, name: e.target.value})}></input>
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
                    EMPLOYEES && EMPLOYEES.map((emp, index) => {

                        return (
                            <div className='employees-list-group' key={index}>   

                                { isEditing.id === emp.id  ?
                                    <>
                                        <input name='name' value={isEditing.name} 
                                               placeholder='Nome do funcionário' onChange={(e) => handleEdit({...isEditing, name: e.target.value})}></input>
                                        <input name='phone' value={isEditing.phone } 
                                               placeholder='Telefone' onChange={(e) => handleEdit({...isEditing, phone: e.target.value})}></input>
                                    </> : <>
                                        <div className='name'>{emp.name}</div>
                                        <div className='phone'>{emp.phone}</div>
                                    </>
                                }
                                <div className='employees-action-group'>
                                    { isEditing.id === emp.id && <FontAwesomeIcon icon={faSave} onClick={(e) => handleUpdate(e, emp.id)} /> }
                                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(emp)} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => props.deleteEmployees(emp.id) }/> 
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
        employees: state.firestore.ordered.employees
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        addEmployees: (network) => dispatch(addEmployees(network)),
        updateEmployees: (network) => dispatch(updateEmployees(network)),
        deleteEmployees: (network) => dispatch(deleteEmployees(network))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'employees' }
    ])
)(Employees)