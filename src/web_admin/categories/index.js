import { faChevronUp, faChevronDown, faMailBulk, faPen, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deleteCategorie , updateCategorie } from '../../web_config/actions/categoriesAction'
import './style.scss'
import ADD_CLIENT from './AddInfo'
import  FastBar  from '../organism/fastBar/fastBar'
import  { camelCase } from 'lodash'

const Categories = (props) => {

    const CATEGORIE_DB = props.categorie
    
    // SHOW "REGISTRAR NOVA CATEGORIA" MODAL
    const [ registerDialog , handleRegister ] = useState({open: false , editing: false})

    // SHOW DETAILS FROM CATEGORIE
    const [ preview , handlePreview ] = useState(false)

    // DISPLAY INPUT, CHANGE INPUT VALUE, UPDATE CAT INFORMATION
    const [ displayInput , handleInput ] = useState(false)
    const [ inputValue , changeInput ] = useState('')
    const [ catActive , getCatInfo ] = useState()


     const handleAddSub = () => {

        const getCategorie = catActive.name        
        const input = {
            categorie: getCategorie, 
            tag:  camelCase(inputValue.trim()), 
            sub_name: inputValue
        }
         
        if(inputValue === '') {
            alert('É obrigatório preencher o campo com o nome da subcategoria')
        } else {
            props.updateCategorie({ ...catActive, subcategorie: [ ...catActive.subcategorie , input] }) 
            getCatInfo({ ...catActive, subcategorie: [ ...catActive.subcategorie , input] }) 
            changeInput('')
            handleInput(false)
        }

    }

    const handleDeleteSub = (e, value) => {
        e.preventDefault()
        const getSubcategorie = catActive.subcategorie   
        const newValue = getSubcategorie.filter(item => item.tag !== value)
        
        props.updateCategorie({ ...catActive, subcategorie: newValue }) 
        getCatInfo({ ...catActive, subcategorie: newValue }) 

    }

    const clearInput = (e) => {
        e.preventDefault()
        changeInput('')
        handleInput(false)
    }


    return (
        <div className='categories'>      

            { registerDialog.open && <ADD_CLIENT isEditing={registerDialog.editing} click={() => handleRegister({open:  !registerDialog.open})}/> }
            <FastBar/>          
            <div className='title'> Categorias dos Produtos 
                                    <div className='button-orange'  onClick={() => handleRegister({ open:  !registerDialog.open, editing: false})} > REGISTRAR NOVA CATEGORIA </div> 
            </div>

            <div className='categorie-group'>

                {
                    CATEGORIE_DB && CATEGORIE_DB.map((item, index) => {

                        return (

                            <div className='categorie-block' key={index}>             
                                <div className='categorie-block-header' onClick={() => getCatInfo(item)} > 
                                    <div className='categorie-block-title'>{item.name}</div> 
                                    <FontAwesomeIcon icon={faTrash}  onClick={() => props.deleteCategorie(item.id)}/> 
                                    {/* <FontAwesomeIcon icon={faPen}  onClick={() => handleRegister({ open:  !registerDialog.open, editing: item})}/>  */}
                                    <FontAwesomeIcon icon={preview[item.name] ? faChevronUp : faChevronDown}  onClick={() => handlePreview({[item.name]: !preview[item.name]})} /> 
                                </div>
            
                                {
                                    preview[item.name] && 
                                        <div className='categorie-block-sub' >
                                            { !displayInput && <div className='subcategorie-add'onClick={() => handleInput(true)}> + adicionar nova subcategoria </div> }
                                            { displayInput &&
                                                <div className='subcategorie-input'>
                                                    <input value={inputValue && inputValue} placeholder='Digite o nome da subcategoria' 
                                                           onChange={(e) => changeInput(e.target.value)} />
                                                    <div>
                                                        <FontAwesomeIcon icon={faSave} onClick={(e) => handleAddSub(e)} />
                                                        <FontAwesomeIcon icon={faTrash} onClick={(e) => clearInput(e) } />
                                                    </div>
                                                </div>
                                            }

                                            {item.subcategorie && item.subcategorie.map((item, index) => ( 
                                                <div className='subcategorie-name' key={index}>
                                                    {item.sub_name}

                                                    <div>
                                                        {/* <FontAwesomeIcon icon={faEdit} onClick={(e) => handleAddSub(e)} /> */}
                                                        <FontAwesomeIcon icon={faTrash} onClick={(e) => handleDeleteSub(e, item.tag) } />
                                                    </div>
                                                </div>
                                            ))}
                                        </div> 
                                }
            
                            </div>
                    )})
                }
                
            </div>

        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
       categorie: state.firestore.ordered.categories
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        deleteCategorie: (categorie) => dispatch(deleteCategorie(categorie)),
        updateCategorie: (categorie) => dispatch(updateCategorie(categorie))
    }
}


export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([ { collection: 'categories' } ])
)(Categories)