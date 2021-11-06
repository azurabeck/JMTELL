import React , { useEffect , useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight , faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import ButtonStroke from '../../../atoms/BUTTON_STROKE'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './style.scss';


const Header = (props) => {

    
    const PRODUCTS_DATA = props.products
    const [ SPOTLIGHT , updateProducts] = useState() 

    useEffect(() => {
        async function anyNameFunction() {
            const PRODUCTS_SPOTLIGHT = await PRODUCTS_DATA && PRODUCTS_DATA.filter(item => item.spotlight === true)
            updateProducts( PRODUCTS_SPOTLIGHT && PRODUCTS_SPOTLIGHT)
        }
        anyNameFunction();
    }, [PRODUCTS_DATA]);
        

    return (
        <div className='products'>
            <div className='title'>PRODUTOS</div>
            <div className='desc'>Conheça alguns dos produtos em destaque</div>
            <div className='line'></div>

            <div className='products-spotlight'>
                <FontAwesomeIcon icon={faCaretLeft} className='arrow' />


                {
                    SPOTLIGHT && SPOTLIGHT.slice(0,5).map((item, index) => {
                        return (
                            <div className='product'>
                                <div className='product-img' > <img alt='' src={item.img}/> </div>
                                <div className='product-title'>{item.name}</div>
                                <div className='product-desc'>{item.model}</div>
                                <div className='btn'>
                                    <ButtonStroke 
                                        TEXT='Saiba mais'
                                        WIDTH='160px'
                                        HEIGHT='35px'
                                        BTN_TYPE={3}
                                        TO='/products'/>
                                </div>
                            </div>
                        )
                    })
                }

               
               


                <FontAwesomeIcon icon={faCaretRight} className='arrow' />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.firestore.ordered.products
    }
  }
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'products' }
        
    ])
)(Header)