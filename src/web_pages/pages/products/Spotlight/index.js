import React , { useEffect , useState } from 'react'
import './style.scss';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import BG from '../../../atoms/SVG/spotlight_bg.svg'


const Spotlight = (props) => {

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

        <>
            {
                SPOTLIGHT &&  <div className='products-spotlight-area'>
                    Produtos em Destaque

                    {
                        SPOTLIGHT && SPOTLIGHT.slice(0,1).map((item, index) => {
                            return (
                                <div className='products-spotlight'>  
                                        <div className='ps-title'> {item.model} <br/> <span>{item.name}</span> </div>     
                                        <div className='ps-img' style={{background: `url(${BG})`}}> 
                                            <img src={item.img} alt=''/>
                                        </div>     
                                </div>
                            )
                        })
                    }


                </div> 
            }
        </>
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
)(Spotlight)