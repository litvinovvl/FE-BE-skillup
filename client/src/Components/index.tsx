import React from "react";
import moment from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import AddForm from "./AddForm";
import Home from "./Home";
import Navigation from "./Navigation";
import Podcasts from "./Podcasts";

const Main: React.SFC<{}> = (): JSX.Element => (
  <MuiPickersUtilsProvider utils={moment}>
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/podcasts" exact component={Podcasts} />
        <Route path="/podcasts/new" exact component={AddForm} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </MuiPickersUtilsProvider>
);

export default Main;
