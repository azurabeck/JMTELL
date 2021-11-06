import React , { useEffect , useState } from 'react'
import './style.scss';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown , faChevronUp} from '@fortawesome/free-solid-svg-icons';


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
                    <div className='products-spotlight'>  Spotlight  </div>
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