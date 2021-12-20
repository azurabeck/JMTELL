import React from 'react'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss'
import { Link } from 'react-router-dom';

const FastBar = (props) => {
    const CLIENTS_DB = props.clients

    const FILTER =  CLIENTS_DB && CLIENTS_DB.filter(item => item.read === false)
    const filterLenght =  FILTER && FILTER.length

    if ( filterLenght === 0 ) {
       return <Link className='fast-bar' to='/admin/clientes'> <FontAwesomeIcon icon={faMailBulk} /> sem novas mensagens </Link>
    } else if ( filterLenght === 1) {
       return <Link className='fast-bar active' to='/admin/clientes'> <FontAwesomeIcon icon={faMailBulk} /> 1 nova mensagem </Link>
    } else if ( filterLenght > 1) {
        return <Link className='fast-bar active' to='/admin/clientes'> <FontAwesomeIcon icon={faMailBulk} /> {filterLenght} Mensagens não lida </Link>
    } else {
        return <Link className='fast-bar' to='/admin/clientes'> <FontAwesomeIcon icon={faMailBulk} /> sem novas mensagens </Link>
    }
}

const mapStateToProps = (state) => {
    return {
      clients: state.firestore.ordered.clients
    }
}

  
export default compose(
    connect(mapStateToProps , null),
    firestoreConnect([
        { collection: 'clients' }
    ])
)(FastBar)