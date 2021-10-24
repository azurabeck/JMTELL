import React, { useState } from 'react'
import './style.scss'

const Combo_box = ({ TEXT , DATA }) => {

    const [ boxStatus, handleBox ] = useState(false)


    return (
        <div className='combo-box' onMouseEnter={() => handleBox(true)} onMouseLeave={() => handleBox(false)}>  
                { TEXT }
                { boxStatus && <div className='box-transparent'>
                    <div className='box'>
                       <div className='button'> TESTE </div>
                       <div className='button'> TESTE </div>
                       <div className='button'> TESTE </div>
                       <div className='button'> TESTE </div>
                    </div>
                </div>
                }
        </div>
    )
}

export default Combo_box