import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import YourGames from './components/YourGames/yourGames';
import NewGame from './components/NewGame/newGame';
import NewAssinger from './components/NewAssinger/newAssinger';
import NewPartner from './components/NewPartner/newPartner';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/your-games" component={YourGames} />
        <Route path="/new-game" component={NewGame} />
        <Route path="/new-assinger" component={NewAssinger} />
        <Route path="/new-partner" component={NewPartner} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>
), document.getElementById('root'));
