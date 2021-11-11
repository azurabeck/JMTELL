import { faChevronUp, faChevronDown, faMailBulk, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deleteCategorie } from '../../web_config/actions/categoriesAction'
import './style.scss'
import ADD_CLIENT from './AddInfo'

const Categories = (props) => {

    const CATEGORIE_DB = props.categorie
    const [ registerDialog , handleRegister ] = useState({open: false , editing: false})
    const [ preview , handlePreview ] = useState(false)

    return (
        <div className='categories'>      

            { registerDialog.open && <ADD_CLIENT isEditing={registerDialog.editing} click={() => handleRegister({open:  !registerDialog.open})}/> }
            <div className='fast-bar'> Clientes: 10  <FontAwesomeIcon icon={faMailBulk} /> </div>            
            <div className='title'> Categorias dos Produtos 
                                    <div className='button-orange'  onClick={() => handleRegister({ open:  !registerDialog.open, editing: false})} > REGISTRAR NOVA CATEGORIA </div> 
            </div>

            <div className='categorie-group'>

                {
                    CATEGORIE_DB && CATEGORIE_DB.map((item, index) => {

                        return (

                            <div className='categorie-block' key={index}>             
                                <div className='categorie-block-header' > 
                                    <div className='categorie-block-title'>{item.name}</div> 
                                    <FontAwesomeIcon icon={faTrash}  onClick={() => props.deleteCategorie(item.id)}/> 
                                    <FontAwesomeIcon icon={faPen}  onClick={() => handleRegister({ open:  !registerDialog.open, editing: item})}/> 
                                    <FontAwesomeIcon icon={preview[item.name] ? faChevronUp : faChevronDown}  onClick={() => handlePreview({[item.name]: !preview[item.name]})} /> 
                                </div>
            
                                {
                                    preview[item.name] && 
                                        <div className='categorie-block-sub'>
                                            {item.subcategorie && item.subcategorie.map((item, index) => ( 
                                                <div className='subcategorie-name' key={index}>{item.sub_name}</div>
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
        deleteCategorie: (categorie) => dispatch(deleteCategorie(categorie))
    }
}


export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([ { collection: 'categories' } ])
)(Categories)