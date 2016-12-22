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
      data: []
    }
  }

  componentDidMount() {
    firebase.database().ref('data').on('value', snapshot => this.updateData(snapshot.val()))
  }

  updateData(data) {
    const storageRef = firebase.storage().ref('images/ingredients/');
    this.fetchCategories()
    if (data !== null) {
      const dataWithPics = data.map(item => {
        return storageRef.child(`${item.id}.jpg`).getDownloadURL()
          .then(url => ({...item, url}))
      })
      Promise.all(dataWithPics)
      .then(result => this.setState({data: result}))
    }
  }

  fetchCategories() {



    firebase.database().ref('categories').once('value')
    .then(snapshot => {
      const categories = snapshot.val();
      if (categories !== null) {
        const promises = categories.map(category => {
          return firebase.database().ref('data')
          .orderByChild('category')
          .equalTo(category)
          .once('value')
          .then(snapshot => {
            const items = snapshot.val();
            const length = items !== null ? Object.keys(items).length : 0;
            return ({category, length})
          })
        })
        return Promise.all(promises)
      }
    })
    .then(categories => {
      const numAll = categories.reduce((accumulator, item) => {
        return accumulator += item.length;
      }, 0);

      this.setState({
        categories: [
          ...categories,
          {category: 'All', length: numAll}
        ]
      })
    })
  }

 render() {
   return (
     <div>
       <div className="container">
         <div className="text-center">
           <div className="btn-group buttons">
             <Category categories={this.state.categories}/>
           </div>
         </div>

         <div className="row rows">
           <Data data={this.state.data}/>
         </div>
       </div>
     </div>

   );
 }
}


export default App;
