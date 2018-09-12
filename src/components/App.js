import React, { Component } from 'react';
import AddList from '../containers/list-create';
import AllLists from '../containers/all-lists';
import Login from './login';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      userID: true
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }

componentWillUpdate(user){
    if (user) {
      console.log(this.state.userID);
    }
    else console.log("no user");
  };


  //when add list button is clicked edit mode is true and the edit list form is shown
  //else all lists are displayed
  toggleEdit() {
    this.setState({edit: !(this.state.edit)});
  };


  render() {
    if (!this.state.userID)
      {return (
              <div>
                <Login />
              </div>
            );}
    else if (this.state.edit) {
      return (
        <div className="container">
          <header>
            <h1>Type 'A'wesome</h1>
          </header>
          <AddList close={this.toggleEdit} />
        </div>
      );
    }
    else {
      return (
        <div className="container">
          <header>
            <h1>Type 'A'wesome</h1>
            <button
              id="new-list-btn"
              className="btn btn-primary btn-lg"
              title="Add New List"
              onClick={this.toggleEdit}>
              +
            </button>
          </header>
          <AllLists />
        </div>
      );
    }
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(App);
 