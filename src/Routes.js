import React from 'react'
import { Switch, Route } from 'react-router-dom';

// IMPORT ORGANISM
import Navbar from './web_pages/organism/Navbar'
import Footer from './web_pages/organism/Footer'


// IMPORT PUBLIC PAGES
import Home from './web_pages/templates/home'
import Company from './web_pages/templates/company'
import Contact from './web_pages/templates/contact'
import Products from './web_pages/templates/products'
import Blog from './web_pages/templates/blog'


// IMPORT ADMIN PAGES
import Login from './web_admin/login'

function Routes() {

    const location = window.location.pathname

    return (
        <>
     
            { location.indexOf("/admin") !== 0 &&  <Navbar/> }
            <div className={ location.indexOf("/admin") !== 0 && 'content'}>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/empresa' component={Company}></Route>
                    <Route exact path='/contato' component={Contact}></Route>
                    <Route exact path='/produtos' component={Products}></Route>
                    <Route exact path='/blog' component={Blog}></Route>

                    {/* ADMIN AREA */}
                    <Route exact path='/admin' component={Login}></Route>
                </Switch>
            </div>
            { location.indexOf("/admin") !== 0 &&  <Footer/> }

        </>
    )
}

export default Routes

