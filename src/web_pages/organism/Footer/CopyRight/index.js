import React from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { signOut } from '../../../../web_config/actions/authActions'
import './style.scss';
import { FACEBOOK , INSTAGRAM } from '../../../atoms/SVG/_index'
import LOGIN_PAGE from '../../../../web_admin/login'

const CopyRight = (props) => {

    const ADMIN_LOGGED = props.auth.uid

    const handleSignOut = (e) => {
        e.preventDefault();
        props.signOut()
    }

    return (
        <div className='copy-right'>

                <div className='social-networks'>
                    { ADMIN_LOGGED && <div className='logout-admin' onClick={(e) => handleSignOut(e)}> DESLIGAR ADMIN </div> }
                    { ADMIN_LOGGED &&  <Link className='logout-admin' to='/admin'> Painel -> </Link> }
                    { !ADMIN_LOGGED && <Link className='logout-admin' to='/admin'> LOGAR ADMIN </Link> }
                </div>
                Copyright © 2021 - Todos os Direitos Reservados - JMTELL  
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      authError: state.auth.authError,
      auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyRight)