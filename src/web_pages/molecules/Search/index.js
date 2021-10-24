import React from 'react'
import BUTTON_ORANGE_SQUARE from '../../atoms/BUTTON_ORANGE'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const Search = () => {
    return (
        <div className='search'>
            <input placeholder='Procure pelo produto aqui'></input>
            <div className='button-search' ><FontAwesomeIcon icon={faSearch}/></div>
        </div>
    )
}

export default Search