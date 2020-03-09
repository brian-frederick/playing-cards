import React, { Component } from 'react';
import './App.css';
import Nav from "./Nav";
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import StartAGame from './views/start/StartAGame'
import JoinGame from './views/start/JoinGame'
import Play from './views/play/Play'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={StartAGame} />
              <Route exact path="/join/:gameId" component={JoinGame} />
              <Route exact path="/play/:gameId" component={Play} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}



export default App;
