import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      data: []
    }
  }
  componentDidMount() {
    const storageRef = firebase.storage().ref('images/ingredients/');
    // fetch data from /data
    firebase.database().ref('data').once('value', (snapshot => {
      this.fetchCategories()
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

  fetchCategories() {
    firebase.database().ref('categories').on('value', snapshot => {
      const categories = snapshot.val();
      if (categories !== null) {
        this.setState({categories: []});
        categories.forEach(category => {
          firebase.database().ref('data')
          .orderByChild('category')
          .equalTo(category)
          .once('value', snapshot => {
            const items = snapshot.val();
            const length = items !== null ? Object.keys(items).length : 0;
            this.setState({
              categories: [
                ...this.state.categories,
                {category, length}
              ]
            })
          })
        })
      }
    })
  }

  render() {
    console.log(this.state.categories)
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
