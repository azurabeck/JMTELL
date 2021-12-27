import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FACE_SQUARE , INSTA_SQUARE, LINK_SQUARE, PINT_SQUARE, TWIIT_SQUARE, YOU_SQUARE } from '../../atoms/SVG/_index'

import { MenuData } from './menuData';
import './style.scss';

import LOGO_BLUE  from '../../atoms/logo_blue.svg'


const Navbar = (props) => {

    const [ MOB_MENU_OPEN , handleMenu ] = useState(false)
    const [ MENU_DATA ] = useState(MenuData)
    const NETWORK = props.network

    const [ path, handlePath] = useState(window.location.pathname)

    useEffect(() => {
        if(props.route) {
            handlePath(props.route)
        }
    }, [props.route])
   
    return (
        <>
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
        <div className='sub-nav'>
            Siga nossas redes sociais:
            { NETWORK && NETWORK.map((item, index) => {
                    let image
                    
                    if(item.name === 'Facebook') {
                        image = <FACE_SQUARE />;
                    } else if (item.name === 'Instagram') {
                        image = <INSTA_SQUARE />;
                    } else if (item.name === 'LinkedIn') {
                        image = <LINK_SQUARE />;
                    } else if (item.name === 'Pinterest') {
                        image = <PINT_SQUARE />;
                    } else if (item.name === 'Twitter') {
                        image = <TWIIT_SQUARE />;
                    } else if (item.name === 'YouTube') {
                        image = <YOU_SQUARE />;
                    }

                    return (
                        <a className='sub-nav-net' style={{display: item.isVisible ? 'block' : 'none'}} href={item.url} target='_blank' rel="noreferrer">{image}</a>
                    )

            })}
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        network: state.firestore.ordered.network
    }
  }
  
export default compose(
    connect(mapStateToProps, null),
    firestoreConnect([ { collection: 'network' } ])
)(Navbar)