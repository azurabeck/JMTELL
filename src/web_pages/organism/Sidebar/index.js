import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { signOut } from '../../../web_config/actions/authActions'

import { MenuData } from './menuData';
import './style.scss';

import LOGO_WHITE  from '../../atoms/logo_white.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPowerOff , faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const Sidebar = (props) => {
    
    const [ MENU_DATA ] = useState(MenuData)
    const [ PATH_ACTIVE , setActive] = useState('/admin/clientes')    
    const history = useHistory()

    const handleSignOut = (e) => {
        e.preventDefault();
        props.signOut()
    }

    const handleRedirect = () => {
        history.push('/')
        window.location.reload();
    }

    return (
        <div className='sidebar'>

            <div className='logo'>
                <img alt='' src={ LOGO_WHITE }/>
            </div>

            <div className='logged-area'>
               <span> Você esta logado! </span>
                <div onClick={() => handleRedirect()} ><FontAwesomeIcon icon={faHouseUser} /></div>
                <FontAwesomeIcon icon={faPowerOff}  onClick={(e) => handleSignOut(e)}/>
            </div>

            <div className='sidebar-buttons'>
                
                        <div className='mob-side-menu'>
                            
                            { MENU_DATA && MENU_DATA.map((route, index) => (
                                <div className={PATH_ACTIVE === route.path ? 'button active' : 'button'}> 

                                    {route.externalLink ? 
                                    // eslint-disable-next-line jsx-a11y/anchor-has-content
                                    <a href={route.path} key={index} target={'_blank'} rel="noreferrer">{route.title}</a>
                                    : <> <Link to={route.path} key={index} onClick={() => setActive(route.path)} >{route.title}</Link>
                                    <FontAwesomeIcon icon={faChevronRight} /> </>
                                    }      
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