import React , {useState} from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../web_config/actions/authActions'

import './style.scss'
import LOGO from '../../web_pages/atoms/logo_blue.svg'

const Login = (props) => {

    const [ formStatus , handleForm ] = useState( { email: '' , password: '' } )

    
    const handleSubmit = (e) => { 
        e.preventDefault()
        props.signIn(formStatus);
    }
    
    const { authError, auth } = props
    if(auth.uid) { return <Redirect to='/' /> }


    return (
        <div className='login'>
            <form className='login-area'  onSubmit={(e) => handleSubmit(e)}>
                <img src={LOGO} alt='' />
                <div className='title'></div>
                <input placeholder='email' name='email' onChange={(e) => handleForm({...formStatus, email: e.target.value })} />
                <input placeholder='senha' type='password' name='password' onChange={(e) => handleForm({...formStatus, password: e.target.value })}  />

                <div className='btn-group'>
                    <div className='recover-password'> Esqueci a senha </div>
                    <button className='btn-orange-square' type='submit'>entrar</button>
                </div>

                { authError && authError }
            </form>


        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
      authError: state.auth.authError,
      auth: state.firebase.auth
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login)