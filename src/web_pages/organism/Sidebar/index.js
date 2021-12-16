import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { signOut } from '../../../web_config/actions/authActions'

import { MenuData } from './menuData';
import './style.scss';

import LOGO_WHITE  from '../../atoms/logo_white.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPowerOff , faHouseUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar = (props) => {
    
    const ADMIN_LOGGED = props.auth
    const [ MENU_DATA ] = useState(MenuData)
    const [ PATH_ACTIVE , setActive] = useState('/admin/clientes')
    const path = window.location.pathname

    

    const handleSignOut = (e) => {
        e.preventDefault();
        props.signOut()
    }

    return (
        <div className='sidebar'>

            <div className='logo'>
                <img alt='' src={ LOGO_WHITE }/>
            </div>

            <div className='logged-area'>
               <span> Você esta logado! </span>
                <Link to='/' ><FontAwesomeIcon icon={faHouseUser} /></Link>
                <FontAwesomeIcon icon={faPowerOff}  onClick={(e) => handleSignOut(e)}/>
            </div>

            <div className='sidebar-buttons'>
                
                        <div className='mob-side-menu'>
                            
                            { MENU_DATA && MENU_DATA.map((route, index) => (
                                <div className={PATH_ACTIVE === route.path ? 'button active' : 'button'}> 
                                    <Link to={route.path} key={index} onClick={() => setActive(route.path)} >{route.title}</Link>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>
                            )) }
                            
                        </div>
                
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)