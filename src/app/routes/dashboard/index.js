import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../../util/asyncComponent';

const Dashboard = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/eCommerce`}/>
      <Route path={`${match.url}/eCommerce`} component={asyncComponent(() => import('./routes/ECommerce'))}/>
      <Route component={asyncComponent(() => import('components/Error404'))}/>
    </Switch>
  </div>
);

export default Dashboard;