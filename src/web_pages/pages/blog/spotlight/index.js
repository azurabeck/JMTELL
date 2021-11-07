 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React , {useState} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { createText } from '../../../../web_config/actions/textActions'
import './style.scss'

const Spotlight = (props) => {

    const POST = props.posts
    const IS_EDITING = props.IS_EDITING
    const [ textEdition, handleTextEdition ] = useState({
        collection: '',
        text: '',
        index: null,
    })
    
    const handleSubmit = (e) => {       
        e.preventDefault()        
        props.createText(textEdition)
    }

    return (
        <div className='spotlight'>
            {
               POST && POST.slice(0,3).map((item , index) => {

                   return (
                     <div className={`div${index}`} 
                          style={{ backgroundImage: `url(${item.url})` }} key={index}> 
                          <div className='spotlight-title'>{item.cover_title}</div>
                     
                          { index === 2 && <div className='spotlight-tag'>
                                { IS_EDITING && <div className='editing-group'> 
                                    { textEdition && <div className='text-group'>
                                        <input onChange={(e) => handleTextEdition({collection: IS_EDITING, text: e.target.value , index: 0})} />
                                        <div className='btn-orange' onClick={(e) => handleSubmit(e)}></div>
                                    </div> }                                
                                
                                    <FontAwesomeIcon icon={faPen} onClick={() => handleTextEdition(!textEdition)} />
                                 </div>  }
                          
                          </div> }                       
                      </div>
                    )                   
                })
            }

        </div>
    )
}



const mapStateToProps = (state) => {
    return {
        posts: state.firestore.ordered.posts
    }
}

  
const mapDispatchToProps = (dispatch) => {
    return {
        createText: (text) => dispatch(createText(text))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts' , orderBy: ["date", "desc"] }
        
    ])
)(Spotlight)