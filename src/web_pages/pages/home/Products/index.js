import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight , faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import ButtonStroke from '../../../atoms/BUTTON_STROKE'
import './style.scss';


const Header = () => {

    return (
        <div className='products'>
            <div className='title'>PRODUTOS</div>
            <div className='desc'>Conheça alguns dos produtos em destaque</div>
            <div className='line'></div>

            <div className='products-spotlight'>
                <FontAwesomeIcon icon={faCaretLeft} className='arrow' />
                <div className='product'>
                    <img className='product-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                    <div className='product-title'>VHD 3120 B</div>
                    <div className='product-desc'>Intelbras Multi HD®</div>
                    <div className='btn'>
                        <ButtonStroke 
                            TEXT='Saiba mais'
                            WIDTH='160px'
                            HEIGHT='35px'
                            BTN_TYPE={3}
                            TO='/products'/>
                    </div>
                </div>
                <div className='product'>
                    <img className='product-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                    <div className='product-title'>VHD 3120 B</div>
                    <div className='product-desc'>Intelbras Multi HD®</div>
                    <div className='btn'>
                        <ButtonStroke 
                            TEXT='Saiba mais'
                            WIDTH='160px'
                            HEIGHT='35px'
                            BTN_TYPE={3}
                            TO='/products'/>
                    </div>
                </div>
                <div className='product'>
                    <img className='product-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                    <div className='product-title'>VHD 3120 B</div>
                    <div className='product-desc'>Intelbras Multi HD®</div>
                    <div className='btn'>
                        <ButtonStroke 
                            TEXT='Saiba mais'
                            WIDTH='160px'
                            HEIGHT='35px'
                            BTN_TYPE={3}
                            TO='/products'/>
                    </div>
                </div>
                <div className='product'>
                    <img className='product-img' alt='' src='https://m.media-amazon.com/images/I/51alwW2xKtL._AC_SL1000_.jpg'/>
                    <div className='product-title'>VHD 3120 B</div>
                    <div className='product-desc'>Intelbras Multi HD®</div>
                    <div className='btn'>
                        <ButtonStroke 
                            TEXT='Saiba mais'
                            WIDTH='160px'
                            HEIGHT='35px'
                            BTN_TYPE={3}
                            TO='/products'/>
                    </div>
                </div>
                <FontAwesomeIcon icon={faCaretRight} className='arrow' />
            </div>
        </div>
    )
}

export default Header