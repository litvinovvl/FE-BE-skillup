import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./Home";
import { Navigation } from './Navigation';
import { Podcasts } from './Podcasts';

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Route path="/" exact component={Home} />
        <Route path="/podcasts" exact component={Podcasts} />
      </BrowserRouter>
    );
  }
}

export default Main;
