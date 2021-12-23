import React , {useState , useEffect} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faSave } from '@fortawesome/free-solid-svg-icons'
import { setProductCategorie } from '../../../web_config/actions/productActions'


const ComboBoxCat = (props) => {

    const CATEGORIES = props.categorie
    const { initialCat , initialSub } = props

    const [ open, handleComboBoxDisplay ] = useState(false)
    const [ current_sub , handleOptionSub ] = useState({
        categorie: initialCat ? initialCat : [],
        subCategories: initialSub ? initialSub : []
    })

    const handleSave = (e) => {
        e.preventDefault()
        props.onClick()
        handleComboBoxDisplay(false)
    }

    const updateCatClient = (item) => {
        let filterSubCat 

        if(current_sub.subCategories.includes(item)) {
            console.log('normal')
            filterSubCat = current_sub.subCategories.filter(sub => sub !== item)

        } else if( current_sub.subCategories.map(current => current.sub_name).includes(item.sub_name) ){
            console.log('situação 2')
            filterSubCat = current_sub.subCategories.map(current => current).filter(sub => sub.sub_name !== item.sub_name )

        } else {
            console.log('ja era')
            filterSubCat = [...current_sub.subCategories, item]
        }
 
        const checkSub = filterSubCat.map(item => item.categorie)
        let filterCat = [...new Set(checkSub)];

        handleOptionSub({
            categorie: filterCat,
            subCategories: filterSubCat
        })
    }

    useEffect(() => {
        props.setProductCategorie(current_sub)
    }, [current_sub, props]);

    return (
        <div className='combo-box-cat'>
            <div className='combo-box-active' onClick={() => handleComboBoxDisplay(!open)}> 
                {current_sub.categorie ? current_sub.categorie : 'Selecione a categoria:'} <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown}/> 
            </div>

            {
                open && <div className='combo-box-container'>
                    <div className='btn-area' onClick={(e) => handleSave(e)}> Clique para salvar a seleção <FontAwesomeIcon icon={ faSave }/> </div>
                    {
                        CATEGORIES && CATEGORIES.map((item , i) => (            
                            <>               
                            <div key={i} className={`combo-box-option ${current_sub.current_sub && 'active'}`} >
                                {item.name}
                            </div>                            
                            
                            { 
                                    item.subcategorie && item.subcategorie.map((subcat, i) => {

                                        const active = current_sub.subCategories.map(current => current.sub_name).includes(subcat.sub_name)

                                        return (                                                                    
                                        <div key={i} className={`combo-box-suboption`} onClick={() => updateCatClient(subcat)} >
                                            <label className={`checkbox ${active ? 'active' : ''}`}></label>  
                                            {subcat.sub_name}
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