import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { addCatalog , updateCatalog, deleteCatalog } from '../../web_config/actions/employeesActions'
import './style.scss'
import  FastBar  from '../organism/fastBar/fastBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom'

const Catalog = (props) => {

    const history = useHistory()
    const { auth } = props
    if(!auth.uid){ 
        history.push('/admin')
        window.location.reload()
    }


    const CATALOG = props.catalog
    const [ isEditing, handleEdit ] = useState('')
    const [ formValue , handleChange ] = useState({
        name: '',
        link: ''
    })
    

    const handleAdd = (e) => {
        e.preventDefault()
        props.addCatalog(formValue)
        handleChange({
            name: '',
            link: ''
        })
    }

    const handleUpdate = (e, id) => {
        e.preventDefault()
        props.updateCatalog({...isEditing})
        handleEdit('')
    }


    return (
        <div className='employees-admin'>   
            <FastBar/>  
        
            <div className='text-title'> Catálogos </div>
            <div className='text-desc'> Altere , remova ou delete novos catálogos de Distribuidores. </div>

            <form className='employees'>

                <div className='employees-add-group'>
                    <input name='name' value={formValue.name && formValue.name} placeholder='Distribuidor do Catáogo' onChange={(e) => handleChange({...formValue, name: e.target.value})}></input>
                    <input name='link' value={formValue.link && formValue.link} placeholder='Link para download do catálogo' onChange={(e) => handleChange({...formValue, link: e.target.value})}></input>
                    <div className='employees-action-group'>
                        <FontAwesomeIcon icon={faSave} onClick={(e) => handleAdd(e)} />
                    </div>
                </div>

                <div className='employees-list-header'>
                    <div>Nome</div>
                    <div>Link</div>
                    <div>Ações</div>
                </div>

                {
                    CATALOG && CATALOG.map((catalog, index) => {

                        return (
                            <div className='employees-list-group' key={index}>   

                                { isEditing.id === catalog.id  ?
                                    <>
                                        <input name='name' value={isEditing.name} 
                                               placeholder='Nome do funcionário' onChange={(e) => handleEdit({...isEditing, name: e.target.value})}></input>
                                        <input name='link' value={isEditing.catalog } 
                                               placeholder='Telefone' onChange={(e) => handleEdit({...isEditing, catalog: e.target.value})}></input>
                                    </> : <>
                                        <div className='name'>{catalog.name}</div>
                                        <div className='phone'>{catalog.link}</div>
                                    </>
                                }
                                <div className='employees-action-group'>
                                    { isEditing.id === catalog.id && <FontAwesomeIcon icon={faSave} onClick={(e) => handleUpdate(e, catalog.id)} /> }
                                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(catalog)} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => props.deleteCatalog(catalog.id) }/> 
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
        catalog: state.firestore.ordered.catalog
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        addCatalog: (catalog) => dispatch(addCatalog(catalog)),
        updateCatalog: (catalog) => dispatch(updateCatalog(catalog)),
        deleteCatalog: (catalog) => dispatch(deleteCatalog(catalog))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'catalog' }
    ])
)(Catalog)