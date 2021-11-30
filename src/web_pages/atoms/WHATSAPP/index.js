import React from 'react'
import './style.scss';
import { WHATSAPP } from '../SVG/_index'

const Whatsapp = () => {

    return (
        <a href='https://api.whatsapp.com/send?l=pt_br&phone=55213351-1211' className='whatsapp' target='_blank' rel="noreferrer">
            <div className='title'>Entre em contato pelo nosso <br/> whatsapp clicando aqui!</div>
            <WHATSAPP/></a>
    )
}

export default Whatsapp