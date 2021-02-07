import React, { useState, useEffect } from 'react';
import './App.scss';
import { withAuthenticator } from '@aws-amplify/ui-react'
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/home/Home'
import MyCourses from './pages/myCourses/MyCourses'
import Admin from './pages/admin/Admin'
import Contact from './pages/contact/Contact'

function App() {

  return (
    <Router basename={""}>
      <div className="App">
        <div className="MainContainer">
        <Switch>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/myCourses">
            <MyCourses />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);
