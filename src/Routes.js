import React , { useState } from 'react'
import { Switch, Route } from 'react-router-dom';
import { withRouter } from "react-router"

// IMPORT ORGANISM
import Navbar from './web_pages/organism/Navbar'
import Footer from './web_pages/organism/Footer'
import Sidebar from './web_pages/organism/Sidebar'


// IMPORT PUBLIC PAGES
import Home from './web_pages/templates/home'
import Company from './web_pages/templates/company'
import Contact from './web_pages/templates/contact'
import Products from './web_pages/templates/products'
import ProductsDetails from './web_pages/templates/products_details'
import Blog from './web_pages/templates/blog'
import Post from './web_pages/templates/post'


// IMPORT ADMIN PAGES
import LOGIN from './web_admin/login'
import MANAGER_CLIENTS from './web_admin/clients'
import MANAGER_PRODUCTS from './web_admin/product'
import OLD_PRODUCTS from './web_admin/oldProduct'

import MANAGER_BLOG from './web_admin/blog'
import CREATE_POST from './web_admin/blog/AddPost'
import CATEOGORIES from './web_admin/categories'
import PROVIDERS from './web_admin/providers'
import TEXT from './web_admin/text'
import CARROSSEL from './web_admin/carrossel'
import NETWORK from './web_admin/network'
import EMPLOYEES from './web_admin/employees'
import PHONE from './web_admin/phone'
import CATALOG from './web_admin/catalog'

function Routes({ history }) {

    const [ local , handlePath ] = useState(window.location.pathname)

    history.listen((location, action) => {
        handlePath(location.pathname)
        window.scrollTo(0, 0)
    })
    
    return (
        <>
     
            { local !== "/admin" &&  <Navbar route={local}/> }
            { local === "/admin/" &&  <Sidebar/> }

            <div className={ local !== "/admin" ? 'content' : 'content-admin'}>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/empresa' component={Company}></Route>
                    <Route exact path='/contato' component={Contact}></Route>
                    <Route exact path='/produtos' component={Products}></Route>
                    <Route exact path='/produtos/:id' component={ProductsDetails}></Route>
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
                    <Route exact path='/admin/textos' component={TEXT}></Route>
                    <Route exact path='/admin/providers' component={PROVIDERS}></Route>
                    <Route exact path='/admin/carrossel' component={CARROSSEL}></Route>
                    <Route exact path='/admin/produtos-antigos' component={OLD_PRODUCTS}></Route>
                    <Route exact path='/admin/redes-sociais' component={NETWORK}></Route>
                    <Route exact path='/admin/funcionarios' component={EMPLOYEES}></Route>
                    <Route exact path='/admin/phone' component={PHONE}></Route>
                    <Route exact path='/admin/catalogs' component={CATALOG}></Route>


                </Switch>
            </div>
            { local !== "/admin"  &&  <Footer/> }

        </>
    )
}

export default withRouter(Routes)

