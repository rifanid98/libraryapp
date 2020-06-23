import { React, BrowserRouter as Router, Switch, Route} from 'libraries';
import { appRoutes, userRoutes } from 'routes';
import './App.css';

const App = () => {
  return (
    <Router>
      {/* Routes */}
      <Switch>
        {appRoutes.map((route, index) => <Route key={index} {...route} />)}
        {userRoutes.map((route, index) => <Route key={index} {...route} />)}
      </Switch>
    </Router>
  );
}

export default App;
