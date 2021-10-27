import React from "react";
import { connect } from 'react-redux'

import { signOut } from '../../../../web_config/actions/authActions'
import './style.scss';
import { FACEBOOK , INSTAGRAM } from '../../../atoms/SVG/_index'

const CopyRight = (props) => {

    const ADMIN_LOGGED = props.auth.uid

    const handleSignOut = (e) => {
        e.preventDefault();
        props.signOut()
    }

    return (
        <div className='copy-right'>

                <div className='social-networks'>
                    <FACEBOOK /> <INSTAGRAM /> { ADMIN_LOGGED && <div className='logout-admin' onClick={(e) => handleSignOut(e)}> DESLIGAR ADMIN </div> }
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