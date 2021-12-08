import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { MenuData } from './menuData';
import './style.scss';

import LOGO_BLUE  from '../../atoms/logo_blue.svg'

const Navbar = () => {

    const [ MOB_MENU_OPEN , handleMenu ] = useState(false)
    const [ MENU_DATA ] = useState(MenuData)

    const path = window.location.pathname

    return (
        <div className='navbar'>

            <Link to='/' className='logo'>
                <img alt='' src={ LOGO_BLUE }/>
            </Link>

            <div className='navbar-buttons'>
                <div className='nav-bar'> 
                    <FontAwesomeIcon icon={faBars} onClick={() => handleMenu(!MOB_MENU_OPEN)} /> 

                    { MOB_MENU_OPEN && 
                        <div className='mob-nav-menu'>
                            
                            { MENU_DATA && MENU_DATA.map((route, index) => {
                                return (
                                route.externalLink ?
                                 <a href={route.path} target='_black' key={index} className={path === route.path && 'active'} >{route.title}</a>
                                : <Link to={route.path} key={index} className={path === route.path && 'active'} onClick={() => handleMenu(false)}>{route.title}</Link>
                            )}) }
                            
                        </div>
                    }
                
                
                </div>  

                { MENU_DATA && MENU_DATA.map((route, index) => (
                        route.externalLink ?
                                 <a href={route.path} target='_black' key={index} className={path === route.path && 'active'} >{route.title}</a>
                                : <Link to={route.path} key={index} className={path === route.path && 'active'} >{route.title}</Link>
                )) }
            </div>
        </div>
    )
}

export default Navbar