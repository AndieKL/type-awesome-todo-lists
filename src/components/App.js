import React, { Component } from 'react';
import AddList from '../containers/list-create';
import AllLists from '../containers/all-lists';
import Login from './login';
import { connect } from 'react-redux'; 

import { BrowserRouter, Route } from 'react-router-dom';

import requireUser from './authorized';
import { getUser } from '../actions';

class App extends Component { 

  componentWillMount() {
    this.props.getUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Type 'A'wesome</h1>
          <Route exact path="/" component={ Login } />
          <Route path="/yourlists" component={ requireUser(AllLists) } />
          <Route path="/editlist" component={ requireUser(AddList) } />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { getUser })(App);

 