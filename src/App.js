import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import PublicRoute from './layout/public/publicRoute';
import Login from './layout/public/components/login';
import PrivateRoute from './layout/private/privateRoute';
import AdminRoute from './layout/private/adminRoute';
import Home from './layout/private/components/home';
import Admin from './layout/private/components/admin/admin';
import Restaurants from './layout/private/components/admin/manage-restaurants';
import CreatePoll from './layout/private/components/admin/create-poll';
import Polls from './layout/private/components/polls/polls.';
import Orders from './layout/private/components/orders/orders';
import Order from './layout/private/components/orders/order';
import Settings from './layout/private/components/admin/settings';

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute component={Login} path='/login' />
        <AdminRoute component={Admin} path='/admin' />
        <AdminRoute component={Restaurants} path='/manage-rest' />
        <AdminRoute component={CreatePoll} path='/create-poll' />
        <AdminRoute component={Settings} path='/settings' />
        <PrivateRoute component={Polls} path='/polls' />
        <PrivateRoute component={Order} path='/order/:id' />
        <PrivateRoute component={Orders} path='/order' />
        <PrivateRoute component={Home} path='/' />
      </Switch>
    </Router>
  );
}

export default App;
