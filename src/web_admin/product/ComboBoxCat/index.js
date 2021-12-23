import React , {useState} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faSave } from '@fortawesome/free-solid-svg-icons'
import { setProductCategorie } from '../../../web_config/actions/productActions'
import { forEach } from 'lodash'


const ComboBoxCat = (props) => {


    const CATEGORIES = props.categorie

    const [ open, handleComboBoxDisplay ] = useState(false)
    const [ current , handleOption ] = useState('')
    const [ current_sub , handleOptionSub ] = useState({
        categorie: [],
        subCategories: []
    })

    const updateCatClient = (item) => {
        const filterSubCat = current_sub.subCategories.includes(item) 
                                ? current_sub.subCategories.filter(sub => sub !== item)
                                :  [...current_sub.subCategories, item]
 
        const checkSub = filterSubCat.map(item => item.categorie)
        let filterCat = [...new Set(checkSub)];


        handleOptionSub({
            categorie: filterCat,
            subCategories: filterSubCat
        })
    }

    return (
        <div className='combo-box-cat'>
            <div className='combo-box-active' onClick={() => handleComboBoxDisplay(!open)}> 
                {current ? current : 'Selecione a categoria:'} <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown}/> 
            </div>

            {
                open && <div className='combo-box-container'>
                    <div className='btn-area' onClick={() => props.setProductCategorie(current_sub)}> Clique para salvar a seleção <FontAwesomeIcon icon={ faSave }/> </div>
                    {
                        CATEGORIES && CATEGORIES.map((item , i) => (            
                            <>               
                            <div key={i} className={`combo-box-option ${current && 'active'}`} onClick={() => handleOption('optionValue')}>
                                {item.name}
                            </div>                            
                            
                            { 
                                    item.subcategorie && item.subcategorie.map((subcat, i) => {
                                        return (                                                                    
                                        <div key={i} className={`combo-box-suboption`} onClick={() => updateCatClient(subcat)} >
                                            <label className={`checkbox ${current_sub.subCategories.includes(subcat) ? 'active' : ''}`}></label>  {subcat.sub_name}
                                        </div>
                                    )})

                                }
                            </> 
                        ))
                    }
                </div>
            }

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
    setProductCategorie: (productCategorie) => dispatch(setProductCategorie(productCategorie))
}}

export default compose(
    connect(mapStateToProps , mapDispatchToProps),
    firestoreConnect([ { collection: 'categories' } ])
)(ComboBoxCat)