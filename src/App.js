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
    const storageRef = firebase.storage().ref('images/ingredients/');
    firebase.database().ref('data').on('value', (snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        this.setState({data: []});
        data.forEach(item => {
          storageRef.child(`${item.id}.jpg`).getDownloadURL()
          .then(url => this.setState({
            data: [
              ...this.state.data,
              {
                ...item,
                url
              }
            ]
          }))
        })
      }
    }))
  }
  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <h3>Example how to use</h3>
        <h4>Make sure that this.state.data is not empty, otherwise this.state.data[0].url would produce an error</h4>
        {this.state.data[0] && <img src={this.state.data[0].url} alt=""/>}
      </div>
    );
  }
}

export default App;
