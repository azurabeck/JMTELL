import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>

            <div className='logo'>JMTELL</div>

            <div className='navbar-buttons'>
                <Link to='/'>Home</Link>
                <Link to='/empresa'>Empresa</Link>
                <Link to='/produtos'>Produtos</Link>
                <Link to='/contato'>Contato</Link>
            </div>
        </div>
    )
}

export default Navbar