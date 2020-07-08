import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { appRoutes, userRoutes } from './routes';

import './App.css';


const App = () => {
  return (
    <Router>
      {/* Routes */}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home"></Redirect>
        </Route>
        <Route path="/dashboard" exact>
          <Redirect to="/dashboard/books"></Redirect>
        </Route>
        {userRoutes.map((route, index) => <Route key={index} {...route} />)}
        {appRoutes.map((route, index) => <Route key={index} {...route} />)}
      </Switch>
    </Router>
  );
}

export default App;
