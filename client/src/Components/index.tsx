import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import moment from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import AddForm from './AddForm';
import { Home } from "./Home";
import { Navigation } from './Navigation';
import { Podcasts } from './Podcasts';

class Main extends Component {
  public render() {
    return (
      <MuiPickersUtilsProvider utils={moment}>
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/podcasts" exact component={Podcasts} />
            <Route path="/podcasts/new" exact component={AddForm} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    );
  }
}

export default Main;
