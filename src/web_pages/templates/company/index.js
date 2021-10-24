import React from 'react';


import HEADER from '../../pages/company/Header'
import BUDGET from '../../pages/company/Budget'
import CLIENTS from '../../pages/company/Clients'
import TEAM from '../../pages/company/Team'
import WHO_WE_ARE from '../../pages/company/WhoWeAre'



const Company = () => {
    return (
        <div className='company'>
            <HEADER />
            <WHO_WE_ARE />
            <TEAM />
            <CLIENTS />
            <BUDGET />
        </div>
    ) 
}

export default Company;