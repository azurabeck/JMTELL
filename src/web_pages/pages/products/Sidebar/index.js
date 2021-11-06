import React , { useState , useEffect } from 'react'
import './style.scss';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown , faChevronUp} from '@fortawesome/free-solid-svg-icons';


const Sidebar = (props) => {

    const SIDEBAR_DATA = props.categories
    const [ displayMenu , handleMenu ] = useState( null )

   
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
                                
                                <div className='sidebar-sub-buttons' key={index}> {subcat.sub_name} </div>  
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
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'categories' }
        
    ])
)(Sidebar)