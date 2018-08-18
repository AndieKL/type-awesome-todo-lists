import React, { Component } from 'react';
import AddList from '../containers/list-create';
import AllLists from '../containers/all-lists';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({edit: !(this.state.edit)});
  };

  render() {
    if (this.state.edit) {
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

export default App;
 