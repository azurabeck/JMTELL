import React from 'react'
import { Switch, Route } from 'react-router-dom';


// IMPORT ORGANISM
import Navbar from './web_pages/organism/Navbar'

// IMPORT PUBLIC PAGES
import Home from './web_pages/pages/home'
import Company from './web_pages/pages/company'
import Contact from './web_pages/pages/contact'
import Products from './web_pages/pages/products'

// IMPORT ADMIN PAGES
import Login from './web_admin/login'

function Routes() {
    return (
      <>

          <Navbar/>

          <Switch>
               <Route exact path='/' component={Home}></Route>
               <Route exact path='/empresa' component={Company}></Route>
               <Route exact path='/contato' component={Contact}></Route>
               <Route exact path='/produtos' component={Products}></Route>


               {/* ADMIN AREA */}
               <Route exact path='/login' component={Login}></Route>

          </Switch>
      </>
    )
}

export default Routes

