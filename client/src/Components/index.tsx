import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { AddForm } from './AddForm';
import { Home } from "./Home";
import { Navigation } from './Navigation';
import { Podcasts } from './Podcasts';

class Main extends Component {
  public render() {
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/podcasts" exact component={Podcasts} />
          <Route path="/podcasts/new" exact component={AddForm} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default Main;
