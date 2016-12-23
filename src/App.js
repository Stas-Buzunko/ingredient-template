import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

import Category from './Category';
import Data from './Data';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      data: [],
      filter: 'All',
      filteredData: []
    }

    this.changeFilter = this.changeFilter.bind(this);
  }

  componentDidMount() {
    const { filter } = this.state;
    firebase.database().ref('data').on('value', snapshot => Promise.all([
      this.updateData(snapshot.val()),
      this.fetchCategories()
    ]).then(([data, categories]) => {
      this.setState({
        data: data,
        filteredData: data.filter((item) => filter === 'All' || item.category === filter),
        categories: [{category: 'All', length: this.composeCategories(categories)}, ...categories ],
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
      filter: category,
      filteredData: this.state.data.filter((item) => category.category === 'All' || item.category === category.category)
    });
  }

  render() {
    const { categories, filter, filteredData } = this.state;
    return (
      <div>
        <div className="container">
          <div className="text-center">
            <div className="btn-group buttons">
              <Category categories={categories} filter={filter}
                onClickItem={this.changeFilter}/>
              </div>
            </div>
            <div className="row rows">
              <Data data={filteredData}/>
            </div>
          </div>
        </div>
      );
    }
  }


  export default App;
