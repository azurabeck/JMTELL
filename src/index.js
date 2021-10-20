import Routes from './Routes';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './main_style.scss';

ReactDOM.render(  <BrowserRouter><Routes /></BrowserRouter> , document.querySelector('#root'));