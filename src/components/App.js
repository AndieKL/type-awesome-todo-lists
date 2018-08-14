import React, { Component } from 'react';
//import AddList from '../containers/list-create';
import AllLists from '../containers/all-lists';



class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>Type 'A'wesome</h1>
        </header>
        <AllLists />
      </div>
    );
  }
}

export default App;
 