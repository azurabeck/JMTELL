import React from 'react'
import './style.scss'
import { HashLink } from 'react-router-hash-link'
import { WHATSAPP } from '../SVG/_index'

const Whatsapp = () => {

    return (
        <HashLink to="/contato" className='whatsapp'>
            <div className='title'>Entre em contato pelo nosso <br/> whatsapp clicando aqui!</div>
            <WHATSAPP/>
        </HashLink>
    )
}

export default Whatsapp