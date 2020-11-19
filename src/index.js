import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom'

import Header from './component/Header/Header'
import Create from './component/create/Create'
import PageNotFound from './component/PageNotFound/PageNotFound'


ReactDOM.render(
  <React.StrictMode>
     <Router>
     <Header/>
  <div>
    <Switch>
    <Route  exact path='/' component={App} />
    <Route  exact path='/home' component={Header} />
    <Route exact path='/create' component={Create} />
    <Route exact path='/show' component={App} />
    <Route component={PageNotFound} />
    </Switch>

  </div>
</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
