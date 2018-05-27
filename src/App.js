import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

import CounterComponent from './components/Counter';

class App extends Component {
  constructor(){
    super();
  }

  
  render() {
    
    return (
        <CounterComponent />
    );
  }
}

export default App;
