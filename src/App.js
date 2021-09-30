import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import FrontPage from './components/FrontPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

import AddUser from "./components/users/AddUser";
import User from "./components/users/User";
import UserList from "./components/users/UserList";
import DelayResponse from "./components/users/DelayResponse";

import Resource from "./components/resource/Resource";
import ResourceList from "./components/resource/ResourceList";

import { clearMessage } from './actions/message';
import { history } from './helpers/history';

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
 
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      console.log('curentuser');  
    }
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Router history={history}>
        <div>
          <Navbar />
          <div className='container mt-3'>
            <Switch>
              <Route exact path={['/', '/home']} component={FrontPage} />
              <Route exact path='/login' component={Login} />           
              <Route exact path='/register' component={Register} />
              <Route path="/user/:id" component={User} />
              <Route path="/addUser" component={AddUser} />
              <Route path="/userList" component={UserList} />             
              <Route path="/delayResponse" component={DelayResponse} />
              <Route path="/resource/:id" component={Resource} />           
              <Route path="/resourceList" component={ResourceList} />
              <Dashboard />
            </Switch>
          </div>
        </div>
      </Router>
    </BrowserRouter>
  );
};

export default App;
