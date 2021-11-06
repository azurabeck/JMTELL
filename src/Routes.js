import React from 'react'
import { Switch, Route } from 'react-router-dom';

// IMPORT ORGANISM
import Navbar from './web_pages/organism/Navbar'
import Footer from './web_pages/organism/Footer'
import Sidebar from './web_pages/organism/Sidebar'


// IMPORT PUBLIC PAGES
import Home from './web_pages/templates/home'
import Company from './web_pages/templates/company'
import Contact from './web_pages/templates/contact'
import Products from './web_pages/templates/products'
import Blog from './web_pages/templates/blog'
import Post from './web_pages/templates/post'


// IMPORT ADMIN PAGES
import LOGIN from './web_admin/login'
import MANAGER_CLIENTS from './web_admin/clients'
import MANAGER_PRODUCTS from './web_admin/product'
import MANAGER_BLOG from './web_admin/blog'
import CREATE_POST from './web_admin/blog/AddPost'
import CATEOGORIES from './web_admin/categories'



function Routes() {

    const location = window.location.pathname

    return (
        <>
     
            { location.indexOf("/admin") !== 0 &&  <Navbar/> }
            { location.indexOf("/admin/") === 0 &&  <Sidebar/> }

            <div className={ location.indexOf("/admin") !== 0 ? 'content' : 'content-admin'}>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/empresa' component={Company}></Route>
                    <Route exact path='/contato' component={Contact}></Route>
                    <Route exact path='/produtos' component={Products}></Route>
                    <Route exact path='/blog' component={Blog}></Route>
                    <Route exact path='/blog/:id' component={Post}></Route>

                    {/* ADMIN AREA */}
                    <Route exact path='/admin' component={LOGIN}></Route>
                    <Route exact path='/admin/clientes' component={MANAGER_CLIENTS}></Route>
                    <Route exact path='/admin/produtos' component={MANAGER_PRODUCTS}></Route>
                    <Route exact path='/admin/blog' component={MANAGER_BLOG}></Route>
                    <Route exact path='/admin/blog/create-post' component={CREATE_POST}></Route>
                    <Route exact path='/admin/blog/edit-post/:id' component={CREATE_POST}></Route>
                    <Route exact path='/admin/categorias' component={CATEOGORIES}></Route>

                </Switch>
            </div>
            { location.indexOf("/admin") !== 0 &&  <Footer/> }

        </>
    )
}

export default Routes

