import Routes from './Routes';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(  <BrowserRouter><Routes /></BrowserRouter> , document.querySelector('#root'));