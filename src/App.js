import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }
  componentDidMount() {
    firebase.database().ref('data').on('value', (snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        this.setState({data})
      }
    }))
  }
  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
