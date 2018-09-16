import React, { Component } from 'react';
import AddList from '../containers/list-create';
import AllLists from '../containers/all-lists';
import Login from './login';
import { connect } from 'react-redux'; 

import { BrowserRouter, Route } from 'react-router-dom';

import requireUser from './authorized';
import { getUser, signOut } from '../actions';

class App extends Component {

  componentWillMount() {
    this.props.getUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Type 'A'wesome</h1>
          <button
              id="new-list-btn"
              className="btn btn-primary btn-lg"
              title="Add New List"
              >
              +
          </button>
          <Route exact path="/" component={ Login } />
          <Route path="/yourlists" component={ requireUser(AllLists) } />
          <Route path="/editlist" component={ requireUser(AddList) } />
          <button className="logout btn" onClick={this.props.signOut}>Log Out</button>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { getUser, signOut })(App);

 