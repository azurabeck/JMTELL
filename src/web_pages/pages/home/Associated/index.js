import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight , faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import './style.scss';


const Header = () => {

    return (
        <div className='associated'>
            <div className='bg-img'></div>
            <div className='title'>Distribuidores associados</div>
            <div className='line'></div>

            <div className='associated-preview'>
                <FontAwesomeIcon icon={faCaretLeft} className='arrow' />
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <div className='associated'>
                    <img className='associated-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                </div>
                <FontAwesomeIcon icon={faCaretRight} className='arrow' />
            </div>

        </div>
    )
}

export default Header