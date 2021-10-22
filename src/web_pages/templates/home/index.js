import React from 'react';

import HEADER from '../../pages/home/Header'
import ABOUT from '../../pages/home/About'
import PRODUCTS from '../../pages/home/Products'
import ASSOCIATED from '../../pages/home/Associated'
import CONTACT from '../../pages/home/Contact'



import './style.scss';

const Home = () => {
    return (
        <div className='home'>

                <HEADER />
                <ABOUT />
                <PRODUCTS />
                <ASSOCIATED />
                <CONTACT />

                
        </div>
    ) 
}

export default Home;