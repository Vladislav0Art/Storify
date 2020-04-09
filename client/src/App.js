import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Main from './components/Content/Main/Main';
import Login from './components/Login/Login';
import Panel from './components/Panel/Panel/Panel';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/secret/adminpanel" component={Panel} exact />
        <Route path="/secret/adminlogin" component={Login} exact />
        <Route path="/" component={Main} exact />
      </Switch>
    </Router>
  );
}

export default App;
