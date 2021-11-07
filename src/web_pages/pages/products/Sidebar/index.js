import React , { useState , useEffect } from 'react'
import './style.scss';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown , faChevronUp} from '@fortawesome/free-solid-svg-icons';
import { filterCategorie } from '../../../../web_config/actions/productActions'


const Sidebar = (props) => {

    const SIDEBAR_DATA = props.categories
    const [ displayMenu , handleMenu ] = useState( null )

    const handleFilterDispatch = (e , filter) => {
        e.preventDefault()
        props.filterCategorie({filtering: true, filterCategorie: filter})
    }
   
    useEffect(() => {
        async function anyNameFunction() {
            await SIDEBAR_DATA;
            const SIDEBAR_TOPICS = await SIDEBAR_DATA && SIDEBAR_DATA.map(item =>  ( item.name ) )
            handleMenu( SIDEBAR_TOPICS && SIDEBAR_TOPICS.reduce((a, v) => ({ ...a, [v]: true}) , {}) )
        }
        anyNameFunction();
    }, [SIDEBAR_DATA]);
    
    return (

        <div className='products-sidebar'>
            { SIDEBAR_DATA && SIDEBAR_DATA.map((item, index) => {
                return (
                    <div className='sidebar-categorie-wrapper'>
                        <div className='sidebar-buttons' key={index} onClick={() => handleMenu( displayMenu && {...displayMenu , [item.name]: !displayMenu[item.name] })} > 
                            {item.name} 
                            <FontAwesomeIcon icon={displayMenu && displayMenu[item.name] ? faChevronUp : faChevronDown}/> </div>
                            {
                            displayMenu && displayMenu[item.name] && item.subcategorie && item.subcategorie.map((subcat, index) => (
                                
                                <div className='sidebar-sub-buttons' onClick={(e) => handleFilterDispatch(e , subcat.sub_name)} key={index}> {subcat.sub_name} </div>  
                            ))
                        }  
                    </div>
                )
            })}
                
        </div>   
    )
}


const mapStateToProps = (state) => {
    return {
        categories: state.firestore.ordered.categories        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterCategorie: (filter) => dispatch(filterCategorie(filter))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'categories' }        
    ])
)(Sidebar)