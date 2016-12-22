import React, { Component } from 'react';
import firebase from 'firebase';
// import logo from './logo.svg';
import './App.css';

import Category from './Category';
import Data from './Data';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      data: [],
      filteredCategories: [],
      filteredData: []
    }
  }

  componentDidMount() {
    firebase.database().ref('data').on('value', snapshot => Promise.all([
      this.updateData(snapshot.val()),
      this.fetchCategories()
    ]).then(([data, categories]) => {
      this.setState({
        data: data,
        filteredData: data,
        categories: [...categories, {category: 'All', length: this.composeCategories(categories)}],
        filteredCategories: [{category: 'All', length: this.composeCategories(categories)}]
      });
    }));
  }

  updateData(data=[]) {
    const storageRef = firebase.storage().ref('images/ingredients/');
    const dataWithPics = data.map(item => storageRef.child(`${item.id}.jpg`)
    .getDownloadURL()
    .then(url => ({...item, url})));

    return Promise.all(dataWithPics);
  }

  fetchCategories() {
    return firebase.database().ref('categories').once('value')
    .then(snapshot => {
      const categories = snapshot.val() || [];
      const promises = categories.map(category => {
        return firebase.database().ref('data')
        .orderByChild('category')
        .equalTo(category)
        .once('value')
        .then(snapshot => {
          const items = snapshot.val() || {};
          const length = Object.keys(items).length;
          return ({category, length})
        });
      });
      return Promise.all(promises);
    });
  }

  composeCategories(categories) {
    const numAll = categories.reduce((accumulator, item) => {
      return accumulator += item.length;
    }, 0);

    return numAll;
  }

  changeFilter(category) {
    this.setState({
      ...this.state,
      filteredCategories: [category],
      filteredData: this.state.data.filter((item) => category.category === 'All' || item.category === category.category)
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="text-center">
            <div className="btn-group buttons">
              <Category categories={this.state.categories} filteredCategories={this.state.filteredCategories}
                onClickItem={this.changeFilter.bind(this)}/>
              </div>
            </div>

            <div>Selected: {this.state.filteredCategories.map(c => c.category).join(' ')} </div>

            <div className="row rows">
              <Data data={this.state.filteredData}/>
            </div>
          </div>
        </div>

      );
    }
  }


  export default App;
