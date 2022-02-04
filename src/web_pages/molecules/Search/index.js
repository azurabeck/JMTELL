import React , { useState }  from 'react'
import { connect } from 'react-redux'
import { filterCategorie } from '../../../web_config/actions/productActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const Search = (props) => {

    const [ SEARCH_CONTENT , setSearchContent ] = useState()

    const handleChange = (e, value) => {
        e.preventDefault();
        setSearchContent(value)
        props.filterCategorie({filterByCat: 3, filterCategorie: value})
    }

    return (
        <div className='search'>
            <input placeholder='Digite e clique na lupa para pesquisar pelo nome' onChange={(e) => handleChange(e, e.target.value)}></input>
            <div className='button-search' onClick={() => props.filterCategorie({filterByCat: 3, filterCategorie: SEARCH_CONTENT})} >
                <FontAwesomeIcon icon={faSearch}/>
            </div>
        </div>
    )
}


  
const mapDispatchToProps = (dispatch) => {
    return {
        filterCategorie: (filter) => dispatch(filterCategorie(filter)),
    }
} 
export default connect(null , mapDispatchToProps)(Search)