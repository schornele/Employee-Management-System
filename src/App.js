import React, { Component } from 'react';
import './App.css';
import Employees from './component/employee/employees.component';

class App extends Component {

  //JSX Rendering Functions
  render() {
    return (
      <div className="App">
        <Employees />
      </div>
    );
  }
}

export default App;
