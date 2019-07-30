import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {Router, browserHistory, IndexRoute} from 'react-router';
import App from './components/app';
import Home from './components/home';
import Register from './components/register';
import Search from './components/search';
import Chat from './components/chat';
import All from './components/All';
import { render } from 'react-dom'

export const Routes = () => (
   
   
 <Switch>
      
      <Route exact path='/' component={App} />
      <Route  exact path = "/home" component = {Home} />
      <Route exact path = "/app" component = {App} />
      <Route exact path = "/register" component = {Register} />
      <Route exact path = "/search" component = {Search} />
      <Route exact path = "/chat" component = {Chat} />
      <Route exact path = "/all" component = {All} />
      
    </Switch>
    );
export default Routes;